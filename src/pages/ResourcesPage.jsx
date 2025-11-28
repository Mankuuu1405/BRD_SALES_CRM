import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Filter,
  Clock,
  Star,
  ExternalLink,
  File,
  Monitor,
  Users,
  Settings,
  MessageSquare,
  Lightbulb,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";

const resourceCategories = [
  {
    title: "Documentation",
    icon: FileText,
    items: [
      {
        name: "Business Loan Product Guide",
        type: "PDF",
        size: "2.4 MB",
        summary: "Eligibility, documentation and pricing for business loans.",
        category: "Product Documentation",
        lastUpdated: "2024-06-10",
        rating: 4.5,
      },
      {
        name: "SME Loan Documentation",
        type: "PDF",
        size: "1.8 MB",
        summary: "Required paperwork and checklist for SME lending.",
        category: "Product Documentation",
        lastUpdated: "2024-05-22",
        rating: 4.2,
      },
      {
        name: "Invoice Finance Overview",
        type: "PDF",
        size: "1.2 MB",
        summary: "Workflow for onboarding invoice discounting customers.",
        category: "Product Documentation",
        lastUpdated: "2024-06-01",
        rating: 4.7,
      },
      {
        name: "API Integration Documentation",
        type: "PDF",
        size: "3.1 MB",
        summary: "Technical documentation for API integration.",
        category: "Technical Documentation",
        lastUpdated: "2024-06-15",
        rating: 4.3,
      },
    ],
  },
  {
    title: "Training Materials",
    icon: Video,
    items: [
      {
        name: "Lead Capture Best Practices",
        type: "Video",
        size: "15 min",
        summary: "Field demo covering mobile capture and reminders.",
        category: "Sales Training",
        lastUpdated: "2024-05-30",
        rating: 4.8,
      },
      {
        name: "KYC Documentation Process",
        type: "Video",
        size: "12 min",
        summary: "Guided walkthrough of compliant KYC submissions.",
        category: "Compliance Training",
        lastUpdated: "2024-06-05",
        rating: 4.6,
      },
      {
        name: "CRM Integration Tutorial",
        type: "Video",
        size: "8 min",
        summary: "Connecting FreshSales or LeadSquared with app.",
        category: "Technical Training",
        lastUpdated: "2024-05-18",
        rating: 4.4,
      },
      {
        name: "Advanced Sales Techniques",
        type: "Video",
        size: "22 min",
        summary: "Advanced techniques for closing high-value deals.",
        category: "Sales Training",
        lastUpdated: "2024-06-12",
        rating: 4.9,
      },
    ],
  },
  {
    title: "Best Practices",
    icon: Lightbulb,
    items: [
      {
        name: "Customer Onboarding Flow",
        type: "PDF",
        size: "1.5 MB",
        summary: "Step-by-step guide for optimal customer onboarding.",
        category: "Process Optimization",
        lastUpdated: "2024-06-08",
        rating: 4.7,
      },
      {
        name: "Lead Qualification Framework",
        type: "PDF",
        size: "2.1 MB",
        summary: "Framework for qualifying leads effectively.",
        category: "Sales Process",
        lastUpdated: "2024-05-25",
        rating: 4.6,
      },
      {
        name: "Objection Handling Guide",
        type: "DOCX",
        size: "890 KB",
        summary: "Common objections and effective responses.",
        category: "Sales Process",
        lastUpdated: "2024-06-02",
        rating: 4.8,
      },
      {
        name: "Follow-up Communication Templates",
        type: "DOCX",
        size: "650 KB",
        summary: "Email and message templates for effective follow-ups.",
        category: "Communication",
        lastUpdated: "2024-05-15",
        rating: 4.5,
      },
    ],
  },
  {
    title: "System Guides",
    icon: Monitor,
    items: [
      {
        name: "Mobile App User Guide",
        type: "PDF",
        size: "3.2 MB",
        summary: "Complete guide for using mobile application.",
        category: "User Guides",
        lastUpdated: "2024-06-10",
        rating: 4.6,
      },
      {
        name: "Web Dashboard Tutorial",
        type: "Video",
        size: "18 min",
        summary: "Complete walkthrough of web dashboard features.",
        category: "User Guides",
        lastUpdated: "2024-06-01",
        rating: 4.7,
      },
      {
        name: "Integration Setup Guide",
        type: "PDF",
        size: "2.8 MB",
        summary: "Step-by-step guide for CRM and tool integrations.",
        category: "Technical Guides",
        lastUpdated: "2024-05-28",
        rating: 4.4,
      },
      {
        name: "Troubleshooting Common Issues",
        type: "HTML",
        size: "1.1 MB",
        summary: "Solutions for common technical issues.",
        category: "Technical Guides",
        lastUpdated: "2024-06-05",
        rating: 4.3,
      },
    ],
  },
];

