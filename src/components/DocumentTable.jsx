import React from 'react';
import { Trash2, CheckCircle, Sparkles } from 'lucide-react';

const StatusPill = ({ status }) => {
  const map = {
    draft: 'bg-slate-100 text-slate-700',
    sent: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    declined: 'bg-rose-100 text-rose-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs ${map[status] || map.draft}`}>{status}</span>;
};

export default function DocumentTable({ documents, onSelfSign, onDelete }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Recent documents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Title</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="text-left px-4 py-2 font-medium">Recipients</th>
              <th className="text-left px-4 py-2 font-medium">Updated</th>
              <th className="text-right px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {documents?.length ? (
              documents.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 text-slate-800">{d.title}</td>
                  <td className="px-4 py-2"><StatusPill status={d.status} /></td>
                  <td className="px-4 py-2 text-slate-600 text-sm">{d.recipients?.join(', ') || '—'}</td>
                  <td className="px-4 py-2 text-slate-600 text-sm">{new Date(d.updated_at || d.created_at || Date.now()).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelfSign(d.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
                        title="Self-sign"
                      >
                        <CheckCircle className="w-4 h-4" /> Sign
                      </button>
                      <button
                        onClick={() => onDelete(d.id)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500 text-sm">
                  No documents yet. Click "New document" to create one or use a template.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
