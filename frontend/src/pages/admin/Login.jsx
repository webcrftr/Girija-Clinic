import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { HeartPulse, KeyRound, Mail, Lock } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect target
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    const result = await login(email, password, rememberMe);
    setLoading(false);

    if (result.success) {
      showToast('Authenticated successfully. Welcome back!', 'success');
      navigate(from, { replace: true });
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleForgotPassword = () => {
    showToast('Credentials recovery link sent to your registered clinic phone.', 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-200 font-sans cursor-default select-none">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[24px] shadow-2xl relative overflow-hidden">
        
        {/* Soft background gradients */}
        <div className="absolute -top-12 -right-12 h-32 w-32 bg-primary-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 h-32 w-32 bg-primary-500/15 rounded-full blur-2xl"></div>

        {/* Branding logo */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <div className="h-14 w-14 bg-primary-100 dark:bg-primary-950 text-primary-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary-500/10">
            <HeartPulse size={30} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Girija Clinic</h2>
          <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Admin Dashboard Login</p>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-none focus:border-primary-500 text-slate-850 dark:text-white transition-colors"
                placeholder="admin@girijaclinic.com"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] font-bold text-primary-500 hover:text-primary-650 transition"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-none focus:border-primary-500 text-slate-850 dark:text-white transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          {/* Remember me select */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 bg-transparent"
              />
              <span>Remember Me</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-400 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            {loading ? 'Verifying logs...' : 'Sign In to Portal'}
          </button>
        </form>

        {/* Setup advice notes */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 italic">
          Default seed credentials: <strong>admin@girijaclinic.com</strong> • Password: <strong>adminpassword123</strong>
        </div>

      </div>
    </div>
  );
}
