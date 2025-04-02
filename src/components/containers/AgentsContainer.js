// AgentDashboard.jsx
"use client"
import React, { useState } from 'react';
import { 
  UserPlus, Edit, Trash2, Eye, ChevronDown, Search, 
  UserCheck, UserX, BarChart2, Activity, Award, Users
} from 'lucide-react';

const AgentContainer = () => {
  // Sample agent data
  const [agents, setAgents] = useState([
    { 
      id: 'AGT-001', 
      name: 'John Doe', 
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-05-15',
      performance: 87,
      casesHandled: 124
    },
    { 
      id: 'AGT-002', 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      department: 'Support',
      status: 'inactive',
      joinDate: '2023-08-22',
      performance: 92,
      casesHandled: 98
    },
    { 
      id: 'AGT-003', 
      name: 'Robert Johnson', 
      email: 'robert.j@example.com',
      phone: '(555) 456-7890',
      department: 'Technical',
      status: 'active',
      joinDate: '2024-01-10',
      performance: 76,
      casesHandled: 67
    }
  ]);
  
  // State for current view and selected agent
  const [currentView, setCurrentView] = useState('list'); // 'list', 'view', 'create', 'edit'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
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
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        return {
          ...agent,
          status: agent.status === 'active' ? 'inactive' : 'active'
        };
      }
      return agent;
    }));
  };
  
  // Delete an agent
  const deleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };
  
  // View agent details
  const viewAgent = (id) => {
    setSelectedAgent(agents.find(agent => agent.id === id));
    setCurrentView('view');
  };
  
  // Edit an agent
  const editAgent = (id) => {
    const agent = agents.find(agent => agent.id === id);
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      department: agent.department
    });
    setCurrentView('edit');
  };
  
  // Create new agent
  const createAgent = () => {
    const newAgent = {
      ...formData,
      id: `AGT-${String(agents.length + 1).padStart(3, '0')}`,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      performance: 0,
      casesHandled: 0
    };
    
    setAgents([...agents, newAgent]);
    setCurrentView('list');
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: ''
    });
  };
  
  // Update existing agent
  const updateAgent = () => {
    setAgents(agents.map(agent => {
      if (agent.id === selectedAgent.id) {
        return {
          ...agent,
          ...formData
        };
      }
      return agent;
    }));
    setCurrentView('list');
  };
  
  // Filtered agents based on search term
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              name="name"
              value={formData.name}
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
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Technical">Technical</option>
              <option value="Admin">Admin</option>
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
            <h2 className="text-2xl font-bold">{selectedAgent.name}</h2>
            <button
              onClick={() => setCurrentView('list')}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Back to List
            </button>
          </div>
          
          <div className="flex items-center mt-2">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedAgent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-600 capitalize">{selectedAgent.status}</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Agent Details</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Agent ID</p>
                  <p className="font-medium">{selectedAgent.id}</p>
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
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{selectedAgent.department}</p>
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
                        name: '',
                        email: '',
                        phone: '',
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
                      Department
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
                      <tr key={agent.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{agent.id}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{agent.name}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{agent.email}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{agent.department}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {agent.status}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => viewAgent(agent.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            
                            <button 
                              onClick={() => editAgent(agent.id)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Edit Agent"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            
                            <button 
                              onClick={() => toggleAgentStatus(agent.id)}
                              className={`${
                                agent.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                              }`}
                              title={agent.status === 'active' ? 'Deactivate Agent' : 'Activate Agent'}
                            >
                              {agent.status === 'active' ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                            </button>
                            
                            <button 
                              onClick={() => deleteAgent(agent.id)}
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