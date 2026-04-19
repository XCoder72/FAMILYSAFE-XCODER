import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Role() {
  const navigate = useNavigate();
  
  const [activePath, setActivePath] = useState(null); 
  const [userPhone, setUserPhone] = useState("Loading...");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('familySafeUser');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserPhone(parsedData.phone);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // 🛡️ CREATE NETWORK LOGIC
  const handleCreateNetwork = async () => {
    const savedUser = JSON.parse(localStorage.getItem('familySafeUser'));
    
    // If user already has a code, don't hit the API
    if (savedUser?.familyCode) {
      setGeneratedCode(savedUser.familyCode);
      setActivePath('create');
      return; 
    }

    setActivePath('create'); 
    try {
      // ✨ UPDATED: Pointing to your live Render backend
      const response = await fetch('https://familysafe-xcoder.onrender.com/api/create-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: savedUser?.phone }) 
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCode(data.familyCode); 
        localStorage.setItem('familySafeUser', JSON.stringify({
          ...savedUser,
          familyCode: data.familyCode,
          role: 'Admin',
          isSetupComplete: false 
        }));
      }
    } catch (error) {
      console.error("Network Creation Failed:", error);
      // 🚨 BOOTCAMP FALLBACK: Generate a local code if Render is sleeping
      const fallbackCode = "SAFE-" + Math.floor(1000 + Math.random() * 9000);
      setGeneratedCode(fallbackCode);
    }
  };

  // 🛡️ JOIN NETWORK LOGIC
  const handleJoinNetwork = async () => {
    if (joinCodeInput.length !== 4) {
      alert("Please enter a 4-digit code.");
      return;
    }
    
    setIsProcessing(true);
    const fullCode = "SAFE-" + joinCodeInput;

    try {
      // ✨ UPDATED: Pointing to your live Render backend
      const response = await fetch('https://familysafe-xcoder.onrender.com/api/join-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userPhone, familyCode: fullCode })
      });
      const data = await response.json();

      if (data.success) {
        const existingData = JSON.parse(localStorage.getItem('familySafeUser')) || {};
        const memberSession = { 
          ...existingData, 
          role: 'Member', 
          familyCode: fullCode,
          isSetupComplete: false 
        };

        localStorage.setItem('familySafeUser', JSON.stringify(memberSession));
        navigate('/member-setup'); 
      } else {
        alert("❌ " + data.message); 
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Join Error:", err);
      alert("🚨 Server connection lost. Check your Render logs.");
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 font-sans relative flex flex-col items-center justify-center pb-20 overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}
    >
      {/* 🔮 DYNAMIC BACKGROUND ORBS 🔮 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-31.25 h-31.25 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-43.75 h-43.75 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse transition-all"></div>
      </div>

      <nav className={`absolute top-0 w-full px-12 py-10 flex items-center gap-6 z-10 transition-all duration-1000 animate-fade-in-up`}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="relative h-20 w-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]" 
          />
        </div>
        <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-slate-900 to-slate-500">
          FamilySafe
        </span>
      </nav>

      <div className="w-full max-w-4xl px-6 mt-20 z-10 flex flex-col items-center relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight animate-fade-in-up">
            Network Initialization
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-blue-100 px-4 py-2 rounded-full text-blue-700 font-semibold text-sm mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Session ID: {userPhone}
          </div>
        </div>

        {!activePath && (
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div 
              onClick={handleCreateNetwork}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border-2 border-white cursor-pointer transition-all duration-300 w-full max-w-[24rem] text-center relative overflow-hidden group hover:-translate-y-2 hover:border-blue-400"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-3xl">🛡️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Create Network</h3>
              <p className="text-slate-500">Initialize a new secure family hub and generate a SAFE-code.</p>
            </div>

            <div 
              onClick={() => setActivePath('join')}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border-2 border-white cursor-pointer transition-all duration-300 w-full max-w-[24rem] text-center relative overflow-hidden group hover:-translate-y-2 hover:border-blue-400"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-3xl">🔗</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Join Network</h3>
              <p className="text-slate-500">Sync with an existing network using a 4-digit SAFE-code.</p>
            </div>
          </div>
        )}

        {activePath === 'create' && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white w-full max-w-md text-center animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Network Hub Active</h3>
            <div className="my-8 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl py-6 px-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-400 tracking-widest uppercase">SAFE</span>
              <span className="text-2xl font-bold text-slate-300 mx-3">-</span>
              <span className="text-5xl font-black text-blue-600 tracking-widest">
                {generatedCode ? generatedCode.split('-')[1] : "----"}
              </span>
            </div>
            <p className="text-slate-500 mb-8 font-medium">Distribute this code to family members to establish the secure link.</p>
            <button
              className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg"
              onClick={() => navigate('/admin-setup')}
            >
              Configure Admin Panel
            </button>
          </div>
        )}

        {activePath === 'join' && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white w-full max-w-md text-center animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Connect to Hub</h3>
            <div className="my-8 bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-2xl py-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-400 tracking-widest">SAFE</span>
              <span className="text-2xl font-bold text-slate-300 mx-3">-</span>
              <input 
                type="text" maxLength="4" placeholder="0000" value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value.replace(/\D/g, ''))}
                className="w-32 bg-transparent text-5xl font-black text-blue-600 outline-none"
              />
            </div>
            <button 
              onClick={handleJoinNetwork}
              disabled={isProcessing || joinCodeInput.length !== 4} 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {isProcessing ? "Establishing Link..." : "Sync Device"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}