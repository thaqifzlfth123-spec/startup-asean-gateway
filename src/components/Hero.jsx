import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Coins, Building2, Users } from 'lucide-react';
import { ASEAN_COUNTRIES } from '../data/aseanData';

function AnimatedStat({ value, prefix = '', suffix = '', start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return undefined;
    }

    let frameId;
    let startTime;
    const duration = 1400;

    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * easedProgress));

      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [start, value]);

  return <>{prefix}{count.toLocaleString('en-US')}{suffix}</>;
}

export default function Hero({ onStartScan, onExplore }) {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const statsGrid = statsRef.current;
    if (!statsGrid) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStatsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(statsGrid);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-100/60 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Headline */}
        <h1 className="text-left text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl leading-[1.15]">
          <span className="block text-[1.08em]">Show Your Startup Cert.</span>
          <span className="text-teal-800">
            Unlock Funding, Partners & Talent
          </span> Across ASEAN.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Powered by <strong className="text-teal-700 font-semibold">Gemma 4 Multimodal Vision</strong>. Turn your official SSM, ACRA, or NIB business certificate into an instant cross-border passport for Southeast Asia’s \$45M+ grant and venture ecosystem.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <button
            onClick={onStartScan}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xl shadow-teal-700/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-teal-100" />
            <span>Scan Certificate with Gemma 4</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-300/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Browse ASEAN Directory</span>
          </button>
        </div>

        {/* Country Flags Corridor */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-start gap-3 sm:gap-6 text-xs text-slate-500">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Integrated Registries:</span>
          {ASEAN_COUNTRIES.filter(c => c.code !== 'ALL').map((c) => (
            <button
              key={c.code}
              type="button"
              title={c.name}
              aria-label={c.name}
              className="min-w-14 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold tracking-wide text-slate-700 shadow-sm transition-colors hover:border-teal-700 hover:bg-teal-700 hover:text-white cursor-pointer"
            >
              {c.code}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
          <div style={{ '--stat-delay': '0ms' }} className={`stats-rise-in glass-card p-5 sm:p-6 rounded-xl text-left border-l-2 border-l-teal-500${statsVisible ? ' is-visible' : ''}`}>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-sm font-medium">Regional Funding</span>
              <Coins className="w-5 h-5 text-teal-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900"><AnimatedStat value={45} prefix="$" suffix="M+" start={statsVisible} /></div>
            <div className="text-xs text-slate-500">Cradle, ESG, NIA, VCs</div>
          </div>

          <div style={{ '--stat-delay': '120ms' }} className={`stats-rise-in glass-card p-5 sm:p-6 rounded-xl text-left border-l-2 border-l-teal-500${statsVisible ? ' is-visible' : ''}`}>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-sm font-medium">Verified Startups</span>
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900"><AnimatedStat value={1420} suffix="+" start={statsVisible} /></div>
            <div className="text-xs text-slate-500">Across 6 Member States</div>
          </div>

          <div style={{ '--stat-delay': '240ms' }} className={`stats-rise-in glass-card p-5 sm:p-6 rounded-xl text-left border-l-2 border-l-teal-500${statsVisible ? ' is-visible' : ''}`}>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-sm font-medium">Vetted Talent</span>
              <Users className="w-5 h-5 text-teal-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900"><AnimatedStat value={3850} suffix="+" start={statsVisible} /></div>
            <div className="text-xs text-slate-500">Engineers, Growth & Execs</div>
          </div>

          <div style={{ '--stat-delay': '360ms' }} className={`stats-rise-in glass-card p-5 sm:p-6 rounded-xl text-left border-l-2 border-l-teal-500${statsVisible ? ' is-visible' : ''}`}>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-sm font-medium">Soft-Landing Hubs</span>
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900"><AnimatedStat value={28} suffix=" Hubs" start={statsVisible} /></div>
            <div className="text-xs text-slate-500">DOJO, Antler, Sunway iLabs</div>
          </div>
        </div>

      </div>
    </section>
  );
}
