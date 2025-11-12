import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import RobustScaler
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from scipy.optimize import minimize
import random
import os
def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
set_seed()

def get_stock_data(ticker, start_date='2010-01-01'):
    stock = yf.Ticker(ticker)
    stock_data = stock.history(start=start_date)
    return stock_data

tickers = [ticker]

data = {ticker: get_stock_data(ticker) for ticker in tickers}

def calculate_ratios(stock_data):
    stock_data['P/E'] = stock_data['Close'] / stock_data['Close'].rolling(window=12).mean()  # Price-to-Earnings
    stock_data['P/E'] = stock_data['P/E'].clip(lower=0, upper=50)  # Cap P/E to remove extreme values

    stock_data['ROE'] = stock_data['Close'].pct_change() * 100  # Return on Equity
    stock_data['Debt-to-Equity'] = stock_data['Close'] / stock_data['Open']  # Placeholder for Debt-to-Equity
    return stock_data

def add_technical_indicators(stock_data):
    stock_data['12-day EMA'] = stock_data['Close'].ewm(span=12, adjust=False).mean()  # 12-day EMA
    stock_data['26-day EMA'] = stock_data['Close'].ewm(span=26, adjust=False).mean()  # 26-day EMA
    stock_data['MACD'] = stock_data['12-day EMA'] - stock_data['26-day EMA']  # MACD

    delta = stock_data['Close'].diff()  # Daily change in price
    gain = delta.where(delta > 0, 0)  # Positive gains
    loss = -delta.where(delta < 0, 0)  # Negative losses
    avg_gain = gain.rolling(window=14, min_periods=1).mean()  # Average gain over 14 days
    avg_loss = loss.rolling(window=14, min_periods=1).mean()  # Average loss over 14 days
    rs = avg_gain / avg_loss  # Relative Strength
    stock_data['RSI'] = 100 - (100 / (1 + rs))  # Relative Strength Index
    stock_data['RSI'] = stock_data['RSI'].clip(lower=0, upper=100)  # Clip RSI values to the valid range
    return stock_data

for ticker in tickers:
    stock_data = data[ticker]
    data[ticker] = add_technical_indicators(calculate_ratios(stock_data))


ticker = ticker
stock_data = data[ticker].copy()


stock_data['Target'] = stock_data['Close'].shift(-1)


for lag in range(1, 4):
    stock_data[f'Close_lag_{lag}'] = stock_data['Close'].shift(lag)


stock_data['Rolling_mean_7'] = stock_data['Close'].rolling(window=7).mean()
stock_data['Rolling_std_7'] = stock_data['Close'].rolling(window=7).std()


stock_data.replace([np.inf, -np.inf], np.nan, inplace=True)


stock_data.fillna(method='ffill', inplace=True)  # Forward fill
stock_data.dropna(inplace=True)  # If any NaNs remain at the start


features = ['P/E', 'ROE', 'Debt-to-Equity', 'MACD', 'RSI',
            'Close_lag_1', 'Close_lag_2', 'Close_lag_3',
            'Rolling_mean_7', 'Rolling_std_7']
target = 'Target'


stock_data[features] = stock_data[features].apply(pd.to_numeric, errors='coerce')

stock_data.fillna(method='ffill', inplace=True)
stock_data.dropna(inplace=True)


feature_scaler = RobustScaler()
target_scaler = RobustScaler()


stock_data[features] = feature_scaler.fit_transform(stock_data[features])
stock_data['Target'] = target_scaler.fit_transform(stock_data[['Target']])


train_size = int(len(stock_data) * 0.7)
val_size = int(len(stock_data) * 0.1)
test_size = len(stock_data) - train_size - val_size

train_data = stock_data.iloc[:train_size]
val_data = stock_data.iloc[train_size:train_size + val_size]
test_data = stock_data.iloc[train_size + val_size:]

train_data.head()

print("NaNs in training features:", train_data[features].isnull().sum().sum())
print("NaNs in training target:", train_data[target].isnull().sum())

