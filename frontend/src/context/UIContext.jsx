import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('girija_theme');
    if (saved) return saved;
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {}
  });

  // Global settings state
  const [settings, setSettings] = useState({
    clinicName: 'Girija Clinic',
    doctorName: 'Dr. Girija Prasad',
    logo: '',
    address: '123 Healthcare Ave, Medical District, Suite 100',
    phone: '+1 (555) 019-2834',
    email: 'contact@girijaclinic.com',
    openingHours: 'Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)'
  });

  // Initialize theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('girija_theme', theme);
  }, [theme]);

  // Load clinic settings on initialization
  const fetchSettings = async () => {
    try {
      const docRef = doc(db, "settings", "clinic_settings");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSettings(snap.data());
      } else {
        // Option to pre-populate default settings in Firestore
        await setDoc(docRef, settings);
      }
    } catch (err) {
      console.error('Failed to load clinic settings:', err.message);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Toast controllers
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Confirmation dialog controller
  const triggerConfirm = ({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm }) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: () => {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
          onConfirm && onConfirm();
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
          resolve(false);
        }
      });
    });
  };

  const closeConfirm = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <UIContext.Provider value={{
      theme,
      toggleTheme,
      toasts,
      showToast,
      removeToast,
      confirmDialog,
      triggerConfirm,
      closeConfirm,
      settings,
      refreshSettings: fetchSettings
    }}>
      {children}
      
      {/* Global Confirmation Dialog Portal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md scale-95 transform rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white font-display">
              {confirmDialog.title}
            </h3>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
              {confirmDialog.message}
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={confirmDialog.onCancel}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {confirmDialog.cancelText}
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-500/20"
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toasts Portal */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col space-y-3 max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-xl shadow-xl transition-all transform translate-y-0 duration-300 border ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-250 text-emerald-800 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-200' 
                : toast.type === 'error'
                ? 'bg-red-50 border-red-250 text-red-800 dark:bg-red-950/90 dark:border-red-800 dark:text-red-200'
                : 'bg-blue-50 border-blue-250 text-blue-800 dark:bg-blue-950/90 dark:border-blue-800 dark:text-blue-200'
            }`}
          >
            <div className="mr-3 font-semibold text-lg">
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠️' : 'ℹ'}
            </div>
            <div className="text-sm font-medium">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold leading-none p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
export default UIContext;
