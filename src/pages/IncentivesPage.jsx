import React, { useState, useEffect } from "react";
import {
  CircleDollarSign,
  Download,
  TrendingUp,
  Trophy,
  Target,
  Award,
  Users,
  Star,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Eye,
  Edit,
  Plus,
  X,
} from "lucide-react";

const incentiveBreakup = [
  {
    title: "Disbursed Volume",
    value: "₹ 2.8 Cr",
    incentive: "₹ 42,000",
    progress: 70,
    target: "₹ 4 Cr",
  },
  {
    title: "Conversion Accelerator",
    value: "46% ratio",
    incentive: "₹ 18,000",
    progress: 46,
    target: "50%",
  },
  {
    title: "Speed To Submit",
    value: "38 hrs avg",
    incentive: "₹ 12,400",
    progress: 80,
    target: "30 hrs",
  },
  {
    title: "Team Performance Bonus",
    value: "Top 20%",
    incentive: "₹ 14,000",
    progress: 85,
    target: "Top 10%",
  },
];

const monthlyHistory = [
  { month: "Jan 2024", amount: "₹ 78,500", status: "Paid" },
  { month: "Feb 2024", amount: "₹ 82,300", status: "Paid" },
  { month: "Mar 2024", amount: "₹ 91,200", status: "Paid" },
  { month: "Apr 2024", amount: "₹ 86,400", status: "Pending" },
];

// Sample data for team targets
const teamTargets = [
  {
    id: 1,
    name: "Sales Team Alpha",
    target: 500,
    achieved: 420,
    percentage: 84,
    period: "Q2 2024",
  },
  {
    id: 2,
    name: "Sales Team Beta",
    target: 400,
    achieved: 380,
    percentage: 95,
    period: "Q2 2024",
  },
  {
    id: 3,
    name: "Sales Team Gamma",
    target: 350,
    achieved: 290,
    percentage: 83,
    period: "Q2 2024",
  },
  {
    id: 4,
    name: "Sales Team Delta",
    target: 450,
    achieved: 410,
    percentage: 91,
    period: "Q2 2024",
  },
];

// Sample data for individual targets
const individualTargets = [
  {
    id: 1,
    name: "Alex Johnson",
    target: 50,
    achieved: 45,
    percentage: 90,
    period: "June 2024",
  },
  {
    id: 2,
    name: "Priya Sharma",
    target: 45,
    achieved: 48,
    percentage: 107,
    period: "June 2024",
  },
  {
    id: 3,
    name: "Rahul Verma",
    target: 40,
    achieved: 35,
    percentage: 88,
    period: "June 2024",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    target: 35,
    achieved: 32,
    percentage: 91,
    period: "June 2024",
  },
];

// Sample data for performance leaderboard
const performanceLeaderboard = [
  {
    rank: 1,
    name: "Priya Sharma",
    team: "Sales Team Beta",
    leads: 48,
    conversion: 52.6,
    incentive: "₹ 95,000",
    avatar: "P",
  },
  {
    rank: 2,
    name: "Alex Johnson",
    team: "Sales Team Alpha",
    leads: 45,
    conversion: 48.9,
    incentive: "₹ 88,000",
    avatar: "A",
  },
  {
    rank: 3,
    name: "Rahul Verma",
    team: "Sales Team Gamma",
    leads: 42,
    conversion: 42.9,
    incentive: "₹ 76,000",
    avatar: "R",
  },
  {
    rank: 4,
    name: "Sneha Reddy",
    team: "Sales Team Delta",
    leads: 38,
    conversion: 29.4,
    incentive: "₹ 62,000",
    avatar: "S",
  },
  {
    rank: 5,
    name: "Michael Chen",
    team: "Sales Team Alpha",
    leads: 36,
    conversion: 45.2,
    incentive: "₹ 58,000",
    avatar: "M",
  },
];

