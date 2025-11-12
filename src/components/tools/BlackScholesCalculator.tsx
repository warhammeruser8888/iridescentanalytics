import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function BlackScholesCalculator() {
  const [inputs, setInputs] = useState({
    spotPrice: '100',
    strikePrice: '100',
    timeToExpiry: '1',
    riskFreeRate: '5',
    volatility: '20',
    optionType: 'call'
  });

  const [result, setResult] = useState<{
    price: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
  } | null>(null);

  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - probability : probability;
  };

  const normalPDF = (x: number): number => {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  };

  const calculate = () => {
    const S = parseFloat(inputs.spotPrice);
    const K = parseFloat(inputs.strikePrice);
    const T = parseFloat(inputs.timeToExpiry);
    const r = parseFloat(inputs.riskFreeRate) / 100;
    const sigma = parseFloat(inputs.volatility) / 100;

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    let price, delta, gamma, theta, vega, rho;

    if (inputs.optionType === 'call') {
      price = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
      delta = normalCDF(d1);
      rho = K * T * Math.exp(-r * T) * normalCDF(d2) / 100;
    } else {
      price = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
      delta = normalCDF(d1) - 1;
      rho = -K * T * Math.exp(-r * T) * normalCDF(-d2) / 100;
    }

    gamma = normalPDF(d1) / (S * sigma * Math.sqrt(T));
    theta = -(S * normalPDF(d1) * sigma) / (2 * Math.sqrt(T)) -
            (inputs.optionType === 'call' ? 1 : -1) * r * K * Math.exp(-r * T) * normalCDF(inputs.optionType === 'call' ? d2 : -d2);
    theta = theta / 365;
    vega = S * normalPDF(d1) * Math.sqrt(T) / 100;

    setResult({ price, delta, gamma, theta, vega, rho });
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border border-teal-300 p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-8 h-8 text-teal-500" />
        <h2 className="text-3xl font-bold text-gray-900">Black-Scholes Option Pricing</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Spot Price ($)</label>
          <input
            type="number"
            value={inputs.spotPrice}
            onChange={(e) => setInputs({ ...inputs, spotPrice: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Strike Price ($)</label>
          <input
            type="number"
            value={inputs.strikePrice}
            onChange={(e) => setInputs({ ...inputs, strikePrice: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time to Expiry (years)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.timeToExpiry}
            onChange={(e) => setInputs({ ...inputs, timeToExpiry: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Volatility (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.volatility}
            onChange={(e) => setInputs({ ...inputs, volatility: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Option Type</label>
          <select
            value={inputs.optionType}
            onChange={(e) => setInputs({ ...inputs, optionType: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
          >
            <option value="call">Call Option</option>
            <option value="put">Put Option</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg py-3 font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all"
      >
        Calculate Option Price
      </button>

      {result && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-teal-100 rounded-lg p-4 border border-teal-500">
            <div className="text-sm text-gray-600 mb-1">Option Price</div>
            <div className="text-2xl font-bold text-teal-500">${result.price.toFixed(2)}</div>
          </div>

          <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
            <div className="text-sm text-gray-600 mb-1">Delta (Δ)</div>
            <div className="text-xl font-bold text-gray-900">{result.delta.toFixed(4)}</div>
          </div>

          <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
            <div className="text-sm text-gray-600 mb-1">Gamma (Γ)</div>
            <div className="text-xl font-bold text-gray-900">{result.gamma.toFixed(4)}</div>
          </div>

          <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
            <div className="text-sm text-gray-600 mb-1">Theta (Θ)</div>
            <div className="text-xl font-bold text-gray-900">{result.theta.toFixed(4)}</div>
          </div>

          <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
            <div className="text-sm text-gray-600 mb-1">Vega (ν)</div>
            <div className="text-xl font-bold text-gray-900">{result.vega.toFixed(4)}</div>
          </div>

          <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
            <div className="text-sm text-gray-600 mb-1">Rho (ρ)</div>
            <div className="text-xl font-bold text-gray-900">{result.rho.toFixed(4)}</div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-gray-900 font-semibold mb-2">About the Black-Scholes Model</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          The Black-Scholes model calculates the theoretical value of European-style options. The Greeks measure
          sensitivity to various factors: Delta (price movement), Gamma (delta change), Theta (time decay),
          Vega (volatility), and Rho (interest rates).
        </p>
      </div>
    </div>
  );
}
