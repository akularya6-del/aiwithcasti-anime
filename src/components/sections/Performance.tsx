'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

const MOBILE_ISSUES = [
  {
    problem: 'Full desktop quality on phones',
    solution: 'Detect device and lower pixel ratio / particle count on mobile',
  },
  {
    problem: 'Large GLTF/GLB files on every device',
    solution: 'Compress with gltf-pipeline or use Draco compression',
  },
  {
    problem: 'Autoplay video without playsinline',
    solution: 'Always add playsinline and muted attributes',
  },
];

const SCROLL_ISSUES = [
  {
    problem: 'Animating top/left/width',
    solution: 'Always animate transform and opacity only',
  },
  {
    problem: 'Too many individual ScrollTriggers',
    solution: 'Batch related animations into one timeline',
  },
  {
    problem: 'Missing will-change',
    solution: 'Add will-change: transform on heavily animated elements',
  },
];

const CHECKLIST = [
  { icon: '⌘', title: 'Lighthouse mobile score' },
  { icon: '⚡', title: 'Core Web Vitals (LCP < 2.5s, CLS ≈ 0)' },
  { icon: '📱', title: 'Real device testing (iPhone SE, mid-range Android)' },
];

export default function Performance() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.perf-item');
      gsap.set(items, { opacity: 0, x: -30 });
      ScrollTrigger.create({
        trigger: '.perf-cols',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          });
        },
      });

      gsap.set('.perf-check', { opacity: 0, scale: 0 });
      ScrollTrigger.create({
        trigger: '.perf-check-row',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to('.perf-check', {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'elastic.out(1, 0.5)',
          });
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full py-32 px-6"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, rgba(139,92,246,0.06), transparent 50%), var(--color-bg)',
      }}
      id="performance"
    >
      {/* Dot grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <div
            className="mb-3"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: 'var(--color-accent-cyan)',
            }}
          >
            08 — PERFORMANCE REALITY CHECK
          </div>
          <TextReveal
            as="h2"
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Where 3D Sites Actually Die
          </TextReveal>
        </div>

        <div className="perf-cols grid md:grid-cols-2 gap-8 mb-16">
          {/* Mobile column */}
          <div>
            <h3
              className="text-sm uppercase mb-4"
              style={{ letterSpacing: '0.2em', color: 'var(--color-accent-magenta)' }}
            >
              Where 3D sites die on mobile
            </h3>
            <div className="space-y-3">
              {MOBILE_ISSUES.map((it, i) => (
                <div
                  key={i}
                  className="perf-item p-5 rounded-lg"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid rgba(255,45,111,0.15)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-1 shrink-0 w-2 h-2 rounded-full"
                      style={{ background: 'var(--color-accent-magenta)', boxShadow: '0 0 10px var(--color-accent-magenta)' }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>
                        {it.problem}
                      </div>
                      <div
                        className="text-sm pl-4 border-l-2"
                        style={{ borderColor: 'var(--color-accent-cyan)', color: 'var(--color-accent-cyan)' }}
                      >
                        → {it.solution}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll column */}
          <div>
            <h3
              className="text-sm uppercase mb-4"
              style={{ letterSpacing: '0.2em', color: 'var(--color-accent-magenta)' }}
            >
              Where scroll animations get janky
            </h3>
            <div className="space-y-3">
              {SCROLL_ISSUES.map((it, i) => (
                <div
                  key={i}
                  className="perf-item p-5 rounded-lg"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid rgba(255,45,111,0.15)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-1 shrink-0 w-2 h-2 rounded-full"
                      style={{ background: 'var(--color-accent-magenta)', boxShadow: '0 0 10px var(--color-accent-magenta)' }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text)' }}>
                        {it.problem}
                      </div>
                      <div
                        className="text-sm pl-4 border-l-2"
                        style={{ borderColor: 'var(--color-accent-cyan)', color: 'var(--color-accent-cyan)' }}
                      >
                        → {it.solution}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ship checklist */}
        <div>
          <h3
            className="text-sm uppercase mb-6 text-center"
            style={{ letterSpacing: '0.25em', color: 'var(--color-text-muted)' }}
          >
            Before you ship, check
          </h3>
          <div className="perf-check-row grid md:grid-cols-3 gap-4">
            {CHECKLIST.map((c, i) => (
              <div
                key={i}
                className="perf-check p-6 rounded-lg text-center"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid rgba(0,240,255,0.2)',
                  boxShadow: '0 0 25px rgba(0,240,255,0.08)',
                }}
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {c.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
