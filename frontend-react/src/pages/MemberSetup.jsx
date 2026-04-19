import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MemberSetup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relation: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 🛡️ THE BOUNCER: Prevent duplicate setups
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('familySafeUser'));
    if (savedData && savedData.isSetupComplete && savedData.role === 'Member') {
      navigate('/dashboard'); 
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteSetup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const existingData = JSON.parse(localStorage.getItem('familySafeUser')) || {};
    const loginPhone = existingData.phone || existingData.phoneNumber; 

    if (!loginPhone) {
      alert("Session expired. Please log in again.");
      navigate('/');
      return;
    }

    try {
      // 🚀 CONNECTING TO LIVE RENDER BACKEND
      const response = await fetch('https://familysafe-xcoder.onrender.com/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginPhone: loginPhone,          
          name: formData.name,             
          email: formData.email,
          emergencyPhone: formData.phone,
          relation: formData.relation,
          address: formData.address,
          role: 'Member'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update Local Storage with the full member profile
        const updatedData = {
          ...existingData,
          name: formData.name,
          email: formData.email,
          emergencyPhone: formData.phone,
          relation: formData.relation,
          address: formData.address,
          isSetupComplete: true,
          role: 'Member'
        };
        
        localStorage.setItem('familySafeUser', JSON.stringify(updatedData));
        navigate('/dashboard');
      } else {
        alert("Failed to save: " + data.message);
        setIsSubmitting(false); 
      }

    } catch (error) {
      console.error("Member Setup Error:", error);
      alert("Network Error: Using fallback mode for UI demo.");
      
      // ✨ BOOTCAMP FALLBACK ✨
      // Ensures the demo keeps working even if WiFi is slow during the presentation
      const updatedData = {
        ...existingData,
        name: formData.name,
        isSetupComplete: true,
        role: 'Member'
      };
      localStorage.setItem('familySafeUser', JSON.stringify(updatedData));
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden p-6 font-sans">
      
      {/* Premium Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-cyan-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-160 h-160 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 z-0 pointer-events-none"></div>

      {/* Glass Card */}
      <div className="bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[3rem] shadow-2xl border border-white w-full max-w-2xl z-10 relative animate-fade-in-up">
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-linear-to-tr from-cyan-500 to-blue-600 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl">
             <svg className="w-10 h-10 text-white -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Member Profile</h2>
          <p className="text-slate-500 mt-2 font-medium">Connect your vitals to the FamilySafe Network.</p>
        </div>

        <form onSubmit={handleCompleteSetup} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Display Name</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                placeholder="Priya Mehta"
              />
            </div>
            
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Email Address</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                placeholder="priya@family.safe"
              />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Secondary Contact</label>
              <input 
                type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                placeholder="+91 00000 00000"
              />
            </div>

            {/* Relation to Admin */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Relation to Admin</label>
              <select 
                name="relation" required value={formData.relation} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer font-medium"
              >
                <option value="" disabled>Select Relation</option>
                <option value="Child">Child</option>
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Home Address */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase ml-2">Current Residence</label>
            <textarea 
              name="address" required rows="2" value={formData.address} onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none font-medium"
              placeholder="Enter residential address..."
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Establishing Connection...
              </span>
            ) : "Join Family Network"}
          </button>
        </form>

      </div>
    </div>
  );
}