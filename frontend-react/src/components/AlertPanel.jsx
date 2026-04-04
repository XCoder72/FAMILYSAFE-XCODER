import React from 'react';

export default function AlertPanel({ memberData }) {
  // ✨ Check if there is an active simulation alert
  const hasAlert = memberData && memberData.status !== 'Online';
  
  // Logic to determine alert level and details based on real simulation status
  const getAlertDetails = () => {
    if (!hasAlert) return null;

    if (memberData.status === 'FALL_ALERT') {
      return {
        level: 1,
        type: 'location',
        title: memberData.name || 'User',
        description: 'Critical: Fall detected via BLE accelerometer.',
        time: 'Just now',
        action: 'View Live Location'
      };
    }
    if (memberData.status === 'SOS') {
      return {
        level: 1,
        type: 'network',
        title: memberData.name || 'User',
        description: 'Emergency SOS signal manually triggered.',
        time: 'Just now',
        action: 'Contact Emergency'
      };
    }
    return null;
  };

  const alert = getAlertDetails();

  const getAlertStyles = (level) => {
    switch(level) {
      case 1: 
        return { 
          bg: 'bg-rose-50/50 dark:bg-rose-900/10 hover:bg-rose-50 dark:hover:bg-rose-900/20', 
          border: 'border-rose-100 dark:border-rose-500/20', 
          bar: 'bg-rose-500', 
          iconBg: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
          text: 'text-rose-700 dark:text-white' 
        };
      default: 
        return { 
          bg: 'bg-slate-50/50 dark:bg-slate-800/40', 
          border: 'border-slate-100', 
          bar: 'bg-emerald-400', 
          iconBg: 'bg-emerald-100 text-emerald-600',
          text: 'text-slate-700 dark:text-white'
        };
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'location': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
      case 'network': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default: return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  return (
    <div className="flex flex-col h-full transition-colors duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          Alert Panel
        </h3>
        {hasAlert && (
          <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide animate-pulse shadow-sm">
            1 Critical
          </span>
        )}
      </div>

      {/* Scrollable Alerts List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {hasAlert && alert ? (
          <div className="relative group">
            <p className="text-[10px] font-extrabold text-rose-500 dark:text-rose-400 uppercase tracking-widest mb-2 ml-2">Level 1 - Critical</p>

            {/* Alert Card */}
            <div className={`relative overflow-hidden ${getAlertStyles(alert.level).bg} border ${getAlertStyles(alert.level).border} p-4 rounded-2xl transition-all duration-300 group-hover:shadow-md cursor-pointer`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getAlertStyles(alert.level).bar}`}></div>
              
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getAlertStyles(alert.level).iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(alert.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className={`text-sm font-bold ${getAlertStyles(alert.level).text}`}>{alert.title}</p>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap ml-2">{alert.time}</p>
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                    {alert.description}
                  </p>
                  
                  <button className="flex items-center gap-1 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 px-2 py-1 rounded uppercase tracking-wider transition-colors border border-transparent dark:border-rose-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-40">
             <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No Active Alerts</p>
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
        <button className="w-full py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-all text-xs uppercase tracking-wider">
          Acknowledge All Alerts
        </button>
      </div>

    </div>
  );
}