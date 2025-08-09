import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingGeometry } from './FloatingGeometry';
import { ParticleField } from './ParticleField';
import { CodeSymbols } from './CodeSymbols';
import { BinaryRain } from './BinaryRain';

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
          
          {/* Binary Rain Background */}
          <BinaryRain />
          
          {/* Code Symbols */}
          <CodeSymbols />
          
          {/* Software Dev Themed Floating Geometries */}
          <FloatingGeometry 
            position={[-6, 2, -3]} 
            type="torus" 
            color="#6366f1" 
            scale={0.8}
          />
          <FloatingGeometry 
            position={[6, -2, -2]} 
            type="octahedron" 
            color="#8b5cf6" 
            scale={1}
          />
          <FloatingGeometry 
            position={[-3, -3, -4]} 
            type="cone" 
            color="#06ffa5" 
            scale={0.8}
          />
          <FloatingGeometry 
            position={[4, 3, -3]} 
            type="cylinder" 
            color="#6366f1" 
            scale={0.6}
          />
          <FloatingGeometry 
            position={[-2, 4, -5]} 
            type="torus" 
            color="#06ffa5" 
            scale={0.5}
          />
          <FloatingGeometry 
            position={[7, 1, -4]} 
            type="octahedron" 
            color="#8b5cf6" 
            scale={0.7}
          />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};