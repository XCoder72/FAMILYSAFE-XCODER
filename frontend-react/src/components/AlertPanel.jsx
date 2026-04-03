import React from 'react';

export default function AlertPanel() {
  const alerts = [
    { id: 1, level: 1, title: 'Amit Sharma', description: 'Strayed from designated safe route.', time: 'Just now', type: 'location', action: 'Live Camera' },
    { id: 2, level: 2, title: 'Priya Mehta', description: 'Device battery critically low (14%).', time: '12 mins ago', type: 'battery' },
    { id: 3, level: 3, title: 'Rahul Verma', description: 'Safely arrived at School zone.', time: '45 mins ago', type: 'safe' },
    { id: 4, level: 3, title: 'Anil Singh', description: 'Disconnected from network.', time: '2 hours ago', type: 'network' }
  ];

  const getAlertStyles = (level) => {
    switch(level) {
      case 1: 
        return { 
          bg: 'bg-rose-50/50 dark:bg-rose-900/10 hover:bg-rose-50 dark:hover:bg-rose-900/20', 
          border: 'border-rose-100 dark:border-rose-500/20', 
          bar: 'bg-rose-500', 
          iconBg: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
          text: 'text-rose-700 dark:text-white' // ✨ Title turns white in dark mode
        };
      case 2: 
        return { 
          bg: 'bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-50 dark:hover:bg-amber-900/20', 
          border: 'border-amber-100 dark:border-amber-500/20', 
          bar: 'bg-amber-400', 
          iconBg: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
          text: 'text-amber-700 dark:text-white' // ✨ Title turns white in dark mode
        };
      default: 
        return { 
          bg: 'bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60', 
          border: 'border-slate-100 dark:border-slate-700/50', 
          bar: 'bg-emerald-400 dark:bg-emerald-500', 
          iconBg: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
          text: 'text-slate-700 dark:text-white' // ✨ Title turns white in dark mode
        };
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'location': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
      case 'battery': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      case 'safe': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'network': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg>;
      default: return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  return (
    <div className="flex flex-col h-full transition-colors duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2 transition-colors">
          Alert Panel
        </h3>
        <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide animate-pulse shadow-sm dark:shadow-none">
          1 Critical
        </span>
      </div>

      {/* Scrollable Alerts List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.level);
          
          return (
            <div key={alert.id} className="relative group">
              {alert.id === 1 && <p className="text-[10px] font-extrabold text-rose-500 dark:text-rose-400 uppercase tracking-widest mb-2 ml-2">Level 1 - Critical</p>}
              {alert.id === 2 && <p className="text-[10px] font-extrabold text-amber-500 dark:text-amber-400 uppercase tracking-widest mt-6 mb-2 ml-2">Level 2 - Warning</p>}
              {alert.id === 3 && <p className="text-[10px] font-extrabold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mt-6 mb-2 ml-2">Level 3 - Info</p>}

              {/* Alert Card */}
              <div className={`relative overflow-hidden ${styles.bg} border ${styles.border} p-4 rounded-2xl transition-all duration-300 group-hover:shadow-md dark:group-hover:shadow-none group-hover:-translate-y-0.5 cursor-pointer`}>
                
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bar}`}></div>
                
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner dark:shadow-none shrink-0 ${styles.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    {getIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className={`text-sm font-bold ${styles.text}`}>{alert.title}</p>
                      <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap ml-2">{alert.time}</p>
                    </div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                      {alert.description}
                    </p>
                    
                    {alert.action && (
                      <button className="flex items-center gap-1 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 px-2 py-1 rounded uppercase tracking-wider transition-colors border border-transparent dark:border-rose-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        {alert.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Button */}
      <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <button className="w-full py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-all text-xs uppercase tracking-wider shadow-sm dark:shadow-none">
          Acknowledge All Alerts
        </button>
      </div>

    </div>
  );
}