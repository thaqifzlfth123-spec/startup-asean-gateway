import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';
import { ASEAN_COUNTRIES, ASEAN_OPPORTUNITIES } from '../data/aseanData';

export default function AseanExplorer({ verifiedStartup }) {
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOthersOpen, setIsOthersOpen] = useState(false);

  // Filter opportunities by country, category, and search query
  const filteredOpportunities = ASEAN_OPPORTUNITIES.filter((opp) => {
    const matchesCountry =
      selectedCountry === 'ALL' || opp.country === selectedCountry || opp.country === 'ALL';
    const matchesCategory = selectedCategory === 'ALL' || opp.category === selectedCategory;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.countryName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesCategory && matchesSearch;
  });

  // Rank by relevance (to verifiedStartup if available, otherwise flagship featured ASEAN items first)
  const rankedOpportunities = [...filteredOpportunities].sort((a, b) => {
    const getRelevanceScore = (opp) => {
      let score = opp.featured ? 25 : 0;

      if (verifiedStartup) {
        if (opp.country === verifiedStartup.countryCode) score += 40;
        else if (opp.country === 'ALL') score += 20;

        const sectorWords = (verifiedStartup.sector || '')
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter((w) => w.length > 2);
        const oppText = `${opp.title} ${opp.description} ${opp.eligibility?.join(' ')}`.toLowerCase();
        for (const word of sectorWords) {
          if (oppText.includes(word)) score += 15;
        }
      } else {
        if (opp.country === 'ALL') score += 5;
      }

      return score;
    };

    return getRelevanceScore(b) - getRelevanceScore(a);
  });

  // Top 6 most related shown immediately; remaining hidden inside collapsible drop bar
  const topSixOpportunities = rankedOpportunities.slice(0, 6);
  const remainingOpportunities = rankedOpportunities.slice(6);

  const renderOpportunityCard = (opp, isTopRelated = false) => (
    <div key={opp.id} className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
              {opp.badge}
            </span>
            {isTopRelated && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                Top Related
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
            <MapPin className="w-3 h-3 text-cyan-400" /> {opp.countryName}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1">{opp.title}</h3>
        <div className="text-xs text-slate-400 mb-3">{opp.provider}</div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 mb-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">Offering / Ticket Size</div>
          <div className="text-sm font-extrabold text-emerald-400">{opp.amount}</div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed line-clamp-3">
          {opp.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">{opp.category}</span>
        <a
          href={opp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-cyan-200 text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <span>View Official Portal</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );

  return (
    <section id="explorer" className="py-16 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> ASEAN Unified Directory
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Single Gateway to the ASEAN Ecosystem
            </h2>
            <p className="mt-1 text-slate-300 text-sm max-w-2xl">
              Showing the <strong className="text-cyan-300">6 most relevant</strong> grants, venture funds, accelerators, and soft-landing corridors{verifiedStartup ? ` tailored for ${verifiedStartup.name}` : ' across ASEAN'}. Expand the drop bar below to view more.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search grants, VCs, hubs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOthersOpen(false);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Filter Bar: Countries & Categories */}
        <div className="space-y-3 mb-8">
          {/* Countries */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-semibold uppercase text-[10px] whitespace-nowrap mr-1">
              Jurisdiction:
            </span>
            {ASEAN_COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country.code);
                  setIsOthersOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCountry === country.code
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-semibold uppercase text-[10px] whitespace-nowrap mr-1">
              Type:
            </span>
            {['ALL', 'Funding', 'Programmes', 'Partners'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsOthersOpen(false);
                }}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Opportunities' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Top 6 Most Related Cards Grid */}
        {topSixOpportunities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSixOpportunities.map((opp) => renderOpportunityCard(opp, true))}
            </div>

            {/* Collapsible Drop Bar for Remaining Opportunities */}
            {remainingOpportunities.length > 0 && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsOthersOpen((prev) => !prev)}
                  className="w-full p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>
                          {isOthersOpen
                            ? `Hide Additional ASEAN Opportunities (${remainingOpportunities.length})`
                            : `More ASEAN Ecosystem Opportunities (${remainingOpportunities.length} others)`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {isOthersOpen
                          ? 'Click to collapse additional grants, venture funds, and partner corridors'
                          : `Includes ${remainingOpportunities
                              .slice(0, 3)
                              .map((o) => o.title)
                              .join(', ')}${remainingOpportunities.length > 3 ? ', and more...' : ''}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-cyan-300 self-end sm:self-auto shrink-0">
                    <span>{isOthersOpen ? 'Collapse Drop Bar' : 'Expand Drop Bar'}</span>
                    {isOthersOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOthersOpen && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {remainingOpportunities.map((opp) => renderOpportunityCard(opp, false))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800">
            <p className="text-sm">No opportunities match your current search or filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCountry('ALL');
                setSelectedCategory('ALL');
                setSearchQuery('');
                setIsOthersOpen(false);
              }}
              className="mt-3 px-3 py-1.5 text-xs text-cyan-400 font-semibold underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
