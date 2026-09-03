import React from 'react';
import { MARQUEE_TECH } from '../data/agencyData';

export const TechMarquee: React.FC = () => {
  return (
    <div
      className="border-y border-[#DADEE6] bg-[#EEF0F4] py-4 overflow-hidden select-none"
      aria-label="Core Engineering Technologies"
    >
      <div className="flex animate-marquee">
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {MARQUEE_TECH.map((tech, idx) => (
            <div key={`tech-1-${idx}`} className="flex items-center gap-3">
              <span className="font-mono text-sm tracking-wide text-[#4A5060] font-medium">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8763A]" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {MARQUEE_TECH.map((tech, idx) => (
            <div key={`tech-2-${idx}`} className="flex items-center gap-3">
              <span className="font-mono text-sm tracking-wide text-[#4A5060] font-medium">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8763A]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
