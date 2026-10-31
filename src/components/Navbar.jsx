import React, { useState } from 'react';
import { Globe, Sparkles, ShieldCheck, UserCheck, Briefcase, Award } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Badge */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-teal-700 p-[2px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-50 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-teal-700 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">Startup<span className="text-teal-700">ASEAN</span></span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded-full bg-teal-700/10 text-teal-700 border border-teal-200/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Gemma 4 AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Unified Cross-Border Gateway • MLH Hacktoberfest KL</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="hidden md:flex items-center bg-white/90 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveRole('founder')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'founder'
                  ? 'bg-teal-700 text-slate-900 shadow-sm shadow-blue-500/30 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Founder (Cert Verify)
            </button>
            <button
              onClick={() => setActiveRole('talent')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'talent'
                  ? 'bg-teal-700 text-slate-900 shadow-sm shadow-indigo-500/30 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Talent & Builders
            </button>
            <button
              onClick={() => setActiveRole('partner')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'partner'
                  ? 'bg-emerald-600 text-slate-900 shadow-sm shadow-emerald-500/30 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/60'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Ecosystem & VCs
            </button>
          </div>

          {/* Primary action */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => {
                setActiveRole('founder');
                setTimeout(() => {
                  document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-700 text-slate-900 shadow-md shadow-blue-500/20 hover:hover:transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Verify Startup</span>
            </button>
          </div>

        </div>

        {/* Mobile Role Switcher */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200/60 text-xs">
          <button
            onClick={() => setActiveRole('founder')}
            className={`px-2 py-1 rounded ${activeRole === 'founder' ? 'text-teal-700 font-bold bg-white' : 'text-slate-500'}`}
          >
            Founder
          </button>
          <button
            onClick={() => setActiveRole('talent')}
            className={`px-2 py-1 rounded ${activeRole === 'talent' ? 'text-teal-700 font-bold bg-white' : 'text-slate-500'}`}
          >
            Talent
          </button>
          <button
            onClick={() => setActiveRole('partner')}
            className={`px-2 py-1 rounded ${activeRole === 'partner' ? 'text-emerald-400 font-bold bg-white' : 'text-slate-500'}`}
          >
            VCs & Partners
          </button>
        </div>
      </div>
    </header>
  );
}
