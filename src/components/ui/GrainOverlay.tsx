'use client';

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        opacity: 'var(--grain-opacity)',
        mixBlendMode: 'overlay',
        animation: 'grain-shift 0.8s steps(4) infinite',
      }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
}
