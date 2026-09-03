import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Mail, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import { TARGET_EMAIL, getGmailComposeUrl } from '../utils/emailService';

interface FAQItem {
  id: string;
  category: 'Engagement & Pricing' | 'Architecture & IP' | 'Process & Speed' | 'Reliability & AI';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'pricing-model',
    category: 'Engagement & Pricing',
    question: 'How do you charge? Fixed-price sprint or monthly retainer?',
    answer:
      'We offer both depending on project maturity. For well-scoped builds (e.g., custom AI agent, SaaS MVP, video creative bundle, or ad campaign overhaul), we execute on fixed-price, milestone-based sprints—giving you 100% budget predictability with zero surprise invoices. For ongoing engineering, model fine-tuning, and growth scaling, we operate on dedicated monthly sprint retainers with weekly deliverable cadence.',
    highlight: 'Fixed-price sprints or dedicated monthly retainers with zero hidden fees.',
  },
  {
    id: 'code-ownership',
    category: 'Architecture & IP',
    question: 'Who owns the intellectual property and code repository?',
    answer:
      'You own 100% of all intellectual property, source code, design files, Figma assets, and trained pipeline configurations from day one. Upon milestone completion, full administrative access is handed over to your private GitHub organization, AWS/GCP cloud tenant, and ad accounts. We retain zero proprietary lock-in.',
    highlight: '100% client IP ownership. Transferred directly to your private cloud & GitHub.',
  },
  {
    id: 'ai-hallucination',
    category: 'Reliability & AI',
    question: 'How do you prevent AI agents from hallucinating or going rogue?',
    answer:
      'We do not rely on raw chat prompts. We build deterministic multi-agent architectures using structured Pydantic schemas, strict JSON tool-calling validation, human-in-the-loop approval thresholds for high-stakes actions (e.g. database mutations, payments), and automated rollback safeguards. Every agent response is grounded with vector search and semantic caching.',
    highlight: 'Deterministic JSON validation, strict guardrails, and human-in-the-loop triggers.',
  },
  {
    id: 'kickoff-timeline',
    category: 'Process & Speed',
    question: 'How quickly can Zenith Studio kick off our project?',
    answer:
      'After our initial 30-minute scoping consultation and mutual NDA execution, we deliver a formal architecture brief and milestone proposal within 24 to 48 hours. Once approved, engineering and sprint work begins immediately—typically within 3 business days.',
    highlight: 'Rapid 3-day kick-off post scoping brief & NDA signing.',
  },
  {
    id: 'existing-stack',
    category: 'Architecture & IP',
    question: 'Can you work within our existing tech stack and infrastructure?',
    answer:
      'Yes. Over 70% of our enterprise clients have existing legacy databases, CRMs (Salesforce, HubSpot), ERPs, and cloud environments (AWS, GCP, Azure, Cloudflare). We architect seamless zero-downtime microservices and webhooks that enhance your current stack rather than demanding a disruptive rewrite.',
    highlight: 'Seamless integration with existing AWS/GCP, PostgreSQL, Salesforce & REST APIs.',
  },
  {
    id: 'nda-confidentiality',
    category: 'Process & Speed',
    question: 'Do you sign mutual NDAs before reviewing sensitive requirements?',
    answer:
      'Standard protocol. Before any proprietary datasets, business logic, or customer workflows are shared, we sign a standard mutual non-disclosure agreement (NDA). We strictly enforce end-to-end data isolation and never train open models on private client data.',
    highlight: 'Standard mutual NDA executed before discovery calls.',
  },
  {
    id: 'creative-performance',
    category: 'Engagement & Pricing',
    question: 'What is included in the Video Editing & Meta Ads growth services?',
    answer:
      'Unlike traditional slow agencies, our creative arm combines high-velocity motion design, 3D CGI product renders, and data-backed performance advertising. We script, edit, render, A/B test hooks, manage bid setups, and optimize Meta/Google ad spend based on real-time ROAS and customer acquisition cost (CAC).',
    highlight: 'High-velocity creative pipeline synced directly with performance ad campaigns.',
  },
  {
    id: 'support-maintenance',
    category: 'Reliability & AI',
    question: 'What happens after the system or campaign is launched?',
    answer:
      'All Zenith builds include a standard 30-day post-launch warranty with dedicated bug fixing, performance monitoring, and team onboarding documentation. Afterward, clients can transition to an SLA-backed maintenance retainer or manage the systems internally with the comprehensive runbooks we provide.',
    highlight: '30-day post-launch warranty included, plus ongoing SLA maintenance tiers.',
  },
];

