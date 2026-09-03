import React, { useState } from 'react';
import { ArrowUp, Copy, Check, ExternalLink, Mail } from 'lucide-react';
import { ZenithLogo } from './ZenithLogo';
import { TARGET_EMAIL, getGmailComposeUrl } from '../utils/emailService';

interface FooterProps {
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'nda') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(TARGET_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#DADEE6] py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10 border-b border-[#DADEE6]">
          {/* Brand Info */}
          <div className="max-w-sm">
            <div className="mb-4">
              <ZenithLogo variant="full" theme="light" size="md" />
            </div>
            <p className="text-sm text-[#4A5060] leading-relaxed mb-4">
              Autonomous AI systems, agents, and custom software engineered to their peak for enterprises that value deterministic reliability over synthetic demos.
            </p>
            <div className="text-xs font-mono text-[#7B8194]">
              HQ: San Francisco, CA · Distributed Engineering
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-3">
                STUDIO
              </div>
              <ul className="space-y-2 text-sm text-[#4A5060]">
                <li>
                  <a href="#services" className="hover:text-[#14161D] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#how-we-build" className="hover:text-[#14161D] transition-colors">
                    How We Build
                  </a>
                </li>
                <li>
                  <a href="#work" className="hover:text-[#14161D] transition-colors">
                    Selected Work
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#14161D] transition-colors">
                    Client Outcomes
                  </a>
                </li>
                <li>
                  <a href="#estimator" className="hover:text-[#14161D] transition-colors">
                    Project Estimator
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#14161D] transition-colors">
                    FAQ &amp; Pricing
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#14161D] transition-colors">
                    About &amp; Principles
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-3">
                SYSTEMS
              </div>
              <ul className="space-y-2 text-sm text-[#4A5060]">
                <li>
                  <a href="#services" className="hover:text-[#14161D] transition-colors">
                    Agent Tool Calling
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#14161D] transition-colors">
                    Enterprise RAG
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#14161D] transition-colors">
                    ETL Pipelines
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#14161D] transition-colors">
                    Full-Stack SaaS
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#14161D] transition-colors">
                    Cloud &amp; DevOps
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-3">
                CONNECT
              </div>
              <ul className="space-y-2 text-sm text-[#4A5060]">
                <li>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <a
                      href={`mailto:${TARGET_EMAIL}`}
                      className="text-[#14161D] hover:text-[#A8763A] transition-colors font-semibold"
                    >
                      {TARGET_EMAIL}
                    </a>
                    <button
                      onClick={handleCopy}
                      title="Copy email address"
                      className="p-1 hover:text-[#14161D] text-[#7B8194] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </li>
                <li>
                  <a
                    href={getGmailComposeUrl('Zenith Studio Inquiry', 'Hello Zenith Studio,\n\n')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#A8763A] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Open in Web Gmail</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#14161D] transition-colors">
                    Schedule Scoping
                  </a>
                </li>
                <li>
                  <span className="text-[#7B8194] cursor-default">GitHub (Private Repos)</span>
                </li>
                <li>
                  <span className="text-[#7B8194] cursor-default">SOC2 Type II Ready</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7B8194]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© 2026 Zenith Studio. All rights reserved.</span>
            <span>·</span>
            {onOpenLegal && (
              <>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#14161D] transition-colors cursor-pointer underline decoration-dotted"
                >
                  Privacy Policy
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#14161D] transition-colors cursor-pointer underline decoration-dotted"
                >
                  Terms &amp; IP
                </button>
                <span>·</span>
                <button
                  onClick={() => onOpenLegal('nda')}
                  className="hover:text-[#14161D] transition-colors cursor-pointer underline decoration-dotted"
                >
                  Mutual NDA
                </button>
                <span>·</span>
              </>
            )}
            <span>Engineered for sub-second load times.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#4A5060] hover:text-[#14161D] transition-colors p-1 shrink-0"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
