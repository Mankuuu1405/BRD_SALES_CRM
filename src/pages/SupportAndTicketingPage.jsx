import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Filter,
  Search,
  ChevronDown,
  Phone,
  Mail,
  Paperclip,
  Send,
  Reply,
  Archive,
  Trash2,
  Edit,
  RefreshCw,
  MoreVertical,
  Star,
  AlertTriangle,
} from "lucide-react";

const ticketStatuses = [
  { id: "open", label: "Open", color: "bg-blue-100 text-blue-800" },
  {
    id: "in-progress",
    label: "In Progress",
    color: "bg-amber-100 text-amber-800",
  },
  { id: "resolved", label: "Resolved", color: "bg-green-100 text-green-800" },
  { id: "closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
];

const ticketPriorities = [
  { id: "critical", label: "Critical", color: "bg-red-500" },
  { id: "high", label: "High", color: "bg-orange-500" },
  { id: "medium", label: "Medium", color: "bg-amber-500" },
  { id: "low", label: "Low", color: "bg-green-500" },
];

const ticketCategories = [
  { id: "technical", label: "Technical Issue" },
  { id: "billing", label: "Billing" },
  { id: "account", label: "Account" },
  { id: "feature", label: "Feature Request" },
  { id: "other", label: "Other" },
];

const sampleTickets = [
  {
    id: 1,
    subject: "Unable to access loan application form",
    description:
      'When I try to submit a new loan application, I get an error message saying "Server Error 500". This has been happening for the past 3 days.',
    category: "technical",
    priority: "high",
    status: "in-progress",
    createdBy: "Rahul Verma",
    assignedTo: "Alex Johnson",
    createdAt: "2024-06-15",
    updatedAt: "2024-06-16",
    customer: {
      name: "Rahul Verma",
      email: "rahul.verma@example.com",
      phone: "+91 98765 43210",
    },
    attachments: ["screenshot.png"],
    tags: ["bug", "urgent"],
  },
  {
    id: 2,
    subject: "Incorrect EMI calculation",
    description:
      "The EMI amount shown in my dashboard doesn't match the calculation I did manually. Please check and correct.",
    category: "billing",
    priority: "medium",
    status: "open",
    createdBy: "Priya Sharma",
    assignedTo: "Unassigned",
    createdAt: "2024-06-14",
    updatedAt: "2024-06-14",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43211",
    },
    attachments: [],
    tags: ["emi", "calculation"],
  },
  {
    id: 3,
    subject: "Request for additional loan limit",
    description:
      "I would like to request an increase in my loan limit. I have been a customer for 2 years with good payment history.",
    category: "feature",
    priority: "low",
    status: "open",
    createdBy: "Sneha Reddy",
    assignedTo: "Unassigned",
    createdAt: "2024-06-13",
    updatedAt: "2024-06-13",
    customer: {
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "+91 98765 43212",
    },
    attachments: ["income_proof.pdf", "bank_statement.pdf"],
    tags: ["limit-increase"],
  },
];

