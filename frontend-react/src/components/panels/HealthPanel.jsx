import React, { useState, useEffect } from 'react';

// ✨ liveMemberData ensures the UI reacts instantly to the Simulation buttons
export default function HealthPanel({ isTestMode, liveMemberData }) {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ avgBpm: 0, avgSpo2: 0, healthIndex: 92 });

  useEffect(() => {
    const fetchHealthData = async () => {
      const rawUser = localStorage.getItem('familySafeUser');
      if (!rawUser) return;
      const { familyCode } = JSON.parse(rawUser);

      // Skip if not registered yet
      if (!familyCode) return;

      try {
        // ✨ UPDATED: Pointing to your live Render API
        const res = await fetch(`https://familysafe-xcoder.onrender.com/api/family-members/${familyCode}`);
        const data = await res.json();
        if (data.success) {
          setMembers(data.members);
        }
      } catch (err) {
        console.error("Health Sync Error:", err);
      }
    };

    fetchHealthData();
    // 🔄 Sync health data every 3 seconds
    const interval = setInterval(fetchHealthData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🛠️ MERGE LOGIC: Prioritize 'liveMemberData' (simulation) over 'members' (polled)
  const displayMembers = members.map(m => 
    (m.phone === liveMemberData?.phone) ? liveMemberData : m
  );

  // ✨ IDENTIFY CRITICAL ALERTS
  const healthAlerts = displayMembers.filter(m => 
    m.status === 'FALL_ALERT' || m.status === 'SOS' || (m.vitals?.heartRate > 120)
  );

  // ✨ CALCULATE ANALYTICS
  useEffect(() => {
    if (displayMembers.length > 0) {
      const totalBpm = displayMembers.reduce((acc, m) => {
        // Logic: Use simulated BPM if in alert, otherwise use actual DB value
        const hr = (m.status === 'FALL_ALERT' || m.status === 'SOS') ? 124 : (m.vitals?.heartRate || 72);
        return acc + hr;
      }, 0);
      
      const totalSpo2 = displayMembers.reduce((acc, m) => acc + (m.vitals?.spo2 || 98), 0);
      
      setStats({
        avgBpm: Math.round(totalBpm / displayMembers.length),
        avgSpo2: Math.round(totalSpo2 / displayMembers.length),
        healthIndex: healthAlerts.length > 0 ? (92 - (healthAlerts.length * 20)) : 92 
      });
    }
  }, [displayMembers, healthAlerts.length]);

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🚀 AICTE BOOTCAMP TIP: The color of this banner shifting proves the system works! */}
      <div className={`rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl transition-all duration-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${healthAlerts.length > 0 ? 'bg-linear-to-r from-rose-600 to-rose-800' : 'bg-linear-to-r from-emerald-500 to-teal-700'}`}>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center shrink-0 backdrop-blur-md">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Biometric Stream</h2>
            <p className="text-white/80 font-medium mt-1">Syncing with {displayMembers.length} active nodes</p>
          </div>
        </div>
        
        <div className="relative z-10 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 flex items-center gap-4">
          <div className="text-right">
            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Node Status</p>
            <p className="text-xl font-black text-white">{healthAlerts.length > 0 ? 'INTERVENTION' : 'SECURE'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-white`}></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Health Index</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className={`text-4xl font-black ${healthAlerts.length > 0 ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>{stats.healthIndex}</span>
            <span className="text-sm text-slate-400 font-bold mb-1">/ 100</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Network HR</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className={`text-4xl font-black tracking-tight ${healthAlerts.length > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-800 dark:text-white'}`}>
              {stats.avgBpm}
            </span>
            <span className="text-rose-500 font-bold text-sm mb-1">BPM</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Global SpO2</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-4xl font-black text-slate-800 dark:text-white">{stats.avgSpo2}</span>
            <span className="text-sky-500 font-bold text-sm mb-1">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Detailed List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-8 tracking-tight">Active Node Vitals</h3>
            <div className="space-y-4">
              {displayMembers.map(member => {
                const isUserAlert = (member.status === 'FALL_ALERT' || member.status === 'SOS');
                return (
                  <div key={member._id} className={`rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between border transition-all duration-500 ${isUserAlert ? 'bg-rose-50 border-rose-200 animate-pulse' : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50'}`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black shadow-lg ${isUserAlert ? 'bg-rose-600 rotate-3' : 'bg-slate-900'}`}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 dark:text-white text-lg">{member.name}</p>
                        <p className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg mt-1 inline-block ${isUserAlert ? 'bg-rose-600 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
                          {isUserAlert ? 'Emergency' : 'Stable Stream'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-10 items-center mt-6 sm:mt-0">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Pulse</p>
                        <p className={`font-black text-xl ${isUserAlert ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>
                          {isUserAlert ? 124 : (member.vitals?.heartRate || 72)} <span className="text-[10px] font-bold">BPM</span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Oxygen</p>
                        <p className="font-black text-slate-800 dark:text-white text-xl">
                          {member.vitals?.spo2 || 98} <span className="text-[10px] font-bold">%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Warning Feed */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-8">Incident Feed</h3>
          
          <div className="space-y-4">
            {healthAlerts.length > 0 ? (
              healthAlerts.map(alertMember => (
                <div key={alertMember._id} className="relative bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 p-5 rounded-3xl animate-fade-in">
                  <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <p className="text-sm font-black text-rose-700 dark:text-white uppercase tracking-tighter">Critical: {alertMember.status}</p>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed mt-2 italic">
                    Node {alertMember.name} reported a sudden vitals deviation. Immediate contact recommended.
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 opacity-20">
                <svg className="w-16 h-16 mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <p className="text-xs font-black uppercase tracking-widest text-center leading-relaxed">No anomalies detected<br/>Network is secure</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}