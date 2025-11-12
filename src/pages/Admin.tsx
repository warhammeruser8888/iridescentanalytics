import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Report } from '../lib/supabase';
import { Plus, Edit2, Trash2, FileText, LogOut, Loader2 } from 'lucide-react';

interface AdminProps {
  onNavigate: (page: string) => void;
}

export default function Admin({ onNavigate }: AdminProps) {
  const { signOut } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReports(reports.filter(r => r.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete report');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-700">Manage your research reports</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate('admin-create')}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>New Report</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-900/20 to-slate-800/20 border-b border-teal-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Analyst</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-200">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-700 text-lg mb-2">No reports yet</p>
                      <p className="text-gray-600 text-sm">Create your first report to get started</p>
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id} className="hover:bg-teal-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-600 line-clamp-1">{report.summary}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{report.type}</td>
                      <td className="px-6 py-4 text-gray-700">{report.analyst}</td>
                      <td className="px-6 py-4 text-gray-700">{report.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onNavigate(`admin-edit-${report.id}`)}
                            className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          {deleteConfirm === report.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDelete(report.id)}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(report.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
