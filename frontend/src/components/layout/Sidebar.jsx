import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  FileText, 
  FolderHeart, 
  Settings, 
  LogOut, 
  HeartPulse
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const { triggerConfirm, showToast, settings } = useUI();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Patients', path: '/admin/patients', icon: Users },
    { name: 'Appointments', path: '/admin/appointments', icon: CalendarDays },
    { name: 'Prescriptions', path: '/admin/prescriptions', icon: FileText },
    { name: 'Medical Reports', path: '/admin/reports', icon: FolderHeart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    const confirm = await triggerConfirm({
      title: 'Confirm Logout',
      message: 'Are you sure you want to end your active administrator session?',
      confirmText: 'Logout',
      cancelText: 'Cancel'
    });

    if (confirm) {
      logout();
      showToast('Logged out successfully', 'info');
      navigate('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col shrink-0 min-h-screen border-r border-slate-800 transition-all font-sans select-none">
      {/* Brand logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-white">
          <HeartPulse size={24} className="text-primary-400 animate-pulse" />
          <span className="text-lg font-bold font-display tracking-tight whitespace-nowrap">
            {settings?.clinicName} Admin
          </span>
        </div>
      </div>

      {/* Nav menus */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} className="shrink-0 transition-transform group-hover:scale-105" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-950/30 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
