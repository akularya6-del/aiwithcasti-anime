'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({ children, className, strength = 0.3, onClick }: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(inner, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const onLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    gsap.to(inner, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`interactive relative inline-flex items-center justify-center rounded-full uppercase transition-colors duration-300 ${className || ''}`}
      data-cursor="expand"
      style={{
        border: '1px solid var(--color-accent-cyan)',
        color: 'var(--color-accent-cyan)',
        padding: '0.75rem 2rem',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        background: 'transparent',
      }}
    >
      <span ref={innerRef} className="inline-block">
        {children}
      </span>
    </button>
  );
}
