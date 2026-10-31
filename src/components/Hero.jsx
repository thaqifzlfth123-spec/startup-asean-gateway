import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Zap, Coins, Building2, Users } from 'lucide-react';
import { ASEAN_COUNTRIES } from '../data/aseanData';

export default function Hero({ onStartScan, onExplore }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Hackathon Track Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-cyan-300">Hacktoberfest Hack Day KL 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Challenge 2: Overcoming ASEAN Fragmentation</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Show Your Startup Cert. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Unlock Funding, Partners & Talent
          </span> Across ASEAN.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Powered by <strong className="text-cyan-300 font-semibold">Gemma 4 Multimodal Vision</strong>. Turn your official SSM, ACRA, or NIB business certificate into an instant cross-border passport for Southeast Asia’s \$45M+ grant and venture ecosystem.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartScan}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-200" />
            <span>Scan Certificate with Gemma 4</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Browse ASEAN Directory</span>
          </button>
        </div>

        {/* Country Flags Corridor */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Integrated Registries:</span>
          {ASEAN_COUNTRIES.filter(c => c.code !== 'ALL').map((c) => (
            <div key={c.code} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-300 font-medium">
              <span className="text-base">{c.flag}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-xl text-left border-l-2 border-l-cyan-400">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Regional Funding</span>
              <Coins className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">$45M+</div>
            <div className="text-[11px] text-slate-400">Cradle, ESG, NIA, VCs</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-left border-l-2 border-l-blue-500">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Verified Startups</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">1,420+</div>
            <div className="text-[11px] text-slate-400">Across 6 Member States</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-left border-l-2 border-l-indigo-500">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Vetted Talent</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">3,850+</div>
            <div className="text-[11px] text-slate-400">Engineers, Growth & Execs</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-left border-l-2 border-l-emerald-500">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Soft-Landing Hubs</span>
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">28 Hubs</div>
            <div className="text-[11px] text-slate-400">DOJO, Antler, Sunway iLabs</div>
          </div>
        </div>

      </div>
    </section>
  );
}
