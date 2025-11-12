import { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function DCFCalculator() {
  const [inputs, setInputs] = useState({
    currentFCF: '1000',
    growthRate: '5',
    terminalGrowth: '2.5',
    wacc: '10',
    projectionYears: '5',
    sharesOutstanding: '100'
  });

  const [result, setResult] = useState<{
    presentValueFCF: number;
    terminalValue: number;
    presentValueTerminal: number;
    enterpriseValue: number;
    pricePerShare: number;
    cashFlows: number[];
  } | null>(null);

  const calculate = () => {
    const fcf0 = parseFloat(inputs.currentFCF);
    const g = parseFloat(inputs.growthRate) / 100;
    const gTerminal = parseFloat(inputs.terminalGrowth) / 100;
    const wacc = parseFloat(inputs.wacc) / 100;
    const years = parseInt(inputs.projectionYears);
    const shares = parseFloat(inputs.sharesOutstanding);

    const cashFlows: number[] = [];
    let pvFCF = 0;

    for (let t = 1; t <= years; t++) {
      const fcf = fcf0 * Math.pow(1 + g, t);
      cashFlows.push(fcf);
      const pv = fcf / Math.pow(1 + wacc, t);
      pvFCF += pv;
    }

    const finalFCF = cashFlows[cashFlows.length - 1];
    const terminalValue = (finalFCF * (1 + gTerminal)) / (wacc - gTerminal);
    const pvTerminal = terminalValue / Math.pow(1 + wacc, years);

    const enterpriseValue = pvFCF + pvTerminal;
    const pricePerShare = enterpriseValue / shares;

    setResult({
      presentValueFCF: pvFCF,
      terminalValue,
      presentValueTerminal: pvTerminal,
      enterpriseValue,
      pricePerShare,
      cashFlows
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border border-teal-300 p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="w-8 h-8 text-cyan-500" />
        <h2 className="text-3xl font-bold text-gray-900">DCF Valuation Model</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Free Cash Flow ($M)</label>
          <input
            type="number"
            value={inputs.currentFCF}
            onChange={(e) => setInputs({ ...inputs, currentFCF: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">FCF Growth Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.growthRate}
            onChange={(e) => setInputs({ ...inputs, growthRate: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Terminal Growth Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.terminalGrowth}
            onChange={(e) => setInputs({ ...inputs, terminalGrowth: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WACC (%)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.wacc}
            onChange={(e) => setInputs({ ...inputs, wacc: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Projection Years</label>
          <input
            type="number"
            value={inputs.projectionYears}
            onChange={(e) => setInputs({ ...inputs, projectionYears: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shares Outstanding (M)</label>
          <input
            type="number"
            value={inputs.sharesOutstanding}
            onChange={(e) => setInputs({ ...inputs, sharesOutstanding: e.target.value })}
            className="w-full bg-teal-100 border border-teal-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg py-3 font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
      >
        Calculate Intrinsic Value
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-500">
              <div className="text-sm text-gray-600 mb-1">Intrinsic Value per Share</div>
              <div className="text-3xl font-bold text-cyan-500">${result.pricePerShare.toFixed(2)}</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-teal-500">
              <div className="text-sm text-gray-600 mb-1">Enterprise Value</div>
              <div className="text-2xl font-bold text-gray-900">${result.enterpriseValue.toFixed(2)}M</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">PV of Projected FCF</div>
              <div className="text-xl font-bold text-gray-900">${result.presentValueFCF.toFixed(2)}M</div>
            </div>

            <div className="bg-teal-100 rounded-lg p-4 border border-cyan-300">
              <div className="text-sm text-gray-600 mb-1">PV of Terminal Value</div>
              <div className="text-xl font-bold text-gray-900">${result.presentValueTerminal.toFixed(2)}M</div>
            </div>
          </div>

          <div className="bg-teal-100 rounded-lg p-6 border border-cyan-300">
            <h3 className="text-gray-900 font-semibold mb-4">Projected Free Cash Flows</h3>
            <div className="space-y-2">
              {result.cashFlows.map((fcf, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">Year {index + 1}</span>
                  <span className="text-gray-900 font-mono">${fcf.toFixed(2)}M</span>
                </div>
              ))}
              <div className="border-t border-cyan-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Terminal Value</span>
                  <span className="text-cyan-500 font-mono font-bold">${result.terminalValue.toFixed(2)}M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <h3 className="text-gray-900 font-semibold mb-2">Valuation Summary</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Based on the discounted cash flow analysis, the intrinsic value per share is estimated at{' '}
              <span className="font-bold text-cyan-500">${result.pricePerShare.toFixed(2)}</span>. Terminal value
              represents {((result.presentValueTerminal / result.enterpriseValue) * 100).toFixed(1)}% of total enterprise value.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-gray-900 font-semibold mb-2">About DCF Analysis</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Discounted Cash Flow (DCF) analysis estimates a company's intrinsic value by projecting future free cash
          flows and discounting them to present value using the Weighted Average Cost of Capital (WACC). The terminal
          value captures the company's value beyond the explicit forecast period.
        </p>
      </div>
    </div>
  );
}
