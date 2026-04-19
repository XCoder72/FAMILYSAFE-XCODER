import React, { useState } from 'react';

export default function DoctorPanel({ memberData }) {
  // Pulling real reports from the memberData prop
  const reports = memberData?.medicalReports || [];
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const savedUser = JSON.parse(localStorage.getItem('familySafeUser'));
    const targetPhone = memberData?.phone || savedUser?.phone;

    if (!targetPhone) {
      alert("System Error: Could not identify user identity for encryption.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('report', file);
    formData.append('reportName', file.name.split('.')[0]); 
    formData.append('doctorName', "Primary Care Physician");
    formData.append('category', file.type.includes('pdf') ? "Clinical PDF" : "Diagnostic Image");

    try {
      // ✨ UPDATED: Pointing to your live Render backend
      const response = await fetch(`https://familysafe-xcoder.onrender.com/api/upload-report/${targetPhone}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        alert("🛡️ Document secured in Cloud Vault successfully!");
        // Note: The Dashboard's 3-second polling will automatically pick up the new report
      } else {
        alert(`Vault Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Connectivity Error: Cloud Vault is unreachable.");
    } finally {
      setIsUploading(false);
      e.target.value = null; // Reset file input
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🏥 CLINICAL COMMAND BANNER */}
      <div className="bg-linear-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full mix-blend-overlay filter blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.25rem] bg-teal-500/20 border border-teal-400/50 flex items-center justify-center shrink-0 backdrop-blur-md shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <svg className="w-8 h-8 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Professional Portal</h2>
            <p className="text-teal-200 font-medium mt-1 text-sm md:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Encrypted Medical Stream Active
            </p>
          </div>
        </div>

        <button className="relative z-10 bg-white/10 hover:bg-white/20 px-8 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-white font-black text-xs uppercase tracking-widest transition-all">
          Emergency Consultation
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 👨‍⚕️ PRIMARY DOCTOR CARD */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm group">
          <p className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-6">Family Specialist</p>
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-3xl bg-slate-200 dark:bg-slate-800 overflow-hidden border-2 border-white dark:border-slate-700">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" alt="Doctor" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Dr. Arpit Sharma</h3>
              <p className="text-sm font-bold text-slate-500">Chief Cardiologist</p>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-black uppercase mt-2 inline-block">Available</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <button className="py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/30">Message</button>
             <button className="py-3 bg-teal-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-teal-600/20 hover:scale-105 transition-transform">Video Call</button>
          </div>
        </div>

        {/* 🔍 BIOMETRIC THRESHOLDS */}
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-6">Monitoring Thresholds</h3>
          <div className="space-y-4 flex-1">
             <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 flex items-center justify-center font-bold">HR</div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Tachycardia Alert</p>
                </div>
                <p className="font-black text-slate-800 dark:text-white">&gt; 135 <span className="text-[10px] text-slate-400">BPM</span></p>
             </div>
             <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 flex items-center justify-center font-bold">O2</div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Hypoxia Alert</p>
                </div>
                <p className="font-black text-slate-800 dark:text-white">&lt; 92 <span className="text-[10px] text-slate-400">%</span></p>
             </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase">Notifications routed to primary physician on violation</p>
        </div>

        {/* 📄 ✨ CLINICAL REPORT VAULT ✨ */}
        <div className="xl:col-span-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 dark:border-slate-700/50 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Clinical Report Vault</h3>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Stored Medical History</p>
            </div>
            
            <label className={`cursor-pointer ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-teal-600/20 flex items-center gap-2 transition-all`}>
              {isUploading ? (
                <span className="animate-pulse font-black text-xs uppercase tracking-widest">Syncing with Medical Vault...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                  Upload Visit Report
                </>
              )}
              <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {reports.length > 0 ? reports.map((report, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-4xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 group cursor-pointer" onClick={() => window.open(report.fileUrl, '_blank')}>
                 <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   {report.fileUrl.toLowerCase().endsWith('.pdf') ? (
                     <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                     </svg>
                   ) : (
                     <svg className="w-7 h-7 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                   )}
                 </div>
                 <h4 className="font-black text-slate-800 dark:text-white text-lg leading-tight mb-1 truncate">{report.reportName}</h4>
                 <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-4">{new Date(report.date).toLocaleDateString()}</p>
                 <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] font-black text-slate-400 uppercase truncate max-w-25">{report.doctorName}</span>
                    <div className="flex gap-2">
                       <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       </div>
                    </div>
                 </div>
              </div>
            )) : (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Vault Empty: Scan and upload previous clinical documents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}