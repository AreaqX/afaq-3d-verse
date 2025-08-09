import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingGeometry } from './FloatingGeometry';
import { ParticleField } from './ParticleField';
import { CodeSymbols } from './CodeSymbols';
import { BinaryRain } from './BinaryRain';
import { FlowingWaves } from './FlowingWaves';
import { InteractiveObjects } from './InteractiveObjects';
import { CircuitPattern } from './CircuitPattern';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Scene3DProps {
  children?: React.ReactNode;
  enableControls?: boolean;
  className?: string;
}

export const Scene3D = ({ children, enableControls = false, className = "" }: Scene3DProps) => {
  const mousePosition = useMousePosition();

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.2} color="#0a0a2e" />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8} 
            color="#ffffff"
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.5} 
            color="#6366f1" 
          />
          <pointLight 
            position={[10, -10, -5]} 
            intensity={0.4} 
            color="#8b5cf6" 
          />
          <pointLight 
            position={[0, 10, -8]} 
            intensity={0.3} 
            color="#06ffa5" 
          />
          
          {/* Background Effects */}
          <BinaryRain />
          
          {/* Main Feature: Flowing Waves */}
          <FlowingWaves mousePosition={mousePosition} />
          
          {/* Interactive 3D Objects */}
          <InteractiveObjects mousePosition={mousePosition} />
          
          {/* Circuit Patterns */}
          <CircuitPattern mousePosition={mousePosition} />
          
          {/* Code Symbols */}
          <CodeSymbols />
          
          {/* Minimal Floating Geometries (reduced for performance) */}
          <FloatingGeometry 
            position={[-8, 4, -15]} 
            type="torus" 
            color="#6366f1" 
            scale={0.6}
          />
          <FloatingGeometry 
            position={[8, -4, -12]} 
            type="octahedron" 
            color="#8b5cf6" 
            scale={0.8}
          />
          <FloatingGeometry 
            position={[-5, -5, -18]} 
            type="cone" 
            color="#06ffa5" 
            scale={0.5}
          />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};