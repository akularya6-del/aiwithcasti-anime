'use client';

import dynamic from 'next/dynamic';
import Preloader from '@/components/loader/Preloader';
import Hero from '@/components/sections/Hero';
import RealStack from '@/components/sections/RealStack';
import ColorMotion from '@/components/sections/ColorMotion';
import AIShortcuts from '@/components/sections/AIShortcuts';
import Performance from '@/components/sections/Performance';
import Footer from '@/components/layout/Footer';
import Divider from '@/components/layout/Divider';
import { useStore } from '@/stores/useStore';

const ImageSequence = dynamic(() => import('@/components/sections/ImageSequence'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-screen animate-pulse"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.05), transparent 60%), var(--color-bg)',
      }}
    />
  ),
});

export default function Page() {
  const isLoaded = useStore((s) => s.isLoaded);

  return (
    <main className="relative w-full">
      {!isLoaded && <Preloader />}

      <Hero />

      <Divider number="01 → 02" title="From Stack to Scene" />

      <RealStack />

      <Divider number="02 — 3D SCENES THAT DON'T LAG" />
      <div className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          Real-time 3D is the single biggest reason award-site clones break on mobile. The image sequence
          approach sidesteps this entirely.
        </p>
      </div>

      <ImageSequence />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="p-5 rounded-lg italic text-sm text-center"
          style={{
            border: '1px solid rgba(0,240,255,0.25)',
            background: 'rgba(0,240,255,0.04)',
            color: 'var(--color-text-muted)',
          }}
        >
          <span
            style={{
              color: 'var(--color-accent-cyan)',
              fontStyle: 'normal',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            PRO TIP —{' '}
          </span>
          Generate frame sequences with AI video tools (Veo, Runway) or render from Spline/Blender, then export every Nth frame as WebP images.
        </div>
      </div>

      <Divider number="06" />

      <ColorMotion />

      <Divider number="07" />

      <AIShortcuts />

      <Divider number="08" />

      <Performance />

      <Footer />
    </main>
  );
}
