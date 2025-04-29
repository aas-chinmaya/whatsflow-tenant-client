// AgentDashboard.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  UserPlus, Edit, Trash2, Eye, ChevronDown, Search, 
  UserCheck, UserX, BarChart2, Activity, Award, Users
} from 'lucide-react';
import { 
  fetchAgents, 
  createAgent as createAgentAction, 
  updateAgent as updateAgentAction, 
  deleteAgent as deleteAgentAction,
  clearAgentMessages
} from '@/store/features/agentSlice';

const AgentContainer = () => {
  const dispatch = useDispatch();
  const { agents, loading, error, successMessage } = useSelector((state) => state.agent);
  
  // Fetch agents on component mount
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  
  // Clear messages when unmounting or when needed
  useEffect(() => {
    return () => {
      dispatch(clearAgentMessages());
    };
  }, [dispatch]);
  
  // We no longer need localAgents as we're using data from Redux store
  
  // State for current view and selected agent
  const [currentView, setCurrentView] = useState('list'); // 'list', 'view', 'create', 'edit'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get user data from auth state to access tenantReferenceId
  const { user } = useSelector((state) => state.auth);
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    agentName: '',
    email: '',
    phone: '',
    gender: 'male',
    tenantReferenceId: user?.id || ''
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Toggle agent status (active/inactive)
  const toggleAgentStatus = (id) => {
    const agent = agents.find(agent => agent._id === id);
    if (agent) {
      const updatedData = {
        ...agent,
        isDeleted: agent.isDeleted === false ? true : false,
        tenantReferenceId: user?.id || '', // Add tenant reference ID from user data
        purpose: 'status_update' // Add purpose for tracking operation type
      };
      dispatch(updateAgentAction({ agentId: id, updatedData }));
    }
  };
  
  // Delete an agent
  const deleteAgent = (id) => {
    dispatch(deleteAgentAction(id));
  };
  
  // View agent details
  const viewAgent = (id) => {
    setSelectedAgent(agents.find(agent => agent._id === id));
    setCurrentView('view');
  };
  
  // Edit an agent
  const editAgent = (id) => {
    const agent = agents.find(agent => agent._id === id);
    setSelectedAgent(agent);
    setFormData({
      agentName: agent.agentName,
      email: agent.email,
      phone: agent.phone,
      gender: agent.gender,
      tenantReferenceId: agent.tenantReferenceId
    });
    setCurrentView('edit');
  };
  
  // Create new agent
  const createAgent = () => {
    if (!formData.agentName || !formData.email || !formData.phone || !formData.gender || !formData.tenantReferenceId) {
      dispatch({ type: 'agent/error', payload: 'All fields are required' });
      return;
    }
    
    const newAgent = {
      agentName: formData.agentName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      performance: 0,
      casesHandled: 0,
      tenantReferenceId: formData.tenantReferenceId,
      purpose: 'create'
    };
    
    dispatch(createAgentAction(newAgent));
    setCurrentView('list');
    setFormData({
      agentName: '',
      email: '',
      phone: '',
      gender: '',
      tenantReferenceId: user?.id || ''
    });
  };
  
  // Update existing agent
  const updateAgent = () => {
    const updatedData = {
      ...selectedAgent,
      agentName: formData.agentName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      tenantReferenceId: user?.id || '',
      purpose: 'update'
    };
    
    dispatch(updateAgentAction({ agentId: selectedAgent._id, updatedData }));
    setCurrentView('list');
  };
  
  // Filtered agents based on search term
  const filteredAgents = agents ? agents.filter(agent => 
    (agent.agentName && agent.agentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (agent.email && agent.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (agent.agentId && agent.agentId.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  // Generate performance data for charts (sample data)
  const generatePerformanceData = (agent) => {
    return [
      { month: 'Jan', performance: Math.floor(Math.random() * 30) + 70 },
      { month: 'Feb', performance: Math.floor(Math.random() * 30) + 70 },
      { month: 'Mar', performance: Math.floor(Math.random() * 30) + 70 },
      { month: 'Apr', performance: Math.floor(Math.random() * 30) + 70 },
      { month: 'May', performance: Math.floor(Math.random() * 30) + 70 },
      { month: 'Jun', performance: agent.performance }
    ];
  };
  
  // Render form for create/edit agent
  const renderForm = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          {currentView === 'create' ? 'Onboard New Agent' : 'Edit Agent'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone Number"
              pattern="[+]?[0-9]{10,15}"
              title="Phone number must be 10-15 digits with optional + prefix"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          

        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setCurrentView('list')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={currentView === 'create' ? createAgent : updateAgent}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {currentView === 'create' ? 'Create Agent' : 'Update Agent'}
          </button>
        </div>
      </div>
    );
  };

  // Render agent detail view with performance charts
  const renderAgentView = () => {
    if (!selectedAgent) return null;
    
    const performanceData = generatePerformanceData(selectedAgent);
    
    return (
      <div className="bg-white rounded-lg shadow-md w-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{selectedAgent.agentName}</h2>
            <button
              onClick={() => setCurrentView('list')}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Back to List
            </button>
          </div>
          
          <div className="flex items-center mt-2">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedAgent.isDeleted === false ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-600 capitalize">{selectedAgent.isDeleted === false ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Agent Details</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Agent ID</p>
                  <p className="font-medium">{selectedAgent.agentId}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedAgent.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedAgent.phone}</p>
                </div>
                

                
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{selectedAgent.joinDate}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-blue-500 mr-2" />
                    <p className="text-sm text-gray-500">Performance Score</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{selectedAgent.performance}%</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-md">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-500 mr-2" />
                    <p className="text-sm text-gray-500">Cases Handled</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-700 mt-1">{selectedAgent.casesHandled}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium mb-3">Monthly Performance</h4>
                <div className="h-48 w-full">
                  <div className="relative h-full">
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                      {performanceData.map((data, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1">
                          <div className="text-xs text-gray-500 mb-1">{data.performance}%</div>
                          <div 
                            style={{ height: `${data.performance}%` }} 
                            className={`w-full max-w-8 bg-blue-500 rounded-t-sm mx-1 ${
                              data.month === 'Jun' ? 'bg-blue-700' : 'bg-blue-400'
                            }`}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1">{data.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Work Reports</h3>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium">Recent Activity</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                      <Activity className="w-3 h-3" />
                    </span>
                    <span>Resolved 5 customer tickets in the last week</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                      <Activity className="w-3 h-3" />
                    </span>
                    <span>Achieved 94% customer satisfaction rating</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">
                      <Activity className="w-3 h-3" />
                    </span>
                    <span>Completed advanced training module</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render method
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Display error or success messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {typeof error === 'string' ? error : 'An error occurred'}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      )}
      {currentView === 'list' && (
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <h1 className="text-2xl font-bold">Agent Management</h1>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search agents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                  
                  <button
                    onClick={() => {
                      setFormData({
                        agentName: '',
                        email: '',
                        phone: '',
                        gender: 'male',
                        tenantReferenceId: user?.id || '',
                        department: ''
                      });
                      setCurrentView('create');
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Onboard Agent
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAgents.length > 0 ? (
                    filteredAgents.map(agent => (
                      <tr key={agent._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{agent.agentId}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{agent.agentName}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{agent.email}</span>
                        </td>
                        

                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.isDeleted === false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {agent.isDeleted === false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => viewAgent(agent._id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            
                            <button 
                              onClick={() => editAgent(agent._id)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Edit Agent"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            
                            
                            
                            <button 
                              onClick={() => deleteAgent(agent._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Agent"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No agents found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {(currentView === 'create' || currentView === 'edit') && renderForm()}
      
      {currentView === 'view' && renderAgentView()}
    </div>
  );
};

export default AgentContainer;