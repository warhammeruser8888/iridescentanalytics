import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
import pandas as pd
from sklearn.preprocessing import RobustScaler
from pathlib import Path
import pickle
from typing import Tuple, Dict, Any, Optional
import json

class StockDataset(Dataset):
    def __init__(self, data: pd.DataFrame, features: list, target: str, sequence_length: int):
        self.data = data
        self.features = features
        self.target = target
        self.sequence_length = sequence_length

    def __len__(self):
        return len(self.data) - self.sequence_length

    def __getitem__(self, idx):
        x = self.data[self.features].iloc[idx:idx+self.sequence_length].values
        y = self.data[self.target].iloc[idx+self.sequence_length]
        return torch.tensor(x, dtype=torch.float32), torch.tensor(y, dtype=torch.float32)

class LSTMModel(nn.Module):
    def __init__(self, input_size: int, hidden_size: int = 50, num_layers: int = 2,
                 output_size: int = 1, dropout: float = 0.3):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers,
                            batch_first=True, dropout=dropout, bidirectional=True)
        self.batch_norm = nn.BatchNorm1d(hidden_size * 2)
        self.dropout = nn.Dropout(p=dropout)
        self.fc = nn.Linear(hidden_size * 2, output_size)

    def forward(self, x):
        h0 = torch.zeros(self.num_layers * 2, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers * 2, x.size(0), self.hidden_size).to(x.device)
        out, _ = self.lstm(x, (h0, c0))
        out = out[:, -1, :]
        out = self.batch_norm(out)
        out = self.dropout(out)
        out = self.fc(out)
        return out

