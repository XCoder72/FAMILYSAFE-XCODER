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
  
  // State to handle the loading button
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // ✨ THE FIX: The "Bouncer"
  // As soon as the page loads, check if they already completed this step.
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('familySafeUser'));
    
    // If adminName exists, they already filled this form out!
    if (savedData && savedData.adminName) {
      navigate('/MemberDashboard'); // Instantly redirect them to the dashboard
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✨ UPDATED: Now an async function that talks to the backend!
  const handleCompleteSetup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Get the original login phone number from localStorage
    const existingData = JSON.parse(localStorage.getItem('familySafeUser')) || {};
    
    // ✨ FIX: Check for both 'phone' and 'phoneNumber' just to be safe!
    const loginPhone = existingData.phone || existingData.phoneNumber; 

    if (!loginPhone) {
      alert("Session expired. Please log in again.");
      navigate('/');
      return;
    }

    try {
      // 2. Send the data to your MongoDB backend
      const response = await fetch('http://localhost:5000/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginPhone: loginPhone,          // To find the user in DB
          name: formData.name,             // To update the DB
          email: formData.email,
          emergencyPhone: formData.phone,
          gender: formData.gender,
          address: formData.address
        })
      });

      const data = await response.json();

      if (data.success) {
        // 3. If DB save was successful, update localStorage
        const updatedData = {
          ...existingData,
          adminName: formData.name,
          adminEmail: formData.email,
          adminPhone: formData.phone,
          adminGender: formData.gender,
          adminAddress: formData.address,
        };
        
        localStorage.setItem('familySafeUser', JSON.stringify(updatedData));
        
        // 4. Finally, go to the dashboard!
        navigate('/dashboard');
      } else {
        alert("Failed to save profile: " + data.message);
        setIsSubmitting(false); // Re-enable the button so they can try again
      }

    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Server Offline. Could not save profile.");
      setIsSubmitting(false); // Re-enable the button
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center relative overflow-hidden p-6 font-sans">
      
      {/* Premium Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-160 h-160 bg-blue-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 z-0 pointer-events-none"></div>

      {/* Glass Card - Enhanced shadows and borders */}
      <div className="bg-white/90 backdrop-blur-2xl p-10 sm:p-12 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 w-full max-w-2xl z-10 relative">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            {/* Soft glowing background effect behind the logo */}
            <div className="absolute -inset-2 bg-linear-to-tr from-cyan-400 to-blue-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
            
            {/* The Actual Logo Image */}
            <img 
              src="/logo.png" 
              alt="FamilySafe Logo" 
              className="relative h-20 w-auto object-contain drop-shadow-[0_10px_15px_rgba(37,99,235,0.2)]"
            />
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Complete Profile</h2>
          <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base">Set up your administrator account and emergency details.</p>
        </div>

        <form onSubmit={handleCompleteSetup} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name Input */}
            <div>
              <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full pl-11 pr-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  placeholder="e.g. Abhay Sharma"
                />
              </div>
            </div>
            
            {/* Email Input */}
            <div>
              <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full pl-11 pr-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  placeholder="admin@family.safe"
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <input 
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  className="w-full pl-11 pr-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Gender Select */}
            <div>
              <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
              <div className="relative group">
                <select 
                  name="gender" required value={formData.gender} onChange={handleChange}
                  className="w-full pl-5 pr-11 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Address */}
          <div>
            <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">Home Address</label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <textarea 
                name="address" required rows="3" value={formData.address} onChange={handleChange}
                className="w-full pl-11 pr-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
                placeholder="Enter full residential address..."
              ></textarea>
            </div>
          </div>

          {/* ✨ UPDATED: Premium Submit Button with loading state ✨ */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-4 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Saving to Database..." : "Submit & Enter Dashboard"}
          </button>
        </form>

      </div>
    </div>
  );
}