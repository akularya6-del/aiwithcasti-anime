'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

const ACCENTS = [
  'var(--color-accent-cyan)',
  'var(--color-accent-magenta)',
  'var(--color-accent-purple)',
];

const CARDS = [
  {
    title: 'Stack Setup',
    icon: '◧',
    prompt: 'Set up a Next.js project with GSAP, ScrollTrigger, and Lenis smooth scroll wired together correctly.',
  },
  {
    title: '3D Scene',
    icon: '◉',
    prompt: 'Add a rotating Three.js icosahedron in the hero section with a teal MeshStandardMaterial and ambient + directional lighting.',
  },
  {
    title: 'Image Sequence',
    icon: '▤',
    prompt: 'Build a canvas-based scroll scrubber that plays a 120-frame image sequence from /public/frames as the user scrolls through this section.',
  },
  {
    title: 'Pinning & Reveal',
    icon: '▦',
    prompt: 'Pin the .hero section for 2000px of scroll and stagger-reveal the .feature-cards as it unpins.',
  },
  {
    title: 'Loader',
    icon: '◍',
    prompt: 'Create a preloader with a 0–100% counter that fades to reveal the page after a minimum 2 second display.',
  },
  {
    title: 'Performance Pass',
    icon: '◐',
    prompt: 'Audit this component for scroll jank and add will-change, passive scroll listeners, and a mobile fallback for the Three.js scene.',
  },
];

function CopyCard({ card, accent }: { card: (typeof CARDS)[number]; accent: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(card.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };
  return (
    <article
      className="ai-card interactive relative p-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
      data-cursor="expand"
      style={{
        background: 'var(--color-surface)',
        borderLeft: `2px solid ${accent}`,
        border: '1px solid rgba(255,255,255,0.06)',
        borderLeftWidth: 2,
        borderLeftColor: accent,
      }}
    >
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl" style={{ color: accent }}>{card.icon}</span>
          <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{card.title}</h3>
        </div>
        <button
          type="button"
          onClick={copy}
          className="text-[0.65rem] uppercase tracking-widest px-3 py-1 rounded-full transition-colors interactive"
          data-cursor="expand"
          style={{
            border: `1px solid ${copied ? accent : 'rgba(255,255,255,0.15)'}`,
            color: copied ? accent : 'var(--color-text-muted)',
            letterSpacing: '0.15em',
          }}
        >
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>
      <pre
        className="font-mono text-xs leading-relaxed whitespace-pre-wrap"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {card.prompt}
      </pre>
    </article>
  );
}

export default function AIShortcuts() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.ai-card', { opacity: 0, y: 40, scale: 0.97 });
      ScrollTrigger.create({
        trigger: '.ai-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.ai-card', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full py-32 px-6" id="shortcuts">
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
            07 — AI SHORTCUTS FOR EVERY STEP
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
            Prompts That Replace Hours of Manual Setup
          </TextReveal>
        </div>

        <div className="ai-grid grid md:grid-cols-2 gap-4 mb-10">
          {CARDS.map((c, i) => (
            <CopyCard key={c.title} card={c} accent={ACCENTS[i % ACCENTS.length]} />
          ))}
        </div>

        <div
          className="max-w-3xl mx-auto p-5 rounded-lg italic text-sm text-center"
          style={{
            border: '1px solid rgba(0,240,255,0.25)',
            background: 'rgba(0,240,255,0.04)',
            color: 'var(--color-text-muted)',
          }}
        >
          <span style={{ color: 'var(--color-accent-cyan)', fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.1em' }}>
            PRO TIP —{' '}
          </span>
          Always specify the exact library names in your prompt (GSAP, Three.js, Lenis) — vague prompts like &quot;add cool animation&quot; produce generic, inconsistent code.
        </div>
      </div>
    </section>
  );
}
