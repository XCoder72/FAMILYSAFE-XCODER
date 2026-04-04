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

export default function AdminOverviewPanel({ liveMemberData, isTestMode }) {
  // Extract real hardware stats from liveMemberData
  const watchBat = Math.round(liveMemberData?.vitals?.watchBattery || 0);
  const phoneBat = Math.round(liveMemberData?.vitals?.phoneBattery || 0);
  
  // Simulation Logic: If Test Mode is ON and there's a Fall/SOS, trigger hardware alert
  const hasHardwareAlert = isTestMode && (liveMemberData?.status === 'FALL_ALERT' || liveMemberData?.status === 'SOS');

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Top Banner */}
      <div className={`rounded-4xl p-8 relative overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${hasHardwareAlert ? 'from-slate-900 via-rose-900 to-slate-900 border-rose-500/30' : 'from-slate-900 via-cyan-900 to-blue-900 border-cyan-500/30'} bg-linear-to-r`}>
        <div className="relative z-10 flex items-center gap-6">
          <div className={`w-16 h-16 rounded-[1.25rem] border flex items-center justify-center shrink-0 backdrop-blur-md shadow-lg ${hasHardwareAlert ? 'bg-rose-500/20 border-rose-400/50' : 'bg-cyan-500/20 border-cyan-400/50'}`}>
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasHardwareAlert ? 'bg-rose-400' : 'bg-cyan-400'}`}></span>
              <svg className={`w-8 h-8 relative z-10 ${hasHardwareAlert ? 'text-rose-300' : 'text-cyan-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Admin Hardware {hasHardwareAlert ? 'Alert' : 'Online'}</h2>
            <p className="text-cyan-200 font-medium mt-1 text-sm md:text-base">Master Device Network Sync Active</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-cyan-200 text-[10px] font-bold uppercase tracking-widest mb-1">Your Devices</p>
            <p className="text-xl font-black text-white">3<span className="text-sm text-cyan-300 ml-1">/3</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Primary Phone Card */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Primary Phone</h3>
                  <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Syncing</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <BatteryRing percentage={phoneBat} type="Phone Bat" />
              <div className="space-y-3 flex-1 ml-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">GPS Accuracy</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">High Precision</p>
                </div>
              </div>
            </div>
          </div>

          {/* Smartwatch Card */}
          <div className={`p-8 rounded-4xl border transition-all duration-500 backdrop-blur-xl shadow-sm group ${hasHardwareAlert ? 'bg-rose-50/50 border-rose-200' : 'bg-white/80 border-white/60 dark:bg-slate-900/60 dark:border-slate-700/50'}`}>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-transform ${hasHardwareAlert ? 'bg-rose-500 text-white' : 'bg-indigo-50 text-indigo-500'}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h4a2 2 0 002-2v-1.556a8.006 8.006 0 00-8 0V19a2 2 0 002 2zM10 3h4a2 2 0 012 2v1.556a8.006 8.006 0 01-8 0V5a2 2 0 012-2zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Smartwatch</h3>
                  <p className={`text-xs font-bold flex items-center gap-1 mt-0.5 ${hasHardwareAlert ? 'text-rose-600 animate-pulse' : 'text-indigo-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hasHardwareAlert ? 'bg-rose-600' : 'bg-indigo-500'}`}></span> {hasHardwareAlert ? 'Incident Site' : 'Paired'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-8 relative z-10">
              <BatteryRing percentage={watchBat} type="Watch Bat" />
              <div className="space-y-3 flex-1 ml-6">
                <div className={`${hasHardwareAlert ? 'bg-rose-500 text-white' : 'bg-emerald-50/50 text-emerald-700'} border p-3 rounded-xl transition-colors`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1">Vitals Sensor</p>
                  <p className="text-sm font-bold">{hasHardwareAlert ? 'Distress Sync' : 'Active'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Hardware Alerts Section */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Hardware Alerts</h3>
            {hasHardwareAlert && (
              <span className="bg-rose-100 text-rose-600 text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase animate-pulse">Critical</span>
            )}
          </div>
          
          <div className="space-y-4">
            {hasHardwareAlert ? (
              <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                <p className="text-sm font-extrabold text-rose-800 dark:text-rose-400">Emergency Protocol</p>
                <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">Smartwatch accelerometer detected an impact. BLE distress signal active.</p>
              </div>
            ) : (
              <div className="py-20 text-center opacity-30">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hardware Stable</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}