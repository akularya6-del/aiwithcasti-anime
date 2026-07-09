'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/ui/TextReveal';

const FRAME_COUNT = 60;

function drawFrame(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  const t = frame / (FRAME_COUNT - 1);

  // Background: shifting hue gradient
  const hue1 = 190 + t * 90; // cyan -> magenta -> purple-ish
  const hue2 = 260 + t * 60;
  const g = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, Math.max(w, h) * 0.7);
  g.addColorStop(0, `hsl(${hue1}, 90%, 22%)`);
  g.addColorStop(0.6, `hsl(${hue2}, 70%, 10%)`);
  g.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Grid pattern
  ctx.strokeStyle = 'rgba(0,240,255,0.05)';
  ctx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Rotating wireframe icosahedron-ish (projected)
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.28;
  const rot = t * Math.PI * 2;

  const verts: [number, number, number][] = [];
  const layers = 3;
  const perLayer = 6;
  for (let i = 0; i < layers; i++) {
    const yy = ((i - (layers - 1) / 2) / ((layers - 1) / 2)) * R;
    const rr = Math.sqrt(Math.max(0, R * R - yy * yy));
    for (let j = 0; j < perLayer; j++) {
      const a = (j / perLayer) * Math.PI * 2 + rot + i * 0.3;
      verts.push([Math.cos(a) * rr, yy, Math.sin(a) * rr]);
    }
  }

  const proj = verts.map(([x, y, z]) => {
    const persp = 800 / (800 + z);
    return [cx + x * persp, cy + y * persp, persp];
  });

  // Draw edges
  ctx.strokeStyle = `hsla(${hue1}, 100%, 60%, 0.9)`;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = `hsla(${hue1}, 100%, 60%, 0.6)`;
  ctx.shadowBlur = 12;
  for (let i = 0; i < proj.length; i++) {
    for (let j = i + 1; j < proj.length; j++) {
      const [ax, ay] = proj[i];
      const [bx, by] = proj[j];
      const d = Math.hypot(ax - bx, ay - by);
      if (d < R * 0.75) {
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }
  }
  ctx.shadowBlur = 0;

  // Vertex dots
  ctx.fillStyle = '#ffffff';
  proj.forEach(([x, y, p]) => {
    ctx.beginPath();
    ctx.arc(x, y, 1.5 * p, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ambient particles
  ctx.fillStyle = 'rgba(0,240,255,0.5)';
  const seed = frame * 37;
  for (let i = 0; i < 40; i++) {
    const rnd1 = (Math.sin(seed + i * 12.9898) * 43758.5453) % 1;
    const rnd2 = (Math.sin(seed + i * 78.233) * 43758.5453) % 1;
    const px = Math.abs(rnd1) * w;
    const py = Math.abs(rnd2) * h;
    ctx.beginPath();
    ctx.arc(px, py, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Scanline overlay
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  for (let y = 0; y < h; y += 3) {
    ctx.fillRect(0, y, w, 1);
  }

  // Corner brackets (anime UI feel)
  ctx.strokeStyle = 'rgba(0,240,255,0.6)';
  ctx.lineWidth = 1.5;
  const b = 20;
  const m = 16;
  [
    [m, m, 1, 1],
    [w - m, m, -1, 1],
    [m, h - m, 1, -1],
    [w - m, h - m, -1, -1],
  ].forEach(([x, y, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + b * dy);
    ctx.lineTo(x, y);
    ctx.lineTo(x + b * dx, y);
    ctx.stroke();
  });
}

export default function ImageSequence() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ frame: 0 });
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const text3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(ctx, rect.width, rect.height, stateRef.current.frame);
    };
    resize();
    window.addEventListener('resize', resize);

    const ctxGsap = gsap.context(() => {
      // Frame scrubber
      gsap.to(stateRef.current, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        snap: 'frame',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
        onUpdate: () => {
          const rect = canvas.getBoundingClientRect();
          drawFrame(ctx, rect.width, rect.height, stateRef.current.frame);
        },
      });

      // Text state crossfades
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0 });
      gsap.set(text1Ref.current, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
      tl.to(text1Ref.current, { opacity: 0, duration: 0.05 }, 0.3)
        .to(text2Ref.current, { opacity: 1, duration: 0.05 }, 0.3)
        .to(text2Ref.current, { opacity: 0, duration: 0.05 }, 0.63)
        .to(text3Ref.current, { opacity: 1, duration: 0.05 }, 0.63);
    }, rootRef);

    return () => {
      window.removeEventListener('resize', resize);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative w-full" style={{ height: '400vh' }} id="sequence">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6">
        <div className="mb-6 text-center">
          <div
            className="mb-3"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              color: 'var(--color-accent-cyan)',
            }}
          >
            03 — THE IMAGE-SEQUENCE TRICK
          </div>
          <TextReveal
            as="h2"
            className="font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            How Apple-Style Scroll-Zoom Actually Works
          </TextReveal>
        </div>

        <div
          className="relative w-full"
          style={{
            maxWidth: '820px',
            aspectRatio: '16 / 10',
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg"
            style={{
              border: '1px solid rgba(0,240,255,0.15)',
              background: 'var(--color-bg)',
            }}
          />
        </div>

        <div className="mt-8 relative h-16 w-full max-w-xl text-center">
          <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center gap-1">
            <div className="font-semibold" style={{ fontSize: '1.15rem', color: 'var(--color-text)' }}>
              Pre-rendered frames. Not live 3D.
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              A 3D model rendered as 60–150 still images
            </div>
          </div>
          <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center gap-1">
            <div className="font-semibold" style={{ fontSize: '1.15rem', color: 'var(--color-text)' }}>
              Scrubbed on scroll. 60fps anywhere.
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              GSAP maps scroll position to frame number
            </div>
          </div>
          <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center gap-1">
            <div className="font-semibold" style={{ fontSize: '1.15rem', color: 'var(--color-text)' }}>
              Runs on any device. Even phones.
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Because it&apos;s just swapping 2D images
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
