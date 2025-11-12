import { Check, Sparkles, Crown, Zap } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pricing
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Professional financial tools and research, accessible to everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-10 h-10 text-teal-500" />
                <h2 className="text-3xl font-bold text-gray-900">Free Tier</h2>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600">Forever free, no credit card required</div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Everything included:</h3>
                <div className="space-y-3">
                  {[
                    'Unlimited access to all research reports',
                    'Full suite of quantitative calculators',
                    'Black-Scholes options pricing',
                    'Monte Carlo simulations',
                    'DCF valuation models',
                    'Portfolio optimization tools',
                    'Stock prediction analytics',
                    'Sharpe ratio & volatility calculators',
                    'No usage limits or restrictions',
                    'Regular report updates'
                  ].map((feature) => (
                    <div key={feature} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-1000/10 border border-teal-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-teal-500 mb-1">Currently Active</div>
                    <p className="text-sm text-gray-700">
                      All features are completely free and fully functional. Start exploring immediately!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl border-2 border-amber-500/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 px-6 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              COMING SOON
            </div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Crown className="w-10 h-10 text-amber-400" />
                <h2 className="text-3xl font-bold text-gray-900">Premium</h2>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-bold text-gray-900">$4.99</span>
                  <span className="text-gray-600">one-time</span>
                </div>
                <div className="text-amber-400 font-semibold mt-2">Lifetime access, pay once</div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Everything in Free, plus:</h3>
                <div className="space-y-3">
                  {[
                    'Exclusive weekly newsletter with market insights',
                    'Advanced calculators & modeling tools',
                    'Real-time market data integration',
                    'Custom portfolio tracking',
                    'Downloadable report PDFs',
                    'API access for automated analysis',
                    'Priority access to new features',
                    'Direct support from founders',
                    'Exclusive webinars & tutorials',
                    'Community Discord access'
                  ].map((feature) => (
                    <div key={feature} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                disabled
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 rounded-lg py-4 font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Coming Soon
              </button>

              <div className="mt-6 bg-amber-900/30 border border-amber-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-700">
                  <strong className="text-amber-400">Planned Launch:</strong> Premium features will be introduced
                  once we reach 1,000 active users. Want early access? Connect with us on LinkedIn and let us know!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why We're Free</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
            <p>
              At Iridescent Analytics, our mission is to democratize access to professional financial tools and research.
              We believe that cost should never be a barrier to learning, exploring markets, or developing analytical skills.
            </p>
            <p>
              That's why we've made our entire platform completely free—no trials, no hidden fees, no credit card required.
              Every calculator, every report, and every tool is available to everyone, immediately.
            </p>
            <p>
              We're students building this platform because we wished something like this existed when we started exploring
              quantitative finance. Premium features will eventually help sustain development and infrastructure costs,
              but our core commitment remains unchanged: high-quality financial education and tools should be accessible
              to all.
            </p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-teal-100/50 rounded-lg p-6 border border-teal-300 text-center">
            <div className="text-3xl font-bold text-teal-500 mb-2">100%</div>
            <div className="text-gray-700">Features Currently Free</div>
          </div>

          <div className="bg-teal-100/50 rounded-lg p-6 border border-teal-300 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
            <div className="text-gray-700">No Usage Limits</div>
          </div>

          <div className="bg-teal-100/50 rounded-lg p-6 border border-teal-300 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">$0</div>
            <div className="text-gray-700">Required to Start</div>
          </div>
        </div>
      </div>
    </div>
  );
}
