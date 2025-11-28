import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Filter,
  Search,
  ChevronDown,
  User,
  Phone,
  Mail,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  FileText,
  RefreshCw,
  Archive,
  Trash2,
  Edit,
  MoreVertical,
  AlertTriangle,
  PhoneCall,
  CreditCard,
} from "lucide-react";

const collectionStatuses = [
  { id: "pending", label: "Pending", color: "bg-amber-100 text-amber-800" },
  { id: "contacted", label: "Contacted", color: "bg-blue-100 text-blue-800" },
  {
    id: "partial",
    label: "Partial Payment",
    color: "bg-purple-100 text-purple-800",
  },
  { id: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { id: "failed", label: "Failed", color: "bg-red-100 text-red-800" },
];

const collectionPriorities = [
  { id: "high", label: "High", color: "bg-red-500" },
  { id: "medium", label: "Medium", color: "bg-amber-500" },
  { id: "low", label: "Low", color: "bg-green-500" },
];

const sampleCollections = [
  {
    id: 1,
    customerName: "Rahul Verma",
    loanId: "LN-2024-5678",
    loanType: "Personal Loan",
    amount: 50000,
    emi: 4500,
    dueDate: "2024-06-15",
    overdueDays: 3,
    status: "pending",
    priority: "high",
    assignedTo: "Alex Johnson",
    lastContactDate: "2024-06-12",
    contactAttempts: 2,
    notes: "Customer promised to pay by end of week",
    customer: {
      name: "Rahul Verma",
      email: "rahul.verma@example.com",
      phone: "+91 98765 43210",
      address: "123 Main St, Mumbai, Maharashtra 400001",
    },
  },
  {
    id: 2,
    customerName: "Priya Sharma",
    loanId: "LN-2024-4321",
    loanType: "Business Loan",
    amount: 150000,
    emi: 13500,
    dueDate: "2024-06-20",
    overdueDays: 0,
    status: "contacted",
    priority: "medium",
    assignedTo: "Self",
    lastContactDate: "2024-06-14",
    contactAttempts: 1,
    notes: "Customer requested extension for 15 days",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43211",
      address: "456 Park Ave, Delhi, Delhi 110001",
    },
  },
  {
    id: 3,
    customerName: "Sneha Reddy",
    loanId: "LN-2024-3987",
    loanType: "Home Loan",
    amount: 250000,
    emi: 22000,
    dueDate: "2024-06-10",
    overdueDays: 8,
    status: "partial",
    priority: "high",
    assignedTo: "Rahul Verma",
    lastContactDate: "2024-06-05",
    contactAttempts: 4,
    notes: "Customer paid 10000, remaining balance to be collected",
    customer: {
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "+91 98765 43212",
      address: "789 Oak Rd, Bangalore, Karnataka 560001",
    },
  },
];