from torch.utils.data import Dataset, DataLoader
class StockDataset(Dataset):
    def __init__(self, data, features, target, sequence_length):
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
sequence_length = 60  # You can adjust this based on experimentation
batch_size = 64       # Adjusted batch size for hyperparameter tuning
train_size = int(len(stock_data) * 0.7)
val_size = int(len(stock_data) * 0.1)
test_size = len(stock_data) - train_size - val_size
train_data = stock_data.iloc[:train_size]
val_data = stock_data.iloc[train_size:train_size + val_size]
test_data = stock_data.iloc[train_size + val_size:]
train_dataset = StockDataset(train_data, features, target, sequence_length)
val_dataset = StockDataset(val_data, features, target, sequence_length)
test_dataset = StockDataset(test_data, features, target, sequence_length)
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=False)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, drop_last=False)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, drop_last=False)
print(f"Number of training samples: {len(train_dataset)}")
print(f"Number of validation samples: {len(val_dataset)}")
print(f"Number of testing samples: {len(test_dataset)}")

batch_size = 64
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=False)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, drop_last=False)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, drop_last=False)
for X_batch, y_batch in train_loader:
    print(f"X_batch shape: {X_batch.shape}")  # Expected: (batch_size, sequence_length, num_features)
    print(f"y_batch shape: {y_batch.shape}")  # Expected: (batch_size,)
    break

import torch.nn as nn
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size, dropout=0.3):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers,
                            batch_first=True, dropout=dropout, bidirectional=True)
        self.batch_norm = nn.BatchNorm1d(hidden_size * 2)  # Multiply by 2 for bidirectional
        self.dropout = nn.Dropout(p=dropout)
        self.fc = nn.Linear(hidden_size * 2, output_size)  # Multiply by 2 for bidirectional
    def forward(self, x):
        h0 = torch.zeros(self.num_layers * 2, x.size(0), self.hidden_size).to(x.device)  # 2 for bidirectional
        c0 = torch.zeros(self.num_layers * 2, x.size(0), self.hidden_size).to(x.device)
        out, _ = self.lstm(x, (h0, c0))  # out: tensor of shape (batch_size, seq_length, hidden_size*2)
        out = out[:, -1, :]  # Shape: (batch_size, hidden_size*2)
        out = self.batch_norm(out)
        out = self.dropout(out)
        out = self.fc(out)  # Shape: (batch_size, output_size)
        return out
input_size = len(features)  # Number of features
hidden_size = 50           # Reduced from 50 for hyperparameter tuning
num_layers = 2             # Reduced from 2 for hyperparameter tuning
output_size = 1
dropout = 0.3              # Increased from 0.2 for hyperparameter tuning
model = LSTMModel(input_size, hidden_size, num_layers, output_size, dropout)
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = model.to(device)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)  # Added weight_decay
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=100, gamma=0.1)
print(model)

