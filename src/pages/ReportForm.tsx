import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Save, Loader2, Upload } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

interface ReportFormProps {
  reportId?: string;
  onNavigate: (page: string) => void;
}

const iconOptions = [
  'TrendingUp', 'TrendingDown', 'BarChart3', 'FileText', 'Building2', 'DollarSign'
];

const colorOptions = [
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'green', label: 'Green', class: 'bg-emerald-500' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
];

export default function ReportForm({ reportId, onNavigate }: ReportFormProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    analyst: '',
    recommendation: 'Research',
    target_price: '',
    current_price: '',
    icon_name: 'FileText',
    color: 'blue',
    summary: '',
    content: '',
    pdf_url: '',
  });

  useEffect(() => {
    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const fetchReport = async () => {
    if (!reportId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title,
          type: data.type,
          date: data.date,
          analyst: data.analyst,
          recommendation: data.recommendation,
          target_price: data.target_price || '',
          current_price: data.current_price || '',
          icon_name: data.icon_name,
          color: data.color,
          summary: data.summary,
          content: data.content,
          pdf_url: data.pdf_url || '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async () => {
    if (!pdfFile) return null;

    setUploadingPdf(true);
    try {
      const fileExt = pdfFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('reports')
        .upload(filePath, pdfFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('reports')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upload PDF');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      let pdfUrl = formData.pdf_url;

      if (pdfFile) {
        const uploadedUrl = await handlePdfUpload();
        if (uploadedUrl) pdfUrl = uploadedUrl;
      }

      const reportData = {
        ...formData,
        target_price: formData.target_price || null,
        current_price: formData.current_price || null,
        pdf_url: pdfUrl || null,
        updated_at: new Date().toISOString(),
      };

      if (reportId) {
        const { error } = await supabase
          .from('reports')
          .update(reportData)
          .eq('id', reportId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('reports')
          .insert([reportData]);

        if (error) throw error;
      }

      onNavigate('admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save report');
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => onNavigate('admin')}
          className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {reportId ? 'Edit Report' : 'Create New Report'}
          </h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                  placeholder="Report title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                  placeholder="e.g., Long Recommendation, Research"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Analyst *
                </label>
                <input
                  type="text"
                  required
                  value={formData.analyst}
                  onChange={(e) => setFormData({ ...formData, analyst: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                  placeholder="Analyst name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Date *
                </label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                  placeholder="October 1, 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Recommendation *
                </label>
                <select
                  required
                  value={formData.recommendation}
                  onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                  <option value="Research">Research</option>
                  <option value="Case Study">Case Study</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Icon *
                </label>
                <select
                  required
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Current Price
                </label>
                <input
                  type="text"
                  value={formData.current_price}
                  onChange={(e) => setFormData({ ...formData, current_price: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                  placeholder="$50.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Target Price
                </label>
                <input
                  type="text"
                  value={formData.target_price}
                  onChange={(e) => setFormData({ ...formData, target_price: e.target.value })}
                  className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                  placeholder="$75.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Color *
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: option.value })}
                      className={`w-12 h-12 rounded-lg ${option.class} ${
                        formData.color === option.value ? 'ring-4 ring-gray-900' : 'ring-2 ring-gray-300'
                      }`}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  PDF File (Optional)
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2 bg-white border border-teal-300 rounded-lg px-4 py-3 hover:border-teal-500 transition-colors">
                      <Upload className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 text-sm">
                        {pdfFile ? pdfFile.name : 'Choose PDF file'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Summary *
              </label>
              <textarea
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={3}
                className="w-full bg-white border border-teal-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500"
                placeholder="Brief summary for the report card"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Content *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your report content here..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploadingPdf}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(saving || uploadingPdf) ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{uploadingPdf ? 'Uploading PDF...' : 'Saving...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>{reportId ? 'Update Report' : 'Create Report'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
