import { create } from 'zustand';
import { Project, portfolioData } from '../data/portfolio';

export type StationIndex = 0 | 1 | 2 | 3 | 4;

export interface StationMeta {
  index: StationIndex;
  id: string;
  name: string;
  shortLabel: string;
  coords: [number, number, number];
  targetLookAt: [number, number, number];
}

export const STATIONS: StationMeta[] = [
  {
    index: 0,
    id: 'hub',
    name: 'COMMAND HUB',
    shortLabel: 'HUB',
    coords: [0, 0, 18],
    targetLookAt: [0, 0, 0]
  },
  {
    index: 1,
    id: 'work',
    name: 'DEVICE CONSTELLATION',
    shortLabel: 'WORK',
    coords: [0, -35, 20],
    targetLookAt: [0, -35, 0]
  },
  {
    index: 2,
    id: 'skills',
    name: 'SKILL ORBIT',
    shortLabel: 'SKILLS',
    coords: [45, -70, 22],
    targetLookAt: [45, -70, 0]
  },
  {
    index: 3,
    id: 'journey',
    name: 'TRAJECTORY PATH',
    shortLabel: 'JOURNEY',
    coords: [0, -110, 24],
    targetLookAt: [0, -110, 0]
  },
  {
    index: 4,
    id: 'contact',
    name: 'TRANSMISSION BEACON',
    shortLabel: 'CONTACT',
    coords: [-35, -150, 18],
    targetLookAt: [-35, -150, 0]
  }
];

export interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'bug';
}

interface NavState {
  currentStation: StationIndex;
  previousStation: StationIndex;
  slideDirection: number; // +1 for forward/right, -1 for backward/left
  isFlying: boolean;
  flightVelocity: number; // 0 to 1, indicates motion intensity for particles
  
  // Work Station interaction
  activeProject: Project | null;
  categoryFilter: 'All' | 'Mobile Apps' | 'Internal Tools' | 'Automation' | 'Research';
  
  // Skills Station interaction
  selectedSkill: { name: string; context: string; category: string } | null;
  
  // SQA Easter egg
  squashedBugsCount: number;
  
  // Mode & System toggles
  isClassicView: boolean;
  isCommandPaletteOpen: boolean;
  isLowPerformance: boolean;
  prefersReducedMotion: boolean;
  isLoading: boolean;
  
  // Toast notifications
  toasts: ToastItem[];

  // Actions
  goToStation: (station: StationIndex) => void;
  nextStation: () => void;
  prevStation: () => void;
  setIsFlying: (isFlying: boolean, velocity?: number) => void;
  setActiveProject: (project: Project | null) => void;
  setCategoryFilter: (category: 'All' | 'Mobile Apps' | 'Internal Tools' | 'Automation' | 'Research') => void;
  setSelectedSkill: (skill: { name: string; context: string; category: string } | null) => void;
  squashBug: () => void;
  toggleClassicView: () => void;
  setClassicView: (val: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPalette: (val: boolean) => void;
  setLowPerformance: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  addToast: (message: string, type?: 'info' | 'success' | 'bug') => void;
  removeToast: (id: string) => void;
}

const getStoredClassicPref = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('afaq_pref_classic') === 'true';
  } catch {
    return false;
  }
};

export const useNav = create<NavState>((set, get) => ({
  currentStation: 0,
  previousStation: 0,
  slideDirection: 1,
  isFlying: false,
  flightVelocity: 0,
  
  activeProject: null,
  categoryFilter: 'All',
  selectedSkill: null,
  
  squashedBugsCount: 0,
  
  isClassicView: getStoredClassicPref(),
  isCommandPaletteOpen: false,
  isLowPerformance: false,
  prefersReducedMotion: false,
  isLoading: true,
  
  toasts: [],

  goToStation: (station: StationIndex) => {
    const { currentStation, isFlying } = get();
    if (station === currentStation && !isFlying) return;
    
    const direction = station >= currentStation ? 1 : -1;

    // Reset modal states when navigating
    set({
      previousStation: currentStation,
      currentStation: station,
      slideDirection: direction,
      isFlying: true,
      flightVelocity: 1,
      activeProject: null,
      selectedSkill: null
    });
  },

  nextStation: () => {
    const { currentStation, goToStation } = get();
    const next = ((currentStation + 1) % 5) as StationIndex;
    goToStation(next);
  },

  prevStation: () => {
    const { currentStation, goToStation } = get();
    const prev = (currentStation === 0 ? 4 : currentStation - 1) as StationIndex;
    goToStation(prev);
  },

  setIsFlying: (isFlying: boolean, velocity = 0) => {
    set({ isFlying, flightVelocity: velocity });
  },

  setActiveProject: (project: Project | null) => {
    set({ activeProject: project });
  },

  setCategoryFilter: (category) => {
    set({ categoryFilter: category });
  },

  setSelectedSkill: (skill) => {
    set({ selectedSkill: skill });
  },

  squashBug: () => {
    set((state) => {
      const newCount = state.squashedBugsCount + 1;
      return {
        squashedBugsCount: newCount
      };
    });
    get().addToast(`SQA Easter Egg: Bug squashed! Total: ${get().squashedBugsCount + 1}`, 'bug');
  },

  toggleClassicView: () => {
    const nextVal = !get().isClassicView;
    try {
      localStorage.setItem('afaq_pref_classic', String(nextVal));
    } catch {
      // ignore
    }
    set({ isClassicView: nextVal });
  },

  setClassicView: (val: boolean) => {
    try {
      localStorage.setItem('afaq_pref_classic', String(val));
    } catch {
      // ignore
    }
    set({ isClassicView: val });
  },

  toggleCommandPalette: () => {
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen }));
  },

  setCommandPalette: (val: boolean) => {
    set({ isCommandPaletteOpen: val });
  },

  setLowPerformance: (val: boolean) => {
    set({ isLowPerformance: val });
  },

  setIsLoading: (val: boolean) => {
    set({ isLoading: val });
  },

  addToast: (message: string, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts.slice(-4), { id, message, type }]
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3200);
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));
