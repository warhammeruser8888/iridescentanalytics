import { BarChart3, BookOpen, Calculator, TrendingUp, Users, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img
                src="/Iridescent Analytics Logo.jpg"
                alt="Iridescent Analytics Logo"
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-lg"
              />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Iridescent Analytics
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of financial analysts with accessible research,
            quantitative tools, and actionable insights
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => onNavigate('reports')}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30"
            >
              Explore Reports
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className="px-8 py-3 bg-gradient-to-br from-white to-teal-50 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all border-2 border-teal-500"
            >
              Try Quant Tools
            </button>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-8 border-2 border-teal-200 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
              At Iridescent Analytics, we believe that sophisticated financial analysis and quantitative tools
              shouldn't be locked behind expensive paywalls or exclusive institutions. Our mission is to democratize
              access to professional-grade market research, econometric analysis, and computational finance tools,
              empowering students, independent researchers, and aspiring quants to embark on ambitious projects in finance.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mt-4">
              We combine rigorous academic research with practical market insights, providing you with the resources
              to make informed decisions and develop your analytical capabilities. Whether you're exploring equity
              research, building quantitative models, or learning about financial markets, Iridescent Analytics is
              your partner in discovery.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div
            onClick={() => onNavigate('reports')}
            className="bg-gradient-to-br from-white to-teal-50 rounded-xl p-8 border-2 border-teal-300 hover:border-teal-500 hover:shadow-xl transition-all cursor-pointer group"
          >
            <BookOpen className="w-12 h-12 text-teal-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Research Reports</h3>
            <p className="text-gray-700 leading-relaxed">
              Access comprehensive stock analysis, long/short recommendations, and econometric research reports
              covering emerging trends and market opportunities.
            </p>
          </div>

          <div
            onClick={() => onNavigate('tools')}
            className="bg-gradient-to-br from-white to-cyan-50 rounded-xl p-8 border-2 border-cyan-300 hover:border-cyan-500 hover:shadow-xl transition-all cursor-pointer group"
          >
            <Calculator className="w-12 h-12 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Quantitative Tools</h3>
            <p className="text-gray-700 leading-relaxed">
              Utilize powerful calculators including Black-Scholes models, Monte Carlo simulations, DCF analysis,
              and portfolio optimization tools—all free and browser-based.
            </p>
          </div>

          <div
            onClick={() => onNavigate('prediction')}
            className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-8 border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group"
          >
            <TrendingUp className="w-12 h-12 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Stock Predictions</h3>
            <p className="text-gray-700 leading-relaxed">
              Get AI-powered stock analytics and price predictions. Enter any ticker to view historical performance,
              key metrics, and forward-looking forecasts.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-8 border-2 border-teal-300 shadow-lg">
            <BarChart3 className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Evidence-Based Analysis</h3>
            <p className="text-gray-700 leading-relaxed">
              All our research is grounded in rigorous quantitative methods, econometric modeling, and empirical data.
              We prioritize intellectual honesty and transparent methodology in every report we publish.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-100 to-emerald-100 rounded-xl p-8 border-2 border-cyan-300 shadow-lg">
            <Users className="w-10 h-10 text-cyan-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Community First</h3>
            <p className="text-gray-700 leading-relaxed">
              Built by students, for students and independent researchers. We're committed to keeping our core tools
              and research accessible to everyone pursuing knowledge in quantitative finance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
