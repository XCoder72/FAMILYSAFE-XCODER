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
          <circle cx="40" cy="40" r="24" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="6" fill="none" />
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

export default function MemberOverviewPanel({ memberData, isTestMode }) {
  const adminFirstName = memberData?.adminName?.split(' ')[0] || "Admin";
  const [displayCode, setDisplayCode] = useState('SAFE-XXXX');
  const [isTriggering, setIsTriggering] = useState(false);

  // ✨ Real-time Hardware Data extracted from the memberData prop
  const watchBat = Math.round(memberData?.vitals?.watchBattery || 0);
  const phoneBat = Math.round(memberData?.vitals?.phoneBattery || 0);
  const isSOSActive = memberData?.status === 'SOS';

  useEffect(() => {
    if (memberData?.familyCode) {
      setDisplayCode(memberData.familyCode);
    }
  }, [memberData]);

  // 🚨 INTERACTIVE SOS TRIGGER: For demo purposes
  const handleSOSTrigger = async () => {
    if (!isTestMode || isSOSActive || isTriggering) return;
    
    setIsTriggering(true);
    try {
      await fetch(`https://familysafe-xcoder.onrender.com/api/simulate/${memberData.phone}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'SOS' })
      });
    } catch (err) {
      console.error("SOS Trigger Error:", err);
    } finally {
      setIsTriggering(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
    alert("Family Code copied to clipboard!");
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🛡️ TOP BANNER: Real-time status sync */}
      <div className={`rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-linear-to-r 
        ${isSOSActive ? 'from-rose-900 via-rose-950 to-slate-900 border-rose-500/50' : 'from-blue-900 via-indigo-900 to-slate-900 border-blue-500/30'}`}>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className={`w-16 h-16 rounded-[1.25rem] border flex items-center justify-center shrink-0 backdrop-blur-md shadow-lg transition-colors
            ${isSOSActive ? 'bg-rose-500/30 border-rose-400' : 'bg-emerald-500/20 border-emerald-400/50'}`}>
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSOSActive ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
              <svg className={`w-8 h-8 relative z-10 ${isSOSActive ? 'text-rose-300' : 'text-emerald-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isSOSActive ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"} />
              </svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {isSOSActive ? 'SOS Signal Transmitting' : 'System Shield Active'}
            </h2>
            <p className="text-blue-200 font-medium mt-1 text-sm md:text-base">
                {isSOSActive ? '🚨 Emergency services notified' : `Securely linked to ${adminFirstName}'s Network`}
            </p>
          </div>
        </div>

        <div onClick={copyToClipboard} className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-all group">
          <div className="text-right">
            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1 group-hover:text-white">Family Code</p>
            <p className="text-xl font-black text-white tracking-widest">{displayCode}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Mobile Device Card */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">My Device</h3>
                  <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> App Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8">
              <BatteryRing percentage={phoneBat} type="Phone Bat" />
              <div className="space-y-3 flex-1 ml-6 text-center">
                 <p className="text-[10px] text-slate-400 font-bold uppercase">Signal</p>
                 <p className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase">Synced</p>
              </div>
            </div>
          </div>

          {/* Connected Smartwatch Card */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center transition-transform shadow-inner ${watchBat < 20 ? 'bg-rose-50 text-rose-500 animate-pulse' : 'bg-indigo-50 text-indigo-500'}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Smartwatch</h3>
                  <p className={`text-xs font-bold flex items-center gap-1 mt-0.5 ${watchBat < 20 ? 'text-rose-500' : 'text-indigo-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${watchBat < 20 ? 'bg-rose-500' : 'bg-indigo-500'}`}></span> {watchBat < 20 ? 'Low Battery' : 'BT-Linked'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8">
              <BatteryRing percentage={watchBat} type="Watch Bat" />
              <div className="space-y-3 flex-1 ml-6 text-center">
                 <p className="text-[10px] text-emerald-600 font-bold uppercase">Biometrics</p>
                 <p className="text-sm font-black text-emerald-700 uppercase">Live</p>
              </div>
            </div>
          </div>

          {/* 🚨 SOS BUTTON: Fully Functional for Demo */}
          <div 
            onClick={handleSOSTrigger}
            className={`xl:col-span-2 p-8 rounded-4xl shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer relative overflow-hidden active:scale-95
             ${isSOSActive ? 'bg-rose-900 ring-4 ring-rose-500 animate-pulse' : 'bg-linear-to-br from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800'}
             ${!isTestMode && !isSOSActive ? 'opacity-80 cursor-not-allowed' : ''}`}>
             
             <div className="flex items-center gap-6 relative z-10">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 ${isSOSActive ? 'bg-white text-rose-900 border-white' : 'bg-white/20 text-white border-white/30'}`}>
                    {isSOSActive ? '🆘' : '🚨'}
                </div>
                <div className="text-white">
                   <h3 className="text-2xl font-black tracking-tight uppercase leading-none mb-1">{isSOSActive ? 'Distress Signal Sent' : 'Emergency SOS'}</h3>
                   <p className="text-rose-100 font-bold text-sm opacity-90">{isSOSActive ? 'Admins are tracking you now' : 'Trigger instant alert for entire network'}</p>
                </div>
             </div>
             <div className="bg-white text-rose-700 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">
                {isSOSActive ? 'Active' : isTriggering ? 'Sending...' : 'Hold to Alert'}
             </div>
          </div>
        </div>

        {/* 🔔 SECURITY TIMELINE: Shows dynamic status */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col h-full">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Security Timeline</h3>
          <div className="space-y-4">
            {isSOSActive && (
                <div className="bg-rose-50 dark:bg-rose-900/30 p-5 rounded-2xl border border-rose-200">
                    <p className="text-xs font-black text-rose-600 uppercase mb-1">Critical Update</p>
                    <p className="text-sm font-bold text-rose-800 dark:text-white leading-tight">SOS triggered at Sector-4 location. Backup notified.</p>
                </div>
            )}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 opacity-60">
                <p className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">Status Update</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Device synced with master server successfully.</p>
                <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Just Now</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}