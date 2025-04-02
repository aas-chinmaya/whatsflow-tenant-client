"use client";
import { useEffect, useState } from "react";
import { UserPlus, Edit, Trash2, ShieldCheck, Upload, X, Check } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';

const API_URL = "http://192.168.0.109:8000/api/customers";

const CustomerList = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [addMethod, setAddMethod] = useState('single');
  const [file, setFile] = useState(null);
  const [loadingCustomerId, setLoadingCustomerId] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    optInStatus: false,
    countryCode: "+91",
  });

  const countryCodes = [
    { value: "+91", label: "+91" },
    { value: "+97", label: "+97" },
    { value: "+1", label: "+1" },
    { value: "+44", label: "+44" },
  ];

  // Fetch customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getall`);
      setCustomers(data);
    } catch (error) {
      toast.error("Error fetching customers: " + error.message);
    }
  };

  // Add or Update Customer
  const handleAddOrUpdateCustomer = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const phoneWithCode = formData.countryCode + formData.phone;

    try {
      const customerData = { ...formData, phone: phoneWithCode };

      if (editingCustomer) {
        await axios.put(
          `${API_URL}/updatecustomer/${editingCustomer.customerId}`,
          customerData
        );
        toast.success("Customer updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, customerData);
        toast.success("Customer added successfully!");
      }

      fetchCustomers();
      closeModal();
    } catch (error) {
      toast.error(
        "Error saving customer: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  // Verify Customer
  const handleVerifyCustomer = async (customer) => {
    setLoadingCustomerId(customer.customerId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating verification
      setLoadingCustomerId(null);
      toast.success(`${customer.phone} Matched!`);
    } catch (error) {
      setLoadingCustomerId(null);
      toast.error(`${customer.phone} Not Matched!`);
    }
  };

  // Edit Customer
  const handleEditCustomer = (customer) => {
    const phoneWithoutCode = customer.phone.slice(-10);
    const countryCode = customer.phone.substring(0, customer.phone.length - 10);

    setEditingCustomer(customer);
    setFormData({
      ...customer,
      phone: phoneWithoutCode,
      countryCode: countryCode || "+91",
    });
    setShowModal(true);
  };

  // Delete Customer (Soft Delete)
  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletecustomer/${id}`);
      fetchCustomers();
      toast.success("Customer deleted successfully!");
    } catch (error) {
      toast.error("Error deleting customer: " + error.message);
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    for (const id of selectedCustomers) {
      await handleDeleteCustomer(id);
    }
    setSelectedCustomers([]);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
    setFile(null);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      optInStatus: false,
      countryCode: "+91",
    });
  };
  
  // Bulk Upload Handlers
  const handleBulkUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(`${API_URL}/bulk-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success('Bulk upload completed!');
      fetchCustomers();
      closeModal();
    } catch (error) {
      console.error('Upload Error Details:', error.response?.data);
      toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <UserPlus size={20} />
            Add Customer
          </button>
          {selectedCustomers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 size={20} />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedCustomers.length === customers.length && customers.length > 0}
                  onChange={() => 
                    setSelectedCustomers(
                      selectedCustomers.length === customers.length ? [] : customers.map(c => c.customerId)
                    )
                  }
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">First Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Last Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Opt-In Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr
                key={customer.customerId}
                className="hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                onClick={(e) => {
                  if (!e.target.closest("td input, td button")) {
                    handleEditCustomer(customer);
                  }
                }}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedCustomers.includes(customer.customerId)}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSelectedCustomers((prev) =>
                        prev.includes(customer.customerId)
                          ? prev.filter((id) => id !== customer.customerId)
                          : [...prev, customer.customerId]
                      );
                    }}
                  />
                </td>
                <td className="px-4 py-3">{customer.firstName}</td>
                <td className="px-4 py-3">{customer.lastName}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${customer.optInStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {customer.optInStatus ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loadingCustomerId === customer.customerId ? 0.5 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerifyCustomer(customer);
                      }}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      disabled={loadingCustomerId === customer.customerId}
                    >
                      {loadingCustomerId === customer.customerId ? (
                        <div className="animate-spin rounded-full w-4 h-4 border-t-2 border-blue-500"></div>
                      ) : (
                        <ShieldCheck size={16} />
                      )}
                      {loadingCustomerId === customer.customerId ? "Verifying..." : "Verify"}
                    </button>
                  </motion.div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Customer */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md md:max-w-lg max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">
                {editingCustomer ? "Edit Customer" : "Add Customer"}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              {!editingCustomer && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Select Method</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="addMethod"
                        value="single"
                        checked={addMethod === "single"}
                        onChange={() => setAddMethod("single")}
                        className="rounded-full border-gray-300"
                      />
                      <span>Add Single Customer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="addMethod"
                        value="bulk"
                        checked={addMethod === "bulk"}
                        onChange={() => setAddMethod("bulk")}
                        className="rounded-full border-gray-300"
                      />
                      <span>Import from Excel</span>
                    </label>
                  </div>
                </div>
              )}

              {(editingCustomer || addMethod === 'single') ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country Code
                    </label>
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {countryCodes.map(code => (
                        <option key={code.value} value={code.value}>{code.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.optInStatus}
                        onChange={(e) => setFormData({ ...formData, optInStatus: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Opt-In Status</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Excel File
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-500 mb-2" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".xlsx,.xls"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </label>
                    </div>
                    {file && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end gap-2">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              {addMethod === 'bulk' && file ? (
                <button 
                  onClick={handleBulkUpload}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full w-4 h-4 border-t-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload
                    </>
                  )}
                </button>
              ) : (editingCustomer || addMethod === 'single') && (
                <button 
                  onClick={handleAddOrUpdateCustomer}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center gap-2"
                >
                  <Check size={16} />
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;