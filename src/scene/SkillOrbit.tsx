import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { portfolioData, SkillCategory } from '../data/portfolio';
import { useNav } from '../store/useNav';

interface OrbitalRingProps {
  category: SkillCategory;
  radius: number;
  rotationSpeed: number;
  tiltAngle: [number, number, number];
}

const OrbitalRing: React.FC<OrbitalRingProps> = ({
  category,
  radius,
  rotationSpeed,
  tiltAngle
}) => {
  const ringRef = useRef<THREE.Group>(null);
  const skillsCount = category.skills.length;

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += rotationSpeed * delta;
  });

  return (
    <group rotation={tiltAngle}>
      {/* Glowing Orbital Path Ring */}
      <mesh>
        <torusGeometry args={[radius, 0.03, 12, 96]} />
        <meshStandardMaterial
          color={category.color}
          emissive={category.color}
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Nodes */}
      <group ref={ringRef}>
        {category.skills.map((skill, index) => {
          const angle = (index / skillsCount) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <group key={skill.name} position={[x, y, 0]}>
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={category.color}
                  emissive={category.color}
                  emissiveIntensity={0.9}
                  roughness={0.2}
                />
              </mesh>
              <mesh>
                <ringGeometry args={[0.3, 0.35, 24]} />
                <meshBasicMaterial
                  color={category.color}
                  transparent
                  opacity={0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

export const SkillOrbit: React.FC = () => {
  return (
    <group>
      {/* Central Core Reactor */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#0B0E14"
          emissive="#C6FF3D"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial
          color="#C6FF3D"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Ring 0: Mobile Development */}
      <OrbitalRing
        category={portfolioData.skills[0]}
        radius={4.5}
        rotationSpeed={0.15}
        tiltAngle={[0.3, 0.2, 0]}
      />

      {/* Ring 1: Software Engineering */}
      <OrbitalRing
        category={portfolioData.skills[1]}
        radius={7.5}
        rotationSpeed={-0.1}
        tiltAngle={[-0.2, -0.3, 0]}
      />

      {/* Ring 2: SQA & Testing */}
      <OrbitalRing
        category={portfolioData.skills[2]}
        radius={10.5}
        rotationSpeed={0.08}
        tiltAngle={[0.15, -0.15, 0.2]}
      />
    </group>
  );
};
