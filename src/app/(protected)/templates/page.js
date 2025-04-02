
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
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

const TemplateList = () => {
  const [metaTemplates, setMetaTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    language: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchMetaTemplates = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://graph.facebook.com/v18.0/619408917542721/message_templates', {
          headers: {
            Authorization: 'Bearer EAA4YU5sRk5QBO86fFZA0M6RMu7Mw35eAlm4PtxlO2haED4icRyyEneUeYsLF3FZCqveHYRRZBTN08DV4zeSZB5RrPmYs5ZA3ZCzCxBuQEDM5lKFPOAzpyE2uuZA82hGVGsOzRxJapMVSfmYQeiJ0T2lNGVwxNdDbINgHpCZBk2HgGxYCY5nRwIBiXTQXaPdE9JTor3sVmQrEj8TpP3CuM9ZBqfKz0KKtlfffe44JHxeya'
          }
        });
        
        const templatesData = response.data.data;
        setMetaTemplates(templatesData);
        
        // Extract unique languages for filter dropdown
        const uniqueLanguages = [...new Set(templatesData.map(template => template.language))];
        setLanguages(uniqueLanguages);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Meta templates:', error);
        setError('Failed to load templates. Please try again later.');
        setLoading(false);
      }
    };

    fetchMetaTemplates();
  }, []);

  // Filter templates based on search term and filters
  const filteredTemplates = metaTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || template.status.toLowerCase() === filters.status.toLowerCase();
    
    // Handle type filtering based on component type
    const matchesType = filters.type === 'all' || 
      (template.components && template.components.some(component => 
        component.type && component.type.toLowerCase() === filters.type.toLowerCase()
      ));
    
    const matchesLanguage = filters.language === 'all' || 
      (template.language && template.language.toLowerCase() === filters.language.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType && matchesLanguage;
  });

  const getTemplateTypeIcon = (template) => {
    if (!template.components || template.components.length === 0) {
      return <FileText size={18} />;
    }

    // Check component types
    const hasMedia = template.components.some(comp => comp.type === 'MEDIA');
    const hasVideo = template.components.some(comp => 
      comp.type === 'MEDIA' && comp.parameters && 
      comp.parameters.some(param => param.type === 'VIDEO')
    );
    const hasImage = template.components.some(comp => 
      comp.type === 'MEDIA' && comp.parameters && 
      comp.parameters.some(param => param.type === 'IMAGE')
    );

    if (hasVideo) return <Video size={18} />;
    if (hasImage || hasMedia) return <Image size={18} />;
    return <FileText size={18} />;
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
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
    setSelectedTemplate(selectedTemplate?.id === template.id ? null : template);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'all',
      type: 'all',
      language: 'all'
    });
  };

  const getTemplatePreview = (template) => {
    if (!template.components || template.components.length === 0) return 'No preview available';
    
    // Find a text component
    const textComponent = template.components.find(comp => 
      comp.type === 'BODY' || (comp.text && comp.text.length > 0)
    );
    
    if (textComponent && textComponent.text) {
      return textComponent.text.length > 50 
        ? `${textComponent.text.substring(0, 50)}...` 
        : textComponent.text;
    }
    
    return 'No text preview available';
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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="all">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
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
            onClick={clearFilters}
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
            <p className="text-gray-500 dark:text-gray-400">No templates found matching your criteria</p>
            <button 
              onClick={clearFilters}
              className="mt-2 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-3 cursor-pointer transition-all hover:shadow-md ${selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleTemplateClick(template)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getTemplateTypeIcon(template)}
                    <h3 className="font-medium text-lg ml-2">{template.name}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(template.status)}`}>
                    {template.status || 'Unknown'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                  <p>Language: {template.language || 'N/A'}</p>
                  <p className="truncate">Preview: {getTemplatePreview(template)}</p>
                  <p>Category: {template.category || 'N/A'}</p>
                </div>
                
                {selectedTemplate?.id === template.id && (
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700 mt-3 flex justify-between">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full">
                        <Eye size={16} />
                      </button>
                    </div>
                    <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateList;