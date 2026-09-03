import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in milliseconds
  direction?: 'up' | 'none';
  threshold?: number;
  rootMargin?: string;
  id?: string;
  as?: 'div' | 'section' | 'article';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
  rootMargin = '0px 0px -50px 0px',
  id,
  as: Component = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver isn't available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const animationClasses =
    direction === 'up'
      ? isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-6'
      : isVisible
      ? 'opacity-100'
      : 'opacity-0';

  return (
    <Component
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity] ${animationClasses} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
};
