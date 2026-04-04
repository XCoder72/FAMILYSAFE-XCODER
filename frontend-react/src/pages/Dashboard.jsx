import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LiveChat from '../components/LiveChat';

// 🔄 PANELS
import OverviewPanel from '../components/panels/OverviewPanel';
import HealthPanel from '../components/panels/HealthPanel';
import TrackingPanel from '../components/panels/TrackingPanel';
import AdminOverviewPanel from '../components/panels/AdminOverviewPanel';
import AdminHealthPanel from '../components/panels/AdminHealthPanel';
import AdminTrackingPanel from '../components/panels/AdminTrackingPanel';
import MemberDirectoryPanel from '../components/panels/MemberDirectoryPanel';
import ReminderPanel from '../components/panels/ReminderPanel';
import MemberOverviewPanel from '../components/panels/MemberOverviewPanel';
import MemberHealthPanel from '../components/panels/MemberHealthPanel';
import MemberTrackingPanel from '../components/panels/MemberTrackingPanel';
import DoctorPanel from '../components/panels/DoctorPanel';

// ✨ NEW: Import the Testing Components
import TestingPanel from '../components/TestingPanel'; 

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('Overview');    

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // ✅ RESTORED
  const [adminData, setAdminData] = useState({ name: 'Admin', email: '', phone: '', address: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  
  // ✨ NEW: Live Data & Test Mode States
  const [liveMemberData, setLiveMemberData] = useState(null);
  const [isTestMode, setIsTestMode] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", title: "System Active", desc: "FamilySafe Network is monitoring live vitals.", time: "Now", read: false }
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userRole, setUserRole] = useState(null); 

  // 1. Dark Mode Effect
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 2. Tab Reset Effect
  useEffect(() => {
    setActiveTab('Overview');
  }, [activeMenu]);

  // 3. Load Initial User Data
  useEffect(() => {
    const rawData = localStorage.getItem('familySafeUser');
    if (rawData) {
      const savedData = JSON.parse(rawData);
      setUserRole(savedData.role || 'Member');
      const userName = savedData.name || savedData.adminName || savedData.memberName || savedData.userName || 'Admin';
      
      setAdminData({
        name: userName,
        email: savedData.email || '',
        phone: savedData.phone || '',
        address: savedData.address || ''
      });
    }
  }, []);

  // ✨ 4. NEW: Live Data Polling (Refreshes data every 3 seconds for Simulation)
  useEffect(() => {
    const fetchLiveData = async () => {
      const rawData = localStorage.getItem('familySafeUser');
      if (!rawData) return;
      const savedData = JSON.parse(rawData);

      try {
        const response = await fetch(`http://localhost:5000/api/family-members/${savedData.familyCode}`);
        const data = await response.json();
        if (data.success) {
          setAllFamilyMembers(data.members);
          const myData = data.members.find(m => m.phone === savedData.phone);
          setLiveMemberData(myData);
          
          if (selectedMember) {
            const updatedSelected = data.members.find(m => m.phone === selectedMember.phone);
            setSelectedMember(updatedSelected);
          }
        }
      } catch (err) {
        console.error("Polling Error:", err);
      }
    };

    const interval = setInterval(fetchLiveData, 3000);
    return () => clearInterval(interval);
  }, [selectedMember]);

  const initial = adminData.name ? adminData.name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="min-h-screen flex font-sans bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-cyan-300 dark:bg-cyan-900/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 z-0 pointer-events-none transition-colors duration-700"></div>
      <div className="absolute top-[10%] right-[-5%] w-140 h-140 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 z-0 pointer-events-none transition-colors duration-700"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-160 h-160 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 z-0 pointer-events-none transition-colors duration-700"></div>

      <div className="flex w-full h-full relative z-10">
        
        <Sidebar 
          activeMenu={activeMenu} 
          setActiveMenu={(menu) => {
            if (menu === 'Members') setSelectedMember(null);
            setActiveMenu(menu);
          }} 
          userRole={userRole} 
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          
          <div className="p-8 pb-0 shrink-0 relative z-50">
            <header className="flex justify-between items-center w-full mb-8">
              
              <div className="flex-1 flex items-center gap-4 justify-start">
                  {activeMenu === 'Dashboard' && (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white dark:border-slate-700 shadow-[0_8px_15px_rgb(0,0,0,0.05)] dark:shadow-none flex items-center justify-center backdrop-blur-md">
                        <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      </div>
                      <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none transition-colors">Family Dashboard</h1>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3">Network Command</p>
                      </div>
                    </>
                  )}
                  {activeMenu === 'Admin' && (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 shadow-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none transition-colors">Admin Console</h1>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3">Master Controls</p>
                      </div>
                    </>
                  )}
                  {activeMenu === 'Members' && (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white dark:border-slate-700 shadow-sm flex items-center justify-center backdrop-blur-md">
                        <svg className="w-6 h-6 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      </div>
                      <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none transition-colors">
                          {userRole === 'Admin' ? (selectedMember ? 'Member Dashboard' : 'Member Directory') : 'Member Dashboard'}
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3">
                          {userRole === 'Admin' ? (selectedMember ? `Viewing: ${selectedMember.name}` : 'Network Roster') : 'My Dashboard'}
                        </p>
                      </div>
                    </>
                  )}
              </div> 
              
              <div className="flex-1 flex justify-center items-center">
                {(activeMenu === 'Dashboard' || (userRole === 'Admin' && activeMenu === 'Admin') || (activeMenu === 'Members' && (userRole === 'Member' || (userRole === 'Admin' && selectedMember)))) && (
                  <div className="flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm border border-slate-100 dark:border-slate-700/50 p-1 relative animate-fade-in">
                    <button onClick={() => setActiveTab('Overview')} className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'Overview' ? 'bg-cyan-400 dark:bg-cyan-50 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>Overview</button>
                    <button onClick={() => setActiveTab('Health')} className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'Health' ? 'bg-rose-400 dark:bg-rose-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>Health</button>
                    <button onClick={() => setActiveTab('Tracking')} className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'Tracking' ? 'bg-indigo-500 dark:bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>Tracking</button>
                  </div>
                )}
              </div>

              <div className="flex-1 flex justify-end items-center gap-3 sm:gap-4 relative z-50">
                <button onClick={() => setIsTestMode(!isTestMode)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${isTestMode ? 'bg-amber-100 border-amber-300 text-amber-700 animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                  {isTestMode ? 'TEST MODE ACTIVE' : 'TEST MODE'}
                </button>

                <button onClick={() => setIsDarkMode(prev => !prev)} className="w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/80 border border-slate-100 shadow-sm flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-all backdrop-blur-md shrink-0">
                  {isDarkMode ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                </button>

                <div className="relative shrink-0 z-60">
                  <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`w-10 h-10 rounded-full border shadow-sm flex items-center justify-center backdrop-blur-md ${isNotificationsOpen ? 'bg-white dark:bg-slate-800 text-blue-500' : 'bg-white/60 dark:bg-slate-800/80 text-slate-500'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    {notifications.some(n => !n.read) && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>}
                  </button>
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-4 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-100 rounded-3xl shadow-2xl z-50 p-4 animate-fade-in-up">
                      <h3 className="font-black text-slate-800 dark:text-white text-sm uppercase mb-3 px-2">Notifications</h3>
                      <div className="max-h-75 overflow-y-auto space-y-2">
                        {notifications.map(note => (
                          <div key={note.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-800 dark:text-white">{note.title}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">{note.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative shrink-0">
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-11 h-11 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center text-white font-black text-lg transition-transform hover:scale-105">
                    {initial}
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-100 rounded-3xl shadow-2xl z-50 py-3 animate-fade-in-up text-center">
                      <div className="px-5 pb-3 border-b mb-2">
                        <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">{adminData.name}</p>
                        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{userRole} MODE</p>
                      </div>
                      <button onClick={() => { localStorage.removeItem('familySafeUser'); window.location.href = '/'; }} className="w-full text-rose-600 font-black text-xs py-2 hover:bg-rose-50 transition-colors uppercase">Sign Out</button>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>

          <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
            {activeMenu === 'Dashboard' && (
              <>
                {activeTab === 'Overview' && (
            <OverviewPanel 
             memberData={liveMemberData || adminData} 
             isTestMode={isTestMode} /> )}
                {activeTab === 'Health' && (
            <HealthPanel 
             isTestMode={isTestMode} 
             liveMemberData={liveMemberData} /> )}
                {activeTab === 'Tracking' && (
            <TrackingPanel 
             isTestMode={isTestMode} 
             liveMemberData={liveMemberData} /> )}
              </>
            )}

            {userRole === 'Admin' && activeMenu === 'Admin' && (
              <>
                {activeTab === 'Overview' && (
            <AdminOverviewPanel
            liveMemberData={liveMemberData} 
             isTestMode={isTestMode} />)}
                {activeTab === 'Health' && (
            <AdminHealthPanel 
             liveMemberData={liveMemberData} 
             isTestMode={isTestMode} />)}
                {activeTab === 'Tracking' && <AdminTrackingPanel />}
              </>
            )}
            
            {activeMenu === 'Members' && (
               userRole === 'Admin' ? (
                  selectedMember ? (
                    <>
                      {activeTab === 'Overview' && (
            <MemberOverviewPanel 
             memberData={selectedMember} 
             isTestMode={isTestMode} // 👈 Add this so the Admin sees the Member's simulation
             onBack={() => setSelectedMember(null)} /> )}
                      {activeTab === 'Health' && (
            <MemberHealthPanel 
             memberData={selectedMember} 
             onBack={() => setSelectedMember(null)} /> )}
                      {activeTab === 'Tracking' && <MemberTrackingPanel memberData={selectedMember} />}
                    </>
                  ) : (
                    <MemberDirectoryPanel onSelectMember={(member) => setSelectedMember(member)} />
                  )
               ) : (
                  <>
                    {activeTab === 'Overview' && <MemberOverviewPanel memberData={liveMemberData || adminData} />}
                    {activeTab === 'Health' && <MemberHealthPanel memberData={liveMemberData || adminData} />}
                    {activeTab === 'Tracking' && <MemberTrackingPanel memberData={liveMemberData || adminData} />}
                  </>
               )
            )}
            {activeMenu === 'Doctor' && <DoctorPanel />}
            {activeMenu === 'Live Chat' && (
              <div className="animate-fade-in-up h-full flex flex-col max-w-300 mx-auto bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                <LiveChat />
              </div>
            )}
            {activeMenu === 'Reminder' && <ReminderPanel />}
          </div>
        </main>
      </div>

      {isTestMode && (
        <TestingPanel 
          userPhone={adminData.phone} 
          onUpdate={(updated) => setLiveMemberData(updated)} 
        />
      )}
    </div>
  );
}