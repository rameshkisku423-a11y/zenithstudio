import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, Mail } from 'lucide-react';
import { TARGET_EMAIL } from '../utils/emailService';

export type LegalTab = 'privacy' | 'terms' | 'nda';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14161D]/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white border border-[#DADEE6] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#DADEE6] flex items-center justify-between bg-[#F6F7F9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A8763A]/10 border border-[#A8763A]/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#A8763A]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#14161D]">
                Legal, Privacy &amp; Governance
              </h2>
              <p className="text-xs text-[#7B8194] font-mono">
                Zenith Studio · Last revised September 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#7B8194] hover:text-[#14161D] hover:bg-[#EEF0F4] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DADEE6] bg-white px-6 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 text-xs font-mono font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-[#A8763A] text-[#14161D]'
                : 'border-transparent text-[#7B8194] hover:text-[#14161D]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 text-xs font-mono font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#A8763A] text-[#14161D]'
                : 'border-transparent text-[#7B8194] hover:text-[#14161D]'
            }`}
          >
            Terms of Service &amp; IP
          </button>
          <button
            onClick={() => setActiveTab('nda')}
            className={`py-3 px-4 text-xs font-mono font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'nda'
                ? 'border-[#A8763A] text-[#14161D]'
                : 'border-transparent text-[#7B8194] hover:text-[#14161D]'
            }`}
          >
            Mutual NDA &amp; Security
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#4A5060] leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  1. Information We Collect
                </h3>
                <p>
                  Zenith Studio operates with strict data minimalism. When you submit project inquiries, scoping briefs, or communicate with our engineering staff, we only collect business contact credentials (name, work email, company name) and technical requirements necessary to formulate architectures and proposals.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  2. Zero Model Training on Client Data
                </h3>
                <p>
                  <strong>Core Commitment:</strong> We NEVER use client proprietary data, customer workflows, internal documentation, or codebases to train public or foundational artificial intelligence models. All inference calls utilize enterprise enterprise-tier zero-data-retention APIs (Anthropic, OpenAI Enterprise, Google Cloud Vertex, AWS Bedrock).
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  3. Data Isolation &amp; Storage
                </h3>
                <p>
                  Client specifications and architectural diagrams are stored in encrypted environments adhering to AES-256 encryption at rest and TLS 1.3 in transit. We do not sell, rent, or trade your contact information to third-party brokers or advertisers.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  4. Your Rights
                </h3>
                <p>
                  You may request complete deletion or export of all project briefs and stored inquiry details at any moment by sending a direct instruction to{' '}
                  <strong className="text-[#14161D] font-mono">{TARGET_EMAIL}</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  1. 100% Intellectual Property Assignment
                </h3>
                <p>
                  Unlike traditional software agencies that retain ownership of core modules, Zenith Studio operates under a complete work-for-hire assignment model. Upon settlement of agreed project milestone invoices, all rights, title, source code, Figma design files, 3D CGI assets, and architecture configurations transfer exclusively to the client.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  2. Milestone-Based Execution &amp; Acceptance
                </h3>
                <p>
                  Fixed-scope sprints are executed against predefined milestone deliverables and acceptance criteria. Client teams receive dedicated sandbox access to review and test code before sign-off.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  3. 30-Day Post-Launch Warranty
                </h3>
                <p>
                  All completed software builds include a complimentary 30-day warranty covering any deviation from agreed specifications or critical defects at zero additional cost.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  4. Governance &amp; Governing Law
                </h3>
                <p>
                  All commercial agreements are governed by the laws of the State of California, with standard arbitration procedures for swift dispute resolution.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'nda' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  1. Standard Mutual Non-Disclosure Agreement
                </h3>
                <p>
                  Zenith Studio executes bilateral mutual NDAs prior to accessing private code repositories, API credentials, customer datasets, or confidential roadmaps.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  2. SOC 2 Type II Alignment &amp; Cloud Security
                </h3>
                <p>
                  Our internal development workstations enforce multi-factor authentication (MFA), hardware security keys, encrypted SSDs, and strict credential vaults (1Password / AWS Secrets Manager). We never commit secret keys or tokens to version control.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#14161D] mb-1">
                  3. Request an Executed NDA
                </h3>
                <p>
                  To request our standard pre-signed mutual NDA before your scoping call, simply email{' '}
                  <strong className="text-[#14161D] font-mono">{TARGET_EMAIL}</strong>{' '}
                  with your corporate entity name.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#DADEE6] bg-[#F6F7F9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#7B8194] font-mono">
            Questions? Contact legal at <span className="text-[#14161D] font-medium">{TARGET_EMAIL}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#14161D] hover:bg-[#2A2E3B] text-white font-mono text-xs cursor-pointer transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
