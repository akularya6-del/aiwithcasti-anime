'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/stores/useStore';
import { getLenisInstance } from '@/lib/lenis';

const LINKS = [
  { label: 'Stack', href: '#stack' },
  { label: '3D Scenes', href: '#sequence' },
  { label: 'Scroll', href: '#sequence' },
  { label: 'Motion', href: '#motion' },
  { label: 'Shortcuts', href: '#shortcuts' },
  { label: 'Performance', href: '#performance' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoaded = useStore((s) => s.isLoaded);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.set(navRef.current, { opacity: 0, y: -20 });
  }, []);

  useEffect(() => {
    if (!isLoaded || !navRef.current) return;
    gsap.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, [isLoaded]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.4 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTop = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[100] h-16 backdrop-blur-xl transition-colors duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'rgba(10,10,15,0.55)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6 md:px-8">
          <button
            type="button"
            onClick={scrollTop}
            className="interactive flex items-center gap-2 font-sans font-bold text-sm tracking-wider"
            data-cursor="expand"
            style={{ color: 'var(--color-text)' }}
          >
            AIWITHCASTI
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-accent-cyan)', boxShadow: '0 0 8px var(--color-accent-cyan)' }}
            />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => jump(l.href)}
                className="interactive text-[0.7rem] uppercase transition-colors hover:text-cyan"
                data-cursor="expand"
                style={{
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.15em',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden interactive flex flex-col gap-1.5 p-2"
            data-cursor="expand"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px transition-transform duration-300"
              style={{
                background: 'var(--color-text)',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-px transition-opacity duration-300"
              style={{
                background: 'var(--color-text)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-transform duration-300"
              style={{
                background: 'var(--color-text)',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[99] md:hidden transition-opacity duration-500"
        style={{
          background: 'rgba(10,10,15,0.98)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="h-full flex flex-col items-center justify-center gap-8">
          {LINKS.map((l, i) => (
            <button
              key={l.label}
              type="button"
              onClick={() => jump(l.href)}
              className="text-2xl font-semibold transition-transform"
              style={{
                color: 'var(--color-text)',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.5s ease ${0.1 + i * 0.06}s`,
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
