import { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Reports', id: 'reports' },
    { name: 'Quant Tools', id: 'tools' },
    { name: 'Stock Prediction', id: 'prediction' },
    { name: 'About', id: 'about' },
    { name: 'Pricing', id: 'pricing' },
  ];

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-cyan-500 border-b border-teal-400 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img
              src="/Iridescent Analytics Logo.jpg"
              alt="Iridescent Analytics Logo"
              className="w-8 h-8 rounded-md object-cover"
            />
            <span className="text-xl font-bold text-white">
              Iridescent Analytics
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-white text-teal-600'
                    : 'text-white hover:text-teal-100 hover:bg-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-teal-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-white text-teal-600'
                    : 'text-white hover:text-teal-100 hover:bg-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
