import React, { useState } from 'react';
import { Globe, Sparkles, Key, ShieldCheck, UserCheck, Briefcase, Award } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole, onOpenApiKeyModal, hasCustomKey }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Badge */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">Startup<span className="text-cyan-400">ASEAN</span></span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded-full bg-blue-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Gemma 4 AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Unified Cross-Border Gateway • MLH Hacktoberfest KL</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveRole('founder')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'founder'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Founder (Cert Verify)
            </button>
            <button
              onClick={() => setActiveRole('talent')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'talent'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Talent & Builders
            </button>
            <button
              onClick={() => setActiveRole('partner')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'partner'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Ecosystem & VCs
            </button>
          </div>

          {/* API Key Modal & Stats */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                hasCustomKey
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
              title="Google AI Studio / Gemma API Key"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{hasCustomKey ? 'Live Gemma Key: Active' : 'API Key: Demo / AI Studio'}</span>
            </button>

            <a
              href="#scanner"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-blue-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Verify Startup</span>
            </a>
          </div>

        </div>

        {/* Mobile Role Switcher */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60 text-xs">
          <button
            onClick={() => setActiveRole('founder')}
            className={`px-2 py-1 rounded ${activeRole === 'founder' ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'}`}
          >
            Founder
          </button>
          <button
            onClick={() => setActiveRole('talent')}
            className={`px-2 py-1 rounded ${activeRole === 'talent' ? 'text-indigo-400 font-bold bg-slate-900' : 'text-slate-400'}`}
          >
            Talent
          </button>
          <button
            onClick={() => setActiveRole('partner')}
            className={`px-2 py-1 rounded ${activeRole === 'partner' ? 'text-emerald-400 font-bold bg-slate-900' : 'text-slate-400'}`}
          >
            VCs & Partners
          </button>
        </div>
      </div>
    </header>
  );
}
