'use client';

import { memo, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitCfg {
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
  size: number;
  color: string;
  yAmp: number;
}

const ORBITS: OrbitCfg[] = [
  { radius: 2.4, speed: 0.35, offset: 0.0, tilt: 0.2, size: 0.22, color: '#ff2d6f', yAmp: 0.6 },
  { radius: 2.9, speed: -0.28, offset: 1.2, tilt: -0.4, size: 0.16, color: '#8b5cf6', yAmp: 0.4 },
  { radius: 3.4, speed: 0.22, offset: 2.6, tilt: 0.5, size: 0.28, color: '#ff2d6f', yAmp: 0.5 },
  { radius: 2.1, speed: -0.4, offset: 3.4, tilt: 0.1, size: 0.14, color: '#8b5cf6', yAmp: 0.7 },
  { radius: 3.7, speed: 0.18, offset: 4.7, tilt: -0.2, size: 0.2, color: '#ff2d6f', yAmp: 0.3 },
  { radius: 2.7, speed: -0.32, offset: 5.9, tilt: 0.35, size: 0.18, color: '#8b5cf6', yAmp: 0.55 },
  { radius: 3.1, speed: 0.26, offset: 0.7, tilt: -0.5, size: 0.24, color: '#ff2d6f', yAmp: 0.45 },
];

function FloatingGeometry({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
}: {
  scrollProgress?: number;
  mouseX?: number;
  mouseY?: number;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const orbits = useMemo(() => ORBITS, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.12;
      const targetX = mouseY * 0.15;
      const targetZ = mouseX * 0.15;
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, coreRef.current.rotation.x + targetX * delta, 0.1);
      coreRef.current.rotation.z = THREE.MathUtils.lerp(coreRef.current.rotation.z, targetZ, 0.05);
      const baseScale = 1 + scrollProgress * 2;
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, baseScale, 0.08));
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1 - scrollProgress * 4, 0.1);
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.15;
      torusRef.current.rotation.y -= delta * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      const mat = groupRef.current.children[0] as THREE.Mesh | undefined;
      // fade all orbit shapes together with scroll
      groupRef.current.children.forEach((child) => {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (m && 'opacity' in m) {
          m.opacity = THREE.MathUtils.lerp(m.opacity ?? 1, Math.max(0, 1 - scrollProgress * 4), 0.1);
        }
      });
    }

    orbits.forEach((cfg, i) => {
      const mesh = groupRef.current?.children[i] as THREE.Mesh | undefined;
      if (!mesh) return;
      const angle = t * cfg.speed + cfg.offset;
      mesh.position.x = Math.cos(angle) * cfg.radius;
      mesh.position.z = Math.sin(angle) * cfg.radius;
      mesh.position.y = Math.sin(t * cfg.speed * 1.6 + cfg.offset) * cfg.yAmp + cfg.tilt;
      mesh.rotation.x += delta * 0.5;
      mesh.rotation.y += delta * 0.3;
    });
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          metalness={0.85}
          roughness={0.2}
          wireframe
          transparent
          opacity={1}
          emissive="#00f0ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1.6, 0.02, 128, 8]} />
        <meshBasicMaterial color="#ff2d6f" wireframe transparent opacity={0.18} />
      </mesh>

      <group ref={groupRef}>
        {orbits.map((cfg, i) => (
          <mesh key={i}>
            <octahedronGeometry args={[cfg.size, 0]} />
            <meshStandardMaterial
              color={cfg.color}
              wireframe
              transparent
              opacity={1}
              emissive={cfg.color}
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default memo(FloatingGeometry);
