import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function NotFound() {
  const { settings } = useUI();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between transition-colors font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Header */}
      <header className="h-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#E2E8F0]">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-sm">
            <HeartPulse size={20} />
          </div>
          <span className="text-lg font-bold font-display text-[#0F172A] tracking-tight">
            {settings?.clinicName || 'Girija Clinic'}
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-20 bg-[#F5F8FD]">
        <div className="max-w-xl w-full text-center space-y-8 bg-white p-10 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-soft">
          <div className="mx-auto w-20 h-20 bg-red-50 text-red-500 border border-red-100 rounded-2xl flex items-center justify-center shadow-subtle">
            <ShieldAlert size={40} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-7xl font-extrabold font-display tracking-tight text-[#0F172A]">
              404
            </h1>
            <h2 className="text-2xl font-bold text-[#0F172A] font-display">
              Page Not Found
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed font-normal">
              We couldn't find the medical page you were looking for. It may have been relocated or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/"
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full transition-all shadow-sm flex items-center justify-center space-x-2 active:scale-95"
            >
              <Home size={16} />
              <span>Back to Clinic Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-bold text-[#0F172A] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-full transition duration-200 flex items-center justify-center space-x-2 active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </button>
          </div>

          <div className="text-xs text-[#64748B]">
            Need help? <Link to="/contact" className="text-[#2563EB] font-semibold hover:underline">Contact clinic desk</Link> or visit the <Link to="/admin" className="text-[#2563EB] font-semibold hover:underline">Admin Portal</Link>.
          </div>
        </div>
      </main>

      {/* Mini-Footer */}
      <footer className="h-16 text-center text-xs text-[#64748B] flex items-center justify-center border-t border-[#E2E8F0]">
        &copy; {new Date().getFullYear()} {settings?.clinicName || 'Girija Clinic'}. All rights reserved.
      </footer>
    </div>
  );
}
