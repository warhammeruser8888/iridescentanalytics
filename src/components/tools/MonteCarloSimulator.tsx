import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function MonteCarloSimulator() {
  const [inputs, setInputs] = useState({
    initialPrice: '100',
    expectedReturn: '10',
    volatility: '20',
    timeHorizon: '1',
    simulations: '10000'
  });

  const [result, setResult] = useState<{
    mean: number;
    median: number;
    std: number;
    percentile5: number;
    percentile95: number;
    probProfit: number;
  } | null>(null);

  const simulate = () => {
    const S0 = parseFloat(inputs.initialPrice);
    const mu = parseFloat(inputs.expectedReturn) / 100;
    const sigma = parseFloat(inputs.volatility) / 100;
    const T = parseFloat(inputs.timeHorizon);
    const N = parseInt(inputs.simulations);

    const finalPrices: number[] = [];

    for (let i = 0; i < N; i++) {
      const Z = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
      const ST = S0 * Math.exp((mu - 0.5 * sigma * sigma) * T + sigma * Math.sqrt(T) * Z);
      finalPrices.push(ST);
    }

    finalPrices.sort((a, b) => a - b);

    const mean = finalPrices.reduce((a, b) => a + b, 0) / N;
    const median = finalPrices[Math.floor(N / 2)];
    const variance = finalPrices.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / N;
    const std = Math.sqrt(variance);
    const percentile5 = finalPrices[Math.floor(N * 0.05)];
    const percentile95 = finalPrices[Math.floor(N * 0.95)];
    const probProfit = (finalPrices.filter(p => p > S0).length / N) * 100;

    setResult({ mean, median, std, percentile5, percentile95, probProfit });
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border border-teal-300 p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-8 h-8 text-cyan-500" />
        <h2 className="text-3xl font-bold text-gray-900">Monte Carlo Simulation</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Price ($)</label>
          <input
            type="number"
            value={inputs.initialPrice}
            onChange={(e) => setInputs({ ...inputs, initialPrice: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (% annual)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.expectedReturn}
            onChange={(e) => setInputs({ ...inputs, expectedReturn: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Volatility (% annual)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.volatility}
            onChange={(e) => setInputs({ ...inputs, volatility: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon (years)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.timeHorizon}
            onChange={(e) => setInputs({ ...inputs, timeHorizon: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Simulations</label>
          <input
            type="number"
            step="1000"
            value={inputs.simulations}
            onChange={(e) => setInputs({ ...inputs, simulations: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <button
        onClick={simulate}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg py-3 font-semibold hover:from-emerald-700 hover:to-green-700 transition-all"
      >
        Run Simulation
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-teal-100 rounded-lg p-4 border border-teal-500">
              <div className="text-sm text-gray-600 mb-1">Mean Price</div>
              <div className="text-2xl font-bold text-teal-500">${result.mean.toFixed(2)}</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Median Price</div>
              <div className="text-xl font-bold text-gray-900">${result.median.toFixed(2)}</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Std. Deviation</div>
              <div className="text-xl font-bold text-gray-900">${result.std.toFixed(2)}</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">5th Percentile (VaR)</div>
              <div className="text-xl font-bold text-red-500">${result.percentile5.toFixed(2)}</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">95th Percentile</div>
              <div className="text-xl font-bold text-cyan-500">${result.percentile95.toFixed(2)}</div>
            </div>

            <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-500">
              <div className="text-sm text-gray-600 mb-1">Probability of Profit</div>
              <div className="text-xl font-bold text-cyan-500">{result.probProfit.toFixed(1)}%</div>
            </div>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <h3 className="text-gray-900 font-semibold mb-2">Interpretation</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Based on {inputs.simulations} simulations, there is a {result.probProfit.toFixed(1)}% probability
              the asset price will be above ${inputs.initialPrice} after {inputs.timeHorizon} year(s). The 5th percentile
              represents the Value at Risk (VaR) threshold, indicating potential downside exposure.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-gray-900 font-semibold mb-2">About Monte Carlo Simulation</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Monte Carlo simulation uses random sampling to model the probability distribution of future asset prices.
          It assumes prices follow a log-normal distribution (Geometric Brownian Motion) and generates thousands
          of potential outcomes to estimate risk metrics and return distributions.
        </p>
      </div>
    </div>
  );
}
