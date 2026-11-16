import React from 'react';
import { SkillOrbit } from '../SkillOrbit';

export const SkillsStation: React.FC = () => {
  return (
    <group position={[45, -70, -4]}>
      {/* 3D Orbit System in Background */}
      <SkillOrbit />
    </group>
  );
};
