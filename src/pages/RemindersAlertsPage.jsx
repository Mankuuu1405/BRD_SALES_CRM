// Reminders & Alerts Page
import React, { useState, useEffect } from "react";
import {
  Bell,
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
  FileText,
  Settings,
  Archive,
  Trash2,
  Edit,
  RefreshCw,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

const reminderTypes = [
  {
    id: "follow-up",
    label: "Follow-up",
    color: "bg-blue-100 text-blue-800",
    icon: Calendar,
  },
  {
    id: "payment",
    label: "Payment Due",
    color: "bg-red-100 text-red-800",
    icon: Bell,
  },
  {
    id: "document",
    label: "Document",
    color: "bg-amber-100 text-amber-800",
    icon: FileText,
  },
  {
    id: "meeting",
    label: "Meeting",
    color: "bg-purple-100 text-purple-800",
    icon: User,
  },
  {
    id: "system",
    label: "System",
    color: "bg-gray-100 text-gray-800",
    icon: Settings,
  },
];

const reminderPriorities = [
  { id: "high", label: "High", color: "bg-red-500" },
  { id: "medium", label: "Medium", color: "bg-amber-500" },
  { id: "low", label: "Low", color: "bg-green-500" },
];

const sampleReminders = [
  {
    id: 1,
    title: "Follow up with Priya Sharma",
    description: "Discuss loan application status and next steps",
    type: "follow-up",
    priority: "high",
    dueDate: "2024-06-18",
    dueTime: "10:00 AM",
    status: "pending",
    assignedTo: "Alex Johnson",
    relatedTo: "Lead #1234",
  },
  {
    id: 2,
    title: "Payment Reminder - Rahul Verma",
    description: "EMI payment due for loan #5678",
    type: "payment",
    priority: "high",
    dueDate: "2024-06-20",
    dueTime: "05:00 PM",
    status: "pending",
    assignedTo: "System",
    relatedTo: "Loan #5678",
  },
  {
    id: 3,
    title: "Document Submission",
    description: "KYC documents pending for Sneha Reddy",
    type: "document",
    priority: "medium",
    dueDate: "2024-06-22",
    dueTime: "02:00 PM",
    status: "pending",
    assignedTo: "Self",
    relatedTo: "Lead #9876",
  },
  {
    id: 4,
    title: "Team Meeting",
    description: "Weekly sales team sync and performance review",
    type: "meeting",
    priority: "medium",
    dueDate: "2024-06-25",
    dueTime: "11:00 AM",
    status: "pending",
    assignedTo: "All Team",
    relatedTo: "N/A",
  },
  {
    id: 5,
    title: "System Maintenance",
    description: "Scheduled system update and maintenance window",
    type: "system",
    priority: "low",
    dueDate: "2024-06-28",
    dueTime: "11:00 PM",
    status: "pending",
    assignedTo: "IT Team",
    relatedTo: "N/A",
  },
];

export default function RemindersAlertsPage() {
  const [reminders, setReminders] = useState(sampleReminders);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    priority: "all",
    status: "all",
    dateRange: "upcoming",
  });
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    type: "follow-up",
    priority: "medium",
    dueDate: "",
    dueTime: "",
    assignedTo: "",
    relatedTo: "",
  });

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      !searchQuery ||
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filters.type === "all" || reminder.type === filters.type;
    const matchesPriority =
      filters.priority === "all" || reminder.priority === filters.priority;
    const matchesStatus =
      filters.status === "all" || reminder.status === filters.status;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const handleCreateReminder = () => {
    const id = Date.now();
    const reminder = { ...newReminder, id, status: "pending" };
    setReminders([reminder, ...reminders]);
    setNewReminder({
      title: "",
      description: "",
      type: "follow-up",
      priority: "medium",
      dueDate: "",
      dueTime: "",
      assignedTo: "",
      relatedTo: "",
    });
    setShowCreateModal(false);
  };

  const handleUpdateReminder = (id, updates) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
    setSelectedReminder(null);
  };

  const handleMarkComplete = (id) => {
    handleUpdateReminder(id, { status: "completed" });
  };

  const handleSnooze = (id, minutes) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
      const newDate = new Date(`${reminder.dueDate} ${reminder.dueTime}`);
      newDate.setMinutes(newDate.getMinutes() + minutes);

      handleUpdateReminder(id, {
        dueDate: newDate.toISOString().split("T")[0],
        dueTime: newDate.toTimeString().split(" ")[0].substring(0, 5),
      });
    }
  };

  const getReminderType = (typeId) => {
    return reminderTypes.find((type) => type.id === typeId) || reminderTypes[0];
  };

  const getPriorityColor = (priority) => {
    const priorityObj = reminderPriorities.find((p) => p.id === priority);
    return priorityObj ? priorityObj.color : "bg-gray-500";
  };

  const isOverdue = (dueDate, dueTime) => {
    const now = new Date();
    const due = new Date(`${dueDate} ${dueTime}`);
    return due < now;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Reminders & Alerts
          </h1>
          <p className="text-sm text-slate-500">
            Manage notifications and follow-ups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search reminders..."
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
            New Reminder
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filter Reminders</h3>
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
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Types</option>
                  {reminderTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
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
                  {reminderPriorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
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
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="snoozed">Snoozed</option>
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
                  <option value="upcoming">Upcoming</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="overdue">Overdue</option>
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
                      type: "all",
                      priority: "all",
                      status: "all",
                      dateRange: "upcoming",
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

      {/* Reminders List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upcoming Reminders</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{filteredReminders.length} reminders</span>
            <button className="p-1 rounded hover:bg-slate-100">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {filteredReminders.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              No reminders found
            </h3>
            <p className="text-sm text-slate-500">
              Try adjusting your filters or create a new reminder
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReminders.map((reminder) => {
              const reminderType = getReminderType(reminder.type);
              const TypeIcon = reminderType.icon;
              const isOverdueItem = isOverdue(
                reminder.dueDate,
                reminder.dueTime
              );

              return (
                <div
                  key={reminder.id}
                  className={`border rounded-xl p-4 hover:shadow-md transition-shadow ${
                    isOverdueItem
                      ? "border-red-200 bg-red-50"
                      : "border-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${reminderType.color}`}
                      >
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm">
                            {reminder.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(
                              reminder.priority
                            )}`}
                          >
                            {reminder.priority}
                          </span>
                          {isOverdueItem && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-red-500">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {reminder.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{reminder.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{reminder.dueTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{reminder.assignedTo}</span>
                          </div>
                        </div>
                        {reminder.relatedTo && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                            <FileText className="h-3 w-3" />
                            <span>{reminder.relatedTo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMarkComplete(reminder.id)}
                        className="p-1 rounded hover:bg-green-100 text-green-600"
                        title="Mark as complete"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSnooze(reminder.id, 30)}
                        className="p-1 rounded hover:bg-amber-100 text-amber-600"
                        title="Snooze for 30 minutes"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedReminder(reminder)}
                        className="p-1 rounded hover:bg-blue-100 text-blue-600"
                        title="Edit reminder"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="p-1 rounded hover:bg-red-100 text-red-600"
                        title="Delete reminder"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Reminder Modal */}
      {(showCreateModal || selectedReminder) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {selectedReminder ? "Edit Reminder" : "Create New Reminder"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedReminder(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={
                    selectedReminder
                      ? selectedReminder.title
                      : newReminder.title
                  }
                  onChange={(e) => {
                    if (selectedReminder) {
                      setSelectedReminder({
                        ...selectedReminder,
                        title: e.target.value,
                      });
                    } else {
                      setNewReminder({ ...newReminder, title: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter reminder title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={
                    selectedReminder
                      ? selectedReminder.description
                      : newReminder.description
                  }
                  onChange={(e) => {
                    if (selectedReminder) {
                      setSelectedReminder({
                        ...selectedReminder,
                        description: e.target.value,
                      });
                    } else {
                      setNewReminder({
                        ...newReminder,
                        description: e.target.value,
                      });
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  rows={3}
                  placeholder="Enter reminder description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Type
                  </label>
                  <select
                    value={
                      selectedReminder
                        ? selectedReminder.type
                        : newReminder.type
                    }
                    onChange={(e) => {
                      if (selectedReminder) {
                        setSelectedReminder({
                          ...selectedReminder,
                          type: e.target.value,
                        });
                      } else {
                        setNewReminder({
                          ...newReminder,
                          type: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    {reminderTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={
                      selectedReminder
                        ? selectedReminder.priority
                        : newReminder.priority
                    }
                    onChange={(e) => {
                      if (selectedReminder) {
                        setSelectedReminder({
                          ...selectedReminder,
                          priority: e.target.value,
                        });
                      } else {
                        setNewReminder({
                          ...newReminder,
                          priority: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    {reminderPriorities.map((priority) => (
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
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={
                      selectedReminder
                        ? selectedReminder.dueDate
                        : newReminder.dueDate
                    }
                    onChange={(e) => {
                      if (selectedReminder) {
                        setSelectedReminder({
                          ...selectedReminder,
                          dueDate: e.target.value,
                        });
                      } else {
                        setNewReminder({
                          ...newReminder,
                          dueDate: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Due Time
                  </label>
                  <input
                    type="time"
                    value={
                      selectedReminder
                        ? selectedReminder.dueTime
                        : newReminder.dueTime
                    }
                    onChange={(e) => {
                      if (selectedReminder) {
                        setSelectedReminder({
                          ...selectedReminder,
                          dueTime: e.target.value,
                        });
                      } else {
                        setNewReminder({
                          ...newReminder,
                          dueTime: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={
                      selectedReminder
                        ? selectedReminder.assignedTo
                        : newReminder.assignedTo
                    }
                    onChange={(e) => {
                      if (selectedReminder) {
                        setSelectedReminder({
                          ...selectedReminder,
                          assignedTo: e.target.value,
                        });
                      } else {
                        setNewReminder({
                          ...newReminder,
                          assignedTo: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter assignee name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Related To
                  </label>
                  <input
                    type="text"
                    value={
                      selectedReminder
                        ? selectedReminder.relatedTo
                        : newReminder.relatedTo
                    }
                    onChange={(e) => {
                      if (selectedReminder) {
                        setSelectedReminder({
                          ...selectedReminder,
                          relatedTo: e.target.value,
                        });
                      } else {
                        setNewReminder({
                          ...newReminder,
                          relatedTo: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter related item (optional)"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    if (selectedReminder) {
                      handleUpdateReminder(
                        selectedReminder.id,
                        selectedReminder
                      );
                      setSelectedReminder(null);
                    } else {
                      handleCreateReminder();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  {selectedReminder ? "Update Reminder" : "Create Reminder"}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedReminder(null);
                  }}
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
