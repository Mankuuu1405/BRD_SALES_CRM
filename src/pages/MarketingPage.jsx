import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  PhoneCall,
  Phone,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Calendar,
  Filter,
  Download,
  Eye,
  MousePointer,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function MarketingPage() {
  const campaignTypes = [
    { key: "email", label: "Email Campaigns", icon: Mail },
    { key: "whatsapp", label: "WhatsApp/SMS Campaign", icon: MessageSquare },
    { key: "voice", label: "Voice Call Campaign", icon: PhoneCall },
    { key: "telephony", label: "Telephony Campaign", icon: Phone },
    { key: "social", label: "Social Media Marketing", icon: Users },
  ];

  const [campaigns, setCampaigns] = useState({
    email: [],
    whatsapp: [],
    voice: [],
    telephony: [],
    social: [],
  });
  const [selectedCampaignType, setSelectedCampaignType] = useState("email");
  const [campaignAction, setCampaignAction] = useState("detail"); // detail | add | edit | delete
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignForm, setCampaignForm] = useState({});
  const [showCampaignDetail, setShowCampaignDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("analytics"); // analytics | campaigns

  // Lead generation metrics
  const [leadMetrics, setLeadMetrics] = useState({
    totalLeads: 1248,
    newLeadsThisMonth: 342,
    conversionRate: 18.5,
    costPerLead: 42.3,
    leadSources: [
      {
        name: "Email",
        value: 38,
        color: "bg-blue-500",
        leads: 474,
        cost: 1200,
      },
      {
        name: "Social Media",
        value: 27,
        color: "bg-purple-500",
        leads: 337,
        cost: 1800,
      },
      {
        name: "Website",
        value: 22,
        color: "bg-green-500",
        leads: 275,
        cost: 900,
      },
      {
        name: "Referrals",
        value: 8,
        color: "bg-yellow-500",
        leads: 100,
        cost: 300,
      },
      { name: "Other", value: 5, color: "bg-gray-500", leads: 62, cost: 400 },
    ],
    monthlyTrend: [
      { month: "Jan", leads: 210, cost: 5400 },
      { month: "Feb", leads: 280, cost: 6200 },
      { month: "Mar", leads: 320, cost: 7100 },
      { month: "Apr", leads: 290, cost: 6800 },
      { month: "May", leads: 342, cost: 7600 },
      { month: "Jun", leads: 380, cost: 8200 },
    ],
    channelPerformance: [
      { channel: "Email", leads: 474, conversion: 22.3, roi: 3.2, trend: "up" },
      {
        channel: "Social Media",
        leads: 337,
        conversion: 15.7,
        roi: 2.1,
        trend: "up",
      },
      {
        channel: "Website",
        leads: 275,
        conversion: 18.9,
        roi: 4.5,
        trend: "down",
      },
      {
        channel: "Referrals",
        leads: 100,
        conversion: 32.1,
        roi: 6.8,
        trend: "up",
      },
      {
        channel: "Paid Ads",
        leads: 62,
        conversion: 8.5,
        roi: 1.8,
        trend: "down",
      },
    ],
    campaignPerformance: [
      {
        name: "Summer Loan Offer",
        type: "email",
        status: "active",
        sent: 2500,
        opened: 1250,
        clicked: 375,
        converted: 68,
        startDate: "2024-06-01",
        budget: 1500,
        spent: 1200,
      },
      {
        name: "Festive Season Campaign",
        type: "social",
        status: "active",
        sent: 3200,
        opened: 1920,
        clicked: 480,
        converted: 95,
        startDate: "2024-05-15",
        budget: 2000,
        spent: 1850,
      },
      {
        name: "New Product Launch",
        type: "whatsapp",
        status: "completed",
        sent: 1800,
        opened: 1440,
        clicked: 360,
        converted: 52,
        startDate: "2024-04-10",
        budget: 1200,
        spent: 1200,
      },
      {
        name: "Referral Program",
        type: "email",
        status: "active",
        sent: 1200,
        opened: 840,
        clicked: 252,
        converted: 81,
        startDate: "2024-03-20",
        budget: 800,
        spent: 650,
      },
    ],
  });

  const [timeRange, setTimeRange] = useState("month"); // week | month | quarter | year

  const resetCampaignForm = (type) => {
    switch (type) {
      case "email":
        return { name: "", subject: "", body: "", senderName: "", replyTo: "" };
      case "whatsapp":
      case "social":
        return { name: "", body: "", mediaUrl: "" };
      case "voice":
      case "telephony":
        return { name: "", script: "", voiceType: "Male", phoneNumber: "" };
      default:
        return { name: "" };
    }
  };

  useEffect(() => {
    setCampaignForm(resetCampaignForm(selectedCampaignType));
    setSelectedCampaign(null);
    setShowCampaignDetail(false);
  }, [selectedCampaignType]);

  const showToast = (message, type = "info") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
      type === "success"
        ? "bg-green-500 text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleSaveCampaign = () => {
    const id = selectedCampaign?.id || Date.now().toString();
    const item = { id, ...campaignForm, type: selectedCampaignType };
    setCampaigns((prev) => {
      const list = prev[selectedCampaignType] || [];
      const exists = list.find((c) => c.id === id);
      const updated = exists
        ? list.map((c) => (c.id === id ? item : c))
        : [item, ...list];
      return { ...prev, [selectedCampaignType]: updated };
    });
    setSelectedCampaign(null);
    setCampaignForm(resetCampaignForm(selectedCampaignType));
    setCampaignAction("detail");
    showToast("Campaign saved", "success");
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setCampaignForm({ ...campaign });
    setCampaignAction("edit");
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns((prev) => {
      const updated = (prev[selectedCampaignType] || []).filter(
        (c) => c.id !== id
      );
      return { ...prev, [selectedCampaignType]: updated };
    });
    showToast("Campaign deleted", "success");
  };

  // Calculate ROI
  const calculateROI = (revenue, cost) => {
    return (((revenue - cost) / cost) * 100).toFixed(1);
  };

  // Calculate conversion rate
  const calculateConversionRate = (converted, total) => {
    return ((converted / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div>
            <p className="text-xs uppercase text-slate-400">Marketing</p>
            <h2 className="text-xl font-semibold">
              Marketing Analytics Dashboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Track lead generation, campaign performance, and marketing ROI.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-sm text-slate-700 focus:outline-none"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2 border-b border-slate-100">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "analytics"
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Lead Analytics
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "campaigns"
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Campaign Management
          </button>
        </div>

        {activeTab === "analytics" && (
          <div className="mt-6 space-y-6">
            {/* Lead Generation Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Lead Generation Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Total Leads
                      </p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">
                        {leadMetrics.totalLeads}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>12% from last {timeRange}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        New Leads
                      </p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">
                        {leadMetrics.newLeadsThisMonth}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>8% from last {timeRange}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Conversion Rate
                      </p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">
                        {leadMetrics.conversionRate}%
                      </p>
                      <div className="flex items-center mt-2 text-xs text-red-600">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        <span>3% from last {timeRange}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Cost Per Lead
                      </p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">
                        ${leadMetrics.costPerLead}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-green-600">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        <span>5% from last {timeRange}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Source Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-100 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Lead Source Analytics
                </h3>
                <div className="space-y-4">
                  {leadMetrics.leadSources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${source.color}`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {source.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {source.leads} leads
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-700">
                          {source.value}%
                        </p>
                        <p className="text-xs text-slate-500">${source.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Monthly Lead Trend
                </h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {leadMetrics.monthlyTrend.map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="w-full bg-slate-100 rounded-t relative">
                        <div
                          className="bg-brand-blue rounded-t absolute bottom-0 w-full"
                          style={{ height: `${(item.leads / 400) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500">{item.month}</p>
                      <p className="text-xs font-medium">{item.leads}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Channel Performance & ROI */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Channel Performance & ROI
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Channel
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Leads
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Conversion Rate
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        ROI
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadMetrics.channelPerformance.map((channel, index) => (
                      <tr key={index} className="border-b border-slate-50">
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-slate-800">
                            {channel.channel}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            {channel.leads}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            {channel.conversion}%
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-slate-800">
                            {channel.roi}x
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <div
                            className={`flex items-center gap-1 text-xs ${
                              channel.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {channel.trend === "up" ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            <span>
                              {channel.trend === "up"
                                ? "Improving"
                                : "Declining"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign Performance Tracking */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Campaign Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Campaign
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Sent
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Opened
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Clicked
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Converted
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Conversion Rate
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                        Budget
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadMetrics.campaignPerformance.map((campaign, index) => (
                      <tr key={index} className="border-b border-slate-50">
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-slate-800">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Started: {campaign.startDate}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700 capitalize">
                            {campaign.type}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            {campaign.sent.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            {campaign.opened.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            {calculateConversionRate(
                              campaign.opened,
                              campaign.sent
                            )}
                            %
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            {campaign.clicked.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            {calculateConversionRate(
                              campaign.clicked,
                              campaign.opened
                            )}
                            %
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            {campaign.converted}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-slate-800">
                            {calculateConversionRate(
                              campaign.converted,
                              campaign.sent
                            )}
                            %
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-slate-700">
                            ${campaign.spent} / ${campaign.budget}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "campaigns" && (
          <div className="mt-6">
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div>
                <p className="text-sm text-slate-600">Step 1:</p>
                <div className="flex gap-2 mt-2">
                  {campaignTypes.map((t) => {
                    const Icon = t.icon;
                    const active = selectedCampaignType === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setSelectedCampaignType(t.key)}
                        className={`px-3 py-2 rounded-xl border ${
                          active
                            ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                            : "border-slate-200 text-slate-600"
                        } flex items-center gap-2`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <p className="text-sm font-medium text-slate-700">
                  Step 2: Choose Action
                </p>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-col">
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        campaignAction === "detail"
                          ? "bg-slate-50 border border-slate-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="action"
                        checked={campaignAction === "detail"}
                        onChange={() => setCampaignAction("detail")}
                        className="mr-2"
                      />{" "}
                      Detail
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        campaignAction === "add"
                          ? "bg-slate-50 border border-slate-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="action"
                        checked={campaignAction === "add"}
                        onChange={() => setCampaignAction("add")}
                        className="mr-2"
                      />{" "}
                      Add
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        campaignAction === "edit"
                          ? "bg-slate-50 border border-slate-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="action"
                        checked={campaignAction === "edit"}
                        onChange={() => setCampaignAction("edit")}
                        className="mr-2"
                      />{" "}
                      Edit
                    </label>
                    <label
                      className={`px-3 py-2 rounded-lg cursor-pointer ${
                        campaignAction === "delete"
                          ? "bg-slate-50 border border-slate-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="action"
                        checked={campaignAction === "delete"}
                        onChange={() => setCampaignAction("delete")}
                        className="mr-2"
                      />{" "}
                      Delete
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700">
                    Existing {selectedCampaignType} campaigns
                  </p>
                  <div className="mt-2 space-y-2">
                    {(campaigns[selectedCampaignType] || []).length === 0 ? (
                      <div className="text-sm text-slate-500">
                        No campaigns yet
                      </div>
                    ) : (
                      (campaigns[selectedCampaignType] || []).map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between border rounded-lg px-3 py-2"
                        >
                          <div>
                            <div className="text-sm font-semibold text-slate-700">
                              {c.name || "(untitled)"}
                            </div>
                            <div className="text-xs text-slate-500">
                              {c.subject || c.body || c.script || ""}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedCampaign(c);
                                setShowCampaignDetail(true);
                                setCampaignAction("detail");
                              }}
                              className="text-sm text-brand-blue"
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => handleEditCampaign(c)}
                              className="text-sm text-slate-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(c.id)}
                              className="text-sm text-rose-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-medium text-slate-700">
                  Step 3: Configure Parameters
                </p>
                <div className="mt-3 border rounded-xl p-4 bg-white">
                  {campaignAction === "detail" &&
                  selectedCampaign &&
                  showCampaignDetail ? (
                    <div>
                      <h4 className="font-semibold text-lg">
                        {selectedCampaign.name}
                      </h4>
                      <pre className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">
                        {JSON.stringify(selectedCampaign, null, 2)}
                      </pre>
                    </div>
                  ) : campaignAction === "add" || campaignAction === "edit" ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          Campaign Name
                        </label>
                        <input
                          value={campaignForm.name || ""}
                          onChange={(e) =>
                            setCampaignForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full mt-1 px-3 py-2 border rounded-lg"
                        />
                      </div>
                      {selectedCampaignType === "email" && (
                        <>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Subject Line
                            </label>
                            <input
                              value={campaignForm.subject || ""}
                              onChange={(e) =>
                                setCampaignForm((prev) => ({
                                  ...prev,
                                  subject: e.target.value,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Message Body
                            </label>
                            <textarea
                              value={campaignForm.body || ""}
                              onChange={(e) =>
                                setCampaignForm((prev) => ({
                                  ...prev,
                                  body: e.target.value,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 border rounded-lg"
                              rows={4}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-sm font-medium text-slate-600">
                                Sender Name
                              </label>
                              <input
                                value={campaignForm.senderName || ""}
                                onChange={(e) =>
                                  setCampaignForm((prev) => ({
                                    ...prev,
                                    senderName: e.target.value,
                                  }))
                                }
                                className="w-full mt-1 px-3 py-2 border rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-600">
                                Reply-To Address
                              </label>
                              <input
                                value={campaignForm.replyTo || ""}
                                onChange={(e) =>
                                  setCampaignForm((prev) => ({
                                    ...prev,
                                    replyTo: e.target.value,
                                  }))
                                }
                                className="w-full mt-1 px-3 py-2 border rounded-lg"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      {(selectedCampaignType === "whatsapp" ||
                        selectedCampaignType === "social") && (
                        <>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Message Body
                            </label>
                            <textarea
                              value={campaignForm.body || ""}
                              onChange={(e) =>
                                setCampaignForm((prev) => ({
                                  ...prev,
                                  body: e.target.value,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 border rounded-lg"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Media URL
                            </label>
                            <input
                              value={campaignForm.mediaUrl || ""}
                              onChange={(e) =>
                                setCampaignForm((prev) => ({
                                  ...prev,
                                  mediaUrl: e.target.value,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 border rounded-lg"
                            />
                          </div>
                        </>
                      )}
                      {(selectedCampaignType === "voice" ||
                        selectedCampaignType === "telephony") && (
                        <>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Script Text
                            </label>
                            <textarea
                              value={campaignForm.script || ""}
                              onChange={(e) =>
                                setCampaignForm((prev) => ({
                                  ...prev,
                                  script: e.target.value,
                                }))
                              }
                              className="w-full mt-1 px-3 py-2 border rounded-lg"
                              rows={4}
                            />
                          </div>
                          {selectedCampaignType === "voice" && (
                            <div>
                              <label className="text-sm font-medium text-slate-600">
                                Voice Type
                              </label>
                              <select
                                value={campaignForm.voiceType || "Male"}
                                onChange={(e) =>
                                  setCampaignForm((prev) => ({
                                    ...prev,
                                    voiceType: e.target.value,
                                  }))
                                }
                                className="w-full mt-1 px-3 py-2 border rounded-lg"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          )}
                          {selectedCampaignType === "telephony" && (
                            <div>
                              <label className="text-sm font-medium text-slate-600">
                                Phone Number
                              </label>
                              <input
                                value={campaignForm.phoneNumber || ""}
                                onChange={(e) =>
                                  setCampaignForm((prev) => ({
                                    ...prev,
                                    phoneNumber: e.target.value,
                                  }))
                                }
                                className="w-full mt-1 px-3 py-2 border rounded-lg"
                              />
                            </div>
                          )}
                        </>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={handleSaveCampaign}
                          className="bg-brand-blue text-white px-4 py-2 rounded-lg"
                        >
                          {campaignAction === "edit"
                            ? "Save changes"
                            : "Create Campaign"}
                        </button>
                        <button
                          onClick={() => {
                            setCampaignAction("detail");
                            setCampaignForm(
                              resetCampaignForm(selectedCampaignType)
                            );
                          }}
                          className="px-4 py-2 rounded-lg border"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : campaignAction === "delete" ? (
                    <div>
                      <p className="text-sm text-slate-600">
                        Click delete on any campaign in the left column to
                        remove it.
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-600">
                      Select a campaign on the left and choose Detail to view
                      configuration.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
