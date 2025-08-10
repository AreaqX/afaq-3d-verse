import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  type: 'box' | 'sphere' | 'octahedron' | 'torus' | 'cone' | 'cylinder';
  color: string;
  scale?: number;
  symbol?: string;
}

export const FloatingGeometry = ({ position, type, color, scale = 1, symbol }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  // Create geometry based on type
  const createGeometry = () => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 16, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.5]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.2, 8, 16]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1, 8]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.3, 0.3, 1, 8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
    >
      {createGeometry()}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe={Math.random() > 0.5}
      />
    </mesh>
  );
};