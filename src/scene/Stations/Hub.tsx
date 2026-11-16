import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { portfolioData } from '../../data/portfolio';
import { useNav } from '../../store/useNav';

export const HubStation: React.FC = () => {
  const goToStation = useNav((state) => state.goToStation);
  const currentStation = useNav((state) => state.currentStation);
  const groupRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  // Cycling roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleOpacity, setRoleOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setRoleOpacity(0);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % portfolioData.profile.roles.length);
        setRoleOpacity(1);
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (!textGroupRef.current) return;
    const pointer = state.pointer;
    // Gentle cursor reaction
    const targetRotX = -pointer.y * 0.08;
    const targetRotY = pointer.x * 0.12;
    textGroupRef.current.rotation.x = THREE.MathUtils.damp(textGroupRef.current.rotation.x, targetRotX, 4, delta);
    textGroupRef.current.rotation.y = THREE.MathUtils.damp(textGroupRef.current.rotation.y, targetRotY, 4, delta);

    // Idle subtle float
    const t = state.clock.getElapsedTime();
    textGroupRef.current.position.y = Math.sin(t * 0.9) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Background Subtle Geometric Halo Ring */}
      <mesh position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.8, 8.0, 64]} />
        <meshBasicMaterial color="#20232A" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11.5, 11.6, 64]} />
        <meshBasicMaterial color="#C6FF3D" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Main Interactive Floating Text Cluster */}
      <group ref={textGroupRef}>
        {/* Name Title */}
        <Text
          position={[0, 1.8, 0]}
          fontSize={1.75}
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
          letterSpacing={-0.03}
          color="#EDEDED"
          anchorX="center"
          anchorY="middle"
        >
          AFAQ MEHMOOD
        </Text>

        {/* Dynamic Morphing Role */}
        <group position={[0, 0.45, 0]}>
          <Text
            fontSize={0.52}
            font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
            letterSpacing={0.08}
            color="#C6FF3D"
            fillOpacity={roleOpacity}
            anchorX="center"
            anchorY="middle"
          >
            {portfolioData.profile.roles[roleIndex].toUpperCase()}
          </Text>
        </group>

        {/* Tagline */}
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.32}
          maxWidth={12}
          textAlign="center"
          color="#8E8E93"
          letterSpacing={0.01}
          anchorX="center"
          anchorY="middle"
        >
          {portfolioData.profile.tagline}
        </Text>

        {/* Badges Cluster */}
        <group position={[0, -1.3, 0]}>
          {/* Location Badge */}
          <group position={[-3.2, 0, 0]}>
            <mesh>
              <planeGeometry args={[2.8, 0.5]} />
              <meshBasicMaterial color="#12161E" transparent opacity={0.8} />
            </mesh>
            <mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 0.5)]} />
                <lineBasicMaterial color="#2B3240" />
              </lineSegments>
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.19}
              color="#EDEDED"
              letterSpacing={0.04}
              anchorX="center"
              anchorY="middle"
            >
              📍 SIALKOT, PK
            </Text>
          </group>

          {/* Relocation Status Badge */}
          <group position={[0.2, 0, 0]}>
            <mesh>
              <planeGeometry args={[3.6, 0.5]} />
              <meshBasicMaterial color="#12161E" transparent opacity={0.8} />
            </mesh>
            <mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(3.6, 0.5)]} />
                <lineBasicMaterial color="#C6FF3D" transparent opacity={0.5} />
              </lineSegments>
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.19}
              color="#C6FF3D"
              letterSpacing={0.04}
              anchorX="center"
              anchorY="middle"
            >
              ✈ OPEN TO UAE / GCC
            </Text>
          </group>

          {/* CV Download 3D Button */}
          <group
            position={[3.4, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              window.open('/Afaq_Mehmood_Resume.pdf', '_blank');
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'default')}
          >
            <mesh>
              <planeGeometry args={[2.4, 0.5]} />
              <meshBasicMaterial color="#C6FF3D" />
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.18}
              color="#07080A"
              letterSpacing={0.06}
              anchorX="center"
              anchorY="middle"
            >
              DOWNLOAD CV ↓
            </Text>
          </group>
        </group>

        {/* Glowing Enter Prompt */}
        <group
          position={[0, -2.5, 0]}
          onClick={(e) => {
            e.stopPropagation();
            goToStation(1);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          <mesh>
            <planeGeometry args={[5.2, 0.7]} />
            <meshBasicMaterial color="#0C1017" transparent opacity={0.85} />
          </mesh>
          <mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(5.2, 0.7)]} />
              <lineBasicMaterial color="#C6FF3D" />
            </lineSegments>
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.24}
            color="#C6FF3D"
            letterSpacing={0.12}
            anchorX="center"
            anchorY="middle"
          >
            ENTER THE FLIGHT  ▶
          </Text>
        </group>
      </group>
    </group>
  );
};
