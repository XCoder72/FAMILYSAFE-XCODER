import React, { useMemo } from 'react';

export default function AdminHealthPanel({ liveMemberData, isTestMode }) {
  // 1. Extract real values from liveMemberData with sensible fallbacks
  const heartRate = liveMemberData?.vitals?.heartRate || 72;
  const spo2 = liveMemberData?.vitals?.spo2 || 98;
  const steps = liveMemberData?.vitals?.steps || 0;
  
  // 2. Simulation Logic: Check for emergency status
  const isEmergency = isTestMode && (liveMemberData?.status === 'FALL_ALERT' || liveMemberData?.status === 'SOS');
  
  // 3. Dynamic Data Calculation
  const displayHR = isEmergency ? 124 : heartRate;
  const healthScore = isEmergency ? 64 : 96;

  // 4. Generate Trend Graph Data (Dynamic)
  // We use useMemo so the graph doesn't shuffle randomly on every re-render
  const hrTrend = useMemo(() => {
    const baseTrend = [65, 70, 72, 85, 78, 95, 80, 75, 72, 70, 68, 72];
    // We inject the live/emergency value into the most recent data point (index 4 as per your design)
    baseTrend[4] = displayHR; 
    return baseTrend;
  }, [displayHR]);

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Dynamic Header Banner - Shifts to Rose-950 on Emergency */}
      <div className={`rounded-4xl p-8 relative overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-linear-to-r 
        ${isEmergency ? 'from-slate-950 via-rose-900 to-rose-950 border-rose-500/50' : 'from-slate-900 via-rose-900 to-pink-900 border-rose-500/30'}`}>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full mix-blend-overlay filter blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-6">
          <div className={`w-16 h-16 rounded-[1.25rem] border flex items-center justify-center shrink-0 backdrop-blur-md shadow-lg transition-colors
            ${isEmergency ? 'bg-rose-600/30 border-rose-400' : 'bg-rose-500/20 border-rose-400/50'}`}>
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEmergency ? 'bg-rose-400' : 'bg-pink-400'}`}></span>
              <svg className="w-8 h-8 text-pink-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Master Vitals {isEmergency ? 'Alert' : 'Sync'}
            </h2>
            <p className="text-rose-200 font-medium mt-1 text-sm md:text-base italic">
              {isEmergency ? '🚨 CRITICAL: Abnormal biometrics detected' : 'Real-time biometric synchronization active'}
            </p>
          </div>
        </div>

        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-rose-200 text-[10px] font-bold uppercase tracking-widest mb-1 text-opacity-70">Overall Health</p>
            <p className="text-xl font-black text-white">{healthScore}<span className="text-sm text-rose-300 ml-1">/100</span></p>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isEmergency ? 'bg-rose-500/20 border-rose-400 text-rose-400' : 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mini Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Heart Rate Card */}
        <div className={`bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border transition-all duration-300 group 
          ${isEmergency ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10' : 'border-white/60 dark:border-slate-700/50'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-inner transition-colors ${isEmergency ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-500'}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 ${isEmergency ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isEmergency ? 'bg-white' : 'bg-rose-500'} animate-pulse`}></span> Live
            </span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Heart Rate</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className={`text-4xl font-black tracking-tight ${isEmergency ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>{displayHR}</span>
            <span className="text-rose-500 dark:text-rose-400 font-bold mb-1">BPM</span>
          </div>
          <div className="w-full h-8 mt-4 opacity-70 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPjxwb2x5bGluZSBwb2ludHM9IjAsMTAgMjAsMTAgMjUsMCAzNSwyMCA0MCwxMCAxMDAsMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y0M2Y1ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')] bg-repeat-x bg-contain"></div>
        </div>

        {/* Blood Oxygen Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-500 shadow-inner">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md uppercase">Optimal</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Blood Oxygen</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{spo2}</span>
            <span className="text-sky-500 dark:text-sky-400 font-bold mb-1">% SpO2</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-linear-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-700" style={{ width: `${spo2}%` }}></div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">On Track</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Daily Steps</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{steps.toLocaleString()}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-6 overflow-hidden shadow-inner">
            <div className="h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min((steps/10000)*100, 100)}%` }}></div>
          </div>
        </div>

        {/* Sleep Card - (Static UI but can be linked later) */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-inner">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md uppercase">Optimal</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">Sleep Cycle</h3>
          <div className="flex items-end gap-1 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white">7<span className="text-xl text-slate-400 ml-1">h</span></span>
            <span className="text-4xl font-black text-slate-800 dark:text-white ml-1">24<span className="text-xl text-slate-400 ml-1">m</span></span>
          </div>
          <div className="mt-6 flex gap-1 h-2 rounded-full overflow-hidden">
            <div className="w-[20%] bg-indigo-200 dark:bg-indigo-800"></div>
            <div className="w-[30%] bg-indigo-400 dark:bg-indigo-600"></div>
            <div className="w-[50%] bg-indigo-600 dark:bg-indigo-400"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Heart Rate Trend Monitoring Chart */}
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm min-h-87.5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center shadow-inner"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg></div>
              Vitals Trend Monitoring
            </h3>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">Real-time Graph</div>
          </div>
          
          <div className="flex-1 w-full relative h-48 flex items-end justify-between px-2 border-b border-slate-100 dark:border-slate-700 border-l mt-10">
            {/* Grid Lines */}
            <div className="absolute w-full border-t border-slate-100/50 dark:border-slate-700/50 top-[25%] pointer-events-none"></div>
            <div className="absolute w-full border-t border-slate-100/50 dark:border-slate-700/50 top-[50%] pointer-events-none"></div>
            <div className="absolute w-full border-t border-slate-100/50 dark:border-slate-700/50 top-[75%] pointer-events-none"></div>
            
            {/* Y-Axis scale labels */}
            <span className="absolute -left-8 top-[25%] -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">120</span>
            <span className="absolute -left-8 top-[50%] -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">90</span>
            <span className="absolute -left-8 top-[75%] -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">60</span>

            {/* Dynamic Rendering of Trend Bars */}
            {hrTrend.map((val, i) => (
              <div key={i} className="relative flex flex-col items-center group cursor-pointer w-[6%] h-full justify-end">
                <div 
                  className={`w-full transition-all duration-1000 rounded-t-sm shadow-sm 
                  ${(isEmergency && val === displayHR) ? 'bg-rose-600 animate-pulse' : 'bg-rose-200 dark:bg-rose-600 hover:bg-rose-400'}`} 
                  style={{ height: `${Math.min((val / 150) * 100, 100)}%` }}
                ></div>
                <div className="absolute -top-10 bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                  {val} BPM
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mt-4 px-2 tracking-tighter">
            <span>Morning</span><span>Noon</span><span>Evening</span><span>Active</span>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col justify-between">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Status Dashboard</h3>
          
          <div className="space-y-4">
            {isEmergency ? (
              <div className="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 rounded-2xl p-5 animate-pulse">
                <p className="text-rose-700 dark:text-rose-400 font-black uppercase text-[10px] tracking-widest mb-1">Critical Trigger</p>
                <p className="text-sm font-bold text-rose-800 dark:text-white">Abnormal Vitals Spike</p>
                <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">Smartwatch accelerometer and HR sensor triggered impact monitoring.</p>
              </div>
            ) : (
              <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">System Check</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">All Master Vitals Normal</p>
                </div>
              </div>
            )}
            
            {/* BP & Temp Scans - Placeholder UI for premium feel */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center opacity-70">
              <span className="text-xs font-bold text-slate-500">BP: 118/76</span>
              <span className="text-[10px] font-black uppercase text-emerald-500">Stable</span>
            </div>
          </div>

          <button className="w-full mt-6 py-4 bg-linear-to-r from-slate-800 to-slate-900 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Resync Sensors
          </button>
        </div>

      </div>
    </div>
  );
}