import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useNav } from '../store/useNav';

interface BugData {
  id: number;
  initialPos: [number, number, number];
  speed: number;
  phase: number;
  radius: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  color: string;
}

export const BugField: React.FC = () => {
  const squashBug = useNav((state) => state.squashBug);
  const [squashedIds, setSquashedIds] = useState<Set<number>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate 7 drifting bugs placed across stations
  const bugs = useMemo<BugData[]>(() => {
    return [
      { id: 1, initialPos: [4, 1, 10], speed: 0.6, phase: 0.2, radius: 2.5, color: '#C6FF3D' },
      { id: 2, initialPos: [-5, -34, 12], speed: 0.8, phase: 1.5, radius: 3.2, color: '#9AE600' },
      { id: 3, initialPos: [40, -68, 14], speed: 0.5, phase: 2.8, radius: 2.8, color: '#C6FF3D' },
      { id: 4, initialPos: [-4, -108, 15], speed: 0.7, phase: 4.1, radius: 3.5, color: '#88B81E' },
      { id: 5, initialPos: [-32, -148, 12], speed: 0.6, phase: 5.3, radius: 2.6, color: '#C6FF3D' },
      { id: 6, initialPos: [6, -25, 14], speed: 0.9, phase: 3.0, radius: 3.0, color: '#9AE600' },
      { id: 7, initialPos: [32, -75, 16], speed: 0.5, phase: 0.9, radius: 2.2, color: '#C6FF3D' }
    ];
  }, []);

  const bugRefs = useRef<{ [id: number]: THREE.Group | null }>({});

  const handleSquash = (bug: BugData, currentPos: THREE.Vector3) => {
    squashBug();
    setSquashedIds((prev) => new Set(prev).add(bug.id));

    // Create particle explosion
    const newParticles: Particle[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 1.8 + Math.random() * 2.2;
      newParticles.push({
        x: currentPos.x,
        y: currentPos.y,
        z: currentPos.z,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2.5,
        life: 1,
        maxLife: 1,
        color: bug.color
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);

    // Respawn bug after 12 seconds
    setTimeout(() => {
      setSquashedIds((prev) => {
        const next = new Set(prev);
        next.delete(bug.id);
        return next;
      });
    }, 12000);
  };

  // Animate bugs and particles
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    bugs.forEach((bug) => {
      const group = bugRefs.current[bug.id];
      if (!group || squashedIds.has(bug.id)) return;

      const t = time * bug.speed + bug.phase;
      // Figure-8 / gentle orbit around initial position
      group.position.x = bug.initialPos[0] + Math.sin(t) * bug.radius;
      group.position.y = bug.initialPos[1] + Math.cos(t * 0.7) * (bug.radius * 0.6);
      group.position.z = bug.initialPos[2] + Math.sin(t * 1.3) * 0.8;

      // Slight tilt toward movement direction
      group.rotation.y = Math.cos(t) * 0.5;
      group.rotation.z = Math.sin(t * 0.8) * 0.3;
    });

    // Update particles
    if (particles.length > 0) {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * delta,
            y: p.y + p.vy * delta,
            z: p.z + p.vz * delta,
            life: p.life - delta * 1.6
          }))
          .filter((p) => p.life > 0)
      );
    }
  });

  return (
    <group>
      {bugs.map((bug) => {
        if (squashedIds.has(bug.id)) return null;

        return (
          <group
            key={bug.id}
            ref={(el) => (bugRefs.current[bug.id] = el)}
            position={bug.initialPos}
            onClick={(e) => {
              e.stopPropagation();
              const group = bugRefs.current[bug.id];
              const pos = group ? group.position.clone() : new THREE.Vector3(...bug.initialPos);
              handleSquash(bug, pos);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'crosshair';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
            }}
          >
            {/* Click hit area */}
            <mesh visible={false}>
              <sphereGeometry args={[0.55, 8, 8]} />
              <meshBasicMaterial />
            </mesh>

            {/* Glowing Bug Body */}
            <mesh>
              <sphereGeometry args={[0.14, 12, 12]} />
              <meshStandardMaterial
                color={bug.color}
                emissive={bug.color}
                emissiveIntensity={1.2}
                roughness={0.2}
              />
            </mesh>

            {/* Head */}
            <mesh position={[0.12, 0, 0]}>
              <sphereGeometry args={[0.08, 10, 10]} />
              <meshStandardMaterial
                color="#0E1217"
                emissive={bug.color}
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Glowing Eyes */}
            <mesh position={[0.17, 0.04, 0.04]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0.17, 0.04, -0.04]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>

            {/* Tiny Wings */}
            <mesh position={[-0.04, 0.08, 0.1]} rotation={[0.4, 0.2, 0]}>
              <boxGeometry args={[0.16, 0.015, 0.12]} />
              <meshStandardMaterial
                color={bug.color}
                transparent
                opacity={0.65}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[-0.04, 0.08, -0.1]} rotation={[-0.4, -0.2, 0]}>
              <boxGeometry args={[0.16, 0.015, 0.12]} />
              <meshStandardMaterial
                color={bug.color}
                transparent
                opacity={0.65}
                roughness={0.1}
              />
            </mesh>

            {/* Antennae */}
            <mesh position={[0.2, 0.08, 0.04]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.008, 0.008, 0.12, 4]} />
              <meshBasicMaterial color={bug.color} />
            </mesh>
            <mesh position={[0.2, 0.08, -0.04]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.008, 0.008, 0.12, 4]} />
              <meshBasicMaterial color={bug.color} />
            </mesh>
          </group>
        );
      })}

      {/* Squash Particles */}
      {particles.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]}>
          <boxGeometry args={[0.06 * p.life, 0.06 * p.life, 0.06 * p.life]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={p.life / p.maxLife}
          />
        </mesh>
      ))}
    </group>
  );
};
