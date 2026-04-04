import React, { useState, useEffect } from 'react';

// ✨ Added liveMemberData prop for instant simulation response
export default function HealthPanel({ isTestMode, liveMemberData }) {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ avgBpm: 0, avgSpo2: 0, healthIndex: 92 });

  useEffect(() => {
    const fetchHealthData = async () => {
      const rawUser = localStorage.getItem('familySafeUser');
      if (!rawUser) return;
      const { familyCode } = JSON.parse(rawUser);

      try {
        const res = await fetch(`http://localhost:5000/api/family-members/${familyCode}`);
        const data = await res.json();
        if (data.success) {
          setMembers(data.members);
        }
      } catch (err) {
        console.error("Health Fetch Error:", err);
      }
    };

    fetchHealthData();
    const interval = setInterval(fetchHealthData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🛠️ LOGIC: Merge the instant 'liveMemberData' into the polled 'members' list 
  // This ensures that as soon as you click the button, the list updates.
  const displayMembers = members.map(m => 
    (m.phone === liveMemberData?.phone) ? liveMemberData : m
  );

  // ✨ Calculate Alerts based on the merged list
  const healthAlerts = isTestMode 
    ? displayMembers.filter(m => m.status === 'FALL_ALERT' || m.status === 'SOS') 
    : [];

  // ✨ Calculate Averages with Spikes
  useEffect(() => {
    if (displayMembers.length > 0) {
      const totalBpm = displayMembers.reduce((acc, m) => {
        // If it's an alert in test mode, spike the HR contribution to 124
        const hr = (isTestMode && (m.status === 'FALL_ALERT' || m.status === 'SOS')) ? 124 : (m.vitals?.heartRate || 72);
        return acc + hr;
      }, 0);
      
      const totalSpo2 = displayMembers.reduce((acc, m) => acc + (m.vitals?.spo2 || 98), 0);
      
      setStats({
        avgBpm: Math.round(totalBpm / displayMembers.length),
        avgSpo2: Math.round(totalSpo2 / displayMembers.length),
        healthIndex: healthAlerts.length > 0 ? 64 : 92 // Index drops during alert
      });
    }
  }, [displayMembers, isTestMode, healthAlerts.length]);

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Top Banner */}
      <div className={`rounded-[2rem] p-8 relative overflow-hidden shadow-lg transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${healthAlerts.length > 0 ? 'bg-gradient-to-r from-rose-600 to-rose-700' : 'bg-gradient-to-r from-emerald-500 to-teal-600'}`}>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center shrink-0 backdrop-blur-md">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Family Vitals Online</h2>
            <p className="text-white/80 font-medium mt-1">Actively monitoring {displayMembers.length} members</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 flex items-center gap-4">
          <div className="text-right">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Network Health</p>
            <p className="text-xl font-black text-white">{healthAlerts.length > 0 ? 'Action Required' : 'Optimal'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${healthAlerts.length > 0 ? 'bg-white' : 'bg-emerald-200'}`}></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Health Index</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className={`text-4xl font-black ${healthAlerts.length > 0 ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>{stats.healthIndex}</span>
            <span className="text-lg text-slate-400 font-medium mb-1">/ 100</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Avg Heart Rate</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className={`text-4xl font-black tracking-tight ${healthAlerts.length > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-800 dark:text-white'}`}>
              {stats.avgBpm}
            </span>
            <span className="text-rose-500 font-medium mb-1">BPM</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Avg SpO2 Level</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white">{stats.avgSpo2}</span>
            <span className="text-sky-500 font-medium mb-1">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Live List */}
        <div className="xl:col-span-2">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Live Member Vitals</h3>
            <div className="space-y-4">
              {displayMembers.map(member => {
                const isUserAlert = isTestMode && (member.status === 'FALL_ALERT' || member.status === 'SOS');
                const displayHR = isUserAlert ? 124 : (member.vitals?.heartRate || 72);
                
                return (
                  <div key={member._id} className={`rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between border transition-all duration-300 ${isUserAlert ? 'bg-rose-50 border-rose-200 animate-pulse' : 'bg-slate-50/50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-700/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black border-2 border-white ${isUserAlert ? 'bg-rose-500' : 'bg-blue-500'}`}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{member.name}</p>
                        <p className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md mt-1 inline-block ${isUserAlert ? 'bg-rose-600 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
                          {isUserAlert ? 'Emergency' : 'Stable'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-8 items-center mt-4 sm:mt-0">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Heart</p>
                        <p className={`font-black text-lg ${isUserAlert ? 'text-rose-600' : 'text-slate-700 dark:text-white'}`}>
                          {displayHR} <span className="text-xs font-medium">BPM</span>
                        </p>
                      </div>
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Oxygen</p>
                        <p className="font-black text-slate-700 dark:text-white text-lg">
                          {member.vitals?.spo2 || 98} <span className="text-xs font-medium">%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Health Alerts - ✨ FIXED: Now reacts instantly */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Health Alerts</h3>
            {healthAlerts.length > 0 && (
              <span className="bg-rose-100 text-rose-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase animate-pulse">
                {healthAlerts.length} Critical
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {healthAlerts.length > 0 ? (
              healthAlerts.map(alertMember => (
                <div key={alertMember._id} className="relative overflow-hidden bg-rose-50 dark:bg-rose-900/20 border border-rose-200 p-4 rounded-2xl transition-all animate-bounce-short">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                  <p className="text-sm font-bold text-rose-700 dark:text-white uppercase tracking-tighter">Abnormal Vitals</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    {alertMember.name}'s BPM jumped to <span className="font-black text-rose-600">124</span>. Possible {alertMember.status === 'FALL_ALERT' ? 'Fall Impact' : 'Distress'}.
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 opacity-30">
                <svg className="w-12 h-12 mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-[10px] font-black uppercase tracking-widest">System Stable</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}