import { useState } from 'react';
import { PieChart } from 'lucide-react';

export default function PortfolioOptimizer() {
  const [assets, setAssets] = useState([
    { name: 'Asset 1', expectedReturn: '10', volatility: '15', weight: '0' },
    { name: 'Asset 2', expectedReturn: '12', volatility: '20', weight: '0' },
    { name: 'Asset 3', expectedReturn: '8', volatility: '10', weight: '0' }
  ]);

  const [correlation, setCorrelation] = useState('0.3');
  const [result, setResult] = useState<{
    optimalWeights: number[];
    portfolioReturn: number;
    portfolioRisk: number;
    sharpeRatio: number;
  } | null>(null);

  const addAsset = () => {
    setAssets([...assets, { name: `Asset ${assets.length + 1}`, expectedReturn: '10', volatility: '15', weight: '0' }]);
  };

  const removeAsset = (index: number) => {
    if (assets.length > 2) {
      setAssets(assets.filter((_, i) => i !== index));
    }
  };

  const updateAsset = (index: number, field: string, value: string) => {
    const newAssets = [...assets];
    newAssets[index] = { ...newAssets[index], [field]: value };
    setAssets(newAssets);
  };

  const optimize = () => {
    const n = assets.length;
    const returns = assets.map(a => parseFloat(a.expectedReturn) / 100);
    const vols = assets.map(a => parseFloat(a.volatility) / 100);
    const corr = parseFloat(correlation);

    const weights = new Array(n).fill(1 / n);

    for (let iteration = 0; iteration < 100; iteration++) {
      const portReturn = weights.reduce((sum, w, i) => sum + w * returns[i], 0);
      let portVariance = 0;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const corrVal = i === j ? 1 : corr;
          portVariance += weights[i] * weights[j] * vols[i] * vols[j] * corrVal;
        }
      }
      const portVol = Math.sqrt(portVariance);
      const sharpe = portReturn / portVol;

      const gradients = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        const dReturn = returns[i];
        let dVol = 0;
        for (let j = 0; j < n; j++) {
          const corrVal = i === j ? 1 : corr;
          dVol += 2 * weights[j] * vols[i] * vols[j] * corrVal;
        }
        dVol = dVol / (2 * portVol);
        gradients[i] = (dReturn * portVol - portReturn * dVol) / (portVol * portVol);
      }

      const learningRate = 0.01;
      for (let i = 0; i < n; i++) {
        weights[i] += learningRate * gradients[i];
      }

      const sum = weights.reduce((a, b) => a + b, 0);
      for (let i = 0; i < n; i++) {
        weights[i] = Math.max(0, weights[i]) / sum;
      }
    }

    const finalReturn = weights.reduce((sum, w, i) => sum + w * returns[i], 0);
    let finalVariance = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const corrVal = i === j ? 1 : corr;
        finalVariance += weights[i] * weights[j] * vols[i] * vols[j] * corrVal;
      }
    }
    const finalVol = Math.sqrt(finalVariance);
    const finalSharpe = finalReturn / finalVol;

    setResult({
      optimalWeights: weights,
      portfolioReturn: finalReturn * 100,
      portfolioRisk: finalVol * 100,
      sharpeRatio: finalSharpe
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border border-teal-300 p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <PieChart className="w-8 h-8 text-teal-500" />
        <h2 className="text-3xl font-bold text-gray-900">Portfolio Optimizer</h2>
      </div>

      <div className="space-y-4 mb-6">
        {assets.map((asset, index) => (
          <div key={index} className="bg-teal-100 rounded-lg p-4 border border-teal-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={asset.name}
                onChange={(e) => updateAsset(index, 'name', e.target.value)}
                placeholder="Asset Name"
                className="bg-gradient-to-br from-white to-teal-50 border border-cyan-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
              />
              <input
                type="number"
                value={asset.expectedReturn}
                onChange={(e) => updateAsset(index, 'expectedReturn', e.target.value)}
                placeholder="Return %"
                className="bg-gradient-to-br from-white to-teal-50 border border-cyan-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
              />
              <input
                type="number"
                value={asset.volatility}
                onChange={(e) => updateAsset(index, 'volatility', e.target.value)}
                placeholder="Volatility %"
                className="bg-gradient-to-br from-white to-teal-50 border border-cyan-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={() => removeAsset(index)}
                disabled={assets.length <= 2}
                className="bg-red-100 text-red-600 rounded px-3 py-2 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addAsset}
        className="w-full bg-green-100 text-green-700 rounded-lg py-2 mb-6 hover:bg-green-200 transition-colors"
      >
        + Add Asset
      </button>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Asset Correlation</label>
        <input
          type="number"
          step="0.1"
          min="-1"
          max="1"
          value={correlation}
          onChange={(e) => setCorrelation(e.target.value)}
          className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-teal-500"
        />
        <p className="text-xs text-gray-600 mt-1">Range: -1 (perfect negative) to 1 (perfect positive)</p>
      </div>

      <button
        onClick={optimize}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg py-3 font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all"
      >
        Optimize Portfolio
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-teal-100 rounded-lg p-4 border border-teal-500">
              <div className="text-sm text-gray-600 mb-1">Expected Return</div>
              <div className="text-2xl font-bold text-teal-500">{result.portfolioReturn.toFixed(2)}%</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Portfolio Risk</div>
              <div className="text-2xl font-bold text-gray-900">{result.portfolioRisk.toFixed(2)}%</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">Sharpe Ratio</div>
              <div className="text-2xl font-bold text-gray-900">{result.sharpeRatio.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-teal-100 rounded-lg p-6 border border-cyan-300">
            <h3 className="text-gray-900 font-semibold mb-4">Optimal Asset Allocation</h3>
            <div className="space-y-3">
              {assets.map((asset, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{asset.name}</span>
                    <span className="text-gray-900 font-bold">{(result.optimalWeights[index] * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all"
                      style={{ width: `${result.optimalWeights[index] * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <h3 className="text-gray-900 font-semibold mb-2">Optimization Result</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              The optimizer maximizes the Sharpe ratio by balancing expected returns against portfolio risk.
              These weights represent the efficient frontier allocation for maximum risk-adjusted returns
              given the specified asset characteristics and correlations.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-gray-900 font-semibold mb-2">About Portfolio Optimization</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Based on Modern Portfolio Theory (MPT), this optimizer finds the asset allocation that maximizes
          risk-adjusted returns. The Sharpe ratio measures excess return per unit of risk, and the efficient
          frontier represents the optimal risk-return tradeoff for different portfolios.
        </p>
      </div>
    </div>
  );
}
