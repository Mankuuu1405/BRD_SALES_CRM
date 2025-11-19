import React, { useMemo, useState } from "react";
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
    gradient: "from-brand-blue/90 via-brand-sky/80 to-brand-emerald/80",
  },
  {
    label: "Lead → Application",
    value: "46%",
    change: "Target 60%",
    detail:
      "Percentage of leads that have progressed to full application submissions in the last 7 days.",
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

  const activeFilterLabel = activeFilter
    ? quickFilterLabels[activeFilter]
    : "All leads";

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setKycPreview({ name: file.name, preview });
    }
  };

  const handleLeadChange = (field, value) => {
    setLeadData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus("Lead captured and assigned");
    setTimeout(() => setFormStatus(null), 4000);
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
    showNotification(`${reminder.title} marked as complete`, "success");
  };

  const handleDeleteReminder = (reminderId) => {
    setReminders((prev) =>
      prev.filter((reminder) => reminder.id !== reminderId)
    );
    showNotification("Reminder deleted", "info");
  };

  const handleAddReminder = () => {
    if (!newReminder.title.trim() || !newReminder.due.trim()) {
      showNotification("Please fill in all required fields", "error");
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
    showNotification("Reminder added successfully", "success");
  };

  const showNotification = (message, type = "info") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
      type === "success"
        ? "bg-green-500 text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
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
        showNotification(`Calling ${lead.name}...`, "info");
        break;
      case "email":
        window.open(`mailto:${lead.email}`);
        showNotification(`Opening email client for ${lead.name}...`, "info");
        break;
      case "assign":
        showNotification(`Lead ${lead.name} assigned to you`, "success");
        break;
      case "priority":
        showNotification(`${lead.name} marked as high priority`, "success");
        break;
      case "archive":
        showNotification(`${lead.name} archived`, "info");
        break;
      default:
        break;
    }
    setShowActionsMenu(null);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-amber-600 bg-amber-100";
      case "High":
        return "text-red-600 bg-red-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 75) return "text-green-600";
    if (probability >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const activeReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const isActive = activeStat.label === card.label;
          return (
            <div
              key={card.label}
              className={`group relative overflow-hidden rounded-3xl border border-white/40 bg-white/10 text-white shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                isActive ? "ring-2 ring-white/80" : ""
              }`}
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
                  onClick={() => setActiveStat(card)}
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
            <div className="flex gap-2 text-sm text-slate-500">
              <PhoneCall className="h-5 w-5 text-brand-blue" />
              tap to call saved contacts
            </div>
          </div>
          <form className="px-6 py-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Borrower Name
                </label>
                <input
                  required
                  value={leadData.name}
                  onChange={(e) => handleLeadChange("name", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-brand-blue focus:outline-none"
                  placeholder="e.g., Kavya Steel"
                />
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
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-brand-blue focus:outline-none"
                  placeholder="+91"
                />
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
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-brand-blue focus:outline-none"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Loan Product
                </label>
                <select
                  value={leadData.loanType}
                  onChange={(e) => handleLeadChange("loanType", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-brand-blue focus:outline-none"
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
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 focus:border-brand-blue focus:outline-none"
                  placeholder="₹"
                />
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
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2.5 focus:border-brand-blue focus:outline-none"
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
                  className="mt-2 rounded-xl border border-slate-200 px-3 py-2 focus:border-brand-blue focus:outline-none"
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
                className="flex-1 bg-brand-blue text-white rounded-2xl py-3 font-semibold shadow hover:bg-brand-navy"
              >
                Save & Sync Lead
              </button>
              <button
                type="button"
                className="rounded-2xl border border-slate-200 px-6 py-3 text-slate-600"
              >
                Preview Application
              </button>
            </div>
            {formStatus && (
              <p className="text-sm text-brand-emerald">{formStatus}</p>
            )}
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
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

          <div className="space-y-4">
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
                      ? "bg-amber-100 text-amber-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {reminder.type === "call" && (
                    <PhoneCall className="h-5 w-5" />
                  )}
                  {reminder.type === "task" && <FileText className="h-5 w-5" />}
                  {reminder.type === "note" && <Sparkles className="h-5 w-5" />}
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
                    className="text-xs text-brand-emerald font-semibold flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded transition-colors"
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
            <div className="border-t border-slate-100 pt-4">
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
                            ? "bg-amber-100 text-amber-600"
                            : "bg-purple-100 text-purple-600"
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
                        <p className="text-xs text-slate-500">{reminder.due}</p>
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

          <div className="bg-brand-blue/10 rounded-2xl p-4 text-sm text-brand-navy">
            <p className="font-semibold">Notifications enabled</p>
            <p className="text-xs text-slate-600">
              Push + WhatsApp reminders for your leads
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-xs uppercase text-slate-400">Lead spotlight</p>
            <h2 className="text-lg font-semibold text-brand-navy">
              Filtered snapshot
            </h2>
            <p className="text-sm text-slate-500">
              Showing:{" "}
              <span className="font-semibold text-brand-blue">
                {activeFilterLabel}
              </span>
            </p>
          </div>
          {!matched && activeFilter && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
              No direct matches. Displaying all leads instead.
            </span>
          )}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 rounded-xl p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSpotlightFilter("all")}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                spotlightFilter === "all"
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Leads
            </button>
            <button
              onClick={() => setSpotlightFilter("my")}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                spotlightFilter === "my"
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              My Leads
            </button>
            <button
              onClick={() => setSpotlightFilter("team")}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                spotlightFilter === "team"
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Team Leads
            </button>
            <button
              onClick={() => setSpotlightFilter("high-priority")}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                spotlightFilter === "high-priority"
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setSpotlightFilter("docs-pending")}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                spotlightFilter === "docs-pending"
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Docs Pending
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-blue focus:outline-none bg-white"
            >
              <option value="timeAgo">Recent</option>
              <option value="amount">Amount</option>
              <option value="probability">Probability</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadSpotlight.map((lead) => (
            <div
              key={lead.id}
              className="group relative rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-brand-blue/50"
              onClick={() => handleLeadClick(lead)}
            >
              {/* Lead Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-xs font-medium text-brand-blue">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">
                      {lead.name}
                    </p>
                    <p className="text-xs text-slate-500">{lead.loan}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowActionsMenu(
                        showActionsMenu === lead.id ? null : lead.id
                      );
                    }}
                    className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  {/* Actions Dropdown */}
                  {showActionsMenu === lead.id && (
                    <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10 min-w-[150px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadAction("view", lead);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Eye className="h-3 w-3" /> View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadAction("call", lead);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Phone className="h-3 w-3" /> Call
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadAction("email", lead);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Mail className="h-3 w-3" /> Email
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadAction("assign", lead);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2"
                      >
                        <User className="h-3 w-3" /> Assign to Me
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadAction("priority", lead);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Star className="h-3 w-3" /> Mark Priority
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadAction("archive", lead);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" /> Archive
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lead Status and Probability */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs rounded-full bg-brand-blue/10 text-brand-blue px-2 py-0.5">
                  {lead.stage}
                </span>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 text-slate-400" />
                  <span
                    className={`text-xs font-medium ${getProbabilityColor(
                      lead.loanProbability
                    )}`}
                  >
                    {lead.loanProbability}%
                  </span>
                </div>
              </div>

              {/* Lead Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600">
                  {lead.owner === "me" ? "My lead" : "Team"}
                </span>
                {!Object.values(lead.documents).every(Boolean) && (
                  <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    Docs pending
                  </span>
                )}
                {lead.payoutDue && (
                  <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    Payout due
                  </span>
                )}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${getRiskColor(
                    lead.riskLevel
                  )}`}
                >
                  {lead.riskLevel} risk
                </span>
              </div>

              {/* Lead Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {lead.amount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lead.timeAgo}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Score: {lead.creditScore}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {lead.expectedClosure}
                  </span>
                </div>
              </div>

              {/* Next Action */}
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-xs font-medium text-slate-700 mb-1">
                  Next Action
                </p>
                <p className="text-xs text-slate-600">{lead.nextAction}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <div className="bg-brand-blue text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Click for details
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {leadSpotlight.length >= 6 && (
          <div className="flex justify-center pt-4">
            <button className="px-4 py-2 text-sm text-brand-blue font-medium hover:bg-blue-50 rounded-lg transition-colors">
              Load More Leads
            </button>
          </div>
        )}
      </section>

      {/* Lead Details Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-semibold text-brand-navy">
                  Lead Details
                </h2>
                <p className="text-sm text-slate-500">
                  Complete lead information and history
                </p>
              </div>
              <button
                onClick={() => setShowLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Lead Header */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-brand-blue/10 flex items-center justify-center text-lg font-medium text-brand-blue">
                  {selectedLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-brand-navy">
                    {selectedLead.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedLead.businessType} • {selectedLead.industry}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs rounded-full bg-brand-blue/10 text-brand-blue px-2 py-1">
                      {selectedLead.stage}
                    </span>
                    <span
                      className={`text-xs rounded-full px-2 py-1 ${getRiskColor(
                        selectedLead.riskLevel
                      )}`}
                    >
                      {selectedLead.riskLevel} Risk
                    </span>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-slate-400" />
                      <span
                        className={`text-xs font-medium ${getProbabilityColor(
                          selectedLead.loanProbability
                        )}`}
                      >
                        {selectedLead.loanProbability}% Conversion Probability
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <p className="text-sm font-medium">
                          {selectedLead.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="text-sm font-medium">
                          {selectedLead.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Address</p>
                        <p className="text-sm font-medium">
                          {selectedLead.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700">
                    Business Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500">PAN</span>
                      <span className="text-sm font-medium">
                        {selectedLead.pan}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500">GSTIN</span>
                      <span className="text-sm font-medium">
                        {selectedLead.gstin}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500">
                        Monthly Revenue
                      </span>
                      <span className="text-sm font-medium">
                        ₹{selectedLead.monthlyRevenue.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500">
                        Credit Score
                      </span>
                      <span className="text-sm font-medium">
                        {selectedLead.creditScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700">Loan Details</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Loan Type</p>
                      <p className="text-sm font-medium">{selectedLead.loan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Amount</p>
                      <p className="text-sm font-medium">
                        {selectedLead.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Stage</p>
                      <p className="text-sm font-medium">
                        {selectedLead.stage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Expected Closure</p>
                      <p className="text-sm font-medium">
                        {selectedLead.expectedClosure}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Status */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700">Documents Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(selectedLead.documents).map(
                    ([doc, status]) => (
                      <div
                        key={doc}
                        className="text-center p-3 bg-slate-50 rounded-lg"
                      >
                        <FileCheck
                          className={`h-6 w-6 mx-auto mb-1 ${
                            status ? "text-green-500" : "text-slate-300"
                          }`}
                        />
                        <p className="text-xs font-medium capitalize">
                          {doc.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-xs text-slate-500">
                          {status ? "Uploaded" : "Pending"}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700">
                  Activity Timeline
                </h4>
                <div className="space-y-3">
                  {selectedLead.activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          activity.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {activity.type === "call" && (
                          <PhoneCall className="h-4 w-4" />
                        )}
                        {activity.type === "email" && (
                          <Mail className="h-4 w-4" />
                        )}
                        {activity.type === "meeting" && (
                          <Calendar className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLeadAction("call", selectedLead)}
                  className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </button>
                <button
                  onClick={() => handleLeadAction("email", selectedLead)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Send Email
                </button>
                <button
                  onClick={() => handleLeadAction("assign", selectedLead)}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Assign to Me
                </button>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
