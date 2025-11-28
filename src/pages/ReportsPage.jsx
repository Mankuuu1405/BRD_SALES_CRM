import React, { useState, useMemo, useEffect } from "react";
import {
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  ChevronDown,
  Plus,
  Settings,
  FileText,
  Users,
  Target,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  Eye,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  Play,
} from "lucide-react";

const conversionTrend = [
  { label: "Mon", value: 38 },
  { label: "Tue", value: 34 },
  { label: "Wed", value: 42 },
  { label: "Thu", value: 49 },
  { label: "Fri", value: 52 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 46 },
];

const kpiReports = [
  {
    title: "Lead-to-Application Conversion",
    value: "46%",
    target: "60%",
    trend: "+3% vs last week",
    gradient: "from-brand-blue/90 via-brand-sky/80 to-brand-emerald/80",
  },
  {
    title: "Average Time to Submit",
    value: "38 hrs",
    target: "30 hrs",
    trend: "↓ 6 hrs improvement",
    gradient: "from-brand-emerald/90 via-brand-sky/70 to-brand-blue/90",
  },
  {
    title: "Win Rate",
    value: "72%",
    target: "75%",
    trend: "+2% vs last month",
    gradient: "from-brand-navy via-brand-blue to-brand-slate",
  },
];

// Sample data for performance metrics
const weeklyData = [
  { week: "Week 1", leads: 120, applications: 55, disbursed: 3.8 },
  { week: "Week 2", leads: 135, applications: 62, disbursed: 4.1 },
  { week: "Week 3", leads: 142, applications: 65, disbursed: 4.2 },
  { week: "Week 4", leads: 128, applications: 58, disbursed: 3.9 },
];

// Sample data for team performance
const teamPerformance = [
  { name: "Alex Johnson", leads: 45, applications: 22, conversion: 48.9 },
  { name: "Priya Sharma", leads: 38, applications: 20, conversion: 52.6 },
  { name: "Rahul Verma", leads: 42, applications: 18, conversion: 42.9 },
  { name: "Sneha Reddy", leads: 17, applications: 5, conversion: 29.4 },
];

// Sample data for sales forecasting
const salesForecasting = [
  { month: "Jan", actual: 120, forecast: 115, confidence: 85 },
  { month: "Feb", actual: 135, forecast: 130, confidence: 82 },
  { month: "Mar", actual: 142, forecast: 145, confidence: 78 },
  { month: "Apr", actual: 128, forecast: 135, confidence: 75 },
  { month: "May", actual: 145, forecast: 150, confidence: 80 },
  { month: "Jun", forecast: 155, confidence: 82 },
  { month: "Jul", forecast: 160, confidence: 78 },
  { month: "Aug", forecast: 165, confidence: 75 },
];

// Sample data for trend analysis
const trendAnalysis = [
  { period: "Q1 2023", leads: 380, applications: 180, disbursed: 12.5 },
  { period: "Q2 2023", leads: 425, applications: 195, disbursed: 14.2 },
  { period: "Q3 2023", leads: 410, applications: 188, disbursed: 13.8 },
  { period: "Q4 2023", leads: 465, applications: 215, disbursed: 16.1 },
  { period: "Q1 2024", leads: 525, applications: 240, disbursed: 18.0 },
];

// Sample data for data export options
const exportOptions = [
  {
    id: 1,
    name: "CSV",
    description: "Comma-separated values for spreadsheet applications",
  },
  {
    id: 2,
    name: "Excel",
    description: "Microsoft Excel format with formatting",
  },
  { id: 3, name: "PDF", description: "Portable document format for sharing" },
  { id: 4, name: "JSON", description: "Structured data format for developers" },
];

// Initial sample data for custom reports
const initialCustomReports = [
  {
    id: 1,
    name: "Monthly Performance Summary",
    description: "Comprehensive overview of monthly performance metrics",
    type: "Performance",
    frequency: "Monthly",
    lastRun: "2024-06-01",
    status: "Active",
  },
  {
    id: 2,
    name: "Lead Source Analysis",
    description: "Analysis of lead sources and their conversion rates",
    type: "Analytics",
    frequency: "Weekly",
    lastRun: "2024-06-05",
    status: "Active",
  },
  {
    id: 3,
    name: "Team Productivity Report",
    description: "Individual team member performance comparison",
    type: "Team",
    frequency: "Bi-weekly",
    lastRun: "2024-06-03",
    status: "Active",
  },
];

