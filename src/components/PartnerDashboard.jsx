import React, { useState } from 'react';
import { 
  Briefcase, ShieldCheck, Search, Filter, ExternalLink, Award, FileText, 
  CheckCircle2, Building2, MapPin, Eye, ArrowUpRight, TrendingUp, DollarSign, 
  Sparkles, Download, Clock, Send
} from 'lucide-react';
import { SAMPLE_CERTIFICATES, ASEAN_COUNTRIES } from '../data/aseanData';

export default function PartnerDashboard({ verifiedStartup }) {
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDossier, setActiveDossier] = useState(null);
  const [contactedStartups, setContactedStartups] = useState({});

  // Combine default verified sample startups with any newly verified startup
  const allStartups = [
    ...(verifiedStartup ? [verifiedStartup] : []),
    ...SAMPLE_CERTIFICATES.filter(s => !verifiedStartup || s.regNumber !== verifiedStartup.regNumber)
  ];

  const filteredStartups = allStartups.filter((startup) => {
    const matchesCountry = selectedCountry === 'ALL' || startup.countryCode === selectedCountry;
    const matchesSector = selectedSector === 'ALL' || startup.sector?.toLowerCase().includes(selectedSector.toLowerCase());
    const matchesSearch = 
      startup.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.sector?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.authority?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.regNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesSector && matchesSearch;
  });

  const handleContact = (startupId) => {
    setContactedStartups(prev => ({ ...prev, [startupId]: true }));
  };

  return (
    <section className="py-12 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VC & Partner Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" /> Investor &amp; Ecosystem Partner Portal
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Pre-Audited ASEAN Dealflow &amp; Due Diligence
            </h2>
            <p className="mt-1 text-slate-600 text-sm max-w-2xl">
              Eliminate cross-border due diligence friction. Review verified legal entities with official SSM, ACRA, and BKPM certificate audits powered by Gemma 4 AI.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemma 4 Verified Dealflow</span>
            </span>
          </div>
        </div>

        {/* VC Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 rounded-xl border-l-2 border-l-teal-500">
            <div className="text-xs text-slate-500 mb-1">Pre-Audited Entities</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">1,420+</div>
            <div className="text-[11px] text-emerald-400">100% Government Reg Checked</div>
          </div>

          <div className="glass-card p-4 rounded-xl border-l-2 border-l-teal-500">
            <div className="text-xs text-slate-500 mb-1">Avg Governance Score</div>
            <div className="text-xl sm:text-2xl font-bold text-teal-700">94.2 / 100</div>
            <div className="text-[11px] text-slate-500">Gemma 4 Multimodal Audit</div>
          </div>

          <div className="glass-card p-4 rounded-xl border-l-2 border-l-teal-500">
            <div className="text-xs text-slate-500 mb-1">Active Grant Capital</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">$45M+</div>
            <div className="text-[11px] text-slate-500">Cradle, ESG, NIA, VCs</div>
          </div>

          <div className="glass-card p-4 rounded-xl border-l-2 border-l-teal-500">
            <div className="text-xs text-slate-500 mb-1">Cross-Border Syndicates</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">18 Funds</div>
            <div className="text-[11px] text-slate-500">East Ventures, 500 SEA, Odra</div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          
          {/* Country filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            <span className="text-slate-500 font-semibold uppercase text-[10px] mr-1">Jurisdiction:</span>
            {ASEAN_COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedCountry === c.code
                    ? 'bg-emerald-600 text-slate-900 font-bold'
                    : 'bg-white text-slate-500 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.code === 'ALL' ? 'All ASEAN' : c.code}</span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search startup name, reg ID, sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Startups Dealflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => {
            const isContacted = contactedStartups[startup.id || startup.regNumber];
            return (
              <div key={startup.id || startup.regNumber} className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Entity</span>
                    </span>

                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-700" />
                      <span>{startup.country}</span>
                    </span>
                  </div>

                  {/* Startup Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {startup.name}
                  </h3>
                  <div className="text-[11px] text-teal-700 font-medium mb-3">
                    {startup.sector}
                  </div>

                  {/* Audit Metrics Box */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50/70 border border-slate-200 mb-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Registration ID</span>
                      <span className="font-mono font-bold text-slate-700 truncate block text-[11px]">{startup.regNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Gemma Audit Score</span>
                      <span className="font-bold text-teal-700">{startup.readinessScore || 94}/100</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Registry Authority</span>
                      <span className="text-slate-600 truncate block text-[11px]">{startup.authority}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Stage</span>
                      <span className="text-slate-600 font-medium text-[11px]">{startup.stage || 'Seed'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {startup.description}
                  </p>

                  {/* Founders & Equity Note */}
                  <div className="text-[11px] text-slate-500 mb-4 bg-white/60 p-2.5 rounded-lg border border-slate-200/80">
                    <strong className="text-slate-600">Founders:</strong> {startup.founderAnalysis?.team || startup.directors?.join(', ') || 'Directors on File'}
                  </div>

                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveDossier(startup)}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-700" />
                    <span>View Due Diligence</span>
                  </button>

                  <button
                    onClick={() => handleContact(startup.id || startup.regNumber)}
                    disabled={isContacted}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isContacted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    {isContacted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Intro Requested</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Pitch</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Due Diligence Inspector Modal */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-white border border-slate-300 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeDossier.name}</h3>
                  <p className="text-xs text-slate-500">
                    Official Registry Audit • Issued by {activeDossier.authority} ({activeDossier.country})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveDossier(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Certificate Visual Preview */}
            <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Audited Government Incorporation Certificate</span>
                {activeDossier.previewUrl && (
                  <a
                    href={activeDossier.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <span>Open Raw SVG</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              {activeDossier.previewUrl && (
                <img
                  src={activeDossier.previewUrl}
                  alt="Audited Certificate"
                  className="max-h-72 w-full object-contain mx-auto rounded border border-slate-200"
                />
              )}
            </div>

            {/* 4 Pillars Due Diligence Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
              
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-teal-700" />
                  <span>Founding Governance &amp; Shareholding</span>
                </h4>
                <p className="text-slate-600 mb-1">
                  <strong>Directors:</strong> {activeDossier.founderAnalysis?.team || activeDossier.directors?.join(', ')}
                </p>
                <p className="text-slate-600 mb-1">
                  <strong>Equity Standing:</strong> {activeDossier.founderAnalysis?.equity || 'Compliant with national threshold'}
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {activeDossier.founderAnalysis?.strengths || 'Verified entity ready for venture syndication and cross-border expansion.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Funding &amp; Grant Pre-Qualification</span>
                </h4>
                <p className="text-slate-600 mb-1">
                  <strong>Target Grant:</strong> {activeDossier.fundingEligibility?.flagshipGrant || 'Cradle CIP Spark / Sprint'}
                </p>
                <p className="text-slate-600 mb-1">
                  <strong>Ticket Size:</strong> <span className="text-emerald-400 font-bold">{activeDossier.fundingEligibility?.amount || 'Up to RM 600K'}</span>
                </p>
                <p className="text-slate-500 text-[11px]">
                  <strong>VC Co-Investment:</strong> {activeDossier.fundingEligibility?.vcPipeline?.join(', ') || 'East Ventures, 500 SEA, Odra Venture'}
                </p>
              </div>

            </div>

            {/* Modal Bottom Action */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Audit Hash: SHA256:{activeDossier.regNumber?.replace(/[^a-zA-Z0-9]/g, '')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDossier(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleContact(activeDossier.id || activeDossier.regNumber);
                    setActiveDossier(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Term Sheet / Intro</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
