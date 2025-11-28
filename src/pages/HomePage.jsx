import React, { useMemo, useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  FileText,
  PhoneCall,
  Sparkles,
  Upload,
  X,
  Send,
  Users,
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
  MessageSquare,
  Bell,
  User,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  Eye,
  Activity,
  DollarSign,
  FileCheck,
  AlertCircle,
  ChevronDown,
  Star,
  Target,
  Zap,
  HelpCircle,
} from "lucide-react";
import {
  pipelineColumns,
  applyPipelineFilter,
  quickFilterLabels,
} from "../data/pipelineData";

const statCards = [
  {
    label: "Active Leads",
    value: "128",
    change: "+14% vs last week",
    detail:
      "Number of in-progress leads, including fresh captures and reassigned contacts across teams.",
    gradient: "from-brand-blue/90 via-brand-indigo/80 to-brand-purple/80",
  },
  {
    label: "Lead → Application",
    value: "46%",
    change: "Target 60%",
    detail:
      "Percentage of leads that have progressed to full application submissions in last 7 days.",
    gradient: "from-brand-navy via-brand-blue to-brand-slate",
  },
  {
    label: "Avg. Time to Apply",
    value: "38 hrs",
    change: "↓ 6 hrs improvement",
    detail:
      "Average time taken for a captured lead to reach application stage across all owners.",
    gradient: "from-brand-emerald/90 via-brand-sky/70 to-brand-blue/90",
  },
  {
    label: "Monthly Incentives",
    value: "₹ 86,400",
    change: "Calculated till today",
    detail:
      "Total incentives earned for current payout cycle, including bonuses and accelerators.",
    gradient: "from-brand-blue/90 via-brand-emerald/80 to-brand-sky/70",
  },
  {
    label: "Active Leads",
    value: "128",
    change: "+14% vs last week",
    detail:
      "Number of in-progress leads, including fresh captures and reassigned contacts across teams.",
    gradient: "from-brand-blue/90 via-brand-indigo/80 to-brand-purple/80",
  },

  {
    label: "Collection Recovery",
    value: "72%",
    change: "↑ 3% improvement",
    detail: "Percentage of successfully recovered collections this month",
    gradient: "from-brand-emerald/90 via-brand-teal/80 to-brand-cyan/80",
  },
  {
    label: "New Leads Today", // UPDATED
    value: "15",
    change: "On track for daily goal",
    detail: "Number of new leads captured today",
    gradient: "from-brand-emerald/90 via-brand-sky/70 to-brand-blue/90", // Same as "Active Tickets"
  },
];

// Initial reminders data
const initialReminders = [
  {
    id: 1,
    title: "Follow-up call: Karan Patel",
    due: "Today · 4:30 PM",
    type: "call",
    leadName: "Karan Patel",
    phone: "+91 98765 43210",
    email: "karan.patel@example.com",
    location: "Mumbai",
    notes: "Discuss business loan requirements for textile business",
    completed: false,
  },
  {
    id: 2,
    title: "Upload GST sheets - Sarthak Foods",
    due: "Today · 7:00 PM",
    type: "task",
    leadName: "Sarthak Foods",
    phone: "+91 98765 43211",
    email: "contact@sarthakfoods.com",
    location: "Pune",
    notes: "Pending GST documents for loan processing",
    completed: false,
  },
  {
    id: 3,
    title: "Notify RM about Vihaan Infra payout",
    due: "Tomorrow · 10:00 AM",
    type: "note",
    leadName: "Vihaan Infrastructure",
    phone: "+91 98765 43212",
    email: "info@vihaaninfra.com",
    location: "Delhi",
    notes: "Payout approval pending from relationship manager",
    completed: false,
  },
];

// Initial activities data
const initialActivities = [
  {
    id: 1,
    type: "lead_created",
    message: "New lead created: Kavya Steel",
    timestamp: "2 minutes ago",
    user: "You",
    icon: <Plus className="h-4 w-4" />,
    color: "text-brand-emerald bg-brand-emerald/10",
  },
  {
    id: 2,
    type: "call_completed",
    message: "Call completed with Karan Patel",
    timestamp: "15 minutes ago",
    user: "Alex Johnson",
    icon: <PhoneCall className="h-4 w-4" />,
    color: "text-brand-blue bg-brand-blue/10",
  },
  {
    id: 3,
    type: "ticket_resolved",
    message: "Support ticket #1234 resolved",
    timestamp: "1 hour ago",
    user: "Priya Sharma",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "text-brand-purple bg-brand-purple/10",
  },
  {
    id: 4,
    type: "document_uploaded",
    message: "PAN document uploaded for Sarthak Foods",
    timestamp: "2 hours ago",
    user: "Rahul Verma",
    icon: <Upload className="h-4 w-4" />,
    color: "text-brand-amber bg-brand-amber/10",
  },
  {
    id: 5,
    type: "lead_converted",
    message: "Lead converted: Vihaan Infrastructure",
    timestamp: "3 hours ago",
    user: "Sneha Reddy",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "text-brand-emerald bg-brand-emerald/10",
  },
];

// Mock team members for notification
const teamMembers = [
  { id: 1, name: "Alex Johnson", role: "Sales Executive", avatar: "AJ" },
  { id: 2, name: "Priya Sharma", role: "Relationship Manager", avatar: "PS" },
  { id: 3, name: "Rahul Verma", role: "Team Lead", avatar: "RV" },
  { id: 4, name: "Sneha Reddy", role: "Sales Executive", avatar: "SR" },
];

