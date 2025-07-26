import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingGeometry } from './FloatingGeometry';
import { ParticleField } from './ParticleField';

interface Scene3DProps {
  children?: React.ReactNode;
  enableControls?: boolean;
  className?: string;
}

export const Scene3D = ({ children, enableControls = false, className = "" }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          {/* Basic Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            color="#ffffff"
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.3} 
            color="#6366f1" 
          />
          
          {/* Particle Background */}
          <ParticleField />
          
          {/* Floating Geometries */}
          <FloatingGeometry 
            position={[-6, 2, -3]} 
            type="box" 
            color="#6366f1" 
            scale={0.8}
          />
          <FloatingGeometry 
            position={[6, -2, -2]} 
            type="sphere" 
            color="#8b5cf6" 
            scale={1}
          />
          <FloatingGeometry 
            position={[-3, -3, -4]} 
            type="octahedron" 
            color="#06ffa5" 
            scale={0.8}
          />
          <FloatingGeometry 
            position={[4, 3, -3]} 
            type="box" 
            color="#6366f1" 
            scale={0.6}
          />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};