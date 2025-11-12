import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export default function SharpeRatioCalculator() {
  const [inputs, setInputs] = useState({
    portfolioReturn: '12',
    riskFreeRate: '3',
    portfolioStdDev: '15'
  });

  const [result, setResult] = useState<{
    sharpeRatio: number;
    excessReturn: number;
    interpretation: string;
  } | null>(null);

  const calculate = () => {
    const portReturn = parseFloat(inputs.portfolioReturn);
    const rfRate = parseFloat(inputs.riskFreeRate);
    const stdDev = parseFloat(inputs.portfolioStdDev);

    const excessReturn = portReturn - rfRate;
    const sharpeRatio = excessReturn / stdDev;

    let interpretation = '';
    if (sharpeRatio < 0) {
      interpretation = 'Negative - Portfolio underperforms risk-free rate';
    } else if (sharpeRatio < 1) {
      interpretation = 'Below 1 - Sub-optimal risk-adjusted returns';
    } else if (sharpeRatio < 2) {
      interpretation = 'Good - Acceptable risk-adjusted returns';
    } else if (sharpeRatio < 3) {
      interpretation = 'Very Good - Strong risk-adjusted performance';
    } else {
      interpretation = 'Excellent - Outstanding risk-adjusted returns';
    }

    setResult({ sharpeRatio, excessReturn, interpretation });
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border border-teal-300 p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-8 h-8 text-teal-500" />
        <h2 className="text-3xl font-bold text-gray-900">Sharpe Ratio Calculator</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Return (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.portfolioReturn}
            onChange={(e) => setInputs({ ...inputs, portfolioReturn: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk-Free Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.riskFreeRate}
            onChange={(e) => setInputs({ ...inputs, riskFreeRate: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Standard Deviation (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.portfolioStdDev}
            onChange={(e) => setInputs({ ...inputs, portfolioStdDev: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg py-3 font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all"
      >
        Calculate Sharpe Ratio
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="bg-teal-100 rounded-lg p-6 border border-teal-500">
            <div className="text-sm text-gray-600 mb-2">Sharpe Ratio</div>
            <div className="text-4xl font-bold text-teal-500 mb-2">{result.sharpeRatio.toFixed(3)}</div>
            <div className="text-gray-700">{result.interpretation}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Excess Return</div>
              <div className="text-2xl font-bold text-gray-900">{result.excessReturn.toFixed(2)}%</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Return per Unit Risk</div>
              <div className="text-2xl font-bold text-gray-900">{result.sharpeRatio.toFixed(3)}</div>
            </div>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <h3 className="text-gray-900 font-semibold mb-2">Performance Interpretation</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Sharpe &lt; 0:</span>
                <span className="text-red-500 font-semibold">Poor - Below risk-free rate</span>
              </div>
              <div className="flex justify-between">
                <span>Sharpe 0-1:</span>
                <span className="text-orange-500 font-semibold">Sub-optimal</span>
              </div>
              <div className="flex justify-between">
                <span>Sharpe 1-2:</span>
                <span className="text-yellow-600 font-semibold">Good</span>
              </div>
              <div className="flex justify-between">
                <span>Sharpe 2-3:</span>
                <span className="text-teal-500 font-semibold">Very Good</span>
              </div>
              <div className="flex justify-between">
                <span>Sharpe &gt; 3:</span>
                <span className="text-cyan-500 font-semibold">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-gray-900 font-semibold mb-2">About the Sharpe Ratio</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          The Sharpe ratio, developed by Nobel laureate William F. Sharpe, measures risk-adjusted return by
          comparing the excess return (above the risk-free rate) to the standard deviation of returns. A higher
          ratio indicates better risk-adjusted performance. It's one of the most widely used metrics in portfolio
          evaluation and fund management.
        </p>
      </div>
    </div>
  );
}
