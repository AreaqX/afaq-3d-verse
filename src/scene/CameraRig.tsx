import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useNav, STATIONS } from '../store/useNav';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const currentStation = useNav((state) => state.currentStation);
  const activeProject = useNav((state) => state.activeProject);
  const setIsFlying = useNav((state) => state.setIsFlying);
  const prefersReducedMotion = useNav((state) => state.prefersReducedMotion);

  // Current interpolated vectors
  const currentPos = useRef(new THREE.Vector3(0, 0, 18));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  // Parallax mouse offset
  const parallaxOffset = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Handle pointer drag for free-look parallax
  useEffect(() => {
    const handleDown = (e: MouseEvent | TouchEvent) => {
      // Only drag if directly on canvas (not HUD or buttons)
      const target = e.target as HTMLElement;
      if (target.tagName !== 'CANVAS') return;
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      lastPointer.current = { x: clientX, y: clientY };
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - lastPointer.current.x;
      const deltaY = clientY - lastPointer.current.y;
      lastPointer.current = { x: clientX, y: clientY };

      dragOffset.current.x = THREE.MathUtils.clamp(dragOffset.current.x - deltaX * 0.005, -1.2, 1.2);
      dragOffset.current.y = THREE.MathUtils.clamp(dragOffset.current.y + deltaY * 0.005, -0.8, 0.8);
    };

    const handleUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchstart', handleDown);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  useFrame((state, delta) => {
    const targetMeta = STATIONS[currentStation] || STATIONS[0];
    
    // Base target position
    let targetX = targetMeta.coords[0];
    let targetY = targetMeta.coords[1];
    let targetZ = targetMeta.coords[2];

    // If viewing single active project at WORK station, zoom in closer!
    if (currentStation === 1 && activeProject) {
      targetZ = 12.2;
    }

    // Parallax from cursor position
    const pointer = state.pointer;
    parallaxOffset.current.x = THREE.MathUtils.damp(parallaxOffset.current.x, pointer.x * 0.9, 4, delta);
    parallaxOffset.current.y = THREE.MathUtils.damp(parallaxOffset.current.y, pointer.y * 0.5, 4, delta);

    // Smooth return for drag offset when released
    if (!isDragging.current) {
      dragOffset.current.x = THREE.MathUtils.damp(dragOffset.current.x, 0, 3, delta);
      dragOffset.current.y = THREE.MathUtils.damp(dragOffset.current.y, 0, 3, delta);
    }

    const finalTargetX = targetX + parallaxOffset.current.x + dragOffset.current.x;
    const finalTargetY = targetY + parallaxOffset.current.y + dragOffset.current.y;
    const finalTargetZ = targetZ;

    // Interpolation speed: ~1.6s transition with smooth dampening
    const lerpSpeed = prefersReducedMotion ? 12 : 2.8;

    const prevPos = currentPos.current.clone();

    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, finalTargetX, lerpSpeed, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, finalTargetY, lerpSpeed, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, finalTargetZ, lerpSpeed, delta);

    // Target look at
    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetMeta.targetLookAt[0], lerpSpeed, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetMeta.targetLookAt[1], lerpSpeed, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetMeta.targetLookAt[2], lerpSpeed, delta);

    // Apply to camera
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);

    // Calculate motion velocity for particle streak effects
    const moveDist = prevPos.distanceTo(currentPos.current);
    const speed = moveDist / Math.max(delta, 0.001);
    const normalizedVelocity = THREE.MathUtils.clamp(speed / 15, 0, 1);

    if (normalizedVelocity > 0.08) {
      setIsFlying(true, normalizedVelocity);
    } else {
      setIsFlying(false, 0);
    }
  });

  return null;
};
