import React from 'react';

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="px-4 py-3 border-b">
        <h3 className="font-semibold text-slate-800">Activity</h3>
      </div>
      <ul className="divide-y">
        {activities?.length ? (
          activities.map((a) => (
            <li key={a.id} className="px-4 py-3">
              <div className="text-sm text-slate-800">{a.message}</div>
              <div className="text-xs text-slate-500 mt-1">{new Date(a.created_at || a.updated_at || Date.now()).toLocaleString()}</div>
            </li>
          ))
        ) : (
          <li className="px-4 py-6 text-center text-slate-500 text-sm">No recent activity</li>
        )}
      </ul>
    </div>
  );
}
