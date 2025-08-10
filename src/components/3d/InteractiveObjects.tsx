import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveObjectsProps {
  mousePosition: { x: number; y: number };
}

export const InteractiveObjects = ({ mousePosition }: InteractiveObjectsProps) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);

  // Glowing materials
  const glowMaterial1 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6366f1',
    transparent: true,
    opacity: 0.7,
    emissive: '#6366f1',
    emissiveIntensity: 0.3,
    wireframe: true
  }), []);

  const glowMaterial2 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8b5cf6',
    transparent: true,
    opacity: 0.6,
    emissive: '#8b5cf6',
    emissiveIntensity: 0.4,
    wireframe: false
  }), []);

  const glowMaterial3 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#06ffa5',
    transparent: true,
    opacity: 0.8,
    emissive: '#06ffa5',
    emissiveIntensity: 0.2,
    wireframe: true
  }), []);

  const glowMaterial4 = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f5ff',
    transparent: true,
    opacity: 0.5,
    emissive: '#00f5ff',
    emissiveIntensity: 0.3,
    wireframe: false
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Floating animations
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.3 + mousePosition.y * 0.2;
      cubeRef.current.rotation.y = time * 0.2 + mousePosition.x * 0.3;
      cubeRef.current.position.y = Math.sin(time + 1) * 0.5 - 2;
      
      // Mouse proximity glow effect
      const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
      const intensity = Math.max(0.2, 0.8 - distance * 0.5);
      glowMaterial1.emissiveIntensity = intensity;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.4 + mousePosition.x * 0.1;
      sphereRef.current.rotation.z = time * 0.3 + mousePosition.y * 0.2;
      sphereRef.current.position.y = Math.cos(time + 2) * 0.6 + 1;
      
      const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
      const intensity = Math.max(0.3, 0.9 - distance * 0.4);
      glowMaterial2.emissiveIntensity = intensity;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2 + mousePosition.y * 0.15;
      torusRef.current.rotation.y = time * 0.5 + mousePosition.x * 0.25;
      torusRef.current.position.y = Math.sin(time + 3) * 0.4;
      
      const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
      const intensity = Math.max(0.1, 0.6 - distance * 0.3);
      glowMaterial3.emissiveIntensity = intensity;
    }
    
    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = time * 0.35 + mousePosition.x * 0.2;
      octahedronRef.current.rotation.y = time * 0.25 + mousePosition.y * 0.1;
      octahedronRef.current.position.y = Math.cos(time + 4) * 0.3 + 2;
      
      const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
      const intensity = Math.max(0.2, 0.7 - distance * 0.4);
      glowMaterial4.emissiveIntensity = intensity;
    }
  });

  return (
    <group>
      {/* Wireframe Cube */}
      <mesh
        ref={cubeRef}
        position={[-8, -2, -6]}
        material={glowMaterial1}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
      </mesh>
      
      {/* Glowing Sphere */}
      <mesh
        ref={sphereRef}
        position={[8, 1, -4]}
        material={glowMaterial2}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
      </mesh>
      
      {/* Wireframe Torus */}
      <mesh
        ref={torusRef}
        position={[-6, 0, -10]}
        material={glowMaterial3}
      >
        <torusGeometry args={[1.2, 0.4, 16, 100]} />
      </mesh>
      
      {/* Octahedron */}
      <mesh
        ref={octahedronRef}
        position={[6, 2, -8]}
        material={glowMaterial4}
      >
        <octahedronGeometry args={[1]} />
      </mesh>
    </group>
  );
};