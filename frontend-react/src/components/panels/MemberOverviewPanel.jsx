import React, { useState, useEffect } from 'react';

// The ANIMATED Battery Ring Component
const BatteryRing = ({ percentage, type }) => {
  const circumference = 2 * Math.PI * 24;
  const [offset, setOffset] = useState(circumference);
  
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

export default function MemberOverviewPanel({ memberData }) {
  // Extracting names and data safely
  const adminFirstName = memberData?.adminName?.split(' ')[0] || "Admin";
  const [displayCode, setDisplayCode] = useState('SAFE-XXXX');

  // ✨ Logic to ensure Family Code is always visible
  useEffect(() => {
    if (memberData?.familyCode) {
      setDisplayCode(memberData.familyCode);
    } else {
      const savedUser = JSON.parse(localStorage.getItem('familySafeUser'));
      if (savedUser?.familyCode) {
        setDisplayCode(savedUser.familyCode);
      }
    }
  }, [memberData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
    alert("Family Code copied to clipboard!");
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🛡️ TOP BANNER: Personalized for the Member */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-overlay filter blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.25rem] bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <svg className="w-8 h-8 text-emerald-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">System Shield Active</h2>
            <p className="text-blue-200 font-medium mt-1 text-sm md:text-base">Linked to {adminFirstName}'s Network</p>
          </div>
        </div>

        {/* Family Code Display with Copy Action */}
        <div 
          onClick={copyToClipboard}
          className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-all group"
        >
          <div className="text-right">
            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1 group-hover:text-white transition-colors">Family Code</p>
            <p className="text-xl font-black text-white tracking-widest">{displayCode}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 group-hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 📱 PERSONAL DEVICES SECTION */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Mobile Device */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">My Device</h3>
                  <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> App Online</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <BatteryRing percentage={92} type="Phone" />
              <div className="space-y-3 flex-1 ml-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">GPS Status</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Broadcasting</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">App Version</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">v2.4.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Smartwatch */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/50 dark:to-rose-900/10 pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">My Smartwatch</h3>
                  <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Bluetooth Linked</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-8 relative z-10">
              <BatteryRing percentage={18} type="Watch" />
              <div className="space-y-3 flex-1 ml-6">
                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 p-3 rounded-xl text-center">
                   <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Vitals Sync</p>
                   <p className="text-sm font-black text-emerald-700 dark:text-emerald-300 uppercase">Synced</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/30 p-3 rounded-xl animate-pulse">
                  <p className="text-[10px] text-rose-500 dark:text-rose-400 font-bold uppercase tracking-wider mb-1 text-center">Action Required</p>
                  <p className="text-sm font-bold text-rose-700 dark:text-rose-300 text-center">Low Battery</p>
                </div>
              </div>
            </div>
          </div>

          {/* 🚨 QUICK SOS EMERGENCY BUTTON */}
          <div className="xl:col-span-2 bg-gradient-to-br from-rose-500 to-rose-700 p-8 rounded-[2rem] shadow-xl hover:shadow-rose-500/20 transition-all group flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer overflow-hidden relative active:scale-95">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-white text-4xl shadow-lg">🚨</div>
                <div className="text-white">
                   <h3 className="text-2xl font-black tracking-tight uppercase leading-none mb-1">Emergency Alert</h3>
                   <p className="text-rose-100 font-bold text-sm opacity-90">Send instant SOS to {adminFirstName} & Family</p>
                </div>
             </div>
             <div className="bg-white text-rose-600 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl relative z-10 group-hover:scale-105 transition-transform">
                Tap to Trigger
             </div>
          </div>

        </div>

        {/* 🔔 SECURITY TIMELINE */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Security Timeline</h3>
            <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase tracking-widest">Live Updates</span>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">Safety Zone Check</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Successfully reached "College" zone.</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Today, 9:15 AM</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">Admin Activity</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">"{adminFirstName} checked your live location."</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">15 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}