import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { portfolioData } from '../../data/portfolio';
import { useNav } from '../../store/useNav';
import { Phone } from '../Phone';

export const WorkStation: React.FC = () => {
  const activeProject = useNav((state) => state.activeProject) || portfolioData.projects[0];
  const isLowPerformance = useNav((state) => state.isLowPerformance);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.position.y = -35 + Math.sin(t * 0.9) * 0.15;
  });

  return (
    <group position={[0, -35, 0]}>
      {/* Subtle Orbital Halo Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, -2]}>
        <ringGeometry args={[5.8, 5.85, 64]} />
        <meshBasicMaterial color="#C6FF3D" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Featured 3D Phone Showcase */}
      <group ref={ringRef} position={[0, 0, 0]}>
        <Phone
          project={activeProject}
          isActive={true}
          isHovered={false}
          onHover={() => {}}
          onClick={() => {}}
          isLowPerformance={isLowPerformance}
        />
      </group>
    </group>
  );
};
