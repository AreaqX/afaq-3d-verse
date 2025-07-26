import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveTextProps {
  text: string;
  position: [number, number, number];
  size?: number;
  color?: string;
}

export const InteractiveText = ({ 
  text, 
  position, 
  size = 1, 
  color = '#06ffa5' 
}: InteractiveTextProps) => {
  const textRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y = mouse.x * 0.1;
      textRef.current.rotation.x = mouse.y * 0.1;
      textRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <Center ref={textRef} position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={size}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Text3D>
    </Center>
  );
};