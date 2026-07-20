import React from 'react';

export default function DashboardCard({ title, value, icon: Icon, growth, growthType = 'increase', isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl animate-pulse select-none">
        <div className="flex justify-between items-start">
          <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded mt-4"></div>
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover-card hover:border-primary-150 dark:hover:border-primary-950 flex flex-col justify-between select-none">
      <div className="flex justify-between items-start">
        <span className="text-slate-400 dark:text-slate-500 text-sm font-semibold tracking-tight">
          {title}
        </span>
        <div className="p-3 bg-primary-50 text-primary-500 dark:bg-primary-950/65 dark:text-primary-400 rounded-xl">
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4">
        <span className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white font-display">
          {value}
        </span>
      </div>

      {growth !== undefined && (
        <div className="mt-2.5 flex items-center space-x-1.5 text-xs font-semibold">
          <span className={`px-2 py-0.5 rounded-full ${
            growth >= 0 
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' 
              : 'bg-red-50 text-red-650 dark:bg-red-950/40 dark:text-red-400'
          }`}>
            {growth >= 0 ? `+${growth}%` : `${growth}%`}
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
}