const faqCategories = [
  {
    title: "General",
    icon: HelpCircle,
    questions: [
      {
        id: 1,
        question: "How do I reset my password?",
        answer:
          'You can reset your password by clicking on "Forgot Password" link on login page. Follow the instructions sent to your registered email to create a new password.',
        helpful: 42,
      },
      {
        id: 2,
        question: "What are the system requirements?",
        answer:
          "Our system works on any modern web browser (Chrome, Firefox, Safari, Edge) updated within the last 2 years. For mobile, we support iOS 12+ and Android 8+.",
        helpful: 38,
      },
      {
        id: 3,
        question: "How often is data backed up?",
        answer:
          "All data is backed up in real-time to secure cloud servers with redundancy across multiple geographic locations. You can restore data from any point in the last 30 days.",
        helpful: 35,
      },
    ],
  },
  {
    title: "Sales Process",
    icon: Target,
    questions: [
      {
        id: 4,
        question: "How do I add a new lead?",
        answer:
          'To add a new lead, click the "Add Lead" button on the dashboard or use the mobile app to capture leads on the go. Fill in the required information and save to add the lead to your pipeline.',
        helpful: 56,
      },
      {
        id: 5,
        question: "Can I customize the sales stages?",
        answer:
          "Yes, administrators can customize the sales stages to match your specific workflow. Go to Settings > Pipeline Configuration to modify the stages.",
        helpful: 48,
      },
      {
        id: 6,
        question: "How do I track my commissions?",
        answer:
          "Your commissions are automatically calculated based on your targets and achievements. View the Incentives page to see a detailed breakdown of your earnings.",
        helpful: 62,
      },
    ],
  },
  {
    title: "Technical Issues",
    icon: Settings,
    questions: [
      {
        id: 7,
        question: "Why is the app running slowly?",
        answer:
          "Slow performance can be due to a poor network connection, outdated app version, or excessive cache. Try clearing your cache, updating the app, or switching to a better network connection.",
        helpful: 41,
      },
      {
        id: 8,
        question: "How do I integrate with my CRM?",
        answer:
          "Go to Settings > Integrations and select your CRM from the list. Follow the step-by-step guide to authorize and configure the integration. Most popular CRMs are supported.",
        helpful: 53,
      },
      {
        id: 9,
        question: "Is my data secure?",
        answer:
          "Yes, we use industry-standard encryption for data transmission and storage. All data is encrypted at rest and in transit, and we comply with GDPR and other data protection regulations.",
        helpful: 67,
      },
    ],
  },
];

const extensionMap = {
  PDF: "pdf",
  DOCX: "docx",
  Video: "mp4",
  HTML: "html",
};

const sanitizeFileName = (name, ext) =>
  `${
    name
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "resource"
  }.${ext}`;