// Generate mock data for metric reports
const generateMetricData = (metricLabel) => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = labels.map(() => Math.floor(Math.random() * 100) + 20);

  if (metricLabel === "Active Leads") {
    return {
      labels,
      datasets: [
        {
          label: "New Leads",
          data: labels.map(() => Math.floor(Math.random() * 20) + 5),
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "Active Leads",
          data,
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    };
  } else if (metricLabel === "Lead → Application") {
    return {
      labels,
      datasets: [
        {
          label: "Conversion Rate (%)",
          data: labels.map(() => Math.floor(Math.random() * 30) + 30),
          backgroundColor: "rgba(99, 102, 241, 0.5)",
        },
      ],
    };
  } else if (metricLabel === "Avg. Time to Apply") {
    return {
      labels,
      datasets: [
        {
          label: "Hours",
          data: labels.map(() => Math.floor(Math.random() * 20) + 30),
          backgroundColor: "rgba(245, 158, 11, 0.5)",
        },
      ],
    };
  } else {
    return {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Incentive (₹)",
          data: labels.map(() => Math.floor(Math.random() * 30000) + 15000),
          backgroundColor: "rgba(236, 72, 153, 0.5)",
        },
      ],
    };
  }
};

// Enhanced lead data with more details
const generateLeadDetails = (lead, stage) => {
  const scores = Math.floor(Math.random() * 40) + 60;
  const probability =
    stage === "Disbursed"
      ? 100
      : stage === "Approved"
      ? 85
      : stage === "Application Submitted"
      ? 65
      : stage === "Contacted"
      ? 40
      : 25;

  return {
    ...lead,
    id: Math.random().toString(36).substr(2, 9),
    email: lead.name.toLowerCase().replace(" ", ".") + "@example.com",
    phone: "+91 " + Math.floor(Math.random() * 9000000000 + 1000000000),
    address: [
      "Mumbai, Maharashtra",
      "Pune, Maharashtra",
      "Delhi, NCR",
      "Bangalore, Karnataka",
      "Hyderabad, Telangana",
    ][Math.floor(Math.random() * 5)],
    pan:
      "ABCDE" +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0"),
    gstin: "27AAAPL1234C1ZV",
    businessType: ["Proprietorship", "Partnership", "Private Limited", "LLP"][
      Math.floor(Math.random() * 4)
    ],
    industry: [
      "Manufacturing",
      "Services",
      "Trading",
      "Construction",
      "IT Services",
    ][Math.floor(Math.random() * 5)],
    monthlyRevenue: Math.floor(Math.random() * 5000000 + 1000000),
    creditScore: scores,
    loanProbability: probability,
    documents: {
      pan: Math.random() > 0.3,
      aadhaar: Math.random() > 0.2,
      gst: Math.random() > 0.4,
      bankStatement: Math.random() > 0.5,
      itr: Math.random() > 0.6,
    },
    activities: [
      {
        date: "2024-01-15 10:30",
        type: "call",
        description: "Initial contact made",
        status: "completed",
      },
      {
        date: "2024-01-15 14:20",
        type: "email",
        description: "Sent loan proposal",
        status: "completed",
      },
      {
        date: "2024-01-16 09:15",
        type: "meeting",
        description: "Document verification meeting",
        status: "scheduled",
      },
    ],
    nextAction:
      stage === "New"
        ? "Make first contact"
        : stage === "Contacted"
        ? "Schedule meeting"
        : stage === "Application Submitted"
        ? "Document verification"
        : stage === "Approved"
        ? "Disbursement process"
        : "Follow up post-disbursement",
    riskLevel: scores > 75 ? "Low" : scores > 60 ? "Medium" : "High",
    expectedClosure:
      stage === "Disbursed"
        ? "Completed"
        : new Date(
            Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
  };
};

export default function HomePage({ activeFilter, filterMeta }) {
  const [kycPreview, setKycPreview] = useState(null);
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    city: "",
    loanType: "Business Loan",
    amount: "",
    remarks: "",
  });
  const [stage, setStage] = useState("New");
  const [activeStat, setActiveStat] = useState(statCards[0]);
  const [formStatus, setFormStatus] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [metricData, setMetricData] = useState(
    generateMetricData(activeStat.label)
  );

  // Reminder states
  const [reminders, setReminders] = useState(initialReminders);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    due: "",
    type: "call",
    leadName: "",
    phone: "",
    email: "",
    location: "",
    notes: "",
  });
  const [reminderAction, setReminderAction] = useState(null);

  // Lead Spotlight states
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [spotlightFilter, setSpotlightFilter] = useState("all");
  const [sortBy, setSortBy] = useState("timeAgo");

  // Quick Actions states
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedQuickAction, setSelectedQuickAction] = useState(null);
  const [showQuickCallModal, setShowQuickCallModal] = useState(false);
  const [showQuickEmailModal, setShowQuickEmailModal] = useState(false);
  const [showQuickNoteModal, setShowQuickNoteModal] = useState(false);
  const [showQuickTicketModal, setShowQuickTicketModal] = useState(false);
  const [quickCallData, setQuickCallData] = useState({
    leadName: "",
    phoneNumber: "",
    notes: "",
  });
  const [quickEmailData, setQuickEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [quickNoteData, setQuickNoteData] = useState({
    leadName: "",
    note: "",
    assignTo: "",
  });
  const [quickTicketData, setQuickTicketData] = useState({
    leadName: "",
    issue: "",
    priority: "medium",
    description: "",
    assignTo: "",
  });
  const [quickActionStatus, setQuickActionStatus] = useState(null);

  // Activity feed states
  const [activities, setActivities] = useState(initialActivities);
  const [showActivityFilter, setShowActivityFilter] = useState(false);
  const [activityFilter, setActivityFilter] = useState("all");

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const stageOptions = useMemo(
    () => pipelineColumns.map((col) => col.stage),
    []
  );
  const fallbackFilterMeta = useMemo(
    () => applyPipelineFilter(pipelineColumns, activeFilter),
    [activeFilter]
  );
  const effectiveFilter = filterMeta || fallbackFilterMeta;
  const { columns: filteredColumns, matched } = effectiveFilter;

  // Enhanced lead spotlight with generated details
  const leadSpotlight = useMemo(() => {
    const leads = filteredColumns
      .flatMap((col) =>
        col.leads.map((lead) =>
          generateLeadDetails({ ...lead, stage: col.stage }, col.stage)
        )
      )
      .slice(0, 6);

    // Apply filters
    let filteredLeads = leads;
    if (spotlightFilter !== "all") {
      filteredLeads = leads.filter((lead) => {
        if (spotlightFilter === "my") return lead.owner === "me";
        if (spotlightFilter === "team") return lead.owner !== "me";
        if (spotlightFilter === "high-priority")
          return lead.loanProbability > 70;
        if (spotlightFilter === "docs-pending")
          return !Object.values(lead.documents).every(Boolean);
        return true;
      });
    }

    // Apply sorting
    filteredLeads.sort((a, b) => {
      if (sortBy === "timeAgo")
        return new Date(b.timeAgo) - new Date(a.timeAgo);
      if (sortBy === "amount")
        return (
          parseInt(b.amount.replace(/[^\d]/g, "")) -
          parseInt(a.amount.replace(/[^\d]/g, ""))
        );
      if (sortBy === "probability")
        return b.loanProbability - a.loanProbability;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return filteredLeads;
  }, [filteredColumns, spotlightFilter, sortBy]);

  // Filter activities based on selected filter
  const filteredActivities = useMemo(() => {
    if (activityFilter === "all") return activities;
    return activities.filter((activity) => activity.type === activityFilter);
  }, [activities, activityFilter]);

  const activeFilterLabel = activeFilter
    ? quickFilterLabels[activeFilter]
    : "All leads";

  // Toast notification function
  const showToast = (message, type = "info") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
      type === "success"
        ? "bg-brand-emerald text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : "bg-brand-blue text-white"
    }`;
    notification.innerHTML = `
      ${
        type === "success"
          ? '<CheckCircle2 className="h-4 w-4" />'
          : type === "error"
          ? '<X className="h-4 w-4" />'
          : '<Bell className="h-4 w-4" />'
      }
      <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setKycPreview({ name: file.name, preview });
    }
  };

  const handleLeadChange = (field, value) => {
    setLeadData((prev) => ({ ...prev, [field]: value }));
    // Clear any error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!leadData.name.trim()) {
      errors.name = "Borrower name is required";
    }

    if (!leadData.phone.trim()) {
      errors.phone = "Contact number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(leadData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!leadData.city.trim()) {
      errors.city = "City/Region is required";
    }

    if (!leadData.amount.trim()) {
      errors.amount = "Ticket size is required";
    } else if (isNaN(leadData.amount.replace(/[^\d]/g, ""))) {
      errors.amount = "Please enter a valid amount";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      setFormStatus("Please fix errors below");
      setTimeout(() => setFormStatus(null), 3000);
      return;
    }

    // Set submitting state
    setIsSubmitting(true);
    setFormStatus("Processing...");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setFormStatus("Lead captured and assigned");
      showToast("Lead captured successfully!", "success");

      // Add to activities
      const newActivity = {
        id: Date.now(),
        type: "lead_created",
        message: `New lead created: ${leadData.name}`,
        timestamp: "Just now",
        user: "You",
        icon: <Plus className="h-4 w-4" />,
        color: "text-brand-emerald bg-brand-emerald/10",
      };
      setActivities((prev) => [newActivity, ...prev]);

      // Add to reminders
      const newReminder = {
        id: Date.now(),
        title: `New lead: ${leadData.name}`,
        due: "Just now",
        type: "call",
        leadName: leadData.name,
        phone: leadData.phone,
        notes: leadData.remarks || "New lead captured",
        completed: false,
      };
      setReminders((prev) => [newReminder, ...prev]);

      // Reset form after successful submission
      setTimeout(() => {
        setLeadData({
          name: "",
          phone: "",
          city: "",
          loanType: "Business Loan",
          amount: "",
          remarks: "",
        });
        setKycPreview(null);
        setStage("New");
        setFormStatus(null);
        setFormErrors({});
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("Failed to submit lead. Please try again.");
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  const handleViewReport = () => {
    setMetricData(generateMetricData(activeStat.label));
    setShowReportModal(true);
  };

  const handleNotifyTeam = () => {
    setShowNotifyModal(true);
  };

  const handleTeamMemberToggle = (memberId) => {
    setSelectedTeamMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSendNotification = () => {
    if (!notificationMessage.trim() || selectedTeamMembers.length === 0) {
      setNotificationStatus(
        "Please add a message and select at least one team member"
      );
      setTimeout(() => setNotificationStatus(null), 3000);
      return;
    }

    setNotificationStatus("sending");

    setTimeout(() => {
      setNotificationStatus("sent");
      showToast("Notification sent to team!", "success");

      // Add to activities
      const newActivity = {
        id: Date.now(),
        type: "notification_sent",
        message: `Team notification sent to ${selectedTeamMembers.length} members`,
        timestamp: "Just now",
        user: "You",
        icon: <Send className="h-4 w-4" />,
        color: "text-brand-blue bg-brand-blue/10",
      };
      setActivities((prev) => [newActivity, ...prev]);

      setTimeout(() => {
        setShowNotifyModal(false);
        setNotificationMessage("");
        setSelectedTeamMembers([]);
        setNotificationStatus(null);
      }, 1500);
    }, 1500);
  };

  // Reminder functions
  const handleReminderClick = (reminder) => {
    setSelectedReminder(reminder);
    setShowReminderModal(true);
  };

  const handleCompleteReminder = (reminderId) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === reminderId ? { ...reminder, completed: true } : reminder
      )
    );

    const reminder = reminders.find((r) => r.id === reminderId);
    showToast(`${reminder.title} marked as complete`, "success");

    // Add to activities
    const newActivity = {
      id: Date.now(),
      type: "reminder_completed",
      message: `Reminder completed: ${reminder.title}`,
      timestamp: "Just now",
      user: "You",
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: "text-brand-emerald bg-brand-emerald/10",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleDeleteReminder = (reminderId) => {
    setReminders((prev) =>
      prev.filter((reminder) => reminder.id !== reminderId)
    );
    showToast("Reminder deleted", "info");
  };

  const handleAddReminder = () => {
    if (!newReminder.title.trim() || !newReminder.due.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const reminder = {
      id: Date.now(),
      ...newReminder,
      completed: false,
    };

    setReminders((prev) => [...prev, reminder]);
    setNewReminder({
      title: "",
      due: "",
      type: "call",
      leadName: "",
      phone: "",
      email: "",
      location: "",
      notes: "",
    });
    setShowAddReminderModal(false);
    showToast("Reminder added successfully", "success");

    // Add to activities
    const newActivity = {
      id: Date.now(),
      type: "reminder_created",
      message: `New reminder created: ${reminder.title}`,
      timestamp: "Just now",
      user: "You",
      icon: <Clock className="h-4 w-4" />,
      color: "text-brand-amber bg-brand-amber/10",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  // Lead Spotlight functions
  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setShowLeadModal(true);
    setShowActionsMenu(null);
  };

  const handleLeadAction = (action, lead) => {
    switch (action) {
      case "view":
        handleLeadClick(lead);
        break;
      case "call":
        window.open(`tel:${lead.phone}`);
        showToast(`Calling ${lead.name}...`, "info");

        // Add to activities
        const callActivity = {
          id: Date.now(),
          type: "call_initiated",
          message: `Call initiated with ${lead.name}`,
          timestamp: "Just now",
          user: "You",
          icon: <PhoneCall className="h-4 w-4" />,
          color: "text-brand-blue bg-brand-blue/10",
        };
        setActivities((prev) => [callActivity, ...prev]);
        break;
      case "email":
        window.open(`mailto:${lead.email}`);
        showToast(`Opening email client for ${lead.name}...`, "info");

        // Add to activities
        const emailActivity = {
          id: Date.now(),
          type: "email_sent",
          message: `Email sent to ${lead.name}`,
          timestamp: "Just now",
          user: "You",
          icon: <Mail className="h-4 w-4" />,
          color: "text-brand-indigo bg-brand-indigo/10",
        };
        setActivities((prev) => [emailActivity, ...prev]);
        break;
      case "assign":
        showToast(`Lead ${lead.name} assigned to you`, "success");

        // Add to activities
        const assignActivity = {
          id: Date.now(),
          type: "lead_assigned",
          message: `Lead assigned to you: ${lead.name}`,
          timestamp: "Just now",
          user: "You",
          icon: <User className="h-4 w-4" />,
          color: "text-brand-purple bg-brand-purple/10",
        };
        setActivities((prev) => [assignActivity, ...prev]);
        break;
      case "priority":
        showToast(`${lead.name} marked as high priority`, "success");

        // Add to activities
        const priorityActivity = {
          id: Date.now(),
          type: "priority_updated",
          message: `Marked as high priority: ${lead.name}`,
          timestamp: "Just now",
          user: "You",
          icon: <Star className="h-4 w-4" />,
          color: "text-brand-amber bg-brand-amber/10",
        };
        setActivities((prev) => [priorityActivity, ...prev]);
        break;
      case "archive":
        showToast(`${lead.name} archived`, "info");

        // Add to activities
        const archiveActivity = {
          id: Date.now(),
          type: "lead_archived",
          message: `Lead archived: ${lead.name}`,
          timestamp: "Just now",
          user: "You",
          icon: <Trash2 className="h-4 w-4" />,
          color: "text-brand-slate bg-brand-slate/10",
        };
        setActivities((prev) => [archiveActivity, ...prev]);
        break;
      default:
        break;
    }
    setShowActionsMenu(null);
  };

  // Quick Actions functions
  const handleQuickAction = (action) => {
    setSelectedQuickAction(action);
    setShowQuickActions(false);

    switch (action) {
      case "call":
        setShowQuickCallModal(true);
        break;
      case "email":
        setShowQuickEmailModal(true);
        break;
      case "note":
        setShowQuickNoteModal(true);
        break;
      case "ticket":
        setShowQuickTicketModal(true);
        break;
      default:
        break;
    }
  };

  const handleQuickCallSubmit = (e) => {
    e.preventDefault();
    if (!quickCallData.phoneNumber.trim()) {
      setQuickActionStatus("Please enter a phone number");
      setTimeout(() => setQuickActionStatus(null), 3000);
      return;
    }

    setQuickActionStatus("initiating");

    setTimeout(() => {
      window.open(`tel:${quickCallData.phoneNumber}`);
      setQuickActionStatus("completed");

      // Add a reminder for call
      const newReminder = {
        id: Date.now(),
        title: `Call: ${quickCallData.leadName}`,
        due: "Just now",
        type: "call",
        leadName: quickCallData.leadName,
        phone: quickCallData.phoneNumber,
        notes: quickCallData.notes,
        completed: true,
      };

      setReminders((prev) => [newReminder, ...prev]);

      // Add to activities
      const callActivity = {
        id: Date.now(),
        type: "call_completed",
        message: `Quick call completed with ${quickCallData.leadName}`,
        timestamp: "Just now",
        user: "You",
        icon: <PhoneCall className="h-4 w-4" />,
        color: "text-brand-blue bg-brand-blue/10",
      };
      setActivities((prev) => [callActivity, ...prev]);

      setTimeout(() => {
        setShowQuickCallModal(false);
        setQuickCallData({
          leadName: "",
          phoneNumber: "",
          notes: "",
        });
        setQuickActionStatus(null);
        showToast("Call initiated and reminder added", "success");
      }, 1500);
    }, 1500);
  };

  const handleQuickEmailSubmit = (e) => {
    e.preventDefault();
    if (!quickEmailData.to.trim() || !quickEmailData.subject.trim()) {
      setQuickActionStatus("Please fill in all required fields");
      setTimeout(() => setQuickActionStatus(null), 3000);
      return;
    }

    setQuickActionStatus("sending");

    setTimeout(() => {
      window.open(
        `mailto:${quickEmailData.to}?subject=${encodeURIComponent(
          quickEmailData.subject
        )}&body=${encodeURIComponent(quickEmailData.message)}`
      );
      setQuickActionStatus("sent");

      // Add a reminder for email
      const newReminder = {
        id: Date.now(),
        title: `Email sent: ${quickEmailData.subject}`,
        due: "Just now",
        type: "note",
        leadName: quickEmailData.to.split("@")[0],
        notes: `Email sent to ${quickEmailData.to}`,
        completed: true,
      };

      setReminders((prev) => [newReminder, ...prev]);

      // Add to activities
      const emailActivity = {
        id: Date.now(),
        type: "email_sent",
        message: `Quick email sent to ${quickEmailData.to}`,
        timestamp: "Just now",
        user: "You",
        icon: <Mail className="h-4 w-4" />,
        color: "text-brand-indigo bg-brand-indigo/10",
      };
      setActivities((prev) => [emailActivity, ...prev]);

      setTimeout(() => {
        setShowQuickEmailModal(false);
        setQuickEmailData({
          to: "",
          subject: "",
          message: "",
        });
        setQuickActionStatus(null);
        showToast("Email sent and reminder added", "success");
      }, 1500);
    }, 1500);
  };

  const handleQuickNoteSubmit = (e) => {
    e.preventDefault();
    if (!quickNoteData.leadName.trim() || !quickNoteData.note.trim()) {
      setQuickActionStatus("Please fill in all required fields");
      setTimeout(() => setQuickActionStatus(null), 3000);
      return;
    }

    setQuickActionStatus("saving");

    setTimeout(() => {
      // Add a reminder for note
      const newReminder = {
        id: Date.now(),
        title: `Note: ${quickNoteData.leadName}`,
        due: "Just now",
        type: "note",
        leadName: quickNoteData.leadName,
        notes: quickNoteData.note,
        completed: false,
      };

      setReminders((prev) => [newReminder, ...prev]);
      setQuickActionStatus("saved");

      // Add to activities
      const noteActivity = {
        id: Date.now(),
        type: "note_added",
        message: `Quick note added for ${quickNoteData.leadName}`,
        timestamp: "Just now",
        user: "You",
        icon: <FileText className="h-4 w-4" />,
        color: "text-brand-amber bg-brand-amber/10",
      };
      setActivities((prev) => [noteActivity, ...prev]);

      setTimeout(() => {
        setShowQuickNoteModal(false);
        setQuickNoteData({
          leadName: "",
          note: "",
          assignTo: "",
        });
        setQuickActionStatus(null);
        showToast("Note saved and reminder added", "success");
      }, 1500);
    }, 1500);
  };

  const handleQuickTicketSubmit = (e) => {
    e.preventDefault();
    if (!quickTicketData.leadName.trim() || !quickTicketData.issue.trim()) {
      setQuickActionStatus("Please fill in all required fields");
      setTimeout(() => setQuickActionStatus(null), 3000);
      return;
    }

    setQuickActionStatus("creating");

    setTimeout(() => {
      // Generate a ticket ID
      const ticketId =
        "TKT-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");

      // Add to activities
      const ticketActivity = {
        id: Date.now(),
        type: "ticket_created",
        message: `Support ticket created: ${ticketId} for ${quickTicketData.leadName}`,
        timestamp: "Just now",
        user: "You",
        icon: <HelpCircle className="h-4 w-4" />,
        color: "text-brand-purple bg-brand-purple/10",
      };
      setActivities((prev) => [ticketActivity, ...prev]);

      setQuickActionStatus("created");

      setTimeout(() => {
        setShowQuickTicketModal(false);
        setQuickTicketData({
          leadName: "",
          issue: "",
          priority: "medium",
          description: "",
          assignTo: "",
        });
        setQuickActionStatus(null);
        showToast(`Ticket ${ticketId} created successfully`, "success");
      }, 1500);
    }, 1500);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "text-brand-emerald bg-brand-emerald/10";
      case "Medium":
        return "text-brand-amber bg-brand-amber/10";
      case "High":
        return "text-red-500 bg-red-100";
      default:
        return "text-brand-slate bg-brand-slate/10";
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 75) return "text-brand-emerald";
    if (probability >= 50) return "text-brand-amber";
    return "text-red-500";
  };

  const activeReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".quick-actions-menu") &&
        !event.target.closest(".quick-actions-button")
      ) {
        setShowQuickActions(false);
      }
      if (
        !event.target.closest(".actions-menu") &&
        !event.target.closest(".actions-button")
      ) {
        setShowActionsMenu(null);
      }
      if (
        !event.target.closest(".activity-filter-menu") &&
        !event.target.closest(".activity-filter-button")
      ) {
        setShowActivityFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Quick Actions Button */}
      <div className="fixed bottom-6 right-6 z-40 quick-actions-menu">
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="quick-actions-button h-14 w-14 rounded-full bg-brand-blue text-white shadow-lg hover:bg-brand-blue/90 transition-all duration-300 flex items-center justify-center"
        >
          <Zap className="h-6 w-6" />
        </button>

        {/* Quick Actions Menu */}
        {showQuickActions && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-slate-200 p-2 min-w-[200px]">
            <button
              onClick={() => handleQuickAction("call")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-blue" />
              <span className="text-sm">Quick Call</span>
            </button>
            <button
              onClick={() => handleQuickAction("email")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Mail className="h-4 w-4 text-brand-blue" />
              <span className="text-sm">Quick Email</span>
            </button>
            <button
              onClick={() => handleQuickAction("note")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <FileText className="h-4 w-4 text-brand-blue" />
              <span className="text-sm">Quick Note</span>
            </button>
            <button
              onClick={() => handleQuickAction("ticket")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-brand-blue" />
              <span className="text-sm">Create Ticket</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Call Modal */}
      {showQuickCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Call</h3>
              <button
                onClick={() => setShowQuickCallModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleQuickCallSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lead Name
                </label>
                <input
                  type="text"
                  value={quickCallData.leadName}
                  onChange={(e) =>
                    setQuickCallData((prev) => ({
                      ...prev,
                      leadName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Enter lead name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={quickCallData.phoneNumber}
                  onChange={(e) =>
                    setQuickCallData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Call Notes
                </label>
                <textarea
                  rows={3}
                  value={quickCallData.notes}
                  onChange={(e) =>
                    setQuickCallData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Add notes about call"
                />
              </div>
              {quickActionStatus && (
                <div className="text-sm text-center p-2 rounded-lg bg-slate-100">
                  {quickActionStatus === "initiating" && "Initiating call..."}
                  {quickActionStatus === "completed" && "Call initiated!"}
                  {quickActionStatus === "error" && quickActionStatus}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90"
                >
                  <Phone className="h-4 w-4 inline mr-2" />
                  Call Now
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickCallModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Email Modal */}
      {showQuickEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Email</h3>
              <button
                onClick={() => setShowQuickEmailModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleQuickEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  To
                </label>
                <input
                  type="email"
                  value={quickEmailData.to}
                  onChange={(e) =>
                    setQuickEmailData((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={quickEmailData.subject}
                  onChange={(e) =>
                    setQuickEmailData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={quickEmailData.message}
                  onChange={(e) =>
                    setQuickEmailData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Email message"
                />
              </div>
              {quickActionStatus && (
                <div className="text-sm text-center p-2 rounded-lg bg-slate-100">
                  {quickActionStatus === "sending" && "Sending email..."}
                  {quickActionStatus === "sent" && "Email sent!"}
                  {quickActionStatus === "error" && quickActionStatus}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90"
                >
                  <Send className="h-4 w-4 inline mr-2" />
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickEmailModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Note Modal */}
      {showQuickNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Note</h3>
              <button
                onClick={() => setShowQuickNoteModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleQuickNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lead Name
                </label>
                <input
                  type="text"
                  value={quickNoteData.leadName}
                  onChange={(e) =>
                    setQuickNoteData((prev) => ({
                      ...prev,
                      leadName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Enter lead name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Note
                </label>
                <textarea
                  rows={4}
                  value={quickNoteData.note}
                  onChange={(e) =>
                    setQuickNoteData((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Add your note"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Assign To
                </label>
                <select
                  value={quickNoteData.assignTo}
                  onChange={(e) =>
                    setQuickNoteData((prev) => ({
                      ...prev,
                      assignTo: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              {quickActionStatus && (
                <div className="text-sm text-center p-2 rounded-lg bg-slate-100">
                  {quickActionStatus === "saving" && "Saving note..."}
                  {quickActionStatus === "saved" && "Note saved!"}
                  {quickActionStatus === "error" && quickActionStatus}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90"
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  Save Note
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickNoteModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Ticket Modal */}
      {showQuickTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create Support Ticket</h3>
              <button
                onClick={() => setShowQuickTicketModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleQuickTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lead Name
                </label>
                <input
                  type="text"
                  value={quickTicketData.leadName}
                  onChange={(e) =>
                    setQuickTicketData((prev) => ({
                      ...prev,
                      leadName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Enter lead name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Issue Type
                </label>
                <input
                  type="text"
                  value={quickTicketData.issue}
                  onChange={(e) =>
                    setQuickTicketData((prev) => ({
                      ...prev,
                      issue: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="e.g., Document verification, Payment issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Priority
                </label>
                <select
                  value={quickTicketData.priority}
                  onChange={(e) =>
                    setQuickTicketData((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={quickTicketData.description}
                  onChange={(e) =>
                    setQuickTicketData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Describe issue in detail"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Assign To
                </label>
                <select
                  value={quickTicketData.assignTo}
                  onChange={(e) =>
                    setQuickTicketData((prev) => ({
                      ...prev,
                      assignTo: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              {quickActionStatus && (
                <div className="text-sm text-center p-2 rounded-lg bg-slate-100">
                  {quickActionStatus === "creating" && "Creating ticket..."}
                  {quickActionStatus === "created" && "Ticket created!"}
                  {quickActionStatus === "error" && quickActionStatus}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90"
                >
                  <HelpCircle className="h-4 w-4 inline mr-2" />
                  Create Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickTicketModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stat Cards Section */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const isActive = activeStat.label === card.label;
          return (
            <div
              key={card.label}
              className={`group relative overflow-hidden rounded-3xl border border-white/40 bg-white/10 text-white shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${
                isActive ? "ring-2 ring-white/80" : ""
              }`}
              onClick={() => setActiveStat(card)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative p-5 space-y-3">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                  {card.label}
                </p>
                <p className="text-4xl font-semibold drop-shadow-sm">
                  {card.value}
                </p>
                <p className="text-sm text-white/80">{card.change}</p>
                <div className="h-px w-full bg-white/30 transition-colors duration-300 group-hover:bg-white/70" />
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-brand-navy shadow-inner"
                      : "bg-white/20 text-white/90 hover:bg-white/30"
                  }`}
                >
                  {isActive ? "Focused" : "Focus metric"}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {activeStat && (
        <div className="grid lg:grid-cols-[2fr,1fr] gap-4">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Focused metric
                </p>
                <h3 className="text-2xl font-semibold text-brand-navy">
                  {activeStat.label}
                </h3>
              </div>
              <span className="text-3xl font-semibold text-brand-blue">
                {activeStat.value}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">{activeStat.detail}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/5 px-4 py-2 text-xs font-semibold text-brand-blue">
              <span>Status:</span>
              <span>{activeStat.change}</span>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Quick actions
            </p>
            <div className="mt-3 space-y-3">
              <button
                onClick={handleViewReport}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-brand-blue transition hover:border-brand-blue flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                View metric report
              </button>
              <button
                onClick={handleNotifyTeam}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-navy/60 flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Notify my team
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <section className="grid xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm col-span-2 border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 px-6 py-4 gap-3">
            <div>
              <p className="text-xs uppercase text-slate-400">Lead Capture</p>
              <h2 className="text-xl font-semibold">Mobile-first form</h2>
              <p className="text-sm text-slate-500">
                Attach PAN/Aadhaar, assign to yourself, sync to CRM.
              </p>
            </div>
          </div>
          <form
            id="lead-capture-form"
            className="px-6 py-6 space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Borrower Name
                </label>
                <input
                  required
                  value={leadData.name}
                  onChange={(e) => handleLeadChange("name", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 ${
                    formErrors.name
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-200"
                  }`}
                  placeholder="e.g., Kavya Steel"
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={leadData.phone}
                  onChange={(e) => handleLeadChange("phone", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 ${
                    formErrors.phone
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-200"
                  }`}
                  placeholder="+91"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500">
                  City / Region
                </label>
                <input
                  value={leadData.city}
                  onChange={(e) => handleLeadChange("city", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 ${
                    formErrors.city
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-200"
                  }`}
                  placeholder="Mumbai"
                />
                {formErrors.city && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.city}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Loan Product
                </label>
                <select
                  value={leadData.loanType}
                  onChange={(e) => handleLeadChange("loanType", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 border-slate-200"
                >
                  {[
                    "Business Loan",
                    "Home Loan",
                    "SME Loan",
                    "Invoice Finance",
                  ].map((product) => (
                    <option key={product}>{product}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Ticket Size
                </label>
                <input
                  value={leadData.amount}
                  onChange={(e) => handleLeadChange("amount", e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 ${
                    formErrors.amount
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-200"
                  }`}
                  placeholder="₹"
                />
                {formErrors.amount && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.amount}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">
                Internal Remarks
              </label>
              <textarea
                rows={3}
                value={leadData.remarks}
                onChange={(e) => handleLeadChange("remarks", e.target.value)}
                className="mt-1 w-full rounded-2xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 border-slate-200"
                placeholder="Context for RM (no credit comments)"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <label className="flex-1 border-2 border-dashed rounded-2xl border-brand-blue/40 p-4 text-sm text-slate-500 cursor-pointer hover:border-brand-blue">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-brand-blue">
                      Tap to upload KYC
                    </p>
                    <p className="text-xs text-slate-500">
                      PAN / Aadhaar / GST (images)
                    </p>
                  </div>
                  <Upload className="h-6 w-6 text-brand-blue" />
                </div>
                {kycPreview && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden">
                      <img
                        src={kycPreview.preview}
                        alt={kycPreview.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{kycPreview.name}</p>
                      <p className="text-xs text-slate-500">Ready to sync</p>
                    </div>
                  </div>
                )}
              </label>
              <div className="bg-slate-50 rounded-2xl flex flex-col justify-between p-4 flex-1 border border-slate-100">
                <p className="text-xs font-medium text-slate-500">
                  Assign stage
                </p>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="mt-2 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 border-slate-200"
                >
                  {stageOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Creates reminder + CRM sync entry
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 rounded-2xl py-3 font-semibold shadow transition-all ${
                  isSubmitting
                    ? "bg-slate-400 text-slate-200 cursor-not-allowed"
                    : "bg-brand-blue text-white hover:bg-brand-navy"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>Save & Sync Lead</>
                )}
              </button>
              <button
                type="button"
                className="rounded-2xl border border-slate-200 px-6 py-3 text-slate-600"
                onClick={() => {
                  // Preview application functionality
                  if (!leadData.name || !leadData.phone) {
                    showToast(
                      "Please fill in required fields to preview",
                      "error"
                    );
                    return;
                  }
                  showToast("Application preview loaded", "success");
                }}
              >
                Preview Application
              </button>
            </div>
            {formStatus && (
              <div
                className={`mt-4 text-sm p-3 rounded-lg ${
                  formStatus.includes("error") || formStatus.includes("fix")
                    ? "bg-red-100 text-red-600"
                    : formStatus.includes("Processing")
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "bg-brand-emerald/10 text-brand-emerald"
                }`}
              >
                {formStatus}
              </div>
            )}
          </form>
        </div>

        <div className="space-y-6">
          {/* Reminders Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400">Reminders</p>
                <h2 className="text-lg font-semibold">Follow ups</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddReminderModal(true)}
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Add new reminder"
                >
                  <Plus className="h-4 w-4 text-brand-blue" />
                </button>
                <Clock className="h-5 w-5 text-brand-blue" />
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {activeReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`border border-slate-100 rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-all hover:shadow-md ${
                    reminder.completed ? "opacity-50 bg-slate-50" : "bg-white"
                  }`}
                  onClick={() => handleReminderClick(reminder)}
                >
                  <div
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
                      reminder.type === "call"
                        ? "bg-brand-blue/10 text-brand-blue"
                        : reminder.type === "task"
                        ? "bg-brand-amber/10 text-brand-amber"
                        : "bg-brand-purple/10 text-brand-purple"
                    }`}
                  >
                    {reminder.type === "call" && (
                      <PhoneCall className="h-5 w-5" />
                    )}
                    {reminder.type === "task" && (
                      <FileText className="h-5 w-5" />
                    )}
                    {reminder.type === "note" && (
                      <Sparkles className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        reminder.completed ? "line-through text-slate-400" : ""
                      }`}
                    >
                      {reminder.title}
                    </p>
                    <p className="text-xs text-slate-500">{reminder.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteReminder(reminder.id);
                      }}
                      className="text-xs text-brand-emerald font-semibold flex items-center gap-1 hover:bg-brand-emerald/10 px-2 py-1 rounded transition-colors"
                      title="Mark as complete"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Done
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReminder(reminder.id);
                      }}
                      className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                      title="Delete reminder"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {completedReminders.length > 0 && (
              <div className="border-t border-slate-100 pt-4 mt-4">
                <button
                  onClick={() =>
                    setReminderAction(
                      reminderAction === "completed" ? null : "completed"
                    )
                  }
                  className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  {reminderAction === "completed" ? "Hide" : "Show"} completed (
                  {completedReminders.length})
                  <span
                    className={`transition-transform ${
                      reminderAction === "completed" ? "rotate-90" : ""
                    }`}
                  >
                    →
                  </span>
                </button>

                {reminderAction === "completed" && (
                  <div className="mt-3 space-y-3">
                    {completedReminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="border border-slate-100 rounded-2xl p-4 flex gap-3 items-start opacity-60 bg-slate-50"
                      >
                        <div
                          className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
                            reminder.type === "call"
                              ? "bg-brand-blue/10 text-brand-blue"
                              : reminder.type === "task"
                              ? "bg-brand-amber/10 text-brand-amber"
                              : "bg-brand-purple/10 text-brand-purple"
                          }`}
                        >
                          {reminder.type === "call" && (
                            <PhoneCall className="h-5 w-5" />
                          )}
                          {reminder.type === "task" && (
                            <FileText className="h-5 w-5" />
                          )}
                          {reminder.type === "note" && (
                            <Sparkles className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium line-through text-slate-400">
                            {reminder.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {reminder.due}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteReminder(reminder.id)}
                          className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          title="Delete reminder"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="bg-brand-blue/10 rounded-2xl p-4 text-sm text-brand-navy mt-4">
              <p className="font-semibold">Notifications enabled</p>
              <p className="text-xs text-slate-600">
                Push + WhatsApp reminders for your leads
              </p>
            </div>
          </div>

          {/* Activity Feed Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Activity Feed
                </p>
                <h2 className="text-lg font-semibold">Recent Activities</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative activity-filter-menu">
                  <button
                    onClick={() => setShowActivityFilter(!showActivityFilter)}
                    className="activity-filter-button p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Filter activities"
                  >
                    <Filter className="h-4 w-4 text-brand-blue" />
                  </button>
                  {showActivityFilter && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                      <button
                        onClick={() => {
                          setActivityFilter("all");
                          setShowActivityFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                          activityFilter === "all"
                            ? "bg-slate-100 font-medium"
                            : ""
                        }`}
                      >
                        All Activities
                      </button>
                      <button
                        onClick={() => {
                          setActivityFilter("lead_created");
                          setShowActivityFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                          activityFilter === "lead_created"
                            ? "bg-slate-100 font-medium"
                            : ""
                        }`}
                      >
                        New Leads
                      </button>
                      <button
                        onClick={() => {
                          setActivityFilter("call_completed");
                          setShowActivityFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                          activityFilter === "call_completed"
                            ? "bg-slate-100 font-medium"
                            : ""
                        }`}
                      >
                        Calls
                      </button>
                      <button
                        onClick={() => {
                          setActivityFilter("ticket_created");
                          setShowActivityFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${
                          activityFilter === "ticket_created"
                            ? "bg-slate-100 font-medium"
                            : ""
                        }`}
                      >
                        Tickets
                      </button>
                    </div>
                  )}
                </div>
                <Activity className="h-5 w-5 text-brand-blue" />
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="border border-slate-100 rounded-2xl p-4 flex gap-3 items-start hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center ${activity.color}`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500">
                        {activity.timestamp}
                      </p>
                      <span className="text-xs text-slate-400">•</span>
                      <p className="text-xs text-slate-500">{activity.user}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Reminder</h3>
              <button
                onClick={() => setShowAddReminderModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Reminder title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={newReminder.due}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      due: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Type
                </label>
                <select
                  value={newReminder.type}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                >
                  <option value="call">Call</option>
                  <option value="task">Task</option>
                  <option value="note">Note</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={newReminder.notes}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Add notes"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90"
                >
                  Add Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReminderModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Notification Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notify Team</h3>
              <button
                onClick={() => setShowNotifyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Team Members
                </label>
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center gap-3 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTeamMembers.includes(member.id)}
                        onChange={() => handleTeamMemberToggle(member.id)}
                        className="w-4 h-4 text-brand-blue focus:ring-brand-blue/50 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Type your message here..."
                />
              </div>
              {notificationStatus && (
                <div className="text-sm text-center p-2 rounded-lg bg-slate-100">
                  {notificationStatus === "sending" && "Sending..."}
                  {notificationStatus === "sent" && "Message sent!"}
                  {notificationStatus === "error" && notificationStatus}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleSendNotification}
                  className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90"
                >
                  Send Notification
                </button>
                <button
                  onClick={() => setShowNotifyModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metric Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {activeStat.label} Report
                </h3>
                <p className="text-sm text-slate-500">
                  Detailed metrics and trends
                </p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
              <p className="text-sm text-slate-500">
                Chart visualization for {activeStat.label}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">Current Value</p>
                <p className="text-lg font-semibold">{activeStat.value}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">Target</p>
                <p className="text-lg font-semibold">{activeStat.change}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue/90">
                Export Report
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-slate-200 text-slate-700 rounded-lg py-2 font-medium hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
