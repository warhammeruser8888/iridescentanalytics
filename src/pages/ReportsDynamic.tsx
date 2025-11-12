import { useState, useEffect } from 'react';
import { FileText, Search, X, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase, Report } from '../lib/supabase';

export default function ReportsDynamic() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.analyst.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.FileText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchReports}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedReport !== null) {
    const IconComponent = getIconComponent(selectedReport.icon_name);

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedReport(null)}
            className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Back to Reports</span>
          </button>

          <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 overflow-hidden">
            <div className={`p-8 border-b border-teal-300 bg-gradient-to-r ${
              selectedReport.color === 'red' ? 'from-red-900/20 to-slate-800/20' :
              selectedReport.color === 'green' ? 'from-emerald-900/20 to-slate-800/20' :
              selectedReport.color === 'purple' ? 'from-purple-900/20 to-slate-800/20' :
              selectedReport.color === 'orange' ? 'from-orange-900/20 to-slate-800/20' :
              'from-blue-900/20 to-slate-800/20'
            }`}>
              <div className="flex items-start space-x-4">
                <IconComponent className={`w-12 h-12 ${
                  selectedReport.color === 'red' ? 'text-red-400' :
                  selectedReport.color === 'green' ? 'text-emerald-400' :
                  selectedReport.color === 'purple' ? 'text-purple-400' :
                  selectedReport.color === 'orange' ? 'text-orange-400' :
                  'text-blue-400'
                }`} />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedReport.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {selectedReport.type}
                    </span>
                    <span>Analyst: {selectedReport.analyst}</span>
                    <span>{selectedReport.date}</span>
                  </div>
                  {selectedReport.recommendation !== 'Research' && selectedReport.recommendation !== 'Case Study' && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="bg-teal-100/50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-gray-600">Recommendation</div>
                        <div className={`text-lg font-bold ${
                          selectedReport.recommendation === 'Short' ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {selectedReport.recommendation}
                        </div>
                      </div>
                      {selectedReport.current_price && (
                        <div className="bg-teal-100/50 px-4 py-2 rounded-lg">
                          <div className="text-xs text-gray-600">Current Price</div>
                          <div className="text-lg font-bold text-gray-900">{selectedReport.current_price}</div>
                        </div>
                      )}
                      {selectedReport.target_price && (
                        <div className="bg-teal-100/50 px-4 py-2 rounded-lg">
                          <div className="text-xs text-gray-600">Target Price</div>
                          <div className="text-lg font-bold text-teal-500">{selectedReport.target_price}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="prose max-w-none">
                <div
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedReport.content }}
                />
              </div>
              {selectedReport.pdf_url && (
                <div className="mt-6">
                  <a
                    href={selectedReport.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Download Full PDF Report
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-white to-teal-50/30 backdrop-blur-sm rounded-xl p-6 border border-teal-300">
            <p className="text-sm text-gray-600 italic">
              Disclaimer: This analysis is for informational and educational purposes only. It does not constitute investment advice.
              All investments carry risk, including possible loss of principal. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Research Reports
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            In-depth equity analysis, econometric research, and quantitative market studies
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search reports by company, type, or analyst..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gradient-to-br from-white to-teal-50/50 border border-teal-300 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No reports available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => {
              const IconComponent = getIconComponent(report.icon_name);
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-xl border border-teal-300 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden"
                >
                  <div className={`p-6 border-b border-teal-300 bg-gradient-to-br ${
                    report.color === 'red' ? 'from-red-900/10 to-transparent' :
                    report.color === 'green' ? 'from-emerald-900/10 to-transparent' :
                    report.color === 'purple' ? 'from-purple-900/10 to-transparent' :
                    report.color === 'orange' ? 'from-orange-900/10 to-transparent' :
                    'from-blue-900/10 to-transparent'
                  }`}>
                    <IconComponent className={`w-10 h-10 mb-3 ${
                      report.color === 'red' ? 'text-red-400' :
                      report.color === 'green' ? 'text-emerald-400' :
                      report.color === 'purple' ? 'text-purple-400' :
                      report.color === 'orange' ? 'text-orange-400' :
                      'text-blue-400'
                    } group-hover:scale-110 transition-transform`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-500 transition-colors">
                      {report.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">{report.type}</div>
                    {report.recommendation !== 'Research' && report.recommendation !== 'Case Study' && (
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`font-bold ${
                          report.recommendation === 'Short' ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {report.recommendation}
                        </span>
                        {report.target_price && (
                          <span className="text-gray-700">Target: {report.target_price}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {report.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{report.analyst}</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredReports.length === 0 && reports.length > 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No reports found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
