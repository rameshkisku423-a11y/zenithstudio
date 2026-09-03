import React, { useState, useMemo } from 'react';
import {
  Calculator,
  ArrowRight,
  Check,
  Sparkles,
  Layers,
  Clapperboard,
  Target,
  Bot,
  Layout,
  Smartphone,
  Network,
} from 'lucide-react';

interface ProjectEstimatorProps {
  onApplyScopeToContact: (scopeData: {
    projectType: string;
    complexity: string;
    timeline: string;
    integrations: string[];
  }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onApplyScopeToContact,
}) => {
  const [projectType, setProjectType] = useState<string>('ai-agent');
  const [complexity, setComplexity] = useState<string>('production');
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    'PostgreSQL / Vector DB',
    'Custom Tool APIs',
  ]);

  const projectTypes = [
    { id: 'video-editing', label: 'Video Editing & Motion Graphics', baseWeeks: 1, icon: <Clapperboard className="w-4 h-4" /> },
    { id: 'meta-ads', label: 'Meta Ads & Growth Scaling', baseWeeks: 2, icon: <Target className="w-4 h-4" /> },
    { id: 'ai-agent', label: 'AI Agent & Tool Automation', baseWeeks: 3, icon: <Bot className="w-4 h-4" /> },
    { id: 'saas-app', label: 'Full-Stack Web App / SaaS', baseWeeks: 5, icon: <Layout className="w-4 h-4" /> },
    { id: 'mobile-app', label: 'Cross-Platform Mobile App', baseWeeks: 6, icon: <Smartphone className="w-4 h-4" /> },
    { id: 'pipeline', label: 'Data & ETL Integration Pipeline', baseWeeks: 2, icon: <Network className="w-4 h-4" /> },
  ];

  const complexityLevels = [
    { id: 'pilot', label: 'Fast Pilot / MVP', mult: 1, desc: 'Core logic, validation against real sample data' },
    { id: 'production', label: 'Production Hardened', mult: 1.5, desc: 'Guardrails, CI/CD, auto-retry, comprehensive telemetry' },
    { id: 'enterprise', label: 'Enterprise & High Security', mult: 2.2, desc: 'SSO, SOC2/HIPAA compliance, mTLS, zero-downtime blue/green' },
  ];

  const availableIntegrations = [
    'PostgreSQL / Vector DB',
    'Custom Tool APIs',
    'Stripe / Payments',
    'ERP / SAP / Salesforce',
    'SSO / RBAC Auth',
    'Epic / FHIR Healthcare',
    'AWS / GCP Cloud Infra',
  ];

  const toggleIntegration = (item: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const estimatedTimeline = useMemo(() => {
    const base = projectTypes.find((p) => p.id === projectType)?.baseWeeks || 3;
    const mult = complexityLevels.find((c) => c.id === complexity)?.mult || 1.5;
    const integrationAdd = Math.floor(selectedIntegrations.length * 0.4);
    const minWeeks = Math.max(2, Math.round(base * mult + integrationAdd));
    const maxWeeks = Math.round(minWeeks * 1.35);
    return `${minWeeks} - ${maxWeeks} weeks`;
  }, [projectType, complexity, selectedIntegrations]);

  const handleApply = () => {
    const pType = projectTypes.find((p) => p.id === projectType)?.label || 'Custom Software';
    const cLevel = complexityLevels.find((c) => c.id === complexity)?.label || 'Production';
    onApplyScopeToContact({
      projectType: pType,
      complexity: cLevel,
      timeline: estimatedTimeline,
      integrations: selectedIntegrations,
    });
  };

  return (
    <section id="estimator" className="py-20 sm:py-28 bg-[#EEF0F4] border-b border-[#DADEE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#DADEE6] mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#A8763A] font-semibold mb-2 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent Scoping Tool</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#14161D] font-normal leading-tight">
              Estimate your project timeline &amp; architecture
            </h2>
          </div>
          <p className="text-base text-[#4A5060] max-w-md md:text-right leading-relaxed">
            Gain immediate clarity on engineering duration, dependencies, and architecture before speaking to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Scoping Controls */}
          <div className="lg:col-span-7 bg-white border border-[#DADEE6] rounded-xl p-6 sm:p-8 shadow-xs">
            {/* 1. Project Type */}
            <div className="mb-6">
              <label className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold block mb-3">
                1. Select Core System Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setProjectType(t.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      projectType === t.id
                        ? 'bg-[#EEF0F4] border-[#A8763A] ring-1 ring-[#A8763A] text-[#14161D]'
                        : 'bg-[#F6F7F9] border-[#DADEE6] text-[#4A5060] hover:bg-[#EEF0F4]'
                    }`}
                  >
                    <span className={`shrink-0 ${projectType === t.id ? 'text-[#A8763A]' : 'text-[#7B8194]'}`}>
                      {t.icon}
                    </span>
                    <div className="text-sm font-medium leading-snug">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Complexity */}
            <div className="mb-6">
              <label className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold block mb-3">
                2. Deployment &amp; Reliability Tier
              </label>
              <div className="space-y-2.5">
                {complexityLevels.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      complexity === c.id
                        ? 'bg-[#EEF0F4] border-[#A8763A] ring-1 ring-[#A8763A] text-[#14161D]'
                        : 'bg-[#F6F7F9] border-[#DADEE6] text-[#4A5060] hover:bg-[#EEF0F4]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium">{c.label}</div>
                      <div className="text-xs text-[#7B8194] mt-0.5">{c.desc}</div>
                    </div>
                    {complexity === c.id && (
                      <span className="w-5 h-5 rounded-full bg-[#A8763A] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Integrations */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#7B8194] font-semibold block mb-3">
                3. Integrations &amp; Connectors (Select all applicable)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableIntegrations.map((item) => {
                  const active = selectedIntegrations.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleIntegration(item)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#A8763A] border-[#A8763A] text-white font-medium'
                          : 'bg-[#F6F7F9] border-[#DADEE6] text-[#4A5060] hover:border-[#A8763A]'
                      }`}
                    >
                      {active ? `✓ ${item}` : `+ ${item}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scoping Output Summary */}
          <div className="lg:col-span-5 bg-[#14161D] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-[#262A36]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#A78BFA] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#67E8F9]" />
                <span>Scope Output Summary</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#F5F3FF] mb-6">
                Estimated Delivery Window
              </h3>

              {/* Big Stat Box */}
              <div className="bg-[#1C1F2B] border border-[#262A36] rounded-lg p-5 mb-6">
                <div className="text-xs font-mono text-[#8B93A7] uppercase mb-1">
                  Sprint Cadence
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#D9BC8B] font-medium">
                  {estimatedTimeline}
                </div>
                <div className="text-xs text-[#8B93A7] mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Includes design spec, continuous testing &amp; staging reviews</span>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm font-mono text-[#C7CCE0] mb-6">
                <div className="flex justify-between py-1.5 border-b border-[#262A36]">
                  <span className="text-[#8B93A7]">System Archetype:</span>
                  <span className="text-white text-right">
                    {projectTypes.find((p) => p.id === projectType)?.label}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#262A36]">
                  <span className="text-[#8B93A7]">Reliability Level:</span>
                  <span className="text-white text-right">
                    {complexityLevels.find((c) => c.id === complexity)?.label}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#262A36]">
                  <span className="text-[#8B93A7]">Integrations:</span>
                  <span className="text-white text-right">
                    {selectedIntegrations.length} Selected
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#262A36]">
                  <span className="text-[#8B93A7]">Deliverable:</span>
                  <span className="text-emerald-300 text-right">100% Code &amp; Docker Handover</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-[#262A36]">
              <button
                onClick={handleApply}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-sm transition-all duration-150 cursor-pointer"
              >
                <span>Attach this scope to inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