import torch
patience = 75
best_val_loss = float('inf')
epochs_no_improve = 0
early_stop = False
num_epochs = 1000
max_grad_norm = 1.0  # For gradient clipping
for epoch in range(num_epochs):
    model.train()
    epoch_loss = 0
    for inputs, targets in train_loader:
        inputs = inputs.to(device)
        targets = targets.to(device).unsqueeze(1)  # Shape: (batch_size, 1)
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
            inputs = inputs.to(device)
            targets = targets.to(device).unsqueeze(1)
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            val_loss += loss.item()
    avg_val_loss = val_loss / len(val_loader)
    if avg_val_loss < best_val_loss:
        best_val_loss = avg_val_loss
        epochs_no_improve = 0
        torch.save(model.state_dict(), f'best_model_{ticker}.pth')
    else:
        epochs_no_improve += 1
    if epochs_no_improve == patience:
        print(f'Early stopping at epoch {epoch+1}')
        break
    scheduler.step()
    if (epoch+1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Train Loss: {avg_train_loss:.6f}, Val Loss: {avg_val_loss:.6f}')
        with torch.no_grad():
            sample_pred = model(inputs[:5]).cpu().numpy()
            sample_pred = target_scaler.inverse_transform(sample_pred)  # Invert scaling
            print(f"Sample Predictions at Epoch {epoch + 1}: {sample_pred}")

import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error
import torch
model.load_state_dict(torch.load(f'best_model_{ticker}.pth'))
model.eval()
predictions = []
actuals = []
with torch.no_grad():
    for inputs, targets in test_loader:
        inputs = inputs.to(device)
        targets = targets.to(device).unsqueeze(1)
        outputs = model(inputs)
        predictions.append(outputs.cpu().numpy())
        actuals.append(targets.cpu().numpy())
predictions = np.concatenate(predictions, axis=0)
actuals = np.concatenate(actuals, axis=0)
predictions = target_scaler.inverse_transform(predictions)
actuals = target_scaler.inverse_transform(actuals)
mae = mean_absolute_error(actuals, predictions)
print(f'Mean Absolute Error on Test Set: {mae:.4f}')
plt.figure(figsize=(14,7))
plt.plot(actuals, label='Actual Prices')
plt.plot(predictions, label='Predicted Prices')
plt.title(f"{ticker} Actual vs Predicted Prices")
plt.xlabel("Time")
plt.ylabel("Price")
plt.legend()
plt.show()

num_samples = 10  # Number of samples to inspect
indices = np.random.choice(len(actuals), num_samples, replace=False)
print("Index\tActual\tPredicted\tDifference")
for idx in indices:
    actual = actuals[idx][0]
    predicted = predictions[idx][0]
    difference = actual - predicted
    print(f"{idx}\t{actual:.2f}\t{predicted:.2f}\t\t{difference:.2f}")

test_data_aligned = test_data.iloc[sequence_length:].copy()
test_data_aligned['Predicted'] = predictions.flatten()
test_data_aligned['Return'] = test_data_aligned['Close'].pct_change()
test_data_aligned['Strategy'] = np.where(test_data_aligned['Predicted'] > test_data_aligned['Close'], test_data_aligned['Return'], -test_data_aligned['Return'])
test_data_aligned['Cumulative Market Return'] = (1 + test_data_aligned['Return']).cumprod() - 1
test_data_aligned['Cumulative Strategy Return'] = (1 + test_data_aligned['Strategy']).cumprod() - 1
plt.figure(figsize=(14,7))
plt.plot(test_data_aligned['Cumulative Market Return'], label='Cumulative Market Return')
plt.plot(test_data_aligned['Cumulative Strategy Return'], label='Cumulative Strategy Return')
plt.title(f"{ticker} Backtest Strategy vs Market Performance")
plt.xlabel("Date")
plt.ylabel("Cumulative Return")
plt.legend()
plt.show()

def calculate_var(returns, confidence_level=0.95):
    var = np.percentile(returns.dropna(), (1 - confidence_level) * 100)  # Calculate percentile for VaR
    return var
var_strategy = calculate_var(test_data_aligned['Strategy'], confidence_level=0.95)
print(f"Value at Risk (VaR) for the Strategy: {var_strategy:.4f}")
var_market = calculate_var(test_data_aligned['Return'], confidence_level=0.95)
print(f"Value at Risk (VaR) for the Market: {var_market:.4f}")

def portfolio_optimization(expected_returns, covariance_matrix, target_return):
    def portfolio_volatility(weights, covariance_matrix):
        return np.sqrt(np.dot(weights.T, np.dot(covariance_matrix, weights)))  # Portfolio volatility
    n_assets = len(expected_returns)
    args = (covariance_matrix,)
    constraints = (
        {'type': 'eq', 'fun': lambda weights: np.sum(weights) - 1},  # Weights must sum to 1
        {'type': 'eq', 'fun': lambda weights: np.dot(weights, expected_returns) - target_return}  # Target return
    )
    bounds = tuple((0, 1) for _ in range(n_assets))  # Weights between 0 and 1
    initial_weights = n_assets * [1. / n_assets,]
    result = minimize(portfolio_volatility, initial_weights, args=args, method='SLSQP', bounds=bounds, constraints=constraints)
    return result
expected_returns = np.array([0.10, 0.12, 0.15])  # Example expected returns
cov_matrix = np.array([
    [0.2, 0.1, 0.1],
    [0.1, 0.3, 0.15],
    [0.1, 0.15, 0.25]
])  # Example covariance matrix
target_return = 0.12
portfolio = portfolio_optimization(expected_returns, cov_matrix, target_return)
print("Optimized Portfolio Weights:", portfolio.x)

torch.save(model.state_dict(), f"{ticker}_lstm_model.pth")
print(f"Model saved as {ticker}_lstm_model.pth")