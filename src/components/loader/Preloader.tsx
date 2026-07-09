'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/stores/useStore';

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(true);
  const setLoaded = useStore((s) => s.setLoaded);

  useEffect(() => {
    const start = performance.now();
    const MIN_MS = 2200;
    let current = 0;
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const targetByTime = Math.min(100, (elapsed / MIN_MS) * 100);
      const jitter = Math.random() * 12 + 3;
      current = Math.min(100, Math.max(current + jitter * 0.4, targetByTime * 0.8));
      setProgress(Math.floor(current));
      if (current >= 100 && elapsed >= MIN_MS) {
        clearInterval(interval);
        setProgress(100);
        window.setTimeout(runExit, 400);
      }
    }, 80);

    const runExit = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaded();
          setMounted(false);
          window.setTimeout(() => ScrollTrigger.refresh(), 100);
        },
      });

      tl.to([counterRef.current, barRef.current], {
        scale: 1.05,
        filter: 'blur(6px)',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
        .to(
          topRef.current,
          { yPercent: -100, duration: 1.2, ease: 'power4.inOut' },
          '<',
        )
        .to(
          bottomRef.current,
          { yPercent: 100, duration: 1.2, ease: 'power4.inOut' },
          '<',
        );
    };

    return () => clearInterval(interval);
  }, [setLoaded]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[500] pointer-events-none"
      aria-hidden
    >
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-bg"
        style={{ background: 'var(--color-bg)' }}
      />
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
        style={{ background: 'var(--color-bg)' }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[60vmin] h-[60vmin] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, var(--color-accent-cyan) 0%, transparent 60%)' }}
        />
        <div className="relative flex flex-col items-center gap-8 px-6">
          <div
            ref={counterRef}
            className="font-sans font-bold tabular-nums"
            style={{
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              color: 'var(--color-accent-cyan)',
              textShadow: '0 0 40px rgba(0,240,255,0.4)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {String(progress).padStart(3, '0')}%
          </div>
          <div
            ref={barRef}
            className="h-px w-[min(60vw,480px)] overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full transition-[width] duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'var(--color-accent-magenta)',
                boxShadow: '0 0 12px rgba(255,45,111,0.6)',
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-jp text-xs"
        style={{
          color: 'var(--color-text-muted)',
          letterSpacing: '0.3em',
        }}
      >
        LOADING EXPERIENCE
      </div>
    </div>
  );
}
