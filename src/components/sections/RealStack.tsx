'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/lib/gsap-config';
import TextReveal from '@/components/ui/TextReveal';

const CARDS = [
  {
    name: 'Three.js',
    desc: 'Core 3D rendering engine for the web. Particles, geometry, shaders, real-time scenes.',
    accent: 'var(--color-accent-cyan)',
  },
  {
    name: 'GSAP + ScrollTrigger',
    desc: 'The animation engine. Every scroll-pinned section, reveal, and timeline sequence.',
    accent: 'var(--color-accent-magenta)',
  },
  {
    name: 'Lenis',
    desc: 'Smooth-scroll wrapper. Buttery scroll feel and clean scroll values for GSAP.',
    accent: 'var(--color-accent-purple)',
  },
  {
    name: 'Spline',
    desc: 'Browser-based 3D design. Build and light scenes visually, export to web.',
    accent: 'var(--color-accent-cyan)',
  },
  {
    name: 'Theatre.js',
    desc: 'Visual animation director for Three.js. Keyframe 3D objects in a GUI.',
    accent: 'var(--color-accent-magenta)',
  },
  {
    name: 'Framer / Webflow',
    desc: 'No-code builders with native scroll and hover animation support.',
    accent: 'var(--color-accent-purple)',
  },
];

export default function RealStack() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.tech-card');
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });
      gsap.set(tipRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=2500',
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      tl.to(titleRef.current, { opacity: 0, y: -50, ease: EASE }, 0)
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            ease: EASE,
          },
          0.15,
        )
        .to(tipRef.current, { opacity: 1, y: 0, ease: EASE }, 0.75)
        .to(cards, { opacity: 0.65, scale: 0.98, ease: EASE }, 0.9);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full"
      style={{ minHeight: '300vh' }}
      id="stack"
    >
      <div
        ref={pinRef}
        className="h-screen w-full flex flex-col items-center justify-center px-6 py-16"
      >
        <div ref={titleRef} className="max-w-5xl w-full mb-12 text-center">
          <div
            className="mb-4"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: 'var(--color-accent-cyan)',
            }}
          >
            01 — THE REAL STACK
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
            What Award Sites Are Actually Built With
          </TextReveal>
        </div>

        <div
          ref={cardsRef}
          className="grid w-full max-w-6xl gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((c) => (
            <article
              key={c.name}
              className="tech-card interactive group relative p-8 rounded-xl transition-all duration-300"
              data-cursor="expand"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid rgba(255,255,255,0.06)',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="w-2 h-2 rounded-full mb-4"
                style={{ background: c.accent, boxShadow: `0 0 12px ${c.accent}` }}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {c.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {c.desc}
              </p>
              <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  border: `1px solid ${c.accent}`,
                  boxShadow: `0 0 30px ${c.accent}22`,
                }}
              />
            </article>
          ))}
        </div>

        <div
          ref={tipRef}
          className="max-w-3xl mt-10 p-5 rounded-lg italic text-sm"
          style={{
            border: '1px solid rgba(0,240,255,0.25)',
            background: 'rgba(0,240,255,0.04)',
            color: 'var(--color-text-muted)',
          }}
        >
          <span style={{ color: 'var(--color-accent-cyan)', fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.1em' }}>
            PRO TIP —{' '}
          </span>
          You don&apos;t need to master all six. Pick GSAP + Lenis for motion, then ADD Three.js or Spline only if the brief truly needs 3D.
        </div>
      </div>
    </section>
  );
}
