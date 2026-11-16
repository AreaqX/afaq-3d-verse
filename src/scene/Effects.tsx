import React from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useNav } from '../store/useNav';

export const Effects: React.FC = () => {
  const isLowPerformance = useNav((state) => state.isLowPerformance);
  const prefersReducedMotion = useNav((state) => state.prefersReducedMotion);
  const isFlying = useNav((state) => state.isFlying);
  const flightVelocity = useNav((state) => state.flightVelocity);

  // Disable postprocessing on low-end or reduced motion devices
  if (isLowPerformance || prefersReducedMotion) {
    return null;
  }

  // Chromatic aberration offset surges dynamically during flight
  const aberrationOffset = isFlying
    ? new THREE.Vector2(0.0025 * flightVelocity, 0.002 * flightVelocity)
    : new THREE.Vector2(0.0003, 0.0003);

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* Subtle bloom on glowing elements */}
      <Bloom
        luminanceThreshold={0.75}
        luminanceSmoothing={0.4}
        intensity={0.65}
        mipmapBlur
      />
      {/* Flight streak / light warp */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={aberrationOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      {/* Atmospheric vignette */}
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.8}
      />
    </EffectComposer>
  );
};
