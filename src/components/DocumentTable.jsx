import React from 'react';
import { FileText, MoreHorizontal, Shield, Users, Clock, CheckCircle2 } from 'lucide-react';

const StatusPill = ({ status }) => {
  const map = {
    Completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    Declined: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    Draft: 'bg-gray-50 text-gray-700 ring-1 ring-gray-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${map[status] || ''}`}>
      {status}
    </span>
  );
};

const Row = ({ name, recipients, status, updated, size }) => (
  <tr className="border-b border-gray-100 last:border-0">
    <td className="whitespace-nowrap p-3 text-sm font-medium text-gray-900">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          <FileText className="h-4 w-4" />
        </div>
        <div>
          <p className="leading-5">{name}</p>
          <p className="text-xs text-gray-500">{size}</p>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
      <div className="flex items-center gap-2 text-gray-500">
        <Users className="h-4 w-4" />
        {recipients}
      </div>
    </td>
    <td className="whitespace-nowrap p-3 text-sm"><StatusPill status={status} /></td>
    <td className="whitespace-nowrap p-3 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" /> {updated}
      </div>
    </td>
    <td className="whitespace-nowrap p-3 text-right">
      <button className="rounded-md border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </td>
  </tr>
);

const DocumentTable = () => {
  const rows = [
    { name: 'NDA_Acme_Corp.pdf', recipients: '2 recipients', status: 'Completed', updated: '2h ago', size: '248 KB' },
    { name: 'SaaS_Subscription_Agreement.pdf', recipients: '3 recipients', status: 'Pending', updated: '5h ago', size: '1.2 MB' },
    { name: 'Vendor_Onboarding_Form.pdf', recipients: '1 recipient', status: 'Draft', updated: '1d ago', size: '532 KB' },
    { name: 'Purchase_Order_2025-10.pdf', recipients: '4 recipients', status: 'Declined', updated: '2d ago', size: '884 KB' },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Recent documents</h3>
          <p className="text-xs text-gray-500">Track progress, recipients and status</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Shield className="h-4 w-4 text-indigo-600" /> Compliance
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <CheckCircle2 className="h-4 w-4" /> Quick send
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="whitespace-nowrap p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Document</th>
              <th className="whitespace-nowrap p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Recipients</th>
              <th className="whitespace-nowrap p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="whitespace-nowrap p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Updated</th>
              <th className="whitespace-nowrap p-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <Row key={r.name} {...r} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DocumentTable;