class ModelService:
    def __init__(self, model_cache_dir: str = "models"):
        self.model_cache_dir = Path(model_cache_dir)
        self.model_cache_dir.mkdir(parents=True, exist_ok=True)
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'

    def train_model(self, stock_data: pd.DataFrame, features: list, ticker: str,
                   sequence_length: int = 60, batch_size: int = 64,
                   num_epochs: int = 1000, patience: int = 75) -> Dict[str, Any]:

        stock_data = stock_data.copy()
        target = 'Target'

        feature_scaler = RobustScaler()
        target_scaler = RobustScaler()

        stock_data[features] = feature_scaler.fit_transform(stock_data[features])
        stock_data['Target'] = target_scaler.fit_transform(stock_data[['Target']])

        train_size = int(len(stock_data) * 0.7)
        val_size = int(len(stock_data) * 0.1)

        train_data = stock_data.iloc[:train_size]
        val_data = stock_data.iloc[train_size:train_size + val_size]
        test_data = stock_data.iloc[train_size + val_size:]

        train_dataset = StockDataset(train_data, features, target, sequence_length)
        val_dataset = StockDataset(val_data, features, target, sequence_length)
        test_dataset = StockDataset(test_data, features, target, sequence_length)

        train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=False)
        val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, drop_last=False)
        test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, drop_last=False)

        input_size = len(features)
        model = LSTMModel(input_size).to(self.device)
        criterion = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)
        scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=100, gamma=0.1)

        best_val_loss = float('inf')
        epochs_no_improve = 0
        max_grad_norm = 1.0

        for epoch in range(num_epochs):
            model.train()
            epoch_loss = 0
            for inputs, targets in train_loader:
                inputs = inputs.to(self.device)
                targets = targets.to(self.device).unsqueeze(1)
                outputs = model(inputs)
                loss = criterion(outputs, targets)
                optimizer.zero_grad()
                loss.backward()
                nn.utils.clip_grad_norm_(model.parameters(), max_grad_norm)
                optimizer.step()
                epoch_loss += loss.item()

            avg_train_loss = epoch_loss / len(train_loader)

            model.eval()
            val_loss = 0
            with torch.no_grad():
                for inputs, targets in val_loader:
                    inputs = inputs.to(self.device)
                    targets = targets.to(self.device).unsqueeze(1)
                    outputs = model(inputs)
                    loss = criterion(outputs, targets)
                    val_loss += loss.item()

            avg_val_loss = val_loss / len(val_loader)

            if avg_val_loss < best_val_loss:
                best_val_loss = avg_val_loss
                epochs_no_improve = 0
                model_path = self.model_cache_dir / f"{ticker}_lstm_model.pth"
                torch.save(model.state_dict(), model_path)
            else:
                epochs_no_improve += 1

            if epochs_no_improve == patience:
                print(f'Early stopping at epoch {epoch+1}')
                break

            scheduler.step()

        model_path = self.model_cache_dir / f"{ticker}_lstm_model.pth"
        model.load_state_dict(torch.load(model_path))

        scaler_path = self.model_cache_dir / f"{ticker}_scalers.pkl"
        with open(scaler_path, 'wb') as f:
            pickle.dump({
                'feature_scaler': feature_scaler,
                'target_scaler': target_scaler,
                'features': features,
                'sequence_length': sequence_length
            }, f)

        predictions, actuals, test_metrics = self._evaluate_model(
            model, test_loader, target_scaler
        )

        metadata = {
            'features': features,
            'sequence_length': sequence_length,
            'hidden_size': 50,
            'num_layers': 2,
            'input_size': input_size
        }

        metadata_path = self.model_cache_dir / f"{ticker}_metadata.json"
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f)

        return {
            'model': model,
            'feature_scaler': feature_scaler,
            'target_scaler': target_scaler,
            'metadata': metadata,
            'predictions': predictions,
            'actuals': actuals,
            'metrics': test_metrics,
            'model_path': str(model_path),
            'scaler_path': str(scaler_path)
        }

    def _evaluate_model(self, model: nn.Module, test_loader: DataLoader,
                       target_scaler: RobustScaler) -> Tuple[np.ndarray, np.ndarray, Dict[str, float]]:
        model.eval()
        predictions = []
        actuals = []

        with torch.no_grad():
            for inputs, targets in test_loader:
                inputs = inputs.to(self.device)
                targets = targets.to(self.device).unsqueeze(1)
                outputs = model(inputs)
                predictions.append(outputs.cpu().numpy())
                actuals.append(targets.cpu().numpy())

        predictions = np.concatenate(predictions, axis=0)
        actuals = np.concatenate(actuals, axis=0)

        predictions = target_scaler.inverse_transform(predictions)
        actuals = target_scaler.inverse_transform(actuals)

        mse = np.mean((actuals - predictions) ** 2)
        rmse = np.sqrt(mse)
        mae = np.mean(np.abs(actuals - predictions))

        return predictions, actuals, {
            'mse': float(mse),
            'rmse': float(rmse),
            'mae': float(mae)
        }

    def load_model(self, ticker: str) -> Optional[Dict[str, Any]]:
        model_path = self.model_cache_dir / f"{ticker}_lstm_model.pth"
        scaler_path = self.model_cache_dir / f"{ticker}_scalers.pkl"
        metadata_path = self.model_cache_dir / f"{ticker}_metadata.json"

        if not model_path.exists() or not scaler_path.exists() or not metadata_path.exists():
            return None

        with open(metadata_path, 'r') as f:
            metadata = json.load(f)

        with open(scaler_path, 'rb') as f:
            scaler_data = pickle.load(f)

        model = LSTMModel(
            input_size=metadata['input_size'],
            hidden_size=metadata['hidden_size'],
            num_layers=metadata['num_layers']
        ).to(self.device)

        model.load_state_dict(torch.load(model_path, map_location=self.device))
        model.eval()

        return {
            'model': model,
            'feature_scaler': scaler_data['feature_scaler'],
            'target_scaler': scaler_data['target_scaler'],
            'features': scaler_data['features'],
            'sequence_length': scaler_data['sequence_length'],
            'metadata': metadata,
            'model_path': str(model_path)
        }

    def predict_next_price(self, model_data: Dict[str, Any], recent_data: pd.DataFrame) -> float:
        model = model_data['model']
        feature_scaler = model_data['feature_scaler']
        target_scaler = model_data['target_scaler']
        features = model_data['features']
        sequence_length = model_data['sequence_length']

        recent_data = recent_data.copy()
        recent_data[features] = feature_scaler.transform(recent_data[features])

        if len(recent_data) < sequence_length:
            raise ValueError(f"Need at least {sequence_length} days of data for prediction")

        sequence = recent_data[features].iloc[-sequence_length:].values
        sequence_tensor = torch.tensor(sequence, dtype=torch.float32).unsqueeze(0).to(self.device)

        model.eval()
        with torch.no_grad():
            prediction_scaled = model(sequence_tensor).cpu().numpy()
            prediction = target_scaler.inverse_transform(prediction_scaled)

        return float(prediction[0][0])
