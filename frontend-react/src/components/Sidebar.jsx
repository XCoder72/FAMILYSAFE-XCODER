import React from 'react';

export default function Sidebar({ activeMenu, setActiveMenu, userRole }) {
  
  // Main navigation items
  const menuItems = [
  { 
    name: "Dashboard",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  },
  { 
    name: "Admin",
    adminOnly: true,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  },
  { 
    name: "Members",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  },
 
  { 
    name: "Doctor", 
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
  },
  { 
    name: "Live Chat",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
  },
  { 
    name: "Reminder",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  }
];

  return (
    <div className="w-64 h-screen sticky top-0 bg-linear-to-b from-white/60 to-white/30 dark:from-slate-900/90 dark:to-[#0B1120]/90 backdrop-blur-3xl border-r border-white/60 dark:border-slate-800/50 p-6 flex flex-col z-20 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors duration-500">
      
      {/* Premium Logo Area */}
      <div className="flex items-center gap-3 mb-10 px-2 group cursor-default">
        <div className="w-12 h-12 relative flex items-center justify-center shrink-0 perspective-[1000px]">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md  opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
          <img
            src="/logo.png" 
            alt="FamilySafe Logo" 
            className="w-full h-full object-contain drop-shadow-xl transition-transform duration-800 group-hover:transform-[rotateY(360deg)]"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tight text-slate-800 dark:text-white leading-tight">FamilySafe</span>
          {/* ✨ Subtitle changes based on user role */}
          <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">
            {userRole === 'Admin' ? 'Admin Control' : 'Member Shield'}
          </span>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          // ✨ Skip rendering "Admin" tab if the logged-in user is a Member
          if (item.adminOnly && userRole === 'Member') return null;

          const isActive = activeMenu === item.name;

          return (
            <button 
              key={item.name} 
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-linear-to-r from-blue-50 to-indigo-50/50 dark:from-blue-500/10 dark:to-indigo-500/10 text-blue-600 dark:text-blue-400 font-bold shadow-sm border border-blue-100/50 dark:border-blue-500/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200 font-medium border border-transparent'
              }`}
            >
              <div className={`${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                {item.icon}
              </div>
              <span className="flex-1 text-left">{item.name}</span>
              {isActive && (
                <span className="text-[9px] font-extrabold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md uppercase tracking-wider">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Pinned Section */}
      <div className="mt-auto pt-6 flex flex-col gap-4">
        <button 
          onClick={() => setActiveMenu('Settings')}
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
            activeMenu === 'Settings' 
              ? 'bg-linear-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-800 dark:text-white font-bold shadow-sm border border-slate-300/50' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <div className={`${activeMenu === 'Settings' ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <span className="flex-1 text-left">Settings</span>
        </button>

        <div className="border-t border-slate-200/50 dark:border-slate-800"></div>
        
        <div className="flex items-center gap-3 px-2">
           <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-white dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-sm">
             {userRole === 'Admin' ? 'A' : 'M'}
           </div>
           <div className="flex flex-col text-left">
             <span className="text-xs font-bold text-slate-800 dark:text-white">
                {userRole === 'Admin' ? 'Admin Acc.' : 'Member Acc.'}
             </span>
             <span className="text-[10px] font-medium text-emerald-500 flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
             </span>
           </div>
        </div>
      </div>
    </div>
  );
}