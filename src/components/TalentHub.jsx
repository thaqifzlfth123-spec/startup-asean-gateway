import React, { useState } from 'react';
import { Users, Sparkles, Code, CheckCircle2, ArrowRight, MapPin, Briefcase, PlusCircle, ShieldCheck } from 'lucide-react';
import { ASEAN_TALENTS, SAMPLE_CERTIFICATES } from '../data/aseanData';

export default function TalentHub({ verifiedStartup }) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [talentList, setTalentList] = useState(ASEAN_TALENTS);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    country: 'Malaysia',
    countryCode: 'MY',
    skills: '',
    rate: '$40/hr',
    bio: ''
  });

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.title) return;

    const newTalent = {
      id: `tal-custom-${Date.now()}`,
      name: formData.name,
      title: formData.title,
      country: formData.country,
      countryCode: formData.countryCode,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experience: 'Verified ASEAN Builder',
      availability: 'Open to Cross-Border Projects',
      hourlyRate: formData.rate,
      matchScore: 95,
      bio: formData.bio || 'Passionate open-source and AI builder ready for regional scale.'
    };

    setTalentList([newTalent, ...talentList]);
    setShowJoinModal(false);
    setFormData({ name: '', title: '', country: 'Malaysia', countryCode: 'MY', skills: '', rate: '$40/hr', bio: '' });
  };

  return (
    <section id="talenthub" className="py-16 bg-slate-50/40 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/10 border border-teal-200/30 text-teal-700 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" /> ASEAN Cross-Border Talent Network
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Where Certified Startups Meet Regional Builders
            </h2>
            <p className="mt-1 text-slate-600 text-sm max-w-2xl">
              Solve talent fragmentation. Connect high-growth verified startups with AI engineers, full-stack builders, and growth leaders across Southeast Asia.
            </p>
          </div>

          <button
            onClick={() => setShowJoinModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-700 hover:hover:text-slate-900 font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Join as ASEAN Talent / Builder</span>
          </button>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {talentList.map((talent) => (
            <div key={talent.id} className="glass-card-interactive rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-200/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">{talent.name}</h4>
                      <span className="text-xs">{talent.countryCode === 'MY' ? '🇲🇾' : talent.countryCode === 'SG' ? '🇸🇬' : talent.countryCode === 'ID' ? '🇮🇩' : '🇻🇳'}</span>
                    </div>
                    <p className="text-xs text-teal-700 font-medium">{talent.title}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] bg-slate-50/60 px-3 py-1.5 rounded-lg border border-slate-200 mb-3">
                  <span className="text-slate-500">Gemma Match</span>
                  <span className="font-bold text-teal-700">{talent.matchScore}% Regional Match</span>
                </div>

                <p className="text-xs text-slate-600 mb-3 line-clamp-3 leading-relaxed">
                  {talent.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {talent.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{talent.hourlyRate}</span>
                <button
                  className="px-3 py-1.5 rounded-lg bg-teal-700/30 hover:bg-teal-700/50 border border-teal-200/30 text-teal-700 text-xs font-bold transition-all cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Startups currently recruiting */}
        <div className="mt-12 p-6 glass-card rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900">
                Verified Startups Ready to Sponsor / Hire ASEAN Talent
              </h3>
            </div>
            <span className="text-xs text-slate-500">All entities verified with SSM/ACRA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SAMPLE_CERTIFICATES.map((cert) => (
              <div key={cert.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  <span>{cert.countryCode === 'MY' ? '🇲🇾' : cert.countryCode === 'SG' ? '🇸🇬' : '🇮🇩'}</span>
                </div>
                <div className="text-[11px] text-teal-700 mb-2">{cert.sector}</div>
                <div className="text-[10px] text-slate-500 leading-normal mb-3">{cert.description}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Actively seeking AI & Full-Stack Engineers
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Join as Talent Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Join ASEAN Talent Registry</h3>
            <p className="text-xs text-slate-500 mb-4">Showcase your skills to verified startups across Southeast Asia.</p>
            
            <form onSubmit={handleJoinSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-teal-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Role / Specialization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Open-Source AI Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-teal-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => {
                      const code = e.target.value === 'Malaysia' ? 'MY' : e.target.value === 'Singapore' ? 'SG' : e.target.value === 'Indonesia' ? 'ID' : 'VN';
                      setFormData({ ...formData, country: e.target.value, countryCode: code });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    <option value="Malaysia">Malaysia 🇲🇾</option>
                    <option value="Singapore">Singapore 🇸🇬</option>
                    <option value="Indonesia">Indonesia 🇮🇩</option>
                    <option value="Vietnam">Vietnam 🇻🇳</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Expected Rate</label>
                  <input
                    type="text"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Python, Gemma 2, PyTorch, React"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-teal-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Brief Bio</label>
                <textarea
                  rows={2}
                  placeholder="Share your experience building open-source AI or web apps..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-teal-200"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-700 text-slate-900 font-bold cursor-pointer"
                >
                  Publish Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
