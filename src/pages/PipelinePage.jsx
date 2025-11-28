import React, { useMemo, useState } from "react";
import {
  ChevronRight,
  Link2,
  ChevronDown,
  X,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Star,
  Filter,
  Search,
  Save,
} from "lucide-react";
import {
  pipelineColumns,
  applyPipelineFilter,
  quickFilterLabels,
} from "../data/pipelineData";

const crmIntegrations = [
  {
    name: "FreshSales CRM",
    status: "Synced every 15 min",
    badge: "Active",
    color: "text-brand-emerald",
    type: "auto",
    lastSync: "2024-01-15 14:30:00",
    description: "Automatic synchronization enabled",
  },
  {
    name: "LeadSquared",
    status: "Manual push available",
    badge: "On Demand",
    color: "text-brand-blue",
    type: "manual",
    lastSync: "2024-01-15 12:15:00",
    description: "Click to sync manually",
  },
  {
    name: "HubSpot Activities",
    status: "Reminders only",
    badge: "Passive",
    color: "text-brand-slate",
    type: "passive",
    lastSync: "2024-01-14 18:45:00",
    description: "Activity reminders only",
  },
];

const columnStyles = {
  New: "bg-slate-100 border-brand-blue/30",
  Contacted: "bg-slate-100 border-brand-sky/30",
  "Application Submitted": "bg-slate-100 border-brand-emerald/30",
  Approved: "bg-slate-100 border-emerald-200",
  Disbursed: "bg-slate-100 border-emerald-300",
};

// Define the stage order for moving to next stage
const stageOrder = [
  "New",
  "Contacted",
  "Application Submitted",
  "Approved",
  "Disbursed",
];

// Lead scoring criteria
const scoringCriteria = {
  loanAmount: {
    high: { min: 500000, score: 30 },
    medium: { min: 200000, score: 20 },
    low: { min: 0, score: 10 },
  },
  engagement: {
    high: { score: 25 },
    medium: { score: 15 },
    low: { score: 5 },
  },
  documentation: {
    complete: { score: 20 },
    partial: { score: 10 },
    missing: { score: 0 },
  },
  creditHistory: {
    excellent: { score: 25 },
    good: { score: 15 },
    fair: { score: 5 },
    poor: { score: 0 },
  },
};

