import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

interface PerformanceMetricsDisplayProps {
  metrics: {
    mse: number;
    rmse: number;
    mae: number;
    test_samples: number;
  };
  confidence: number;
}

export default function PerformanceMetricsDisplay({ metrics, confidence }: PerformanceMetricsDisplayProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-400';
  };

  const getConfidenceBgColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-teal-500" />
        <h3 className="text-2xl font-bold text-gray-900">Model Performance</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-teal-100/50 rounded-lg p-6 border border-cyan-300">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-semibold">MAE</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.mae.toFixed(4)}</div>
          <div className="text-xs text-gray-600 mt-1">Mean Absolute Error</div>
        </div>

        <div className="bg-teal-100/50 rounded-lg p-6 border border-cyan-300">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-semibold">MSE</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.mse.toFixed(4)}</div>
          <div className="text-xs text-gray-600 mt-1">Mean Squared Error</div>
        </div>

        <div className="bg-teal-100/50 rounded-lg p-6 border border-cyan-300">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-semibold">RMSE</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.rmse.toFixed(4)}</div>
          <div className="text-xs text-gray-600 mt-1">Root Mean Squared Error</div>
        </div>

        <div className="bg-teal-100/50 rounded-lg p-6 border border-cyan-300">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-semibold">Confidence</span>
          </div>
          <div className={`text-2xl font-bold ${getConfidenceColor(confidence)}`}>
            {confidence.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
            <div
              className={`${getConfidenceBgColor(confidence)} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-cyan-100/30 border border-cyan-300 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Model Accuracy:</span> The model was trained and tested on{' '}
          <span className="font-bold text-gray-900">{metrics.test_samples}</span> data points. Lower MAE, MSE, and RMSE
          values indicate better prediction accuracy. The confidence score represents the model's reliability based on
          historical performance.
        </p>
      </div>
    </div>
  );
}
