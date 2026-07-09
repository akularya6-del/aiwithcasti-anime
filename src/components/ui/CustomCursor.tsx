'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    mouseX: 0,
    mouseY: 0,
    ringX: 0,
    ringY: 0,
    dotX: 0,
    dotY: 0,
    ringScale: 1,
    dotScale: 1,
    targetRingScale: 1,
    targetDotScale: 1,
    hoverColor: false,
  });

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;
    document.documentElement.style.cursor = 'none';

    const s = state.current;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest('a, button, [data-cursor="expand"], .interactive');
      if (el) {
        s.targetRingScale = 2;
        s.targetDotScale = 0.5;
        s.hoverColor = true;
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest('a, button, [data-cursor="expand"], .interactive');
      if (el) {
        s.targetRingScale = 1;
        s.targetDotScale = 1;
        s.hoverColor = false;
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);

    const tick = () => {
      s.ringX += (s.mouseX - s.ringX) * 0.18;
      s.ringY += (s.mouseY - s.ringY) * 0.18;
      s.dotX += (s.mouseX - s.dotX) * 0.5;
      s.dotY += (s.mouseY - s.dotY) * 0.5;
      s.ringScale += (s.targetRingScale - s.ringScale) * 0.15;
      s.dotScale += (s.targetDotScale - s.dotScale) * 0.2;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${s.ringX - 20}px, ${s.ringY - 20}px, 0) scale(${s.ringScale})`;
        ring.style.borderColor = s.hoverColor ? 'var(--color-accent-magenta)' : 'var(--color-accent-cyan)';
      }
      if (dot) {
        dot.style.transform = `translate3d(${s.dotX - 3}px, ${s.dotY - 3}px, 0) scale(${s.dotScale})`;
        dot.style.background = s.hoverColor ? 'var(--color-accent-magenta)' : 'var(--color-accent-cyan)';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 pointer-events-none z-[1000] w-10 h-10 rounded-full"
        style={{
          border: '1px solid var(--color-accent-cyan)',
          opacity: 0.6,
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 pointer-events-none z-[1000] w-1.5 h-1.5 rounded-full"
        style={{
          background: 'var(--color-accent-cyan)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
