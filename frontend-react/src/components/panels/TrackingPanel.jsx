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

export default function TrackingPanel() {
  
  // ✨ FIX: Define the missing map variables right here!
  const mapCenter = [26.2183, 78.1828]; // Gwalior coordinates

  // ✨ UPGRADE: Premium glowing map icons using Tailwind classes
  const movingIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-4 h-4 bg-indigo-500 border-2 border-white dark:border-slate-800 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  const homeIcon = L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-8 relative overflow-hidden shadow-lg shadow-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgNDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center shrink-0 backdrop-blur-md">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
              <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Live Family Radar</h2>
            <p className="text-blue-100 font-medium mt-1">Real-time GPS synchronization active</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Coverage</p>
            <p className="text-xl font-black text-white">100%</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/50 flex items-center justify-center text-white font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Network Distribution */}
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>
            Network Distribution
          </h3>
          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-wider rounded-md border border-indigo-100 dark:border-indigo-500/20">8 Devices Online</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* ... (Keep all your existing stat blocks here) ... */}
          <div className="bg-slate-50/80 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 p-4 rounded-2xl flex flex-col items-center justify-center transition-all group hover:shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
            <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">4</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">At Home</span>
          </div>
          {/* Add back the other 4 stat blocks here if needed, keeping code short for clarity! */}
        </div>
      </div>

      {/* Map & Alerts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* THE MAP */}
          <div className="bg-slate-900 rounded-[2rem] h-80 w-full relative overflow-hidden shadow-lg border-2 border-slate-800 z-0">
            <div className="absolute top-4 right-4 z-[400] bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-xl flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
            </div>
            <MapContainer key="family-safe-map" center={mapCenter} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
              <Marker position={[26.2183, 78.1828]} icon={movingIcon}><Popup className="rounded-xl font-bold text-slate-800">Dev - Moving</Popup></Marker>
              <Marker position={[26.2250, 78.1700]} icon={homeIcon}><Popup className="rounded-xl font-bold text-slate-800">Priya - Safe</Popup></Marker>
            </MapContainer>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Active Journeys</h3>
              <button className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider hover:underline">View History</button>
            </div>
            
            <div className="bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-md cursor-default group relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400 dark:bg-indigo-500"></div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-100 dark:from-indigo-900/40 to-blue-100 dark:to-blue-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-xl border-2 border-white dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform">
                      D
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">Dev</p>
                    <p className="text-[10px] font-extrabold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mt-0.5">Heading to MITS Gwalior</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">14<span className="text-base text-slate-400 dark:text-slate-500 font-medium ml-1">mins</span></p>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">Est. Arrival</p>
                </div>
              </div>
              
              <div className="relative pt-4">
                <div className="flex justify-between text-[10px] font-extrabold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">
                  <span className="text-slate-600 dark:text-slate-400">Home</span>
                  <span className="text-indigo-600 dark:text-indigo-400">College</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner dark:shadow-none relative">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full w-[65%] relative"></div>
                </div>
                <div className="absolute top-[28px] left-[65%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-800 border-2 border-indigo-500 rounded-full shadow-md flex items-center justify-center z-10">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Alerts */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Location Alerts</h3>
            <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide animate-pulse">2 Unread</span>
          </div>
          
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-amber-50/50 dark:bg-amber-900/20 hover:bg-amber-50 dark:hover:bg-amber-900/30 border border-amber-100 dark:border-amber-500/30 p-4 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 dark:bg-amber-500"></div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner dark:shadow-none shrink-0 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Route Deviation</p>
                    <p className="text-[9px] font-bold text-amber-500 uppercase tracking-wider ml-2">Just Now</p>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                    Dev strayed 500m off the usual route to MITS Gwalior.
                  </p>
                  <button className="flex items-center gap-1 text-[10px] font-extrabold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/30 px-2 py-1 rounded uppercase tracking-wider transition-colors border border-amber-200 dark:border-amber-500/30">
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}