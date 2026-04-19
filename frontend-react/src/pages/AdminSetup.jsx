import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminSetup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 🛡️ Redirect if profile is already complete
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('familySafeUser'));
    if (savedData && savedData.adminName) {
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
      // 🚀 UPDATED: Points to the specific update route
      const response = await fetch('https://familysafe-xcoder.onrender.com/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginPhone: loginPhone,
          name: formData.name,
          email: formData.email,
          emergencyPhone: formData.phone,
          gender: formData.gender,
          address: formData.address
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update Local Storage to reflect Admin status
        const updatedData = {
          ...existingData,
          adminName: formData.name,
          adminEmail: formData.email,
          adminPhone: formData.phone,
          adminGender: formData.gender,
          adminAddress: formData.address,
        };
        
        localStorage.setItem('familySafeUser', JSON.stringify(updatedData));
        navigate('/dashboard');
      } else {
        alert("Update failed: " + data.message);
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error("Setup Error:", error);
      alert("Network Error: Could not connect to FamilySafe Cloud.");
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden p-6">
      
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Main Setup Card */}
      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white w-full max-w-2xl z-10 relative">
        
        <div className="text-center mb-10">
          <div className="bg-linear-to-tr from-cyan-500 to-blue-600 w-20 h-20 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl">
             <svg className="w-10 h-10 text-white -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Admin Onboarding</h2>
          <p className="text-slate-500 mt-2 font-medium">Finalize your credentials for the FamilySafe Network.</p>
        </div>

        <form onSubmit={handleCompleteSetup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input: Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Full Identity</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                placeholder="Abhay Sharma"
              />
            </div>
            
            {/* Input: Email */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Email Contact</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                placeholder="admin@safe.com"
              />
            </div>

            {/* Input: Tel */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Backup Phone</label>
              <input 
                type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                placeholder="+91 00000 00000"
              />
            </div>

            {/* Select: Gender */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Gender</label>
              <select 
                name="gender" required value={formData.gender} onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Textarea: Address */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase ml-2">Primary Residence</label>
            <textarea 
              name="address" required rows="2" value={formData.address} onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
              placeholder="Enter permanent address..."
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Encrypting Data...
              </span>
            ) : "Confirm & Launch Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}