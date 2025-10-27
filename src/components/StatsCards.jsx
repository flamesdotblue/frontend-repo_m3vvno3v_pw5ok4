import React from 'react';
import { CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react';

const Card = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-90`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <div className="text-slate-500 text-sm">{label}</div>
      <div className="text-xl font-semibold text-slate-800">{value}</div>
    </div>
  </div>
);

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card icon={FileText} label="Total" value={stats?.total ?? 0} color="bg-slate-500" />
      <Card icon={CheckCircle} label="Completed" value={stats?.completed ?? 0} color="bg-emerald-500" />
      <Card icon={Clock} label="Waiting" value={stats?.waiting ?? 0} color="bg-indigo-500" />
      <Card icon={AlertTriangle} label="Needs attention" value={stats?.attention ?? 0} color="bg-amber-500" />
    </div>
  );
}
