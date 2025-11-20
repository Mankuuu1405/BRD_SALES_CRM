import React from "react";
import { CircleDollarSign, Download, TrendingUp } from "lucide-react";

const incentiveBreakup = [
  {
    title: "Disbursed Volume",
    value: "₹ 2.8 Cr",
    incentive: "₹ 42,000",
    progress: 70,
  },
  {
    title: "Conversion Accelerator",
    value: "46% ratio",
    incentive: "₹ 18,000",
    progress: 46,
  },
  {
    title: "Speed To Submit",
    value: "38 hrs avg",
    incentive: "₹ 12,400",
    progress: 80,
  },
  {
    title: "Team Performance Bonus",
    value: "Top 20%",
    incentive: "₹ 14,000",
    progress: 85,
  },
];

const monthlyHistory = [
  { month: "Jan 2024", amount: "₹ 78,500", status: "Paid" },
  { month: "Feb 2024", amount: "₹ 82,300", status: "Paid" },
  { month: "Mar 2024", amount: "₹ 91,200", status: "Paid" },
  { month: "Apr 2024", amount: "₹ 86,400", status: "Pending" },
];

export default function IncentivesPage() {
  const totalIncentive = incentiveBreakup.reduce((sum, item) => {
    const amount = parseInt(item.incentive.replace(/[₹,\s]/g, ""));
    return sum + amount;
  }, 0);

  // Fixed: Added the missing handleDownloadStatement function
  const handleDownloadStatement = () => {
    // Create a simple CSV or text content for the statement
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

    // Create a blob with the content
    const blob = new Blob([statementContent], { type: "text/csv" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `incentive_statement_${
      new Date().toISOString().split("T")[0]
    }.csv`;

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadStatement}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:border-brand-blue hover:text-brand-blue transition-colors"
        >
          <Download className="h-4 w-4" />
          Download Statement
        </button>
      </div>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase text-slate-400">Current Month</p>
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
            <p className="text-xs uppercase text-slate-400">Payment History</p>
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
                <p className="font-semibold text-brand-blue">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
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
  );
}
