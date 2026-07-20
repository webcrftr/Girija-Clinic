import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function NotFound() {
  const { settings } = useUI();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between transition-colors font-sans selection:bg-primary-500 selection:text-white">
      {/* Mini-Header for context */}
      <header className="h-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/60 rounded-xl text-primary-500">
            <HeartPulse size={24} className="animate-pulse" />
          </div>
          <span className="text-lg font-bold font-display text-slate-800 dark:text-white">
            {settings?.clinicName || 'Girija Clinic'}
          </span>
        </Link>
      </header>

      {/* Main Content Card */}
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="relative">
            {/* Animated background glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary-500/10 to-blue-500/10 blur-3xl rounded-full max-w-sm mx-auto h-48"></div>
            
            <div className="mx-auto w-24 h-24 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-3xl flex items-center justify-center shadow-xl shadow-red-500/5 dark:shadow-none animate-bounce">
              <ShieldAlert size={48} />
            </div>
            
            <h1 className="mt-8 text-8xl font-black font-display tracking-tight bg-gradient-to-r from-slate-900 via-primary-600 to-slate-800 dark:from-white dark:via-primary-400 dark:to-slate-200 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white font-display">
              Page Not Found
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              We couldn't find the page you're searching for. It might have been moved, deleted, or the URL might be entered incorrectly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-605/30 active:scale-95 flex items-center justify-center space-x-2"
            >
              <Home size={16} />
              <span>Back to Clinic Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-805 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-300 flex items-center justify-center space-x-2 active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </button>
          </div>

          <div className="text-xs text-slate-450">
            Need help? <Link to="/contact" className="text-primary-500 hover:underline">Contact clinic support</Link> or visit the <Link to="/admin" className="text-primary-500 hover:underline">Admin Portal</Link>.
          </div>
        </div>
      </main>

      {/* Mini-Footer */}
      <footer className="h-16 text-center text-xs text-slate-400 dark:text-slate-600 flex items-center justify-center border-t border-slate-100 dark:border-slate-900">
        &copy; {new Date().getFullYear()} {settings?.clinicName || 'Girija Clinic'}. All rights reserved.
      </footer>
    </div>
  );
}
