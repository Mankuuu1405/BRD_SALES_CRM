import React, { useState, useEffect } from "react";
import {
  Users,
  Settings,
  Shield,
  Key,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Filter,
  Search,
  ChevronDown,
  Edit,
  Trash2,
  RefreshCw,
  MoreVertical,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Upload,
  Save,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  UserPlus,
  UserMinus,
  Bell,
  Mail,
  Phone,
  CreditCard,
  Monitor,
  Server,
  Database,
  Globe,
  Wifi,
  Cpu,
  HardDrive,
  FileText,
  LogOut,
} from "lucide-react";

const userRoles = [
  {
    id: "admin",
    label: "Administrator",
    color: "bg-red-100 text-red-800",
    permissions: ["all"],
  },
  {
    id: "manager",
    label: "Manager",
    color: "bg-blue-100 text-blue-800",
    permissions: ["users", "reports", "settings"],
  },
  {
    id: "supervisor",
    label: "Supervisor",
    color: "bg-purple-100 text-purple-800",
    permissions: ["users", "reports", "settings"],
  },
  {
    id: "agent",
    label: "Agent",
    color: "bg-green-100 text-green-800",
    permissions: ["leads", "collections"],
  },
  {
    id: "viewer",
    label: "Viewer",
    color: "bg-gray-100 text-gray-800",
    permissions: ["reports"],
  },
];

const systemSettings = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    items: [
      { id: "company", label: "Company Information", type: "text" },
      { id: "system", label: "System Configuration", type: "select" },
      { id: "notifications", label: "Notification Settings", type: "toggle" },
      { id: "backup", label: "Data Backup", type: "toggle" },
      { id: "security", label: "Security", type: "policy" },
      { id: "integrations", label: "Integrations", icon: Key, type: "toggle" },
      { id: "webhooks", label: "Webhooks", type: "toggle" },
      { id: "email", label: "Email Integration", type: "toggle" },
      { id: "sms", label: "SMS Integration", type: "toggle" },
      { id: "api", label: "API Access", type: "toggle" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    items: [
      { id: "password", label: "Password Policy", type: "policy" },
      { id: "session", label: "Session Timeout", type: "number" },
      { id: "twoFactor", label: "Two-Factor Authentication", type: "toggle" },
      { id: "ip", label: "IP Whitelist", type: "text" },
    ],
  },
];

const sampleUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 98765 43210",
    role: "admin",
    status: "active",
    lastLogin: "2024-06-15 09:30:00",
    created: "2023-01-10",
    permissions: ["all"],
    profile: {
      avatar: "AJ",
      department: "Sales",
      location: "Mumbai",
    },
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43211",
    role: "manager",
    status: "active",
    lastLogin: "2024-06-16 14:22:00",
    created: "2023-02-15",
    permissions: ["users", "reports", "settings"],
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91 98765 43212",
    role: "agent",
    status: "active",
    lastLogin: "2024-06-17 11:45:00",
    created: "2023-03-20",
    permissions: ["leads", "collections"],
  },
];

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-06-15:10:30:00",
    type: "info",
    message: "User login: Alex Johnson from IP 192.168.1.1",
    details: "Successful authentication",
  },
  {
    id: 2,
    timestamp: "2024-06-15:09:30:00",
    type: "warning",
    message: "Failed login attempt: Unknown user from IP 192.168.1.1",
    details: "Invalid credentials provided",
  },
];

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [users, setUsers] = useState(sampleUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    dateRange: "all",
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "agent",
    status: "active",
    permissions: ["leads", "collections"],
  });

  const [settings, setSettings] = useState({
    company: {
      name: "BRD Sales CRM",
      address: "123 Business Street, Mumbai, India",
      phone: "+91 12345 67890",
      website: "https://brdsalescrm.com",
    },
    system: {
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      currency: "INR",
    },
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    security: {
      passwordPolicy: "strong",
      sessionTimeout: 30,
      twoFactor: false,
      ipWhitelist: "",
    },
    integrations: {
      crm: false,
      api: false,
      webhooks: false,
    },
    backup: {
      automatic: true,
      frequency: "daily",
      lastBackup: "2024-06-15",
    },
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filters.role === "all" || user.role === filters.role;
    const matchesStatus =
      filters.status === "all" || user.status === filters.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = () => {
    const id = Date.now();
    const user = {
      ...newUser,
      id,
      status: "pending",
      lastLogin: null,
      created: new Date().toISOString().split("T")[0],
      profile: {
        avatar: newUser.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
        department: "Sales",
        location: "Mumbai",
      },
    };
    setUsers([user, ...users]);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "agent",
      status: "pending",
      permissions: ["leads", "collections"],
    });
    setShowCreateModal(false);
    alert("User created successfully");
  };

  const handleEditUser = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? { ...u, ...user } : u)));
    setSelectedUser(null);
    setShowEditModal(false);
    alert("User updated successfully");
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setSelectedUser(null);
    alert("User deleted successfully");
  };

  const handleToggleUserStatus = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      handleEditUser({
        ...user,
        status: user.status === "active" ? "inactive" : "active",
      });
    }
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetailsModal(true);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save settings to backend
    console.log("Saving settings:", settings);
    alert("Settings saved successfully");
  };

  const getUserRole = (roleId) => {
    return userRoles.find((role) => role.id === roleId) || userRoles[0];
  };

  const getSystemSetting = (category, settingId) => {
    const categoryObj = systemSettings.find((cat) => cat.id === category);
    if (categoryObj) {
      return categoryObj.items.find((item) => item.id === settingId);
    }
    return null;
  };

  const updateSetting = (category, settingId, value) => {
    const updatedSettings = { ...settings };

    if (category === "general") {
      if (settingId === "company") {
        updatedSettings.company = { ...settings.company, ...value };
      } else if (settingId === "system") {
        updatedSettings.system = { ...settings.system, ...value };
      } else if (settingId === "notifications") {
        updatedSettings.notifications = { ...settings.notifications, ...value };
      } else if (settingId === "backup") {
        updatedSettings.backup = { ...settings.backup, ...value };
      } else if (settingId === "security") {
        updatedSettings.security = { ...settings.security, ...value };
      } else if (settingId === "integrations") {
        updatedSettings.integrations = { ...settings.integrations, ...value };
      }
    }

    setSettings(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase text-slate-400">
            System Configuration
          </p>
          <h2 className="text-lg font-semibold">System Configuration</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "general"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "users"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "settings"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "logs"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Logs
        </button>
      </div>

      {/* General Tab - NEW CONTENT */}
      {activeTab === "general" && (
        <div className="space-y-6">
          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-xs text-slate-500">Total Users</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">{users.length}</p>
                <p className="text-xs text-slate-500">
                  {users.filter((u) => u.status === "active").length} active
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Server className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-xs text-slate-500">System Status</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold text-green-600">Online</p>
                <p className="text-xs text-slate-500">99.9% uptime</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-xs text-slate-500">Database</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">2.4 GB</p>
                <p className="text-xs text-slate-500">
                  Last backup: {settings.backup.lastBackup}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Activity className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-xs text-slate-500">Activity</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">142</p>
                <p className="text-xs text-slate-500">Actions today</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  setActiveTab("users");
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Add User</p>
                  <p className="text-xs text-slate-500">
                    Create new user account
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  const now = new Date();
                  updateSetting("general", "backup", {
                    lastBackup: now.toISOString().split("T")[0],
                  });
                  alert("Backup initiated successfully");
                }}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <HardDrive className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Backup Now</p>
                  <p className="text-xs text-slate-500">Create system backup</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">System Settings</p>
                  <p className="text-xs text-slate-500">
                    Configure system options
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("logs")}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="p-2 bg-amber-100 rounded-lg">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">View Logs</p>
                  <p className="text-xs text-slate-500">Check system logs</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {systemLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 border border-slate-100 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      log.type === "error"
                        ? "bg-red-100"
                        : log.type === "warning"
                        ? "bg-amber-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {log.type === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : log.type === "warning" ? (
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.message}</p>
                    <p className="text-xs text-slate-500">{log.details}</p>
                  </div>
                  <p className="text-xs text-slate-400">{log.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Management</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add User</span>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilterModal(!showFilterModal)}
                className="p-2 bg-white border border-slate-200 rounded-lg text-sm"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    User
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Email
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Phone
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Role
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Department
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const userRole = getUserRole(user.role);

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${userRole.color}`}
                          >
                            <span className="text-white font-medium">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-slate-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </td>
                      <td className="p-3 text-sm">{user.phone}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${userRole.color}`}
                        >
                          {userRole.label}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        {user.profile?.department || "N/A"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewUserDetails(user)}
                            className="p-1 rounded hover:bg-blue-100 text-blue-600"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                            className="p-1 rounded hover:bg-blue-100 text-blue-600"
                            title="Edit user"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`p-1 rounded hover:bg-blue-100 ${
                              user.status === "active"
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                            title={
                              user.status === "active"
                                ? "Deactivate user"
                                : "Activate user"
                            }
                          >
                            {user.status === "active" ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <Unlock className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 rounded hover:bg-red-100 text-red-600"
                            title="Delete user"
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
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="space-y-6">
            {/* General Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700">
                Company Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.company.name}
                    onChange={(e) =>
                      updateSetting("general", "company", {
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Company Address
                  </label>
                  <input
                    type="text"
                    value={settings.company.address}
                    onChange={(e) =>
                      updateSetting("general", "company", {
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter company address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Company Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.company.phone}
                      onChange={(e) =>
                        updateSetting("general", "company", {
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Company Website
                    </label>
                    <input
                      type="url"
                      value={settings.company.website}
                      onChange={(e) =>
                        updateSetting("general", "company", {
                          website: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                      placeholder="Enter website URL"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700">
                System Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Timezone
                  </label>
                  <select
                    value={settings.system.timezone}
                    onChange={(e) =>
                      updateSetting("general", "system", {
                        timezone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="Asia/Shanghai">Asia/Shanghai</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Date Format
                    </label>
                    <select
                      value={settings.system.dateFormat}
                      onChange={(e) =>
                        updateSetting("general", "system", {
                          dateFormat: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Currency
                    </label>
                    <select
                      value={settings.system.currency}
                      onChange={(e) =>
                        updateSetting("general", "system", {
                          currency: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700">
                Notification Settings
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      updateSetting("general", "notifications", {
                        email: !settings.notifications.email,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Email Notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) =>
                      updateSetting("general", "notifications", {
                        sms: !settings.notifications.sms,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">SMS Notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) =>
                      updateSetting("general", "notifications", {
                        push: !settings.notifications.push,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Push Notifications</span>
                </label>
              </div>
            </div>

            {/* Security Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700">
                Security Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Password Policy
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={settings.security.passwordPolicy === "strong"}
                        onChange={() =>
                          updateSetting("general", "security", {
                            passwordPolicy: "strong",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Strong Password Policy</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={settings.security.passwordPolicy === "medium"}
                        onChange={() =>
                          updateSetting("general", "security", {
                            passwordPolicy: "medium",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Medium Password Policy</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={settings.security.passwordPolicy === "weak"}
                        onChange={() =>
                          updateSetting("general", "security", {
                            passwordPolicy: "weak",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Weak Password Policy</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      updateSetting("general", "security", {
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactor}
                      onChange={(e) =>
                        updateSetting("general", "security", {
                          twoFactor: !settings.security.twoFactor,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Two-Factor Authentication</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    IP Whitelist
                  </label>
                  <input
                    type="text"
                    value={settings.security.ipWhitelist}
                    onChange={(e) =>
                      updateSetting("general", "security", {
                        ipWhitelist: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter IP addresses (comma separated)"
                  />
                </div>
              </div>
            </div>

            {/* Integration Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700">
                Integration Settings
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.integrations.crm}
                    onChange={(e) =>
                      updateSetting("general", "integrations", {
                        crm: !settings.integrations.crm,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">CRM Integration</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.integrations.api}
                    onChange={(e) =>
                      updateSetting("general", "integrations", {
                        api: !settings.integrations.api,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">API Access</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.integrations.webhooks}
                    onChange={(e) =>
                      updateSetting("general", "integrations", {
                        webhooks: !settings.integrations.webhooks,
                      })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Webhooks</span>
                </label>
              </div>
            </div>

            {/* Data Backup Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700">
                Data Backup
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.backup.automatic}
                      onChange={(e) =>
                        updateSetting("general", "backup", {
                          automatic: !settings.backup.automatic,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Automatic Backup</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Backup Frequency
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={settings.backup.frequency === "daily"}
                        onChange={() =>
                          updateSetting("general", "backup", {
                            frequency: "daily",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Daily</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={settings.backup.frequency === "weekly"}
                        onChange={() =>
                          updateSetting("general", "backup", {
                            frequency: "weekly",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Weekly</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={settings.backup.frequency === "monthly"}
                        onChange={() =>
                          updateSetting("general", "backup", {
                            frequency: "monthly",
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Monthly</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Last Backup
                  </label>
                  <input
                    type="date"
                    value={settings.backup.lastBackup || ""}
                    onChange={(e) =>
                      updateSetting("general", "backup", {
                        lastBackup: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      const now = new Date();
                      updateSetting("general", "backup", {
                        lastBackup: now.toISOString().split("T")[0],
                      });
                      alert("Backup initiated successfully");
                    }}
                    className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm"
                  >
                    Backup Now
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === "logs" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">System Logs</h3>
            <button
              onClick={() => {
                const now = new Date();
                alert("System sync initiated");
              }}
              className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Logs
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Timestamp
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Type
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Message
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-3 text-sm">{log.timestamp}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.type === "error"
                            ? "bg-red-100 text-red-800"
                            : log.type === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{log.message}</td>
                    <td className="p-3 text-sm">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New User</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => {
                    const role = userRoles.find((r) => r.id === e.target.value);
                    setNewUser({
                      ...newUser,
                      role: e.target.value,
                      permissions: role.permissions,
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  {userRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-brand-blue text-white rounded-md text-sm"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => {
                    const role = userRoles.find((r) => r.id === e.target.value);
                    setSelectedUser({
                      ...selectedUser,
                      role: e.target.value,
                      permissions: role.permissions,
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  {userRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedUser.status}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-slate-300 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditUser(selectedUser)}
                className="px-4 py-2 bg-brand-blue text-white rounded-md text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button
                onClick={() => {
                  setShowUserDetailsModal(false);
                  setSelectedUser(null);
                }}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center ${
                    getUserRole(selectedUser.role).color
                  }`}
                >
                  <span className="text-white font-medium text-xl">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-medium">{selectedUser.name}</h4>
                  <p className="text-sm text-slate-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Role</p>
                  <p className="text-sm">
                    {getUserRole(selectedUser.role).label}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="text-sm">{selectedUser.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="text-sm">
                    {selectedUser.profile?.department || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Last Login</p>
                  <p className="text-sm">{selectedUser.lastLogin || "Never"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Created</p>
                  <p className="text-sm">{selectedUser.created}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowUserDetailsModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-slate-300 rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
