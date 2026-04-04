import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Role() {
  const navigate = useNavigate();
  
  // 1. STATES
  const [activePath, setActivePath] = useState(null); 
  const [userPhone, setUserPhone] = useState("Loading...");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 2. LOAD USER DATA FROM LOCAL STORAGE
  useEffect(() => {
    const savedData = localStorage.getItem('familySafeUser');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserPhone(parsedData.phone); // Pulling 'phone' here
    } else {
      navigate('/'); // Kick back to login if no phone found
    }
  }, [navigate]);

  // 3. CREATE NETWORK FUNCTION
  const handleCreateNetwork = async () => {
    const savedUser = JSON.parse(localStorage.getItem('familySafeUser'));
    
    // ✨ FIX 1: If user already has a code, don't hit the API!
    if (savedUser?.familyCode) {
      setGeneratedCode(savedUser.familyCode);
      setActivePath('create');
      return; 
    }

    // Otherwise, flip the UI and create a new one
    setActivePath('create'); 

    try {
      const response = await fetch('http://localhost:5000/api/create-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: savedUser?.phone 
        }) 
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCode(data.familyCode); 
        
        localStorage.setItem('familySafeUser', JSON.stringify({
          ...savedUser,
          familyCode: data.familyCode,
          role: 'Admin',
          name: data.userName,
          isSetupComplete: data.userName ? true : false 
        }));

      } else {
        alert("Failed to create network: " + data.message);
        setActivePath(null); // Reset UI on failure
      }
    } catch (error) {
      console.error("Failed to create network:", error);
      setActivePath(null);
    }
  };

