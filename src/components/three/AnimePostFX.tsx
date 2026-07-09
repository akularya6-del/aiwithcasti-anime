'use client';

import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

export default function AnimePostFX({ mobile = false }: { mobile?: boolean }) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={mobile ? 0.8 : 1.6}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {mobile ? (
        <></>
      ) : (
        <ChromaticAberration
          offset={new THREE.Vector2(0.001, 0.001)}
          radialModulation={false}
          modulationOffset={0}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
    </EffectComposer>
  );
}
