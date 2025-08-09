import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlowingWavesProps {
  mousePosition: { x: number; y: number };
}

export const FlowingWaves = ({ mousePosition }: FlowingWavesProps) => {
  const wave1Ref = useRef<THREE.Mesh>(null);
  const wave2Ref = useRef<THREE.Mesh>(null);
  const wave3Ref = useRef<THREE.Mesh>(null);

  // Create flowing wave geometry
  const waveGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(40, 8, 32, 8);
    return geometry;
  }, []);

  // Shader materials for flowing waves with gradients
  const waveMaterial1 = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#6366f1') },
        color2: { value: new THREE.Color('#8b5cf6') },
        opacity: { value: 0.8 }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Create flowing wave motion
          pos.z += sin(pos.x * 0.3 + time * 2.0) * 0.8;
          pos.z += sin(pos.x * 0.1 + time * 1.5) * 1.2;
          pos.y += cos(pos.x * 0.2 + time * 1.8) * 0.3;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float gradient = smoothstep(0.0, 1.0, vUv.x);
          vec3 color = mix(color1, color2, gradient);
          
          // Add glow effect
          float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
          glow = pow(glow, 2.0);
          
          gl_FragColor = vec4(color * glow, opacity * glow);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }, []);

  const waveMaterial2 = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#3b82f6') },
        color2: { value: new THREE.Color('#06ffa5') },
        opacity: { value: 0.6 }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          pos.z += sin(pos.x * 0.4 + time * 1.8) * 0.6;
          pos.z += cos(pos.x * 0.15 + time * 2.2) * 1.0;
          pos.y += sin(pos.x * 0.25 + time * 1.6) * 0.4;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float gradient = smoothstep(0.0, 1.0, vUv.x);
          vec3 color = mix(color1, color2, gradient);
          
          float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
          glow = pow(glow, 2.0);
          
          gl_FragColor = vec4(color * glow, opacity * glow);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }, []);

  const waveMaterial3 = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#8b5cf6') },
        color2: { value: new THREE.Color('#00f5ff') },
        opacity: { value: 0.4 }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          pos.z += sin(pos.x * 0.2 + time * 1.4) * 1.0;
          pos.z += cos(pos.x * 0.35 + time * 2.0) * 0.7;
          pos.y += cos(pos.x * 0.18 + time * 1.3) * 0.5;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float gradient = smoothstep(0.0, 1.0, vUv.x);
          vec3 color = mix(color1, color2, gradient);
          
          float glow = 1.0 - abs(vUv.y - 0.5) * 2.0;
          glow = pow(glow, 2.0);
          
          gl_FragColor = vec4(color * glow, opacity * glow);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Update time uniforms
    waveMaterial1.uniforms.time.value = time;
    waveMaterial2.uniforms.time.value = time;
    waveMaterial3.uniforms.time.value = time;

    // Mouse interaction - subtle parallax effect
    if (wave1Ref.current) {
      wave1Ref.current.rotation.y = mousePosition.x * 0.1;
      wave1Ref.current.rotation.x = mousePosition.y * 0.05;
    }
    
    if (wave2Ref.current) {
      wave2Ref.current.rotation.y = mousePosition.x * 0.15;
      wave2Ref.current.rotation.x = mousePosition.y * 0.08;
    }
    
    if (wave3Ref.current) {
      wave3Ref.current.rotation.y = mousePosition.x * 0.08;
      wave3Ref.current.rotation.x = mousePosition.y * 0.03;
    }
  });

  return (
    <group>
      {/* Wave 1 - Front layer */}
      <mesh
        ref={wave1Ref}
        geometry={waveGeometry}
        material={waveMaterial1}
        position={[0, 2, -5]}
        rotation={[0.2, 0, 0]}
      />
      
      {/* Wave 2 - Middle layer */}
      <mesh
        ref={wave2Ref}
        geometry={waveGeometry}
        material={waveMaterial2}
        position={[0, -1, -8]}
        rotation={[-0.1, 0, 0]}
      />
      
      {/* Wave 3 - Back layer */}
      <mesh
        ref={wave3Ref}
        geometry={waveGeometry}
        material={waveMaterial3}
        position={[0, 0, -12]}
        rotation={[0.15, 0, 0]}
      />
    </group>
  );
};