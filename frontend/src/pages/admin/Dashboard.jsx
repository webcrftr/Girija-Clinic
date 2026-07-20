import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import DashboardCard from '../../components/DashboardCard';
import PatientGrowthChart from '../../components/charts/PatientGrowthChart';
import AppointmentsPieChart from '../../components/charts/AppointmentsPieChart';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { settings, showToast } = useUI();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    metrics: {
      totalPatients: 0,
      todaysPatients: 0,
      appointmentsToday: 0,
      pendingAppointments: 0,
      growthPercentage: 0
    },
    recent: {
      patients: [],
      appointments: []
    },
    charts: {
      monthlyTrends: [],
      appointmentsDistribution: []
    }
  });

  const getDashboardData = async () => {
    try {
      // 1. Fetch Patients
      const patientsSnap = await getDocs(collection(db, "patients"));
      const allPatients = patientsSnap.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      const patientsMap = {};
      allPatients.forEach(pat => {
        patientsMap[pat.id] = pat;
      });

      // 2. Fetch Appointments
      const appointmentsSnap = await getDocs(collection(db, "appointments"));
      const allAppointments = appointmentsSnap.docs.map(docSnap => ({
        _id: docSnap.id,
        ...docSnap.data()
      }));

      // 3. Compute Metrics
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      const totalPatients = allPatients.length;
      
      const todaysPatients = allPatients.filter(pat => {
        const createdDate = pat.createdAt?.toDate ? pat.createdAt.toDate() : new Date(pat.createdAt || now);
        return createdDate.toISOString().split('T')[0] === todayStr;
      }).length;

      const appointmentsToday = allAppointments.filter(app => {
        if (!app.appointmentDate) return false;
        const appDateStr = new Date(app.appointmentDate).toISOString().split('T')[0];
        return appDateStr === todayStr;
      }).length;

      const pendingAppointments = allAppointments.filter(app => app.status === 'Pending').length;

      // growth percentage based on registrations in last 30 days
      const patientsLast30Days = allPatients.filter(pat => {
        const created = pat.createdAt?.toDate ? pat.createdAt.toDate() : new Date(pat.createdAt || now);
        const diff = (now - created) / (1000 * 60 * 60 * 24);
        return diff <= 30;
      }).length;
      const growthPercentage = Math.round((patientsLast30Days / Math.max(1, totalPatients)) * 100);

      // Recent Patients & Appointments
      const recentPatientsSorted = [...allPatients].sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || now);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || now);
        return dateB - dateA;
      }).slice(0, 5);

      const recentAppointmentsSorted = [...allAppointments].map(app => ({
        ...app,
        patient: patientsMap[app.patientId] || null
      })).sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)).slice(0, 5);

      // Charts datasets
      const monthlyTrendsMap = {};
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthName = d.toLocaleString('default', { month: 'short' });
        monthlyTrendsMap[monthName] = 0;
      }
      allPatients.forEach(pat => {
        const created = pat.createdAt?.toDate ? pat.createdAt.toDate() : new Date(pat.createdAt || now);
        const monthName = created.toLocaleString('default', { month: 'short' });
        if (monthlyTrendsMap[monthName] !== undefined) {
          monthlyTrendsMap[monthName]++;
        }
      });
      const monthlyTrends = Object.keys(monthlyTrendsMap).map(name => ({
        name,
        patients: monthlyTrendsMap[name]
      }));

      const distributionMap = { Pending: 0, Completed: 0, Cancelled: 0 };
      allAppointments.forEach(app => {
        const status = app.status || 'Pending';
        if (distributionMap[status] !== undefined) {
          distributionMap[status]++;
        }
      });
      const appointmentsDistribution = Object.keys(distributionMap).map(status => ({
        name: status,
        value: distributionMap[status]
      }));

      setStats({
        metrics: {
          totalPatients,
          todaysPatients,
          appointmentsToday,
          pendingAppointments,
          growthPercentage
        },
        recent: {
          patients: recentPatientsSorted,
          appointments: recentAppointmentsSorted
        },
        charts: {
          monthlyTrends,
          appointmentsDistribution
        }
      });

    } catch (err) {
      console.error(err);
      showToast('Failed to fetch dashboard stats.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
      case 'Cancelled': return 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400';
      default: return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-8 select-none font-sans text-left">
      
      {/* Greeting Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
            Welcome back, {settings?.doctorName}
          </h1>
          <p className="text-xs font-medium text-slate-400 mt-1">
            Here is the clinical overview and scheduled queues for today.
          </p>
        </div>
        <Link
          to="/admin/patients?create=true"
          className="flex items-center space-x-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition text-xs font-semibold shadow-lg shadow-primary-500/20 active:scale-95"
        >
          <UserPlus size={16} />
          <span>Add Patient Record</span>
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="TOTAL PATIENTS"
          value={stats.metrics.totalPatients}
          icon={Users}
          growth={stats.metrics.growthPercentage}
          isLoading={loading}
        />
        <DashboardCard
          title="TODAY'S VISITS"
          value={stats.metrics.appointmentsToday}
          icon={CalendarCheck}
          isLoading={loading}
        />
        <DashboardCard
          title="PENDING QUEUE"
          value={stats.metrics.pendingAppointments}
          icon={Clock}
          isLoading={loading}
        />
        <DashboardCard
          title="NEW PATIENTS TODAY"
          value={stats.metrics.todaysPatients}
          icon={UserPlus}
          isLoading={loading}
        />
      </div>

      {/* 2 Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientGrowthChart data={stats.charts.monthlyTrends} isLoading={loading} />
        </div>
        <div>
          <AppointmentsPieChart data={stats.charts.appointmentsDistribution} isLoading={loading} />
        </div>
      </div>

      {/* Table Logs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Registered Patients list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Recent Patient Files
              </h3>
              <Link to="/admin/patients" className="text-xs font-bold text-primary-500 hover:text-primary-650 flex items-center space-x-1">
                <span>View All</span>
                <ChevronRight size={14} />
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-full"></div>)}
              </div>
            ) : stats.recent.patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase pb-3">
                      <th className="py-2.5">Patient ID</th>
                      <th className="py-2.5">Name</th>
                      <th className="py-2.5">Phone</th>
                      <th className="py-2.5 text-right">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {stats.recent.patients.map(pat => (
                      <tr key={pat.id} className="text-slate-700 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                        <td className="py-3 font-semibold text-primary-650 dark:text-primary-400">
                          <Link to={`/admin/patients/${pat.id}`}>{pat.patientId}</Link>
                        </td>
                        <td className="py-3 font-semibold text-slate-800 dark:text-white">
                          {pat.firstName} {pat.lastName}
                        </td>
                        <td className="py-3 font-mono">{pat.phone}</td>
                        <td className="py-3 text-right text-slate-400 font-semibold">{formatDate(pat.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">No patient files registered yet.</div>
            )}
          </div>
        </div>

        {/* Recent scheduled appointments list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Recent Queue Sessions
              </h3>
              <Link to="/admin/appointments" className="text-xs font-bold text-primary-500 hover:text-primary-650 flex items-center space-x-1">
                <span>View All</span>
                <ChevronRight size={14} />
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse w-full"></div>)}
              </div>
            ) : stats.recent.appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase pb-3">
                      <th className="py-2.5">Patient</th>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Time Slot</th>
                      <th className="py-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {stats.recent.appointments.map(app => (
                      <tr key={app._id} className="text-slate-700 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                        <td className="py-3 font-semibold text-slate-800 dark:text-white">
                          <Link to={`/admin/patients/${app.patient?._id}`} className="hover:text-primary-500">
                            {app.patient?.firstName} {app.patient?.lastName}
                          </Link>
                        </td>
                        <td className="py-3 font-semibold text-slate-400">{formatDate(app.appointmentDate)}</td>
                        <td className="py-3 font-medium text-slate-600 dark:text-slate-450">{app.timeSlot}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">No scheduled sessions queued.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