// 4. JOIN NETWORK FUNCTION in Role.jsx
  const handleJoinNetwork = async () => {
    if (joinCodeInput.length !== 4) {
      alert("Please enter a 4-digit code.");
      return;
    }
    
    setIsProcessing(true);
    const fullCode = "SAFE-" + joinCodeInput;

    try {
      const response = await fetch('http://localhost:5000/api/join-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userPhone, familyCode: fullCode })
      });
      const data = await response.json();

      if (data.success) {
        // 1. Get whatever is currently in storage
        const existingData = JSON.parse(localStorage.getItem('familySafeUser')) || {};
        
        // 2. ✨ THE FIX: Explicitly set Role to Member and Setup to False
        const memberSession = { 
          ...existingData, 
          role: 'Member', 
          familyCode: fullCode,
          isSetupComplete: false // 👈 This prevents the auto-redirect to dashboard
        };

        localStorage.setItem('familySafeUser', JSON.stringify(memberSession));
        
        // 3. 🚀 Now navigate to the setup form
        navigate('/member-setup'); 
        
      } else {
        alert("❌ " + data.message); 
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      alert("🚨 Server error.");
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
        <div className="absolute top-[-10%] left-[-10%] w-31.25 h-31.25 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-37.5 h-37.5 bg-sky-300/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-43.75 h-43.75 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Minimal Navbar */}
      <nav className={`absolute top-0 w-full px-12 py-10 flex items-center gap-6 z-10 transition-all duration-1000 animate-fade-in-up`}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="relative h-24 w-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]" 
          />
        </div>
        <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-slate-900 to-slate-500">
          FamilySafe
        </span>
      </nav>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-4xl px-6 mt-20 z-10 flex flex-col items-center relative">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight animate-fade-in-up delay-100">
            Welcome to FamilySafe
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-blue-100 px-4 py-2 rounded-full text-blue-700 font-semibold text-sm mb-6 shadow-sm animate-fade-in-up delay-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"></span>
            Logged in as: {userPhone}
          </div>
          <p className="text-slate-500 text-lg font-medium animate-fade-in-up delay-300">
            Choose your secure setup path
          </p>
        </div>

        {/* --- SHOW CARDS IF NO PATH IS SELECTED --- */}
        {!activePath && (
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            {/* 1. Admin Card (Create) */}
            <div 
             onClick={handleCreateNetwork}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border-2 border-white cursor-pointer transition-all duration-300 w-full max-w-[24rem] text-center relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:border-blue-400 animate-fade-in-up delay-300"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Create a Network</h3>
              <p className="text-slate-500 leading-relaxed">Generate a secure SAFE-code and become the Admin of your family's safety hub.</p>
            </div>

            {/* 2. Member Card (Join) */}
            <div 
              onClick={() => setActivePath('join')}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border-2 border-white cursor-pointer transition-all duration-300 w-full max-w-[24rem] text-center relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hover:border-blue-400 animate-fade-in-up delay-400"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                🔗
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Join a Network</h3>
              <p className="text-slate-500 leading-relaxed">Enter an existing SAFE-code to instantly connect your device with loved ones.</p>
            </div>
          </div>
        )}

        {/* --- SHOW FORMS BASED ON CLICK --- */}
        
        {/* CREATE NETWORK FORM */}
        {activePath === 'create' && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white w-full max-w-md text-center animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Secure Network Code</h3>
            
            {/* Premium Code Display Card */}
            <div className="my-8 relative">
              <div className="bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl py-6 px-4 flex items-center justify-center relative overflow-hidden transition-all hover:bg-blue-50">
                {generatedCode ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-slate-400 tracking-widest select-none">SAFE</span>
                    <span className="text-2xl font-bold text-slate-300 mx-3">-</span>
                    <span className="text-5xl font-black text-blue-600 tracking-[0.15em] drop-shadow-sm">
                      {generatedCode.split('-')[1]}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-black text-blue-300 tracking-[0.3em] animate-pulse">
                    - - - -
                  </span>
                )}
              </div>
              {generatedCode && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Active Code
                </div>
              )}
            </div>
            
            <p className="text-slate-500 mb-8 font-medium">Share this code with your family members so they can link their devices securely.</p>
            
            <button
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg"
              onClick={() => {
                const checkUser = JSON.parse(localStorage.getItem('familySafeUser'));
                if (checkUser?.adminName) {
                  navigate('/dashboard'); 
                } else {
                  navigate('/admin-setup'); 
                }
              }}
            >
              Enter Admin Dashboard
            </button>

            <button 
              onClick={() => setActivePath(null)} 
              className="text-slate-400 hover:text-slate-700 font-medium text-sm transition-colors mt-4 block w-full"
            >
              ← Choose a different path
            </button>
          </div>
        )}

        {/* JOIN NETWORK FORM */}
        {activePath === 'join' && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white w-full max-w-md text-center animate-fade-in-up">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enter Invite Code</h3>
            <p className="text-slate-500 mb-8 font-medium">Ask your network Admin for their 4-digit code.</p>
            
            {/* Premium Join Code Input */}
            <div className="mb-8 relative max-w-85 mx-auto">
              <div className="bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-2xl py-4 flex items-center justify-center transition-all focus-within:border-blue-500 focus-within:bg-blue-50/80 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:bg-slate-100">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-slate-400 tracking-widest select-none">SAFE</span>
                  <span className="text-2xl font-bold text-slate-300 mx-3">-</span>
                  <input 
                    type="text" 
                    maxLength="4" 
                    placeholder="0000" 
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.replace(/\D/g, ''))}
                    className="w-35 bg-transparent text-5xl font-black text-blue-600 tracking-[0.15em] outline-none placeholder:text-blue-200 selection:bg-blue-200"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleJoinNetwork}
              disabled={isProcessing || joinCodeInput.length !== 4} 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-all mb-4 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Verifying..." : "Connect Device"}
            </button>
            
            <button 
              onClick={() => setActivePath(null)} 
              className="text-slate-400 hover:text-slate-700 font-medium text-sm transition-colors block w-full"
            >
              ← Choose a different path
            </button> 
          </div>
        )}

      </div>
    </div>
  );
}