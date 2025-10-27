import React from 'react';
import { FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, trend, trendLabel, color }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}> 
        <Icon className="h-5 w-5 text-white" />
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend >= 0 ? '+' : ''}{trend}% {trendLabel}
        </span>
      )}
    </div>
    <div className="mt-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const StatsCards = () => {
  const stats = [
    { icon: FileText, label: 'Total Documents', value: '1,284', trend: 8, trendLabel: 'this month', color: 'bg-indigo-600' },
    { icon: CheckCircle2, label: 'Completed', value: '942', trend: 5, trendLabel: 'vs last month', color: 'bg-emerald-600' },
    { icon: Clock, label: 'Waiting for Others', value: '221', trend: -3, trendLabel: 'pending', color: 'bg-amber-500' },
    { icon: AlertCircle, label: 'Attention Needed', value: '17', color: 'bg-rose-600' },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </section>
  );
};

export default StatsCards;