const getResourceContent = (item) => {
  return [
    `Resource: ${item.name}`,
    `Type: ${item.type}`,
    item.size ? `Size: ${item.size}` : null,
    item.category ? `Category: ${item.category}` : null,
    "",
    item.summary || "Reference asset generated from Sales Team Dashboard.",
    "",
    "Download generated for enablement/demo purposes.",
  ]
    .filter(Boolean)
    .join("\n");
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Documentation"); // Default to first category
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    sortBy: "recent",
  });

  const handleResourceAction = (item) => {
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    const ext = extensionMap[item.type] || "txt";
    const blob = new Blob([getResourceContent(item)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = sanitizeFileName(item.name, ext);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFaqToggle = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleHelpfulVote = (id) => {
    setHelpfulVotes({
      ...helpfulVotes,
      [id]: true,
    });
  };

  // Filter resources based on search and filters
  const getFilteredResources = () => {
    if (selectedCategory === "FAQ") {
      return faqCategories;
    }

    const category = resourceCategories.find(
      (cat) => cat.title === selectedCategory
    );
    if (!category) return [];

    return category.items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filters.type === "all" || item.type === filters.type;
      const matchesItemCategory =
        filters.category === "all" || item.category === filters.category;

      return matchesSearch && matchesType && matchesItemCategory;
    });
  };

  // Sort resources based on filter
  const getSortedResources = () => {
    if (selectedCategory === "FAQ") {
      return faqCategories;
    }

    const category = resourceCategories.find(
      (cat) => cat.title === selectedCategory
    );
    if (!category) return [];

    const filteredItems = category.items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filters.type === "all" || item.type === filters.type;
      const matchesItemCategory =
        filters.category === "all" || item.category === filters.category;

      return matchesSearch && matchesType && matchesItemCategory;
    });

    return [...filteredItems].sort((a, b) => {
      if (filters.sortBy === "recent") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      } else if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      } else if (filters.sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  // Get the current category object
  const getCurrentCategory = () => {
    if (selectedCategory === "FAQ") {
      return { title: "FAQ", icon: HelpCircle };
    }
    return (
      resourceCategories.find((cat) => cat.title === selectedCategory) ||
      resourceCategories[0]
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resources</h1>
          <p className="text-sm text-slate-500">
            Documentation, training materials, and support resources
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
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
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filter Resources</h3>
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
                  Resource Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="DOCX">Document</option>
                  <option value="HTML">HTML</option>
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
                  <option value="Product Documentation">
                    Product Documentation
                  </option>
                  <option value="Sales Training">Sales Training</option>
                  <option value="Technical Training">Technical Training</option>
                  <option value="Process Optimization">
                    Process Optimization
                  </option>
                  <option value="User Guides">User Guides</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 px-3 py-2 bg-brand-blue text-white rounded-md text-sm"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    setFilters({
                      type: "all",
                      category: "all",
                      sortBy: "recent",
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

      {/* Category Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setSelectedCategory("Documentation")}
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === "Documentation"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Documentation
        </button>
        <button
          onClick={() => setSelectedCategory("Training Materials")}
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === "Training Materials"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Training Materials
        </button>
        <button
          onClick={() => setSelectedCategory("Best Practices")}
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === "Best Practices"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Best Practices
        </button>
        <button
          onClick={() => setSelectedCategory("System Guides")}
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === "System Guides"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          System Guides
        </button>
        <button
          onClick={() => setSelectedCategory("FAQ")}
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === "FAQ"
              ? "text-brand-blue border-b-2 border-brand-blue"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          FAQ
        </button>
      </div>

      {/* Resources Section - Only show selected category */}
      {selectedCategory !== "FAQ" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              {(() => {
                const Icon = getCurrentCategory().icon;
                return <Icon className="h-5 w-5" />;
              })()}
            </div>
            <h2 className="text-lg font-semibold">
              {getCurrentCategory().title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {getSortedResources().map((item) => (
              <div
                key={item.name}
                className="flex items-start justify-between border border-slate-100 rounded-xl p-4 hover:border-brand-blue/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating)
                              ? "text-amber-400 fill-current"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-slate-500 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{item.type}</span>
                    {item.size && (
                      <>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">
                          {item.size}
                        </span>
                      </>
                    )}
                    {item.category && (
                      <>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">
                          {item.category}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{item.summary}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      Updated: {item.lastUpdated}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleResourceAction(item)}
                  className="ml-4 p-2 rounded-lg hover:bg-brand-blue/10 text-brand-blue"
                  aria-label={`Download ${item.name}`}
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section - Only show when FAQ is selected */}
      {selectedCategory === "FAQ" && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-6">
            <p className="text-xs uppercase text-slate-400">Support</p>
            <h2 className="text-lg font-semibold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="border border-slate-100 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-5 w-5 text-brand-blue" />
                    <h3 className="font-medium">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.questions.map((question) => (
                      <div
                        key={question.id}
                        className="border-b border-slate-50 last:border-0 pb-3 last:pb-0"
                      >
                        <button
                          onClick={() => handleFaqToggle(question.id)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <p className="font-medium text-sm pr-2">
                            {question.question}
                          </p>
                          {expandedFaq === question.id ? (
                            <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === question.id && (
                          <div className="mt-3 text-sm text-slate-600">
                            <p>{question.answer}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => handleHelpfulVote(question.id)}
                                className={`flex items-center gap-1 text-xs ${
                                  helpfulVotes[question.id]
                                    ? "text-brand-blue"
                                    : "text-slate-500 hover:text-brand-blue"
                                }`}
                              >
                                <HelpCircle className="h-3 w-3" />
                                <span>Helpful</span>
                              </button>
                              <span className="text-xs text-slate-400">
                                {question.helpful +
                                  (helpfulVotes[question.id] ? 1 : 0)}{" "}
                                people found this helpful
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-brand-blue/10 p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-brand-blue" />
              <div>
                <p className="font-medium text-brand-blue">Still need help?</p>
                <p className="text-sm text-slate-600">
                  Contact our support team for personalized assistance.
                </p>
              </div>
            </div>
            <button className="mt-3 px-4 py-2 bg-brand-blue text-white rounded-lg text-sm">
              Contact Support
            </button>
          </div>
        </section>
      )}

      {/* Quick Links Section - Always visible */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">
        <div className="mb-4">
          <p className="text-xs uppercase text-slate-400">Quick Access</p>
          <h2 className="text-lg font-semibold">Frequently Accessed</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="https://example.com/sales-playbook"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-100 rounded-xl p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-brand-blue mb-2" />
            <p className="font-medium text-sm">Sales Playbook</p>
            <p className="text-xs text-slate-500 mt-1">
              Complete sales process guide
            </p>
          </a>
          <a
            href="https://example.com/incentive-calculator"
            className="border border-slate-100 rounded-xl p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TrendingUp className="h-5 w-5 text-brand-blue mb-2" />
            <p className="font-medium text-sm">Incentive Calculator</p>
            <p className="text-xs text-slate-500 mt-1">
              Estimate your commissions
            </p>
          </a>
          <a
            href="https://example.com/crm-setup"
            className="border border-slate-100 rounded-xl p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Monitor className="h-5 w-5 text-brand-blue mb-2" />
            <p className="font-medium text-sm">CRM Setup Guide</p>
            <p className="text-xs text-slate-500 mt-1">Connect your tools</p>
          </a>
        </div>
      </section>
    </>
  );
}
