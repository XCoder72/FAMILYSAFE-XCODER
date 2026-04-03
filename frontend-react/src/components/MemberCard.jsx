import React from 'react';

export default function MemberCard() {
  const members = [
    { id: 1, name: 'Amit Sharma', role: 'Admin', battery: 14, connected: true, lastSeen: 'Just now' },
    { id: 2, name: 'Priya Mehta', role: 'Member', battery: 82, connected: true, lastSeen: 'Just now' },
    { id: 3, name: 'Rahul Verma', role: 'Member', battery: 48, connected: false, lastSeen: '15 mins ago' },
    { id: 4, name: 'Anil Singh', role: 'Member', battery: 100, connected: false, lastSeen: '2 hours ago' },
    { id: 5, name: 'Rajesh Malhotra', role: 'Member', battery: 65, connected: true, lastSeen: 'Just now' },
  ];

  const getBatteryColor = (level) => {
    if (level <= 20) return 'bg-rose-500';
    if (level <= 50) return 'bg-amber-400';
    return 'bg-emerald-400';
  };

  const getBatteryTrack = (level) => {
    if (level <= 20) return 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400';
    if (level <= 50) return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';
    return 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400';
  };

  return (
    <div className="p-6 transition-colors duration-500">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight transition-colors">Member Details</h3>
        <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50/80 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 px-4 py-2 rounded-xl transition-colors shadow-sm">
          View All Directory
        </button>
      </div>

      {/* Table Column Headers */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-3 border-b border-slate-100 dark:border-slate-700/50 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">
        <div className="col-span-5">Member Name</div>
        <div className="col-span-4">Battery Level</div>
        <div className="col-span-3">Connection Status</div>
      </div>

      {/* Member List */}
      <div className="mt-2 flex flex-col gap-1">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 transition-all duration-300 group cursor-default"
          >
            
            {/* 1. Name & Avatar */}
            <div className="col-span-5 flex items-center gap-4">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-100 dark:from-slate-700 to-slate-200 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-white font-black text-lg border-2 border-white dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {member.name.charAt(0)}
                </div>
                {member.role === 'Admin' && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white w-4 h-4 rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-slate-800">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white transition-colors">{member.name}</p>
                <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">{member.role}</p>
              </div>
            </div>

            {/* 2. Battery Level */}
            <div className="col-span-4 flex items-center gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner dark:shadow-none ${getBatteryTrack(member.battery)}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {member.battery <= 20 ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )}
                </svg>
              </div>
              
              <div className="flex-1 max-w-[120px]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-black text-slate-600 dark:text-slate-300">{member.battery}%</span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">{member.battery <= 20 ? 'Low' : 'Good'}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner dark:shadow-none">
                  <div className={`h-full rounded-full ${getBatteryColor(member.battery)} transition-all duration-1000`} style={{ width: `${member.battery}%` }}></div>
                </div>
              </div>
            </div>

            {/* 3. Connection Status & Actions */}
            <div className="col-span-3 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm dark:shadow-none transition-colors">
                {member.connected ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Connected</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-rose-400 dark:bg-rose-500"></span>
                    <span className="text-xs font-bold text-rose-500 dark:text-rose-400">Disconnected</span>
                  </>
                )}
              </div>
              
              <button className="text-slate-300 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}