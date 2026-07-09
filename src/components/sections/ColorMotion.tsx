'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

const EASES = [
  { name: 'linear', label: 'Linear — robotic', ease: 'none', highlight: false },
  { name: 'power1.inOut', label: 'Subtle — generic', ease: 'power1.inOut', highlight: false },
  { name: 'power3.inOut', label: 'Balanced — recommended', ease: 'power3.inOut', highlight: true },
  { name: 'elastic.out', label: 'Elastic — anime impact', ease: 'elastic.out(1,0.5)', highlight: false },
];

const CHECKLIST = [
  'One accent color for every interactive element',
  'One easing curve reused across the whole site',
  'Motion speed scales with element size',
  'Background stays in 2–3 brand colors max',
];

const PALETTE = [
  { name: 'Background', hex: '#0a0a0f' },
  { name: 'Surface', hex: '#12121a' },
  { name: 'Text', hex: '#e8e8ed' },
  { name: 'Cyan', hex: '#00f0ff' },
  { name: 'Magenta', hex: '#ff2d6f' },
  { name: 'Purple', hex: '#8b5cf6' },
];

export default function ColorMotion() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);

  const replay = (index: number) => {
    const el = document.querySelector<HTMLElement>(`[data-ease-card="${index}"] .ease-fill`);
    if (!el) return;
    gsap.fromTo(
      el,
      { x: '-100%' },
      { x: '0%', duration: 1.2, ease: EASES[index].ease },
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ease cards initial reveal, each with its OWN ease
      const cards = gsap.utils.toArray<HTMLElement>('[data-ease-card]');
      cards.forEach((card, i) => {
        const fill = card.querySelector<HTMLElement>('.ease-fill');
        gsap.set(card, { opacity: 0, y: 40 });
        gsap.set(fill, { x: '-100%' });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
            gsap.fromTo(fill, { x: '-100%' }, { x: '0%', duration: 1.2, ease: EASES[i].ease, delay: 0.2 });
          },
        });
      });

      // Checklist stagger
      gsap.set('.checklist-item', { opacity: 0, x: -30 });
      ScrollTrigger.create({
        trigger: '.checklist',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.checklist-item', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });

      // Palette swatches
      gsap.set('.palette-bar', { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: '.palette',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.palette-bar', {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.inOut',
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
      style={{ background: 'var(--color-surface)' }}
      id="motion"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <div
            className="mb-3"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: 'var(--color-accent-cyan)',
            }}
          >
            06 — COLOR & MOTION DIRECTION
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
            Why Award Sites All Feel Cohesive
          </TextReveal>
        </div>

        {/* Easing demo */}
        <div ref={cardsWrapRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {EASES.map((e, i) => (
            <div
              key={e.name}
              data-ease-card={i}
              className="interactive p-5 rounded-lg"
              data-cursor="expand"
              style={{
                background: 'var(--color-bg)',
                border: `1px solid ${e.highlight ? 'var(--color-accent-cyan)' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: e.highlight ? '0 0 30px rgba(0,240,255,0.12)' : 'none',
              }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: 'var(--color-text-muted)' }}>
                {e.name}
              </div>
              <div
                className="text-sm mb-4 font-medium"
                style={{ color: e.highlight ? 'var(--color-accent-cyan)' : 'var(--color-text)' }}
              >
                {e.label}
              </div>
              <div
                className="relative h-2 rounded-full overflow-hidden mb-3"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="ease-fill absolute inset-0 rounded-full"
                  style={{
                    background: e.highlight ? 'var(--color-accent-cyan)' : 'var(--color-text-muted)',
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => replay(i)}
                className="text-[0.65rem] uppercase tracking-widest hover:text-cyan transition-colors"
                style={{ color: 'var(--color-text-muted)', letterSpacing: '0.2em' }}
              >
                ▷ Replay
              </button>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="checklist grid md:grid-cols-2 gap-4 mb-20">
          {CHECKLIST.map((item, i) => (
            <div
              key={i}
              className="checklist-item flex items-start gap-3 p-4 rounded-lg"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,240,255,0.15)' }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-6" stroke="var(--color-accent-cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text)' }}>
                {item}
              </div>
            </div>
          ))}
        </div>

        {/* Palette */}
        <div className="palette">
          <div className="text-xs uppercase mb-4" style={{ letterSpacing: '0.25em', color: 'var(--color-text-muted)' }}>
            Live Palette
          </div>
          <div className="space-y-2">
            {PALETTE.map((p) => (
              <div key={p.hex} className="flex items-center gap-4">
                <div
                  className="palette-bar h-12 rounded flex items-center px-4 flex-1"
                  style={{
                    background: p.hex,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: ['#0a0a0f', '#12121a', '#8b5cf6', '#ff2d6f'].includes(p.hex) ? 'rgba(255,255,255,0.85)' : '#0a0a0f' }}
                  >
                    {p.hex}
                  </span>
                </div>
                <div className="text-xs w-24 text-right" style={{ color: 'var(--color-text-muted)' }}>
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
