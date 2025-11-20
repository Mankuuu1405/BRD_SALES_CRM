import React from 'react';
import { BookOpen, FileText, Video, HelpCircle, Download } from 'lucide-react';

const resourceCategories = [
  {
    title: 'Product Guides',
    icon: BookOpen,
    items: [
      {
        name: 'Business Loan Product Guide',
        type: 'PDF',
        size: '2.4 MB',
        summary: 'Eligibility, documentation and pricing for business loans.',
      },
      {
        name: 'SME Loan Documentation',
        type: 'PDF',
        size: '1.8 MB',
        summary: 'Required paperwork and checklist for SME lending.',
      },
      {
        name: 'Invoice Finance Overview',
        type: 'PDF',
        size: '1.2 MB',
        summary: 'Workflow for onboarding invoice discounting customers.',
      },
    ],
  },
  {
    title: 'Training Materials',
    icon: Video,
    items: [
      {
        name: 'Lead Capture Best Practices',
        type: 'Video',
        size: '15 min',
        summary: 'Field demo covering mobile capture and reminders.',
      },
      {
        name: 'KYC Documentation Process',
        type: 'Video',
        size: '12 min',
        summary: 'Guided walkthrough of compliant KYC submissions.',
      },
      {
        name: 'CRM Integration Tutorial',
        type: 'Video',
        size: '8 min',
        summary: 'Connecting FreshSales or LeadSquared with the app.',
      },
    ],
  },
  {
    title: 'Forms & Templates',
    icon: FileText,
    items: [
      {
        name: 'Lead Capture Form Template',
        type: 'DOCX',
        size: '45 KB',
        summary: 'Offline form for areas without network coverage.',
      },
      {
        name: 'Customer Onboarding Checklist',
        type: 'PDF',
        size: '120 KB',
        summary: 'Step-by-step checklist for onboarding new borrowers.',
      },
      {
        name: 'Follow-up Call Script',
        type: 'DOCX',
        size: '32 KB',
        summary: 'Suggested call script with objection handling.',
      },
    ],
  },
  {
    title: 'Support & Help',
    icon: HelpCircle,
    items: [
      { name: 'FAQ - Common Questions', type: 'Link', href: 'https://example.com/faq' },
      { name: 'Contact Support Team', type: 'Link', href: 'https://example.com/support' },
      { name: 'System Status & Updates', type: 'Link', href: 'https://status.example.com' },
    ],
  },
];

const extensionMap = {
  PDF: 'pdf',
  DOCX: 'docx',
  Video: 'mp4',
};

const sanitizeFileName = (name, ext) =>
  `${name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'resource'}.${ext}`;

const getResourceContent = (item) => {
  return [
    `Resource: ${item.name}`,
    `Type: ${item.type}`,
    item.size ? `Size: ${item.size}` : null,
    '',
    item.summary || 'Reference asset generated from Sales Team Dashboard.',
    '',
    'Download generated for enablement/demo purposes.',
  ]
    .filter(Boolean)
    .join('\n');
};

export default function ResourcesPage() {
  const handleResourceAction = (item) => {
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }

    const ext = extensionMap[item.type] || 'txt';
    const blob = new Blob([getResourceContent(item)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizeFileName(item.name, ext);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="grid md:grid-cols-2 gap-6">
        {resourceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between border border-slate-100 rounded-xl p-3 hover:border-brand-blue/30 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{item.type}</span>
                        {item.size && (
                          <>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{item.size}</span>
                          </>
                        )}
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
            </div>
          );
        })}
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="mb-4">
          <p className="text-xs uppercase text-slate-400">Quick Links</p>
          <h2 className="text-lg font-semibold">Frequently Accessed</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="https://example.com/sales-playbook"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-100 rounded-xl p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
          >
            <p className="font-medium text-sm">Sales Playbook</p>
            <p className="text-xs text-slate-500 mt-1">Complete sales process guide</p>
          </a>
          <a
            href="https://example.com/incentive-calculator"
            className="border border-slate-100 rounded-xl p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="font-medium text-sm">Incentive Calculator</p>
            <p className="text-xs text-slate-500 mt-1">Estimate your commissions</p>
          </a>
          <a
            href="https://example.com/crm-setup"
            className="border border-slate-100 rounded-xl p-4 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="font-medium text-sm">CRM Setup Guide</p>
            <p className="text-xs text-slate-500 mt-1">Connect your tools</p>
          </a>
        </div>
      </section>
    </>
  );
}

