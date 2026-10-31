import React from 'react';
import { Globe, Heart, Shield, Award, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigateScanner, onNavigateExplorer, onNavigateTalent }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-200">
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-bold text-base tracking-tight text-slate-900">Startup<span className="text-teal-700">ASEAN</span> Gateway</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-teal-700/10 text-teal-700 border border-teal-200/30">
                Gemma 4 AI
              </span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-3">
              The single gateway solving ecosystem fragmentation across Southeast Asia. Turn legal company registration into instant cross-border opportunities.
            </p>
            <div className="text-[11px] text-slate-500">
              Built for <strong className="text-slate-900">Hacktoberfest Hack Day Kuala Lumpur 2026</strong>.
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">Hackathon Partners</h4>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li>• Major League Hacking (MLH)</li>
              <li>• MyStartup Cradle (MOSTI)</li>
              <li>• Kracked Devs Community</li>
              <li>• TalentLabs Career Platform</li>
              <li>• Odra Venture (Supporting Partner)</li>
              <li>• DOJO Coworking Space (Venue)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li><button type="button" onClick={onNavigateScanner} className="hover:text-teal-700 cursor-pointer">Scan Startup Certificate</button></li>
              <li><button type="button" onClick={onNavigateScanner} className="hover:text-teal-700 cursor-pointer">Matched Opportunities</button></li>
              <li><button type="button" onClick={onNavigateExplorer} className="hover:text-teal-700 cursor-pointer">ASEAN Directory (Ecosystem &amp; VCs)</button></li>
              <li><button type="button" onClick={onNavigateTalent} className="hover:text-teal-700 cursor-pointer">Regional Talent Hub</button></li>
              <li><a href="https://events.mlh.com/events/14817-hacktoberfest-hack-day-kuala-lumpur" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 flex items-center gap-1">MLH Event Page <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Startup ASEAN Gateway. Open-Source under MIT License.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with open-weight Gemma multimodal AI</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">Hacktoberfest KL 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
