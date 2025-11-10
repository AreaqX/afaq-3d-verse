import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

export const ComputerSetup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const laptopScreenRef = useRef<THREE.Mesh>(null);
  const monitorScreenRef = useRef<THREE.Mesh>(null);
  const rgbLightRef = useRef<THREE.PointLight>(null);
  
  const { normalizedX, normalizedY } = useMousePosition();

  // Create screen texture with code/portfolio content
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 288;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Code lines
      ctx.fillStyle = '#06ffa5';
      ctx.font = '14px monospace';
      const codeLines = [
        'const developer = {',
        '  name: "Afaq Mehmood",',
        '  role: "Full Stack Developer",',
        '  experience: "3 years",',
        '  skills: ["React", "Node.js"]',
        '};',
        '',
        'function buildAmazingApps() {',
        '  return innovation + creativity;',
        '}'
      ];
      
      codeLines.forEach((line, index) => {
        ctx.fillText(line, 20, 30 + index * 20);
      });
      
      // Add some syntax highlighting
      ctx.fillStyle = '#6366f1';
      ctx.fillText('const', 20, 30);
      ctx.fillText('function', 20, 170);
      
      ctx.fillStyle = '#8b5cf6';
      ctx.fillText('developer', 66, 30);
      ctx.fillText('buildAmazingApps', 86, 170);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation based on mouse position
      const targetRotationY = normalizedX * 0.3;
      const targetRotationX = normalizedY * 0.2;
      
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

    // Screen glow effects
    if (laptopScreenRef.current) {
      const material = laptopScreenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    if (monitorScreenRef.current) {
      const material = monitorScreenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }

    // RGB lighting effects
    if (rgbLightRef.current) {
      const time = state.clock.elapsedTime;
      rgbLightRef.current.color.setHSL(
        (Math.sin(time * 0.5) + 1) * 0.5 * 0.3 + 0.6, // Hue cycling between blue and purple
        0.8,
        0.6
      );
      rgbLightRef.current.intensity = 2 + Math.sin(time * 3) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, -8]} scale={1.2}>
      {/* Desk */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[8, 0.2, 4]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Laptop Base */}
      <mesh position={[-1.5, -1.3, 0.5]}>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Laptop Screen */}
      <group position={[-1.5, -0.8, -0.2]} rotation={[0.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[2, 1.3, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh ref={laptopScreenRef} position={[0, 0, 0.026]}>
          <planeGeometry args={[1.8, 1.1]} />
          <meshStandardMaterial 
            map={screenTexture}
            emissive="#06ffa5"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* External Monitor Stand */}
      <mesh position={[1.5, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.8} />
      </mesh>

      {/* External Monitor */}
      <group position={[1.5, -0.2, 0]}>
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh ref={monitorScreenRef} position={[0, 0, 0.051]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            map={screenTexture}
            emissive="#6366f1"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, -1.28, 1.2]}>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Mouse */}
      <mesh position={[2, -1.25, 1]}>
        <boxGeometry args={[0.3, 0.1, 0.5]} />
        <meshStandardMaterial color="#3a3a4e" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* RGB Lighting - Left */}
      <pointLight
        ref={rgbLightRef}
        position={[-3, 0, 1]}
        intensity={2}
        color="#6366f1"
        distance={10}
      />

      {/* RGB Lighting - Right */}
      <pointLight
        position={[3, 0, 1]}
        intensity={1.5}
        color="#8b5cf6"
        distance={8}
      />

      {/* RGB Lighting - Back */}
      <pointLight
        position={[0, 1, -2]}
        intensity={1}
        color="#06ffa5"
        distance={6}
      />

      {/* Speakers with RGB */}
      <group position={[-3, -0.8, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.8]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} />
        </mesh>
        <pointLight
          position={[0, 0, 0]}
          intensity={0.5}
          color="#06ffa5"
          distance={2}
        />
      </group>

      <group position={[3, -0.8, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.8]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} />
        </mesh>
        <pointLight
          position={[0, 0, 0]}
          intensity={0.5}
          color="#8b5cf6"
          distance={2}
        />
      </group>
    </group>
  );
};