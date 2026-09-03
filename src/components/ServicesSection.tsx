import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Layout,
  Smartphone,
  Layers,
  PenTool,
  Network,
  MessageSquare,
  BarChart3,
  Cloud,
  ShoppingBag,
  Building2,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles,
  Video,
  Target,
  MousePointerClick,
  Palette,
  TrendingUp,
  Share2,
  Flame,
  CheckCircle2,
  Clock,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ServiceItem, ServiceCategory } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { RevealOnScroll } from './RevealOnScroll';
import { ServiceIcon, TechBadge } from './ServiceIcon';

interface ServicesSectionProps {
  onSelectServiceForScope: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForScope }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories: { id: ServiceCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Capabilities', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'creative-media', label: 'Video & Creative Media', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'growth-marketing', label: 'Meta Ads & Growth', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'ai-agents', label: 'AI & Autonomous Agents', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'software-apps', label: 'Software & Mobile Apps', icon: <Layout className="w-3.5 h-3.5" /> },
    { id: 'cloud-systems', label: 'Cloud & Infrastructure', icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const matchesPopular = !onlyPopular || Boolean(service.popular || service.badge === 'High Demand' || service.badge === 'Proven ROI' || service.badge === 'Popular');
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.deliverables.some((d) => d.toLowerCase().includes(q)) ||
        service.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesPopular && matchesQuery;
    });
  }, [selectedCategory, onlyPopular, searchQuery]);

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#EEF0F4] border-b border-[#DADEE6] relative overflow-hidden">
      {/* Subtle ambient grid pattern for architectural feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#14161D 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <RevealOnScroll delay={0}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DADEE6] mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A8763A] font-semibold mb-3 px-2.5 py-1 rounded bg-[#A8763A]/10 border border-[#A8763A]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#A8763A]" />
                <span>Full-Spectrum Production &amp; Engineering</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#14161D] font-normal leading-tight">
                Services &amp; Capabilities
              </h2>
            </div>
            <div className="max-w-md lg:text-right">
              <p className="text-base text-[#4A5060] leading-relaxed">
                From high-retention commercial video editing and revenue-scaling Meta Ads to bespoke web applications and autonomous AI agents.
              </p>
              <div className="mt-3 flex items-center lg:justify-end gap-3 text-xs font-mono text-[#7B8194]">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Accepting Q3/Q4 briefs</span>
                </span>
                <span>•</span>
                <span>{SERVICES_DATA.length} Specializations</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Dynamic Controls: Category Navigation Pill Bar + Filters */}
        <RevealOnScroll delay={80}>
          <div className="flex flex-col gap-4 mb-8">
            {/* Category Tabs with Animated Pill indicator */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#E2E6ED] border border-[#DADEE6] overflow-x-auto no-scrollbar scroll-smooth">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? SERVICES_DATA.length
                    : SERVICES_DATA.filter((s) => s.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shrink-0 flex items-center gap-2 cursor-pointer z-10 ${
                      isSelected ? 'text-[#14161D] font-semibold' : 'text-[#4A5060] hover:text-[#14161D]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeServiceTab"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm border border-[#DADEE6]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {cat.icon}
                      <span>{cat.label}</span>
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected
                            ? 'bg-[#EEF0F4] text-[#14161D]'
                            : 'bg-black/5 text-[#7B8194]'
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-bar: Search Input & High-Demand Filter Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setOnlyPopular(!onlyPopular)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                    onlyPopular
                      ? 'bg-[#A8763A] text-white border-[#A8763A] shadow-sm'
                      : 'bg-white text-[#4A5060] border-[#DADEE6] hover:border-[#A8763A]/40'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${onlyPopular ? 'text-white' : 'text-[#A8763A]'}`} />
                  <span>High-Demand &amp; Trending Only</span>
                </button>

                <div className="text-xs font-mono text-[#7B8194] px-2 py-1">
                  Showing <span className="font-semibold text-[#14161D]">{filteredServices.length}</span> of {SERVICES_DATA.length} services
                </div>
              </div>

              {/* Instant Search Bar */}
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-[#7B8194] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search video editing, meta ads, stack..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#DADEE6] text-[#14161D] placeholder-[#7B8194] focus:outline-none focus:border-[#A8763A] focus:ring-1 focus:ring-[#A8763A] transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7B8194] hover:text-[#14161D] p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Animated Services Grid */}
        <AnimatePresence mode="wait">
          {filteredServices.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center py-16 bg-white rounded-xl border border-[#DADEE6] p-8"
            >
              <div className="w-12 h-12 rounded-full bg-[#EEF0F4] text-[#A8763A] mx-auto mb-4 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#14161D] mb-1">No services found</h3>
              <p className="text-[#4A5060] text-sm mb-4">
                No active capabilities match "{searchQuery}" with the current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyPopular(false);
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EEF0F4] hover:bg-[#E2E6ED] text-xs font-mono text-[#14161D] font-semibold transition-colors cursor-pointer"
              >
                <span>Reset all filters</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${selectedCategory}-${onlyPopular}`}
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  onClick={() => setActiveModalService(service)}
                  className="group relative bg-white rounded-xl border border-[#DADEE6] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#A8763A]/40 hover:shadow-lg cursor-pointer overflow-hidden"
                >
                  {/* Subtle top amber highlight accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A8763A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Meta Header: Icon + Badge + Metric Stat */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#EEF0F4] border border-[#DADEE6] group-hover:border-[#A8763A]/40 group-hover:bg-[#A8763A]/10 text-[#A8763A] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xs">
                        <ServiceIcon iconName={service.iconName} category={service.category} size="lg" />
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        {service.badge && (
                          <span
                            className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                              service.badge === 'High Demand' || service.badge === 'Proven ROI'
                                ? 'bg-[#A8763A]/15 text-[#A8763A] border-[#A8763A]/30'
                                : 'bg-[#EEF0F4] text-[#4A5060] border-[#DADEE6]'
                            }`}
                          >
                            {service.badge}
                          </span>
                        )}
                        {service.highlightStat && (
                          <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {service.highlightStat}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#14161D] font-normal mb-2.5 group-hover:text-[#A8763A] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-[#4A5060] leading-relaxed mb-5">
                      {service.shortDesc}
                    </p>

                    {/* Key Deliverables Preview */}
                    <div className="mb-5 space-y-1.5 pt-3 border-t border-[#EEF0F4]">
                      {service.deliverables.slice(0, 2).map((deliv, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#2A2E3D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A8763A] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{deliv}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Micro-Pills with Icons */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.techStack.slice(0, 3).map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                      ))}
                      {service.techStack.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F4F6F8] text-[#7B8194] border border-[#E2E6ED]">
                          +{service.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Footer with Actions */}
                  <div className="pt-4 border-t border-[#DADEE6] flex items-center justify-between text-xs text-[#7B8194]">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#4A5060]">
                      <Clock className="w-3.5 h-3.5 text-[#A8763A]" />
                      <span>{service.timeline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServiceForScope(service.title);
                        }}
                        className="px-2.5 py-1 rounded bg-[#EEF0F4] hover:bg-[#A8763A] hover:text-white text-[#14161D] font-mono text-[10px] uppercase font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Quick Scope"
                      >
                        <Send className="w-3 h-3" />
                        <span>Scope</span>
                      </button>

                      <div className="inline-flex items-center gap-1 font-medium text-[#A8763A] group-hover:translate-x-1 transition-transform">
                        <span>Spec</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Fast CTA Banner */}
        <RevealOnScroll delay={150}>
          <div className="mt-14 p-6 sm:p-8 rounded-xl bg-[#14161D] text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A8763A] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Media &amp; Engineering Retainers</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Need a dedicated growth pod or bespoke video + engineering sprint?
              </h3>
              <p className="text-sm text-[#A0A6B8] max-w-xl mt-1 leading-relaxed">
                Combine high-retention video production, Meta ad scaling, and custom web architecture in one synchronized team.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#estimator"
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/15 transition-all"
              >
                Estimate Cost
              </a>
              <button
                onClick={() => onSelectServiceForScope('Multi-Service Growth Sprint')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A8763A] hover:bg-[#C79554] text-[#14161D] font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onSelectForScope={(title) => {
          onSelectServiceForScope(title);
          setActiveModalService(null);
        }}
      />
    </section>
  );
};
