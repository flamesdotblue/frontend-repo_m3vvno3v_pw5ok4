import React from 'react';
import { Plus, Search, Bell, User, FileText } from 'lucide-react';

export default function Navbar({ onNewDocument, onCreateTemplate, onUseTemplate }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <FileText className="w-6 h-6 text-indigo-600" />
          <span>Signify</span>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border w-[320px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            className="bg-transparent outline-none w-full text-sm"
            placeholder="Search documents, templates..."
          />
        </div>
        <div className="flex-1 md:flex-none" />
        <div className="flex items-center gap-2">
          <button
            onClick={onNewDocument}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" /> New document
          </button>
          <div className="relative group">
            <button className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-sm">
              Templates
            </button>
            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
              <button onClick={onCreateTemplate} className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">Create template</button>
              <button onClick={onUseTemplate} className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">Use template</button>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-100">
            <Bell className="w-5 h-5 text-slate-500" />
          </button>
          <button className="p-2 rounded-full bg-slate-100">
            <User className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
