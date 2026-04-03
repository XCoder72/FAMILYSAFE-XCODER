import React from 'react';
import MemberCard from '../MemberCard';
import AlertPanel from '../AlertPanel';

export default function OverviewPanel() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in-up">
      
      {/* Left Column (Stats & Members) */}
      <div className="xl:col-span-2 flex flex-col gap-8">
        
        {/* Premium Stats Container */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-colors duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight transition-colors">Network Overview</h2>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mt-0.5">Real-time Family Sync</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-100 dark:border-emerald-500/30 rounded-full flex items-center gap-2 shadow-sm self-start sm:self-auto transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-300 uppercase tracking-wider">All Systems Go</span>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Device Stat Card */}
            <div className="bg-slate-50/50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-100/80 dark:border-slate-700/50 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)] group cursor-default">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/20 text-cyan-500 dark:text-cyan-300 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Online</span>
              </div>
              <p className="font-bold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide mb-1">Connected Devices</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tight transition-colors">12</span>
                <span className="text-lg text-slate-400 dark:text-slate-500 font-medium mb-1">/ 12</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Members Stat Card */}
            <div className="bg-slate-50/50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-100/80 dark:border-slate-700/50 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] group cursor-default">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-300 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Active</span>
              </div>
              <p className="font-bold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide mb-1">Network Members</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tight transition-colors">8</span>
                <span className="text-lg text-slate-400 dark:text-slate-500 font-medium mb-1">/ 27</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Details Wrapper */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-2 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-colors duration-500">
          <MemberCard />
        </div>
      </div>

      {/* Right Column (Alerts) */}
      <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full max-h-[800px] flex flex-col relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/60 dark:from-white/5 to-transparent pointer-events-none transition-colors duration-500"></div>
        <div className="relative z-10 h-full flex flex-col">
          <AlertPanel />
        </div>
      </div>

    </div>
  );
}