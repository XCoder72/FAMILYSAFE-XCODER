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

export default function MemberTrackingPanel({ memberData }) {
  const firstName = memberData?.name?.split(' ')[0] || 'Member';

  // Custom Glowing Icon for the Member
  const movingIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-4 h-4 bg-blue-500 border-2 border-white dark:border-slate-800 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <div className="animate-fade-in-up space-y-8">
              
      {/* 🛡️ Top Banner: GPS Status */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-overlay filter blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgNDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center shrink-0 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <svg className="w-6 h-6 text-cyan-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{firstName}'s Tracking</h2>
            <p className="text-indigo-200 font-medium mt-1 text-sm md:text-base">High-Precision GPS Link Active</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
           <div className="text-right">
             <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Satellite Link</p>
             <p className="text-xl font-black text-white uppercase tracking-tight">Secured</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
        </div>
      </div>

{/* 📊 Accuracy & Status Metrics */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
  {/* Location Accuracy */}
  <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex items-center gap-5 group transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner dark:shadow-none">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    </div>
    <div>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Location Accuracy</p>
      <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">&lt; 3 Meters</p>
    </div>
  </div>

  {/* ✨ REPLACED: Active Geofences (Matching Admin Style) */}
  <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex items-center gap-5 group transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner dark:shadow-none">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    </div>
    <div>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Active Geofences</p>
      <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">2 Safe Zones</p>
    </div>
  </div>

  {/* Shield Status */}
  <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex items-center gap-5 group transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 rounded-[1.25rem] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner dark:shadow-none">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    </div>
    <div>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Shield Status</p>
      <p className="text-2xl font-black text-emerald-500 tracking-tight flex items-center gap-2">Protected</p>
    </div>
  </div>

</div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         
         <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-xl flex flex-col">
           <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>
                Live Movement Radar
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Broadcasting</span>
              </div>
           </div>
           
           <div className="bg-slate-900 dark:bg-black rounded-[1.5rem] h-[400px] w-full relative overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 z-0">
              <MapContainer key="member-safe-map" center={[26.2183, 78.1828]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                <Marker position={[26.2183, 78.1828]} icon={movingIcon}>
                  <Popup className="rounded-xl font-bold text-slate-800">{firstName}'s Current Location</Popup>
                </Marker>
              </MapContainer>
           </div>
         </div>

         <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-xl flex flex-col h-full max-h-[550px]">
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Personal Route Log</h3>
           
           <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative custom-scrollbar">
             <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-slate-200 dark:via-slate-700 to-transparent"></div>

             <div className="relative pl-12 group">
               <div className="absolute left-3 top-1 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1)] group-hover:scale-125 transition-transform z-10"></div>
               <p className="text-[10px] text-blue-500 dark:text-blue-400 font-extrabold uppercase tracking-widest mb-1">Live Update</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">Stationary at MITS Campus</p>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Satellite sync confirmed.</p>
             </div>

             <div className="relative pl-12 group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -ml-2 rounded-xl transition-colors">
               <div className="absolute left-5 top-3 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)] transition-colors z-10"></div>
               <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">09:45 AM</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">Transit Area: City Road</p>
               <p className="text-xs font-medium text-slate-500 mt-1">Average speed: 32 km/h.</p>
             </div>

             <div className="relative pl-12 group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -ml-2 rounded-xl transition-colors">
               <div className="absolute left-5 top-3 w-4 h-4 bg-emerald-400 dark:bg-emerald-500 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)] transition-colors z-10"></div>
               <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest mb-1">09:15 AM</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">Departed: Home Zone</p>
               <p className="text-xs font-medium text-slate-500 mt-1">Safe departure confirmed.</p>
             </div>
           </div>
           
           <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
             <button className="w-full py-3 bg-blue-500 text-white font-black rounded-xl hover:bg-blue-600 transition-all text-xs uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
               Request Location Update
             </button>
           </div>
         </div>
      </div>

    </div>
  );
}