export default function ReportsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [activeTab, setActiveTab] = useState("overview");

  // New states for missing features
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [customReportForm, setCustomReportForm] = useState({
    name: "",
    description: "",
    type: "Performance",
    frequency: "Monthly",
    metrics: ["leads", "applications", "conversion"],
    filters: {},
  });
  const [selectedExportFormat, setSelectedExportFormat] = useState("CSV");
  const [selectedDataRange, setSelectedDataRange] = useState("last_month");

  // Fixed: Made customReports a state variable
  const [customReports, setCustomReports] = useState(initialCustomReports);

  const conversionAverage = useMemo(() => {
    const total = conversionTrend.reduce((sum, item) => sum + item.value, 0);
    return Math.round(total / conversionTrend.length);
  }, []);

  // Function to refresh data
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Function to export data
  const handleExport = () => {
    setShowExportModal(true);
  };

  // Function to confirm export
  const handleConfirmExport = () => {
    // Simulate data export
    alert(`Exporting data as ${selectedExportFormat} for ${selectedDataRange}`);
    setShowExportModal(false);
  };

  // Function to filter data
  const handleFilter = (filters) => {
    // Apply filters to data
    console.log("Applying filters:", filters);
    setShowFilterModal(false);
  };

  // Function to view KPI details
  const handleKpiClick = (kpi) => {
    setSelectedKpi(kpi);
  };

  // Function to create custom report
  const handleCreateCustomReport = () => {
    // Simulate API call to create report
    const newReport = {
      id: Date.now(),
      name: customReportForm.name,
      description: customReportForm.description,
      type: customReportForm.type,
      frequency: customReportForm.frequency,
      lastRun: new Date().toISOString().split("T")[0],
      status: "Active",
    };

    // Fixed: Use proper state update
    setCustomReports([...customReports, newReport]);
    setShowCustomReportModal(false);
    setCustomReportForm({
      name: "",
      description: "",
      type: "Performance",
      frequency: "Monthly",
      metrics: ["leads", "applications", "conversion"],
      filters: {},
    });

    alert(`Custom report "${newReport.name}" created successfully`);
  };

  // Function to run custom report
  const handleRunReport = (reportId) => {
    const report = customReports.find((r) => r.id === reportId);
    if (report) {
      alert(`Running report: ${report.name}`);
      // Update last run date - Fixed: Use proper state update
      setCustomReports(
        customReports.map((r) =>
          r.id === reportId
            ? { ...r, lastRun: new Date().toISOString().split("T")[0] }
            : r
        )
      );
    }
  };

  // Function to delete custom report
  const handleDeleteReport = (reportId) => {
    const report = customReports.find((r) => r.id === reportId);
    if (report) {
      const reportName = report.name;
      // Fixed: Use proper state update
      setCustomReports(customReports.filter((r) => r.id !== reportId));
      alert(`Report "${reportName}" deleted successfully`);
    }
  };

  // Calculate weekly totals
  const weeklyTotals = useMemo(() => {
    const currentWeek = weeklyData[weeklyData.length - 1];
    return {
      leads: currentWeek.leads,
      applications: currentWeek.applications,
      disbursed: currentWeek.disbursed,
    };
  }, []);

  return (
    <>
      {/* Header with actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500">
            Monitor your sales performance and metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowFilterModal(!showFilterModal)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            {showFilterModal && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-10 p-4">
                <h3 className="font-medium mb-3">Filter Reports</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Time Range
                    </label>
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="year">Last Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Team Member
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm">
                      <option value="all">All Team Members</option>
                      <option value="alex">Alex Johnson</option>
                      <option value="priya">Priya Sharma</option>
                      <option value="rahul">Rahul Verma</option>
                      <option value="sneha">Sneha Reddy</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() =>
                        handleFilter({ timeRange: selectedTimeRange })
                      }
                      className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => setShowFilterModal(false)}
                      className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 bg-white border border-slate-200 rounded-lg ${
              isRefreshing ? "animate-spin" : ""
            }`}
            disabled={isRefreshing}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2 text-sm"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs for different report views */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "overview"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "team"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Team Performance
        </button>
        <button
          onClick={() => setActiveTab("conversion")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "conversion"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Conversion Analysis
        </button>
        <button
          onClick={() => setActiveTab("forecasting")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "forecasting"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Sales Forecasting
        </button>
        <button
          onClick={() => setActiveTab("trends")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "trends"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Trend Analysis
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "custom"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Custom Reports
        </button>
      </div>

      {/* KPI Cards - now clickable */}
      <section className="grid md:grid-cols-3 gap-4 mb-6">
        {kpiReports.map((kpi) => (
          <div
            key={kpi.title}
            className={`rounded-2xl p-6 text-white shadow-sm bg-gradient-to-br ${kpi.gradient} cursor-pointer transition-transform hover:scale-105`}
            onClick={() => handleKpiClick(kpi)}
          >
            <p className="text-sm font-medium text-white/90">{kpi.title}</p>
            <p className="text-4xl font-semibold mt-2">{kpi.value}</p>
            <p className="text-sm text-white/80 mt-1">Target: {kpi.target}</p>
            <p className="text-xs text-white/70 mt-2">{kpi.trend}</p>
          </div>
        ))}
      </section>

      {/* KPI Detail Modal */}
      {selectedKpi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedKpi.title}</h3>
              <button
                onClick={() => setSelectedKpi(null)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Current Value</span>
                <span className="font-semibold">{selectedKpi.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Target</span>
                <span className="font-semibold">{selectedKpi.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Trend</span>
                <span className="font-semibold">{selectedKpi.trend}</span>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-medium mb-2">Historical Data</h4>
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-slate-500">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Export Data</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Export Format
                </label>
                <div className="space-y-2">
                  {exportOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="exportFormat"
                        value={option.name}
                        checked={selectedExportFormat === option.name}
                        onChange={(e) =>
                          setSelectedExportFormat(e.target.value)
                        }
                        className="mr-2"
                      />
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-xs text-slate-500">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Data Range
                </label>
                <select
                  value={selectedDataRange}
                  onChange={(e) => setSelectedDataRange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="last_week">Last Week</option>
                  <option value="last_month">Last Month</option>
                  <option value="last_quarter">Last Quarter</option>
                  <option value="last_year">Last Year</option>
                  <option value="all">All Data</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleConfirmExport}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Export
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "overview" && (
        <section className="grid xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Lead → Application
                </p>
                <h2 className="text-lg font-semibold">Conversion trend</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-brand-blue">
                  {conversionAverage}%
                </p>
                <p className="text-xs text-slate-500">7-day average</p>
              </div>
            </div>
            <div className="flex items-end gap-3 mt-6">
              {conversionTrend.map((item) => (
                <div key={item.label} className="flex-1 text-center">
                  <div
                    className="mx-auto w-full rounded-full bg-brand-blue/20"
                    style={{ height: "140px" }}
                  >
                    <div
                      className="w-full rounded-full bg-brand-blue"
                      style={{ height: `${item.value}%`, minHeight: "10%" }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="mb-4">
              <p className="text-xs uppercase text-slate-400">
                Performance Summary
              </p>
              <h2 className="text-lg font-semibold">Weekly Overview</h2>
            </div>
            <div className="space-y-4">
              <div className="border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Total Leads Captured</p>
                    <p className="text-xs text-slate-500">This week</p>
                  </div>
                  <p className="text-2xl font-semibold text-brand-blue">
                    {weeklyTotals.leads}
                  </p>
                </div>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Applications Submitted</p>
                    <p className="text-xs text-slate-500">This week</p>
                  </div>
                  <p className="text-2xl font-semibold text-brand-emerald">
                    {weeklyTotals.applications}
                  </p>
                </div>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Disbursed Amount</p>
                    <p className="text-xs text-slate-500">This week</p>
                  </div>
                  <p className="text-2xl font-semibold text-brand-sky">
                    ₹ {weeklyTotals.disbursed} Cr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "team" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-4">
            <p className="text-xs uppercase text-slate-400">Team Performance</p>
            <h2 className="text-lg font-semibold">Individual Metrics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Team Member
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Leads
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Applications
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Conversion Rate
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((member, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="p-3 font-medium">{member.name}</td>
                    <td className="p-3">{member.leads}</td>
                    <td className="p-3">{member.applications}</td>
                    <td className="p-3">{member.conversion}%</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-20 bg-slate-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              member.conversion >= 50
                                ? "bg-green-500"
                                : member.conversion >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${member.conversion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">
                          {member.conversion >= 50
                            ? "Excellent"
                            : member.conversion >= 40
                            ? "Good"
                            : "Needs Improvement"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "conversion" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-slate-400">
                Conversion Analysis
              </p>
              <h2 className="text-lg font-semibold">
                Weekly Conversion Trends
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartType("bar")}
                className={`p-2 rounded ${
                  chartType === "bar"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setChartType("pie")}
                className={`p-2 rounded ${
                  chartType === "pie"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100"
                }`}
              >
                <PieChart className="h-4 w-4" />
              </button>
              <button
                onClick={() => setChartType("line")}
                className={`p-2 rounded ${
                  chartType === "line"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100"
                }`}
              >
                <Activity className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-sm text-slate-500">
              {chartType === "bar" && "Bar chart visualization would go here"}
              {chartType === "pie" && "Pie chart visualization would go here"}
              {chartType === "line" && "Line chart visualization would go here"}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {weeklyData.map((week, index) => (
              <div
                key={index}
                className="border border-slate-100 rounded-lg p-3"
              >
                <p className="text-sm font-medium">{week.week}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Leads:</span>
                    <span>{week.leads}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Apps:</span>
                    <span>{week.applications}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Conv:</span>
                    <span>
                      {Math.round((week.applications / week.leads) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "forecasting" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-4">
            <p className="text-xs uppercase text-slate-400">
              Sales Forecasting
            </p>
            <h2 className="text-lg font-semibold">Sales Projection Analysis</h2>
          </div>
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Current Quarter
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-semibold">₹14.2 Cr</p>
                <p className="text-xs text-slate-500 mt-1">
                  Projected disbursement
                </p>
              </div>
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Next Quarter</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-semibold">₹16.5 Cr</p>
                <p className="text-xs text-slate-500 mt-1">
                  Projected disbursement
                </p>
              </div>
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Confidence Level
                  </span>
                  <Target className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-2xl font-semibold">82%</p>
                <p className="text-xs text-slate-500 mt-1">
                  Average confidence
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Month
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Actual Leads
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Forecasted Leads
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Confidence
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesForecasting.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="p-3 font-medium">{item.month}</td>
                    <td className="p-3">{item.actual || "-"}</td>
                    <td className="p-3">{item.forecast}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.confidence >= 80
                                ? "bg-green-500"
                                : item.confidence >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {item.actual ? (
                        <div className="flex items-center">
                          {Math.abs(
                            ((item.actual - item.forecast) / item.actual) * 100
                          ) < 10 ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                          )}
                          <span className="text-xs">
                            {Math.abs(
                              ((item.actual - item.forecast) / item.actual) *
                                100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-sm text-slate-500">
              Sales forecasting chart visualization would go here
            </p>
          </div>
        </section>
      )}

      {activeTab === "trends" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-4">
            <p className="text-xs uppercase text-slate-400">Trend Analysis</p>
            <h2 className="text-lg font-semibold">
              Quarterly Performance Trends
            </h2>
          </div>
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Lead Growth</span>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-semibold">+38%</p>
                <p className="text-xs text-slate-500 mt-1">Year over year</p>
              </div>
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Conversion Rate
                  </span>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-semibold">+5%</p>
                <p className="text-xs text-slate-500 mt-1">Year over year</p>
              </div>
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Disbursement</span>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-semibold">+44%</p>
                <p className="text-xs text-slate-500 mt-1">Year over year</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Period
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Leads
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Applications
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Disbursed (Cr)
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Conversion Rate
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {trendAnalysis.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="p-3 font-medium">{item.period}</td>
                    <td className="p-3">{item.leads}</td>
                    <td className="p-3">{item.applications}</td>
                    <td className="p-3">{item.disbursed}</td>
                    <td className="p-3">
                      {Math.round((item.applications / item.leads) * 100)}%
                    </td>
                    <td className="p-3">
                      {index > 0 ? (
                        <div className="flex items-center">
                          {item.leads > trendAnalysis[index - 1].leads ? (
                            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className="text-xs">
                            {Math.abs(
                              ((item.leads - trendAnalysis[index - 1].leads) /
                                trendAnalysis[index - 1].leads) *
                                100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-sm text-slate-500">
              Trend analysis chart visualization would go here
            </p>
          </div>
        </section>
      )}

      {activeTab === "custom" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase text-slate-400">Custom Reports</p>
              <h2 className="text-lg font-semibold">
                Report Builder & Management
              </h2>
            </div>
            <button
              onClick={() => setShowCustomReportModal(true)}
              className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              Create Report
            </button>
          </div>

          {/* Added a message when there are no reports */}
          {customReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                No custom reports yet
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Create your first custom report to get started
              </p>
              <button
                onClick={() => setShowCustomReportModal(true)}
                className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2 text-sm mx-auto"
              >
                <Plus className="h-4 w-4" />
                Create Your First Report
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 text-sm font-medium text-slate-700">
                      Report Name
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">
                      Type
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">
                      Frequency
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">
                      Last Run
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
                  {customReports.map((report) => (
                    <tr key={report.id} className="border-b border-slate-100">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-slate-500">
                            {report.description}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">{report.type}</td>
                      <td className="p-3">{report.frequency}</td>
                      <td className="p-3">{report.lastRun}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRunReport(report.id)}
                            className="p-1 rounded hover:bg-slate-100"
                            title="Run Report"
                          >
                            <Play className="h-4 w-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => setSelectedReport(report)}
                            className="p-1 rounded hover:bg-slate-100"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedReport(report);
                              setCustomReportForm({
                                name: report.name,
                                description: report.description,
                                type: report.type,
                                frequency: report.frequency,
                                metrics: [
                                  "leads",
                                  "applications",
                                  "conversion",
                                ],
                                filters: {},
                              });
                              setShowCustomReportModal(true);
                            }}
                            className="p-1 rounded hover:bg-slate-100"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-1 rounded hover:bg-slate-100"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Custom Report Modal */}
      {showCustomReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {selectedReport ? "Edit Custom Report" : "Create Custom Report"}
              </h3>
              <button
                onClick={() => {
                  setShowCustomReportModal(false);
                  setSelectedReport(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={customReportForm.name}
                    onChange={(e) =>
                      setCustomReportForm({
                        ...customReportForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter report name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Report Type
                  </label>
                  <select
                    value={customReportForm.type}
                    onChange={(e) =>
                      setCustomReportForm({
                        ...customReportForm,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="Performance">Performance</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Team">Team</option>
                    <option value="Conversion">Conversion</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={customReportForm.description}
                  onChange={(e) =>
                    setCustomReportForm({
                      ...customReportForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  rows={3}
                  placeholder="Enter report description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={customReportForm.frequency}
                    onChange={(e) =>
                      setCustomReportForm({
                        ...customReportForm,
                        frequency: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Recipients
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter email addresses"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Metrics to Include
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "leads", label: "Leads" },
                    { id: "applications", label: "Applications" },
                    { id: "conversion", label: "Conversion Rate" },
                    { id: "disbursement", label: "Disbursement" },
                    { id: "team", label: "Team Performance" },
                    { id: "sources", label: "Lead Sources" },
                  ].map((metric) => (
                    <label
                      key={metric.id}
                      className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={customReportForm.metrics.includes(metric.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCustomReportForm({
                              ...customReportForm,
                              metrics: [...customReportForm.metrics, metric.id],
                            });
                          } else {
                            setCustomReportForm({
                              ...customReportForm,
                              metrics: customReportForm.metrics.filter(
                                (m) => m !== metric.id
                              ),
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{metric.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCreateCustomReport}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  {selectedReport ? "Update Report" : "Create Report"}
                </button>
                <button
                  onClick={() => {
                    setShowCustomReportModal(false);
                    setSelectedReport(null);
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
    </>
  );
}
