import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ReportsDynamic from './pages/ReportsDynamic';
import QuantTools from './pages/QuantTools';
import StockPrediction from './pages/StockPrediction';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ReportForm from './pages/ReportForm';
import MigrationHelper from './pages/MigrationHelper';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    if (currentPage.startsWith('admin-edit-')) {
      const reportId = currentPage.replace('admin-edit-', '');
      return (
        <ProtectedRoute onNavigate={setCurrentPage}>
          <ReportForm reportId={reportId} onNavigate={setCurrentPage} />
        </ProtectedRoute>
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'reports':
        return <ReportsDynamic />;
      case 'tools':
        return <QuantTools />;
      case 'prediction':
        return <StockPrediction />;
      case 'about':
        return <About />;
      case 'pricing':
        return <Pricing />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'admin':
        return (
          <ProtectedRoute onNavigate={setCurrentPage}>
            <Admin onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );
      case 'admin-create':
        return (
          <ProtectedRoute onNavigate={setCurrentPage}>
            <ReportForm onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );
      case 'migrate':
        return <MigrationHelper onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>{renderPage()}</main>
        <footer className="bg-gradient-to-r from-teal-500 to-cyan-500 border-t border-teal-400 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-white text-sm">
            <p className="mb-2">© 2025 Iridescent Analytics. All rights reserved.</p>
            <p>
              Built with passion for democratizing financial education. All research and tools provided for
              educational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
