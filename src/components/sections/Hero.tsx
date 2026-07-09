'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useStore } from '@/stores/useStore';
import SceneErrorBoundary from '@/components/three/SceneErrorBoundary';
import { EASE_OUT } from '@/lib/gsap-config';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 40% 40%, rgba(0,240,255,0.08), transparent 60%), var(--color-bg)',
      }}
    />
  ),
});

function splitChars(text: string) {
  return text.split('').map((c, i) => (
    <span
      key={i}
      className="inline-block char"
      style={{ whiteSpace: c === ' ' ? 'pre' : 'normal' }}
    >
      {c === ' ' ? ' ' : c}
    </span>
  ));
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const isLoaded = useStore((s) => s.isLoaded);

  useEffect(() => {
    if (!isLoaded || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([labelRef.current, subtitleRef.current, indicatorRef.current], { opacity: 0 });
      gsap.set('.char', { opacity: 0, yPercent: 100 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT }, 0)
        .fromTo(
          labelRef.current,
          { y: 20 },
          { y: 0, duration: 0.6, ease: EASE_OUT },
          0,
        )
        .to(
          '.char',
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.5,
            stagger: 0.028,
            ease: 'power3.out',
          },
          0.15,
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT },
          '>-0.2',
        )
        .fromTo(
          subtitleRef.current,
          { y: 15 },
          { y: 0, duration: 0.7, ease: EASE_OUT },
          '<',
        )
        .to(indicatorRef.current, { opacity: 1, duration: 0.6 }, '>-0.1');
    }, rootRef);
    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden"
      id="hero"
    >
      <SceneErrorBoundary>
        <HeroScene />
      </SceneErrorBoundary>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'overlay',
          opacity: 0.5,
        }}
      />

      {/* Speed lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-[40vw] h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.35), transparent)',
              top: `${15 + i * 18}%`,
              left: `-20%`,
              transform: 'rotate(45deg)',
              animation: `speedline-drift ${8 + i * 1.5}s linear ${i * 1.2}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div
          ref={labelRef}
          className="mb-6 font-medium uppercase"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.28em',
            color: 'var(--color-accent-cyan)',
          }}
        >
          How Award-Winning Websites Are Really Built
        </div>

        <h1
          ref={headlineRef}
          className="font-bold"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}
        >
          <span className="block overflow-hidden">{splitChars('The Real Stack')}</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 max-w-lg"
          style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          3D scenes · Scroll-driven storytelling · Cinematic intros
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'scroll-pulse 2s ease-in-out infinite' }}
      >
        <span
          className="text-[0.65rem]"
          style={{ letterSpacing: '0.3em', color: 'var(--color-text-muted)' }}
        >
          SCROLL
        </span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <path
            d="M7 2v14M2 11l5 5 5-5"
            stroke="var(--color-text-muted)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Blend to next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
      />
    </section>
  );
}
