import { ServiceItem, PipelineStage, CaseStudy, TerminalScenario } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'video-editing',
    category: 'creative-media',
    title: 'High-Impact Video Editing',
    shortDesc: 'Retention-optimized commercial video editing, viral YouTube long-form, and dynamic social reels/shorts.',
    fullDesc: 'From raw 4K footage to viral retention-optimized hooks, rhythmic sound design, custom color grading in DaVinci Resolve, dynamic kinetic typography, and 60fps motion graphics tailored for maximum watch time.',
    deliverables: [
      'High-retention Reels, TikToks & YouTube Shorts (9:16)',
      'Long-form YouTube / Podcast master edits with chaptering',
      'Custom kinetic typography & sound design Foley mixing',
      'Advanced color grading & film emulation LUT mastering',
      'Multi-platform export presets (16:9, 9:16, 1:1, 4:5)'
    ],
    techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve Studio', 'CapCut Pro', 'Blender'],
    timeline: '2 - 5 days / sprint',
    iconName: 'Video',
    badge: 'High Demand',
    highlightStat: '10M+ Organic Views Generated',
    popular: true,
  },
  {
    id: 'meta-ads',
    category: 'growth-marketing',
    title: 'Meta Ads (Facebook & Instagram)',
    shortDesc: 'Full-funnel Meta advertising campaigns architected to scale ROAS and acquire profitable customers.',
    fullDesc: 'Data-driven Facebook & Instagram media buying. We combine high-converting direct-response UGC creative variants, Conversions API (CAPI) server-side tracking, algorithmic audience scaling, and relentless A/B testing to generate predictable revenue.',
    deliverables: [
      'High-converting ad creative briefs & video variants',
      'Meta Conversions API (CAPI) server-side tracking setup',
      'Broad & lookalike scaling audience architectures',
      'Daily real-time ROAS dashboard & budget pacing alerts',
      'Landing page CRO & rapid hook testing sprints'
    ],
    techStack: ['Meta Ads Manager', 'Conversions API', 'Triple Whale', 'Figma', 'Shopify', 'Zapier'],
    timeline: 'Weekly execution sprints',
    iconName: 'Target',
    badge: 'Proven ROI',
    highlightStat: '4.8x Average Blended ROAS',
    popular: true,
  },
  {
    id: 'google-ads',
    category: 'growth-marketing',
    title: 'Google Ads & Search Intent PPC',
    shortDesc: 'High-intent Search, Performance Max, and YouTube Ads targeting buyers at the exact moment of intent.',
    fullDesc: 'Capture high-intent commercial queries with laser precision. Deep negative keyword harvesting, landing page conversion synchronization, and automated smart bidding calibrated for maximum pipeline revenue and lowest CPA.',
    deliverables: [
      'High-intent Search & Performance Max campaign buildout',
      'Negative keyword pruning matrices & search term harvesting',
      'High-converting custom landing pages & A/B testing',
      'GA4 offline conversion tracking & value-based bidding'
    ],
    techStack: ['Google Ads', 'Google Tag Manager', 'GA4', 'Looker Studio', 'Optmyzr'],
    timeline: '1 - 2 weeks launch',
    iconName: 'MousePointerClick',
    badge: 'Conversion',
    highlightStat: '68% Lower Cost-Per-Lead',
  },
  {
    id: 'motion-3d',
    category: 'creative-media',
    title: '3D Motion Graphics & CGI',
    shortDesc: 'Hyper-realistic 3D product animations, particle simulations, and explainer films that elevate brand prestige.',
    fullDesc: 'Photorealistic 3D rendering and dynamic cinematic camera choreography. Ideal for hardware products, mobile apps, cosmetic packaging, and futuristic SaaS reveals that demand instant attention.',
    deliverables: [
      '3D CAD / asset modeling, texturing & lighting',
      'Physics fluid simulations & explosive disassembly renders',
      'Cinematic 4K 60FPS product render passes',
      'Modular social cutdowns & transparent alpha video loops'
    ],
    techStack: ['Blender', 'Unreal Engine 5', 'Cinema 4D', 'Octane / Redshift', 'After Effects'],
    timeline: '2 - 4 weeks',
    iconName: 'Sparkles',
    badge: 'Visual Edge',
    highlightStat: '4K 60FPS Cinema Grade',
  },
  {
    id: 'brand-identity',
    category: 'creative-media',
    title: 'Brand Identity & Visual Systems',
    shortDesc: 'Distinctive brand monograms, bespoke typography palettes, and visual design languages that stand apart.',
    fullDesc: 'We establish timeless, authoritative visual identities. From vector glyphs and monogram marks to comprehensive brand guidelines, pitch deck systems, physical packaging, and digital design token ecosystems.',
    deliverables: [
      'Master vector logo system (primary, secondary & badge marks)',
      'Comprehensive brand guideline manual & color psychology',
      'Typography pairing rules & design token exports',
      'Social media launch kit, stationery & presentation decks'
    ],
    techStack: ['Illustrator', 'Figma', 'Photoshop', 'InDesign'],
    timeline: '2 - 3 weeks',
    iconName: 'Palette',
    badge: 'Bespoke',
    highlightStat: '100% Bespoke Vectors',
  },
  {
    id: 'seo-growth',
    category: 'growth-marketing',
    title: 'Technical SEO & Content Growth',
    shortDesc: 'Programmatic SEO architectures, technical Core Web Vitals optimization, and authoritative rank acquisition.',
    fullDesc: 'Rank on high-value organic queries. We build programmatic directory engines, semantic content clusters, automated schema markups, and internal link networks that search crawlers reward with top Google placements.',
    deliverables: [
      'Technical site health audit & zero-layout-shift speed fixes',
      'Programmatic SEO schema & dynamic sitemap generation',
      'Commercial keyword revenue mapping & content briefs',
      'High-authority backlink outreach & editorial strategy'
    ],
    techStack: ['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'Next.js SEO'],
    timeline: '3 - 6 months compound',
    iconName: 'TrendingUp',
    badge: 'Compounding',
    highlightStat: '340% Organic Traffic Lift',
  },
  {
    id: 'social-content',
    category: 'creative-media',
    title: 'Social Media & Viral Content Engine',
    shortDesc: 'Turn passive scrollers into customers with strategic short-form content and narrative storytelling.',
    fullDesc: 'End-to-end content production pipeline: psychological retention hooks, trend research, rapid editing workflows, and scheduled multi-platform syndication across TikTok, Instagram, YouTube, and LinkedIn.',
    deliverables: [
      'Monthly batch content calendar (30+ curated assets)',
      'Psychological hooks, copywriting & script blueprints',
      'Multi-platform aspect-ratio cutdowns & caption hooks',
      'Community engagement monitoring & monthly analytics reviews'
    ],
    techStack: ['Notion', 'Frame.io', 'CapCut Pro', 'Metricool', 'Canva'],
    timeline: 'Monthly sprint cadence',
    iconName: 'Share2',
    badge: 'Viral Engine',
    highlightStat: '3.4x Higher Engagement',
  },
  {
    id: 'ai-agents',
    category: 'ai-agents',
    title: 'AI Agents & Automation',
    shortDesc: 'Task-specific autonomous agents that read, decide, and act inside your existing enterprise tools.',
    fullDesc: 'We build production-grade agentic workflows with strict deterministic fallbacks, schema-enforced tool calling, and human-in-the-loop review queues.',
    deliverables: ['Custom tool calling harnesses', 'Multi-tenant session memory', 'Hallucination & prompt-injection guardrails', 'Evaluation benchmark suite'],
    techStack: ['Python', 'LangGraph / LangChain', 'Claude 3.5 Sonnet', 'Gemini 2.5 Pro', 'OpenAI', 'Redis'],
    timeline: '3 - 6 weeks',
    iconName: 'Bot',
    badge: 'Popular'
  },
  {
    id: 'web-dev',
    category: 'software-apps',
    title: 'Web Development',
    shortDesc: 'Marketing sites to complex full-stack web applications, engineered for sub-second page loads.',
    fullDesc: 'From high-conversion editorial brand portals to complex data-dense SaaS dashboards with accessible UI, zero layout shift, and clean codebases.',
    deliverables: ['Responsive design architecture', 'SSR / SSG performance setup', 'Design token design system', 'Comprehensive e2e test suite'],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'PostgreSQL'],
    timeline: '3 - 8 weeks',
    iconName: 'Layout',
    badge: 'Core'
  },
  {
    id: 'mobile-dev',
    category: 'software-apps',
    title: 'Mobile App Development',
    shortDesc: 'Native and cross-platform applications for iOS and Android that ship smoothly on schedule.',
    fullDesc: 'Performant, offline-capable mobile apps with native biometrics, smooth 120fps gesture transitions, and automated TestFlight / Google Play pipelines.',
    deliverables: ['iOS & Android production builds', 'Offline-first synchronization layer', 'Push notification pipelines', 'App Store review compliance'],
    techStack: ['React Native', 'Swift', 'Kotlin', 'Expo', 'SQLite', 'Fastlane'],
    timeline: '5 - 10 weeks',
    iconName: 'Smartphone'
  },
  {
    id: 'custom-saas',
    category: 'software-apps',
    title: 'Custom Software & SaaS',
    shortDesc: 'Full product builds from database architecture to deployment, owned end-to-end.',
    fullDesc: 'Greenfield product engineering or legacy modernization. We architect multi-tenant SaaS foundations with role-based access control, subscriptions, and audit trails.',
    deliverables: ['Multi-tenant database schema', 'Stripe billing & meter integration', 'Audit logging & telemetry', 'Full CI/CD pipeline'],
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Stripe API', 'Prisma / Drizzle'],
    timeline: '6 - 12 weeks',
    iconName: 'Layers',
    badge: 'High Impact'
  },
  {
    id: 'ui-ux',
    category: 'software-apps',
    title: 'UI/UX Design Systems',
    shortDesc: 'Interfaces designed around how people actually work, not how systems are mechanically structured.',
    fullDesc: 'Deliberate design systems with mathematical typography scales, WCAG AAA accessibility, tight visual hierarchy, and interactive prototypes.',
    deliverables: ['Figma design token libraries', 'Component inventory & states', 'User flow wireframes & specs', 'Interactive clickable prototype'],
    techStack: ['Figma', 'Storybook', 'Tailwind CSS', 'Design Tokens'],
    timeline: '2 - 4 weeks',
    iconName: 'PenTool'
  },
  {
    id: 'api-integrations',
    category: 'cloud-systems',
    title: 'API & Systems Integration',
    shortDesc: 'Connecting your stack — ERPs, payment gateways, internal tools, and third-party webhooks.',
    fullDesc: 'Resilient event-driven middleware with exponential backoff retries, dead-letter queues, idempotent ingestion, and bidirectional syncing.',
    deliverables: ['Event-driven webhook listeners', 'Idempotent ingestion workers', 'Rate limit & retry middleware', 'API documentation & OpenAPI specs'],
    techStack: ['Node.js', 'Go', 'AWS SQS/Lambda', 'Kafka', 'PostgreSQL'],
    timeline: '2 - 5 weeks',
    iconName: 'Network'
  },
  {
    id: 'chatbots-assistants',
    category: 'ai-agents',
    title: 'Chatbots & Virtual Assistants',
    shortDesc: 'Context-aware conversational interfaces for customer support, sales triage, and internal ops.',
    fullDesc: 'RAG-powered conversational bots connected to your proprietary knowledge base with semantic vector search, source citation, and CRM logging.',
    deliverables: ['Semantic chunking & vector indexing', 'Source-cited answer synthesis', 'CRM & ticketing escalation bridge', 'Confidence scoring fallbacks'],
    techStack: ['Pinecone', 'pgvector', 'LangChain', 'FastAPI', 'Claude', 'OpenAI'],
    timeline: '3 - 6 weeks',
    iconName: 'MessageSquare'
  },
  {
    id: 'analytics-dashboards',
    category: 'cloud-systems',
    title: 'Data Analytics & Dashboards',
    shortDesc: 'Turning raw event streams and databases into actionable dashboards teams actually check daily.',
    fullDesc: 'Interactive business intelligence portals with instant aggregation queries, real-time KPI charting, and scheduled digest automation.',
    deliverables: ['Data warehouse ELT pipelines', 'Interactive charting components', 'Exportable executive PDF digests', 'Granular team permissions'],
    techStack: ['ClickHouse', 'PostgreSQL', 'DuckDB', 'D3.js', 'Recharts'],
    timeline: '3 - 6 weeks',
    iconName: 'BarChart3'
  },
  {
    id: 'cloud-devops',
    category: 'cloud-systems',
    title: 'Cloud Architecture & DevOps',
    shortDesc: 'Zero-downtime infrastructure, CI/CD, and deployment pipelines that do not break at 2 AM.',
    fullDesc: 'Infrastructure as Code, container orchestration, blue-green zero-downtime deployments, and end-to-end telemetry with alerting.',
    deliverables: ['Terraform IaC blueprints', 'GitHub Actions / GitLab CI', 'Kubernetes / ECS manifests', 'Prometheus & Grafana alerts'],
    techStack: ['Terraform', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions'],
    timeline: '2 - 6 weeks',
    iconName: 'Cloud',
    badge: 'Reliability'
  },
  {
    id: 'ecommerce',
    category: 'software-apps',
    title: 'E-commerce Solutions',
    shortDesc: 'High-converting storefronts, frictionless checkout flows, and synchronized inventory engines.',
    fullDesc: 'Headless storefront architectures optimized for Core Web Vitals, dynamic catalog filtering, multi-currency support, and payment routing.',
    deliverables: ['Headless shop frontend', 'Inventory & warehouse sync hooks', 'Optimized single-page checkout', 'Conversion funnel analytics'],
    techStack: ['Shopify Storefront API', 'Next.js', 'Stripe Elements', 'Algolia'],
    timeline: '4 - 8 weeks',
    iconName: 'ShoppingBag'
  },
  {
    id: 'crm-erp',
    category: 'software-apps',
    title: 'Custom CRM / ERP Systems',
    shortDesc: 'Bespoke internal operational tools tailored to how your business actually runs day-to-day.',
    fullDesc: 'Replace sprawling spreadsheets with unified, permission-controlled business operating systems with role authorization and audit history.',
    deliverables: ['Custom relational record model', 'Workflow state machine engine', 'CSV/Excel batch importer', 'Field-level access security'],
    techStack: ['TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Node.js', 'Prisma'],
    timeline: '6 - 12 weeks',
    iconName: 'Building2'
  },
  {
    id: 'maintenance-support',
    category: 'cloud-systems',
    title: 'SLA Maintenance & Support',
    shortDesc: 'Continuous uptime monitoring, prompt-drift calibration, and proactive iteration post-launch.',
    fullDesc: 'Dedicated monthly engineering retainers providing 24/7 incident response, model evaluation updates, security patches, and roadmap velocity.',
    deliverables: ['Guaranteed SLA response times', 'Monthly model evaluation report', 'Dependency & security patching', 'Priority feature sprint hours'],
    techStack: ['OpenTelemetry', 'Datadog', 'Sentry', 'PagerDuty'],
    timeline: 'Ongoing retainer',
    iconName: 'ShieldCheck'
  }
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'discover',
    stepNum: '01',
    name: 'Discover',
    summary: 'Shadow real workflows to isolate where time, accuracy, and revenue are leaked before writing a line of code.',
    timeline: 'Week 1',
    coreDeliverable: 'Technical Specification & Feasibility Blueprint',
    clientBenefit: 'Eliminates scope creep and guarantees every dollar is focused on measurable revenue impact.',
    sprintMilestones: [
      'Day 1-2: Stakeholder deep-dive & existing stack reverse-engineering',
      'Day 3-4: Workflow bottleneck audit & time-loss heat-mapping',
      'Day 5: PII boundary threat model & signed technical spec delivery'
    ],
    testGates: [
      { name: 'API Latency Baseline', status: 'passed', metric: '< 250ms avg' },
      { name: 'Data Access & Compliance Audit', status: 'passed', metric: '100% Passed' },
      { name: 'Feasibility Score', status: 'passed', metric: '9.8 / 10' }
    ],
    keyArtifacts: [
      'Workflow bottleneck audit & time-loss map',
      'Data availability & API capability matrix',
      'Target SLA & latency budget constraints',
      'Security boundaries & PII threat model document'
    ],
    guardrails: ['No unvetted third-party endpoints', 'Formal PII boundary mapping', 'Cost-per-run projection']
  },
  {
    id: 'design',
    stepNum: '02',
    name: 'Design',
    summary: 'Map end-to-end architecture, database schemas, and defensive fallback states prior to production implementation.',
    timeline: 'Weeks 1 - 2',
    coreDeliverable: 'System Architecture & Deterministic State Machine',
    clientBenefit: 'Clients review interactive Figma prototypes and exact API schemas before build sprint commences.',
    sprintMilestones: [
      'Day 6-8: Relational & vector schema diagrams + migration strategy',
      'Day 9-11: High-fidelity Figma components & interactive design tokens',
      'Day 12-14: Synthetic evaluation benchmark dataset generation'
    ],
    testGates: [
      { name: 'Deterministic State Machine', status: 'passed', metric: '0 dead ends' },
      { name: 'Figma Token Contrast WCAG', status: 'passed', metric: 'AAA (7.2:1)' },
      { name: 'Schema Migration Dry-Run', status: 'passed', metric: 'Verified Clean' }
    ],
    keyArtifacts: [
      'Relational / vector schema definition & ERD',
      'Tool-calling state diagrams & defensive fallback flows',
      'Interactive Figma UI & responsive design system',
      'Synthetic benchmark testing dataset (500+ edge cases)'
    ],
    guardrails: ['Zero unhandled promise states', 'Explicit human-in-the-loop triggers', 'Design tokens mathematically mapped']
  },
  {
    id: 'build',
    stepNum: '03',
    name: 'Build',
    summary: 'Working software from week one, deployed to your private staging environment, verified against real historical data.',
    timeline: 'Weeks 2 - 6',
    coreDeliverable: 'Production-Hardened System & CI/CD Pipeline',
    clientBenefit: 'Preview new commits every 48 hours with transparent burndown tracking on GitHub and staging links.',
    sprintMilestones: [
      'Sprint 1: Core engine / agent scaffold & database seeding',
      'Sprint 2: Third-party integrations (CRM, ERP, payment, cloud)',
      'Sprint 3: High-concurrency load testing & automated failure simulation',
      'Sprint 4: End-to-end user acceptance staging sign-off'
    ],
    testGates: [
      { name: 'TypeScript Strict Typecheck', status: 'passed', metric: '0 Errors' },
      { name: 'Automated Regression Suite', status: 'passed', metric: '100% Pass (142/142)' },
      { name: 'End-to-End Stress Test', status: 'passed', metric: '12,500 req/min' }
    ],
    keyArtifacts: [
      'Deterministic agent harness / full-stack web application',
      'Automated regression & hallucination test suites',
      'Secure containerized Docker runtime with zero root execution',
      'Secret management & least-privilege IAM configuration'
    ],
    guardrails: ['99.9% parse success on structured outputs', 'Zero secret leaks', 'Automated latency budget checks']
  },
  {
    id: 'operate',
    stepNum: '04',
    name: 'Operate',
    summary: 'Continuous telemetry, prompt-drift detection, 24/7 uptime monitoring, and structured knowledge transfer to your team.',
    timeline: 'Week 6+ & Handover',
    coreDeliverable: 'Operational Observability & Team Handover',
    clientBenefit: 'Your internal team receives complete documentation, recorded code walkthroughs, and 14-day hyper-care support.',
    sprintMilestones: [
      'Week 6: Production canary cutover & zero-downtime routing',
      'Week 7: Live telemetry dashboarding & PagerDuty integration',
      'Week 8: 1-on-1 team walkthroughs & full source IP sign-off'
    ],
    testGates: [
      { name: 'Uptime SLA Threshold', status: 'passed', metric: '99.98% Monitored' },
      { name: 'Prompt Drift Anomaly Check', status: 'passed', metric: 'Active Real-Time' },
      { name: 'Recovery Time Objective (RTO)', status: 'passed', metric: '< 60 seconds' }
    ],
    keyArtifacts: [
      'OpenTelemetry distributed tracing dashboards & alert rules',
      'Automated threshold monitors (latency, errors, drift, cost)',
      'Complete runbooks, API contracts & engineering walkthroughs',
      'Self-healing retry queues with exponential backoff'
    ],
    guardrails: ['24/7 automated health monitors', 'One-click rollback procedures', 'Continuous regression scoring']
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'support-triage',
    statValue: '68',
    statSuffix: '%',
    statLabel: 'Direct Ticket Deflection',
    title: 'Autonomous Support Triage & Resolution Agent',
    domain: 'Customer Support · B2B SaaS',
    summary: 'An autonomous agent that reads incoming customer tickets against internal documentation and resolves the routine third without human touch.',
    problem: 'SaaS support engineers were spending 38 hours every week answering repetitive configuration queries, slowing down enterprise response times.',
    solution: 'Engineered a multi-tier RAG agent with schema-constrained tool execution, verifying customer account states before offering precise solutions.',
    impactMetrics: [
      '68% first-contact resolution with zero human intervention',
      'Median response time dropped from 4.2 hours to 18 seconds',
      'Zero hallucinations recorded across 14,000+ customer queries',
      '$180k saved annually in tier-1 support headcount'
    ],
    techUsed: ['Claude 3.5', 'pgvector', 'PostgreSQL', 'FastAPI', 'Zendesk API']
  },
  {
    id: 'invoice-recon',
    statValue: '4.2',
    statSuffix: 'hrs',
    statLabel: 'Reclaimed / Analyst / Wk',
    title: 'High-Volume Invoice & Purchase Order Reconciliation',
    domain: 'Finance Operations · Manufacturing',
    summary: 'Automated extraction and mathematical reconciliation of vendor invoices against purchase orders with intelligent exception routing.',
    problem: '12 corporate accounting analysts manually compared multi-page PDF line items against SAP purchase orders with high error rates.',
    solution: 'Constructed an asynchronous document ingestion pipeline with vision-enhanced OCR, fuzzy line-item matching, and audit-logged discrepancy routing.',
    impactMetrics: [
      '4.2 hours saved per week per analyst',
      '99.8% precision on multi-currency tax rate matches',
      'Reduced payment cycle bottleneck from 9 days to 24 hours',
      'Eliminated duplicate vendor payment payouts entirely'
    ],
    techUsed: ['Python', 'AWS Textract', 'FastAPI', 'Docker', 'SAP RFC', 'PostgreSQL']
  },
  {
    id: 'clinic-scheduler',
    statValue: '11',
    statSuffix: 'days',
    statLabel: 'Kickoff to Live Pilot',
    title: 'Multi-Clinic Patient Scheduling & Intake Agent',
    domain: 'Healthcare · Clinical Operations',
    summary: 'A scheduling agent for a 14-location clinic network, built and validated against three months of historical phone and appointment data.',
    problem: 'High call drop-off rates during peak morning hours resulted in lost patient appointments and overbooked practitioners.',
    solution: 'Designed an omnichannel voice and web conversational engine integrating directly with Epic EHR calendars, observing HIPAA constraints.',
    impactMetrics: [
      'Launched pilot in 11 days with 98.4% booking accuracy',
      '31% reduction in patient no-show rates via smart SMS nudges',
      'Full HIPAA-compliant audit logging on all patient interactions',
      'Staff morning call volume reduced by 52%'
    ],
    techUsed: ['TypeScript', 'Epic FHIR API', 'Gemini 2.5', 'Twilio Voice', 'AWS KMS']
  }
];

