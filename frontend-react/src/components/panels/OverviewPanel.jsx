import React, { useState, useEffect } from 'react';
import MemberCard from '../MemberCard';
import AlertPanel from '../AlertPanel';

export default function OverviewPanel({ memberData }) {
  const [familyStats, setFamilyStats] = useState({ total: 0, online: 0 });
  const [realMembers, setRealMembers] = useState([]); 

  useEffect(() => {
    const fetchFamilyData = async () => {
      const rawUser = localStorage.getItem('familySafeUser');
      if (!rawUser) return;
      const { familyCode } = JSON.parse(rawUser);

      try {
        const res = await fetch(`http://localhost:5000/api/family-members/${familyCode}`);
        const data = await res.json();
        if (data.success) {
          setRealMembers(data.members); 
          const total = data.members.length;
          const online = data.members.filter(m => 
            m.status === 'Online' || m.status === 'FALL_ALERT' || m.status === 'SOS'
          ).length;
          setFamilyStats({ total, online });
        }
      } catch (err) {
        console.error("Data Fetch Error:", err);
      }
    };

    fetchFamilyData();
    const interval = setInterval(fetchFamilyData, 3000); 
    return () => clearInterval(interval);
  }, []);

  const isEmergency = memberData?.status === 'FALL_ALERT' || memberData?.status === 'SOS';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="xl:col-span-2 flex flex-col gap-8">
        
        {/* Stats Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm transition-colors duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Network Overview</h2>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mt-0.5">Real-time Family Sync</p>
              </div>
            </div>
            
            <div className={`px-4 py-2 border rounded-full flex items-center gap-2 shadow-sm transition-colors ${!isEmergency ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${!isEmergency ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${!isEmergency ? 'text-emerald-600' : 'text-rose-600'}`}>
                {!isEmergency ? 'All Systems Go' : 'Alert Active'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50/50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/20 text-cyan-500 flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md uppercase tracking-wider">Live</span>
              </div>
              <p className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-1">Active Monitors</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">{familyStats.online}</span>
                <span className="text-lg text-slate-400 font-medium mb-1">/ {familyStats.total}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000" style={{ width: `${familyStats.total > 0 ? (familyStats.online / familyStats.total) * 100 : 0}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">Synced</span>
              </div>
              <p className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-1">Total Family Size</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">{familyStats.total}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ✨ CLEANED MEMBER SECTION: Only shows Real Members */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm transition-colors">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none">Member Details</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">Family Network</p>
            </div>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">View All Directory</button>
          </div>
          
          <div className="overflow-hidden">
             {/* Header Row */}
             <div className="grid grid-cols-3 px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Member Name</span>
                <span className="text-center">Battery Level</span>
                <span className="text-right">Connection Status</span>
             </div>

             {/* Real Data Loop */}
             <div className="space-y-4">
                {realMembers.length > 0 ? (
                  realMembers.map((member) => (
                    <MemberCard key={member._id} memberData={member} />
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs font-bold italic">Scanning network for active members...</div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Right Column (Alerts) */}
      <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm h-full max-h-[800px] flex flex-col relative overflow-hidden transition-colors">
        <div className="relative z-10 h-full flex flex-col">
          <AlertPanel memberData={memberData} />
        </div>
      </div>
    </div>
  );
}