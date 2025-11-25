import React, { useState } from "react";
import {
  User,
  Users,
  MapPin,
  Bell,
  Settings,
  Link,
  Mail,
  Phone,
  Globe,
  Shield,
  Database,
  MessageSquare,
  Zap,
  ChevronRight,
  Check,
  X,
  Save,
  RefreshCw,
  AlertCircle,
  Info,
  Wifi,
  Smartphone,
  Clock,
  Calendar,
  Filter,
  Search,
  Edit,
  Trash2,
  Plus,
  ToggleLeft,
  ToggleRight,
  Volume2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Download,
  Upload,
  FileText,
  UserPlus,
  UserCheck,
  UserX,
  MoreVertical,
  ChevronDown,
  LogOut,
  HelpCircle,
  CreditCard,
  Key,
  Fingerprint,
  Monitor,
  Tablet,
  HardDrive,
  Cloud,
  Server,
  Cpu,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  // Profile Preferences State
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 98765 43210",
    role: "Sales Executive",
    avatar: "AJ",
    bio: "Experienced sales professional with 5+ years in fintech lending",
    timezone: "Asia/Kolkata",
    language: "English",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
    whatsapp: true,
    desktop: true,
    leadAssigned: true,
    leadUpdated: true,
    applicationSubmitted: true,
    paymentReceived: true,
    followUpReminder: true,
    weeklyReport: true,
    monthlyIncentive: true,
  });

  const [availability, setAvailability] = useState({
    monday: { active: true, from: "09:00", to: "18:00" },
    tuesday: { active: true, from: "09:00", to: "18:00" },
    wednesday: { active: true, from: "09:00", to: "18:00" },
    thursday: { active: true, from: "09:00", to: "18:00" },
    friday: { active: true, from: "09:00", to: "18:00" },
    saturday: { active: false, from: "", to: "" },
    sunday: { active: false, from: "", to: "" },
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordChange, setPasswordChange] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [activeTab, setActiveTab] = useState("profile");

  // Team & Territory State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Sales Executive",
      avatar: "AJ",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "Relationship Manager",
      avatar: "PS",
      status: "active",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@example.com",
      role: "Team Lead",
      avatar: "RV",
      status: "active",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha@example.com",
      role: "Sales Executive",
      avatar: "SR",
      status: "inactive",
    },
  ]);

  const [territories, setTerritories] = useState([
    {
      id: 1,
      name: "Mumbai West",
      pincode: "400001-400050",
      assignedTo: "Alex Johnson",
      leadCount: 42,
    },
    {
      id: 2,
      name: "Mumbai Central",
      pincode: "400051-400100",
      assignedTo: "Priya Sharma",
      leadCount: 38,
    },
    {
      id: 3,
      name: "Pune Metro",
      pincode: "411001-411050",
      assignedTo: "Rahul Verma",
      leadCount: 56,
    },
    {
      id: 4,
      name: "Thane District",
      pincode: "400601-400650",
      assignedTo: "Unassigned",
      leadCount: 24,
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Sales Executive",
  });
  const [newTerritory, setNewTerritory] = useState({
    name: "",
    pincode: "",
    assignedTo: "",
  });
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTerritory, setShowAddTerritory] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    lastSync: "2024-01-15 14:30:00",
    status: "success",
  });

  // Integrations State
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "FreshSales",
      type: "CRM",
      status: "connected",
      lastSync: "2024-01-15 14:30:00",
      features: ["Lead sync", "Contact sync", "Deal tracking"],
      settings: {
        autoSync: true,
        syncInterval: "15 min",
        dataTypes: ["leads", "contacts", "deals"],
      },
    },
    {
      id: 2,
      name: "LeadSquared",
      type: "CRM",
      status: "connected",
      lastSync: "2024-01-15 12:15:00",
      features: ["Lead management", "Activity tracking", "Analytics"],
      settings: {
        autoSync: false,
        syncInterval: "manual",
        dataTypes: ["leads", "activities"],
      },
    },
    {
      id: 3,
      name: "HubSpot",
      type: "CRM",
      status: "disconnected",
      lastSync: "Never",
      features: ["Marketing automation", "Sales pipeline", "Customer service"],
      settings: { autoSync: false, syncInterval: "manual", dataTypes: [] },
    },
    {
      id: 4,
      name: "Twilio",
      type: "Communication",
      status: "connected",
      lastSync: "2024-01-15 09:45:00",
      features: ["SMS alerts", "Voice calls", "WhatsApp integration"],
      settings: {
        senderId: "+919876543210",
        useWhatsApp: true,
        defaultRegion: "Mumbai",
      },
    },
    {
      id: 5,
      name: "Google Drive",
      type: "Storage",
      status: "connected",
      lastSync: "2024-01-15 16:20:00",
      features: ["Document storage", "File sharing", "Collaboration"],
      settings: {
        autoBackup: true,
        backupInterval: "daily",
        storageUsed: "2.3 GB",
        storageLimit: "5 GB",
      },
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showAddIntegration, setShowAddIntegration] = useState(false);
  const [availableIntegrations] = useState([
    {
      name: "Zoho CRM",
      type: "CRM",
      description: "Complete CRM solution for sales teams",
    },
    { name: "Salesforce", type: "CRM", description: "World's #1 CRM platform" },
    {
      name: "Microsoft Teams",
      type: "Communication",
      description: "Team collaboration and communication",
    },
    {
      name: "Slack",
      type: "Communication",
      description: "Business communication platform",
    },
    {
      name: "Dropbox",
      type: "Storage",
      description: "Secure cloud storage solution",
    },
  ]);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    dateFormat: "dd/mm/yyyy",
    currency: "INR",
    autoSave: true,
    autoSaveInterval: 30,
    defaultView: "dashboard",
    itemsPerPage: 25,
  });

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    shareAnalyticsData: true,
    marketingCommunications: false,
  });

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const [activeSection, setActiveSection] = useState("profile");
  const [showToastNotification, setShowToastNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToastNotification(true);

    setTimeout(() => {
      setShowToastNotification(false);
    }, 3000);
  };

  // Event Handlers
  const handleProfileUpdate = () => {
    // Simulate API call
    setTimeout(() => {
      showToast("Profile updated successfully", "success");
    }, 1000);
  };

  const handleNotificationChange = (key, value) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handlePasswordChange = () => {
    if (passwordChange.new !== passwordChange.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      showToast("Password changed successfully", "success");
      setPasswordChange({ current: "", new: "", confirm: "" });
    }, 1000);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    showToast(
      `Two-factor authentication ${!twoFactorEnabled ? "enabled" : "disabled"}`,
      "success"
    );
  };

  const handleAddTeamMember = () => {
    if (!newMember.name || !newMember.email) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const member = {
      id: Date.now(),
      ...newMember,
      avatar: newMember.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      status: "active",
    };

    setTeamMembers((prev) => [...prev, member]);
    setNewMember({ name: "", email: "", role: "Sales Executive" });
    setShowAddMember(false);
    showToast("Team member added successfully", "success");
  };

  const handleRemoveTeamMember = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    showToast("Team member removed", "info");
  };

  const handleAddTerritory = () => {
    if (!newTerritory.name || !newTerritory.pincode) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const territory = {
      id: Date.now(),
      ...newTerritory,
      leadCount: 0,
    };

    setTerritories((prev) => [...prev, territory]);
    setNewTerritory({ name: "", pincode: "", assignedTo: "" });
    setShowAddTerritory(false);
    showToast("Territory added successfully", "success");
  };

  const handleRemoveTerritory = (id) => {
    setTerritories((prev) => prev.filter((territory) => territory.id !== id));
    showToast("Territory removed", "info");
  };

  const handleAssignTerritory = (id, memberId) => {
    setTerritories((prev) =>
      prev.map((territory) =>
        territory.id === id
          ? {
              ...territory,
              assignedTo:
                teamMembers.find((m) => m.id === memberId)?.name ||
                "Unassigned",
            }
          : territory
      )
    );
    showToast("Territory assigned successfully", "success");
  };

  const handleIntegrationToggle = (id) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status:
                integration.status === "connected"
                  ? "disconnected"
                  : "connected",
            }
          : integration
      )
    );

    const integration = integrations.find((i) => i.id === id);
    showToast(
      `${integration.name} ${
        integration.status === "connected" ? "disconnected" : "connected"
      }`,
      "info"
    );
  };

  const handleIntegrationSettings = (id) => {
    const integration = integrations.find((i) => i.id === id);
    setSelectedIntegration(integration);
    setShowIntegrationModal(true);
  };

  const handleIntegrationSettingsSave = () => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === selectedIntegration.id
          ? { ...integration, settings: selectedIntegration.settings }
          : integration
      )
    );
    setShowIntegrationModal(false);
    showToast("Integration settings saved", "success");
  };

  const handleAddIntegration = (name) => {
    const newIntegration = {
      id: Date.now(),
      name,
      type: availableIntegrations.find((i) => i.name === name)?.type || "Other",
      status: "disconnected",
      lastSync: "Never",
      features: [],
      settings: {},
    };

    setIntegrations((prev) => [...prev, newIntegration]);
    setShowAddIntegration(false);
    showToast(`${name} added to integrations`, "success");
  };

  const handleSyncNow = (id) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, lastSync: "Syncing..." }
          : integration
      )
    );

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === id
            ? { ...integration, lastSync: new Date().toLocaleString() }
            : integration
        )
      );
      showToast("Sync completed successfully", "success");
    }, 3000);
  };

  const handleGeneralSettingChange = (key, value) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacySettingChange = (key, value) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleExportLeads = () => {
    // Simulate export process
    showToast("Preparing leads export...", "info");
    setTimeout(() => {
      // Create a dummy CSV content
      const csvContent =
        "Name,Email,Phone,Status\nAlex Johnson,alex@example.com,+91 98765 43210,active\nPriya Sharma,priya@example.com,+91 98765 43211,active";
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      showToast("Leads exported successfully", "success");
    }, 2000);
  };

  const handleExportReports = () => {
    // Simulate export process
    showToast("Preparing reports export...", "info");
    setTimeout(() => {
      // Create a dummy PDF content (in real app, this would generate a PDF)
      const pdfContent = "Sales Report - " + new Date().toLocaleDateString();
      const blob = new Blob([pdfContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reports_export_${
        new Date().toISOString().split("T")[0]
      }.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      showToast("Reports exported successfully", "success");
    }, 2000);
  };

  const handleDeleteAccount = async () => {
    if (deleteAccountConfirm !== "DELETE") {
      showToast("Please type DELETE to confirm", "error");
      return;
    }

    setIsDeletingAccount(true);
    showToast("Deleting account...", "info");

    try {
      // Simulate API call to delete account
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear local storage and session data
      localStorage.clear();
      sessionStorage.clear();

      // Reset all states to initial empty values
      setProfileData({
        name: "",
        email: "",
        phone: "",
        role: "",
        avatar: "",
        bio: "",
        timezone: "",
        language: "",
      });

      setTeamMembers([]);
      setTerritories([]);
      setIntegrations([]);

      // Show success message
      showToast(
        "Account deleted successfully. Redirecting to login...",
        "success"
      );

      // Close modal and reset form
      setShowDeleteAccountModal(false);
      setDeleteAccountConfirm("");

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      showToast("Failed to delete account. Please try again.", "error");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const handleSaveAllSettings = () => {
    // Simulate API call
    setTimeout(() => {
      showToast("All settings saved successfully", "success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-brand-blue" />
            <h1 className="text-xl font-semibold text-brand-navy">Settings</h1>
          </div>
          <button
            onClick={handleSaveAllSettings}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveSection("profile")}
            className={`py-4 border-b-2 transition-colors ${
              activeSection === "profile"
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Profile Preferences
          </button>
          <button
            onClick={() => setActiveSection("team")}
            className={`py-4 border-b-2 transition-colors ${
              activeSection === "team"
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Team & Territory
          </button>
          <button
            onClick={() => setActiveSection("integrations")}
            className={`py-4 border-b-2 transition-colors ${
              activeSection === "integrations"
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveSection("general")}
            className={`py-4 border-b-2 transition-colors ${
              activeSection === "general"
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            General
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="p-6">
        {/* Profile Preferences Section */}
        {activeSection === "profile" && (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Role
                    </label>
                    <select
                      value={profileData.role}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    >
                      <option>Sales Executive</option>
                      <option>Relationship Manager</option>
                      <option>Team Lead</option>
                      <option>Regional Manager</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Timezone
                      </label>
                      <select
                        value={profileData.timezone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            timezone: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      >
                        <option>Asia/Kolkata</option>
                        <option>Asia/Dubai</option>
                        <option>Europe/London</option>
                        <option>America/New_York</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Language
                      </label>
                      <select
                        value={profileData.language}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            language: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Marathi</option>
                        <option>Tamil</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleProfileUpdate}
                    className="w-full px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Update Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium text-slate-700 mb-3">
                      Notification Channels
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.email}
                          onChange={() =>
                            handleNotificationChange(
                              "email",
                              !notificationSettings.email
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Email Notifications
                          </p>
                          <p className="text-xs text-slate-500">
                            Receive updates via email
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.sms}
                          onChange={() =>
                            handleNotificationChange(
                              "sms",
                              !notificationSettings.sms
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            SMS Alerts
                          </p>
                          <p className="text-xs text-slate-500">
                            Get SMS notifications
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.push}
                          onChange={() =>
                            handleNotificationChange(
                              "push",
                              !notificationSettings.push
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Push Notifications
                          </p>
                          <p className="text-xs text-slate-500">
                            Browser/app notifications
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.whatsapp}
                          onChange={() =>
                            handleNotificationChange(
                              "whatsapp",
                              !notificationSettings.whatsapp
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            WhatsApp Messages
                          </p>
                          <p className="text-xs text-slate-500">
                            Updates via WhatsApp
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-slate-700 mb-3">
                      Notification Types
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.leadAssigned}
                          onChange={() =>
                            handleNotificationChange(
                              "leadAssigned",
                              !notificationSettings.leadAssigned
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Lead Assigned
                          </p>
                          <p className="text-xs text-slate-500">
                            When a lead is assigned to you
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.leadUpdated}
                          onChange={() =>
                            handleNotificationChange(
                              "leadUpdated",
                              !notificationSettings.leadUpdated
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Lead Updated
                          </p>
                          <p className="text-xs text-slate-500">
                            When a lead status changes
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.applicationSubmitted}
                          onChange={() =>
                            handleNotificationChange(
                              "applicationSubmitted",
                              !notificationSettings.applicationSubmitted
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Application Submitted
                          </p>
                          <p className="text-xs text-slate-500">
                            When a new application is submitted
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.paymentReceived}
                          onChange={() =>
                            handleNotificationChange(
                              "paymentReceived",
                              !notificationSettings.paymentReceived
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Payment Received
                          </p>
                          <p className="text-xs text-slate-500">
                            When a payment is received
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.followUpReminder}
                          onChange={() =>
                            handleNotificationChange(
                              "followUpReminder",
                              !notificationSettings.followUpReminder
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Follow-up Reminders
                          </p>
                          <p className="text-xs text-slate-500">
                            Reminders for follow-ups
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.weeklyReport}
                          onChange={() =>
                            handleNotificationChange(
                              "weeklyReport",
                              !notificationSettings.weeklyReport
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Weekly Report
                          </p>
                          <p className="text-xs text-slate-500">
                            Weekly performance reports
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.monthlyIncentive}
                          onChange={() =>
                            handleNotificationChange(
                              "monthlyIncentive",
                              !notificationSettings.monthlyIncentive
                            )
                          }
                          className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Monthly Incentive
                          </p>
                          <p className="text-xs text-slate-500">
                            Monthly incentive statements
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Availability Settings
              </h2>

              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Set your working hours for each day of week
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(availability).map(([day, settings]) => (
                    <div
                      key={day}
                      className="border border-slate-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-slate-700 capitalize">
                          {day}
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.active}
                            onChange={() =>
                              handleAvailabilityChange(
                                day,
                                "active",
                                !settings.active
                              )
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-10 h-6 rounded-full transition-colors ${
                              settings.active ? "bg-brand-blue" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`inline-block w-4 h-4 rounded-full bg-white transform transition-transform ${
                                settings.active
                                  ? "translate-x-5"
                                  : "translate-x-1"
                              }`}
                            />
                          </div>
                        </label>
                      </div>

                      {settings.active && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              From
                            </label>
                            <input
                              type="time"
                              value={settings.from}
                              onChange={(e) =>
                                handleAvailabilityChange(
                                  day,
                                  "from",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-blue/50 focus:border-brand-blue"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              To
                            </label>
                            <input
                              type="time"
                              value={settings.to}
                              onChange={(e) =>
                                handleAvailabilityChange(
                                  day,
                                  "to",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-blue/50 focus:border-brand-blue"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-slate-700 mb-3">
                    Two-Factor Authentication
                  </h3>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Enable 2FA
                      </p>
                      <p className="text-xs text-slate-500">
                        Add an extra layer of security
                      </p>
                    </div>
                    <button
                      onClick={handleTwoFactorToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        twoFactorEnabled ? "bg-brand-blue" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 rounded-full bg-white transform transition-transform ${
                          twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-slate-700 mb-3">
                    Change Password
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordChange.current}
                        onChange={(e) =>
                          setPasswordChange((prev) => ({
                            ...prev,
                            current: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordChange.new}
                        onChange={(e) =>
                          setPasswordChange((prev) => ({
                            ...prev,
                            new: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordChange.confirm}
                        onChange={(e) =>
                          setPasswordChange((prev) => ({
                            ...prev,
                            confirm: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="w-full px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Key className="h-4 w-4" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team & Territory Section */}
        {activeSection === "team" && (
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-brand-navy flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </h2>
                <button
                  onClick={() => setShowAddMember(true)}
                  className="px-3 py-1.5 bg-brand-blue text-white text-sm rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Add Member
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Name
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Email
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Role
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
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-slate-100">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-xs font-medium text-brand-blue">
                              {member.avatar}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {member.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-slate-600">
                          {member.email}
                        </td>
                        <td className="p-3 text-sm text-slate-600">
                          {member.role}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              member.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-slate-400 hover:text-brand-blue transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveTeamMember(member.id)}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Team Member Modal */}
            {showAddMember && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-semibold text-brand-navy mb-4">
                    Add Team Member
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newMember.name}
                        onChange={(e) =>
                          setNewMember((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newMember.email}
                        onChange={(e) =>
                          setNewMember((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Role
                      </label>
                      <select
                        value={newMember.role}
                        onChange={(e) =>
                          setNewMember((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      >
                        <option>Sales Executive</option>
                        <option>Relationship Manager</option>
                        <option>Team Lead</option>
                        <option>Regional Manager</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddTeamMember}
                      className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      Add Member
                    </button>
                    <button
                      onClick={() => setShowAddMember(false)}
                      className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Territory Management */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-brand-navy flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Territory Management
                </h2>
                <button
                  onClick={() => setShowAddTerritory(true)}
                  className="px-3 py-1.5 bg-brand-blue text-white text-sm rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Territory
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Territory Name
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Pincode Range
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Assigned To
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Lead Count
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {territories.map((territory) => (
                      <tr
                        key={territory.id}
                        className="border-b border-slate-100"
                      >
                        <td className="p-3 text-sm font-medium text-slate-700">
                          {territory.name}
                        </td>
                        <td className="p-3 text-sm text-slate-600">
                          {territory.pincode}
                        </td>
                        <td className="p-3 text-sm text-slate-600">
                          {territory.assignedTo}
                        </td>
                        <td className="p-3 text-sm text-slate-600">
                          {territory.leadCount}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-slate-400 hover:text-brand-blue transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleRemoveTerritory(territory.id)
                              }
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Last sync:{" "}
                  <span className="font-medium">{syncStatus.lastSync}</span>
                </div>
                <button
                  onClick={() => {
                    setSyncStatus((prev) => ({ ...prev, status: "syncing" }));
                    setTimeout(() => {
                      setSyncStatus({
                        lastSync: new Date().toLocaleString(),
                        status: "success",
                      });
                      showToast("CRM hierarchy synced successfully", "success");
                    }, 3000);
                  }}
                  className="px-3 py-1.5 bg-brand-blue text-white text-sm rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Sync CRM Hierarchy
                </button>
              </div>
            </div>

            {/* Add Territory Modal */}
            {showAddTerritory && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-semibold text-brand-navy mb-4">
                    Add Territory
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Territory Name
                      </label>
                      <input
                        type="text"
                        value={newTerritory.name}
                        onChange={(e) =>
                          setNewTerritory((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Pincode Range
                      </label>
                      <input
                        type="text"
                        value={newTerritory.pincode}
                        onChange={(e) =>
                          setNewTerritory((prev) => ({
                            ...prev,
                            pincode: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Assign To
                      </label>
                      <select
                        value={newTerritory.assignedTo}
                        onChange={(e) =>
                          setNewTerritory((prev) => ({
                            ...prev,
                            assignedTo: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddTerritory}
                      className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      Add Territory
                    </button>
                    <button
                      onClick={() => setShowAddTerritory(false)}
                      className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Integrations Section */}
        {activeSection === "integrations" && (
          <div className="space-y-6">
            {/* Connected Integrations */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-brand-navy flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Connected Integrations
                </h2>
                <button
                  onClick={() => setShowAddIntegration(true)}
                  className="px-3 py-1.5 bg-brand-blue text-white text-sm rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Integration
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-md font-medium text-slate-700">
                        {integration.name}
                      </h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          integration.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {integration.status}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-slate-500 mb-1">
                        Type: {integration.type}
                      </p>
                      <p className="text-xs text-slate-500 mb-1">
                        Last sync: {integration.lastSync}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-slate-500 mb-1">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleIntegrationToggle(integration.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          integration.status === "connected"
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            : "bg-brand-blue text-white hover:bg-brand-blue/90"
                        }`}
                      >
                        {integration.status === "connected"
                          ? "Disconnect"
                          : "Connect"}
                      </button>

                      <button
                        onClick={() =>
                          handleIntegrationSettings(integration.id)
                        }
                        className="p-1 text-slate-400 hover:text-brand-blue transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Settings Modal */}
            {showIntegrationModal && selectedIntegration && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-navy">
                      {selectedIntegration.name} Settings
                    </h3>
                    <button
                      onClick={() => setShowIntegrationModal(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedIntegration.type === "CRM" && (
                      <div>
                        <h4 className="text-md font-medium text-slate-700 mb-3">
                          Sync Settings
                        </h4>

                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedIntegration.settings.autoSync}
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    autoSync: e.target.checked,
                                  },
                                }))
                              }
                              className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                Auto Sync
                              </p>
                              <p className="text-xs text-slate-500">
                                Automatically sync data
                              </p>
                            </div>
                          </label>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Sync Interval
                            </label>
                            <select
                              value={selectedIntegration.settings.syncInterval}
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    syncInterval: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                            >
                              <option value="5 min">5 minutes</option>
                              <option value="15 min">15 minutes</option>
                              <option value="30 min">30 minutes</option>
                              <option value="1 hour">1 hour</option>
                              <option value="manual">Manual</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Data Types
                            </label>
                            <div className="space-y-2">
                              {["leads", "contacts", "deals", "activities"].map(
                                (type) => (
                                  <label
                                    key={type}
                                    className="flex items-center gap-3 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        selectedIntegration.settings.dataTypes?.includes(
                                          type
                                        ) || false
                                      }
                                      onChange={(e) => {
                                        const updatedDataTypes = e.target
                                          .checked
                                          ? [
                                              ...(selectedIntegration.settings
                                                .dataTypes || []),
                                              type,
                                            ]
                                          : (
                                              selectedIntegration.settings
                                                .dataTypes || []
                                            ).filter((t) => t !== type);

                                        setSelectedIntegration((prev) => ({
                                          ...prev,
                                          settings: {
                                            ...prev.settings,
                                            dataTypes: updatedDataTypes,
                                          },
                                        }));
                                      }}
                                      className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                                    />
                                    <span className="text-sm font-medium text-slate-700 capitalize">
                                      {type}
                                    </span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedIntegration.type === "Communication" && (
                      <div>
                        <h4 className="text-md font-medium text-slate-700 mb-3">
                          Communication Settings
                        </h4>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Sender ID
                            </label>
                            <input
                              type="text"
                              value={selectedIntegration.settings.senderId}
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    senderId: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                            />
                          </div>

                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedIntegration.settings.useWhatsApp}
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    useWhatsApp: e.target.checked,
                                  },
                                }))
                              }
                              className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                Use WhatsApp
                              </p>
                              <p className="text-xs text-slate-500">
                                Send messages via WhatsApp
                              </p>
                            </div>
                          </label>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Default Region
                            </label>
                            <select
                              value={selectedIntegration.settings.defaultRegion}
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    defaultRegion: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                            >
                              <option value="Mumbai">Mumbai</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Bangalore">Bangalore</option>
                              <option value="Chennai">Chennai</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedIntegration.type === "Storage" && (
                      <div>
                        <h4 className="text-md font-medium text-slate-700 mb-3">
                          Storage Settings
                        </h4>

                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedIntegration.settings.autoBackup}
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    autoBackup: e.target.checked,
                                  },
                                }))
                              }
                              className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                Auto Backup
                              </p>
                              <p className="text-xs text-slate-500">
                                Automatically backup files
                              </p>
                            </div>
                          </label>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Backup Interval
                            </label>
                            <select
                              value={
                                selectedIntegration.settings.backupInterval
                              }
                              onChange={(e) =>
                                setSelectedIntegration((prev) => ({
                                  ...prev,
                                  settings: {
                                    ...prev.settings,
                                    backupInterval: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                            >
                              <option value="hourly">Hourly</option>
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Storage Usage
                            </label>
                            <div className="bg-slate-100 rounded-lg p-3">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-600">
                                  Used:{" "}
                                  {selectedIntegration.settings.storageUsed}
                                </span>
                                <span className="text-sm text-slate-600">
                                  Limit:{" "}
                                  {selectedIntegration.settings.storageLimit}
                                </span>
                              </div>
                              <div className="w-full bg-slate-300 rounded-full h-2">
                                <div
                                  className="bg-brand-blue h-2 rounded-full"
                                  style={{
                                    width: `${
                                      (parseInt(
                                        selectedIntegration.settings.storageUsed
                                      ) /
                                        parseInt(
                                          selectedIntegration.settings
                                            .storageLimit
                                        )) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      onClick={() => {
                        handleSyncNow(selectedIntegration.id);
                        setShowIntegrationModal(false);
                      }}
                      className="px-3 py-1.5 bg-brand-blue text-white text-sm rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sync Now
                    </button>

                    <button
                      onClick={handleIntegrationSettingsSave}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Integration Modal */}
            {showAddIntegration && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-semibold text-brand-navy mb-4">
                    Add Integration
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Select Integration
                      </label>
                      <select
                        onChange={(e) => handleAddIntegration(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                      >
                        <option value="">Select an integration</option>
                        {availableIntegrations.map((integration) => (
                          <option
                            key={integration.name}
                            value={integration.name}
                          >
                            {integration.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setShowAddIntegration(false)}
                      className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* General Section */}
        {activeSection === "general" && (
          <div className="space-y-6">
            {/* Display Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Display Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date Format
                    </label>
                    <select
                      value={generalSettings.dateFormat}
                      onChange={(e) =>
                        handleGeneralSettingChange("dateFormat", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    >
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Currency
                    </label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) =>
                        handleGeneralSettingChange("currency", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Application Settings
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generalSettings.autoSave}
                    onChange={() =>
                      handleGeneralSettingChange(
                        "autoSave",
                        !generalSettings.autoSave
                      )
                    }
                    className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Auto Save
                    </p>
                    <p className="text-xs text-slate-500">
                      Automatically save changes
                    </p>
                  </div>
                </label>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Auto Save Interval (seconds)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={generalSettings.autoSaveInterval}
                    onChange={(e) =>
                      handleGeneralSettingChange(
                        "autoSaveInterval",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Default View
                  </label>
                  <select
                    value={generalSettings.defaultView}
                    onChange={(e) =>
                      handleGeneralSettingChange("defaultView", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                  >
                    <option value="dashboard">Dashboard</option>
                    <option value="pipeline">Pipeline</option>
                    <option value="leads">Leads</option>
                    <option value="reports">Reports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Items Per Page
                  </label>
                  <select
                    value={generalSettings.itemsPerPage}
                    onChange={(e) =>
                      handleGeneralSettingChange(
                        "itemsPerPage",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data & Privacy
              </h2>

              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="text-md font-medium text-slate-700 mb-3">
                    Data Export
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleExportLeads}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export Leads
                    </button>

                    <button
                      onClick={handleExportReports}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export Reports
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 mt-4">
                  <h3 className="text-md font-medium text-slate-700 mb-3">
                    Privacy Settings
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.shareAnalyticsData}
                        onChange={() =>
                          handlePrivacySettingChange(
                            "shareAnalyticsData",
                            !privacySettings.shareAnalyticsData
                          )
                        }
                        className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Share Analytics Data
                        </p>
                        <p className="text-xs text-slate-500">
                          Help improve our services
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.marketingCommunications}
                        onChange={() =>
                          handlePrivacySettingChange(
                            "marketingCommunications",
                            !privacySettings.marketingCommunications
                          )
                        }
                        className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Marketing Communications
                        </p>
                        <p className="text-xs text-slate-500">
                          Receive product updates
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setShowDeleteAccountModal(true)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-navy">
                  Delete Account
                </h3>
                <p className="text-sm text-slate-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-slate-700">
                Deleting your account will permanently remove:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>All your personal data</li>
                <li>Team memberships and permissions</li>
                <li>Territory assignments</li>
                <li>Activity history and logs</li>
                <li>Integration settings</li>
              </ul>
              <p className="text-sm text-slate-700 font-medium">
                Type "DELETE" below to confirm:
              </p>
              <input
                type="text"
                value={deleteAccountConfirm}
                onChange={(e) => setDeleteAccountConfirm(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={
                  deleteAccountConfirm !== "DELETE" || isDeletingAccount
                }
                className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  deleteAccountConfirm === "DELETE" && !isDeletingAccount
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isDeletingAccount ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteAccountModal(false);
                  setDeleteAccountConfirm("");
                }}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToastNotification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
            toastType === "success"
              ? "bg-green-500 text-white"
              : toastType === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {toastType === "success" && <CheckCircle className="h-5 w-5" />}
          {toastType === "error" && <XCircle className="h-5 w-5" />}
          {toastType === "info" && <AlertCircle className="h-5 w-5" />}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
