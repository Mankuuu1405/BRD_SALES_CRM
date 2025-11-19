import React, { useMemo } from 'react';

const conversionTrend = [
  { label: 'Mon', value: 38 },
  { label: 'Tue', value: 34 },
  { label: 'Wed', value: 42 },
  { label: 'Thu', value: 49 },
  { label: 'Fri', value: 52 },
  { label: 'Sat', value: 58 },
  { label: 'Sun', value: 46 },
];

const kpiReports = [
  {
    title: 'Lead-to-Application Conversion',
    value: '46%',
    target: '60%',
    trend: '+3% vs last week',
    gradient: 'from-brand-blue/90 via-brand-sky/80 to-brand-emerald/80',
  },
  {
    title: 'Average Time to Submit',
    value: '38 hrs',
    target: '30 hrs',
    trend: '↓ 6 hrs improvement',
    gradient: 'from-brand-emerald/90 via-brand-sky/70 to-brand-blue/90',
  },
  {
    title: 'Win Rate',
    value: '72%',
    target: '75%',
    trend: '+2% vs last month',
    gradient: 'from-brand-navy via-brand-blue to-brand-slate',
  },
];

export default function ReportsPage() {
  const conversionAverage = useMemo(() => {
    const total = conversionTrend.reduce((sum, item) => sum + item.value, 0);
    return Math.round(total / conversionTrend.length);
  }, []);

  return (
    <>
      <section className="grid md:grid-cols-3 gap-4">
        {kpiReports.map((kpi) => (
          <div
            key={kpi.title}
            className={`rounded-2xl p-6 text-white shadow-sm bg-gradient-to-br ${kpi.gradient}`}
          >
            <p className="text-sm font-medium text-white/90">{kpi.title}</p>
            <p className="text-4xl font-semibold mt-2">{kpi.value}</p>
            <p className="text-sm text-white/80 mt-1">Target: {kpi.target}</p>
            <p className="text-xs text-white/70 mt-2">{kpi.trend}</p>
          </div>
        ))}
      </section>

      <section className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase text-slate-400">Lead → Application</p>
              <h2 className="text-lg font-semibold">Conversion trend</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-brand-blue">{conversionAverage}%</p>
              <p className="text-xs text-slate-500">7-day average</p>
            </div>
          </div>
          <div className="flex items-end gap-3 mt-6">
            {conversionTrend.map((item) => (
              <div key={item.label} className="flex-1 text-center">
                <div
                  className="mx-auto w-full rounded-full bg-brand-blue/20"
                  style={{ height: '140px' }}
                >
                  <div
                    className="w-full rounded-full bg-brand-blue"
                    style={{ height: `${item.value}%`, minHeight: '10%' }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-4">
            <p className="text-xs uppercase text-slate-400">Performance Summary</p>
            <h2 className="text-lg font-semibold">Weekly Overview</h2>
          </div>
          <div className="space-y-4">
            <div className="border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total Leads Captured</p>
                  <p className="text-xs text-slate-500">This week</p>
                </div>
                <p className="text-2xl font-semibold text-brand-blue">142</p>
              </div>
            </div>
            <div className="border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Applications Submitted</p>
                  <p className="text-xs text-slate-500">This week</p>
                </div>
                <p className="text-2xl font-semibold text-brand-emerald">65</p>
              </div>
            </div>
            <div className="border border-slate-100 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Disbursed Amount</p>
                  <p className="text-xs text-slate-500">This week</p>
                </div>
                <p className="text-2xl font-semibold text-brand-sky">₹ 4.2 Cr</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

