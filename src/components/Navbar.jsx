import React from 'react';
import { Shield, Search, Bell, Settings, User, Plus, Upload } from 'lucide-react';

const Navbar = ({ onNewDocument }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">SignFlow</p>
            <p className="text-xs text-gray-500">Secure e-sign dashboard</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents, recipients, templates..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onNewDocument}
            className="hidden items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 md:flex"
          >
            <Plus className="h-4 w-4" /> New
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 md:hidden">
            <Upload className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <Settings className="h-5 w-5" />
          </button>
          <div className="ml-1 flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pl-2">
            <div className="hidden text-right md:block">
              <p className="text-xs font-medium text-gray-900">Alex Johnson</p>
              <p className="text-[10px] text-gray-500">Admin</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
