import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { portfolioData } from '../../data/portfolio';

export const JourneyStation: React.FC = () => {
  const lineRef = useRef<THREE.Group>(null);
  const exp = portfolioData.experience[0];
  const edu = portfolioData.education[0];

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    lineRef.current.position.y = Math.sin(t * 0.7) * 0.1;
  });

  return (
    <group position={[0, -110, 0]}>
      {/* Station Title */}
      <Text
        position={[0, 7.5, 0]}
        fontSize={0.7}
        letterSpacing={0.14}
        color="#EDEDED"
        anchorX="center"
        anchorY="middle"
      >
        TRAJECTORY & MILESTONES
      </Text>
      <Text
        position={[0, 6.7, 0]}
        fontSize={0.25}
        color="#8E8E93"
        letterSpacing={0.06}
        anchorX="center"
        anchorY="middle"
      >
        CHRONOLOGICAL FLIGHT PATH · EXPERIENCE & FOUNDATION
      </Text>

      {/* Glowing 3D Path Line with Waypoints */}
      <group ref={lineRef}>
        {/* Main glowing trajectory beam */}
        <mesh position={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.03, 0.03, 18, 16]} />
          <meshStandardMaterial color="#C6FF3D" emissive="#C6FF3D" emissiveIntensity={0.8} />
        </mesh>

        {/* Milestone 1: Experience - Patronecs Software Company */}
        <group position={[-5.8, 2.2, 0]}>
          {/* Connector line to main beam */}
          <mesh position={[2.6, 0, 0]}>
            <boxGeometry args={[2.4, 0.02, 0.02]} />
            <meshBasicMaterial color="#C6FF3D" />
          </mesh>
          <mesh position={[3.8, 0, 0]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshBasicMaterial color="#C6FF3D" />
          </mesh>

          {/* Holographic Panel Card */}
          <mesh>
            <planeGeometry args={[5.2, 4.2]} />
            <meshBasicMaterial color="#0C1017" transparent opacity={0.92} />
          </mesh>
          <mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(5.2, 4.2)]} />
              <lineBasicMaterial color="#C6FF3D" />
            </lineSegments>
          </mesh>

          {/* Milestone Period Badge */}
          <Text
            position={[-2.2, 1.65, 0.02]}
            fontSize={0.17}
            color="#C6FF3D"
            anchorX="left"
            anchorY="middle"
          >
            {exp.period.toUpperCase()}
          </Text>

          {/* Company Name */}
          <Text
            position={[-2.2, 1.25, 0.02]}
            fontSize={0.3}
            color="#FFFFFF"
            anchorX="left"
            anchorY="middle"
          >
            {exp.company}
          </Text>

          {/* Role Title */}
          <Text
            position={[-2.2, 0.85, 0.02]}
            fontSize={0.21}
            color="#C6FF3D"
            anchorX="left"
            anchorY="middle"
          >
            {exp.role}
          </Text>

          {/* Summary */}
          <Text
            position={[-2.2, 0.25, 0.02]}
            fontSize={0.16}
            maxWidth={4.4}
            lineHeight={1.4}
            color="#B0B5C0"
            anchorX="left"
            anchorY="top"
          >
            {exp.description}
          </Text>

          {/* Key tags */}
          <group position={[-2.2, -1.5, 0.02]}>
            <Text
              fontSize={0.14}
              color="#8E8E93"
              anchorX="left"
              anchorY="middle"
            >
              8+ PROD APPS • ROW-LEVEL SECURITY • STRIPE • SQA RELEASES
            </Text>
          </group>
        </group>

        {/* Milestone 2: Education - University of Sialkot */}
        <group position={[5.8, -2.6, 0]}>
          {/* Connector line to main beam */}
          <mesh position={[-2.6, 0, 0]}>
            <boxGeometry args={[2.4, 0.02, 0.02]} />
            <meshBasicMaterial color="#EDEDED" />
          </mesh>
          <mesh position={[-3.8, 0, 0]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshBasicMaterial color="#EDEDED" />
          </mesh>

          {/* Holographic Panel Card */}
          <mesh>
            <planeGeometry args={[5.2, 3.8]} />
            <meshBasicMaterial color="#0C1017" transparent opacity={0.92} />
          </mesh>
          <mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(5.2, 3.8)]} />
              <lineBasicMaterial color="#303744" />
            </lineSegments>
          </mesh>

          {/* Period */}
          <Text
            position={[-2.2, 1.45, 0.02]}
            fontSize={0.17}
            color="#8E8E93"
            anchorX="left"
            anchorY="middle"
          >
            {edu.period} · EDUCATION
          </Text>

          {/* Degree */}
          <Text
            position={[-2.2, 1.05, 0.02]}
            fontSize={0.3}
            color="#FFFFFF"
            anchorX="left"
            anchorY="middle"
          >
            {edu.degree}
          </Text>

          {/* Institution */}
          <Text
            position={[-2.2, 0.65, 0.02]}
            fontSize={0.21}
            color="#C6FF3D"
            anchorX="left"
            anchorY="middle"
          >
            {edu.institution}
          </Text>

          {/* Details */}
          <Text
            position={[-2.2, 0.1, 0.02]}
            fontSize={0.16}
            maxWidth={4.4}
            lineHeight={1.4}
            color="#B0B5C0"
            anchorX="left"
            anchorY="top"
          >
            {edu.details || ''}
          </Text>

          {/* Key tags */}
          <group position={[-2.2, -1.3, 0.02]}>
            <Text
              fontSize={0.14}
              color="#8E8E93"
              anchorX="left"
              anchorY="middle"
            >
              ALGORITHMS • SQA & VERIFICATION • DISTRIBUTED SYSTEMS
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
};
