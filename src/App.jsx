import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import StatsCards from './components/StatsCards.jsx';
import DocumentTable from './components/DocumentTable.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';

const API = import.meta.env.VITE_BACKEND_URL || '';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [docsRes, actRes, statsRes, tplRes] = await Promise.all([
        fetch(`${API}/documents`),
        fetch(`${API}/activities`),
        fetch(`${API}/stats`),
        fetch(`${API}/templates`),
      ]);
      const [docs, acts, st, tpls] = await Promise.all([
        docsRes.json(),
        actRes.json(),
        statsRes.json(),
        tplRes.json(),
      ]);
      setDocuments(docs);
      setActivities(acts);
      setStats(st);
      setTemplates(tpls);
    } catch (e) {
      console.error(e);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewDocument = async () => {
    const title = prompt('Document title', `Agreement ${new Date().toLocaleString()}`);
    if (!title) return;
    try {
      const res = await fetch(`${API}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Create failed');
      await fetchAll();
      showToast('Document created');
    } catch (e) {
      showToast('Failed to create document', 'error');
    }
  };

  const handleSelfSign = async (id) => {
    try {
      const res = await fetch(`${API}/documents/${id}/self-sign`, { method: 'POST' });
      if (!res.ok) throw new Error('Sign failed');
      await fetchAll();
      showToast('Document self-signed');
    } catch (e) {
      showToast('Failed to sign', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this document?')) return;
    try {
      const res = await fetch(`${API}/documents/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchAll();
      showToast('Document deleted');
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleCreateTemplate = async () => {
    const name = prompt('Template name', 'NDA Template');
    if (!name) return;
    try {
      const res = await fetch(`${API}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: 'Quick template', fields: { full_name: { type: 'text' } } }),
      });
      if (!res.ok) throw new Error('Template failed');
      await fetchAll();
      showToast('Template created');
    } catch (e) {
      showToast('Failed to create template', 'error');
    }
  };

  const handleUseTemplate = async () => {
    if (!templates.length) {
      showToast('No templates yet');
      return;
    }
    const choices = templates.map((t, i) => `${i + 1}. ${t.name}`).join('\n');
    const pick = prompt(`Choose a template by number:\n${choices}`, '1');
    const idx = Number(pick) - 1;
    const tpl = templates[idx];
    if (!tpl) return;
    const title = prompt('Document title', `From ${tpl.name}`) || undefined;
    try {
      const res = await fetch(`${API}/templates/${tpl.id}/instantiate${title ? `?title=${encodeURIComponent(title)}` : ''}`, { method: 'POST' });
      if (!res.ok) throw new Error('Instantiate failed');
      await fetchAll();
      showToast('Document created from template');
    } catch (e) {
      showToast('Failed to use template', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNewDocument={handleNewDocument} onCreateTemplate={handleCreateTemplate} onUseTemplate={handleUseTemplate} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Create, sign, and manage documents and templates</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-slate-600 border">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            Encryption on • SOC 2 • GDPR
          </div>
        </div>

        <StatsCards stats={stats} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DocumentTable documents={documents} onSelfSign={handleSelfSign} onDelete={handleDelete} />
          </div>
          <div className="lg:col-span-1">
            <div className="mb-6 bg-white rounded-xl border shadow-sm p-4">
              <div className="font-medium text-slate-800 mb-2">Templates</div>
              {templates?.length ? (
                <ul className="space-y-2">
                  {templates.map((t) => (
                    <li key={t.id} className="flex items-center justify-between text-sm">
                      <div className="text-slate-700 truncate">{t.name}</div>
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch(`${API}/templates/${t.id}/instantiate`, { method: 'POST' });
                            if (!res.ok) throw new Error('Instantiate failed');
                            await fetchAll();
                            showToast('Document created');
                          } catch (e) {
                            showToast('Failed', 'error');
                          }
                        }}
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        Use
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-slate-500">No templates yet</div>
              )}
            </div>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </main>

      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className={`rounded-lg px-4 py-2 text-sm text-white shadow-lg ${toast.type === 'error' ? 'bg-rose-600' : 'bg-slate-900'}`}>
            {toast.msg}
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/5 grid place-items-center">
          <div className="px-4 py-2 bg-white rounded-lg border shadow-sm text-sm text-slate-600">Loading…</div>
        </div>
      )}
    </div>
  );
}
