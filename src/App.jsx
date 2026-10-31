import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CertificateScanner from './components/CertificateScanner';
import VerifiedDashboard from './components/VerifiedDashboard';
import AseanExplorer from './components/AseanExplorer';
import TalentHub from './components/TalentHub';
import AseanChatbot from './components/AseanChatbot';
import ApiKeyModal from './components/ApiKeyModal';
import Footer from './components/Footer';
import { getStoredApiKey } from './services/gemmaService';

export default function App() {
  const [activeRole, setActiveRole] = useState('founder'); // 'founder' | 'talent' | 'partner'
  const [verifiedStartup, setVerifiedStartup] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasCustomKey, setHasCustomKey] = useState(Boolean(getStoredApiKey()));

  const handleScrollToScanner = () => {
    document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToExplorer = () => {
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={hasCustomKey}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartScan={handleScrollToScanner}
          onExplore={handleScrollToExplorer}
        />

        {/* Certificate Scanner (Always visible for Founder role or when onboarding) */}
        {(activeRole === 'founder' || activeRole === 'partner') && (
          <CertificateScanner
            verifiedResult={verifiedStartup}
            onVerificationSuccess={(result) => setVerifiedStartup(result)}
          />
        )}

        {/* Dynamic Matched Dashboard for Verified Startup */}
        {verifiedStartup && (
          <VerifiedDashboard verifiedStartup={verifiedStartup} />
        )}

        {/* Talent Hub: Active if Talent role selected or always available */}
        {activeRole === 'talent' && (
          <TalentHub verifiedStartup={verifiedStartup} />
        )}

        {/* ASEAN Explorer / Single Gateway Directory */}
        <AseanExplorer />

        {/* Show TalentHub at bottom of founder role too if verified */}
        {activeRole === 'founder' && !verifiedStartup && (
          <TalentHub verifiedStartup={verifiedStartup} />
        )}
      </main>

      {/* Interactive Gemma ASEAN Navigator AI Chatbot */}
      <AseanChatbot verifiedStartup={verifiedStartup} />

      {/* Google AI Studio API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={(hasKey) => setHasCustomKey(hasKey)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
