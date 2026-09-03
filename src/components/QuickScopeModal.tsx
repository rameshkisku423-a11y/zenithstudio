import React, { useEffect, useState } from 'react';
import {
  X,
  Send,
  ArrowRight,
  ShieldCheck,
  Check,
  Mail,
  ExternalLink,
  Copy,
  CheckCircle2,
  Globe,
  RefreshCw
} from 'lucide-react';
import {
  TARGET_EMAIL,
  formatProjectBriefMarkdown,
  getGmailComposeUrl,
  getOutlookComposeUrl,
  getMailtoUrl,
  openInGmail,
  sendEmailViaFormSubmit,
  saveLocalInquiry
} from '../utils/emailService';

interface QuickScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScopeSubmitted: (brief: { projectType: string; timeline: string; description: string }) => void;
}

export const QuickScopeModal: React.FC<QuickScopeModalProps> = ({
  isOpen,
  onClose,
  onScopeSubmitted,
}) => {
  const [projectType, setProjectType] = useState('AI Agents & Automation');
  const [timeline, setTimeline] = useState('3 - 6 weeks');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ticketId, setTicketId] = useState('');

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

  const currentPayload = {
    name: 'Quick Scope Client',
    email,
    projectType,
    timeline,
    description,
    ticketId: ticketId || '#ZEN-' + Math.floor(1000 + Math.random() * 9000),
  };

  const briefText = formatProjectBriefMarkdown(currentPayload);
  const subject = `Project Inquiry: ${projectType}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newTicket = '#ZEN-' + Math.floor(1000 + Math.random() * 9000);
    setTicketId(newTicket);

    const payloadWithTicket = { ...currentPayload, ticketId: newTicket };

    onScopeSubmitted({
      projectType,
      timeline,
      description: `${description}\nClient Email: ${email}`,
    });

    saveLocalInquiry(payloadWithTicket);
    sendEmailViaFormSubmit(payloadWithTicket);

    // Open Web Gmail composer in new tab
    openInGmail(subject, formatProjectBriefMarkdown(payloadWithTicket));

    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14161D]/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white border border-[#DADEE6] rounded-2xl shadow-2xl p-6 sm:p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#7B8194] hover:text-[#14161D] hover:bg-[#EEF0F4] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#A8763A] font-semibold mb-1">
            Initiate Project
          </div>
          <h2 className="font-serif text-2xl text-[#14161D] font-normal">
            Start a project with Zenith
          </h2>
          <p className="text-xs text-[#7B8194] mt-1">
            Direct communication to{' '}
            <span className="font-mono text-[#14161D] font-medium">{TARGET_EMAIL}</span> · 24h reply
          </p>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Ticket {ticketId || '#ZEN-8491'} Prepared
              </span>
              <h3 className="font-serif text-2xl text-[#14161D] mt-2 mb-1">
                Project Brief Ready for Dispatch
              </h3>
              <p className="text-xs text-[#4A5060] max-w-sm mx-auto leading-relaxed">
                We've prepared your inquiry for{' '}
                <strong className="text-[#14161D] font-mono">{TARGET_EMAIL}</strong>. Send via your preferred email service:
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={getGmailComposeUrl(subject, briefText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-xs transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Gmail</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={getMailtoUrl(subject, briefText)}
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-[#F6F7F9] hover:bg-[#E5E9F0] text-[#14161D] font-medium text-xs border border-[#DADEE6] transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#A8763A]" />
                <span>Mail App</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7B8194] hover:text-[#14161D] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied brief to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy brief text</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="text-xs font-mono text-[#14161D] hover:underline cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@company.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-1.5">
                  Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:outline-none"
                >
                  <option>High-Impact Video Editing</option>
                  <option>Meta Ads (Facebook &amp; Instagram)</option>
                  <option>Google Ads &amp; Performance PPC</option>
                  <option>3D Motion Graphics &amp; CGI</option>
                  <option>Brand Identity &amp; Visual Systems</option>
                  <option>AI Agents &amp; Automation</option>
                  <option>Web Development &amp; SaaS</option>
                  <option>Mobile App Development</option>
                  <option>API &amp; Cloud Integration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-1.5">
                  Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:outline-none"
                >
                  <option>Immediate (1 - 3 weeks)</option>
                  <option>Standard (3 - 6 weeks)</option>
                  <option>Comprehensive (6 - 12 weeks)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-1.5">
                Core Goal or Bottleneck
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What workflow is costing time or what software needs to be built?"
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A] resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#7B8194]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8763A]" />
                <span>NDA Protected</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-sm transition-all cursor-pointer shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-[#201206]" />
                  <span>Send to Zenith</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
