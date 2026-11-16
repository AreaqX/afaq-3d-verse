import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const JourneyStation: React.FC = () => {
  const lineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    lineRef.current.position.y = Math.sin(t * 0.7) * 0.1;
  });

  return (
    <group position={[0, -110, -6]}>
      {/* Glowing 3D Path Line with Waypoints */}
      <group ref={lineRef}>
        {/* Main glowing trajectory beam */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 24, 16]} />
          <meshStandardMaterial color="#C6FF3D" emissive="#C6FF3D" emissiveIntensity={0.8} />
        </mesh>

        {/* Floating Waypoint Beacons */}
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#C6FF3D" emissive="#C6FF3D" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0, -4, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#EDEDED" emissiveIntensity={0.8} />
        </mesh>

        {/* Ambient Ring Accents */}
        <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 32]} />
          <meshBasicMaterial color="#C6FF3D" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 32]} />
          <meshBasicMaterial color="#EDEDED" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};
