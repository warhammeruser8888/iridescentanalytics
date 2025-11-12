import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart, BarChart3, Activity } from 'lucide-react';
import BlackScholesCalculator from '../components/tools/BlackScholesCalculator';
import MonteCarloSimulator from '../components/tools/MonteCarloSimulator';
import DCFCalculator from '../components/tools/DCFCalculator';
import PortfolioOptimizer from '../components/tools/PortfolioOptimizer';
import SharpeRatioCalculator from '../components/tools/SharpeRatioCalculator';
import VolatilityCalculator from '../components/tools/VolatilityCalculator';

const tools = [
  {
    id: 'blackscholes',
    name: 'Black-Scholes Model',
    icon: Calculator,
    description: 'Calculate theoretical option prices using the Black-Scholes-Merton formula',
    color: 'cyan'
  },
  {
    id: 'montecarlo',
    name: 'Monte Carlo Simulation',
    icon: TrendingUp,
    description: 'Simulate thousands of price paths to estimate risk and return distributions',
    color: 'blue'
  },
  {
    id: 'dcf',
    name: 'DCF Valuation',
    icon: DollarSign,
    description: 'Discounted cash flow analysis for intrinsic value estimation',
    color: 'emerald'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Optimizer',
    icon: PieChart,
    description: 'Find optimal asset allocation using Modern Portfolio Theory',
    color: 'purple'
  },
  {
    id: 'sharpe',
    name: 'Sharpe Ratio Calculator',
    icon: BarChart3,
    description: 'Calculate risk-adjusted returns for investment performance evaluation',
    color: 'orange'
  },
  {
    id: 'volatility',
    name: 'Volatility Calculator',
    icon: Activity,
    description: 'Compute historical and implied volatility metrics',
    color: 'red'
  }
];

export default function QuantTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (selectedTool) {
      case 'blackscholes':
        return <BlackScholesCalculator />;
      case 'montecarlo':
        return <MonteCarloSimulator />;
      case 'dcf':
        return <DCFCalculator />;
      case 'portfolio':
        return <PortfolioOptimizer />;
      case 'sharpe':
        return <SharpeRatioCalculator />;
      case 'volatility':
        return <VolatilityCalculator />;
      default:
        return null;
    }
  };

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedTool(null)}
            className="mb-6 text-gray-700 hover:text-gray-900 transition-colors"
          >
            ← Back to Tools
          </button>
          {renderTool()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quantitative Tools
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Professional-grade financial calculators and modeling tools, free for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            const colorClasses = {
              cyan: 'from-green-500 to-cyan-500',
              blue: 'from-blue-500 to-indigo-600',
              emerald: 'from-emerald-500 to-teal-600',
              purple: 'from-purple-500 to-pink-600',
              orange: 'from-orange-500 to-red-600',
              red: 'from-red-500 to-rose-600'
            };

            return (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-xl border border-teal-300 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden"
              >
                <div className={`p-6 bg-gradient-to-br ${colorClasses[tool.color as keyof typeof colorClasses]}/10`}>
                  <IconComponent className={`w-12 h-12 mb-4 bg-gradient-to-br ${colorClasses[tool.color as keyof typeof colorClasses]} bg-clip-text text-transparent group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-500 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="px-6 py-4 bg-teal-100/30">
                  <span className="text-sm text-teal-500 font-medium group-hover:underline">
                    Launch Calculator →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-br from-white to-teal-50/30 backdrop-blur-sm rounded-xl p-8 border border-teal-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Tools</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our quantitative tools are designed to provide institutional-grade financial analysis capabilities
            without the need for expensive software licenses or proprietary platforms. Each calculator implements
            industry-standard models and algorithms used by professional traders, analysts, and portfolio managers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations are performed client-side in your browser, ensuring your data remains private and secure.
            No registration required, no data collection, just pure mathematical analysis at your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
}
