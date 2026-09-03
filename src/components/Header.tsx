import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Activity } from 'lucide-react';
import { ZenithLogo } from './ZenithLogo';

interface HeaderProps {
  onOpenScopeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScopeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How We Build', href: '#how-we-build' },
    { label: 'Work', href: '#work' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'FAQ', href: '#faq' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      id="siteHeader"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F6F7F9]/95 backdrop-blur-md shadow-sm border-b border-[#DADEE6]'
          : 'bg-[#F6F7F9]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center group transition-transform hover:scale-[1.02]"
          aria-label="Zenith Studio Home"
        >
          <ZenithLogo variant="full" theme="light" size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#4A5060] hover:text-[#14161D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#A8763A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EEF0F4] border border-[#DADEE6] text-xs font-mono text-[#4A5060]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems 100% Operational</span>
          </div>

          <button
            onClick={onOpenScopeModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#A8763A] border border-[#A8763A] rounded hover:bg-[#A8763A]/10 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-[#14161D] hover:bg-[#EEF0F4] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F6F7F9] border-b border-[#DADEE6] px-6 py-5 shadow-lg">
          <div className="pb-3 mb-2 border-b border-[#DADEE6]/60 flex items-center justify-between">
            <ZenithLogo variant="full" theme="light" size="sm" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8194]">Menu</span>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#14161D] py-1 border-b border-[#DADEE6]/40"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4A5060]">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ready for Q3/Q4 project intake</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScopeModal();
                }}
                className="w-full py-2.5 px-4 bg-[#A8763A] text-[#201206] font-semibold text-center rounded text-sm hover:bg-[#C79554] transition-colors"
              >
                Start a project
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
