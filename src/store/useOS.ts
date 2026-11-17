import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppId =
  | 'home'
  | 'projects'
  | 'about'
  | 'skills'
  | 'journey'
  | 'resume'
  | 'messages'
  | 'bughunt'
  | 'settings';

export type AccentColor = 'teal' | 'cobalt' | 'amber';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface OSState {
  isLocked: boolean;
  currentApp: AppId;
  appHistory: AppId[];
  selectedProjectId: string | null;
  accent: AccentColor;
  reduceMotion: boolean;
  isClassicView: boolean;
  isControlCenterOpen: boolean;
  isAppSwitcherOpen: boolean;
  isSpotlightOpen: boolean;
  toasts: ToastItem[];
  squashedCount: number;

  // Actions
  unlock: () => void;
  lock: () => void;
  openApp: (app: AppId) => void;
  closeApp: () => void;
  goHome: () => void;
  setSelectedProject: (id: string | null) => void;
  setAccent: (accent: AccentColor) => void;
  setReduceMotion: (reduce: boolean) => void;
  toggleClassicView: () => void;
  setClassicView: (val: boolean) => void;
  setControlCenter: (open: boolean) => void;
  setAppSwitcher: (open: boolean) => void;
  setSpotlight: (open: boolean) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  squashBug: () => void;
}

export const useOS = create<OSState>()(
  persist(
    (set, get) => ({
      isLocked: true,
      currentApp: 'home',
      appHistory: ['home'],
      selectedProjectId: null,
      accent: 'teal',
      reduceMotion: false,
      isClassicView: false,
      isControlCenterOpen: false,
      isAppSwitcherOpen: false,
      isSpotlightOpen: false,
      toasts: [],
      squashedCount: 0,

      unlock: () => set({ isLocked: false }),
      lock: () => set({ isLocked: true, currentApp: 'home', isControlCenterOpen: false, isAppSwitcherOpen: false }),

      openApp: (app: AppId) => {
        const { currentApp, appHistory } = get();
        if (currentApp === app) {
          set({ isAppSwitcherOpen: false, isControlCenterOpen: false });
          return;
        }
        const newHistory = appHistory.filter((a) => a !== app);
        newHistory.push(app);
        set({
          currentApp: app,
          appHistory: newHistory,
          isAppSwitcherOpen: false,
          isControlCenterOpen: false,
          isSpotlightOpen: false,
        });
      },

      closeApp: () => {
        set({ currentApp: 'home', selectedProjectId: null });
      },

      goHome: () => {
        set({
          currentApp: 'home',
          selectedProjectId: null,
          isAppSwitcherOpen: false,
          isControlCenterOpen: false,
          isSpotlightOpen: false,
        });
      },

      setSelectedProject: (id) => set({ selectedProjectId: id }),

      setAccent: (accent) => {
        set({ accent });
        document.documentElement.setAttribute('data-accent', accent);
      },

      setReduceMotion: (reduceMotion) => set({ reduceMotion }),

      toggleClassicView: () => set((state) => ({ isClassicView: !state.isClassicView })),

      setClassicView: (val) => set({ isClassicView: val }),

      setControlCenter: (open) => set({ isControlCenterOpen: open }),

      setAppSwitcher: (open) => set({ isAppSwitcherOpen: open }),

      setSpotlight: (open) => set({ isSpotlightOpen: open }),

      addToast: (message, type = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3200);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },

      squashBug: () => set((state) => ({ squashedCount: state.squashedCount + 1 })),
    }),
    {
      name: 'afaq-os-state',
      partialize: (state) => ({
        accent: state.accent,
        reduceMotion: state.reduceMotion,
        isClassicView: state.isClassicView,
      }),
    }
  )
);
