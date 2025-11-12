import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

class DataService:
    @staticmethod
    def get_stock_data(ticker: str, start_date: str = '2010-01-01') -> Optional[pd.DataFrame]:
        try:
            stock = yf.Ticker(ticker)
            stock_data = stock.history(start=start_date)

            if stock_data.empty:
                return None

            return stock_data
        except Exception as e:
            print(f"Error fetching stock data for {ticker}: {e}")
            return None

    @staticmethod
    def calculate_ratios(stock_data: pd.DataFrame) -> pd.DataFrame:
        stock_data['P/E'] = stock_data['Close'] / stock_data['Close'].rolling(window=12).mean()
        stock_data['P/E'] = stock_data['P/E'].clip(lower=0, upper=50)
        stock_data['ROE'] = stock_data['Close'].pct_change() * 100
        stock_data['Debt-to-Equity'] = stock_data['Close'] / stock_data['Open']
        return stock_data

    @staticmethod
    def add_technical_indicators(stock_data: pd.DataFrame) -> pd.DataFrame:
        stock_data['12-day EMA'] = stock_data['Close'].ewm(span=12, adjust=False).mean()
        stock_data['26-day EMA'] = stock_data['Close'].ewm(span=26, adjust=False).mean()
        stock_data['MACD'] = stock_data['12-day EMA'] - stock_data['26-day EMA']

        delta = stock_data['Close'].diff()
        gain = delta.where(delta > 0, 0)
        loss = -delta.where(delta < 0, 0)
        avg_gain = gain.rolling(window=14, min_periods=1).mean()
        avg_loss = loss.rolling(window=14, min_periods=1).mean()
        rs = avg_gain / avg_loss
        stock_data['RSI'] = 100 - (100 / (1 + rs))
        stock_data['RSI'] = stock_data['RSI'].clip(lower=0, upper=100)

        return stock_data

    @staticmethod
    def prepare_features(stock_data: pd.DataFrame) -> pd.DataFrame:
        stock_data = DataService.calculate_ratios(stock_data)
        stock_data = DataService.add_technical_indicators(stock_data)

        stock_data['Target'] = stock_data['Close'].shift(-1)

        for lag in range(1, 4):
            stock_data[f'Close_lag_{lag}'] = stock_data['Close'].shift(lag)

        stock_data['Rolling_mean_7'] = stock_data['Close'].rolling(window=7).mean()
        stock_data['Rolling_std_7'] = stock_data['Close'].rolling(window=7).std()

        stock_data.replace([np.inf, -np.inf], np.nan, inplace=True)
        stock_data.ffill(inplace=True)
        stock_data.dropna(inplace=True)

        return stock_data

    @staticmethod
    def get_feature_names() -> list:
        return [
            'P/E', 'ROE', 'Debt-to-Equity', 'MACD', 'RSI',
            'Close_lag_1', 'Close_lag_2', 'Close_lag_3',
            'Rolling_mean_7', 'Rolling_std_7'
        ]

    @staticmethod
    def format_historical_prices(stock_data: pd.DataFrame, ticker: str) -> list[Dict[str, Any]]:
        formatted_data = []
        for idx, row in stock_data.iterrows():
            formatted_data.append({
                'ticker': ticker,
                'date': idx.strftime('%Y-%m-%d'),
                'open': float(row['Open']),
                'high': float(row['High']),
                'low': float(row['Low']),
                'close': float(row['Close']),
                'volume': int(row['Volume']) if 'Volume' in row else 0
            })
        return formatted_data
