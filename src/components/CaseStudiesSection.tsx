import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Cpu, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';

export const CaseStudiesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="work" className="py-20 sm:py-28 bg-[#F6F7F9] border-b border-[#DADEE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#DADEE6] mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#A8763A] font-semibold mb-2">
              Production Benchmarks
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#14161D] font-normal leading-tight">
              Selected client outcomes
            </h2>
          </div>
          <p className="text-base text-[#4A5060] max-w-md md:text-right leading-relaxed">
            Real metrics measured in customer production environments — verified against historical baselines, not synthetic marketing claims.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study: CaseStudy) => {
            const isExpanded = expandedId === study.id;

            return (
              <div
                key={study.id}
                className="bg-white border border-[#DADEE6] rounded-xl p-7 flex flex-col justify-between shadow-xs transition-all duration-200 hover:shadow-md"
              >
                <div>
                  {/* Metric Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1 text-[#A8763A]">
                      <span className="font-serif text-5xl font-medium tracking-tight">
                        {study.statValue}
                      </span>
                      <span className="font-serif text-2xl font-light text-[#7B8194]">
                        {study.statSuffix}
                      </span>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold mt-1">
                      {study.statLabel}
                    </div>
                  </div>

                  {/* Title & Domain */}
                  <h3 className="font-serif text-xl text-[#14161D] font-normal mb-2 leading-snug">
                    {study.title}
                  </h3>
                  <div className="text-xs font-mono text-[#A8763A] mb-4">
                    {study.domain}
                  </div>

                  <p className="text-sm text-[#4A5060] leading-relaxed mb-6">
                    {study.summary}
                  </p>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-[#DADEE6] space-y-4 text-xs sm:text-sm animate-fade-in">
                      <div>
                        <span className="font-mono text-xs font-semibold text-[#7B8194] uppercase tracking-wider block mb-1">
                          The Challenge:
                        </span>
                        <p className="text-[#4A5060] leading-relaxed">{study.problem}</p>
                      </div>

                      <div>
                        <span className="font-mono text-xs font-semibold text-[#7B8194] uppercase tracking-wider block mb-1">
                          Zenith Engineering:
                        </span>
                        <p className="text-[#4A5060] leading-relaxed">{study.solution}</p>
                      </div>

                      <div>
                        <span className="font-mono text-xs font-semibold text-[#7B8194] uppercase tracking-wider block mb-2">
                          Production Verification:
                        </span>
                        <ul className="space-y-1.5">
                          {study.impactMetrics.map((metric, i) => (
                            <li key={i} className="flex items-start gap-2 text-[#14161D]">
                              <CheckCircle className="w-3.5 h-3.5 text-[#A8763A] shrink-0 mt-0.5" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-mono text-xs font-semibold text-[#7B8194] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <Cpu className="w-3 h-3 text-[#A8763A]" />
                          <span>Stack Deployed:</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {study.techUsed.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EEF0F4] border border-[#DADEE6] text-[#4A5060]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Toggle Button */}
                <div className="pt-5 mt-4 border-t border-[#DADEE6] flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(study.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#A8763A] hover:text-[#C79554] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide architectural details' : 'Explore system breakdown'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7B8194]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
