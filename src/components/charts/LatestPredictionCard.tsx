import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

interface LatestPredictionCardProps {
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  priceChangePercent: number;
  predictionDate: string;
  confidence: number;
  trend: string;
}

export default function LatestPredictionCard({
  currentPrice,
  predictedPrice,
  priceChange,
  priceChangePercent,
  predictionDate,
  confidence,
  trend
}: LatestPredictionCardProps) {
  const isPositive = priceChange > 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`bg-gradient-to-br ${
      isPositive
        ? 'from-emerald-50 to-teal-50'
        : 'from-red-50 to-orange-50'
    } rounded-2xl border ${
      isPositive ? 'border-emerald-300' : 'border-red-300'
    } p-8`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Next Day Prediction</h3>
        <Icon className={`w-8 h-8 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-semibold">Current Price</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">${currentPrice.toFixed(2)}</div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`w-5 h-5 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
            <span className="text-sm text-gray-600 font-semibold">Predicted Price</span>
          </div>
          <div className={`text-3xl font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            ${predictedPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-white/60 rounded-lg p-6 mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-600 mb-1">Price Change</div>
            <div className={`text-lg font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}${priceChange.toFixed(2)}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-600 mb-1">Percentage</div>
            <div className={`text-lg font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-600 mb-1">Trend</div>
            <div className={`text-lg font-bold ${
              trend.includes('Bullish') ? 'text-emerald-500' :
              trend.includes('Bearish') ? 'text-red-500' :
              'text-gray-700'
            }`}>
              {trend}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white/60 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">
            Prediction for: <span className="font-semibold">{new Date(predictionDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </span>
        </div>
        <div className="text-sm text-gray-700">
          Confidence: <span className={`font-bold ${
            confidence >= 80 ? 'text-emerald-500' :
            confidence >= 60 ? 'text-yellow-500' :
            'text-red-500'
          }`}>{confidence.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
