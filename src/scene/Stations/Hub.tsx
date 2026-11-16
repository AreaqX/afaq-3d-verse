import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const HubStation: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.08;
    }

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {/* Background Subtle Geometric Halo Rings */}
      <mesh ref={ring1Ref} position={[0, 0, -1]}>
        <ringGeometry args={[7.2, 7.3, 64]} />
        <meshBasicMaterial color="#C6FF3D" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, -2]}>
        <ringGeometry args={[11.5, 11.55, 64]} />
        <meshBasicMaterial color="#222A38" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Coordinate Crosshairs */}
      <mesh position={[0, 0, -1.5]}>
        <planeGeometry args={[16, 0.02]} />
        <meshBasicMaterial color="#C6FF3D" transparent opacity={0.12} />
      </mesh>
      <mesh position={[0, 0, -1.5]}>
        <planeGeometry args={[0.02, 16]} />
        <meshBasicMaterial color="#C6FF3D" transparent opacity={0.12} />
      </mesh>
    </group>
  );
};
