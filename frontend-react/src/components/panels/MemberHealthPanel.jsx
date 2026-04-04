import React, { useMemo } from 'react';

export default function MemberHealthPanel({ memberData, isTestMode }) {
  // 1. Extract Live Data from props
  const heartRate = memberData?.vitals?.heartRate || 72;
  const spo2 = memberData?.vitals?.spo2 || 98;
  const steps = memberData?.vitals?.steps || 0;
  
  // 2. Simulation Logic
  const isEmergency = isTestMode && (memberData?.status === 'FALL_ALERT' || memberData?.status === 'SOS');
  
  // 3. Dynamic Values for Simulation
  const displayHR = isEmergency ? 124 : heartRate;
  const displaySpo2 = isEmergency ? 94 : spo2; // Dip SpO2 during distress

  // 4. Generate a mini-wave for the Heart Rate card
  const hrTrend = useMemo(() => {
    const base = [68, 72, 70, 75, 80, 72, 70, 74];
    base[7] = displayHR;
    return base;
  }, [displayHR]);

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🛡️ Header Banner: Personal Health Status */}
      <div className={`rounded-4xl p-8 relative overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-linear-to-r 
        ${isEmergency ? 'from-rose-900 via-rose-950 to-slate-900 border-rose-500/50' : 'from-emerald-900 via-teal-900 to-slate-900 border-emerald-500/30'}`}>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className={`w-16 h-16 rounded-full border flex items-center justify-center shrink-0 backdrop-blur-md shadow-lg transition-colors
            ${isEmergency ? 'bg-rose-500/20 border-rose-400' : 'bg-emerald-500/20 border-emerald-400/50'}`}>
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEmergency ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
              <svg className="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {isEmergency ? 'Emergency Mode Active' : 'Your Vitals are Optimal'}
            </h2>
            <p className="text-emerald-200 font-medium mt-1 text-sm md:text-base">
                {isEmergency ? '🚨 System is broadcasting distress vitals' : 'Last cloud sync: Just now'}
            </p>
          </div>
        </div>

        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-4">
          <div className="text-right">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Health Index</p>
            <p className="text-xl font-black text-white">{isEmergency ? '42' : '98'}<span className="text-sm font-medium text-white/50 ml-1">/100</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Heart Rate Card */}
        <div className={`bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm group relative overflow-hidden
          ${isEmergency ? 'border-rose-500 ring-4 ring-rose-500/10' : 'border-white/60 dark:border-slate-700/50'}`}>
          <div className="flex justify-between items-start mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${isEmergency ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-50 text-rose-500'}`}>
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BPM</p>
               <p className={`text-4xl font-black ${isEmergency ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>{displayHR}</p>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-6">Current Pulse</p>
          <div className="flex items-end gap-1 h-12">
            {hrTrend.map((v, i) => (
              <div key={i} className={`flex-1 rounded-t-sm transition-all duration-1000 ${isEmergency ? 'bg-rose-500' : 'bg-rose-200'}`} style={{ height: `${(v / 150) * 100}%` }}></div>
            ))}
          </div>
        </div>

        {/* SpO2 Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm transition-all">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-inner">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SpO2</p>
               <p className={`text-4xl font-black ${isEmergency ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>{displaySpo2}%</p>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-4">Oxygen Saturation</p>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
             <div className={`h-full transition-all duration-1000 ${isEmergency ? 'bg-rose-500' : 'bg-sky-500'}`} style={{ width: `${displaySpo2}%` }}></div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm transition-all">
          <div className="flex justify-between items-start mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Steps</p>
               <p className="text-4xl font-black text-slate-800 dark:text-white">{steps.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-4">Daily Activity</p>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500" style={{ width: `${Math.min((steps/10000)*100, 100)}%` }}></div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* 🏥 Medical Vault Summary */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Medical Data Access</h3>
           <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">📄</div>
                    <div>
                       <p className="text-sm font-bold">Emergency Profile</p>
                       <p className="text-xs text-slate-500">Blood Type: O+, Allergy: Penicillin</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-black uppercase text-blue-600">View</button>
              </div>
           </div>
        </div>

        {/* 📋 Simulation Log (Self View) */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">System Health Log</h3>
           <div className="space-y-4">
              {isEmergency ? (
                 <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 animate-pulse">
                    <p className="text-xs font-black text-rose-600 uppercase mb-1">Alert Loop Active</p>
                    <p className="text-sm font-bold text-rose-800">Distress vitals being pushed to Admin dashboard.</p>
                 </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-sm font-bold text-emerald-800">Heartbeat synchronization stable.</p>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}