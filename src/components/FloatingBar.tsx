import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Sparkles, Send, X, ExternalLink } from 'lucide-react';
import { TARGET_EMAIL, getGmailComposeUrl } from '../utils/emailService';

interface FloatingBarProps {
  onOpenScopeModal: () => void;
}

export const FloatingBar: React.FC<FloatingBarProps> = ({ onOpenScopeModal }) => {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 400px
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  if (minimized) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setMinimized(false)}
          className="p-3 bg-[#14161D] text-white rounded-full shadow-xl hover:bg-[#2A2E3B] transition-all flex items-center gap-2 text-xs font-mono border border-[#DADEE6]/20 cursor-pointer"
          title="Open Quick Actions"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Consult Zenith</span>
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Quick Actions Dock" className="fixed bottom-5 right-5 z-40 max-w-[calc(100vw-2.5rem)]">
      <div className="bg-[#14161D] text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-[#3A4050] flex items-center gap-3 backdrop-blur-md">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 pl-2 pr-1 text-xs font-mono text-[#D9BC8B]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px]">Intake Open</span>
        </div>

        <div className="h-4 w-[1px] bg-[#3A4050] hidden sm:block" />

        {/* Action 1: Start Project / Quick Scope */}
        <button
          onClick={onOpenScopeModal}
          className="px-3 py-1.5 rounded-xl bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Project</span>
        </button>

        {/* Action 2: Direct Gmail */}
        <a
          href={getGmailComposeUrl('Quick Consultation Request', 'Hello Zenith Studio Team,\n\n')}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-xl bg-[#202430] hover:bg-[#2C3242] text-white font-medium text-xs transition-colors flex items-center gap-1.5 border border-[#3A4050]"
          title="Email zenithstudio26@gmail.com via Web Gmail"
        >
          <Mail className="w-3.5 h-3.5 text-[#A8763A]" />
          <span className="hidden xs:inline">Email Us</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>

        {/* Action 3: Back to top */}
        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-xl bg-[#202430] hover:bg-[#2C3242] text-[#A0A6B8] hover:text-white transition-colors cursor-pointer border border-[#3A4050]"
          title="Back to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        {/* Minimize */}
        <button
          onClick={() => setMinimized(true)}
          className="p-1 text-[#7B8194] hover:text-white transition-colors cursor-pointer"
          title="Minimize dock"
          aria-label="Minimize floating dock"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
