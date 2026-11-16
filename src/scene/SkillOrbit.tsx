import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { portfolioData, SkillCategory, SkillNode } from '../data/portfolio';
import { useNav } from '../store/useNav';

interface OrbitalRingProps {
  category: SkillCategory;
  radius: number;
  rotationSpeed: number;
  tiltAngle: [number, number, number];
  onHoverSkill: (skill: { name: string; context: string; category: string } | null) => void;
  hoveredSkillName: string | null;
}

const OrbitalRing: React.FC<OrbitalRingProps> = ({
  category,
  radius,
  rotationSpeed,
  tiltAngle,
  onHoverSkill,
  hoveredSkillName
}) => {
  const ringRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const previousPointerX = useRef(0);
  const manualVelocity = useRef(0);

  const skillsCount = category.skills.length;

  useFrame((_, delta) => {
    if (!ringRef.current) return;

    if (!isDragging.current) {
      // Apply momentum friction
      manualVelocity.current = THREE.MathUtils.damp(manualVelocity.current, 0, 3, delta);
      // Auto-rotation + momentum
      ringRef.current.rotation.z += (rotationSpeed + manualVelocity.current) * delta;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    previousPointerX.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current || !ringRef.current) return;
    const deltaX = e.clientX - previousPointerX.current;
    previousPointerX.current = e.clientX;
    manualVelocity.current = deltaX * 0.04;
    ringRef.current.rotation.z += deltaX * 0.01;
  };

  return (
    <group rotation={tiltAngle}>
      {/* Invisible thicker interaction torus for dragging */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerMove={handlePointerMove}
        visible={false}
      >
        <torusGeometry args={[radius, 0.6, 8, 48]} />
        <meshBasicMaterial />
      </mesh>

      {/* Visible Thin Glowing Orbital Path */}
      <mesh>
        <torusGeometry args={[radius, 0.025, 12, 96]} />
        <meshStandardMaterial
          color={category.color}
          emissive={category.color}
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Ring Category Name Indicator */}
      <group position={[radius, 0, 0]}>
        <Text
          fontSize={0.22}
          color={category.color}
          letterSpacing={0.08}
          anchorX="left"
          anchorY="middle"
        >
          {`// ${category.name.toUpperCase()}`}
        </Text>
      </group>

      {/* Orbiting Skills Group */}
      <group ref={ringRef}>
        {category.skills.map((skill, index) => {
          const angle = (index / skillsCount) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isHovered = hoveredSkillName === skill.name;

          return (
            <group
              key={skill.name}
              position={[x, y, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverSkill({ name: skill.name, context: skill.context, category: category.name });
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                onHoverSkill(null);
                document.body.style.cursor = 'default';
              }}
            >
              {/* Hit target sphere */}
              <mesh visible={false}>
                <sphereGeometry args={[0.65, 8, 8]} />
                <meshBasicMaterial />
              </mesh>

              {/* Glowing Node Core */}
              <mesh scale={isHovered ? 1.6 : 1}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                  color={category.color}
                  emissive={category.color}
                  emissiveIntensity={isHovered ? 1.8 : 0.8}
                  roughness={0.2}
                />
              </mesh>

              {/* Halo ring around node */}
              <mesh scale={isHovered ? 1.8 : 1}>
                <ringGeometry args={[0.26, 0.3, 24]} />
                <meshBasicMaterial
                  color={category.color}
                  transparent
                  opacity={isHovered ? 0.9 : 0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Skill Name Label */}
              <Text
                position={[0, -0.42, 0.05]}
                fontSize={0.24}
                letterSpacing={0.02}
                color={isHovered ? '#FFFFFF' : '#EDEDED'}
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>

              {/* Context Floating Tooltip on Hover */}
              {isHovered && (
                <group position={[0, 0.7, 0.2]}>
                  <mesh>
                    <planeGeometry args={[Math.min(skill.context.length * 0.11 + 0.8, 5.8), 0.55]} />
                    <meshBasicMaterial color="#0A0E14" transparent opacity={0.95} />
                  </mesh>
                  <mesh>
                    <lineSegments>
                      <edgesGeometry
                        args={[
                          new THREE.PlaneGeometry(
                            Math.min(skill.context.length * 0.11 + 0.8, 5.8),
                            0.55
                          )
                        ]}
                      />
                      <lineBasicMaterial color={category.color} />
                    </lineSegments>
                  </mesh>
                  <Text
                    position={[0, 0, 0.02]}
                    fontSize={0.17}
                    color={category.color}
                    maxWidth={5.4}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                  >
                    {skill.context}
                  </Text>
                </group>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
};

export const SkillOrbit: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    context: string;
    category: string;
  } | null>(null);

  const setSelectedSkill = useNav((state) => state.setSelectedSkill);

  const handleHover = (skill: { name: string; context: string; category: string } | null) => {
    setHoveredSkill(skill);
    setSelectedSkill(skill);
  };

  return (
    <group>
      {/* Central Core Reactor */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#0B0E14"
          emissive="#C6FF3D"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.15, 16, 16]} />
        <meshBasicMaterial
          color="#C6FF3D"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <Text
        position={[0, 0, 1.25]}
        fontSize={0.22}
        color="#C6FF3D"
        letterSpacing={0.1}
        anchorX="center"
        anchorY="middle"
      >
        CORE
      </Text>

      {/* Ring 0: Mobile Development */}
      <OrbitalRing
        category={portfolioData.skills[0]}
        radius={4.2}
        rotationSpeed={0.14}
        tiltAngle={[0.3, 0.2, 0]}
        onHoverSkill={handleHover}
        hoveredSkillName={hoveredSkill?.name || null}
      />

      {/* Ring 1: Software Engineering */}
      <OrbitalRing
        category={portfolioData.skills[1]}
        radius={7.2}
        rotationSpeed={-0.09}
        tiltAngle={[-0.2, -0.3, 0]}
        onHoverSkill={handleHover}
        hoveredSkillName={hoveredSkill?.name || null}
      />

      {/* Ring 2: SQA & Testing */}
      <OrbitalRing
        category={portfolioData.skills[2]}
        radius={10.2}
        rotationSpeed={0.07}
        tiltAngle={[0.15, -0.15, 0.2]}
        onHoverSkill={handleHover}
        hoveredSkillName={hoveredSkill?.name || null}
      />
    </group>
  );
};
