import React, { useState, useEffect } from 'react';

export default function MemberDirectoryPanel({ onSelectMember }) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [familyCode, setFamilyCode] = useState('SAFE-0000');

  // ✨ 1. FETCH REAL DATA FROM DATABASE
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const savedData = JSON.parse(localStorage.getItem('familySafeUser'));
        const code = savedData?.familyCode || 'SAFE-0000';
        setFamilyCode(code);

        const response = await fetch(`http://localhost:5000/api/family-members/${code}`);
        const data = await response.json();

        if (data.success) {
          // ✨ FIX: Filter out the Admin so only Members show in the directory
          const onlyMembers = data.members.filter(m => m.role === 'Member');
          setMembers(onlyMembers);
        }
      } catch (error) {
        console.error("🚨 Failed to load family members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Helper to determine status color/text
  const getStatusInfo = (member) => {
    if (!member.isSetupComplete) return { label: 'Pending Setup', color: 'text-amber-500', bg: 'bg-amber-500', icon: '⏳' };
    if (member.status === 'Offline') return { label: 'Offline', color: 'text-slate-400', bg: 'bg-slate-400', icon: '⏱️' };
    return { label: 'Online', color: 'text-emerald-500', bg: 'bg-emerald-500', icon: '📍' };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-8">
              
      {/* Search and Filter Bar */}
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search family members..." 
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-medium focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button className="px-5 py-2.5 bg-slate-800 dark:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm whitespace-nowrap">
            All Members ({members.length})
          </button>
          <button className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl whitespace-nowrap flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 
            Online ({members.filter(m => m.isSetupComplete && m.status !== 'Offline').length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Members Grid Section */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {members.map((member) => {
            const status = getStatusInfo(member);
            return (
              <div 
                key={member._id}
                onClick={() => onSelectMember && onSelectMember(member)}
                className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-indigo-900/40 dark:to-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-2xl border-2 border-white dark:border-slate-800 shadow-sm">
                      {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-5 h-5 ${status.bg} border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center shadow-sm`}></span>
                  </div>
                  
                  <span className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    {member.relation || 'Member'}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white truncate">
                    {member.name || 'Pending Name'}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{member.phone}</p>
                </div>
                
                <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-4 mt-auto border border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${status.color}`}>{status.label}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 truncate">
                    <span className="text-lg">{status.icon}</span> 
                    {member.locationName || member.location || (member.isSetupComplete ? 'Locating...' : 'Waiting for setup')}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Add Member Button - Stays static */}
          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900/10 to-indigo-50 dark:to-indigo-900/10 p-6 rounded-[2rem] border-2 border-dashed border-blue-200 dark:border-blue-800 hover:border-blue-400 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[240px]">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">Invite More</h3>
            <p className="text-xs font-medium text-blue-600/70 dark:text-blue-400/70 mt-2 max-w-[200px]">Give the family code below to your loved ones.</p>
          </div>
        </div>

        {/* Invite Code Section - Updated with dynamic familyCode */}
        <div className="xl:col-span-1 space-y-8 flex flex-col h-full">
          <div className="bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden shadow-xl border border-white/20 dark:border-slate-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2)_0,transparent_100%)]"></div>
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center mb-4 text-xl">🔗</div>
              <h3 className="text-xl font-bold text-white mb-2">Family Code</h3>
              <p className="text-xs font-medium text-indigo-200 mb-6">Share this code with your family members to link their watches.</p>
              
              <div className="bg-black/40 border border-white/10 rounded-2xl py-4 flex items-center justify-center gap-1 mb-6">
                <span className="text-3xl font-black text-cyan-400 tracking-[0.1em] drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {familyCode}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(familyCode);
                  alert("Family Code copied!");
                }}
                className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>

          {/* Network Activity */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Network Activity</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Recent Connection</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">New member sync pending...</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}