from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import numpy as np
from data_service import DataService
from model_service import ModelService
from database_service import DatabaseService
import config

class PredictionService:
    def __init__(self):
        self.data_service = DataService()
        self.model_service = ModelService(config.MODEL_CACHE_DIR)
        self.db_service = DatabaseService(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY)

    def get_prediction(self, ticker: str, force_retrain: bool = False) -> Dict[str, Any]:
        ticker = ticker.upper()

        try:
            stock_data = self.data_service.get_stock_data(ticker)
            if stock_data is None or stock_data.empty:
                return {
                    'success': False,
                    'error': f'Unable to fetch data for ticker {ticker}. Please check if the ticker symbol is valid.'
                }

            cached_model = None
            if not force_retrain:
                cached_model_info = self.db_service.get_cached_model(ticker, config.MODEL_CACHE_DAYS)
                if cached_model_info:
                    cached_model = self.model_service.load_model(ticker)

            if cached_model is None:
                prepared_data = self.data_service.prepare_features(stock_data)
                features = self.data_service.get_feature_names()

                print(f"Training new model for {ticker}...")
                training_result = self.model_service.train_model(
                    prepared_data, features, ticker
                )

                self.db_service.save_model_info(
                    ticker,
                    training_result['model_path'],
                    training_result['metadata']
                )

                self.db_service.save_model_performance(
                    ticker,
                    training_result['metrics'],
                    len(training_result['predictions'])
                )

                model_data = training_result
                is_cached = False
            else:
                print(f"Using cached model for {ticker}")
                prepared_data = self.data_service.prepare_features(stock_data)
                model_data = cached_model
                is_cached = True

            next_price = self.model_service.predict_next_price(model_data, prepared_data)

            next_trading_day = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
            self.db_service.save_prediction(ticker, next_price, next_trading_day)

            current_price = float(stock_data['Close'].iloc[-1])
            price_change = next_price - current_price
            price_change_pct = (price_change / current_price) * 100

            historical_data = self.data_service.format_historical_prices(stock_data.tail(100), ticker)
            self.db_service.save_historical_prices(historical_data)

            performance = self.db_service.get_model_performance(ticker)

            chart_data = self._prepare_chart_data(stock_data, model_data if not is_cached else None)

            trend = self._determine_trend(price_change_pct)
            recommendation = self._get_recommendation(price_change_pct, performance)

            volatility = float(stock_data['Close'].pct_change().std() * 100)
            momentum = price_change_pct

            support = current_price * (0.92 + np.random.random() * 0.05)
            resistance = current_price * (1.03 + np.random.random() * 0.05)

            return {
                'success': True,
                'ticker': ticker,
                'current_price': current_price,
                'predicted_price': next_price,
                'price_change': price_change,
                'price_change_percent': price_change_pct,
                'prediction_date': next_trading_day,
                'confidence': performance['confidence_score'] if performance else 70.0,
                'trend': trend,
                'recommendation': recommendation,
                'volatility': volatility,
                'momentum': momentum,
                'support': support,
                'resistance': resistance,
                'model_performance': {
                    'mse': performance['mse'] if performance else 0,
                    'rmse': performance['rmse'] if performance else 0,
                    'mae': performance['mae'] if performance else 0,
                    'test_samples': performance['test_samples'] if performance else 0
                },
                'chart_data': chart_data,
                'is_cached': is_cached,
                'last_updated': datetime.now().isoformat()
            }

        except Exception as e:
            print(f"Error in prediction service: {e}")
            import traceback
            traceback.print_exc()
            return {
                'success': False,
                'error': f'An error occurred while processing {ticker}: {str(e)}'
            }

    def _prepare_chart_data(self, stock_data, model_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        recent_data = stock_data.tail(60)

        dates = [idx.strftime('%Y-%m-%d') for idx in recent_data.index]
        actual_prices = [float(price) for price in recent_data['Close'].values]

        predicted_prices = []
        if model_data and 'predictions' in model_data:
            predictions = model_data['predictions']
            predicted_prices = [float(p[0]) for p in predictions[-60:]] if len(predictions) >= 60 else []

        return {
            'dates': dates,
            'actual_prices': actual_prices,
            'predicted_prices': predicted_prices,
            'volumes': [int(vol) for vol in recent_data['Volume'].values] if 'Volume' in recent_data else []
        }

    def _determine_trend(self, price_change_pct: float) -> str:
        if price_change_pct > 10:
            return 'Strong Bullish'
        elif price_change_pct > 5:
            return 'Bullish'
        elif price_change_pct < -10:
            return 'Strong Bearish'
        elif price_change_pct < -5:
            return 'Bearish'
        else:
            return 'Neutral'

    def _get_recommendation(self, price_change_pct: float, performance: Optional[Dict[str, Any]]) -> str:
        confidence = performance['confidence_score'] if performance else 70.0

        if confidence < 60:
            return 'Hold'

        if price_change_pct > 10:
            return 'Strong Buy'
        elif price_change_pct > 5:
            return 'Buy'
        elif price_change_pct < -10:
            return 'Sell'
        elif price_change_pct < -5:
            return 'Reduce Position'
        else:
            return 'Hold'

    def get_prediction_history(self, ticker: str) -> Dict[str, Any]:
        ticker = ticker.upper()
        history = self.db_service.get_prediction_history(ticker, limit=30)

        return {
            'success': True,
            'ticker': ticker,
            'history': history
        }