// Sample data for achievements
const achievements = [
  {
    id: 1,
    title: "Conversion Champion",
    description: "Achieved 50%+ conversion rate for 3 consecutive months",
    icon: Trophy,
    achieved: true,
    date: "2024-05-15",
  },
  {
    id: 2,
    title: "Speed Star",
    description: "Average submission time under 30 hours",
    icon: Clock,
    achieved: true,
    date: "2024-06-01",
  },
  {
    id: 3,
    title: "Volume Master",
    description: "Disbursed ₹5 Cr in a quarter",
    icon: Target,
    achieved: false,
    progress: 80,
  },
  {
    id: 4,
    title: "Team Player",
    description: "Helped team achieve 100% target",
    icon: Users,
    achieved: true,
    date: "2024-04-20",
  },
  {
    id: 5,
    title: "Consistent Performer",
    description: "Met targets for 6 consecutive months",
    icon: Award,
    achieved: false,
    progress: 60,
  },
];

export default function IncentivesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [targetForm, setTargetForm] = useState({
    name: "",
    type: "individual",
    targetValue: "",
    period: "",
    metric: "leads",
  });
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [expandedAchievement, setExpandedAchievement] = useState(null);

  const totalIncentive = incentiveBreakup.reduce((sum, item) => {
    const amount = parseInt(item.incentive.replace(/[₹,\s]/g, ""));
    return sum + amount;
  }, 0);

  // Function to download statement
  const handleDownloadStatement = () => {
    // Create a simple CSV or text content for statement
    const statementContent = [
      ["Month", "Amount", "Status"],
      ...monthlyHistory.map((item) => [item.month, item.amount, item.status]),
      ["", "", ""],
      ["Incentive Breakup", "", ""],
      ...incentiveBreakup.map((item) => [
        item.title,
        item.incentive,
        item.value,
      ]),
      ["", "", ""],
      ["Total Incentive", `₹ ${totalIncentive.toLocaleString("en-IN")}`, ""],
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create a blob with content
    const blob = new Blob([statementContent], { type: "text/csv" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `incentive_statement_${
      new Date().toISOString().split("T")[0]
    }.csv`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up URL
    URL.revokeObjectURL(url);
  };

  // Function to handle target creation/editing
  const handleSaveTarget = () => {
    // Simulate API call to save target
    console.log("Saving target:", targetForm);
    setShowTargetModal(false);
    setTargetForm({
      name: "",
      type: "individual",
      targetValue: "",
      period: "",
      metric: "leads",
    });
    alert("Target saved successfully");
  };

  // Function to handle target deletion
  const handleDeleteTarget = (targetId) => {
    // Simulate API call to delete target
    console.log("Deleting target:", targetId);
    alert("Target deleted successfully");
  };

  // Function to calculate commission
  const calculateCommission = (achieved, target, rate = 0.02) => {
    return (achieved * rate * 100000).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Incentives</h1>
          <p className="text-sm text-slate-500">
            Track your performance and commission earnings
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
                <h3 className="font-medium mb-3">Filter Incentives</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Period
                    </label>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      <option value="current">Current Month</option>
                      <option value="last">Last Month</option>
                      <option value="quarter">Current Quarter</option>
                      <option value="year">Current Year</option>
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
            onClick={handleDownloadStatement}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2 text-sm"
          >
            <Download className="h-4 w-4" />
            Download Statement
          </button>
        </div>
      </div>

      {/* Tabs for different views */}
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
          onClick={() => setActiveTab("targets")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "targets"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Targets
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "leaderboard"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "achievements"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Achievements
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Current Month
                  </p>
                  <h2 className="text-2xl font-semibold text-brand-navy">
                    ₹ {totalIncentive.toLocaleString("en-IN")}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Calculated till today
                  </p>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-brand-emerald/10 flex items-center justify-center">
                  <CircleDollarSign className="h-8 w-8 text-brand-emerald" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-emerald">
                <TrendingUp className="h-4 w-4" />
                <span>+12% vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="mb-4">
                <p className="text-xs uppercase text-slate-400">
                  Payment History
                </p>
                <h2 className="text-lg font-semibold">Recent Statements</h2>
              </div>
              <div className="space-y-3">
                {monthlyHistory.map((item) => (
                  <div
                    key={item.month}
                    className="flex items-center justify-between border border-slate-100 rounded-xl p-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.month}</p>
                      <p className="text-xs text-slate-500">{item.status}</p>
                    </div>
                    <p className="font-semibold text-brand-blue">
                      {item.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase text-slate-400">Incentives</p>
                <h2 className="text-lg font-semibold">Commission statement</h2>
              </div>
              <CircleDollarSign className="h-5 w-5 text-brand-blue" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {incentiveBreakup.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.value}</p>
                    </div>
                    <p className="text-brand-blue font-semibold">
                      {item.incentive}
                    </p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-emerald"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>Progress: {item.progress}%</span>
                    <span>Target: {item.target}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-brand-emerald/10 p-4 text-sm">
              <p className="font-semibold text-brand-emerald">
                Incentive dashboard enabled
              </p>
              <p className="text-xs text-slate-600">
                Field payouts refresh every 4 hours.
              </p>
            </div>
          </section>
        </>
      )}

      {/* Targets Tab */}
      {activeTab === "targets" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase text-slate-400">Targets</p>
              <h2 className="text-lg font-semibold">
                Individual & Team Targets
              </h2>
            </div>
            <button
              onClick={() => setShowTargetModal(true)}
              className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Target
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSelectedTarget("individual")}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedTarget === "individual"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Individual Targets
              </button>
              <button
                onClick={() => setSelectedTarget("team")}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedTarget === "team"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Team Targets
              </button>
            </div>

            {selectedTarget === "individual" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Name
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Target
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Achieved
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Progress
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Commission
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {individualTargets.map((target) => (
                      <tr key={target.id} className="border-b border-slate-100">
                        <td className="p-3 font-medium">{target.name}</td>
                        <td className="p-3">{target.target}</td>
                        <td className="p-3">{target.achieved}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-20 bg-slate-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  target.percentage >= 100
                                    ? "bg-green-500"
                                    : target.percentage >= 80
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${Math.min(target.percentage, 100)}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs">
                              {target.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          {calculateCommission(target.achieved, target.target)}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button className="p-1 rounded hover:bg-slate-100">
                              <Eye className="h-4 w-4 text-blue-500" />
                            </button>
                            <button className="p-1 rounded hover:bg-slate-100">
                              <Edit className="h-4 w-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => handleDeleteTarget(target.id)}
                              className="p-1 rounded hover:bg-slate-100"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTarget === "team" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Team Name
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Target
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Achieved
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Progress
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Period
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamTargets.map((target) => (
                      <tr key={target.id} className="border-b border-slate-100">
                        <td className="p-3 font-medium">{target.name}</td>
                        <td className="p-3">{target.target}</td>
                        <td className="p-3">{target.achieved}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-20 bg-slate-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  target.percentage >= 100
                                    ? "bg-green-500"
                                    : target.percentage >= 80
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${Math.min(target.percentage, 100)}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs">
                              {target.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">{target.period}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button className="p-1 rounded hover:bg-slate-100">
                              <Eye className="h-4 w-4 text-blue-500" />
                            </button>
                            <button className="p-1 rounded hover:bg-slate-100">
                              <Edit className="h-4 w-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => handleDeleteTarget(target.id)}
                              className="p-1 rounded hover:bg-slate-100"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 p-4">
              <h3 className="font-medium mb-3">Target Achievement Rate</h3>
              <div className="h-40 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-200"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-brand-blue border-t-transparent border-r-transparent transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-xs text-slate-500">Average</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <h3 className="font-medium mb-3">Commission Distribution</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Base Commission</span>
                  <span className="font-medium">₹ 45,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Performance Bonus</span>
                  <span className="font-medium">₹ 18,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Team Bonus</span>
                  <span className="font-medium">₹ 12,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Special Incentives</span>
                  <span className="font-medium">₹ 8,000</span>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-medium">Total Commission</span>
                  <span className="font-bold text-brand-blue">₹ 83,000</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase text-slate-400">Performance</p>
              <h2 className="text-lg font-semibold">Performance Leaderboard</h2>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-slate-300 rounded-md text-sm">
                <option>Current Month</option>
                <option>Last Month</option>
                <option>Current Quarter</option>
                <option>Current Year</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Rank
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Name
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Team
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Leads
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Conversion
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Incentive
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-slate-700">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {performanceLeaderboard.map((member) => (
                  <tr key={member.rank} className="border-b border-slate-100">
                    <td className="p-3">
                      <div className="flex items-center">
                        {member.rank <= 3 ? (
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                              member.rank === 1
                                ? "bg-yellow-500"
                                : member.rank === 2
                                ? "bg-gray-400"
                                : "bg-orange-600"
                            }`}
                          >
                            {member.rank}
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                            {member.rank}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center mr-2">
                          <span className="text-sm font-medium text-brand-blue">
                            {member.avatar}
                          </span>
                        </div>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-3">{member.team}</td>
                    <td className="p-3">{member.leads}</td>
                    <td className="p-3">{member.conversion}%</td>
                    <td className="p-3 font-medium text-brand-blue">
                      {member.incentive}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-emerald"
                            style={{ width: `${(member.leads / 50) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">
                          {Math.round((member.leads / 50) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-100 p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-medium">Top Performer</p>
              <p className="text-2xl font-bold text-brand-blue">Priya Sharma</p>
              <p className="text-sm text-slate-500">
                48 leads, 52.6% conversion
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4 text-center">
              <Target className="h-8 w-8 text-brand-emerald mx-auto mb-2" />
              <p className="font-medium">Highest Conversion</p>
              <p className="text-2xl font-bold text-brand-blue">52.6%</p>
              <p className="text-sm text-slate-500">Priya Sharma</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4 text-center">
              <CircleDollarSign className="h-8 w-8 text-brand-blue mx-auto mb-2" />
              <p className="font-medium">Highest Incentive</p>
              <p className="text-2xl font-bold text-brand-blue">₹ 95,000</p>
              <p className="text-sm text-slate-500">Priya Sharma</p>
            </div>
          </div>
        </section>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase text-slate-400">Recognition</p>
              <h2 className="text-lg font-semibold">Achievement Recognition</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Achievements:</span>
              <span className="px-2 py-1 bg-brand-blue text-white rounded-full text-sm font-medium">
                {achievements.filter((a) => a.achieved).length}/
                {achievements.length}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                    achievement.achieved
                      ? "border-brand-emerald bg-brand-emerald/5"
                      : "border-slate-200 bg-slate-50"
                  }`}
                  onClick={() =>
                    setExpandedAchievement(
                      expandedAchievement === achievement.id
                        ? null
                        : achievement.id
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          achievement.achieved
                            ? "bg-brand-emerald text-white"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {achievement.achieved ? (
                        <CheckCircle className="h-5 w-5 text-brand-emerald" />
                      ) : (
                        <Clock className="h-5 w-5 text-slate-400" />
                      )}
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          expandedAchievement === achievement.id
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </div>

                  {expandedAchievement === achievement.id && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      {achievement.achieved ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Achieved on
                          </span>
                          <span className="text-sm font-medium">
                            {achievement.date}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">
                              Progress
                            </span>
                            <span className="text-sm font-medium">
                              {achievement.progress}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200">
                            <div
                              className="h-2 rounded-full bg-brand-emerald"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-brand-blue/10 p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-brand-blue" />
              <div>
                <p className="font-medium text-brand-blue">Next Milestone</p>
                <p className="text-sm text-slate-600">
                  Complete 2 more achievements to unlock the "Master Performer"
                  badge
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Target Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Target</h3>
              <button
                onClick={() => setShowTargetModal(false)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Target Name
                </label>
                <input
                  type="text"
                  value={targetForm.name}
                  onChange={(e) =>
                    setTargetForm({ ...targetForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter target name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Target Type
                </label>
                <select
                  value={targetForm.type}
                  onChange={(e) =>
                    setTargetForm({ ...targetForm, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="individual">Individual</option>
                  <option value="team">Team</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    value={targetForm.targetValue}
                    onChange={(e) =>
                      setTargetForm({
                        ...targetForm,
                        targetValue: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Enter target value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Period
                  </label>
                  <input
                    type="text"
                    value={targetForm.period}
                    onChange={(e) =>
                      setTargetForm({ ...targetForm, period: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="e.g., June 2024"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Metric
                </label>
                <select
                  value={targetForm.metric}
                  onChange={(e) =>
                    setTargetForm({ ...targetForm, metric: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="leads">Leads</option>
                  <option value="conversion">Conversion Rate</option>
                  <option value="disbursement">Disbursement</option>
                  <option value="applications">Applications</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveTarget}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Save Target
                </button>
                <button
                  onClick={() => setShowTargetModal(false)}
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
