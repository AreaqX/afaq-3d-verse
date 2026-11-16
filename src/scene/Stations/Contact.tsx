import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { portfolioData } from '../../data/portfolio';
import { useNav } from '../../store/useNav';

export const ContactStation: React.FC = () => {
  const addToast = useNav((state) => state.addToast);
  const beaconRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!beaconRef.current) return;
    const t = state.clock.getElapsedTime();

    // Pulse scale
    const pulse = 1 + Math.sin(t * 2.5) * 0.08;
    beaconRef.current.scale.set(pulse, pulse, pulse);

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.7;
    }
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast('Email copied to clipboard (YOUR_EMAIL_HERE)', 'success');
  };

  return (
    <group position={[-35, -150, 0]}>
      {/* 3D Pulsing Beacon Core */}
      <group position={[0, 4.2, 0]}>
        <group ref={beaconRef}>
          {/* Inner crystal core */}
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
              color="#0F131A"
              emissive="#C6FF3D"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Orbiting Gyro Energy Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.03, 16, 64]} />
          <meshBasicMaterial color="#C6FF3D" transparent opacity={0.7} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#9AE600" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Main Heading Text */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.85}
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
        letterSpacing={-0.02}
        color="#EDEDED"
        anchorX="center"
        anchorY="middle"
      >
        LET'S BUILD SOMETHING RELIABLE.
      </Text>

      {/* Subtitle / Availability */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.24}
        maxWidth={14}
        textAlign="center"
        color="#8E8E93"
        letterSpacing={0.04}
        anchorX="center"
        anchorY="middle"
      >
        SIALKOT, PK · OPEN TO RELOCATION (UAE / GCC) & LAHORE · AVAILABLE WITHIN 1 MONTH
      </Text>

      {/* 4 Interactive Static Contact Action Buttons */}
      <group position={[0, -1.8, 0]}>
        {/* Button 1: Mailto */}
        <group
          position={[-4.5, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `mailto:${portfolioData.profile.email}`;
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          <mesh>
            <planeGeometry args={[2.6, 0.7]} />
            <meshBasicMaterial color="#C6FF3D" />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOt5uSU.woff"
            color="#07080A"
            letterSpacing={0.05}
            anchorX="center"
            anchorY="middle"
          >
            SEND EMAIL ↗
          </Text>
        </group>

        {/* Button 2: Copy Email */}
        <group
          position={[-1.5, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleCopyEmail();
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          <mesh>
            <planeGeometry args={[2.6, 0.7]} />
            <meshBasicMaterial color="#121720" transparent opacity={0.9} />
          </mesh>
          <mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(2.6, 0.7)]} />
              <lineBasicMaterial color="#C6FF3D" />
            </lineSegments>
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOt5uSU.woff"
            color="#C6FF3D"
            letterSpacing={0.05}
            anchorX="center"
            anchorY="middle"
          >
            COPY EMAIL 📋
          </Text>
        </group>

        {/* Button 3: LinkedIn */}
        <group
          position={[1.5, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            window.open(portfolioData.profile.linkedin, '_blank');
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          <mesh>
            <planeGeometry args={[2.6, 0.7]} />
            <meshBasicMaterial color="#121720" transparent opacity={0.9} />
          </mesh>
          <mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(2.6, 0.7)]} />
              <lineBasicMaterial color="#3A4354" />
            </lineSegments>
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOt5uSU.woff"
            color="#EDEDED"
            letterSpacing={0.05}
            anchorX="center"
            anchorY="middle"
          >
            LINKEDIN ↗
          </Text>
        </group>

        {/* Button 4: Download CV */}
        <group
          position={[4.5, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            window.open(portfolioData.profile.cv, '_blank');
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          <mesh>
            <planeGeometry args={[2.6, 0.7]} />
            <meshBasicMaterial color="#121720" transparent opacity={0.9} />
          </mesh>
          <mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(2.6, 0.7)]} />
              <lineBasicMaterial color="#3A4354" />
            </lineSegments>
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOt5uSU.woff"
            color="#EDEDED"
            letterSpacing={0.05}
            anchorX="center"
            anchorY="middle"
          >
            RESUME PDF ↓
          </Text>
        </group>
      </group>
    </group>
  );
};
