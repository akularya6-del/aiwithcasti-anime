'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';
import AnimePostFX from './AnimePostFX';
import { useStore } from '@/stores/useStore';

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  return mobile;
}

function CameraRig({ scrollProgress, mouseX, mouseY }: { scrollProgress: number; mouseX: number; mouseY: number }) {
  useFrame((state) => {
    const heroT = Math.min(1, scrollProgress / 0.25);
    const targetZ = 5 + heroT * 4;
    const targetY = heroT * 1.2;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX * 0.4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY * 0.2, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const mobile = useIsMobile();
  const scrollProgress = useStore((s) => s.scrollProgress);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const particleCount = mobile ? 120 : 500;
  // heroT scaled: hero section is roughly first 12% of page
  const heroLocal = Math.min(1, scrollProgress / 0.12);

  return (
    <Canvas
      className="absolute inset-0"
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 5], fov: 65 }}
      dpr={[1, mobile ? 1 : 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#0a0a0f', 5, 20]} />
      <ambientLight intensity={0.35} color="#1a1a2e" />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#00f0ff" />
      <pointLight position={[-3, -2, 4]} intensity={0.6} color="#ff2d6f" />
      <FloatingGeometry scrollProgress={heroLocal} mouseX={mouse.x} mouseY={mouse.y} />
      <ParticleField count={particleCount} mouseX={mouse.x} mouseY={mouse.y} />
      <CameraRig scrollProgress={scrollProgress} mouseX={mouse.x} mouseY={mouse.y} />
      <AnimePostFX mobile={mobile} />
    </Canvas>
  );
}
