import React, { useState } from 'react';

export default function TestingPanel({ userPhone, onUpdate }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerScenario = async (type) => {
    if (!userPhone) return alert("No user selected for simulation.");
    
    setIsProcessing(true);
    try {
      // ✨ UPDATED: Pointing to your live Render backend
      const response = await fetch(`https://familysafe-xcoder.onrender.com/api/simulate/${userPhone}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      
      const data = await response.json();
      
      if (data.success) {
        onUpdate(data.user); // Instantly update the UI
      } else {
        console.error("Simulation Error:", data.message);
      }
    } catch (error) {
      console.error("Simulation failed:", error);
      alert("Cloud Connection Error. Check if Render is awake.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-fade-in-up">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-slate-800 w-72">
        
        {/* Header with Cloud Sync Status */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className={`flex h-2 w-2 rounded-full ${isProcessing ? 'bg-blue-500 animate-ping' : 'bg-amber-500 animate-pulse'}`}></span>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {isProcessing ? 'Syncing Cloud...' : 'Hardware Simulator'}
            </h4>
          </div>
          {isProcessing && (
            <svg className="animate-spin h-3 w-3 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* FALL BUTTON */}
          <button 
            disabled={isProcessing}
            onClick={() => triggerScenario('FALL')}
            className="group flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-500 hover:text-white text-rose-600 rounded-2xl transition-all duration-300 border border-rose-100 dark:border-rose-800/50 disabled:opacity-50 shadow-sm active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-tight">Impact</span>
              <span className="text-[10px] opacity-70">Simulate Fall</span>
            </div>
            <span className="text-xl group-hover:rotate-12 transition-transform">🚨</span>
          </button>

          {/* SOS BUTTON */}
          <button 
            disabled={isProcessing}
            onClick={() => triggerScenario('SOS')}
            className="group flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-500 hover:text-white text-orange-600 rounded-2xl transition-all duration-300 border border-orange-100 dark:border-orange-800/50 disabled:opacity-50 shadow-sm active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-tight">Panic</span>
              <span className="text-[10px] opacity-70">Trigger SOS</span>
            </div>
            <span className="text-xl group-hover:scale-125 transition-transform">🆘</span>
          </button>

          {/* RESET BUTTON */}
          <button 
            disabled={isProcessing}
            onClick={() => triggerScenario('NORMAL')}
            className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 text-slate-600 dark:text-slate-400 rounded-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 disabled:opacity-50 shadow-sm active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-tight">Reset</span>
              <span className="text-[10px] opacity-70">Clear Alerts</span>
            </div>
            <span className="text-xl group-hover:-rotate-12 transition-transform">✅</span>
          </button>
        </div>

        <div className="mt-5 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl">
           <p className="text-[9px] text-center text-blue-600 dark:text-blue-400 font-bold leading-relaxed">
            PRO TIP: Triggering "Impact" will update the Admin Dashboard within 3 seconds via the Cloud Polling Engine.
          </p>
        </div>
      </div>
    </div>
  );
}