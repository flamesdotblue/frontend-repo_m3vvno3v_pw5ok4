import React from 'react';
import { CheckCircle2, Clock, Shield, FileText } from 'lucide-react';

const Item = ({ icon: Icon, title, time, meta, color }) => (
  <div className="relative pl-8">
    <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
      <Icon className="h-3.5 w-3.5" />
    </span>
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
        <span>{meta}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {time}</span>
      </div>
    </div>
  </div>
);

const ActivityFeed = () => {
  const items = [
    { icon: CheckCircle2, title: 'Contract signed by Jamie Fox', time: '8m ago', meta: 'SaaS_Subscription_Agreement.pdf', color: '#059669' },
    { icon: FileText, title: 'NDA ready for review', time: '1h ago', meta: 'NDA_Acme_Corp.pdf', color: '#4f46e5' },
    { icon: Shield, title: 'KYC check passed', time: '3h ago', meta: 'Alex Johnson • Verified', color: '#1f2937' },
    { icon: CheckCircle2, title: 'Purchase Order signed by 4/4', time: '1d ago', meta: 'Purchase_Order_2025-10.pdf', color: '#059669' },
  ];

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Activity</h3>
        <p className="text-xs text-gray-500">Latest events from your organization</p>
      </div>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <Item key={idx} {...it} />
        ))}
      </div>
    </section>
  );
};

export default ActivityFeed;
