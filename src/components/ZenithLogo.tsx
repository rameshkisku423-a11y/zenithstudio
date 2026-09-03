import React from 'react';

export interface ZenithLogoProps {
  variant?: 'mark' | 'full' | 'hero' | 'badge' | 'lockup';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  theme?: 'light' | 'dark';
  className?: string;
  showGlow?: boolean;
}

export const ZenithLogo: React.FC<ZenithLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'light',
  className = '',
  showGlow = false,
}) => {
  const isDark = theme === 'dark';

  // Dimension scaling for the icon mark
  const iconSizeMap = {
    xs: 'w-6 h-6 rounded-md',
    sm: 'w-7 h-7 rounded-md',
    md: 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg',
    lg: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
    hero: 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl',
  };

  // Typography scaling
  const textScaleMap = {
    xs: {
      title: 'text-xs tracking-[0.14em]',
      subtitle: 'text-[8px] tracking-[0.26em]',
    },
    sm: {
      title: 'text-sm tracking-[0.14em]',
      subtitle: 'text-[8.5px] tracking-[0.28em]',
    },
    md: {
      title: 'text-base sm:text-lg tracking-[0.14em]',
      subtitle: 'text-[9px] sm:text-[10px] tracking-[0.32em]',
    },
    lg: {
      title: 'text-lg sm:text-xl tracking-[0.15em]',
      subtitle: 'text-[10px] sm:text-[11px] tracking-[0.34em]',
    },
    hero: {
      title: 'text-xl sm:text-2xl tracking-[0.16em]',
      subtitle: 'text-[10.5px] sm:text-[12px] tracking-[0.36em]',
    },
  };

  // Clean geometric Zenith Mark
  const markElement = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
        iconSizeMap[size]
      } ${
        isDark
          ? 'bg-white/10 border border-white/20 text-white shadow-inner'
          : 'bg-[#14161D] text-white shadow-sm'
      } ${showGlow && isDark ? 'shadow-[0_0_16px_rgba(56,189,248,0.25)]' : ''}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-[62%] h-[62%]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Crisp geometric Z path */}
        <path
          d="M7.5 8.5H24.5L9.5 23.5H24.5"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Summit apex node (warm amber) */}
        <circle cx="24.5" cy="8.5" r="2.2" fill="#A8763A" />
      </svg>
    </div>
  );

  // Standalone Mark
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center ${className}`} title="Zenith Studio">
        {markElement}
      </div>
    );
  }

  // Badge Pill Variant
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full ${
          isDark
            ? 'bg-white/10 border border-white/15 text-white'
            : 'bg-[#EEF0F4] border border-[#DADEE6] text-[#14161D]'
        } backdrop-blur-sm ${className}`}
      >
        {markElement}
        <span className="text-xs font-mono tracking-wider uppercase font-semibold">
          Zenith Studio
        </span>
      </div>
    );
  }

  // Hero Variant (Spacious, prominent lockup)
  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
        {markElement}
        <div className="flex flex-col text-left leading-none">
          <span className="font-sans font-extrabold uppercase text-2xl sm:text-3xl text-white tracking-[0.14em]">
            ZENITH
          </span>
          <span className="font-mono font-medium uppercase text-xs sm:text-sm text-[#A8763A] tracking-[0.38em] mt-1">
            STUDIO
          </span>
        </div>
      </div>
    );
  }

  // Default Full Lockup (Mark + Typography)
  const currentText = textScaleMap[size] || textScaleMap.md;

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {markElement}
      <div className="flex flex-col text-left leading-none">
        <span
          className={`font-sans font-bold uppercase ${currentText.title} ${
            isDark ? 'text-white' : 'text-[#14161D]'
          }`}
        >
          ZENITH
        </span>
        <span
          className={`font-mono font-semibold uppercase ${currentText.subtitle} text-[#A8763A] mt-1`}
        >
          STUDIO
        </span>
      </div>
    </div>
  );
};
