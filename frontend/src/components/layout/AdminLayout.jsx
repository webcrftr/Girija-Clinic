import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Search, User, HeartPulse } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useUI();
  const location = useLocation();
  const navigate = useNavigate();

  // Search States
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Instant searching
  useEffect(() => {
    if (searchVal.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      try {
        const patientsSnap = await getDocs(collection(db, "patients"));
        const allPatients = patientsSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        const term = searchVal.toLowerCase();
        const results = allPatients.filter(pat => 
          (pat.firstName + ' ' + pat.lastName).toLowerCase().includes(term) ||
          (pat.patientId || '').toLowerCase().includes(term) ||
          (pat.phone || '').toLowerCase().includes(term)
        );
        setSearchResults(results.slice(0, 5));
        setShowResults(true);
      } catch (err) {
        console.error('Instant search error:', err.message);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchVal]);

  const selectResult = (patientId) => {
    setSearchVal('');
    setShowResults(false);
    navigate(`/admin/patients/${patientId}`);
  };

  // Route Guard Spinner
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="text-center">
          <HeartPulse size={48} className="text-primary-500 animate-pulse mx-auto" />
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Loading Portal context...</p>
        </div>
      </div>
    );
  }

  // Not authenticated? Redirect to login page
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      {/* Main viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 transition-colors z-20">
          
          {/* Global Search Bar */}
          <div className="relative w-full max-w-md select-none" ref={dropdownRef}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search patient, blood record, ID or contacts..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => searchVal.trim().length > 0 && setShowResults(true)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-100 text-slate-700 placeholder-slate-400 rounded-xl focus:outline-none focus:border-primary-400 dark:bg-slate-800 dark:border-slate-800 dark:text-white dark:placeholder-slate-500 transition-all font-sans"
              />
            </div>

            {/* Live dropdown list results */}
            {showResults && (
              <div className="absolute left-0 mt-3 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                {isSearching ? (
                  <div className="p-4 text-center text-xs text-slate-400">Searching index records...</div>
                ) : searchResults.length > 0 ? (
                  <ul className="divide-y divide-slate-50 dark:divide-slate-800">
                    {searchResults.map(patient => (
                      <li key={patient.id}>
                        <button
                          onClick={() => selectResult(patient.id)}
                          className="w-full text-left px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary-950/20 flex items-center justify-between transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-xs text-slate-400">
                              ID: {patient.patientId} • Phone: {patient.phone}
                            </p>
                          </div>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 rounded-full">
                            Profile
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">No patient records matched the query.</div>
                )}
              </div>
            )}
          </div>

          {/* Nav Right Utilities */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl bg-slate-50 dark:bg-slate-800 transition"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile widget */}
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-150 dark:border-slate-800">
              <div className="p-2 bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400 rounded-xl">
                <User size={18} />
              </div>
              <div className="hidden sm:block text-left leading-none">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

        </header>

        {/* Workspace body content */}
        <main className="flex-grow overflow-y-auto p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
