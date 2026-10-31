import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CertificateScanner from './components/CertificateScanner';
import VerifiedDashboard from './components/VerifiedDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import AseanExplorer from './components/AseanExplorer';
import TalentHub from './components/TalentHub';
import AseanChatbot from './components/AseanChatbot';
import Footer from './components/Footer';

export default function App() {
  const [activeRole, setActiveRole] = useState('founder'); // 'founder' | 'talent' | 'partner'
  const [verifiedStartup, setVerifiedStartup] = useState(null);

  const handleScrollToScanner = () => {
    if (activeRole !== 'founder') {
      setActiveRole('founder');
    }
    setTimeout(() => {
      document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToExplorer = () => {
    if (activeRole !== 'partner') {
      setActiveRole('partner');
    }
    setTimeout(() => {
      document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToTalent = () => {
    if (activeRole !== 'talent') {
      setActiveRole('talent');
    }
    setTimeout(() => {
      document.getElementById('talenthub')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-200 selection:text-teal-900">
      
      {/* Top Navigation */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartScan={handleScrollToScanner}
          onExplore={handleScrollToExplorer}
        />

        {/* 1. FOUNDER PERSONA: Scan & Verify Official Certificate, then view personalized dashboard */}
        {activeRole === 'founder' && (
          <>
            <CertificateScanner
              verifiedResult={verifiedStartup}
              onVerificationSuccess={(result) => setVerifiedStartup(result)}
            />

            {verifiedStartup && (
              <VerifiedDashboard verifiedStartup={verifiedStartup} />
            )}
          </>
        )}

        {/* 2. TALENT PERSONA: Regional Builder Network, Job Matching & Co-Founder Pool */}
        {activeRole === 'talent' && (
          <TalentHub verifiedStartup={verifiedStartup} />
        )}

        {/* 3. ECOSYSTEM & VC PERSONA: Dealflow Pipeline, Due Diligence + Single Gateway to ASEAN Ecosystem */}
        {activeRole === 'partner' && (
          <>
            <PartnerDashboard verifiedStartup={verifiedStartup} />
            <AseanExplorer verifiedStartup={verifiedStartup} />
          </>
        )}
      </main>

      {/* Interactive Gemma 4 ASEAN Navigator AI Chatbot */}
      <AseanChatbot verifiedStartup={verifiedStartup} />

      {/* Footer */}
      <Footer
        onNavigateScanner={handleScrollToScanner}
        onNavigateExplorer={handleScrollToExplorer}
        onNavigateTalent={handleScrollToTalent}
      />

    </div>
  );
}