const CATEGORIES = [
  'All Categories',
  'Engagement & Pricing',
  'Architecture & IP',
  'Process & Speed',
  'Reliability & AI',
] as const;

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'pricing-model': true,
    'code-ownership': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F6F7F9] border-b border-[#DADEE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DADEE6] text-xs font-mono text-[#A8763A] uppercase tracking-wider font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparency &amp; Governance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161D] font-normal leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#4A5060] leading-relaxed">
            Everything you need to know about partnering with Zenith Studio: contracts, IP transfer, security guardrails, and sprint delivery velocity.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#14161D] text-white font-semibold shadow-xs'
                    : 'bg-white border border-[#DADEE6] text-[#4A5060] hover:bg-[#EEF0F4] hover:text-[#14161D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7B8194] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. NDA, IP)..."
              className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-white border border-[#DADEE6] rounded-lg text-[#14161D] placeholder-[#7B8194] focus:outline-none focus:border-[#A8763A]"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-4xl">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`bg-white border rounded-xl transition-all ${
                    isOpen
                      ? 'border-[#A8763A]/40 shadow-xs'
                      : 'border-[#DADEE6] hover:border-[#CAD0DC]'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="inline-block text-[11px] font-mono text-[#A8763A] uppercase tracking-wider font-semibold mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-[#14161D] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`p-1.5 rounded-lg border transition-all mt-1 shrink-0 ${
                        isOpen
                          ? 'bg-[#A8763A]/10 border-[#A8763A]/30 text-[#A8763A] rotate-180'
                          : 'bg-[#F6F7F9] border-[#DADEE6] text-[#7B8194]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#F0F2F6]">
                      <p className="text-sm sm:text-base text-[#4A5060] leading-relaxed mb-3">
                        {faq.answer}
                      </p>
                      {faq.highlight && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F4F6F9] border border-[#DADEE6] text-xs font-mono text-[#14161D]">
                          <Shield className="w-3.5 h-3.5 text-[#A8763A]" />
                          <span>{faq.highlight}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-[#DADEE6] rounded-xl p-8 text-center">
              <p className="text-sm text-[#7B8194] font-mono">
                No matching questions found for "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}
                className="mt-3 text-xs font-mono text-[#A8763A] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Ask Custom Question Banner */}
        <div className="mt-12 max-w-4xl p-6 rounded-2xl bg-white border border-[#DADEE6] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#A8763A]/10 border border-[#A8763A]/20 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-[#A8763A]" />
            </div>
            <div>
              <h4 className="text-base font-medium text-[#14161D]">
                Have a specific architecture or custom requirement?
              </h4>
              <p className="text-xs sm:text-sm text-[#7B8194] mt-0.5">
                Speak directly with a senior engineer at{' '}
                <strong className="text-[#14161D] font-mono">{TARGET_EMAIL}</strong>. We reply within 24 hours.
              </p>
            </div>
          </div>

          <a
            href={getGmailComposeUrl(
              'Custom Engineering Question for Zenith Studio',
              'Hello Zenith Studio,\n\nI have a question regarding...'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#14161D] hover:bg-[#2A2E3B] text-white font-medium text-xs font-mono transition-colors shrink-0 shadow-xs"
          >
            <span>Ask via Gmail</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8763A]" />
          </a>
        </div>
      </div>
    </section>
  );
};
