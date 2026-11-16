import React, { Suspense, useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useNav, STATIONS, StationIndex } from '../store/useNav';
import { CameraRig } from './CameraRig';
import { ParticleDust } from './ParticleDust';
import { BugField } from './BugField';
import { Effects } from './Effects';
import { HubStation } from './Stations/Hub';
import { WorkStation } from './Stations/Work';
import { SkillsStation } from './Stations/Skills';
import { JourneyStation } from './Stations/Journey';
import { ContactStation } from './Stations/Contact';

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: () => void;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL render error caught, falling back to Classic view:', error, errorInfo);
    this.props.fallback();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export const World: React.FC = () => {
  const currentStation = useNav((state) => state.currentStation);
  const goToStation = useNav((state) => state.goToStation);
  const nextStation = useNav((state) => state.nextStation);
  const prevStation = useNav((state) => state.prevStation);
  const activeProject = useNav((state) => state.activeProject);
  const setActiveProject = useNav((state) => state.setActiveProject);
  const setClassicView = useNav((state) => state.setClassicView);
  const toggleCommandPalette = useNav((state) => state.toggleCommandPalette);
  const setLowPerformance = useNav((state) => state.setLowPerformance);
  const setIsLoading = useNav((state) => state.setIsLoading);

  const [tabIsActive, setTabIsActive] = useState(true);

  // Hardware capability & reduced motion detection
  useEffect(() => {
    // Check concurrency & screen resolution
    const concurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (concurrency <= 4 || isMobile) {
      setLowPerformance(true);
    }

    // Visibility change (pause rendering when tab is hidden)
    const handleVisibility = () => {
      setTabIsActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Initial loading timeout to allow WebGL shaders to compile
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(timer);
    };
  }, [setLowPerformance, setIsLoading]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input / command palette
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      // Command palette trigger: Ctrl+K, Cmd+K, or "/"
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Esc: if project is active, close project; otherwise return to Hub (station 0)
      if (e.key === 'Escape') {
        if (activeProject) {
          setActiveProject(null);
        } else {
          goToStation(0);
        }
        return;
      }

      // Left / Right or A / D or Up / Down
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.key === 'ArrowDown') {
        nextStation();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'ArrowUp') {
        prevStation();
      } else if (e.key === 'Enter') {
        // Enter advances to next station if at Hub, or opens current
        if (currentStation === 0) {
          goToStation(1);
        } else {
          nextStation();
        }
      } else if (e.key >= '1' && e.key <= '5') {
        const targetIndex = (parseInt(e.key, 10) - 1) as StationIndex;
        goToStation(targetIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStation, activeProject, goToStation, nextStation, prevStation, setActiveProject, toggleCommandPalette]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#07080A] overflow-hidden select-none">
      <WebGLErrorBoundary fallback={() => setClassicView(true)}>
        <Canvas
          frameloop={tabIsActive ? 'always' : 'never'}
          dpr={[1, 1.5]} // Cap DPR at 1.5 for performance
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
            depth: true,
            stencil: false
          }}
          camera={{
            fov: 50,
            near: 0.1,
            far: 1000,
            position: [0, 0, 18]
          }}
        >
          <color attach="background" args={['#07080A']} />
          <fog attach="fog" args={['#07080A', 15, 90]} />

          {/* Ambient & Atmospheric Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 15]} intensity={0.8} color="#FFFFFF" />
          <directionalLight position={[-15, -10, -5]} intensity={0.3} color="#C6FF3D" />

          {/* Subtle Volumetric Accent Lights at Stations */}
          <pointLight position={[0, 0, 8]} intensity={0.6} color="#C6FF3D" distance={25} />
          <pointLight position={[0, -35, 8]} intensity={0.8} color="#C6FF3D" distance={30} />
          <pointLight position={[45, -70, 8]} intensity={0.7} color="#9AE600" distance={30} />
          <pointLight position={[0, -110, 8]} intensity={0.6} color="#EDEDED" distance={30} />
          <pointLight position={[-35, -150, 8]} intensity={1.0} color="#C6FF3D" distance={35} />

          {/* Camera Flight Controller */}
          <CameraRig />

          <Suspense fallback={null}>
            {/* Stations */}
            <HubStation />
            <WorkStation />
            <SkillsStation />
            <JourneyStation />
            <ContactStation />

            {/* Ambient Star & Space Dust Particles */}
            <ParticleDust />

            {/* SQA Easter Egg: Interactive Bugs Field */}
            <BugField />

            {/* Post Processing Effects */}
            <Effects />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
