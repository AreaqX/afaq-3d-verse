import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const codeSymbols = ['<', '>', '{', '}', '(', ')', ';', '/', '*', '=', '+', '-', '[', ']'];

export const CodeSymbols = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {codeSymbols.map((symbol, index) => {
        const angle = (index / codeSymbols.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 6;

        return (
          <mesh 
            key={index}
            position={[x, y, z]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial
              color="#06ffa5"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};