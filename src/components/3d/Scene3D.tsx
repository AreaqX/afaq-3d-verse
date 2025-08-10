import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ComputerSetup } from './ComputerSetup';
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
          
          {/* 3D Computer Setup */}
          <ComputerSetup />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};