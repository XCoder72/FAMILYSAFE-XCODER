import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // --- UI & DATA STATES ---
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(''); // What the user types
  const [receivedOtp, setReceivedOtp] = useState(''); // Real OTP from backend
  const [isProcessing, setIsProcessing] = useState(false);
  
  // ✨ NEW: State to hold the user data sent back from the database
  const [backendUser, setBackendUser] = useState(null); 
  
  const navigate = useNavigate();

  const heroSlides = [
    { title: <>Protect what<br/>matters most.</>, desc: "Real-time health monitoring, precise GPS tracking, and instant SOS alerts for your entire family network." },
    { title: <>Monitor health<br/>in real-time.</>, desc: "Keep track of heart rates, SpO2 levels, and daily activity. Get proactive alerts before emergencies happen." },
    { title: <>Never lose<br/>sight of them.</>, desc: "Set custom geofences and receive immediate notifications when family members enter or leave secure zones." }
  ];

  const featurePills = [
    { id: 1, icon: "❤️", text: "Live Vitals", color: "text-red-400" },
    { id: 2, icon: "📍", text: "Live GPS", color: "text-pink-500" },
    { id: 3, icon: "🚨", text: "Instant SOS", color: "text-red-500" }
  ];

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 6500);
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); 

    return () => { clearTimeout(splashTimer); clearInterval(slideTimer); };
  }, [heroSlides.length]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return alert("🚨 Enter a valid 10-digit number.");
    
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: countryCode + " " + phoneNumber })
      });
      const data = await response.json();
      if (data.success) {
        setReceivedOtp(data.otp); 
        
        // ✨ SAVE THE DATABASE USER OBJECT INTO STATE
        setBackendUser(data.user); 
        
        setStep('otp');
      }
    } catch (error) {
      alert("🚨 Server Offline.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otp === receivedOtp) {
      
      // ✨ MERGE BACKEND DATA WITH LOCAL VERIFICATION
      const userData = {
        ...(backendUser || {}), // Spread existing DB data (like role, name, familyCode)
        phone: `${countryCode} ${phoneNumber}`,
        isVerified: true
      };
      
      // Save full profile to local storage
      localStorage.setItem('familySafeUser', JSON.stringify(userData));
      
      setStep('success');
      
      // ✨ THE TRAFFIC DIRECTOR ✨
      setTimeout(() => {
        // Check if the database says they are setup OR if they have a name saved
        if (userData.isSetupComplete || userData.name) {
          navigate('/dashboard'); // 🚀 Returning User: Go straight to Dashboard
        } else {
          navigate('/role');      // 🆕 New User: Go pick a role
        }
      }, 1800);

    } else {
      alert("❌ Incorrect OTP!");
    }
  }; // ✨ FIXED: This closing bracket was missing!

  return (
    <>
      {/* 🎬 CINEMATIC SPLASH OVERLAY */}
      <div className={`fixed inset-0 z-50 bg-[#020617] flex items-center justify-center transition-all duration-2000 ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none blur-xl'}`}>
        <video autoPlay muted playsInline className="w-full h-full object-cover">
          <source src="/logo-animation.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="min-h-screen flex font-sans bg-[#f8fafc]">
        
        {/* LEFT SIDE: Cinematic Hero Section */}
        <div className="hidden lg:flex w-1/2 bg-[#020617] text-white p-12 flex-col justify-center relative overflow-hidden">
          <div className={`absolute top-10 left-12 flex items-center gap-6 transition-all duration-1000 ${!showSplash ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <img src="/logo.png" alt="Logo" className="h-24 w-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
            <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">FamilySafe</span>
          </div>

          <div className={`max-w-xl z-10 transition-all duration-1000 ${!showSplash ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h1 className="text-7xl font-extrabold leading-tight mb-6">{heroSlides[currentSlide].title}</h1>
            <p className="text-zinc-400 text-xl leading-relaxed mb-10">{heroSlides[currentSlide].desc}</p>
            <div className="flex gap-4">
              {featurePills.map(p => (
                <div key={p.id} className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
                  <span className={p.color}>{p.icon}</span> <span className="ml-2 font-medium">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        {/* Right Side: Updated with Glassmorphism */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
          
          {/* 🔵 Dynamic Background Orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2000ms'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4000ms'}}></div>

          {/* 🛡️ THE GLASS LOGIN CARD */}
          <div className={`bg-white/80 backdrop-blur-xl border border-white/60 p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-md transition-all duration-1000 ${
            !showSplash ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>

            {/* Step-based forms */}
            {step === 'phone' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-5xl font-bold text-slate-900 mb-4">Login</h2>
                <p className="text-slate-500 mb-8">Enter your mobile number to continue.</p>
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div className="flex border-2 border-slate-100 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-all bg-slate-50/50">
                    <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="bg-transparent px-4 py-4 font-bold border-r outline-none cursor-pointer">
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                    </select>
                    <input type="tel" placeholder="9876543210" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full px-4 py-4 bg-transparent outline-none font-medium text-lg" autoFocus />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
                    {isProcessing ? "Sending..." : "Request OTP"}
                  </button>
                </form>
              </div>
            )}

            {step === 'otp' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg mb-6 text-sm font-mono animate-pulse">
                    DEBUG: Your OTP is <span className="font-bold text-lg">{receivedOtp}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Verify OTP</h2>
                <p className="text-slate-500 mb-8">Sent to {countryCode} {phoneNumber}</p>
                <form onSubmit={handleOtpVerify} className="space-y-6">
                  <input type="text" maxLength="4" placeholder="0 0 0 0" value={otp} onChange={e => setOtp(e.target.value)} className="w-full text-center text-4xl font-black tracking-[0.5em] py-4 bg-slate-50 border-2 rounded-2xl focus:border-blue-500 outline-none transition-colors" autoFocus />
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all">Verify & Login</button>
                </form>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Authenticated!
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Preparing your secure environment...</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}