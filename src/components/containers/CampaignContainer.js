// CampaignDashboard.jsx
"use client"
import React, { useState } from 'react';
import { 
  ChevronRight, 
  Edit, 
  Trash2, 
  PlusCircle, 
  Calendar, 
  Send, 
  ChevronDown, 
  BarChart2, 
  MessageSquare, 
  Clock, 
  Eye, 
  Users, 
  Filter
} from 'lucide-react';

const CampaignContainer = () => {
  const [view, setView] = useState('list'); // 'list', 'create', 'stats', 'preview'
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignStatus, setCampaignStatus] = useState('all'); // 'all', 'active', 'scheduled', 'draft', 'completed'
  const [customerSelectionMode, setCustomerSelectionMode] = useState(''); // '', 'single', 'bulk'
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  // Sample campaigns data
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Sale Promotion",
      type: "WhatsApp",
      status: "active",
      startDate: "2025-04-01",
      endDate: "2025-04-15",
      audience: "Returning Customers",
      delivered: 1245,
      opened: 876,
      clicked: 432,
      conversions: 89,
      template: "template1"
    },
    {
      id: 2,
      name: "New Product Launch",
      type: "WhatsApp",
      status: "scheduled",
      startDate: "2025-04-10",
      endDate: "2025-04-20",
      audience: "All Subscribers",
      delivered: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      template: "template2"
    },
    {
      id: 3,
      name: "Loyalty Program",
      type: "WhatsApp",
      status: "draft",
      startDate: "",
      endDate: "",
      audience: "Premium Members",
      delivered: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      template: "template3"
    },
    {
      id: 4,
      name: "End of Season",
      type: "WhatsApp",
      status: "completed",
      startDate: "2025-03-01",
      endDate: "2025-03-15",
      audience: "All Customers",
      delivered: 3567,
      opened: 2890,
      clicked: 1456,
      conversions: 324,
      template: "template1"
    }
  ]);

  // Sample templates
  const templates = [
    { id: "template1", name: "Promotional Offer", preview: "Get 20% off on your next purchase!" },
    { id: "template2", name: "Product Announcement", preview: "Check out our new product line!" },
    { id: "template3", name: "Event Invitation", preview: "You're invited to our exclusive event!" },
    { id: "template4", name: "Seasonal Greetings", preview: "Happy holidays from our team!" }
  ];

  // Sample customer lists
  const customerLists = [
    { id: 1, name: "All Customers", count: 5000 },
    { id: 2, name: "Premium Members", count: 1200 },
    { id: 3, name: "New Subscribers", count: 850 },
    { id: 4, name: "Inactive Users", count: 1600 }
  ];

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
    setView('stats');
  };

  const handleCreateCampaign = () => {
    setView('create');
    setSelectedCampaign(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedCampaign(null);
    setShowTemplateSelector(false);
    setCustomerSelectionMode('');
  };

  const handleDeleteCampaign = (id, e) => {
    e.stopPropagation();
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const handleEditCampaign = (campaign, e) => {
    e.stopPropagation();
    setSelectedCampaign(campaign);
    setView('create');
  };

  const handleStatusFilter = (status) => {
    setCampaignStatus(status);
  };

  const filteredCampaigns = campaignStatus === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === campaignStatus);

  const selectTemplate = () => {
    setShowTemplateSelector(true);
  };

  const selectCustomers = (mode) => {
    setCustomerSelectionMode(mode);
  };

  // Render statistics graphs (simplified for this example)
  const renderStatisticsGraphs = () => {
    if (!selectedCampaign) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md h-64">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Engagement Overview</h3>
          <div className="relative h-48">
            {/* This would be a real chart in a production app */}
            <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end">
              <div className="flex-1 mx-1">
                <div className="bg-blue-600 h-full w-full rounded-t-md"></div>
                <p className="text-xs text-center mt-1">Delivered</p>
              </div>
              <div className="flex-1 mx-1">
                <div className="bg-blue-500 h-4/5 w-full rounded-t-md"></div>
                <p className="text-xs text-center mt-1">Opened</p>
              </div>
              <div className="flex-1 mx-1">
                <div className="bg-blue-400 h-2/5 w-full rounded-t-md"></div>
                <p className="text-xs text-center mt-1">Clicked</p>
              </div>
              <div className="flex-1 mx-1">
                <div className="bg-blue-300 h-1/5 w-full rounded-t-md"></div>
                <p className="text-xs text-center mt-1">Converted</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md h-64">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Daily Performance</h3>
          <div className="relative h-48">
            {/* Simplified line chart representation */}
            <div className="absolute inset-0 flex items-end">
              <svg className="w-full h-40" viewBox="0 0 100 50">
                <path 
                  d="M0,50 L10,45 L20,42 L30,38 L40,30 L50,25 L60,20 L70,15 L80,18 L90,12 L100,10" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // List view
  const renderCampaignsList = () => (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Marketing Campaigns</h1>
        <button 
          onClick={handleCreateCampaign}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Campaign
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${campaignStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              All
            </button>
            <button 
              onClick={() => handleStatusFilter('active')}
              className={`px-3 py-1 rounded-full text-sm ${campaignStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
            >
              Active
            </button>
            <button 
              onClick={() => handleStatusFilter('scheduled')}
              className={`px-3 py-1 rounded-full text-sm ${campaignStatus === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
            >
              Scheduled
            </button>
            <button 
              onClick={() => handleStatusFilter('draft')}
              className={`px-3 py-1 rounded-full text-sm ${campaignStatus === 'draft' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-800'}`}
            >
              Draft
            </button>
            <button 
              onClick={() => handleStatusFilter('completed')}
              className={`px-3 py-1 rounded-full text-sm ${campaignStatus === 'completed' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}
            >
              Completed
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map(campaign => (
                <tr 
                  key={campaign.id}
                  onClick={() => handleCampaignClick(campaign)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-2 text-gray-500" />
                      <span>{campaign.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      ${campaign.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                      ${campaign.status === 'completed' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {campaign.startDate ? (
                      <>
                        <div>{campaign.startDate}</div>
                        <div className="text-xs text-gray-400">to {campaign.endDate}</div>
                      </>
                    ) : (
                      "Not scheduled"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{campaign.audience}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button 
                      onClick={(e) => handleEditCampaign(campaign, e)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteCampaign(campaign.id, e)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No campaigns found. Create a new campaign to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Create/Edit view
  const renderCreateForm = () => (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {selectedCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        </h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter campaign name"
              defaultValue={selectedCampaign?.name || ''}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="whatsapp" selected={selectedCampaign?.type === 'WhatsApp'}>WhatsApp</option>
              <option value="email" selected={selectedCampaign?.type === 'Email'}>Instagram</option>
            
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Description</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Describe your campaign"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue={selectedCampaign?.startDate || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue={selectedCampaign?.endDate || ''}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Message Template</label>
          
          {!showTemplateSelector ? (
            <button 
              onClick={selectTemplate}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <div className="flex flex-col items-center">
                <Eye size={24} className="mb-2" />
                <span className="text-sm font-medium">
                  {selectedCampaign?.template ? 'Change Template' : 'Select Template'}
                </span>
                {selectedCampaign?.template && (
                  <span className="mt-2 text-xs text-gray-500">
                    Currently using: {templates.find(t => t.id === selectedCampaign.template)?.name}
                  </span>
                )}
              </div>
            </button>
          ) : (
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-medium">Select a Template</h3>
                <button 
                  onClick={() => setShowTemplateSelector(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map(template => (
                  <div 
                    key={template.id}
                    className="border border-gray-200 rounded-md p-4 hover:border-blue-500 cursor-pointer"
                  >
                    <h4 className="font-medium mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Audience</label>
          
          {!customerSelectionMode ? (
            <div className="flex gap-4">
              <button 
                onClick={() => selectCustomers('single')}
                className="flex-1 border border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                <User size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Select Customer List</span>
              </button>
              
              <button 
                onClick={() => selectCustomers('bulk')}
                className="flex-1 border border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                <Users size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Bulk Upload Customers</span>
              </button>
            </div>
          ) : customerSelectionMode === 'single' ? (
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-medium">Select Customer List</h3>
                <button 
                  onClick={() => setCustomerSelectionMode('')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">
                {customerLists.map(list => (
                  <div 
                    key={list.id}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <div>
                      <h4 className="font-medium">{list.name}</h4>
                      <p className="text-sm text-gray-500">{list.count} customers</p>
                    </div>
                    <input type="radio" name="customerList" className="h-4 w-4 text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-medium">Bulk Upload Customers</h3>
                <button 
                  onClick={() => setCustomerSelectionMode('')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 text-center">
                <div className="mb-4">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop your CSV file here or click to upload</p>
                </div>
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm">
                  Upload CSV
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button 
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
            <Save size={16} className="mr-2" />
            Save as Draft
          </button>
          <button className="px-4 py-2 border border-blue-500 bg-blue-500 rounded-md text-white hover:bg-blue-600 flex items-center">
            <Calendar size={16} className="mr-2" />
            Schedule
          </button>
          <button className="px-4 py-2 border border-green-500 bg-green-500 rounded-md text-white hover:bg-green-600 flex items-center">
            <Send size={16} className="mr-2" />
            Start Campaign
          </button>
        </div>
      </div>
    </div>
  );

  // Statistics view
  const renderCampaignStats = () => (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {selectedCampaign?.name} - Campaign Statistics
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <h3 className="text-2xl font-bold text-gray-800">{selectedCampaign?.delivered}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Send size={20} className="text-blue-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Opened</p>
              <h3 className="text-2xl font-bold text-gray-800">{selectedCampaign?.opened}</h3>
              <p className="text-xs text-gray-500">
                {selectedCampaign?.delivered ? (
                  <span>{Math.round((selectedCampaign.opened / selectedCampaign.delivered) * 100)}% of delivered</span>
                ) : '0%'}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye size={20} className="text-green-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Clicked</p>
              <h3 className="text-2xl font-bold text-gray-800">{selectedCampaign?.clicked}</h3>
              <p className="text-xs text-gray-500">
                {selectedCampaign?.opened ? (
                  <span>{Math.round((selectedCampaign.clicked / selectedCampaign.opened) * 100)}% of opened</span>
                ) : '0%'}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <MousePointer size={20} className="text-yellow-700" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversions</p>
              <h3 className="text-2xl font-bold text-gray-800">{selectedCampaign?.conversions}</h3>
              <p className="text-xs text-gray-500">
                {selectedCampaign?.clicked ? (
                  <span>{Math.round((selectedCampaign.conversions / selectedCampaign.clicked) * 100)}% of clicked</span>
                ) : '0%'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign size={20} className="text-purple-700" />
            </div>
          </div>
        </div>
      </div>
      
      {renderStatisticsGraphs()}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Customer Interactions</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Filter size={16} />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Converted</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <User size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Customer {i}</div>
                        <div className="text-sm text-gray-500">customer{i}@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      i % 4 === 0 ? 'bg-red-100 text-red-800' : 
                      i % 3 === 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {i % 4 === 0 ? 'Failed' : i % 3 === 0 ? 'Pending' : 'Delivered'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {i % 4 === 0 ? '—' : new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {i % 4 === 0 || i % 5 === 0 ? '—' : new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {i % 2 === 0 && i % 4 !== 0 ? new Date().toLocaleDateString() : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {i === 2 ? new Date().toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {view === 'list' && renderCampaignsList()}
        {view === 'create' && renderCreateForm()}
        {view === 'stats' && renderCampaignStats()}
      </div>
    </div>
  );
};

// Missing imports we need to add
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const User = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MousePointer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
  </svg>
);

const DollarSign = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Save = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const Upload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const Download = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default CampaignContainer;