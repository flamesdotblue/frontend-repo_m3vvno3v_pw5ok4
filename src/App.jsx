import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import StatsCards from './components/StatsCards.jsx';
import DocumentTable from './components/DocumentTable.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';

function App() {
  const [showNewDocToast, setShowNewDocToast] = useState(false);

  const handleNewDocument = () => {
    setShowNewDocToast(true);
    setTimeout(() => setShowNewDocToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar onNewDocument={handleNewDocument} />

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of documents, recipients and activity</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-gray-600 ring-1 ring-gray-200">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            Encryption on • SOC 2 • GDPR
          </div>
        </div>

        <StatsCards />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DocumentTable />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>

      {showNewDocToast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            New document flow coming soon
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
