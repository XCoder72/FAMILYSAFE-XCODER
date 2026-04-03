import React, { useState, useEffect } from 'react';

// The ANIMATED Battery Ring Component
const BatteryRing = ({ percentage, type }) => {
  const circumference = 2 * Math.PI * 24;
  
  // Start the animation at 0% (fully empty)
  const [offset, setOffset] = useState(circumference);
  
  // Trigger the fill-up animation right after the component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (percentage / 100) * circumference);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage, circumference]);
  
  const getColor = () => {
    if (percentage <= 20) return 'text-rose-500';
    if (percentage <= 50) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="relative flex flex-col items-center group cursor-default">
      <div className="relative w-20 h-20 flex items-center justify-center transform group-hover:scale-105 transition-transform">
        <svg className="w-full h-full -rotate-90 transform drop-shadow-sm">
          {/* Background Track */}
          <circle cx="40" cy="40" r="24" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="6" fill="none" />
          
          {/* Animated Colored Ring */}
          <circle 
            cx="40" cy="40" r="24" 
            className={`${getColor()} transition-all duration-1000 ease-out`} 
            strokeWidth="6" 
            fill="none" 
            strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset: offset }} 
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">
            {percentage}<span className="text-xs font-bold text-slate-400 dark:text-slate-500">%</span>
          </span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider">{type}</span>
    </div>
  );
};

export default function AdminOverviewPanel() {
  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-900 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full mix-blend-overlay filter blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgNDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.25rem] bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shrink-0 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <svg className="w-8 h-8 text-cyan-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Admin Hardware Online</h2>
            <p className="text-cyan-200 font-medium mt-1 text-sm md:text-base">Master Device Network Sync Active</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-cyan-200 text-[10px] font-bold uppercase tracking-widest mb-1">Your Devices</p>
            <p className="text-xl font-black text-white">3<span className="text-sm text-cyan-300 ml-1">/3</span></p>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Device Cards Section */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Primary Phone</h3>
                  <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Connected (5G)</p>
                </div>
              </div>
              <span className="bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-wider shadow-sm">Master</span>
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <BatteryRing percentage={84} type="Battery" />
              <div className="space-y-3 flex-1 ml-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-default">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Location Sync</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">High Precision</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-default">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Last Backup</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">2 mins ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/50 dark:to-rose-900/10 pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h4a2 2 0 002-2v-1.556a8.006 8.006 0 00-8 0V19a2 2 0 002 2zM10 3h4a2 2 0 012 2v1.556a8.006 8.006 0 01-8 0V5a2 2 0 012-2zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Smartwatch</h3>
                  <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Bluetooth Paired</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-8 relative z-10">
              <BatteryRing percentage={18} type="Low Power" />
              <div className="space-y-3 flex-1 ml-6">
                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 p-3 rounded-xl">
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">Vitals Sensor</p>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Active</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/30 p-3 rounded-xl shadow-sm dark:shadow-none">
                  <p className="text-[10px] text-rose-500 dark:text-rose-400 font-bold uppercase tracking-wider mb-1">Action Required</p>
                  <p className="text-sm font-bold text-rose-700 dark:text-rose-300">Charge Soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex items-center justify-between hover:bg-white dark:hover:bg-slate-900 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[1.25rem] bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg">Home Hub (Tablet)</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Living Room • WiFi Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5">Network Status</p>
                <p className="text-sm font-bold text-emerald-500">Stable</p>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center shadow-sm dark:shadow-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <span className="font-black text-slate-700 dark:text-white text-lg">100%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hardware Alerts Section */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Hardware Alerts</h3>
            <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase tracking-widest animate-pulse">1 Warning</span>
          </div>
          
          <div className="space-y-4">
            
            <div className="bg-rose-50/50 dark:bg-rose-900/20 hover:bg-rose-50 dark:hover:bg-rose-900/30 border border-rose-100 dark:border-rose-500/30 p-5 rounded-2xl relative overflow-hidden group cursor-pointer transition-colors shadow-sm dark:shadow-none">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-[1rem] bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner dark:shadow-none shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-rose-800 dark:text-rose-400">Low Battery</p>
                  <p className="text-xs text-rose-600/90 dark:text-rose-300/80 mt-1 font-medium leading-relaxed">Smartwatch battery dropped below 20%. Connect to charger.</p>
                  <p className="text-[10px] text-rose-400 dark:text-rose-500 font-bold mt-2.5 uppercase tracking-wider">10 mins ago</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 p-5 rounded-2xl relative overflow-hidden group cursor-pointer transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 dark:bg-blue-500"></div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-[1rem] bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 shadow-inner dark:shadow-none shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-white">System Backup</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">Primary phone successfully synced network data to cloud.</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2.5 uppercase tracking-wider">2 hours ago</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}