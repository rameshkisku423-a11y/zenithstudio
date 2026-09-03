import React from 'react';
import { Users, Award, ShieldCheck, RefreshCw } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-[#DADEE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Quote & Constellation */}
          <div className="lg:col-span-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#A8763A] font-semibold mb-4">
              Our Ethos &amp; Craft
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl text-[#14161D] leading-snug font-normal mb-8">
              We build the kind of system that is still running quietly and reliably in your production stack{' '}
              <span className="italic text-[#A8763A]">a year later</span> — not the one that merely impressed a demo room once.
            </blockquote>

            {/* Constellation SVG Visual */}
            <div className="p-6 rounded-xl bg-[#F6F7F9] border border-[#DADEE6] relative overflow-hidden">
              <svg viewBox="0 0 400 200" className="w-full h-auto" aria-hidden="true">
                <g className="stroke-[#DADEE6] stroke-[1.2]">
                  <line x1="40" y1="140" x2="120" y2="70" />
                  <line x1="120" y1="70" x2="210" y2="100" />
                  <line x1="210" y1="100" x2="320" y2="40" />
                  <line x1="120" y1="70" x2="190" y2="25" />
                  <line x1="210" y1="100" x2="270" y2="160" />
                  <line x1="40" y1="140" x2="90" y2="180" />
                  <line x1="270" y1="160" x2="350" y2="140" />
                </g>

                {/* Nodes */}
                <circle cx="40" cy="140" r="4.5" fill="#D9BC8B" />
                <circle cx="120" cy="70" r="5" fill="#D9BC8B" />
                <circle cx="190" cy="25" r="3.5" fill="#D9BC8B" />
                <circle cx="210" cy="100" r="7" fill="#A8763A" className="animate-pulse" />
                <circle cx="320" cy="40" r="4.5" fill="#D9BC8B" />
                <circle cx="270" cy="160" r="4" fill="#D9BC8B" />
                <circle cx="90" cy="180" r="3.5" fill="#D9BC8B" />
                <circle cx="350" cy="140" r="4" fill="#D9BC8B" />

                {/* Annotations */}
                <text x="210" y="125" textAnchor="middle" className="text-[10px] font-mono fill-[#7B8194]">
                  Production Hub
                </text>
              </svg>
              <div className="text-xs font-mono text-[#7B8194] text-center mt-2">
                Resilient mesh topology · Zero single point of failure
              </div>
            </div>
          </div>

          {/* Right Column: Senior Team Narrative & Concrete Numbers */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-5 text-base text-[#4A5060] leading-relaxed mb-8">
              <p>
                Zenith Studio is a focused collective of senior engineers, system architects, and interaction designers who have spent years deploying AI agents, data pipelines, and full-stack software products for companies that cannot afford flaky code.
              </p>
              <p>
                We work directly with technical founders, CTOs, and operations leaders — without layers of junior associates or non-technical account managers. Every conversation is with the actual engineers architecting your system.
              </p>
              <p>
                By design, we take on a strictly limited number of engagements per quarter. Every system receives the same senior attention from the initial architecture design through to testing, staging verification, and production handover.
              </p>
            </div>

            {/* Senior Team Numbers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#DADEE6]">
              <div className="p-4 rounded-lg bg-[#F6F7F9] border border-[#DADEE6]">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7B8194] mb-1">
                  <Award className="w-3.5 h-3.5 text-[#A8763A]" />
                  <span>Systems Shipped</span>
                </div>
                <div className="font-serif text-3xl font-medium text-[#14161D]">30+</div>
                <div className="text-xs text-[#7B8194] mt-1">Live in production</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F6F7F9] border border-[#DADEE6]">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7B8194] mb-1">
                  <Users className="w-3.5 h-3.5 text-[#A8763A]" />
                  <span>Senior Team</span>
                </div>
                <div className="font-serif text-3xl font-medium text-[#14161D]">6</div>
                <div className="text-xs text-[#7B8194] mt-1">Zero juniors / layers</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F6F7F9] border border-[#DADEE6] col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7B8194] mb-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#A8763A]" />
                  <span>Renewal Rate</span>
                </div>
                <div className="font-serif text-3xl font-medium text-[#14161D]">92%</div>
                <div className="text-xs text-[#7B8194] mt-1">Multi-project clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
