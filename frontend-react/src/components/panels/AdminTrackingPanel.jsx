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

export default function AdminTrackingPanel() {

  // Custom Glowing Icons for the Admin Map
  const movingIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-4 h-4 bg-indigo-500 border-2 border-white dark:border-slate-800 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <div className="animate-fade-in-up space-y-8">
              
      <div className="bg-linear-to-r from-slate-900 via-indigo-900 to-blue-900 rounded-4xl p-8 relative overflow-hidden shadow-2xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Master GPS Active</h2>
            <p className="text-indigo-200 font-medium mt-1 text-sm md:text-base">End-to-End Encrypted Location Sync</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center flex items-center gap-4">
           <div className="text-right">
             <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Signal Strength</p>
             <p className="text-xl font-black text-white">Excellent</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex items-center gap-5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Location Accuracy</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">&lt; 3 Meters</p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex items-center gap-5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Active Geofences</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">2 Zones</p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex items-center gap-5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-[1.25rem] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner dark:shadow-none group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Update Frequency</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">Live <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span></p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         
         <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col">
           <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg></div>
                Live Device Radar
              </h3>
              <button className="bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm">Recenter GPS</button>
           </div>
           
           <div className="bg-slate-900 dark:bg-black rounded-3xl h-100 w-full relative overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 z-0">
              <div className="absolute top-4 right-4 z-400 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-xl flex flex-col gap-2">
                 <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                 <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
              </div>
              <MapContainer key="admin-safe-map" center={[26.2183, 78.1828]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                <Marker position={[26.2183, 78.1828]} icon={movingIcon}>
                  <Popup className="rounded-xl font-bold text-slate-800">Admin Device (Master)</Popup>
                </Marker>
              </MapContainer>
           </div>
         </div>

         <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-4xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col h-full max-h-137.5">
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Location Log</h3>
           
           <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative custom-scrollbar">
             <div className="absolute left-4.75 top-2 bottom-2 w-0.5 bg-linear-to-b from-indigo-500 via-slate-200 dark:via-slate-700 to-transparent"></div>

             <div className="relative pl-12 group">
               <div className="absolute left-3 top-1 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1)] group-hover:scale-125 transition-transform z-10"></div>
               <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-extrabold uppercase tracking-widest mb-1">Just Now</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">MITS Gwalior Campus</p>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Device synced with high precision GPS.</p>
             </div>

             <div className="relative pl-12 group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -ml-2 rounded-xl transition-colors">
               <div className="absolute left-5 top-3 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_0_5px_rgba(241,245,249,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1),0_0_0_5px_rgba(30,41,59,1)] group-hover:bg-slate-400 dark:group-hover:bg-slate-500 transition-colors z-10"></div>
               <p className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest mb-1">Today, 09:15 AM</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">In Transit</p>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Speed: 45 km/h. Heading North.</p>
             </div>

             <div className="relative pl-12 group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -ml-2 rounded-xl transition-colors">
               <div className="absolute left-5 top-3 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_0_5px_rgba(241,245,249,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1),0_0_0_5px_rgba(30,41,59,1)] group-hover:bg-slate-400 dark:group-hover:bg-slate-500 transition-colors z-10"></div>
               <p className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest mb-1">Today, 08:30 AM</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">Home</p>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Departed safe zone.</p>
             </div>
             
             <div className="relative pl-12 group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -ml-2 rounded-xl transition-colors">
               <div className="absolute left-5 top-3 w-4 h-4 bg-emerald-400 dark:bg-emerald-500 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_0_5px_rgba(241,245,249,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1),0_0_0_5px_rgba(30,41,59,1)] group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors z-10"></div>
               <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest mb-1">Yesterday, 10:00 PM</p>
               <p className="text-sm font-bold text-slate-800 dark:text-white">Home</p>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Entered safe zone. Night lock activated.</p>
             </div>
           </div>
           
           <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
             <button className="w-full py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               Download Full Log
             </button>
           </div>
         </div>
      </div>

    </div>
  );
}