import React from 'react';

export default function HealthPanel() {
  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2rem] p-8 relative overflow-hidden shadow-lg shadow-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center shrink-0 backdrop-blur-md">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Family Vitals Online</h2>
            <p className="text-emerald-100 font-medium mt-1">Actively monitoring 8 members</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Network Health</p>
            <p className="text-xl font-black text-white">Optimal</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/50 flex items-center justify-center text-white font-bold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-100 dark:border-emerald-500/30 px-2 py-1 rounded-md uppercase tracking-wider">+2% this week</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm">Family Health Index</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">92</span>
            <span className="text-lg text-slate-400 dark:text-slate-500 font-medium mb-1">/ 100</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
            <div className="w-[92%] h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> Live
            </span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm">Network Avg BPM</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">74</span>
            <span className="text-rose-500 dark:text-rose-400 font-medium mb-1">BPM</span>
          </div>
          <div className="w-full h-6 mt-2 opacity-50 dark:opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPjxwb2x5bGluZSBwb2ludHM9IjAsMTAgMjAsMTAgMjUsMCAzNSwyMCA0MCwxMCAxMDAsMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y0M2Y1ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')] bg-repeat-x bg-contain"></div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-500 dark:text-sky-400 shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            </div>
            <span className="text-[10px] font-bold text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/20 border border-sky-100 dark:border-sky-500/30 px-2 py-1 rounded-md uppercase tracking-wider">Excellent</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm">Avg SpO2 Level</h3>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">98</span>
            <span className="text-sky-500 dark:text-sky-400 font-medium mb-1">%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
            <div className="w-[98%] h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"></div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Live Member Vitals List */}
        <div className="xl:col-span-2">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner dark:shadow-none"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                Live Member Vitals
              </h3>
            </div>

            <div className="space-y-4">
              {/* Vitals Card 1 */}
              <div className="bg-slate-50/50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300 group hover:shadow-lg dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] cursor-default gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-100 dark:from-sky-900/40 to-blue-100 dark:to-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-lg border-2 border-white dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform">
                      P
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Priya Mehta</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/20 inline-block px-2 py-0.5 rounded-md mt-1">Resting</p>
                  </div>
                </div>
                
                <div className="flex gap-6 sm:gap-8 bg-white dark:bg-slate-900/80 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-transparent border-slate-100 dark:border-slate-700/50">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><svg className="w-3 h-3 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg> Heart</p>
                    <p className="font-black text-slate-700 dark:text-white text-lg">68 <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">BPM</span></p>
                  </div>
                  <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Oxygen</p>
                    <p className="font-black text-slate-700 dark:text-white text-lg">99 <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">%</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Alerts */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Health Alerts</h3>
            <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide animate-pulse">1 Warning</span>
          </div>
          
          <div className="space-y-4">
            {/* Alert 1 */}
            <div className="relative overflow-hidden bg-rose-50/50 dark:bg-rose-900/20 hover:bg-rose-50 dark:hover:bg-rose-900/30 border border-rose-100 dark:border-rose-500/30 p-4 rounded-2xl transition-all duration-300 cursor-pointer group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className="text-sm font-bold text-rose-700 dark:text-white">Elevated Heart Rate</p>
                    <p className="text-[9px] font-bold text-rose-400 dark:text-rose-500 uppercase tracking-wider ml-2">10m ago</p>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                    Amit's heart rate exceeded 110 BPM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}