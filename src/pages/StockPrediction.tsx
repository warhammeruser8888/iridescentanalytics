import { useState } from 'react';
import { TrendingUp, Search, AlertCircle, BarChart3 } from 'lucide-react';
import { predictionApi, PredictionResponse } from '../services/predictionApi';
import PredictionChart from '../components/charts/PredictionChart';
import PerformanceMetricsDisplay from '../components/charts/PerformanceMetricsDisplay';
import LatestPredictionCard from '../components/charts/LatestPredictionCard';

export default function StockPrediction() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const predictStock = async () => {
    if (!ticker.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await predictionApi.predictStock(ticker);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prediction. Please ensure the backend API is running.');
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stock Price Prediction
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            LSTM-powered deep learning model for next-day stock price forecasts
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && predictStock()}
                placeholder="Enter stock ticker (e.g., AAPL, TSLA, MSFT)"
                className="w-full bg-teal-100/50 border border-teal-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 text-lg"
              />
            </div>
            <button
              onClick={predictStock}
              disabled={loading || !ticker.trim()}
              className="bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 rounded-lg px-8 py-3 font-semibold hover:from-teal-500 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Predict</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                This tool uses a bidirectional LSTM neural network trained on historical price data and technical
                indicators including MACD, RSI, moving averages, and volatility metrics. The model is cached for 7 days
                and automatically retrained when needed.
              </p>
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Note:</strong> If results fail to appear, it may be because we are using yfinance, which can break down when too many data requests are made simultaneously. Please try again in a few moments.
              </p>
            </div>
            <div className="bg-teal-100/50 border border-teal-300 rounded-lg p-3 text-sm text-gray-700">
              <p>
                Want to understand the valuation process behind our stock analysis? Ethan walks through the stock picker's methodology in detail{' '}
                <a
                  href="https://github.com/warhammeruser8888/stockpickerexplanation.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 font-semibold underline"
                >
                  on GitHub here
                </a>.
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {prediction && (
          <div className="space-y-6">
            <LatestPredictionCard
              currentPrice={prediction.current_price}
              predictedPrice={prediction.predicted_price}
              priceChange={prediction.price_change}
              priceChangePercent={prediction.price_change_percent}
              predictionDate={prediction.prediction_date}
              confidence={prediction.confidence}
              trend={prediction.trend}
            />

            <PerformanceMetricsDisplay
              metrics={prediction.model_performance}
              confidence={prediction.confidence}
            />

            <PredictionChart
              data={prediction.chart_data}
              ticker={prediction.ticker}
            />

            <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-teal-500" />
                <h3 className="text-2xl font-bold text-gray-900">Technical Levels</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-6">
                  <div className="text-sm text-emerald-400 mb-2 font-semibold">Support Level</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">${prediction.support.toFixed(2)}</div>
                  <p className="text-sm text-gray-700">
                    Key price floor where buying interest is expected to emerge
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6">
                  <div className="text-sm text-red-400 mb-2 font-semibold">Resistance Level</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">${prediction.resistance.toFixed(2)}</div>
                  <p className="text-sm text-gray-700">
                    Key price ceiling where selling pressure may intensify
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis Summary</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  Based on the LSTM model trained on historical data and technical indicators, {prediction.ticker} shows a{' '}
                  <span className={`font-bold ${
                    prediction.trend.includes('Bullish') ? 'text-emerald-400' :
                    prediction.trend.includes('Bearish') ? 'text-red-400' :
                    'text-gray-700'
                  }`}>
                    {prediction.trend.toLowerCase()}
                  </span>{' '}
                  trend pattern. The model predicts a next-day closing price of{' '}
                  <span className="font-bold text-gray-900">${prediction.predicted_price.toFixed(2)}</span>, with a
                  confidence level of {prediction.confidence.toFixed(0)}%.
                </p>
                <p>
                  Key support is identified at ${prediction.support.toFixed(2)}, while resistance sits at{' '}
                  ${prediction.resistance.toFixed(2)}. Current volatility of {prediction.volatility.toFixed(1)}%{' '}
                  suggests {prediction.volatility > 25 ? 'elevated' : 'moderate'} price fluctuation potential.
                </p>
                <p>
                  The model achieved a Mean Absolute Error (MAE) of {prediction.model_performance.mae.toFixed(4)} on the
                  test set, with RMSE of {prediction.model_performance.rmse.toFixed(4)}. These metrics indicate{' '}
                  {prediction.model_performance.mae < 5 ? 'strong' : prediction.model_performance.mae < 10 ? 'good' : 'moderate'}{' '}
                  predictive accuracy.
                </p>
                {prediction.is_cached && (
                  <p className="text-sm text-teal-600 pt-2 border-t border-teal-300">
                    <span className="font-semibold">Note:</span> This prediction uses a cached model. The model was
                    last trained on {new Date(prediction.last_updated).toLocaleDateString()}.
                  </p>
                )}
                <p className="text-sm text-gray-600 pt-4 border-t border-teal-300">
                  <strong>Disclaimer:</strong> This prediction is generated using a machine learning model trained on
                  historical data. Past performance does not guarantee future results. This tool is for educational and
                  informational purposes only and should not be considered financial advice. Always conduct thorough
                  research and consult with financial professionals before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        )}

        {!prediction && !error && !loading && (
          <div className="bg-gradient-to-br from-white to-teal-50/30 backdrop-blur-sm rounded-2xl border border-teal-300 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Enter a stock ticker to begin analysis
            </h3>
            <p className="text-slate-500">
              Get LSTM-powered predictions, model performance metrics, and next-day price forecasts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
