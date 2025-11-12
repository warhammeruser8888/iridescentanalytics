from supabase import create_client, Client
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
import json

class DatabaseService:
    def __init__(self, supabase_url: str, supabase_key: str):
        self.client: Client = create_client(supabase_url, supabase_key)

    def get_cached_model(self, ticker: str, cache_days: int = 7) -> Optional[Dict[str, Any]]:
        cutoff_date = datetime.now() - timedelta(days=cache_days)

        try:
            response = self.client.table('trained_models') \
                .select('*') \
                .eq('ticker', ticker.upper()) \
                .gte('training_date', cutoff_date.isoformat()) \
                .order('training_date', desc=True) \
                .limit(1) \
                .execute()

            if response.data and len(response.data) > 0:
                self.client.table('trained_models') \
                    .update({'last_used': datetime.now().isoformat()}) \
                    .eq('id', response.data[0]['id']) \
                    .execute()

                return response.data[0]

            return None
        except Exception as e:
            print(f"Error fetching cached model: {e}")
            return None

    def save_model_info(self, ticker: str, model_path: str, metadata: Dict[str, Any]) -> bool:
        try:
            data = {
                'ticker': ticker.upper(),
                'model_storage_path': model_path,
                'training_date': datetime.now().isoformat(),
                'last_used': datetime.now().isoformat(),
                'model_metadata': json.dumps(metadata)
            }

            self.client.table('trained_models').insert(data).execute()
            return True
        except Exception as e:
            print(f"Error saving model info: {e}")
            return False

    def save_model_performance(self, ticker: str, metrics: Dict[str, float], test_samples: int) -> bool:
        try:
            confidence = max(0, min(100, 100 - (metrics['mae'] / 10)))

            data = {
                'ticker': ticker.upper(),
                'mse': metrics['mse'],
                'rmse': metrics['rmse'],
                'mae': metrics['mae'],
                'confidence_score': confidence,
                'test_samples': test_samples,
                'training_date': datetime.now().isoformat()
            }

            self.client.table('model_performance').insert(data).execute()
            return True
        except Exception as e:
            print(f"Error saving model performance: {e}")
            return False

    def get_model_performance(self, ticker: str) -> Optional[Dict[str, Any]]:
        try:
            response = self.client.table('model_performance') \
                .select('*') \
                .eq('ticker', ticker.upper()) \
                .order('training_date', desc=True) \
                .limit(1) \
                .execute()

            if response.data and len(response.data) > 0:
                return response.data[0]

            return None
        except Exception as e:
            print(f"Error fetching model performance: {e}")
            return None

    def save_prediction(self, ticker: str, predicted_price: float, target_date: str,
                       metadata: Optional[Dict[str, Any]] = None) -> bool:
        try:
            data = {
                'ticker': ticker.upper(),
                'prediction_date': datetime.now().isoformat(),
                'predicted_price': predicted_price,
                'prediction_horizon': '1day',
                'target_date': target_date,
                'metadata': json.dumps(metadata or {})
            }

            self.client.table('predictions').insert(data).execute()
            return True
        except Exception as e:
            print(f"Error saving prediction: {e}")
            return False

    def get_prediction_history(self, ticker: str, limit: int = 30) -> List[Dict[str, Any]]:
        try:
            response = self.client.table('predictions') \
                .select('*') \
                .eq('ticker', ticker.upper()) \
                .order('target_date', desc=True) \
                .limit(limit) \
                .execute()

            return response.data if response.data else []
        except Exception as e:
            print(f"Error fetching prediction history: {e}")
            return []

    def save_historical_prices(self, historical_data: List[Dict[str, Any]]) -> bool:
        try:
            for data in historical_data:
                self.client.table('historical_prices').upsert(data).execute()
            return True
        except Exception as e:
            print(f"Error saving historical prices: {e}")
            return False

    def get_historical_prices(self, ticker: str, limit: int = 100) -> List[Dict[str, Any]]:
        try:
            response = self.client.table('historical_prices') \
                .select('*') \
                .eq('ticker', ticker.upper()) \
                .order('date', desc=True) \
                .limit(limit) \
                .execute()

            return response.data if response.data else []
        except Exception as e:
            print(f"Error fetching historical prices: {e}")
            return []
