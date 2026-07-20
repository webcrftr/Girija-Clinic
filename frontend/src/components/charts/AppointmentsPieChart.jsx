import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function AppointmentsPieChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="h-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-center animate-pulse">
        <div className="text-sm text-slate-400">Loading appointments ratio...</div>
      </div>
    );
  }

  // Colors mapping: Pending (Yellow/Blue), Completed (Green), Cancelled (Red)
  const COLORS = ['#3B82F6', '#10B981', '#EF4444'];

  const isEmpty = data.every(item => item.value === 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between select-none">
      <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 font-display">
        Appointment Status Distribution
      </h3>

      <div className="h-64 w-full flex items-center justify-center relative">
        {isEmpty ? (
          <div className="text-center text-sm text-slate-400">No scheduled appointments logged yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  color: '#fff', 
                  fontSize: '12px' 
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