export default function CollectionRecoveryPage() {
  const [collections, setCollections] = useState(sampleCollections);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    dateRange: "all",
  });
  const [newCollection, setNewCollection] = useState({
    customerName: "",
    loanId: "",
    loanType: "Personal Loan",
    amount: "",
    emi: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "",
    notes: "",
  });
  const [contactMethod, setContactMethod] = useState("phone");
  const [contactNotes, setContactNotes] = useState("");

  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      !searchQuery ||
      collection.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      collection.loanId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "all" || collection.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || collection.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateCollection = () => {
    const id = Date.now();
    const collection = {
      ...newCollection,
      id,
      status: "pending",
      lastContactDate: new Date().toISOString().split("T")[0],
      contactAttempts: 0,
      customer: {
        name: newCollection.customerName,
        email: "",
        phone: "",
        address: "",
      },
    };
    setCollections([collection, ...collections]);
    setNewCollection({
      customerName: "",
      loanId: "",
      loanType: "Personal Loan",
      amount: "",
      emi: "",
      dueDate: "",
      priority: "medium",
      assignedTo: "",
      notes: "",
    });
    setShowCreateModal(false);
  };

  const handleUpdateCollection = (id, updates) => {
    setCollections(
      collections.map((collection) =>
        collection.id === id ? { ...collection, ...updates } : collection
      )
    );
  };

  const handleDeleteCollection = (id) => {
    setCollections(collections.filter((collection) => collection.id !== id));
    setSelectedCollection(null);
  };

  const handleRecordContact = (id) => {
    const collection = collections.find((c) => c.id === id);
    if (collection) {
      setSelectedCollection(collection);
      setShowContactModal(true);
    }
  };

  const handleSaveContact = () => {
    if (selectedCollection && contactNotes) {
      handleUpdateCollection(selectedCollection.id, {
        lastContactDate: new Date().toISOString().split("T")[0],
        contactAttempts: selectedCollection.contactAttempts + 1,
        notes: contactNotes,
      });
      setContactNotes("");
      setShowContactModal(false);
    }
  };

  const getCollectionStatus = (statusId) => {
    return (
      collectionStatuses.find((status) => status.id === statusId) ||
      collectionStatuses[0]
    );
  };

  const getPriorityColor = (priority) => {
    const priorityObj = collectionPriorities.find((p) => p.id === priority);
    return priorityObj ? priorityObj.color : "bg-gray-500";
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const getTotalOverdueAmount = () => {
    return collections
      .filter((c) => c.status === "pending" || c.status === "partial")
      .reduce((total, c) => total + c.amount, 0);
  };

  const getTotalCollectedAmount = () => {
    return collections
      .filter((c) => c.status === "completed")
      .reduce((total, c) => total + c.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Collection & Recovery
          </h1>
          <p className="text-sm text-slate-500">
            Manage payment collections and recovery
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className="p-2 bg-white border border-slate-200 rounded-lg"
          >
            <Filter className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            New Collection
          </button>
        </div>
      </div>

      {/* Collection Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase text-slate-400">Total Overdue</p>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-semibold text-red-600">
            ₹ {getTotalOverdueAmount().toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {
              collections.filter(
                (c) => c.status === "pending" || c.status === "partial"
              ).length
            }{" "}
            accounts
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase text-slate-400">
              Collected This Month
            </p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-semibold text-green-600">
            ₹ {getTotalCollectedAmount().toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {collections.filter((c) => c.status === "completed").length}{" "}
            payments
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase text-slate-400">Collection Rate</p>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-semibold text-blue-600">
            {Math.round(
              (getTotalCollectedAmount() / getTotalOverdueAmount()) * 100
            )}
            %
          </p>
          <p className="text-xs text-slate-500 mt-1">
            This month's performance
          </p>
        </div>
      </div>

      {/* Collections List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Collection Accounts</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{filteredCollections.length} accounts</span>
            <button className="p-1 rounded hover:bg-slate-100">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {filteredCollections.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              No collections found
            </h3>
            <p className="text-sm text-slate-500">
              Try adjusting your filters or create a new collection
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Customer
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Loan ID
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Amount
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    EMI
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Due Date
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Priority
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Assigned To
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCollections.map((collection) => {
                  const collectionStatus = getCollectionStatus(
                    collection.status
                  );

                  return (
                    <tr
                      key={collection.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">
                              {collection.customerName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {collection.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{collection.loanId}</td>
                      <td className="p-3 text-sm">
                        ₹{collection.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 text-sm">
                        ₹{collection.emi.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 text-sm">{collection.dueDate}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${collectionStatus.color}`}
                        >
                          {collectionStatus.label}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{collection.assignedTo}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCollection(collection)}
                            className="p-1 rounded hover:bg-blue-100 text-blue-600"
                            title="View details"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRecordContact(collection.id)}
                            className="p-1 rounded hover:bg-green-100 text-green-600"
                            title="Record contact"
                          >
                            <PhoneCall className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateCollection(collection.id, {
                                status: "completed",
                              })
                            }
                            className="p-1 rounded hover:bg-green-100 text-green-600"
                            title="Mark as collected"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCollection(collection.id)
                            }
                            className="p-1 rounded hover:bg-red-100 text-red-600"
                            title="Delete collection"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Collection</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={newCollection.customerName}
                  onChange={(e) =>
                    setNewCollection({
                      ...newCollection,
                      customerName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter customer name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Loan ID
                  </label>
                  <input
                    type="text"
                    value={newCollection.loanId}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        loanId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter loan ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Loan Type
                  </label>
                  <select
                    value={newCollection.loanType}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        loanType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Car Loan">Car Loan</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newCollection.amount}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        amount: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter loan amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    EMI
                  </label>
                  <input
                    type="number"
                    value={newCollection.emi}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        emi: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter EMI amount"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newCollection.dueDate}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newCollection.priority}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    {collectionPriorities.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Assign To
                  </label>
                  <select
                    value={newCollection.assignedTo}
                    onChange={(e) =>
                      setNewCollection({
                        ...newCollection,
                        assignedTo: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="">Unassigned</option>
                    <option value="Alex Johnson">Alex Johnson</option>
                    <option value="Priya Sharma">Priya Sharma</option>
                    <option value="Rahul Verma">Rahul Verma</option>
                    <option value="Sneha Reddy">Sneha Reddy</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCreateCollection}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Create Collection
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Record Contact</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contact Method
                </label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={contactMethod === "phone"}
                      onChange={() => setContactMethod("phone")}
                      className="mr-2"
                    />
                    <span>Phone Call</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={contactMethod === "email"}
                      onChange={() => setContactMethod("email")}
                      className="mr-2"
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={contactMethod === "sms"}
                      onChange={() => setContactMethod("sms")}
                      className="mr-2"
                    />
                    <span>SMS</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contact Notes
                </label>
                <textarea
                  value={contactNotes}
                  onChange={(e) => setContactNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  rows={4}
                  placeholder="Enter contact notes"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveContact}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Save Contact
                </button>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
