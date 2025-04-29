


'use client'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Image,
  FileText,
  Video,
  Eye,
  Loader
} from 'lucide-react';
import { 
  fetchMetaTemplates, 
  setSearchTerm, 
  setFilters, 
  clearFilters, 
  setSelectedTemplate 
} from '@/store/features/templateSlice';

const TemplateList = () => {
  const dispatch = useDispatch();
  const { 
    metaTemplates, 
    searchTerm, 
    filters, 
    loading, 
    error, 
    selectedTemplate, 
    languages 
  } = useSelector(state => state.templates);

  useEffect(() => {
    dispatch(fetchMetaTemplates());
  }, [dispatch]);

  const filteredTemplates = metaTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || template.status.toLowerCase() === filters.status.toLowerCase();
    const matchesType = filters.type === 'all' || template.components?.some(comp => comp.type?.toLowerCase() === filters.type.toLowerCase());
    const matchesLanguage = filters.language === 'all' || template.language?.toLowerCase() === filters.language.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType && matchesLanguage;
  });

  const getTemplateTypeIcon = (template) => {
    if (!template.components || template.components.length === 0) {
      return <FileText size={18} />;
    }

    const hasVideo = template.components.some(comp => comp.type === 'MEDIA' && comp.parameters?.some(param => param.type === 'VIDEO'));
    const hasImage = template.components.some(comp => comp.type === 'MEDIA' && comp.parameters?.some(param => param.type === 'IMAGE'));

    if (hasVideo) return <Video size={18} />;
    if (hasImage) return <Image size={18} />;
    return <FileText size={18} />;
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleTemplateClick = (template) => {
    dispatch(setSelectedTemplate(template));
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Message Templates</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>New Template</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            value={filters.status}
            onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
            className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="all">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            value={filters.type}
            onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
            className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="all">All Types</option>
            <option value="HEADER">Header</option>
            <option value="BODY">Body</option>
            <option value="FOOTER">Footer</option>
            <option value="BUTTONS">Buttons</option>
            <option value="MEDIA">Media</option>
          </select>
          <select
            value={filters.language}
            onChange={(e) => dispatch(setFilters({ language: e.target.value }))}
            className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="all">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={() => dispatch(clearFilters())}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear Filters
          </button>
          <span className="text-sm text-gray-500">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Templates */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Templates</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin" size={32} />
            <span className="ml-2">Loading templates...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-400">No templates found</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredTemplates.map(template => (
              <li
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedTemplate?.id === template.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  {getTemplateTypeIcon(template)}
                  <span className="text-lg font-semibold">{template.name}</span>
                </div>
                <span className={`text-sm font-semibold ${getStatusClass(template.status)}`}>
                  {template.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TemplateList;
