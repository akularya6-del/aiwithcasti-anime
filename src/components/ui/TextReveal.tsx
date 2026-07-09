'use client';

import { CSSProperties, useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Props {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  startTrigger?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className,
  style,
  delay = 0,
  startTrigger = true,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chars = root.querySelectorAll<HTMLElement>('.tr-char');
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 100, opacity: 0 });
      const play = () =>
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.03,
          ease: 'power3.out',
          delay,
        });

      if (startTrigger) {
        ScrollTrigger.create({
          trigger: root,
          start: 'top 85%',
          once: true,
          onEnter: play,
        });
      } else {
        play();
      }
    }, root);
    return () => ctx.revert();
  }, [children, delay, startTrigger]);

  const words = children.split(' ');

  return (
    <Tag
      ref={rootRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          style={{ overflow: 'hidden', paddingBottom: '0.08em', lineHeight: 1.05 }}
        >
          {word.split('').map((c, ci) => (
            <span key={ci} className="tr-char inline-block" style={{ willChange: 'transform, opacity' }}>
              {c}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
