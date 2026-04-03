import React from 'react';

export default function Header({ context }) {
  return (
    <header className="w-full px-8 py-6 flex items-center justify-between border-b border-white/10 bg-[#020617]/50 backdrop-blur-md">
      <h2 className="text-xl font-medium text-slate-300 tracking-wide">
        {context || "Global Overview"}
      </h2>
      
      <div className="flex items-center gap-4">
        {/* Simple Profile Placeholder */}
        <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm">
          A
        </div>
      </div>
    </header>
  );
}