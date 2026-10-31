import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Upload, FileText, CheckCircle2, ShieldCheck, Sparkles, Loader2, 
  ExternalLink, ArrowRight, RefreshCw, AlertCircle, Building2, MapPin, 
  Calendar, Layers, Award, QrCode, Eye
} from 'lucide-react';
import { SAMPLE_CERTIFICATES } from '../data/aseanData';
import { analyzeCertificate } from '../services/gemmaService';

export default function CertificateScanner({ onVerificationSuccess, verifiedResult }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [activeSampleId, setActiveSampleId] = useState(null);
  const fileInputRef = useRef(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0f766e']
    });
  };

  const handleFileUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setActiveSampleId(null);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSelectSample = (sample) => {
    setActiveSampleId(sample.id);
    setPreviewUrl(sample.previewUrl);
    setFile(null);
  };

  const executeScan = async () => {
    if (!previewUrl && !activeSampleId) return;

    setIsScanning(true);
    setScanStep('1/4: Rasterizing certificate canvas for Gemma 4 (gemma-4-26b-a4b-it)...');

    const t1 = setTimeout(() => {
      setScanStep('2/4: Gemma 4 (ThinkingLevel.HIGH) multimodal vision analyzing certificate...');
    }, 700);

    const t2 = setTimeout(() => {
      setScanStep('3/4: Cross-referencing ASEAN National Registry & Grant Criteria...');
    }, 1500);

    try {
      const selectedSample = SAMPLE_CERTIFICATES.find(s => s.id === activeSampleId);
      const result = await analyzeCertificate(
        previewUrl,
        'image/png',
        selectedSample,
        (charCount) => {
          clearTimeout(t1);
          clearTimeout(t2);
          setScanStep(`4/4: Live Gemma 4 (gemma-4-26b-a4b-it) streaming structured dossier (${charCount} bytes)...`);
        }
      );
      clearTimeout(t1);
      clearTimeout(t2);
      setIsScanning(false);
      triggerConfetti();
      onVerificationSuccess(result);
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      console.error('Scan error:', err);
      setIsScanning(false);
      setScanStep('Scan error. Please try again.');
    }
  };

  const resetScanner = () => {
    setFile(null);
    setPreviewUrl(null);
    setActiveSampleId(null);
    onVerificationSuccess(null);
  };

  return (
    <section id="scanner" className="py-12 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/10 border border-teal-200/30 text-teal-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Gemma 4 Multimodal Vision Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Single-Point ASEAN Startup Onboarding
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Upload your certificate of incorporation (SSM, ACRA, NIB, SEC, or DBD). Gemma AI instantly extracts credentials, validates registry legitimacy, and maps your company into the regional ASEAN gateway.
          </p>
        </div>

        {/* Quick Sample Selector Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-white/90 border border-slate-200 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-teal-700" />
              Try With Verified Sample Registry Certificates:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-teal-700 font-medium">1-Click Test</span>
              {activeSampleId && (
                <a
                  href={SAMPLE_CERTIFICATES.find(s => s.id === activeSampleId)?.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-[11px] text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-teal-700" />
                  <span>Open Full Dummy Cert</span>
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_CERTIFICATES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  activeSampleId === sample.id
                    ? 'bg-teal-700/20 border-teal-200 text-slate-900 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="truncate">{sample.country}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-teal-700 border border-slate-300">
                    {sample.countryCode}
                  </span>
                </div>
                <div className="font-semibold text-slate-700 truncate">{sample.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{sample.authority}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scanner Work Area */}
        {!verifiedResult ? (
          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 relative overflow-hidden">
            
            {/* Upload or Preview Box */}
            <div className="relative border-2 border-dashed border-slate-300 hover:border-teal-200/50 rounded-xl p-6 transition-all text-center bg-slate-50/60">
              
              {previewUrl ? (
                <div className="relative max-h-72 overflow-hidden rounded-lg mx-auto flex items-center justify-center bg-black/40">
                  <img
                    src={previewUrl}
                    alt="Certificate Preview"
                    className="object-contain max-h-64 w-full rounded"
                  />

                  {/* Scanning Laser Beam */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-0 right-0 h-1 bg-teal-600 shadow-[0_0_15px_#0f766e] animate-scan" />
                      <div className="absolute inset-0 bg-teal-700/10" />
                    </div>
                  )}

                  <button
                    onClick={() => { setPreviewUrl(null); setActiveSampleId(null); }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 hover:bg-slate-100 text-slate-600 text-xs border border-slate-300 cursor-pointer"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-700/10 border border-teal-200/20 flex items-center justify-center text-teal-700 mb-4">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    Upload Startup Incorporation Certificate
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                    Accepts official certificate documents (PNG, JPG, PDF, Scans) from Malaysia SSM, Singapore ACRA, Indonesia BKPM, or regional registries.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold border border-slate-300 cursor-pointer transition-all flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-700" />
                      <span>Select File from Device</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Scanning Progress Status */}
            {isScanning && (
              <div className="mt-5 p-3.5 rounded-xl bg-teal-50 border border-cyan-800/50 flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-teal-700 animate-spin shrink-0" />
                <div className="text-xs text-teal-700 font-mono tracking-wide">
                  {scanStep}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Data Leakage: Verified directly via open-weight Gemma multimodal model</span>
              </div>

              <button
                disabled={(!previewUrl && !activeSampleId) || isScanning}
                onClick={executeScan}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  previewUrl && !isScanning
                    ? 'bg-teal-700 hover:hover:text-slate-900 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200'
                }`}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing Certificate...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                    <span>Run Gemma AI Verification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </div>
        ) : (
          /* Verified Certificate Dossier Card */
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl shadow-emerald-500/10">
            
            {/* Top Status Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Legally Verified Entity
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${
                      verifiedResult.isLiveApi
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      {verifiedResult.isLiveApi ? 'Live Gemma 4 (gemma-4-26b-a4b-it)' : 'Demo Simulation (Add API Key for Live Gemma 4)'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Conf: {(verifiedResult.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {verifiedResult.name}
                  </h3>
                </div>
              </div>

              {/* Cross-Border Readiness Score Badge */}
              <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-xl border border-slate-200">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">ASEAN Readiness</div>
                  <div className="text-lg font-bold text-teal-700">{verifiedResult.readinessScore || 94}/100</div>
                </div>
                <Award className="w-6 h-6 text-teal-700" />
              </div>
            </div>

            {verifiedResult.apiError && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-700/50 text-xs text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Gemma 4 Live API Error (Fell back to Simulation):</strong> {verifiedResult.apiError}
                </div>
              </div>
            )}

            {/* Extracted Certificate Fields Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-500 block mb-1">Company Reg / UEN</span>
                <span className="font-mono font-bold text-slate-800">{verifiedResult.regNumber}</span>
              </div>
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-500 block mb-1">Country Jurisdiction</span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-700" />
                  {verifiedResult.country} ({verifiedResult.countryCode})
                </span>
              </div>
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-500 block mb-1">Issuing Authority</span>
                <span className="font-bold text-slate-800 truncate block">{verifiedResult.authority}</span>
              </div>
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-500 block mb-1">Industry Sector</span>
                <span className="font-bold text-teal-700 truncate block">{verifiedResult.sector}</span>
              </div>
            </div>

            {/* Inferred Description & Cross-Border AI Match Summary */}
            <div className="mt-4 p-4 rounded-xl bg-teal-50 border border-blue-900/30 text-xs text-slate-600 leading-relaxed">
              <div className="font-semibold text-teal-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Gemma 4 Cross-Border Assessment:
                </span>
                {verifiedResult.previewUrl && (
                  <a
                    href={verifiedResult.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <span>View Scanned Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p>{verifiedResult.description}</p>
            </div>

            {/* 4 Pillars Intelligence Grid */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Pillar 1: About the Founder(s) */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-teal-700 font-bold">
                  <Building2 className="w-4 h-4" />
                  <span>1. About the Founder(s) &amp; Governance</span>
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <p><strong className="text-slate-900">Founders:</strong> {verifiedResult.founderAnalysis?.team || verifiedResult.directors?.join(', ') || 'Founding Directors'}</p>
                  <p><strong className="text-slate-900">Equity &amp; Status:</strong> {verifiedResult.founderAnalysis?.equity || 'Compliant Private Limited Entity'}</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{verifiedResult.founderAnalysis?.strengths || 'Direct verified legal standing in national commercial registry.'}</p>
                </div>
              </div>

              {/* Pillar 2: About Funding & Grants */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>2. About Funding &amp; Grants Unlocked</span>
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <p><strong className="text-slate-900">Flagship Grant:</strong> {verifiedResult.fundingEligibility?.flagshipGrant || 'Cradle CIP Spark / Sprint (MOSTI)'}</p>
                  <p><strong className="text-slate-900">Grant Size:</strong> <span className="text-emerald-400 font-bold">{verifiedResult.fundingEligibility?.amount || 'Up to RM 600,000 (Equity-Free)'}</span></p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    <strong className="text-slate-600">VC Targets:</strong> {verifiedResult.fundingEligibility?.vcPipeline?.join(', ') || 'East Ventures, 500 SEA, Odra Venture'}
                  </p>
                </div>
              </div>

              {/* Pillar 3: About Opportunities & Programmes */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-teal-700 font-bold">
                  <Layers className="w-4 h-4" />
                  <span>3. About Opportunities &amp; Soft Landing</span>
                </div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {(verifiedResult.opportunityCorridors || [
                    'DOJO Coworking Reciprocal Access (KL & Singapore)',
                    'Sunway iLabs Super Accelerator Corporate Pilot',
                    'MDEC DE Rantau Tech Talent Visa Access'
                  ]).map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-700 font-bold">•</span>
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 4: About the Talent */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-teal-700 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>4. About Talent Needs &amp; Regional Matches</span>
                </div>
                <div className="space-y-1.5 text-slate-600 text-[11px]">
                  {(verifiedResult.talentNeeds || [
                    { role: 'Senior AI / LLM Engineer', match: 'Farhan Azman (98% match)' },
                    { role: 'Regional Growth & GTM Lead', match: 'Stephanie Lim (94% match)' }
                  ]).map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200/60">
                      <span className="font-medium text-slate-700">{t.role}</span>
                      <span className="text-[10px] text-teal-700 font-semibold">{t.match}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={resetScanner}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 text-xs border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Verify Another Certificate</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready for Cross-Border Match
                </span>
                <a
                  href="#dashboard"
                  className="px-4 py-2 rounded-lg bg-teal-700 hover:hover:text-slate-900 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Matched Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
