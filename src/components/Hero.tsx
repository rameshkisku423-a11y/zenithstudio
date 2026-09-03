import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Terminal, ShieldCheck, Zap, Code2 } from 'lucide-react';
import { ZenithLogo } from './ZenithLogo';

interface HeroProps {
  onOpenScopeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenScopeModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(true);

  // Performance-optimized Neural Network canvas:
  // 1. Pauses completely when scrolled out of viewport
  // 2. Pre-calculated colors without per-frame garbage collection
  // 3. Modulated node count for smooth 60fps on mobile & laptop
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Node configuration
    const nodeCount = Math.min(42, Math.floor((width * height) / 28000) + 12);
    const nodeColors = ['#67E8F9', '#A78BFA', '#C084FC', '#5EEAD4'];

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 1.2,
      color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
    }));

    // Data pulse packets traveling along synapses
    interface Pulse {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }

    const spawnPulse = (): Pulse => {
      const fromIndex = Math.floor(Math.random() * nodes.length);
      let toIndex = Math.floor(Math.random() * nodes.length);
      if (toIndex === fromIndex) toIndex = (toIndex + 1) % nodes.length;
      return {
        fromIndex,
        toIndex,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
      };
    };

    const pulses: Pulse[] = Array.from({ length: 5 }, spawnPulse);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw synapse connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = 0.18 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      // Draw traveling signal pulses
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        const a = nodes[pulse.fromIndex];
        const b = nodes[pulse.toIndex];
        if (a && b) {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const px = a.x + (b.x - a.x) * pulse.progress;
            const py = a.y + (b.y - a.y) * pulse.progress;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#E0F2FE';
            ctx.fill();
          }
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1 || dist >= 220) {
            Object.assign(pulse, spawnPulse());
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-radial from-[#1B1642] via-[#0B0B24] to-[#06060F] text-white pt-24 sm:pt-32 pb-20 md:pb-28"
    >
      {/* Visual Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        aria-hidden="true"
      />

      {/* Dark gradient mask for optimal text contrast */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#06060F]/90 via-[#06060F]/65 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          {/* Official Zenith Studio Brand Emblem matching uploaded asset */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
            <ZenithLogo variant="hero" theme="dark" showGlow={true} />
            <div className="hidden sm:block h-8 w-[1px] bg-white/20" />
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#CFD3EB] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#67E8F9] animate-pulse" />
              <span className="font-mono">AI Systems &amp; Autonomous Software</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F5F3FF] mb-6">
            Software and AI systems, engineered to their{' '}
            <span className="italic font-light bg-gradient-to-r from-[#67E8F9] via-[#A78BFA] to-[#C084FC] bg-clip-text text-transparent">
              zenith
            </span>
            .
          </h1>

          {/* Lede Paragraph */}
          <p className="text-lg sm:text-xl text-[#CFD3EB]/85 font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
            We design, build, and deploy production-grade AI agents, custom web &amp; mobile applications, and resilient automation pipelines for teams who need dependable software in production — not fragile proof-of-concept demos.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-14">
            <button
              onClick={onOpenScopeModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#A8763A] hover:bg-[#C79554] text-[#201206] font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Start a project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#how-we-build"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#E1E3F5]/80 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#67E8F9]" />
              <span>See how we build</span>
            </a>
          </div>

          {/* Architectural Guarantees Pill Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#67E8F9] shrink-0" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">Determinism</div>
                <div className="text-sm font-medium text-white">99.8% Schema Accuracy</div>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/5 border border-white/10">
              <Zap className="w-5 h-5 text-[#FBBF24] shrink-0" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">Velocity</div>
                <div className="text-sm font-medium text-white">11-Day Pilot Delivery</div>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/5 border border-white/10">
              <Code2 className="w-5 h-5 text-[#34D399] shrink-0" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">IP Ownership</div>
                <div className="text-sm font-medium text-white">100% Code Handover</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