export const TERMINAL_SCENARIOS: TerminalScenario[] = [
  {
    id: 'support',
    name: 'AI Agent & LLM Orchestration',
    badge: 'Autonomous Agent',
    targetService: 'AI Agents & Automation',
    commandSnippet: 'zenith init agent --model claude-3.5-sonnet --rag pgvector --latency-budget 450ms',
    duration: '3.8s',
    telemetry: {
      cpu: '21.4%',
      ram: '384 MB',
      network: '1.4 Gbps',
      latency: '28ms'
    },
    lines: [
      { type: 'prompt', prefix: '$ ', text: 'zenith init agent --model claude-3.5-sonnet --rag pgvector --latency-budget 450ms', timestamp: '00:00.12' },
      { type: 'arrow', prefix: '→ ', text: 'indexing knowledge base... 214 enterprise docs parsed into 1,536-dim vector chunks', timestamp: '00:00.85' },
      { type: 'arrow', prefix: '→ ', text: 'attaching security guardrails, PII redaction & prompt injection defensive filters', timestamp: '00:01.42' },
      { type: 'arrow', prefix: '→ ', text: 'executing 40 synthetic boundary tests across multi-step edge cases & fallback routes', timestamp: '00:02.10' },
      { type: 'info', prefix: 'ℹ ', text: 'schema output validator: zero hallucinated keys detected (40/40 passed)', timestamp: '00:02.89' },
      { type: 'ok', prefix: '✓ ', text: 'test suite passed (40/40) — deterministic median latency 312ms [PASS]', timestamp: '00:03.45' },
      { type: 'ok', prefix: '✓ ', text: 'agent online: endpoint active at https://api.zenith.ai/v1/support-agent', timestamp: '00:03.80' }
    ]
  },
  {
    id: 'video-render',
    name: 'Video & Motion Pipeline',
    badge: 'Creative Pipeline',
    targetService: 'High-Impact Video Editing',
    commandSnippet: 'zenith render-farm batch --timeline 4k-hdr --color-grade davinci --nodes 16',
    duration: '5.2s',
    telemetry: {
      cpu: '84.2%',
      ram: '4.8 GB',
      network: '3.2 Gbps',
      latency: '14ms'
    },
    lines: [
      { type: 'prompt', prefix: '$ ', text: 'zenith render-farm batch --timeline 4k-hdr --color-grade davinci --nodes 16', timestamp: '00:00.15' },
      { type: 'arrow', prefix: '→ ', text: 'ingesting 24 raw ProRes 422 HQ multi-camera clips from cloud frame storage', timestamp: '00:00.92' },
      { type: 'arrow', prefix: '→ ', text: 'applying ACEScc color science pipeline & DaVinci Resolve custom look-LUT pass', timestamp: '00:01.88' },
      { type: 'arrow', prefix: '→ ', text: 'generating kinetic typography & 9:16 vertical hook cuts for short-form retention', timestamp: '00:02.75' },
      { type: 'info', prefix: 'ℹ ', text: 'sound design auto-ducking: -14 LUFS broadcast master loudness achieved', timestamp: '00:03.90' },
      { type: 'ok', prefix: '✓ ', text: '16 node render pass complete — 4K 60FPS delivery verified [0 drop frames]', timestamp: '00:04.82' },
      { type: 'ok', prefix: '✓ ', text: 'assets packaged to client review portal: 1x YouTube 4K master, 6x Shorts/Reels', timestamp: '00:05.20' }
    ]
  },
  {
    id: 'meta-capi',
    name: 'Meta Ads & CAPI Engine',
    badge: 'Growth Engine',
    targetService: 'Meta Ads & Scaling',
    commandSnippet: 'zenith capi sync --pixel-id 8492019 --event-quality 9.8/10 --roas-target 4.5x',
    duration: '2.9s',
    telemetry: {
      cpu: '16.8%',
      ram: '256 MB',
      network: '840 Mbps',
      latency: '22ms'
    },
    lines: [
      { type: 'prompt', prefix: '$ ', text: 'zenith capi sync --pixel-id 8492019 --event-quality 9.8/10 --roas-target 4.5x', timestamp: '00:00.08' },
      { type: 'arrow', prefix: '→ ', text: 'connecting server-side Conversions API via AWS Lambda edge worker', timestamp: '00:00.64' },
      { type: 'arrow', prefix: '→ ', text: 'hashing customer telemetry (SHA256) for privacy-first attribution tracking', timestamp: '00:01.18' },
      { type: 'info', prefix: 'ℹ ', text: 'event match quality score: 9.8/10 (exceeds Meta baseline 8.0)', timestamp: '00:01.84' },
      { type: 'arrow', prefix: '→ ', text: 'triggering automated budget reallocation to top 3 winning creative hooks', timestamp: '00:02.32' },
      { type: 'ok', prefix: '✓ ', text: 'attribution sync verified: 100% server-side purchase tracking active', timestamp: '00:02.90' }
    ]
  },
  {
    id: 'saas-deploy',
    name: 'Full-Stack SaaS CI/CD',
    badge: 'Web & Cloud',
    targetService: 'Web Development & SaaS',
    commandSnippet: 'zenith cluster deploy --stack nextjs-postgres --infra terraform --zero-downtime',
    duration: '4.4s',
    telemetry: {
      cpu: '38.5%',
      ram: '640 MB',
      network: '2.1 Gbps',
      latency: '31ms'
    },
    lines: [
      { type: 'prompt', prefix: '$ ', text: 'zenith cluster deploy --stack nextjs-postgres --infra terraform --zero-downtime', timestamp: '00:00.10' },
      { type: 'arrow', prefix: '→ ', text: 'validating Terraform plan: 24 cloud resources planned (ECS, RDS Aurora, Redis, CloudFront)', timestamp: '00:00.95' },
      { type: 'arrow', prefix: '→ ', text: 'executing automated database migration with zero lock contention on table user_sessions', timestamp: '00:01.78' },
      { type: 'arrow', prefix: '→ ', text: 'running TypeScript strict compiler + Vitest unit suite (128 passing tests)', timestamp: '00:02.60' },
      { type: 'info', prefix: 'ℹ ', text: 'Lighthouse CI audit: Performance: 99, Accessibility: 100, Best Practices: 100', timestamp: '00:03.45' },
      { type: 'ok', prefix: '✓ ', text: 'canary traffic shifted 100% — zero 5xx errors recorded over 10,000 test requests', timestamp: '00:04.12' },
      { type: 'ok', prefix: '✓ ', text: 'production deploy live: SSL cert renewed, edge caching active at global CDN', timestamp: '00:04.40' }
    ]
  },
  {
    id: 'finance',
    name: 'Data & ETL Integration',
    badge: 'Automation Pipeline',
    targetService: 'Data & ETL Integration',
    commandSnippet: 'zenith run pipeline --name "invoice-reconcile" --batch 500 --audit-cryptographic',
    duration: '4.1s',
    telemetry: {
      cpu: '45.0%',
      ram: '512 MB',
      network: '1.2 Gbps',
      latency: '19ms'
    },
    lines: [
      { type: 'prompt', prefix: '$ ', text: 'zenith run pipeline --name "invoice-reconcile" --batch 500 --audit-cryptographic', timestamp: '00:00.12' },
      { type: 'arrow', prefix: '→ ', text: 'streaming 500 multi-page vendor PDFs from secure encrypted S3 ingest bucket', timestamp: '00:00.82' },
      { type: 'arrow', prefix: '→ ', text: 'running visual OCR + schema validation on itemized table rows with fuzzy matching', timestamp: '00:01.74' },
      { type: 'arrow', prefix: '→ ', text: 'reconciling line items against SAP ERP purchase order ledgers', timestamp: '00:02.62' },
      { type: 'ok', prefix: '✓ ', text: '488 invoices matched instantly | 12 queued for human review with diff highlights', timestamp: '00:03.48' },
      { type: 'ok', prefix: '✓ ', text: 'batch completed in 4.1s with full cryptographic SHA256 audit trail', timestamp: '00:04.10' }
    ]
  }
];

export const MARQUEE_TECH = [
  'Python', 'TypeScript', 'LangChain', 'Claude 3.5', 'OpenAI', 'Gemini 2.5',
  'AWS', 'PostgreSQL', 'React', 'Next.js', 'Docker', 'Supabase',
  'Redis', 'Kubernetes', 'FastAPI', 'Node.js', 'ClickHouse', 'Tailwind CSS'
];
