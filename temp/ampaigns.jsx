'use client'
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Edit, 
  Eye, 
  FileText, 
  Filter, 
  List, 
  MessageSquare, 
  Plus, 
  Search, 
  Settings, 
  Smartphone, 
  Trash2, 
  TrendingUp, 
  Users, 
  PieChart,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Send,
  Save,
  Play,
  PauseCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const CampaignDashboard = () => {
  // State management
  const [view, setView] = useState('list'); // 'list', 'create', 'stats', 'preview'
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [customerLists, setCustomerLists] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCustomerList, setSelectedCustomerList] = useState(null);
  
  // New campaign form state
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    scheduleType: 'instant', // 'instant', 'scheduled', 'draft'
    scheduledDate: '',
    scheduledTime: '',
    templateId: '',
    customerListId: '',
  });

  // Mock campaign data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCampaigns([
        {
          id: '1',
          name: 'Summer Sale Promotion',
          description: 'Special discounts for all summer products',
          status: 'completed',
          templateName: 'Summer Sale Template',
          createdAt: '2025-03-20',
          scheduledFor: '2025-03-25',
          audience: 'Regular Customers',
          audienceSize: 2500,
          stats: {
            sent: 2500,
            delivered: 2450,
            read: 2100,
            clicked: 1250,
            responded: 780,
            converted: 320,
            engagementRate: 42,
            conversionRate: 13
          }
        },
        {
          id: '2',
          name: 'New Product Launch',
          description: 'Introduction of our latest product line',
          status: 'active',
          templateName: 'Product Launch Template',
          createdAt: '2025-03-25',
          scheduledFor: '2025-03-28',
          audience: 'All Customers',
          audienceSize: 5000,
          stats: {
            sent: 5000,
            delivered: 4920,
            read: 3750,
            clicked: 2100,
            responded: 980,
            converted: 450,
            engagementRate: 38,
            conversionRate: 9
          }
        },
        {
          id: '3',
          name: 'Customer Feedback Survey',
          description: 'Survey to collect customer feedback',
          status: 'draft',
          templateName: 'Survey Template',
          createdAt: '2025-03-26',
          audience: 'Premium Customers',
          audienceSize: 1200
        },
        {
          id: '4',
          name: 'Holiday Special Offer',
          description: 'Exclusive deals for the upcoming holiday season',
          status: 'scheduled',
          templateName: 'Holiday Promo Template',
          createdAt: '2025-03-27',
          scheduledFor: '2025-04-15',
          audience: 'All Customers',
          audienceSize: 5000
        },
        {
          id: '5',
          name: 'Re-engagement Campaign',
          description: 'Campaign to win back inactive customers',
          status: 'active',
          templateName: 'Re-engagement Template',
          createdAt: '2025-03-15',
          scheduledFor: '2025-03-18',
          audience: 'Inactive Customers',
          audienceSize: 1800,
          stats: {
            sent: 1800,
            delivered: 1750,
            read: 1000,
            clicked: 420,
            responded: 280,
            converted: 150,
            engagementRate: 24,
            conversionRate: 8
          }
        }
      ]);
      
      setTemplates([
        { id: '1', name: 'Summer Sale Template', type: 'promotional', preview: 'Get 30% off on all summer products!' },
        { id: '2', name: 'Product Launch Template', type: 'announcement', preview: 'Introducing our newest product line!' },
        { id: '3', name: 'Survey Template', type: 'engagement', preview: 'We value your feedback. Please take our quick survey.' },
        { id: '4', name: 'Holiday Promo Template', type: 'promotional', preview: 'Exclusive holiday offers just for you!' },
        { id: '5', name: 'Re-engagement Template', type: 'retention', preview: 'We miss you! Come back and enjoy special benefits.' }
      ]);
      
      setCustomerLists([
        { id: '1', name: 'All Customers', count: 5000 },
        { id: '2', name: 'Regular Customers', count: 2500 },
        { id: '3', name: 'Premium Customers', count: 1200 },
        { id: '4', name: 'Inactive Customers', count: 1800 },
        { id: '5', name: 'New Customers (Last 30 Days)', count: 800 }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle campaign creation
  const handleCreateCampaign = () => {
    const campaignToAdd = {
      id: (campaigns.length + 1).toString(),
      name: newCampaign.name,
      description: newCampaign.description,
      status: newCampaign.scheduleType === 'draft' ? 'draft' : newCampaign.scheduleType === 'scheduled' ? 'scheduled' : 'active',
      templateName: templates.find(t => t.id === newCampaign.templateId)?.name || 'Custom Template',
      createdAt: new Date().toISOString().split('T')[0],
      audience: customerLists.find(c => c.id === newCampaign.customerListId)?.name || 'Custom Audience',
      audienceSize: customerLists.find(c => c.id === newCampaign.customerListId)?.count || 0
    };
    
    if (newCampaign.scheduleType === 'scheduled') {
      campaignToAdd.scheduledFor = `${newCampaign.scheduledDate} ${newCampaign.scheduledTime}`;
    }
    
    setCampaigns([...campaigns, campaignToAdd]);
    setView('list');
    
    // Reset form
    setNewCampaign({
      name: '',
      description: '',
      scheduleType: 'instant',
      scheduledDate: '',
      scheduledTime: '',
      templateId: '',
      customerListId: '',
    });
    setSelectedTemplate(null);
    setSelectedCustomerList(null);
  };

  // Handle campaign deletion
  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  // Handle viewing campaign stats
  const handleViewStats = (campaign) => {
    setSelectedCampaign(campaign);
    setView('stats');
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Play size={14} />;
      case 'completed':
        return <CheckCircle size={14} />;
      case 'scheduled':
        return <Clock size={14} />;
      case 'draft':
        return <FileText size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  // Sample data for charts
  const dailyStats = [
    { name: 'Mon', sent: 1200, delivered: 1180, read: 950, clicked: 580 },
    { name: 'Tue', sent: 1500, delivered: 1470, read: 1200, clicked: 720 },
    { name: 'Wed', sent: 1300, delivered: 1280, read: 1100, clicked: 680 },
    { name: 'Thu', sent: 1400, delivered: 1370, read: 1150, clicked: 700 },
    { name: 'Fri', sent: 1600, delivered: 1550, read: 1300, clicked: 800 },
    { name: 'Sat', sent: 1100, delivered: 1080, read: 900, clicked: 550 },
    { name: 'Sun', sent: 950, delivered: 930, read: 800, clicked: 500 }
  ];

  const interactionData = [
    { name: 'Delivered', value: selectedCampaign?.stats?.delivered || 0 },
    { name: 'Read', value: selectedCampaign?.stats?.read || 0 },
    { name: 'Clicked', value: selectedCampaign?.stats?.clicked || 0 },
    { name: 'Responded', value: selectedCampaign?.stats?.responded || 0 }
  ];

  const timeData = [
    { name: '8AM', response: 350 },
    { name: '10AM', response: 580 },
    { name: '12PM', response: 690 },
    { name: '2PM', response: 510 },
    { name: '4PM', response: 420 },
    { name: '6PM', response: 530 },
    { name: '8PM', response: 650 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Render list view
  const renderListView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketing Campaigns</h1>
        <button 
          onClick={() => setView('create')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          New Campaign
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="w-full md:w-48">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No campaigns found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or create a new campaign.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.templateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{campaign.audience}</div>
                      <div className="text-sm text-gray-500">{campaign.audienceSize.toLocaleString()} recipients</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.status === 'scheduled' ? (
                        <div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            Scheduled: {campaign.scheduledFor}
                          </div>
                          <div className="text-xs text-gray-400">Created: {campaign.createdAt}</div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {campaign.createdAt}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {campaign.status === 'active' || campaign.status === 'completed' ? (
                          <button 
                            onClick={() => handleViewStats(campaign)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="View Statistics"
                          >
                            <BarChart3 size={18} />
                          </button>
                        ) : null}
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="Edit Campaign"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete Campaign"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // Render create view
  const renderCreateView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setView('list')} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Create New Campaign</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium">Campaign Details</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
              <input
                type="text"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                placeholder="Enter campaign name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                placeholder="Enter campaign description"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Message Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map(template => (
                <div 
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setNewCampaign({...newCampaign, templateId: template.id});
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{template.name}</div>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">
                      {template.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{template.preview}</p>
                  {selectedTemplate?.id === template.id && (
                    <div className="mt-2 text-blue-600 text-sm font-medium">Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Target Audience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customerLists.map(list => (
                <div 
                  key={list.id}
                  onClick={() => {
                    setSelectedCustomerList(list);
                    setNewCampaign({...newCampaign, customerListId: list.id});
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCustomerList?.id === list.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{list.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users size={14} />
                      {list.count.toLocaleString()}
                    </div>
                  </div>
                  {selectedCustomerList?.id === list.id && (
                    <div className="mt-2 text-blue-600 text-sm font-medium">Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Campaign Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="instant"
                    name="scheduleType"
                    value="instant"
                    checked={newCampaign.scheduleType === 'instant'}
                    onChange={() => setNewCampaign({...newCampaign, scheduleType: 'instant'})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="instant" className="ml-2 text-sm text-gray-700">Send Immediately</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="scheduled"
                    name="scheduleType"
                    value="scheduled"
                    checked={newCampaign.scheduleType === 'scheduled'}
                    onChange={() => setNewCampaign({...newCampaign, scheduleType: 'scheduled'})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="scheduled" className="ml-2 text-sm text-gray-700">Schedule for Later</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="draft"
                    name="scheduleType"
                    value="draft"
                    checked={newCampaign.scheduleType === 'draft'}
                    onChange={() => setNewCampaign({...newCampaign, scheduleType: 'draft'})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="draft" className="ml-2 text-sm text-gray-700">Save as Draft</label>
                </div>
              </div>
              
              {newCampaign.scheduleType === 'scheduled' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newCampaign.scheduledDate}
                      onChange={(e) => setNewCampaign({...newCampaign, scheduledDate: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={newCampaign.scheduledTime}
                      onChange={(e) => setNewCampaign({...newCampaign, scheduledTime: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={() => setView('list')} 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => setView('preview')} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            disabled={!newCampaign.name || !newCampaign.templateId || !newCampaign.customerListId || (newCampaign.scheduleType === 'scheduled' && (!newCampaign.scheduledDate || !newCampaign.scheduledTime))}
          >
            <Eye size={16} />
            Preview Campaign
          </button>
        </div>
      </div>
    </div>
  );

  // Render preview view
  const renderPreviewView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setView('create')} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Campaign Preview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Message Preview</h2>
          </div>
          
          <div className="p-6">
            <div className="mx-auto max-w-sm bg-gray-100 rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {newCampaign.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{newCampaign.name}</div>
                  <div className="text-sm text-gray-500">via WhatsApp Business</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                {selectedTemplate?.preview || "Message preview will appear here"}
              </div>
              
              <div className="mt-4 flex justify-between text