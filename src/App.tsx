/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveSpine } from './components/InteractiveSpine';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuickScopeModal } from './components/QuickScopeModal';
import { FloatingBar } from './components/FloatingBar';
import { LegalModal, LegalTab } from './components/LegalModal';
import { RevealOnScroll } from './components/RevealOnScroll';

export default function App() {
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  const [inquiryData, setInquiryData] = useState({
    projectType: 'AI Agents & Automation',
    timeline: '3 - 6 weeks',
    notes: '',
  });

  const handleOpenScopeModal = () => {
    setQuickModalOpen(true);
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleSelectServiceForScope = (serviceTitle: string) => {
    setInquiryData((prev) => ({
      ...prev,
      projectType: serviceTitle,
    }));
    // Smooth scroll to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyScopeFromEstimator = (scope: {
    projectType: string;
    complexity: string;
    timeline: string;
    integrations: string[];
  }) => {
    setInquiryData({
      projectType: `${scope.projectType} (${scope.complexity})`,
      timeline: scope.timeline,
      notes: `Target Integrations: ${scope.integrations.join(', ')}\nReliability Tier: ${scope.complexity}`,
    });

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickScopeSubmitted = (brief: {
    projectType: string;
    timeline: string;
    description: string;
  }) => {
    setInquiryData({
      projectType: brief.projectType,
      timeline: brief.timeline,
      notes: brief.description,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#14161D] selection:bg-[#D9BC8B] selection:text-[#14161D]">
      {/* Sticky Header */}
      <Header onOpenScopeModal={handleOpenScopeModal} />

      <main id="top">
        {/* Optimized Hero with Pause-on-scroll Neural Canvas */}
        <Hero onOpenScopeModal={handleOpenScopeModal} />

        {/* Lightweight Infinite Marquee */}
        <RevealOnScroll delay={50}>
          <TechMarquee />
        </RevealOnScroll>

        {/* Clearer Categorized Services Section */}
        <ServicesSection onSelectServiceForScope={handleSelectServiceForScope} />

        {/* Interactive Architecture Spine & Simulation Terminal */}
        <RevealOnScroll>
          <InteractiveSpine onSelectServiceForScope={handleSelectServiceForScope} />
        </RevealOnScroll>

        {/* Selected Results & Expandable Production Case Studies */}
        <RevealOnScroll>
          <CaseStudiesSection />
        </RevealOnScroll>

        {/* Verified Client Outcomes & Executive Testimonials */}
        <RevealOnScroll>
          <TestimonialsSection />
        </RevealOnScroll>

        {/* Project Scoping & Timeline Estimator */}
        <RevealOnScroll>
          <ProjectEstimator onApplyScopeToContact={handleApplyScopeFromEstimator} />
        </RevealOnScroll>

        {/* Governance, Transparency & FAQ */}
        <RevealOnScroll>
          <FAQSection />
        </RevealOnScroll>

        {/* About & Senior Team Philosophy */}
        <RevealOnScroll>
          <AboutSection />
        </RevealOnScroll>

        {/* Direct Project Consultation & Scoping Form */}
        <RevealOnScroll>
          <ContactSection
            initialProjectType={inquiryData.projectType}
            initialTimeline={inquiryData.timeline}
            initialNotes={inquiryData.notes}
          />
        </RevealOnScroll>
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Persistent Floating Action Dock */}
      <FloatingBar onOpenScopeModal={handleOpenScopeModal} />

      {/* Quick Scoping Modal */}
      <QuickScopeModal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
        onScopeSubmitted={handleQuickScopeSubmitted}
      />

      {/* Legal & Privacy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        defaultTab={legalTab}
      />
    </div>
  );
}
