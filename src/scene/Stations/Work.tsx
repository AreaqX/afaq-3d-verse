import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { portfolioData, Project } from '../../data/portfolio';
import { useNav } from '../../store/useNav';
import { Phone } from '../Phone';

export const WorkStation: React.FC = () => {
  const activeProject = useNav((state) => state.activeProject);
  const setActiveProject = useNav((state) => state.setActiveProject);
  const categoryFilter = useNav((state) => state.categoryFilter);
  const setCategoryFilter = useNav((state) => state.setCategoryFilter);
  const isLowPerformance = useNav((state) => state.isLowPerformance);

  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const ringRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(0);

  // Filter projects according to categoryFilter
  const displayedProjects = useMemo(() => {
    if (categoryFilter === 'All') {
      return portfolioData.projects.filter((p) => p.featured);
    }
    if (categoryFilter === 'Research') {
      // Convert research items to project shape for unified display
      return portfolioData.research.map((r) => ({
        id: r.id,
        title: r.title,
        subtitle: 'LAB EXPLORATION',
        description: r.description,
        category: 'Research' as const,
        tech: r.tags,
        platforms: ['Web' as const],
        whatIDid: [
          'Evaluated cutting-edge architectures and developer workflows',
          'Authored benchmarks and prototype integrations',
          'Documented production feasibility and security implications'
        ],
        color: '#C6FF3D',
        featured: false
      }));
    }
    return portfolioData.projects.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const count = displayedProjects.length;
  const radius = 9.5;

  // Auto-rotate the ring when not actively inspecting a single project
  useFrame((_, delta) => {
    if (!ringRef.current) return;

    if (activeProject) {
      // Find index of active project and rotate ring so that phone is directly facing front (angle = 0)
      const activeIndex = displayedProjects.findIndex((p) => p.id === activeProject.id);
      if (activeIndex !== -1) {
        const targetAngle = -(activeIndex / count) * Math.PI * 2;
        // Smoothly interpolate towards target angle
        ringRef.current.rotation.y = THREE.MathUtils.damp(ringRef.current.rotation.y, targetAngle, 5, delta);
      }
    } else {
      // Slow continuous ambient drift
      ringRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={[0, -35, 0]}>
      {/* Category Header Title */}
      <Text
        position={[0, 6.2, 0]}
        fontSize={0.65}
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
        letterSpacing={0.12}
        color="#EDEDED"
        anchorX="center"
        anchorY="middle"
      >
        DEVICE CONSTELLATION
      </Text>
      <Text
        position={[0, 5.4, 0]}
        fontSize={0.24}
        color="#8E8E93"
        letterSpacing={0.08}
        anchorX="center"
        anchorY="middle"
      >
        SELECT ANY DEVICE TO INSPECT PRODUCTION ARCHITECTURE · ESC TO RETURN
      </Text>

      {/* Orbital Ring Guide Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 96]} />
        <meshBasicMaterial color="#202633" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <ringGeometry args={[radius * 0.45, radius * 0.45 + 0.04, 64]} />
        <meshBasicMaterial color="#C6FF3D" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Ring of Phones / Devices */}
      <group ref={ringRef}>
        {displayedProjects.map((project, index) => {
          const angle = (index / count) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          // Slight vertical wave for dynamic helix
          const y = Math.sin(angle * 2) * 0.4;
          const isSelected = activeProject?.id === project.id;
          const isHovered = hoveredProjectId === project.id;

          return (
            <group
              key={project.id}
              position={[x, y, z]}
              rotation={[0, angle, 0]} // Face outward from ring
            >
              <Phone
                project={project}
                isActive={isSelected}
                isHovered={isHovered}
                onHover={(hovered) => {
                  setHoveredProjectId(hovered ? project.id : null);
                  document.body.style.cursor = hovered ? 'pointer' : 'default';
                }}
                onClick={() => {
                  setActiveProject(project);
                }}
                isLowPerformance={isLowPerformance}
              />

              {/* Hover 3D Tag floating below phone */}
              {isHovered && !isSelected && (
                <group position={[0, -2.8, 0]}>
                  <mesh>
                    <planeGeometry args={[3.2, 0.6]} />
                    <meshBasicMaterial color="#0E1218" transparent opacity={0.9} />
                  </mesh>
                  <mesh>
                    <lineSegments>
                      <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 0.6)]} />
                      <lineBasicMaterial color="#C6FF3D" />
                    </lineSegments>
                  </mesh>
                  <Text
                    position={[0, 0, 0.02]}
                    fontSize={0.2}
                    color="#FFFFFF"
                    letterSpacing={0.06}
                    anchorX="center"
                    anchorY="middle"
                  >
                    {project.title.toUpperCase()}
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
