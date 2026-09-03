export type ServiceCategory =
  | 'all'
  | 'creative-media'
  | 'growth-marketing'
  | 'ai-agents'
  | 'software-apps'
  | 'cloud-systems';

export interface ServiceItem {
  id: string;
  category: 'ai-agents' | 'software-apps' | 'cloud-systems' | 'creative-media' | 'growth-marketing';
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  iconName: string;
  badge?: string;
  highlightStat?: string;
  popular?: boolean;
}

export interface PipelineStage {
  id: string;
  stepNum: string;
  name: string;
  summary: string;
  timeline: string;
  coreDeliverable: string;
  keyArtifacts: string[];
  guardrails: string[];
  sprintMilestones?: string[];
  testGates?: { name: string; status: 'passed' | 'active'; metric: string }[];
  clientBenefit?: string;
}

export interface CaseStudy {
  id: string;
  statValue: string;
  statSuffix: string;
  statLabel: string;
  title: string;
  domain: string;
  summary: string;
  problem: string;
  solution: string;
  impactMetrics: string[];
  techUsed: string[];
}

export interface TerminalLine {
  type: 'prompt' | 'arrow' | 'ok' | 'info' | 'warn';
  prefix: string;
  text: string;
  timestamp?: string;
}

export interface TerminalScenario {
  id: string;
  name: string;
  badge: string;
  targetService?: string;
  commandSnippet?: string;
  duration?: string;
  telemetry?: {
    cpu: string;
    ram: string;
    network: string;
    latency: string;
  };
  lines: TerminalLine[];
}

export interface ProjectScopeSubmission {
  projectType: string;
  timeline: string;
  budgetRange: string;
  integrations: string[];
  clientName: string;
  clientEmail: string;
  description: string;
}
