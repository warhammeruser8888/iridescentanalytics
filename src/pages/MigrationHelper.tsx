import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { migrateReportsToDatabase } from '../utils/migrateReports';

interface MigrationHelperProps {
  onNavigate: (page: string) => void;
}

export default function MigrationHelper({ onNavigate }: MigrationHelperProps) {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleMigration = async () => {
    setStatus('running');
    setMessage('Migrating reports to database...');

    try {
      await migrateReportsToDatabase();
      setStatus('success');
      setMessage('All reports have been successfully migrated to the database! You can now visit the Reports page to see them.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Migration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Migration</h1>
            <p className="text-gray-700">
              Click the button below to migrate your existing hardcoded reports to the database.
            </p>
          </div>

          {status === 'idle' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This will import 6 existing reports (case studies and recommendations) into your Supabase database.
                  This only needs to be done once.
                </p>
              </div>

              <button
                onClick={handleMigration}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg"
              >
                <Database className="w-5 h-5" />
                <span>Start Migration</span>
              </button>
            </div>
          )}

          {status === 'running' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-700">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-green-800 font-semibold mb-2">Migration Successful!</p>
                <p className="text-sm text-green-700">{message}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => onNavigate('reports')}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all"
                >
                  View Reports
                </button>
                <button
                  onClick={() => onNavigate('admin')}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
                >
                  Go to Admin
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-800 font-semibold mb-2">Migration Failed</p>
                <p className="text-sm text-red-700">{message}</p>
              </div>

              <button
                onClick={() => setStatus('idle')}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-teal-200">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
