import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useNav } from '../store/useNav';

interface ParticleDustProps {
  count?: number;
}

export const ParticleDust: React.FC<ParticleDustProps> = ({ count = 1800 }) => {
  const { camera } = useThree();
  const isFlying = useNav((state) => state.isFlying);
  const flightVelocity = useNav((state) => state.flightVelocity);
  const isLowPerformance = useNav((state) => state.isLowPerformance);

  const actualCount = isLowPerformance ? Math.floor(count / 3) : count;
  const pointsRef = useRef<THREE.Points>(null);

  // Distribute particles through a large cylinder/tunnel along the flight trajectory (y from +20 down to -180)
  const [positions, scales, colors] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const sca = new Float32Array(actualCount);
    const col = new Float32Array(actualCount * 3);

    const limeColor = new THREE.Color('#00E5FF');
    const whiteColor = new THREE.Color('#EDEDED');
    const greyColor = new THREE.Color('#4A5260');

    for (let i = 0; i < actualCount; i++) {
      // Radius from path center
      const r = 2 + Math.random() * 32;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const y = 30 - Math.random() * 220; // extends from Hub down to Contact
      const z = (Math.random() - 0.5) * 35;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      sca[i] = Math.random() * 2.2 + 0.6;

      // Color distribution: mostly faint white/grey, with occasional electric lime sparkles
      const choice = Math.random();
      const c = choice > 0.88 ? limeColor : choice > 0.4 ? whiteColor : greyColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, sca, col];
  }, [actualCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // When flying, particles rush past relative to flight direction (downward Y or camera motion)
    const speedMultiplier = flightVelocity > 0 ? 1 + flightVelocity * 22 : 0.4;

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3 + 1; // Y axis
      if (flightVelocity > 0) {
        posArray[idx] += delta * speedMultiplier * 1.5;
        // Wrap around camera Y
        if (posArray[idx] > camera.position.y + 40) {
          posArray[idx] = camera.position.y - 70;
        }
      } else {
        // Gentle subtle drift
        posArray[idx] += delta * 0.15;
        if (posArray[idx] > 35) {
          posArray[idx] = -190;
        }
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isFlying ? 0.16 : 0.1}
        vertexColors
        transparent
        opacity={isFlying ? 0.85 : 0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
