import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function TrackingPanel({ isTestMode, liveMemberData }) {
  const [members, setMembers] = useState([]);
  const mapCenter = [26.2183, 78.1828]; // Gwalior (MITS Area)

  // 🛰️ Fetch real member data from the database
  useEffect(() => {
    const fetchTrackingData = async () => {
      const rawUser = localStorage.getItem('familySafeUser');
      if (!rawUser) return;
      const { familyCode } = JSON.parse(rawUser);
      try {
        const res = await fetch(`https://familysafe-xcoder.onrender.com/api/family-members/${familyCode}`);
        const data = await res.json();
        if (data.success) setMembers(data.members);
      } catch (err) {
        console.error("Tracking Fetch Error:", err);
      }
    };
    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🛠️ Merge simulation data for instant response
  const displayMembers = members.map(m => (m.phone === liveMemberData?.phone) ? liveMemberData : m);

  // 🎨 Dynamic Map Icons
  const createMarkerIcon = (isAlert) => L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-6 h-6 ${isAlert ? 'bg-rose-600 animate-bounce' : 'bg-indigo-500'} border-2 border-white rounded-full shadow-lg flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full ${isAlert ? 'animate-ping' : ''}"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* 🚀 Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-8 relative overflow-hidden shadow-lg shadow-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center shrink-0 backdrop-blur-md">
             <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Live Family Radar</h2>
            <p className="text-blue-100 font-medium mt-1">Actively tracking {displayMembers.length} members</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* 🗺️ DYNAMIC MAP */}
          <div className="bg-slate-900 rounded-[2rem] h-96 w-full relative overflow-hidden shadow-lg border-2 border-slate-800 z-0">
            <MapContainer center={mapCenter} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
              {displayMembers.map((m, idx) => {
                const isAlert = isTestMode && (m.status === 'FALL_ALERT' || m.status === 'SOS');
                // Use member data or fallback to MITS Gwalior nearby coordinates
                const pos = [26.2183 + (idx * 0.002), 78.1828 + (idx * 0.002)];
                return (
                  <Marker key={m._id} position={pos} icon={createMarkerIcon(isAlert)}>
                    <Popup className="rounded-xl font-bold">
                      {m.name} - {isAlert ? 'EMERGENCY' : 'Safe'}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* 📋 ACTIVE JOURNEYS */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Real-time Location Status</h3>
            <div className="space-y-4">
              {displayMembers.map(m => {
                const isAlert = isTestMode && (m.status === 'FALL_ALERT' || m.status === 'SOS');
                return (
                  <div key={m._id} className={`rounded-2xl p-6 transition-all duration-300 border ${isAlert ? 'bg-rose-50 border-rose-200 animate-pulse shadow-lg shadow-rose-500/10' : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50'}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black border-2 border-white ${isAlert ? 'bg-rose-600' : 'bg-indigo-600'}`}>
                          {m.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white text-lg">{m.name}</p>
                          <p className={`text-[10px] font-extrabold uppercase tracking-wider ${isAlert ? 'text-rose-600' : 'text-indigo-500'}`}>
                            {isAlert ? 'Emergency: Possible Fall Detected' : 'Location: MITS Gwalior Area'}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${isAlert ? 'bg-rose-500 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
                        {isAlert ? 'Immediate Action' : 'Safe'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🚨 LOCATION ALERTS */}
        <div className="xl:col-span-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col h-full">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 tracking-tight">Location Alerts</h3>
          <div className="space-y-4">
            {isTestMode && displayMembers.some(m => m.status !== 'Online') ? (
              displayMembers.filter(m => m.status !== 'Online').map(alertM => (
                <div key={alertM._id} className="relative overflow-hidden bg-rose-50 dark:bg-rose-900/20 border border-rose-200 p-4 rounded-2xl transition-all">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                  <p className="text-sm font-bold text-rose-700 dark:text-white uppercase tracking-tighter">Movement Alert</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    {alertM.name} triggered an alert at the current site. Check live feed.
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <svg className="w-12 h-12 mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-[10px] font-black uppercase tracking-widest">No Deviations</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}