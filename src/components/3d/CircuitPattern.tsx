import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CircuitPatternProps {
  mousePosition: { x: number; y: number };
}

export const CircuitPattern = ({ mousePosition }: CircuitPatternProps) => {
  const lineRefs = useRef<THREE.LineSegments[]>([]);
  
  const circuitLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const materials: THREE.LineBasicMaterial[] = [];
    
    // Create circuit-like patterns
    for (let i = 0; i < 8; i++) {
      const startX = (Math.random() - 0.5) * 20;
      const startY = (Math.random() - 0.5) * 15;
      const startZ = -15 + Math.random() * 10;
      
      // Create circuit path
      const points: THREE.Vector3[] = [];
      for (let j = 0; j < 6; j++) {
        const x = startX + (j * 2) + (Math.random() - 0.5);
        const y = startY + (Math.random() - 0.5) * 2;
        const z = startZ + (Math.random() - 0.5);
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geometry);
      
      const color = i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#06ffa5' : '#8b5cf6';
      materials.push(new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      }));
    }
    
    return { lines, materials };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    lineRefs.current.forEach((line, index) => {
      if (line) {
        // Subtle movement
        line.rotation.z = time * 0.1 + index * 0.2;
        
        // Mouse interaction
        line.position.x = Math.sin(time + index) * 0.5 + mousePosition.x * 0.5;
        line.position.y = Math.cos(time + index) * 0.3 + mousePosition.y * 0.3;
        
        // Pulsing opacity
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.4 + Math.sin(time * 2 + index) * 0.3;
      }
    });
  });

  return (
    <group>
      {circuitLines.lines.map((geometry, index) => (
        <lineSegments
          key={index}
          ref={(ref) => {
            if (ref) lineRefs.current[index] = ref;
          }}
          geometry={geometry}
          material={circuitLines.materials[index]}
        />
      ))}
    </group>
  );
};