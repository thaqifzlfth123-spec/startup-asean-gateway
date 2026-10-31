import React, { useState } from 'react';
import { 
  Coins, Rocket, Handshake, Users, ArrowUpRight, Check, ExternalLink, 
  MapPin, ShieldCheck, Sparkles, Filter, ChevronRight, FileCheck2, Info 
} from 'lucide-react';
import { ASEAN_OPPORTUNITIES, ASEAN_TALENTS, CROSS_BORDER_CHECKLIST } from '../data/aseanData';

export default function VerifiedDashboard({ verifiedStartup }) {
  const [activeTab, setActiveTab] = useState('funding'); // 'funding' | 'programmes' | 'partners' | 'talent'
  const [appliedItems, setAppliedItems] = useState({});

  if (!verifiedStartup) {
    return (
      <div id="dashboard" className="py-12 text-center text-slate-400">
        <p className="text-sm">Scan your certificate above to unlock your personalized ASEAN opportunity dashboard.</p>
      </div>
    );
  }

  const handleApply = (id) => {
    setAppliedItems(prev => ({ ...prev, [id]: true }));
  };

  const fundingOpps = ASEAN_OPPORTUNITIES.filter(o => o.category === 'Funding');
  const programmeOpps = ASEAN_OPPORTUNITIES.filter(o => o.category === 'Programmes');
  const partnerOpps = ASEAN_OPPORTUNITIES.filter(o => o.category === 'Partners');

  return (
    <section id="dashboard" className="py-12 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Startup Context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                Personalized AI Gateway
              </span>
              <span className="text-xs text-slate-400">• Certified Jurisdiction: {verifiedStartup.country}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Opportunities Matched for <span className="text-cyan-400">{verifiedStartup.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Gemma 4 AI has matched your verified legal entity with regional funding, acceleration, cross-border soft landing, and technical talent.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('funding')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'funding'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Funding & Grants ({fundingOpps.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('programmes')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'programmes'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Programmes ({programmeOpps.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Handshake className="w-3.5 h-3.5" />
              <span>Soft Landing & Partners ({partnerOpps.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('talent')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'talent'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Vetted Talent ({ASEAN_TALENTS.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Funding & Grants */}
        {activeTab === 'funding' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundingOpps.map((opp) => {
              const isApplied = appliedItems[opp.id];
              return (
                <div key={opp.id} className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                        {opp.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> {opp.countryName}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300">
                      {opp.title}
                    </h3>
                    <div className="text-xs text-slate-400 mb-3 font-medium">Provider: {opp.provider}</div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wide">Grant / Check Size</div>
                      <div className="text-sm font-extrabold text-emerald-400">{opp.amount}</div>
                    </div>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed line-clamp-3">
                      {opp.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1.5">Eligibility:</span>
                      <ul className="space-y-1">
                        {opp.eligibility.map((el, idx) => (
                          <li key={idx} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <a
                      href={opp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Agency Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handleApply(opp.id)}
                      disabled={isApplied}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-500/20'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Fast-Track Claimed</span>
                        </>
                      ) : (
                        <>
                          <span>Apply via Gateway</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Programmes & Accelerators */}
        {activeTab === 'programmes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmeOpps.map((opp) => {
              const isApplied = appliedItems[opp.id];
              return (
                <div key={opp.id} className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {opp.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-400" /> {opp.countryName}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">
                      {opp.title}
                    </h3>
                    <div className="text-xs text-slate-400 mb-3 font-medium">Organizer: {opp.provider}</div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wide">Investment / Pilot</div>
                      <div className="text-sm font-extrabold text-cyan-300">{opp.amount}</div>
                    </div>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1.5">Who Should Apply:</span>
                      <ul className="space-y-1">
                        {opp.eligibility.map((el, idx) => (
                          <li key={idx} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <a
                      href={opp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Program Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handleApply(opp.id)}
                      disabled={isApplied}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </>
                      ) : (
                        <>
                          <span>Express Pitch</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Soft Landing & Cross-Border Partners */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            
            {/* Cross Border Soft Landing Readiness Checklist */}
            <div className="glass-card rounded-2xl p-6 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  ASEAN Soft-Landing Checklist: {verifiedStartup.country} ➡️ Regional Expansion
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {(verifiedStartup.countryCode === 'MY' ? CROSS_BORDER_CHECKLIST.MY_TO_SG : CROSS_BORDER_CHECKLIST.DEFAULT).map((item, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-white">{item.step}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Providers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partnerOpps.map((opp) => (
                <div key={opp.id} className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {opp.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{opp.countryName}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{opp.title}</h3>
                    <div className="text-xs text-slate-400 mb-3">Partner: {opp.provider}</div>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">{opp.description}</p>
                  </div>

                  <a
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-center text-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Connect with Partner</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 4: Vetted Talent Matching */}
        {activeTab === 'talent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ASEAN_TALENTS.map((talent) => {
              const isInvited = appliedItems[talent.id];
              return (
                <div key={talent.id} className="glass-card-interactive rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-white">{talent.name}</h4>
                          <span className="text-xs">{talent.countryCode === 'MY' ? '🇲🇾' : talent.countryCode === 'SG' ? '🇸🇬' : talent.countryCode === 'ID' ? '🇮🇩' : '🇻🇳'}</span>
                        </div>
                        <p className="text-xs text-cyan-300 font-medium">{talent.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 mb-3">
                      <span className="text-slate-400">Gemma Match</span>
                      <span className="font-extrabold text-emerald-400">{talent.matchScore}% Match</span>
                    </div>

                    <p className="text-xs text-slate-300 mb-3 line-clamp-3 leading-relaxed">
                      {talent.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {talent.skills.map((skill, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">{talent.hourlyRate}</span>
                    <button
                      onClick={() => handleApply(talent.id)}
                      disabled={isInvited}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isInvited
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      }`}
                    >
                      {isInvited ? 'Invited' : 'Connect'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
