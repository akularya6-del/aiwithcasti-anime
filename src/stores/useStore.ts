import { create } from 'zustand';

interface AppState {
  isLoaded: boolean;
  loadProgress: number;
  scrollProgress: number;
  setLoaded: () => void;
  setProgress: (n: number) => void;
  setScrollProgress: (n: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  loadProgress: 0,
  scrollProgress: 0,
  setLoaded: () => set({ isLoaded: true }),
  setProgress: (n) => set({ loadProgress: Math.max(0, Math.min(100, n)) }),
  setScrollProgress: (n) => set({ scrollProgress: Math.max(0, Math.min(1, n)) }),
}));
