import { useState } from 'react';
import { Activity } from 'lucide-react';

export default function VolatilityCalculator() {
  const [priceInput, setPriceInput] = useState('100, 102, 98, 103, 101, 99, 104, 106, 103, 107');
  const [result, setResult] = useState<{
    historicalVol: number;
    annualizedVol: number;
    returns: number[];
    avgReturn: number;
    maxDrawdown: number;
  } | null>(null);

  const calculate = () => {
    const prices = priceInput.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));

    if (prices.length < 2) {
      alert('Please enter at least 2 prices');
      return;
    }

    const returns: number[] = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }

    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1);
    const historicalVol = Math.sqrt(variance);
    const annualizedVol = historicalVol * Math.sqrt(252);

    let peak = prices[0];
    let maxDrawdown = 0;
    for (const price of prices) {
      if (price > peak) {
        peak = price;
      }
      const drawdown = (peak - price) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    setResult({
      historicalVol: historicalVol * 100,
      annualizedVol: annualizedVol * 100,
      returns: returns.map(r => r * 100),
      avgReturn: avgReturn * 100,
      maxDrawdown: maxDrawdown * 100
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border border-teal-300 p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-8 h-8 text-teal-500" />
        <h2 className="text-3xl font-bold text-gray-900">Volatility Calculator</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Historical Prices (comma-separated)
        </label>
        <textarea
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          rows={4}
          className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500 font-mono text-sm"
          placeholder="100, 102, 98, 103, 101..."
        />
        <p className="text-xs text-gray-600 mt-1">Enter daily closing prices separated by commas</p>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg py-3 font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all"
      >
        Calculate Volatility
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-100 rounded-lg p-4 border border-teal-500">
              <div className="text-sm text-gray-600 mb-1">Daily Volatility</div>
              <div className="text-2xl font-bold text-teal-500">{result.historicalVol.toFixed(2)}%</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-teal-500">
              <div className="text-sm text-gray-600 mb-1">Annualized Volatility</div>
              <div className="text-2xl font-bold text-teal-500">{result.annualizedVol.toFixed(2)}%</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Average Return</div>
              <div className={`text-xl font-bold ${result.avgReturn >= 0 ? 'text-cyan-500' : 'text-red-500'}`}>
                {result.avgReturn.toFixed(3)}%
              </div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Max Drawdown</div>
              <div className="text-xl font-bold text-orange-600">{result.maxDrawdown.toFixed(2)}%</div>
            </div>
          </div>

          <div className="bg-teal-100 rounded-lg p-6 border border-cyan-300">
            <h3 className="text-gray-900 font-semibold mb-4">Daily Returns Distribution</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {result.returns.map((ret, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Day {index + 1}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-mono ${ret >= 0 ? 'text-cyan-500' : 'text-red-500'}`}>
                      {ret >= 0 ? '+' : ''}{ret.toFixed(2)}%
                    </span>
                    <div className="w-32 bg-green-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${ret >= 0 ? 'bg-cyan-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.abs(ret) * 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <h3 className="text-gray-900 font-semibold mb-2">Volatility Analysis</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              The asset exhibits a daily volatility of {result.historicalVol.toFixed(2)}%, which annualizes to{' '}
              {result.annualizedVol.toFixed(2)}% (using √252 scaling factor for trading days). The maximum drawdown
              of {result.maxDrawdown.toFixed(2)}% represents the largest peak-to-trough decline observed in this period.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-gray-900 font-semibold mb-2">About Volatility Metrics</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Historical volatility measures the standard deviation of price returns over time. It quantifies the magnitude
          of price fluctuations and is a key input for option pricing models, risk management, and portfolio construction.
          Annualized volatility scales daily measurements to yearly terms, assuming 252 trading days per year.
        </p>
      </div>
    </div>
  );
}