export default function SupportTicketingPage() {
  const [tickets, setTickets] = useState(sampleTickets);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    dateRange: "all",
  });
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    category: "technical",
    priority: "medium",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    assignedTo: "",
  });
  const [replyText, setReplyText] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      !searchQuery ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "all" || ticket.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || ticket.priority === filters.priority;
    const matchesCategory =
      filters.category === "all" || ticket.category === filters.category;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleCreateTicket = () => {
    const id = Date.now();
    const ticket = {
      ...newTicket,
      id,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      customer: {
        name: newTicket.customerName,
        email: newTicket.customerEmail,
        phone: newTicket.customerPhone,
      },
      attachments: [],
      tags: [],
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({
      subject: "",
      description: "",
      category: "technical",
      priority: "medium",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      assignedTo: "",
    });
    setShowCreateModal(false);
  };

  const handleUpdateTicket = (id, updates) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : ticket
      )
    );
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
    setSelectedTicket(null);
  };

  const handleReplyToTicket = (id) => {
    const ticket = tickets.find((t) => t.id === id);
    if (ticket) {
      setSelectedTicket(ticket);
      setShowReplyModal(true);
    }
  };

  const handleSendReply = () => {
    if (selectedTicket && replyText) {
      // In a real app, this would send the reply
      console.log("Sending reply:", replyText);

      // Add the reply to the ticket (in a real app, this would be stored separately)
      setReplyText("");
      setShowReplyModal(false);

      // Update ticket status to in-progress if it was open
      if (selectedTicket.status === "open") {
        handleUpdateTicket(selectedTicket.id, { status: "in-progress" });
      }
    }
  };

  const getTicketStatus = (statusId) => {
    return (
      ticketStatuses.find((status) => status.id === statusId) ||
      ticketStatuses[0]
    );
  };

  const getPriorityColor = (priority) => {
    const priorityObj = ticketPriorities.find((p) => p.id === priority);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Support & Ticketing
          </h1>
          <p className="text-sm text-slate-500">
            Manage customer service requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tickets..."
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
            New Ticket
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filter Tickets</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  {ticketStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Priority
                </label>
                <select
                  value={filters.priority}
                  onChange={(e) =>
                    setFilters({ ...filters, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Priorities</option>
                  {ticketPriorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Categories</option>
                  {ticketCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setFilters({
                      status: "all",
                      priority: "all",
                      category: "all",
                      dateRange: "all",
                    });
                    setShowFilterModal(false);
                  }}
                  className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Support Tickets</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{filteredTickets.length} tickets</span>
            <button className="p-1 rounded hover:bg-slate-100">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              No tickets found
            </h3>
            <p className="text-sm text-slate-500">
              Try adjusting your filters or create a new ticket
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    ID
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Subject
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Customer
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Priority
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Assigned To
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Created
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => {
                  const ticketStatus = getTicketStatus(ticket.status);

                  return (
                    <tr
                      key={ticket.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-3 text-sm">#{ticket.id}</td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">
                            {ticket.subject}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {ticket.attachments.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3 text-slate-400" />
                                <span className="text-xs text-slate-500">
                                  {ticket.attachments.length}
                                </span>
                              </div>
                            )}
                            {ticket.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-slate-100 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">
                              {ticket.customer.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {ticket.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${ticketStatus.color}`}
                        >
                          {ticketStatus.label}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{ticket.assignedTo}</td>
                      <td className="p-3 text-sm">
                        {getDaysAgo(ticket.createdAt)}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="p-1 rounded hover:bg-blue-100 text-blue-600"
                            title="View details"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReplyToTicket(ticket.id)}
                            className="p-1 rounded hover:bg-green-100 text-green-600"
                            title="Reply to ticket"
                          >
                            <Reply className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateTicket(ticket.id, {
                                status: "resolved",
                              })
                            }
                            className="p-1 rounded hover:bg-green-100 text-green-600"
                            title="Mark as resolved"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="p-1 rounded hover:bg-red-100 text-red-600"
                            title="Delete ticket"
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

      {/* Create/Edit Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Ticket</h3>
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
                  Subject
                </label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter ticket subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  rows={4}
                  placeholder="Describe the issue in detail"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    {ticketCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    {ticketPriorities.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={newTicket.customerName}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        customerName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    value={newTicket.customerEmail}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        customerEmail: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter customer email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Customer Phone
                  </label>
                  <input
                    type="tel"
                    value={newTicket.customerPhone}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        customerPhone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter customer phone"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Assign To
                </label>
                <select
                  value={newTicket.assignedTo}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, assignedTo: e.target.value })
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
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCreateTicket}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Create Ticket
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

      {/* Reply Modal */}
      {showReplyModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Reply to Ticket #{selectedTicket.id}
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reply
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  rows={4}
                  placeholder="Enter your reply"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSendReply}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Reply
                </button>
                <button
                  onClick={() => setShowReplyModal(false)}
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
