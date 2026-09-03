import React, { useEffect } from 'react';
import { X, CheckCircle2, Clock, Cpu, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceIcon, TechBadge } from './ServiceIcon';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForScope: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectForScope,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#14161D]/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-[#DADEE6] rounded-xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#7B8194] hover:text-[#14161D] hover:bg-[#EEF0F4] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Icon Box */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#EEF0F4] border border-[#DADEE6] text-[#A8763A] flex items-center justify-center shrink-0 shadow-sm">
            <ServiceIcon iconName={service.iconName} category={service.category} size="xl" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#EEF0F4] text-[#A8763A] uppercase tracking-wider font-semibold border border-[#DADEE6]">
                {service.category.replace('-', ' ')}
              </span>
              {service.badge && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#A8763A]/15 text-[#A8763A] font-medium border border-[#A8763A]/20">
                  {service.badge}
                </span>
              )}
              {service.highlightStat && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#14161D] text-[#C79554] border border-[#A8763A]/30 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{service.highlightStat}</span>
                </span>
              )}
            </div>
            <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl text-[#14161D] font-normal">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Descriptions */}
        <p className="text-base text-[#4A5060] leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Deliverables */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#7B8194] mb-3 font-semibold">
            Key Architecture &amp; Deliverables
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[#14161D]">
                <CheckCircle2 className="w-4 h-4 text-[#A8763A] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack & Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-[#F6F7F9] border border-[#DADEE6] mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7B8194] uppercase mb-2 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-[#A8763A]" />
              <span>Battle-Tested Stack &amp; Tools</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {service.techStack.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7B8194] uppercase mb-2 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#A8763A]" />
              <span>Typical Delivery Window</span>
            </div>
            <div className="text-sm font-semibold text-[#14161D]">
              {service.timeline}
            </div>
            <div className="text-xs text-[#7B8194] mt-0.5">
              Working deliverables shipped in sprint milestones
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#DADEE6]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-[#4A5060] hover:text-[#14161D] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelectForScope(service.title);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            <span>Request Scope for this Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
