import React, { useState } from 'react';
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Clock,
  Shield,
  ExternalLink,
  CheckCircle2,
  Inbox,
  RefreshCw,
  Globe,
  FileText
} from 'lucide-react';
import {
  TARGET_EMAIL,
  formatProjectBriefMarkdown,
  getGmailComposeUrl,
  getOutlookComposeUrl,
  getMailtoUrl,
  openInGmail,
  openInDefaultMailClient,
  sendEmailViaFormSubmit,
  saveLocalInquiry,
  EmailBriefPayload
} from '../utils/emailService';

interface ContactSectionProps {
  initialProjectType?: string;
  initialTimeline?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProjectType = 'AI Agents & Automation',
  initialTimeline = '3 - 6 weeks',
  initialNotes = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [description, setDescription] = useState(initialNotes);

  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState('');
  const [cloudStatus, setCloudStatus] = useState<string | null>(null);

  // Sync if props update
  React.useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
    if (initialTimeline) setTimeline(initialTimeline);
    if (initialNotes) setDescription(initialNotes);
  }, [initialProjectType, initialTimeline, initialNotes]);

  const currentPayload: EmailBriefPayload = {
    name: name || 'Prospective Client',
    email: email || '',
    projectType: projectType || 'Custom Software',
    timeline: timeline || 'Flexible',
    description: description || 'Workflow optimization and system engineering.',
    ticketId: activeTicketId || `#ZEN-${Math.floor(1000 + Math.random() * 9000)}`,
  };

  const getBriefText = () => formatProjectBriefMarkdown(currentPayload);
  const emailSubject = `Project Scoping: ${currentPayload.projectType} (${currentPayload.name})`;

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(getBriefText());
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleCopyEmailAddress = () => {
    navigator.clipboard.writeText(TARGET_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Direct 1-Click Launch Gmail
  const handleOpenDirectGmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const ticket = `#ZEN-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveTicketId(ticket);
    const payload = { ...currentPayload, ticketId: ticket };
    saveLocalInquiry(payload);
    openInGmail(emailSubject, formatProjectBriefMarkdown(payload));
  };

  // Standard Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    const ticket = `#ZEN-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveTicketId(ticket);

    const payload = { ...currentPayload, ticketId: ticket };
    saveLocalInquiry(payload);

    // 1. Try cloud dispatch to zenithstudio26@gmail.com
    const result = await sendEmailViaFormSubmit(payload);
    setCloudStatus(result.success ? 'Inquiry recorded & dispatched.' : 'Ready for direct Gmail dispatch');

    setIsSubmitting(false);
    setSubmittedMessage(true);

    // 2. Also try opening the compose window automatically for maximum reliability
    try {
      openInGmail(emailSubject, formatProjectBriefMarkdown(payload));
    } catch {
      // Browsers might block popup if not direct user event; buttons inside the confirmation view cover this!
    }
  };

  const handleResetForm = () => {
    setSubmittedMessage(false);
    setCloudStatus(null);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#EEF0F4] border-b border-[#DADEE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DADEE6] text-xs font-mono text-[#A8763A] uppercase tracking-wider font-semibold mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Engineering Consultation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161D] font-normal leading-tight mb-4">
              Tell us what is eating your team's time.
            </h2>
            <p className="text-base sm:text-lg text-[#4A5060] max-w-xl mx-auto leading-relaxed">
              Send a short note about the project or workflow you want off your plate. All inquiries go directly to{' '}
              <strong className="text-[#14161D] font-mono text-sm underline decoration-[#A8763A]">
                {TARGET_EMAIL}
              </strong>{' '}
              with an honest technical feasibility assessment within 24 hours.
            </p>
          </div>

          {/* Form Box */}
          <div className="bg-white border border-[#DADEE6] rounded-2xl p-6 sm:p-10 shadow-lg relative">
            {submittedMessage ? (
              /* Success & Multi-Channel Dispatch Hub */
              <div className="py-6 sm:py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Inquiry Ticket {activeTicketId || '#ZEN-2026'} Generated</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#14161D] font-normal">
                    Project Brief Ready for Dispatch
                  </h3>
                  <p className="text-sm text-[#4A5060] max-w-lg mx-auto mt-2 leading-relaxed">
                    Target destination:{' '}
                    <strong className="text-[#14161D] font-mono bg-[#F4F6F9] px-2 py-0.5 rounded border border-[#DADEE6]">
                      {TARGET_EMAIL}
                    </strong>
                    . Click below to send directly via your preferred email service:
                  </p>
                </div>

                {/* Primary Action Hub Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
                  {/* Button 1: Web Gmail */}
                  <a
                    href={getGmailComposeUrl(emailSubject, getBriefText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-sm transition-all shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-[#201206]" />
                      <span className="font-bold">Open in Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] font-normal opacity-85">1-Click Browser Webmail</span>
                  </a>

                  {/* Button 2: Default OS Mail Client */}
                  <a
                    href={getMailtoUrl(emailSubject, getBriefText())}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white hover:bg-[#F8F9FB] border border-[#DADEE6] text-[#14161D] font-medium text-sm transition-all shadow-xs group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Send className="w-4 h-4 text-[#A8763A]" />
                      <span className="font-bold">Default Mail App</span>
                    </div>
                    <span className="text-[11px] text-[#7B8194]">Apple Mail / Outlook / OS</span>
                  </a>

                  {/* Button 3: Web Outlook */}
                  <a
                    href={getOutlookComposeUrl(emailSubject, getBriefText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white hover:bg-[#F8F9FB] border border-[#DADEE6] text-[#14161D] font-medium text-sm transition-all shadow-xs group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-[#38BDF8]" />
                      <span className="font-bold">Outlook Web</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] text-[#7B8194]">Office 365 / Hotmail</span>
                  </a>
                </div>

                {/* Formatted Brief Preview Box with Copy */}
                <div className="max-w-2xl mx-auto mt-6 bg-[#F8F9FB] border border-[#DADEE6] rounded-xl p-4 text-left">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9F0]">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#A8763A]" />
                      <span>Prepared Technical Brief</span>
                    </span>
                    <button
                      onClick={handleCopyBrief}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-white border border-[#DADEE6] text-[#14161D] hover:bg-[#EEF0F4] flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#7B8194]" />
                          <span>Copy Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-[#4A5060] whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                    {getBriefText()}
                  </pre>
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7B8194] hover:text-[#14161D] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Send another inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Input Form */
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-4 py-2.5 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A] focus:ring-1 focus:ring-[#A8763A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A] focus:ring-1 focus:ring-[#A8763A] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-2">
                      Project Archetype
                    </label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="e.g. AI Agents & Automation"
                      className="w-full px-4 py-2.5 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A] focus:ring-1 focus:ring-[#A8763A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mb-2">
                      Desired Timeline / Start Date
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g. 3 - 6 weeks / Immediate"
                      className="w-full px-4 py-2.5 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A] focus:ring-1 focus:ring-[#A8763A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold">
                      System Requirements &amp; Bottlenecks
                    </label>
                    <span className="text-[11px] font-mono text-[#7B8194]">Direct to {TARGET_EMAIL}</span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your project, existing tools (CRM, database, workflows), and what outcome you want to achieve..."
                    className="w-full px-4 py-3 text-sm rounded-lg bg-[#F6F7F9] border border-[#DADEE6] text-[#14161D] focus:bg-white focus:outline-none focus:border-[#A8763A] focus:ring-1 focus:ring-[#A8763A] transition-all resize-y"
                  />
                </div>

                {/* Actions & Verification */}
                <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#7B8194]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#A8763A]" />
                      <span>24h Response SLA</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#A8763A]" />
                      <span>Strict Privacy &amp; NDA</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    {/* Copy brief button */}
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="px-3.5 py-2.5 rounded-lg bg-[#EEF0F4] hover:bg-[#DADEE6] text-[#4A5060] font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Copy brief to clipboard"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Brief</span>
                        </>
                      )}
                    </button>

                    {/* 1-Click Open in Gmail Web */}
                    <button
                      type="button"
                      onClick={handleOpenDirectGmail}
                      className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#F8F9FB] border border-[#DADEE6] text-[#14161D] font-medium text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Compose directly in Gmail web"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#A8763A]" />
                      <span>Send with Gmail</span>
                      <ExternalLink className="w-3 h-3 text-[#7B8194]" />
                    </button>

                    {/* Primary Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-sm transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Preparing Dispatch...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Direct Email Link Strip with 1-Click Copy and Gmail Launch */}
            <div className="mt-8 pt-6 border-t border-[#DADEE6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B8194]">
              <div className="flex items-center gap-2">
                <span>Direct email address:</span>
                <span className="font-mono text-sm text-[#14161D] font-semibold bg-[#F4F6F9] px-2 py-0.5 rounded border border-[#DADEE6]">
                  {TARGET_EMAIL}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmailAddress}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F4F6F9] hover:bg-[#E5E9F0] text-[#14161D] font-mono text-[11px] transition-colors cursor-pointer border border-[#DADEE6]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#7B8194]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={getGmailComposeUrl(
                    'Direct Inquiry to Zenith Studio',
                    'Hello Zenith Studio,\n\nI would like to inquire about your engineering services.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#A8763A]/15 hover:bg-[#A8763A]/25 text-[#7A4F1D] font-mono text-[11px] font-semibold transition-colors cursor-pointer border border-[#A8763A]/30"
                >
                  <Mail className="w-3 h-3 text-[#A8763A]" />
                  <span>Open in Gmail</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>

                <a
                  href={getMailtoUrl(
                    'Direct Inquiry to Zenith Studio',
                    'Hello Zenith Studio,\n\nI would like to inquire about your engineering services.'
                  )}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F4F6F9] hover:bg-[#E5E9F0] text-[#14161D] font-mono text-[11px] transition-colors cursor-pointer border border-[#DADEE6]"
                >
                  <Send className="w-3 h-3 text-[#7B8194]" />
                  <span>Mail App</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
