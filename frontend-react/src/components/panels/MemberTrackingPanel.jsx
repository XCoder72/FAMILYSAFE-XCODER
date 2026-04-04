import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MemberTrackingPanel({ memberData, isTestMode }) {
  const firstName = memberData?.name?.split(' ')[0] || 'Member';

  // 1. Simulation Logic: Check for emergency status
  const isEmergency = isTestMode && (memberData?.status === 'FALL_ALERT' || memberData?.status === 'SOS');
  
  // 2. Dynamic Coordinates
  // In demo: [26.2183, 78.1828] is MITS. We shift slightly for emergency simulation.
  const currentPos = isEmergency ? [26.2150, 78.1810] : [26.2183, 78.1828];

  // 3. Custom Dynamic Icons
  const movingIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="relative flex items-center justify-center">
             <div class="absolute w-8 h-8 ${isEmergency ? 'bg-rose-500' : 'bg-blue-500'} rounded-full animate-ping opacity-30"></div>
             <div class="w-4 h-4 ${isEmergency ? 'bg-rose-600' : 'bg-blue-500'} border-2 border-white dark:border-slate-800 rounded-full shadow-lg z-10"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return (
    <div className="animate-fade-in-up space-y-8">
              
      {/* 🛡️ Top Banner: GPS Status */}
      <div className={`rounded-4xl p-8 relative overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-linear-to-r 
        ${isEmergency ? 'from-slate-900 via-rose-900 to-slate-900 border-rose-500/30' : 'from-slate-900 via-indigo-900 to-blue-900 border-indigo-500/30'}`}>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className={`w-16 h-16 rounded-[1.25rem] border flex items-center justify-center shrink-0 backdrop-blur-md shadow-lg transition-colors
            ${isEmergency ? 'bg-rose-500/20 border-rose-400' : 'bg-indigo-500/20 border-indigo-400/50'}`}>
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEmergency ? 'bg-rose-400' : 'bg-cyan-400'}`}></span>
              <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isEmergency ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"} />
              </svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {isEmergency ? 'Emergency Tracking' : `${firstName}'s Tracking`}
            </h2>
            <p className="text-indigo-100 font-medium mt-1 text-sm md:text-base">
              {isEmergency ? '🚨 SOS: High-Priority Broadcasting Active' : 'High-Precision GPS Link Active'}
            </p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
           <div className="text-right">
             <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Satellite Link</p>
             <p className="text-xl font-black text-white uppercase tracking-tight">{isEmergency ? 'Priority' : 'Secured'}</p>
           </div>
        </div>
      </div>

      {/* 📊 Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm flex items-center gap-5 group transition-all">
          <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center transition-colors ${isEmergency ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{isEmergency ? '< 1 Meter' : '< 3 Meters'}</p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm flex items-center gap-5 group transition-all">
          <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Geofence</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{isEmergency ? 'Exited Zone' : 'Inside Zone'}</p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-sm flex items-center gap-5 group transition-all">
          <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center ${isEmergency ? 'bg-rose-600 text-white animate-bounce' : 'bg-emerald-50 text-emerald-600'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Shield Status</p>
            <p className={`text-2xl font-black tracking-tight ${isEmergency ? 'text-rose-600' : 'text-emerald-500'}`}>{isEmergency ? 'ALERT' : 'PROTECTED'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-xl flex flex-col">
           <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isEmergency ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618" /></svg>
                </div>
                Movement Radar
              </h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-ping ${isEmergency ? 'bg-rose-600' : 'bg-blue-500'}`}></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isEmergency ? 'Distress Signal Active' : 'Active Sync'}</span>
              </div>
           </div>
           
           <div className={`bg-slate-900 dark:bg-black rounded-3xl h-100 w-full relative overflow-hidden border-2 transition-all duration-500 ${isEmergency ? 'border-rose-500 shadow-rose-500/20' : 'border-slate-200 dark:border-slate-800'}`}>
              <MapContainer key={isEmergency ? "emergency" : "normal"} center={currentPos} zoom={isEmergency ? 17 : 15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                <Marker position={currentPos} icon={movingIcon}>
                  <Popup className="rounded-xl font-bold">
                    {isEmergency ? "🚨 INCIDENT SITE" : `${firstName}'s Current Location`}
                  </Popup>
                </Marker>
              </MapContainer>
           </div>
         </div>

         <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-xl flex flex-col h-full max-h-137.5">
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Route Intelligence</h3>
           
           <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative custom-scrollbar">
             <div className="absolute left-4.75 top-2 bottom-2 w-0.5 bg-linear-to-b from-blue-500 via-slate-200 dark:via-slate-700 to-transparent"></div>

             {isEmergency && (
               <div className="relative pl-12 group animate-pulse">
                <div className="absolute left-3 top-1 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1)] z-10"></div>
                <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest mb-1">Alert Triggered</p>
                <p className="text-sm font-bold text-rose-800 dark:text-white leading-tight">Accident Site identified at Sector-4.</p>
               </div>
             )}

             <div className="relative pl-12 group">
               <div className="absolute left-3 top-1 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1)] z-10"></div>
               <p className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest mb-1">{isEmergency ? '2 mins ago' : 'Live Update'}</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">Stationary at MITS Campus</p>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Satellite sync confirmed.</p>
             </div>
           </div>

           <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
             <button className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-black rounded-xl hover:shadow-lg transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0021 6.832V17.168a1 1 0 01-.553.894L15 20l-6-3-6 3-1.447-.724A1 1 0 011 18.382" /></svg>
                Sync Device GPS
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}