export default function PipelinePage({ activeFilter, filterMeta }) {
  const [showAllStages, setShowAllStages] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [pipelineData, setPipelineData] = useState(pipelineColumns);
  const [crmSyncStatus, setCrmSyncStatus] = useState({});
  const [showCrmDetails, setShowCrmDetails] = useState(null);

  // New states for Add/Edit/Delete functionality
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    loan: "",
    amount: "",
    stage: "New",
    score: 0,
    engagement: "medium",
    documentation: "partial",
    creditHistory: "good",
  });

  // New state for lead scoring visibility
  const [showScoringDetails, setShowScoringDetails] = useState(false);

  // New state for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // New state for status management
  const [statusNotes, setStatusNotes] = useState({});

  const fallbackFilterMeta = useMemo(
    () => applyPipelineFilter(pipelineColumns, activeFilter),
    [activeFilter]
  );
  const effectiveFilter = filterMeta || fallbackFilterMeta;
  const { columns, matched, filteredCount } = effectiveFilter;
  const filterLabel = activeFilter
    ? quickFilterLabels[activeFilter]
    : "All leads";

  // Function to calculate lead score
  const calculateLeadScore = (lead) => {
    let score = 0;

    // Score based on loan amount
    const amount = parseInt(lead.amount.replace(/[^0-9]/g, ""));
    if (amount >= scoringCriteria.loanAmount.high.min) {
      score += scoringCriteria.loanAmount.high.score;
    } else if (amount >= scoringCriteria.loanAmount.medium.min) {
      score += scoringCriteria.loanAmount.medium.score;
    } else {
      score += scoringCriteria.loanAmount.low.score;
    }

    // Score based on engagement
    score += scoringCriteria.engagement[lead.engagement || "medium"].score;

    // Score based on documentation
    score +=
      scoringCriteria.documentation[lead.documentation || "partial"].score;

    // Score based on credit history
    score += scoringCriteria.creditHistory[lead.creditHistory || "good"].score;

    return score;
  };

  // Function to get score color based on value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  // Function to get score label
  const getScoreLabel = (score) => {
    if (score >= 80) return "Hot Lead";
    if (score >= 50) return "Warm Lead";
    return "Cold Lead";
  };

  const toggleViewAllStages = () => {
    setShowAllStages(!showAllStages);
  };

  const handleViewDetails = (lead, stage) => {
    // Calculate score if not already present
    const leadWithScore = {
      ...lead,
      score: lead.score || calculateLeadScore(lead),
      currentStage: stage,
    };
    setSelectedLead(leadWithScore);
    setShowDetailsModal(true);
  };

  const handleMoveToNextStage = (lead, currentStage) => {
    const currentStageIndex = stageOrder.indexOf(currentStage);
    if (currentStageIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentStageIndex + 1];

      // Update pipeline data
      const updatedPipelineData = pipelineData.map((column) => {
        if (column.stage === currentStage) {
          return {
            ...column,
            leads: column.leads.filter((l) => l.name !== lead.name),
          };
        } else if (column.stage === nextStage) {
          return {
            ...column,
            leads: [...column.leads, { ...lead, timeAgo: "Just now" }],
          };
        }
        return column;
      });

      setPipelineData(updatedPipelineData);

      // Show success notification
      showNotification(`${lead.name} moved to ${nextStage}`);
    }
  };

  const handleAddLead = () => {
    // Calculate score for the new lead
    const leadWithScore = {
      ...newLead,
      score: calculateLeadScore(newLead),
      timeAgo: "Just now",
    };

    // Add the new lead to the appropriate stage
    const updatedPipelineData = pipelineData.map((column) => {
      if (column.stage === newLead.stage) {
        return {
          ...column,
          leads: [...column.leads, leadWithScore],
        };
      }
      return column;
    });

    setPipelineData(updatedPipelineData);
    setShowAddLeadModal(false);

    // Reset the form
    setNewLead({
      name: "",
      phone: "",
      email: "",
      loan: "",
      amount: "",
      stage: "New",
      score: 0,
      engagement: "medium",
      documentation: "partial",
      creditHistory: "good",
    });

    showNotification(`${leadWithScore.name} added successfully`);
  };

  const handleEditLead = () => {
    // Calculate score for the updated lead
    const leadWithScore = {
      ...selectedLead,
      ...newLead,
      score: calculateLeadScore(newLead),
    };

    // Update the lead in the pipeline
    const updatedPipelineData = pipelineData.map((column) => {
      if (column.stage === selectedLead.currentStage) {
        return {
          ...column,
          leads: column.leads.map((lead) =>
            lead.name === selectedLead.name ? leadWithScore : lead
          ),
        };
      }
      return column;
    });

    setPipelineData(updatedPipelineData);
    setShowEditLeadModal(false);
    setShowDetailsModal(false);

    showNotification(`${leadWithScore.name} updated successfully`);
  };

  const handleDeleteLead = (lead, stage) => {
    // Remove the lead from the pipeline
    const updatedPipelineData = pipelineData.map((column) => {
      if (column.stage === stage) {
        return {
          ...column,
          leads: column.leads.filter((l) => l.name !== lead.name),
        };
      }
      return column;
    });

    setPipelineData(updatedPipelineData);
    setShowDetailsModal(false);

    showNotification(`${lead.name} deleted successfully`);
  };

  const handleStatusUpdate = (lead, stage, status, note) => {
    // Update the lead status with note
    const updatedLead = {
      ...lead,
      status,
      lastUpdated: new Date().toISOString(),
    };

    // Store the status note
    setStatusNotes((prev) => ({
      ...prev,
      [lead.name]: note,
    }));

    // Update the lead in the pipeline
    const updatedPipelineData = pipelineData.map((column) => {
      if (column.stage === stage) {
        return {
          ...column,
          leads: column.leads.map((l) =>
            l.name === lead.name ? updatedLead : l
          ),
        };
      }
      return column;
    });

    setPipelineData(updatedPipelineData);
    showNotification(`Status updated for ${lead.name}`);
  };

  const handleCrmSync = (integration) => {
    // Set loading state
    setCrmSyncStatus((prev) => ({ ...prev, [integration.name]: "syncing" }));

    // Simulate sync process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate

      if (success) {
        setCrmSyncStatus((prev) => ({
          ...prev,
          [integration.name]: "success",
          [`${integration.name}_lastSync`]: new Date().toLocaleString(),
        }));
        showNotification(`${integration.name} synced successfully`);

        // Update the integration's last sync time
        const updatedIntegrations = crmIntegrations.map((int) =>
          int.name === integration.name
            ? { ...int, lastSync: new Date().toLocaleString() }
            : int
        );
        crmIntegrations.splice(
          0,
          crmIntegrations.length,
          ...updatedIntegrations
        );
      } else {
        setCrmSyncStatus((prev) => ({ ...prev, [integration.name]: "error" }));
        showNotification(`${integration.name} sync failed`, "error");
      }

      // Clear status after 3 seconds
      setTimeout(() => {
        setCrmSyncStatus((prev) => ({ ...prev, [integration.name]: null }));
      }, 3000);
    }, 2000);
  };

  const handleCrmDetails = (integration) => {
    setShowCrmDetails(integration);
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
      type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`;
    notification.innerHTML = `
      ${
        type === "success"
          ? '<CheckCircle className="h-4 w-4" />'
          : '<AlertCircle className="h-4 w-4" />'
      }
      <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
    setSelectedLead(null);
  };

  const closeCrmModal = () => {
    setShowCrmDetails(null);
  };

  // Filter leads based on search query
  const filteredColumns = useMemo(() => {
    if (!searchQuery) return columns;

    return columns.map((column) => ({
      ...column,
      leads: column.leads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.loan.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  }, [columns, searchQuery]);

  // Use the updated pipeline data for rendering
  const currentColumns = showAllStages ? pipelineData : filteredColumns;

  const getSyncIcon = (integration) => {
    const status = crmSyncStatus[integration.name];
    if (status === "syncing") {
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    } else if (status === "success") {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status === "error") {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <>
      <section className="grid 2xl:grid-cols-3 gap-6">
        <div
          className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${
            showAllStages ? "col-span-3" : "col-span-2"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <p className="text-xs uppercase text-slate-400">Pipeline</p>
              <h2 className="text-lg font-semibold">Lead journey</h2>
              <p className="text-xs text-slate-500">
                Filter:{" "}
                <span className="font-semibold text-brand-blue">
                  {filterLabel}
                </span>
                <span className="text-slate-400">
                  {" "}
                  •{" "}
                  {activeFilter
                    ? matched
                      ? `${filteredCount} lead${filteredCount === 1 ? "" : "s"}`
                      : "No matches"
                    : `${filteredCount} lead${filteredCount === 1 ? "" : "s"}`}
                </span>
              </p>
              {!matched && activeFilter && (
                <p className="text-[11px] text-amber-600 mt-1">
                  No matches found. Showing complete pipeline.
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Search functionality */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>

              {/* Add lead button */}
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="text-xs bg-brand-blue text-white flex items-center gap-1 hover:bg-brand-blue/90 px-2 py-1 rounded transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Lead
              </button>

              <button
                onClick={toggleViewAllStages}
                className="text-xs text-brand-blue flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
              >
                {showAllStages ? (
                  <>
                    Compact view <ChevronDown className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    View all stages <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto px-6 pb-6">
            <div
              className={`min-w-[720px] ${
                showAllStages ? "grid-cols-5" : "grid-cols-5"
              } grid gap-4 pt-4`}
            >
              {currentColumns.map((column) => (
                <div
                  key={column.stage}
                  className={`rounded-2xl border ${
                    columnStyles[column.stage] ||
                    "bg-slate-100 border-slate-100"
                  } p-4 bg-white/80 ${showAllStages ? "min-h-[400px]" : ""}`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-brand-navy">
                      {column.stage}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {column.leads.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {column.leads.map((lead) => {
                      const score = lead.score || calculateLeadScore(lead);
                      return (
                        <div
                          key={lead.name}
                          className="bg-slate-50 rounded-2xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{lead.name}</p>
                              <p className="text-xs text-slate-500">
                                {lead.loan}
                              </p>
                              <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>{lead.amount}</span>
                                <span>{lead.timeAgo}</span>
                              </div>
                            </div>
                            {/* Lead score indicator */}
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(
                                score
                              )}`}
                            >
                              {score}
                            </div>
                          </div>
                          {showAllStages && (
                            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between gap-2">
                              <button
                                onClick={() =>
                                  handleViewDetails(lead, column.stage)
                                }
                                className="text-xs text-brand-blue font-medium hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                              >
                                <FileText className="h-3 w-3" />
                                View details
                              </button>
                              <button
                                onClick={() =>
                                  handleMoveToNextStage(lead, column.stage)
                                }
                                className="text-xs text-brand-blue font-medium hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                                disabled={column.stage === "Disbursed"}
                              >
                                <ArrowRight className="h-3 w-3" />
                                {column.stage === "Disbursed"
                                  ? "Final stage"
                                  : "Move to next"}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!showAllStages && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400">CRM sync</p>
                <h2 className="text-lg font-semibold">Connected tools</h2>
              </div>
              <Link2 className="h-5 w-5 text-brand-blue" />
            </div>
            <div className="space-y-4">
              {crmIntegrations.map((integration) => (
                <div
                  key={integration.name}
                  className="border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-xs text-slate-500">
                        {integration.status}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${integration.color}`}
                    >
                      {integration.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last sync: {integration.lastSync}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCrmSync(integration)}
                      disabled={crmSyncStatus[integration.name] === "syncing"}
                      className={`text-xs text-brand-blue font-semibold hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                        crmSyncStatus[integration.name] === "syncing"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {getSyncIcon(integration)}
                      {crmSyncStatus[integration.name] === "syncing"
                        ? "Syncing..."
                        : "Sync now"}
                    </button>
                    <button
                      onClick={() => handleCrmDetails(integration)}
                      className="text-xs text-slate-600 hover:bg-slate-50 px-2 py-1 rounded transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-brand-blue/10 p-4">
              <p className="text-sm font-medium">
                Auto sync enabled for field app
              </p>
              <p className="text-xs text-slate-600">
                Offline capture queues data securely
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Lead Details Modal */}
      {showDetailsModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-brand-navy">
                Lead Details
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Lead Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedLead.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Current Stage: {selectedLead.currentStage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lead Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-slate-700">
                    Lead Score
                  </h4>
                  <button
                    onClick={() => setShowScoringDetails(!showScoringDetails)}
                    className="text-xs text-brand-blue hover:underline"
                  >
                    {showScoringDetails ? "Hide" : "Show"} Details
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                      selectedLead.score || calculateLeadScore(selectedLead)
                    )}`}
                  >
                    {selectedLead.score || calculateLeadScore(selectedLead)} -{" "}
                    {getScoreLabel(
                      selectedLead.score || calculateLeadScore(selectedLead)
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i <
                          Math.ceil(
                            (selectedLead.score ||
                              calculateLeadScore(selectedLead)) / 20
                          )
                            ? "text-amber-400 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Scoring Details */}
                {showScoringDetails && (
                  <div className="mt-3 bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Loan Amount:</span>
                      <span className="font-medium">
                        {parseInt(selectedLead.amount.replace(/[^0-9]/g, "")) >=
                        scoringCriteria.loanAmount.high.min
                          ? `${scoringCriteria.loanAmount.high.score} pts`
                          : parseInt(
                              selectedLead.amount.replace(/[^0-9]/g, "")
                            ) >= scoringCriteria.loanAmount.medium.min
                          ? `${scoringCriteria.loanAmount.medium.score} pts`
                          : `${scoringCriteria.loanAmount.low.score} pts`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Engagement:</span>
                      <span className="font-medium">
                        {
                          scoringCriteria.engagement[
                            selectedLead.engagement || "medium"
                          ].score
                        }{" "}
                        pts
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Documentation:</span>
                      <span className="font-medium">
                        {
                          scoringCriteria.documentation[
                            selectedLead.documentation || "partial"
                          ].score
                        }{" "}
                        pts
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Credit History:</span>
                      <span className="font-medium">
                        {
                          scoringCriteria.creditHistory[
                            selectedLead.creditHistory || "good"
                          ].score
                        }{" "}
                        pts
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span>
                      {selectedLead.name.toLowerCase().replace(" ", ".")}
                      @example.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">
                  Loan Information
                </h4>
                <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Loan Type:</span>
                    <span className="font-medium">{selectedLead.loan}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Amount:</span>
                    <span className="font-medium">{selectedLead.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Last Updated:</span>
                    <span className="font-medium">{selectedLead.timeAgo}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">
                  Activity Timeline
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-brand-blue rounded-full mt-1.5"></div>
                    <div className="text-sm">
                      <p className="font-medium">Lead created</p>
                      <p className="text-slate-500 text-xs">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-brand-emerald rounded-full mt-1.5"></div>
                    <div className="text-sm">
                      <p className="font-medium">Initial contact made</p>
                      <p className="text-slate-500 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-slate-300 rounded-full mt-1.5"></div>
                    <div className="text-sm">
                      <p className="font-medium">Documents uploaded</p>
                      <p className="text-slate-500 text-xs">
                        {selectedLead.timeAgo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">
                  Status Management
                </h4>
                <div className="space-y-2">
                  <select
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    defaultValue="active"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="follow-up">Follow-up Required</option>
                    <option value="closed">Closed</option>
                  </select>
                  <textarea
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    rows={2}
                    placeholder="Add status notes..."
                    defaultValue={statusNotes[selectedLead.name] || ""}
                  ></textarea>
                  <button
                    onClick={() => {
                      const statusSelect = document.querySelector("select");
                      const notesTextarea = document.querySelector("textarea");
                      handleStatusUpdate(
                        selectedLead,
                        selectedLead.currentStage,
                        statusSelect.value,
                        notesTextarea.value
                      );
                    }}
                    className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                  >
                    Update Status
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setNewLead({
                      name: selectedLead.name,
                      phone: "+91 98765 43210",
                      email: `${selectedLead.name
                        .toLowerCase()
                        .replace(" ", ".")}@example.com`,
                      loan: selectedLead.loan,
                      amount: selectedLead.amount,
                      stage: selectedLead.currentStage,
                      score:
                        selectedLead.score || calculateLeadScore(selectedLead),
                      engagement: selectedLead.engagement || "medium",
                      documentation: selectedLead.documentation || "partial",
                      creditHistory: selectedLead.creditHistory || "good",
                    });
                    setShowEditLeadModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleMoveToNextStage(
                      selectedLead,
                      selectedLead.currentStage
                    );
                    closeModal();
                  }}
                  className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors text-sm font-medium"
                  disabled={selectedLead.currentStage === "Disbursed"}
                >
                  {selectedLead.currentStage === "Disbursed"
                    ? "Final Stage"
                    : "Move to Next Stage"}
                </button>
                <button
                  onClick={() => {
                    handleDeleteLead(selectedLead, selectedLead.currentStage);
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-brand-navy">
                Add New Lead
              </h2>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Basic Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-slate-700">
                  Basic Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newLead.name}
                      onChange={(e) =>
                        setNewLead({ ...newLead, name: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter lead name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={newLead.phone}
                      onChange={(e) =>
                        setNewLead({ ...newLead, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newLead.email}
                      onChange={(e) =>
                        setNewLead({ ...newLead, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-slate-700">
                  Loan Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Loan Type
                    </label>
                    <select
                      value={newLead.loan}
                      onChange={(e) =>
                        setNewLead({ ...newLead, loan: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="">Select loan type</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Car Loan">Car Loan</option>
                      <option value="Business Loan">Business Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Amount
                    </label>
                    <input
                      type="text"
                      value={newLead.amount}
                      onChange={(e) =>
                        setNewLead({ ...newLead, amount: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Stage
                    </label>
                    <select
                      value={newLead.stage}
                      onChange={(e) =>
                        setNewLead({ ...newLead, stage: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Application Submitted">
                        Application Submitted
                      </option>
                      <option value="Approved">Approved</option>
                      <option value="Disbursed">Disbursed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lead Scoring Criteria */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-slate-700">
                  Lead Scoring Criteria
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Engagement Level
                    </label>
                    <select
                      value={newLead.engagement}
                      onChange={(e) =>
                        setNewLead({ ...newLead, engagement: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Documentation Status
                    </label>
                    <select
                      value={newLead.documentation}
                      onChange={(e) =>
                        setNewLead({
                          ...newLead,
                          documentation: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="complete">Complete</option>
                      <option value="partial">Partial</option>
                      <option value="missing">Missing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Credit History
                    </label>
                    <select
                      value={newLead.creditHistory}
                      onChange={(e) =>
                        setNewLead({
                          ...newLead,
                          creditHistory: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLead}
                  disabled={!newLead.name || !newLead.loan || !newLead.amount}
                  className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors text-sm font-medium flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {showEditLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-brand-navy">
                Edit Lead
              </h2>
              <button
                onClick={() => setShowEditLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Basic Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-slate-700">
                  Basic Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newLead.name}
                      onChange={(e) =>
                        setNewLead({ ...newLead, name: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter lead name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={newLead.phone}
                      onChange={(e) =>
                        setNewLead({ ...newLead, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newLead.email}
                      onChange={(e) =>
                        setNewLead({ ...newLead, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-slate-700">
                  Loan Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Loan Type
                    </label>
                    <select
                      value={newLead.loan}
                      onChange={(e) =>
                        setNewLead({ ...newLead, loan: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="">Select loan type</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Car Loan">Car Loan</option>
                      <option value="Business Loan">Business Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Amount
                    </label>
                    <input
                      type="text"
                      value={newLead.amount}
                      onChange={(e) =>
                        setNewLead({ ...newLead, amount: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Stage
                    </label>
                    <select
                      value={newLead.stage}
                      onChange={(e) =>
                        setNewLead({ ...newLead, stage: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Application Submitted">
                        Application Submitted
                      </option>
                      <option value="Approved">Approved</option>
                      <option value="Disbursed">Disbursed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lead Scoring Criteria */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-slate-700">
                  Lead Scoring Criteria
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Engagement Level
                    </label>
                    <select
                      value={newLead.engagement}
                      onChange={(e) =>
                        setNewLead({ ...newLead, engagement: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Documentation Status
                    </label>
                    <select
                      value={newLead.documentation}
                      onChange={(e) =>
                        setNewLead({
                          ...newLead,
                          documentation: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="complete">Complete</option>
                      <option value="partial">Partial</option>
                      <option value="missing">Missing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Credit History
                    </label>
                    <select
                      value={newLead.creditHistory}
                      onChange={(e) =>
                        setNewLead({
                          ...newLead,
                          creditHistory: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowEditLeadModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditLead}
                  disabled={!newLead.name || !newLead.loan || !newLead.amount}
                  className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors text-sm font-medium flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRM Details Modal */}
      {showCrmDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-brand-navy">
                {showCrmDetails.name}
              </h2>
              <button
                onClick={closeCrmModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Status and Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Status:</span>
                  <span
                    className={`text-sm font-semibold ${showCrmDetails.color}`}
                  >
                    {showCrmDetails.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Sync Type:</span>
                  <span className="text-sm font-medium capitalize">
                    {showCrmDetails.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Last Sync:</span>
                  <span className="text-sm font-medium">
                    {showCrmDetails.lastSync}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-slate-600">
                  {showCrmDetails.description}
                </p>
              </div>

              {/* Sync Statistics */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">
                  Sync Statistics
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Records:</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Successfully Synced:</span>
                    <span className="font-medium text-green-600">1,230</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Failed:</span>
                    <span className="font-medium text-red-600">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sync Frequency:</span>
                    <span className="font-medium">
                      {showCrmDetails.type === "auto"
                        ? "Every 15 minutes"
                        : "Manual"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-700">
                  Configuration
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Auto-sync</span>
                    <input
                      type="checkbox"
                      checked={showCrmDetails.type === "auto"}
                      className="rounded"
                      disabled
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Error Notifications
                    </span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Daily Reports
                    </span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    handleCrmSync(showCrmDetails);
                    closeCrmModal();
                  }}
                  className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors text-sm font-medium"
                >
                  Sync Now
                </button>
                <button
                  onClick={closeCrmModal}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
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
