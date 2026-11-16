import React, { Component, ReactNode } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useNav } from '../store/useNav';

interface SafeErrorBoundaryProps {
  children: ReactNode;
}

interface SafeErrorBoundaryState {
  hasError: boolean;
}

class SafeEffectsBoundary extends Component<SafeErrorBoundaryProps, SafeErrorBoundaryState> {
  constructor(props: SafeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('Postprocessing effect failed, continuing without postprocessing:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const EffectsInner: React.FC = () => {
  const isLowPerformance = useNav((state) => state.isLowPerformance);
  const prefersReducedMotion = useNav((state) => state.prefersReducedMotion);
  const isFlying = useNav((state) => state.isFlying);
  const flightVelocity = useNav((state) => state.flightVelocity);

  // Disable postprocessing on low-end or reduced motion devices
  if (isLowPerformance || prefersReducedMotion) {
    return null;
  }

  const aberrationOffset = isFlying
    ? new THREE.Vector2(0.0025 * flightVelocity, 0.002 * flightVelocity)
    : new THREE.Vector2(0.0003, 0.0003);

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom
        luminanceThreshold={0.75}
        luminanceSmoothing={0.4}
        intensity={0.65}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={aberrationOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.8}
      />
    </EffectComposer>
  );
};

export const Effects: React.FC = () => {
  return (
    <SafeEffectsBoundary>
      <EffectsInner />
    </SafeEffectsBoundary>
  );
};
