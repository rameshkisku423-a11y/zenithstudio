import React, { useState } from 'react';
import { Star, Quote, CheckCircle, TrendingUp, Building2, User, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyCategory: 'Fintech' | 'Healthcare SaaS' | 'E-commerce DTC' | 'Enterprise Logistics';
  serviceCategory: 'AI Automation' | 'Growth & Creative' | 'Cloud & SaaS';
  quote: string;
  keyMetric: string;
  metricLabel: string;
  avatarInitials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Apex Ledger Financial',
    companyCategory: 'Fintech',
    serviceCategory: 'AI Automation',
    quote:
      'Zenith engineered a deterministic multi-agent compliance pipeline that cuts audit triage from 4 days to 18 minutes. What impressed our security board was their refusal to use raw LLMs—everything was strictly typed with Pydantic schemas and cryptographic audit trails.',
    keyMetric: '99.4%',
    metricLabel: 'Audit time reduction',
    avatarInitials: 'MV',
  },
  {
    id: 't2',
    name: 'Elena Rostova',
    role: 'Head of Growth & Acquisition',
    company: 'Luminary Botanicals',
    companyCategory: 'E-commerce DTC',
    serviceCategory: 'Growth & Creative',
    quote:
      'Their hybrid model of high-velocity 3D product video editing paired directly with Meta & Google ad iteration took our blended ROAS from 1.9x to 4.6x within 45 days. They test hooks with algorithmic discipline rather than creative guesswork.',
    keyMetric: '4.6x',
    metricLabel: 'Blended Meta ROAS',
    avatarInitials: 'ER',
  },
  {
    id: 't3',
    name: 'Devin Thorne',
    role: 'Founder & CEO',
    company: 'ScribeFlow Health',
    companyCategory: 'Healthcare SaaS',
    serviceCategory: 'Cloud & SaaS',
    quote:
      'We needed to ship our HIPAA-compliant clinical transcription platform before our Series A demo day. The Zenith team delivered the entire web app, vector database, and real-time audio pipeline 2 weeks ahead of schedule. Zero post-launch bugs.',
    keyMetric: '14 Days',
    metricLabel: 'Ahead of deadline',
    avatarInitials: 'DT',
  },
  {
    id: 't4',
    name: 'Sarah Chen-Morales',
    role: 'VP of Product Operations',
    company: 'FreightSphere Global',
    companyCategory: 'Enterprise Logistics',
    serviceCategory: 'AI Automation',
    quote:
      'Before Zenith, our operations team manually matched 3,000+ customs manifests daily. Zenith built an autonomous OCR and routing engine that handles 94% of invoices with zero human touch. The ROI paid for the entire contract in month two.',
    keyMetric: '$380K',
    metricLabel: 'Annual ops savings',
    avatarInitials: 'SC',
  },
  {
    id: 't5',
    name: 'Julian Montgomery',
    role: 'Creative Director',
    company: 'Aetheria Wearables',
    companyCategory: 'E-commerce DTC',
    serviceCategory: 'Growth & Creative',
    quote:
      'The 3D motion graphics and CGI product renders Zenith crafted for our flagship wearable launch outperformed every agency asset we had ever commissioned. Over 8 million impressions and our highest single-day preorder volume.',
    keyMetric: '+240%',
    metricLabel: 'CTR on social ads',
    avatarInitials: 'JM',
  },
  {
    id: 't6',
    name: 'Tariq Al-Mansoor',
    role: 'Director of Engineering',
    company: 'NovaGrid Infrastructure',
    companyCategory: 'Fintech',
    serviceCategory: 'Cloud & SaaS',
    quote:
      'Clean architecture from commit one. Full TypeScript strict mode, comprehensive Terraform scripts for AWS, and zero tech debt left behind. Zenith operates at the caliber of senior FAANG staff engineers.',
    keyMetric: '100%',
    metricLabel: 'Type-safe test coverage',
    avatarInitials: 'TA',
  },
];

const CATEGORIES = ['All Proof', 'AI Automation', 'Growth & Creative', 'Cloud & SaaS'] as const;

export const TestimonialsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Proof');

  const filteredTestimonials = TESTIMONIALS.filter((item) => {
    if (selectedFilter === 'All Proof') return true;
    return item.serviceCategory === selectedFilter;
  });

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white border-b border-[#DADEE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F7F9] border border-[#DADEE6] text-xs font-mono text-[#A8763A] uppercase tracking-wider font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Verified Client Outcomes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161D] font-normal leading-tight">
              Backed by production metrics, not promises.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#14161D] text-white font-semibold shadow-xs'
                    : 'bg-[#F6F7F9] border border-[#DADEE6] text-[#4A5060] hover:bg-[#EEF0F4] hover:text-[#14161D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#F6F7F9] border border-[#DADEE6] rounded-2xl p-6 flex flex-col justify-between hover:border-[#CAD0DC] transition-all group"
            >
              <div>
                {/* Metric pill and rating */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[#DADEE6]">
                  <div className="bg-white border border-[#DADEE6] rounded-lg px-3 py-1.5 shadow-2xs">
                    <div className="font-serif text-lg text-[#14161D] font-bold leading-tight">
                      {item.keyMetric}
                    </div>
                    <div className="text-[10px] font-mono text-[#7B8194] uppercase tracking-wider">
                      {item.metricLabel}
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#A8763A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A8763A]" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-[#4A5060] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Org */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#DADEE6]/60">
                <div className="w-10 h-10 rounded-full bg-[#14161D] text-[#D9BC8B] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {item.avatarInitials}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-semibold text-[#14161D] truncate flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-xs text-[#7B8194] truncate">
                    {item.role} · {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EEF0F4] border border-[#DADEE6] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#14161D] font-normal">
              100%
            </div>
            <div className="text-xs font-mono text-[#7B8194] uppercase tracking-wider mt-1">
              IP &amp; Code Ownership
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#14161D] font-normal">
              &lt; 24h
            </div>
            <div className="text-xs font-mono text-[#7B8194] uppercase tracking-wider mt-1">
              Proposal Turnaround
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#14161D] font-normal">
              99.9%
            </div>
            <div className="text-xs font-mono text-[#7B8194] uppercase tracking-wider mt-1">
              Deterministic Uptime
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#14161D] font-normal">
              0 Mock Demos
            </div>
            <div className="text-xs font-mono text-[#7B8194] uppercase tracking-wider mt-1">
              Production-First Only
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
