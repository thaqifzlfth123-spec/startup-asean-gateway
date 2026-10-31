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
      colors: ['#00F2FE', '#4FACFE', '#10B981', '#F59E0B']
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
    setScanStep('1/4: Gemma 4 Vision preprocessing document canvas...');

    setTimeout(() => {
      setScanStep('2/4: Multimodal neural token extraction (Legal entity & Registry ID)...');
    }, 600);

    setTimeout(() => {
      setScanStep('3/4: Cross-referencing ASEAN National Registry Database...');
    }, 1200);

    setTimeout(() => {
      setScanStep('4/4: Synthesizing cross-border funding, talent & partner matrix...');
    }, 1600);

    try {
      const selectedSample = SAMPLE_CERTIFICATES.find(s => s.id === activeSampleId);
      const result = await analyzeCertificate(previewUrl, 'image/jpeg', selectedSample);
      setIsScanning(false);
      triggerConfetti();
      onVerificationSuccess(result);
    } catch (err) {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Gemma 4 Multimodal Vision Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Single-Point ASEAN Startup Onboarding
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            Upload your certificate of incorporation (SSM, ACRA, NIB, SEC, or DBD). Gemma AI instantly extracts credentials, validates registry legitimacy, and maps your company into the regional ASEAN gateway.
          </p>
        </div>

        {/* Quick Sample Selector Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Try With Verified Sample Registry Certificates:
            </span>
            <span className="text-[11px] text-cyan-400 font-medium">1-Click Test</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_CERTIFICATES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  activeSampleId === sample.id
                    ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="truncate">{sample.country}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {sample.countryCode}
                  </span>
                </div>
                <div className="font-semibold text-slate-200 truncate">{sample.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{sample.authority}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scanner Work Area */}
        {!verifiedResult ? (
          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
            
            {/* Upload or Preview Box */}
            <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 transition-all text-center bg-slate-950/60">
              
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
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00F2FE] animate-scan" />
                      <div className="absolute inset-0 bg-cyan-500/10" />
                    </div>
                  )}

                  <button
                    onClick={() => { setPreviewUrl(null); setActiveSampleId(null); }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700 cursor-pointer"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Upload Startup Incorporation Certificate
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                    Accepts official certificate documents (PNG, JPG, PDF, Scans) from Malaysia SSM, Singapore ACRA, Indonesia BKPM, or regional registries.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 cursor-pointer transition-all flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
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
              <div className="mt-5 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
                <div className="text-xs text-cyan-200 font-mono tracking-wide">
                  {scanStep}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Data Leakage: Verified directly via open-weight Gemma multimodal model</span>
              </div>

              <button
                disabled={(!previewUrl && !activeSampleId) || isScanning}
                onClick={executeScan}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  previewUrl && !isScanning
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                }`}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing Certificate...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Legally Verified Entity
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Conf: {(verifiedResult.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {verifiedResult.name}
                  </h3>
                </div>
              </div>

              {/* Cross-Border Readiness Score Badge */}
              <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">ASEAN Readiness</div>
                  <div className="text-lg font-black text-cyan-400">{verifiedResult.readinessScore || 94}/100</div>
                </div>
                <Award className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            {/* Extracted Certificate Fields Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block mb-1">Company Reg / UEN</span>
                <span className="font-mono font-bold text-slate-100">{verifiedResult.regNumber}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block mb-1">Country Jurisdiction</span>
                <span className="font-bold text-slate-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {verifiedResult.country} ({verifiedResult.countryCode})
                </span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block mb-1">Issuing Authority</span>
                <span className="font-bold text-slate-100 truncate block">{verifiedResult.authority}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block mb-1">Industry Sector</span>
                <span className="font-bold text-cyan-300 truncate block">{verifiedResult.sector}</span>
              </div>
            </div>

            {/* Inferred Description & Cross-Border AI Match Summary */}
            <div className="mt-4 p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 text-xs text-slate-300 leading-relaxed">
              <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Gemma 4 Cross-Border Assessment:
              </div>
              <p>{verifiedResult.description}</p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={resetScanner}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
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
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
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
