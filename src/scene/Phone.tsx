import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Project } from '../data/portfolio';

interface PhoneProps {
  project: Project;
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  isLowPerformance?: boolean;
}

// Generate a high-resolution, beautiful procedural canvas texture for the smartphone screen
function createPhoneCanvas(project: Project): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
  gradient.addColorStop(0, '#0D1117');
  gradient.addColorStop(0.5, '#07080A');
  gradient.addColorStop(1, '#020305');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 1024);

  // Status Bar
  ctx.fillStyle = '#EDEDED';
  ctx.font = '600 24px "Space Grotesk", sans-serif';
  ctx.fillText('09:41', 40, 55);

  // Status icons (battery, wifi, signal)
  ctx.strokeStyle = '#EDEDED';
  ctx.lineWidth = 2.5;
  // Battery outline
  ctx.strokeRect(420, 38, 44, 22);
  ctx.fillStyle = '#00E5FF';
  ctx.fillRect(424, 42, 28, 14);
  // Wifi waves
  ctx.beginPath();
  ctx.arc(385, 48, 12, Math.PI * 1.25, Math.PI * 1.75);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(385, 48, 6, Math.PI * 1.25, Math.PI * 1.75);
  ctx.stroke();

  // Dynamic Island / Camera Notch Pill
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.roundRect(176, 26, 160, 36, 18);
  ctx.fill();

  // App Header Accent Glow
  const accentGlow = ctx.createRadialGradient(256, 180, 10, 256, 180, 220);
  accentGlow.addColorStop(0, (project.color || '#00E5FF') + '44');
  accentGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = accentGlow;
  ctx.fillRect(0, 70, 512, 280);

  // App Logo/Badge Circle
  ctx.fillStyle = project.color || '#00E5FF';
  ctx.beginPath();
  ctx.arc(256, 170, 48, 0, Math.PI * 2);
  ctx.fill();
  
  // App initial inside badge
  ctx.fillStyle = '#07080A';
  ctx.font = 'bold 44px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(project.title.charAt(0), 256, 186);

  // App Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillText(project.title, 256, 255);

  // Subtitle / Category
  ctx.fillStyle = '#8E8E93';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText(project.subtitle.toUpperCase(), 256, 290);

  // Tech tags preview row
  const tagsText = project.tech.slice(0, 3).join(' • ');
  ctx.fillStyle = '#00E5FF';
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText(tagsText, 256, 325);

  // Wireframe UI mock components
  // Card 1: Metric / Status Card
  ctx.fillStyle = '#161B22';
  ctx.beginPath();
  ctx.roundRect(40, 360, 432, 130, 16);
  ctx.fill();
  ctx.strokeStyle = '#28303C';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Line in card
  ctx.fillStyle = '#EDEDED';
  ctx.font = '600 20px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('FEATURED HIGHLIGHTS', 65, 400);
  ctx.fillStyle = '#8E8E93';
  ctx.font = '16px "Space Grotesk", sans-serif';
  const previewLine = project.whatIDid[0] || 'Production-grade cross-platform deployment';
  const truncatedLine = previewLine.length > 38 ? previewLine.substring(0, 35) + '...' : previewLine;
  ctx.fillText(truncatedLine, 65, 435);

  // Mini progress/accent bar
  ctx.fillStyle = '#202632';
  ctx.beginPath();
  ctx.roundRect(65, 455, 382, 8, 4);
  ctx.fill();
  ctx.fillStyle = project.color || '#00E5FF';
  ctx.beginPath();
  ctx.roundRect(65, 455, 260, 8, 4);
  ctx.fill();

  // Card 2: Interactive Grid Items (Mock UI elements)
  const gridY = 515;
  for (let i = 0; i < 4; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const itemX = 40 + col * 224;
    const itemY = gridY + row * 160;

    ctx.fillStyle = '#11151C';
    ctx.beginPath();
    ctx.roundRect(itemX, itemY, 208, 140, 14);
    ctx.fill();
    ctx.strokeStyle = '#1F2633';
    ctx.stroke();

    // Circle icon in mock box
    ctx.fillStyle = (project.color || '#00E5FF') + '33';
    ctx.beginPath();
    ctx.arc(itemX + 40, itemY + 45, 20, 0, Math.PI * 2);
    ctx.fill();

    // Wireframe content bars
    ctx.fillStyle = '#3A4250';
    ctx.beginPath();
    ctx.roundRect(itemX + 75, itemY + 38, 95, 12, 6);
    ctx.fill();

    ctx.fillStyle = '#262D38';
    ctx.beginPath();
    ctx.roundRect(itemX + 25, itemY + 85, 158, 10, 5);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(itemX + 25, itemY + 105, 110, 8, 4);
    ctx.fill();
  }

  // Floating Action Button
  ctx.fillStyle = '#00E5FF';
  ctx.shadowColor = 'rgba(198, 255, 61, 0.4)';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(420, 880, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#07080A';
  ctx.font = 'bold 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('+', 420, 892);

  // Bottom Navigation Bar
  ctx.fillStyle = '#0B0E14';
  ctx.fillRect(0, 930, 512, 94);
  ctx.strokeStyle = '#1E2530';
  ctx.beginPath();
  ctx.moveTo(0, 930);
  ctx.lineTo(512, 930);
  ctx.stroke();

  // Nav icons (4 dots/rects)
  for (let b = 0; b < 4; b++) {
    const navX = 64 + b * 128;
    ctx.fillStyle = b === 0 ? (project.color || '#00E5FF') : '#4B5563';
    ctx.beginPath();
    ctx.arc(navX, 965, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Home indicator bar at bottom
  ctx.fillStyle = '#5A6372';
  ctx.beginPath();
  ctx.roundRect(186, 1005, 140, 5, 2.5);
  ctx.fill();

  return canvas;
}

export const Phone: React.FC<PhoneProps> = ({
  project,
  isActive,
  isHovered,
  onHover,
  onClick,
  isLowPerformance = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Generate procedural canvas texture or load screenshot if available
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  React.useEffect(() => {
    const canvas = createPhoneCanvas(project);
    const dynamicTexture = new THREE.CanvasTexture(canvas);
    dynamicTexture.colorSpace = THREE.SRGBColorSpace;
    dynamicTexture.minFilter = THREE.LinearFilter;
    dynamicTexture.generateMipmaps = false;

    // Check if screenshot exists and can be loaded
    if (project.screenshot) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          dynamicTexture.needsUpdate = true;
        }
      };
      img.src = project.screenshot;
    }

    setTexture(dynamicTexture);

    return () => {
      dynamicTexture.dispose();
    };
  }, [project]);

  // Dimensions of phone
  const width = 2.1;
  const height = 4.3;
  const depth = 0.22;
  const cornerRadius = 0.15;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isActive) {
      // Look straight forward when active
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 8, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 8, delta);
    } else if (isHovered) {
      // Tilt subtly towards pointer
      const pointer = state.pointer;
      targetRotation.current.x = -pointer.y * 0.25;
      targetRotation.current.y = pointer.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotation.current.x, 6, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotation.current.y, 6, delta);
    } else {
      // Subtle gentle floating idle
      const t = state.clock.getElapsedTime() + (project.title.charCodeAt(0) % 10);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, Math.sin(t * 0.8) * 0.05, 3, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 3, delta);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      scale={isActive ? 1.08 : isHovered ? 1.05 : 1}
    >
      {/* Phone Body / Outer Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={isHovered || isActive ? "#181D24" : "#0E1116"}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Outer Metallic Bezel Ring */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.04, height + 0.04, depth * 0.9]} />
        <meshStandardMaterial
          color={isHovered ? "#00E5FF" : "#242A35"}
          emissive={isHovered ? "#00E5FF" : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Screen Mesh */}
      <mesh position={[0, 0, depth / 2 + 0.005]}>
        <planeGeometry args={[width * 0.92, height * 0.94]} />
        {texture && (
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
          />
        )}
      </mesh>

      {/* Screen Gloss Glass Overlay */}
      <mesh position={[0, 0, depth / 2 + 0.008]}>
        <planeGeometry args={[width * 0.92, height * 0.94]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.15}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Camera Module on Back */}
      <group position={[0.45, 1.4, -depth / 2 - 0.04]}>
        <mesh>
          <boxGeometry args={[0.7, 0.7, 0.08]} />
          <meshStandardMaterial color="#14181F" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Lenses */}
        <mesh position={[-0.16, 0.16, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
          <meshStandardMaterial color="#050709" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.16, 0.16, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
          <meshStandardMaterial color="#050709" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.16, -0.16, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
          <meshStandardMaterial color="#050709" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Hover Electric Glow Ring */}
      {(isHovered || isActive) && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[width + 0.5, height + 0.5]} />
          <meshBasicMaterial
            color={project.color || "#00E5FF"}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};
