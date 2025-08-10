import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

export const ComputerSetup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useMousePosition();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation based on mouse position
      const targetRotationY = mousePosition.x * 0.3;
      const targetRotationX = mousePosition.y * 0.2;
      
      // Smooth interpolation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, -2]} scale={1.2}>
      {/* Desk Base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Desk Legs */}
      {[[-1.8, -1, -1], [1.8, -1, -1], [-1.8, -1, 1], [1.8, -1, 1]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Laptop Base */}
      <mesh position={[-0.8, -0.4, 0.3]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Laptop Screen */}
      <mesh position={[-0.8, 0.2, -0.1]} rotation={[-0.2, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Laptop Screen Glow */}
      <mesh position={[-0.8, 0.2, -0.08]} rotation={[-0.2, 0.3, 0]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial
          color="#6366f1"
          transparent
          opacity={0.6}
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* External Monitor Stand */}
      <mesh position={[1, -0.2, 0]} rotation={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* External Monitor */}
      <mesh position={[1, 0.3, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[1.6, 1, 0.08]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Monitor Screen Glow */}
      <mesh position={[1, 0.3, 0.05]} rotation={[0, -0.2, 0]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.7}
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0.2, -0.42, 0.8]} rotation={[0, -0.1, 0]}>
        <boxGeometry args={[1, 0.04, 0.4]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Mouse */}
      <mesh position={[1.2, -0.4, 0.8]}>
        <boxGeometry args={[0.15, 0.03, 0.25]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* RGB Lighting Effects */}
      <pointLight
        position={[-0.8, 0, 0.5]}
        intensity={0.8}
        color="#6366f1"
        distance={3}
      />
      <pointLight
        position={[1, 0, 0.5]}
        intensity={1}
        color="#8b5cf6"
        distance={4}
      />
      <pointLight
        position={[0, -0.5, 1]}
        intensity={0.6}
        color="#3b82f6"
        distance={2}
      />

      {/* Ambient RGB Glow */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
          emissive="#6366f1"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};