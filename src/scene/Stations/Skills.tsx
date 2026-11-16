import React from 'react';
import { Text } from '@react-three/drei';
import { SkillOrbit } from '../SkillOrbit';

export const SkillsStation: React.FC = () => {
  return (
    <group position={[45, -70, 0]}>
      {/* Title */}
      <Text
        position={[0, 8.5, 0]}
        fontSize={0.7}
        letterSpacing={0.14}
        color="#EDEDED"
        anchorX="center"
        anchorY="middle"
      >
        SKILL ORBIT
      </Text>
      <Text
        position={[0, 7.7, 0]}
        fontSize={0.25}
        color="#8E8E93"
        letterSpacing={0.06}
        anchorX="center"
        anchorY="middle"
      >
        HOVER NODES TO INSPECT PRODUCTION EXPERIENCE · DRAG RINGS TO ROTATE
      </Text>

      {/* 3D Orbit System */}
      <SkillOrbit />
    </group>
  );
};
