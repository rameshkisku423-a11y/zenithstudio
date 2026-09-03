import React from 'react';
import {
  Video,
  Film,
  Clapperboard,
  Target,
  MousePointerClick,
  Sparkles,
  Palette,
  TrendingUp,
  Share2,
  Bot,
  Brain,
  Cpu,
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
  Code2,
  Database,
  Server,
  Container,
  CreditCard,
  Search,
  LineChart,
  Boxes,
  Terminal,
  Workflow,
  FileCode,
  Zap,
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServiceIconProps {
  iconName: string;
  category?: ServiceCategory;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  iconName,
  category,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4 stroke-[1.8]',
    md: 'w-5 h-5 stroke-[1.8]',
    lg: 'w-6 h-6 stroke-[1.8]',
    xl: 'w-8 h-8 stroke-[1.8]',
  };

  const iconProps = {
    className: `${sizeMap[size]} transition-transform duration-300 ${className}`,
  };

  switch (iconName) {
    case 'Video':
    case 'Clapperboard':
      return <Clapperboard {...iconProps} />;
    case 'Film':
      return <Film {...iconProps} />;
    case 'Target':
      return <Target {...iconProps} />;
    case 'MousePointerClick':
      return <MousePointerClick {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Palette':
      return <Palette {...iconProps} />;
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />;
    case 'Share2':
      return <Share2 {...iconProps} />;
    case 'Bot':
      return <Bot {...iconProps} />;
    case 'Brain':
      return <Brain {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'Layout':
    case 'Code2':
      return <Code2 {...iconProps} />;
    case 'Smartphone':
      return <Smartphone {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'PenTool':
      return <PenTool {...iconProps} />;
    case 'Network':
      return <Network {...iconProps} />;
    case 'MessageSquare':
      return <MessageSquare {...iconProps} />;
    case 'BarChart3':
      return <BarChart3 {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'ShoppingBag':
      return <ShoppingBag {...iconProps} />;
    case 'Building2':
      return <Building2 {...iconProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

/**
 * Returns a matching Lucide icon for common tech stack and tool names
 */
export const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  const props = { className: 'w-3 h-3 stroke-[2] shrink-0' };

  if (t.includes('premiere') || t.includes('davinci') || t.includes('capcut') || t.includes('video') || t.includes('frame.io')) {
    return <Film {...props} />;
  }
  if (t.includes('after effects') || t.includes('motion') || t.includes('sparkle')) {
    return <Sparkles {...props} />;
  }
  if (t.includes('blender') || t.includes('unreal') || t.includes('cinema 4d') || t.includes('octane') || t.includes('cad')) {
    return <Boxes {...props} />;
  }
  if (t.includes('meta') || t.includes('facebook') || t.includes('instagram') || t.includes('capi') || t.includes('target')) {
    return <Target {...props} />;
  }
  if (t.includes('google ads') || t.includes('optmyzr') || t.includes('ppc') || t.includes('search')) {
    return <Search {...props} />;
  }
  if (t.includes('ga4') || t.includes('looker') || t.includes('analytics') || t.includes('semrush') || t.includes('ahrefs') || t.includes('triple whale') || t.includes('metricool')) {
    return <LineChart {...props} />;
  }
  if (t.includes('react') || t.includes('next.js') || t.includes('vue') || t.includes('vite') || t.includes('web')) {
    return <Code2 {...props} />;
  }
  if (t.includes('python') || t.includes('typescript') || t.includes('javascript') || t.includes('node') || t.includes('go') || t.includes('fastapi') || t.includes('swift') || t.includes('kotlin')) {
    return <Terminal {...props} />;
  }
  if (t.includes('claude') || t.includes('openai') || t.includes('gemini') || t.includes('langgraph') || t.includes('langchain') || t.includes('ai') || t.includes('bot')) {
    return <Brain {...props} />;
  }
  if (t.includes('postgres') || t.includes('sql') || t.includes('redis') || t.includes('pinecone') || t.includes('pgvector') || t.includes('database') || t.includes('clickhouse') || t.includes('duckdb')) {
    return <Database {...props} />;
  }
  if (t.includes('docker') || t.includes('kubernetes') || t.includes('container') || t.includes('ecs')) {
    return <Container {...props} />;
  }
  if (t.includes('aws') || t.includes('gcp') || t.includes('cloud') || t.includes('terraform')) {
    return <Cloud {...props} />;
  }
  if (t.includes('shopify') || t.includes('stripe') || t.includes('ecommerce') || t.includes('storefront')) {
    return <ShoppingBag {...props} />;
  }
  if (t.includes('figma') || t.includes('design') || t.includes('illustrator') || t.includes('photoshop') || t.includes('storybook')) {
    return <PenTool {...props} />;
  }
  if (t.includes('zapier') || t.includes('webhook') || t.includes('api') || t.includes('kafka') || t.includes('actions') || t.includes('ci/cd')) {
    return <Workflow {...props} />;
  }
  if (t.includes('mobile') || t.includes('expo') || t.includes('ios') || t.includes('android')) {
    return <Smartphone {...props} />;
  }

  return <Zap {...props} />;
};

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ tech, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4F6F8] text-[#4A5060] border border-[#DADEE6] hover:border-[#A8763A]/40 transition-colors ${className}`}
    >
      <span className="text-[#A8763A]">{getTechIcon(tech)}</span>
      <span className="truncate max-w-[130px]">{tech}</span>
    </span>
  );
};
