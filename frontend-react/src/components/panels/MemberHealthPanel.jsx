import React from 'react';

export default function MemberHealthPanel({ memberData }) {
  // Extracting first name for a more personal touch
  const firstName = memberData?.name?.split(' ')[0] || 'User';

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🛡️ Top Banner: Personal Biometric Status */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-900 to-pink-900 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full mix-blend-overlay filter blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgNDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.25rem] bg-rose-500/20 border border-rose-400/50 flex items-center justify-center shrink-0 backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <svg className="w-8 h-8 text-pink-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{firstName}'s Vitals Sync</h2>
            <p className="text-rose-200 font-medium mt-1 text-sm md:text-base">Real-time Watch Biometrics Active</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-rose-200 text-[10px] font-bold uppercase tracking-widest mb-1">Health Score</p>
            <p className="text-xl font-black text-white">98<span className="text-sm text-rose-300 ml-1">/100</span></p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* 📊 Personal Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Heart Rate */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500 dark:text-rose-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> Live
            </span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">Heart Rate</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">72</span>
            <span className="text-rose-500 dark:text-rose-400 font-bold mb-1">BPM</span>
          </div>
          <div className="w-full h-8 mt-4 opacity-70 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPjxwb2x5bGluZSBwb2ludHM9IjAsMTAgMjAsMTAgMjUsMCAzNSwyMCA0MCwxMCAxMDAsMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y0M2Y1ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')] bg-repeat-x bg-contain"></div>
        </div>

        {/* Blood Oxygen */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-500 dark:text-sky-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Optimal</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">Blood Oxygen</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">98</span>
            <span className="text-sky-500 dark:text-sky-400 font-bold mb-1">% SpO2</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-6 overflow-hidden shadow-inner dark:shadow-none">
            <div className="w-[98%] h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full relative">
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
            </div>
          </div>
        </div>

        {/* Sleep Duration */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Restorative</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">Sleep Duration</h3>
          <div className="flex items-end gap-1 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">7<span className="text-xl text-slate-400 dark:text-slate-500 ml-1">h</span></span>
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight ml-1">24<span className="text-xl text-slate-400 dark:text-slate-500 ml-1">m</span></span>
          </div>
          <div className="mt-6 flex gap-1 h-2 rounded-full overflow-hidden shadow-inner dark:shadow-none">
            <div className="w-[20%] bg-indigo-200 dark:bg-indigo-800" title="Awake"></div>
            <div className="w-[30%] bg-indigo-400 dark:bg-indigo-600" title="Light Sleep"></div>
            <div className="w-[50%] bg-indigo-600 dark:bg-indigo-400 relative" title="Deep Sleep"><div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-[2px]"></div></div>
          </div>
        </div>

        {/* Daily Steps */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-1 rounded-md uppercase tracking-wider">On Track</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">Daily Steps</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">8,432</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-6 overflow-hidden shadow-inner dark:shadow-none">
            <div className="w-[84%] h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full relative">
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-2 text-right">Goal: 10k</p>
        </div>

      </div>

      {/* 📈 Charts and Recent Scans */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between min-h-[350px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/20 text-rose-500 dark:text-rose-400 flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg></div>
              Personal Heart Rate Trend
            </h3>
            <select className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl px-4 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-500 shadow-sm">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          
          <div className="flex-1 w-full relative flex items-end justify-between px-2 pb-6 pt-10 border-b border-slate-100 dark:border-slate-700 border-l border-slate-100 dark:border-slate-700">
            <div className="absolute w-full border-t border-slate-100/50 dark:border-slate-700/50 top-[25%] pointer-events-none"></div>
            <div className="absolute w-full border-t border-slate-100/50 dark:border-slate-700/50 top-[50%] pointer-events-none"></div>
            <div className="absolute w-full border-t border-slate-100/50 dark:border-slate-700/50 top-[75%] pointer-events-none"></div>
            
            <span className="absolute -left-8 top-[25%] -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">120</span>
            <span className="absolute -left-8 top-[50%] -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">90</span>
            <span className="absolute -left-8 top-[75%] -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-slate-500">60</span>

            {[65, 70, 72, 85, 110, 95, 80, 75, 72, 70, 68, 72].map((val, i) => (
              <div key={i} className="relative flex flex-col items-center group cursor-pointer w-[6%]">
                <div 
                  className="w-full bg-gradient-to-t from-rose-200 dark:from-rose-600 to-rose-400 dark:to-rose-400 rounded-t-sm group-hover:from-rose-400 group-hover:to-rose-300 transition-colors duration-300 shadow-sm" 
                  style={{ height: `${(val / 150) * 100}%` }}
                ></div>
                <div className="absolute -top-10 bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                  {val} BPM
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-4 px-2">
            <span>8 AM</span>
            <span>12 PM</span>
            <span>4 PM</span>
            <span>8 PM</span>
          </div>
        </div>

        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col h-full">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Device Analytics</h3>
          <div className="space-y-4 flex-1">
            
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-4 flex items-center justify-between hover:bg-white dark:hover:bg-slate-800/60 transition-colors group cursor-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[1rem] bg-white dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-sm border border-emerald-50 dark:border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">Active Calories</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">342 kcal Today</p>
                </div>
              </div>
              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-widest">Normal</span>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-4 flex items-center justify-between hover:bg-white dark:hover:bg-slate-800/80 transition-colors group cursor-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[1rem] bg-white dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shadow-sm dark:shadow-none border border-slate-50 dark:border-indigo-500/20 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">Standing hours</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">8/12 Hours</p>
                </div>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">67%</span>
            </div>

          </div>
          
          <button className="w-full mt-6 py-4 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all shadow-sm text-sm flex items-center justify-center gap-2">
            View Historical Bio-Data
          </button>
        </div>

      </div>

    </div>
  );
}