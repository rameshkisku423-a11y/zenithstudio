import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Terminal as TermIcon,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Search,
  PenTool,
  Code2,
  Activity,
  Server,
  FileCode,
  Sliders,
  Maximize2,
  Clock,
  ExternalLink,
  Bot,
  Film,
  Target,
  Layout,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TERMINAL_SCENARIOS, PIPELINE_STAGES } from '../data/agencyData';
import { TerminalScenario, PipelineStage } from '../types';

interface InteractiveSpineProps {
  onSelectServiceForScope?: (serviceTitle: string) => void;
}

export const InteractiveSpine: React.FC<InteractiveSpineProps> = ({
  onSelectServiceForScope,
}) => {
  // Terminal state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('support');
  const [renderedLineCount, setRenderedLineCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1 = normal, 2 = fast
  const [copied, setCopied] = useState<boolean>(false);

  // Pipeline inspector state
  const [activeStageId, setActiveStageId] = useState<string>('build');
  const [inspectorTab, setInspectorTab] = useState<'artifacts' | 'gates' | 'milestones'>('artifacts');

  const currentScenario: TerminalScenario =
    TERMINAL_SCENARIOS.find((s) => s.id === selectedScenarioId) || TERMINAL_SCENARIOS[0];

  const activeStage: PipelineStage =
    PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[2];

  // Timer ref for progressive typing
  const timerRef = useRef<number | null>(null);

  // Reset lines when scenario changes
  useEffect(() => {
    setRenderedLineCount(1);
    setIsPlaying(true);
  }, [selectedScenarioId]);

  // Terminal line progression loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const baseDelay = 550 / speedMultiplier;

    if (renderedLineCount < currentScenario.lines.length) {
      timerRef.current = window.setTimeout(() => {
        setRenderedLineCount((prev) => prev + 1);
      }, baseDelay);
    } else {
      // Loop pause at the end
      timerRef.current = window.setTimeout(() => {
        setRenderedLineCount(1);
      }, 5000 / speedMultiplier);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, renderedLineCount, currentScenario.lines.length, speedMultiplier]);

  const handleCopy = () => {
    const text = currentScenario.lines
      .slice(0, renderedLineCount)
      .map((l) => `${l.prefix}${l.text}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setRenderedLineCount(1);
    setIsPlaying(true);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setRenderedLineCount((prev) =>
      prev < currentScenario.lines.length ? prev + 1 : 1
    );
  };

  // Scenario icon helper
  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'support':
        return <Bot className="w-3.5 h-3.5" />;
      case 'video-render':
        return <Film className="w-3.5 h-3.5" />;
      case 'meta-capi':
        return <Target className="w-3.5 h-3.5" />;
      case 'saas-deploy':
        return <Layout className="w-3.5 h-3.5" />;
      case 'finance':
        return <Network className="w-3.5 h-3.5" />;
      default:
        return <Zap className="w-3.5 h-3.5" />;
    }
  };

  // Stage icon helper
  const getStageIcon = (id: string) => {
    switch (id) {
      case 'discover':
        return <Search className="w-4 h-4" />;
      case 'design':
        return <PenTool className="w-4 h-4" />;
      case 'build':
        return <Code2 className="w-4 h-4" />;
      case 'operate':
        return <Activity className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const progressPercent = Math.round(
    (renderedLineCount / currentScenario.lines.length) * 100
  );

  return (
    <section id="how-we-build" className="py-20 sm:py-28 bg-[#F8F9FB] border-b border-[#DADEE6] relative overflow-hidden">
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DADEE615_1px,transparent_1px),linear-gradient(to_bottom,#DADEE615_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#DADEE6] mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#A8763A] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#A8763A] font-semibold">
                Production Architecture &amp; Delivery Engine
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#14161D] font-normal leading-tight">
              How we engineer, verify &amp; ship it
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base text-[#4A5060] leading-relaxed mb-3">
              Moving from mathematical specifications to battle-tested production software with continuous verification at every milestone.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#7B8194]">
              <span className="px-2 py-0.5 rounded bg-white border border-[#DADEE6]">100% Staging Previews</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#DADEE6]">Zero Blind Spots</span>
              <span className="px-2 py-0.5 rounded bg-white border border-[#DADEE6]">Full IP Handover</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left Terminal, Right 4-Phase Delivery Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ========================================================= */}
          {/* LEFT: Live Interactive Build Terminal (CLI Simulator)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col bg-[#111319] rounded-2xl border border-[#232734] overflow-hidden shadow-2xl relative">
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-3 bg-[#181B24] border-b border-[#262B3A] flex items-center justify-between gap-3">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E5615A]/90 hover:brightness-110 transition-all cursor-pointer" />
                <span className="w-3 h-3 rounded-full bg-[#E5B93F]/90 hover:brightness-110 transition-all cursor-pointer" />
                <span className="w-3 h-3 rounded-full bg-[#3FC26B]/90 hover:brightness-110 transition-all cursor-pointer" />
                <span className="ml-2 font-mono text-xs text-[#8B93A7] flex items-center gap-1.5 font-medium">
                  <TermIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>zenith-engine v3.2</span>
                  <span className="text-[#4E566E] hidden sm:inline">· build-worker-01</span>
                </span>
              </div>

              {/* Terminal Quick Controls */}
              <div className="flex items-center gap-1.5 text-[#8B93A7]">
                {/* Speed toggle */}
                <button
                  onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1))}
                  className={`px-1.5 py-0.5 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                    speedMultiplier === 2
                      ? 'bg-[#A8763A]/25 border-[#A8763A] text-[#E0A868]'
                      : 'border-[#2D3345] hover:text-white'
                  }`}
                  title="Toggle playback speed"
                >
                  {speedMultiplier}x Speed
                </button>

                {/* Step forward */}
                <button
                  onClick={handleStepForward}
                  className="p-1.5 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next log line"
                  aria-label="Step forward"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>

                {/* Pause/Play */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause output' : 'Resume execution'}
                  aria-label={isPlaying ? 'Pause output' : 'Resume execution'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E0A868]" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                {/* Reset */}
                <button
                  onClick={handleReset}
                  className="p-1.5 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                  title="Re-run scenario"
                  aria-label="Re-run scenario"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy terminal logs"
                  aria-label="Copy logs"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Target Scenarios Selector Tabs */}
            <div className="px-3 py-2 bg-[#13151D] border-b border-[#262B3A] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-mono text-[#5C6378] pl-1 shrink-0">Preset:</span>
              {TERMINAL_SCENARIOS.map((scen) => {
                const isActive = selectedScenarioId === scen.id;
                return (
                  <button
                    key={scen.id}
                    onClick={() => setSelectedScenarioId(scen.id)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? 'bg-[#A8763A] text-white font-medium shadow-sm'
                        : 'bg-[#1C202C] text-[#8B93A7] hover:text-white hover:bg-[#252B3C]'
                    }`}
                  >
                    <span>{getScenarioIcon(scen.id)}</span>
                    <span>{scen.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Telemetry HUD Bar */}
            <div className="px-4 py-2.5 bg-[#0D0F15] border-b border-[#1E2330] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-4 text-[#7A8299]">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#A8763A]" />
                  <span>CPU:</span>
                  <span className="text-[#C5CAD8] font-semibold">
                    {currentScenario.telemetry?.cpu || '24%'}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Server className="w-3 h-3 text-sky-400" />
                  <span>RAM:</span>
                  <span className="text-[#C5CAD8] font-semibold">
                    {currentScenario.telemetry?.ram || '380MB'}
                  </span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>Latency:</span>
                  <span className="text-[#C5CAD8] font-semibold">
                    {currentScenario.telemetry?.latency || '22ms'}
                  </span>
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 text-[#7A8299]">
                <span>Progress:</span>
                <div className="w-16 sm:w-24 h-1.5 rounded-full bg-[#1C202C] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#A8763A] to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[#C5CAD8] font-semibold text-[10px]">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-[#D7DAE3] flex-1 min-h-[320px] max-h-[440px] flex flex-col justify-between overflow-y-auto">
              <div className="space-y-2.5">
                {currentScenario.lines.slice(0, renderedLineCount).map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2.5 leading-relaxed font-mono"
                  >
                    {/* Timestamp */}
                    {line.timestamp && (
                      <span className="text-[10px] text-[#4E566E] select-none shrink-0 pt-0.5 hidden sm:inline">
                        [{line.timestamp}]
                      </span>
                    )}

                    {/* Prefix marker */}
                    <span
                      className={`font-semibold shrink-0 select-none ${
                        line.type === 'prompt'
                          ? 'text-[#38BDF8]'
                          : line.type === 'ok'
                          ? 'text-emerald-400'
                          : line.type === 'info'
                          ? 'text-sky-300'
                          : 'text-[#D9BC8B]'
                      }`}
                    >
                      {line.prefix}
                    </span>

                    {/* Content text with inline color rules */}
                    <span
                      className={
                        line.type === 'prompt'
                          ? 'text-white font-medium break-all'
                          : line.type === 'ok'
                          ? 'text-emerald-300'
                          : line.type === 'info'
                          ? 'text-sky-200/90'
                          : 'text-[#C7CCE0]'
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}

                {/* Animated cursor line */}
                <div className="flex items-center gap-2 pt-1 text-[#6C7284]">
                  <span className="text-[#38BDF8]">$</span>
                  <span className="inline-block w-2 h-4 bg-[#D9BC8B] animate-pulse" />
                </div>
              </div>

              {/* Status footer bar inside terminal */}
              <div className="pt-4 mt-6 border-t border-[#1E2330] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#7A8299] font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-semibold">VERIFIED PASS</span>
                  <span className="text-[#4E566E]">·</span>
                  <span>Exit 0</span>
                </div>

                {onSelectServiceForScope && currentScenario.targetService && (
                  <button
                    onClick={() => onSelectServiceForScope(currentScenario.targetService!)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#E0A868] hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>Scope this architecture</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: 4-Phase Engineering Spine & Interactive Inspector */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-[#DADEE6] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#A8763A]/10 text-[#A8763A] flex items-center justify-center font-mono font-bold text-xs">
                    04
                  </div>
                  <h3 className="font-serif text-2xl text-[#14161D] font-normal">
                    Every build, the same spine
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#A8763A] bg-[#A8763A]/10 border border-[#A8763A]/20 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
                  2 - 8 Weeks Target Sprint
                </span>
              </div>

              <p className="text-sm text-[#4A5060] mb-6 leading-relaxed">
                Whether engineering an autonomous support agent or scaling multi-account Meta ad creative engines, our process guarantees total transparency at every sprint.
              </p>

              {/* 4-Stage Stepper Buttons with Connected Visual Track */}
              <div className="relative mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PIPELINE_STAGES.map((stage) => {
                    const isCurrent = stage.id === activeStageId;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setActiveStageId(stage.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative ${
                          isCurrent
                            ? 'bg-[#F4F6F9] border-[#A8763A] shadow-xs ring-1 ring-[#A8763A]'
                            : 'bg-white border-[#DADEE6] hover:bg-[#F8F9FA] hover:border-[#C5CAD5]'
                        }`}
                      >
                        {isCurrent && (
                          <motion.div
                            layoutId="activePhasePill"
                            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#A8763A] ring-2 ring-white"
                          />
                        )}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-mono text-[#A8763A] font-bold">
                            PHASE {stage.stepNum}
                          </span>
                          <span className={isCurrent ? 'text-[#A8763A]' : 'text-[#8C93A4]'}>
                            {getStageIcon(stage.id)}
                          </span>
                        </div>
                        <div className="text-sm font-serif font-medium text-[#14161D] leading-tight mb-0.5">
                          {stage.name}
                        </div>
                        <div className="text-[11px] text-[#7B8194] font-mono">
                          {stage.timeline}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Stage Deep-Dive Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#FAFBFD] border border-[#DADEE6] rounded-xl p-5 shadow-xs"
                >
                  {/* Stage Headline */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E2E6ED]">
                    <div>
                      <span className="text-[11px] font-mono text-[#A8763A] uppercase tracking-wider font-bold">
                        Phase {activeStage.stepNum} Focus · {activeStage.timeline}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-[#14161D] font-medium leading-snug">
                        {activeStage.coreDeliverable}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-[#4A5060] mb-4 leading-relaxed">
                    {activeStage.summary}
                  </p>

                  {/* Inspector View Tabs */}
                  <div className="flex items-center gap-1 p-1 bg-[#EEF0F4] rounded-lg mb-4 border border-[#DADEE6]/70">
                    <button
                      onClick={() => setInspectorTab('artifacts')}
                      className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-md transition-all cursor-pointer font-medium ${
                        inspectorTab === 'artifacts'
                          ? 'bg-white text-[#14161D] shadow-2xs font-semibold'
                          : 'text-[#6C7284] hover:text-[#14161D]'
                      }`}
                    >
                      Concrete Artifacts ({activeStage.keyArtifacts.length})
                    </button>
                    <button
                      onClick={() => setInspectorTab('gates')}
                      className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-md transition-all cursor-pointer font-medium ${
                        inspectorTab === 'gates'
                          ? 'bg-white text-[#14161D] shadow-2xs font-semibold'
                          : 'text-[#6C7284] hover:text-[#14161D]'
                      }`}
                    >
                      Quality Gates ({activeStage.testGates?.length || 3})
                    </button>
                    <button
                      onClick={() => setInspectorTab('milestones')}
                      className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-md transition-all cursor-pointer font-medium ${
                        inspectorTab === 'milestones'
                          ? 'bg-white text-[#14161D] shadow-2xs font-semibold'
                          : 'text-[#6C7284] hover:text-[#14161D]'
                      }`}
                    >
                      Milestones
                    </button>
                  </div>

                  {/* Tab 1: Artifacts */}
                  {inspectorTab === 'artifacts' && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#7B8194] font-semibold flex items-center gap-1.5 mb-2">
                        <FileCode className="w-3.5 h-3.5 text-[#A8763A]" />
                        <span>Tangible Assets Delivered to Client</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeStage.keyArtifacts.map((artifact, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2 rounded-lg bg-white border border-[#E2E6ED] text-xs text-[#14161D]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{artifact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Quality Gates */}
                  {inspectorTab === 'gates' && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#7B8194] font-semibold flex items-center gap-1.5 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Automated Verification &amp; Security Gates</span>
                      </div>
                      <div className="space-y-2">
                        {activeStage.testGates?.map((gate, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E6ED] text-xs"
                          >
                            <span className="font-medium text-[#14161D] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span>{gate.name}</span>
                            </span>
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                              {gate.metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Milestones */}
                  {inspectorTab === 'milestones' && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#7B8194] font-semibold flex items-center gap-1.5 mb-2">
                        <Clock className="w-3.5 h-3.5 text-[#A8763A]" />
                        <span>Sprint Day-by-Day Cadence</span>
                      </div>
                      <div className="space-y-1.5">
                        {activeStage.sprintMilestones?.map((m, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2 rounded-lg bg-white border border-[#E2E6ED] text-xs text-[#3A4050]"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A8763A] mt-1.5 shrink-0" />
                            <span className="leading-relaxed font-mono">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enforced Guardrails pill footer */}
                  <div className="mt-4 pt-3 border-t border-[#E2E6ED] flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#7B8194] font-semibold flex items-center gap-1 mr-1">
                      <ShieldAlert className="w-3 h-3 text-[#A8763A]" />
                      <span>Guardrails:</span>
                    </span>
                    {activeStage.guardrails.map((g, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#DADEE6] text-[#4A5060] font-mono"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Client Guarantee Strip */}
            <div className="mt-6 pt-4 border-t border-[#DADEE6] flex flex-wrap items-center justify-between gap-3 text-xs text-[#7B8194] font-mono">
              <span className="flex items-center gap-1.5 text-[#14161D]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero black boxes: direct lead access</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#14161D]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deploy previews every 48h</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#14161D]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% IP Handover</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
