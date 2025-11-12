const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface PredictionResponse {
  success: boolean;
  ticker: string;
  current_price: number;
  predicted_price: number;
  price_change: number;
  price_change_percent: number;
  prediction_date: string;
  confidence: number;
  trend: string;
  recommendation: string;
  volatility: number;
  momentum: number;
  support: number;
  resistance: number;
  model_performance: {
    mse: number;
    rmse: number;
    mae: number;
    test_samples: number;
  };
  chart_data: {
    dates: string[];
    actual_prices: number[];
    predicted_prices: number[];
    volumes: number[];
  };
  is_cached: boolean;
  last_updated: string;
  error?: string;
}

export interface PredictionHistoryResponse {
  success: boolean;
  ticker: string;
  history: Array<{
    id: string;
    ticker: string;
    prediction_date: string;
    predicted_price: number;
    actual_price: number | null;
    target_date: string;
    metadata: any;
  }>;
  error?: string;
}

export interface ModelPerformanceResponse {
  success: boolean;
  ticker: string;
  performance: {
    id: string;
    ticker: string;
    mse: number;
    rmse: number;
    mae: number;
    confidence_score: number;
    test_samples: number;
    training_date: string;
  };
  error?: string;
}

class PredictionApi {
  private baseUrl: string;
  private cache: Map<string, { data: PredictionResponse; timestamp: number }>;
  private cacheDuration: number = 5 * 60 * 1000;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.cache = new Map();
  }

  async predictStock(ticker: string, forceRetrain: boolean = false): Promise<PredictionResponse> {
    const cacheKey = `${ticker.toUpperCase()}_${forceRetrain}`;

    if (!forceRetrain && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < this.cacheDuration) {
        return cached.data;
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticker: ticker.toUpperCase(),
          force_retrain: forceRetrain,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch prediction');
      }

      const data: PredictionResponse = await response.json();

      this.cache.set(cacheKey, { data, timestamp: Date.now() });

      return data;
    } catch (error) {
      console.error('Prediction API error:', error);
      throw error;
    }
  }

  async getPredictionHistory(ticker: string): Promise<PredictionHistoryResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/prediction-history/${ticker.toUpperCase()}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch prediction history');
      }

      return await response.json();
    } catch (error) {
      console.error('Prediction history API error:', error);
      throw error;
    }
  }

  async getModelPerformance(ticker: string): Promise<ModelPerformanceResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/model-performance/${ticker.toUpperCase()}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch model performance');
      }

      return await response.json();
    } catch (error) {
      console.error('Model performance API error:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);

      if (!response.ok) {
        throw new Error('Health check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const predictionApi = new PredictionApi();
