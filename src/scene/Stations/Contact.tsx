import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const ContactStation: React.FC = () => {
  const beaconRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!beaconRef.current) return;
    const t = state.clock.getElapsedTime();

    // Pulse scale
    const pulse = 1 + Math.sin(t * 2.5) * 0.08;
    beaconRef.current.scale.set(pulse, pulse, pulse);

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.7;
    }
  });

  return (
    <group position={[-35, -150, -4]}>
      {/* 3D Pulsing Beacon Core in Background */}
      <group position={[0, 0, 0]}>
        <group ref={beaconRef}>
          {/* Inner crystal core */}
          <mesh>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color="#0F131A"
              emissive="#00E5FF"
              emissiveIntensity={1.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.9, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Orbiting Gyro Energy Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.8, 0.03, 16, 64]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[3.6, 0.02, 16, 64]} />
          <meshBasicMaterial color="#9AE600" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
};
