import React, { useState } from 'react';

export default function TestingPanel({ userPhone, onUpdate }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerScenario = async (type) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`http://localhost:5000/api/simulate/${userPhone}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      const data = await response.json();
      
      if (data.success) {
        onUpdate(data.user); // This updates the Dashboard live!
      }
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-fade-in-up">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 w-72">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Emergency Simulator
          </h4>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <button 
            disabled={isProcessing}
            onClick={() => triggerScenario('FALL')}
            className="group flex items-center justify-between p-3 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 rounded-2xl transition-all border border-rose-100 dark:border-rose-800/50"
          >
            <span className="text-xs font-bold">Trigger Fall</span>
            <span className="text-lg group-hover:rotate-12 transition-transform">🚨</span>
          </button>

          <button 
            disabled={isProcessing}
            onClick={() => triggerScenario('SOS')}
            className="group flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-600 rounded-2xl transition-all border border-orange-100 dark:border-orange-800/50"
          >
            <span className="text-xs font-bold">Trigger SOS</span>
            <span className="text-lg group-hover:scale-110 transition-transform">🆘</span>
          </button>

          <button 
            disabled={isProcessing}
            onClick={() => triggerScenario('NORMAL')}
            className="group flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600 rounded-2xl transition-all border border-emerald-100 dark:border-emerald-800/50"
          >
            <span className="text-xs font-bold">Reset Status</span>
            <span className="text-lg transition-transform">✅</span>
          </button>
        </div>

        <p className="mt-4 text-[9px] text-center text-slate-400 dark:text-slate-500 font-medium italic">
          Changes will reflect on dashboard in ~3s
        </p>
      </div>
    </div>
  );
}