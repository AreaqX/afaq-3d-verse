import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  type: 'box' | 'sphere' | 'octahedron';
  color: string;
  scale?: number;
}

export const FloatingGeometry = ({ position, type, color, scale = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  const GeometryComponent = type === 'box' ? Box : type === 'sphere' ? Sphere : Octahedron;

  return (
    <GeometryComponent
      ref={meshRef}
      position={position}
      scale={scale}
      args={type === 'box' ? [1, 1, 1] : type === 'sphere' ? [0.5, 16, 16] : [0.5]}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe={Math.random() > 0.5}
      />
    </GeometryComponent>
  );
};