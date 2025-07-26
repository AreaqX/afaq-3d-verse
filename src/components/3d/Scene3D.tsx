import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
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
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Particle Background */}
          <ParticleField />
          
          {/* Floating Geometries */}
          <FloatingGeometry 
            position={[-8, 2, -5]} 
            type="box" 
            color="#6366f1" 
            scale={0.8}
          />
          <FloatingGeometry 
            position={[8, -2, -3]} 
            type="sphere" 
            color="#8b5cf6" 
            scale={1.2}
          />
          <FloatingGeometry 
            position={[-5, -3, -8]} 
            type="octahedron" 
            color="#06ffa5" 
            scale={1}
          />
          <FloatingGeometry 
            position={[6, 4, -6]} 
            type="box" 
            color="#6366f1" 
            scale={0.6}
          />
          
          {children}
          
          {enableControls && <OrbitControls enableZoom={false} />}
        </Suspense>
      </Canvas>
    </div>
  );
};