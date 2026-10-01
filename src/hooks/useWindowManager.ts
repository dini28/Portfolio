'use client';

import { useState, useCallback } from 'react';

export type WindowId = 'about' | 'projects' | 'skills' | 'terminal' | 'contact' | 'resume';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  about: {
    id: 'about',
    title: 'About Dipesh — Profile & Bio',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 50 },
    size: { width: 920, height: 600 },
  },
  projects: {
    id: 'projects',
    title: 'Projects Catalog — Case Studies & Builds',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 140, y: 70 },
    size: { width: 1000, height: 640 },
  },
  skills: {
    id: 'skills',
    title: 'Skills Matrix — 3D Stack Architecture',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 180, y: 80 },
    size: { width: 960, height: 620 },
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — dipesh@portfolio: ~',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13,
    position: { x: 220, y: 110 },
    size: { width: 720, height: 480 },
  },
  contact: {
    id: 'contact',
    title: 'Mail — Get In Touch / Hire',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14,
    position: { x: 160, y: 90 },
    size: { width: 840, height: 580 },
  },
  resume: {
    id: 'resume',
    title: 'Resume Viewer — Dipesh_Soni_CV.pdf',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    position: { x: 200, y: 60 },
    size: { width: 800, height: 620 },
  },
};

type WindowMap = Record<WindowId, WindowState>;

const raiseWindow = (winMap: WindowMap, id: WindowId, changes: Partial<WindowState>): WindowMap => {
  const current = winMap[id];
  const topZ = Math.max(...Object.values(winMap).map((w) => w.zIndex));
  return {
    ...winMap,
    [id]: {
      ...current,
      ...changes,
      zIndex: current.zIndex === topZ ? topZ : topZ + 1,
    },
  };
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowMap>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('about');

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((winMap) => raiseWindow(winMap, id, { isMinimized: false }));
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((winMap) => raiseWindow(winMap, id, { isOpen: true, isMinimized: false }));
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((winMap) => {
      const current = winMap[id];
      if (!current) return winMap;
      return {
        ...winMap,
        [id]: {
          ...current,
          isOpen: false,
        },
      };
    });
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((winMap) => {
      const current = winMap[id];
      if (!current) return winMap;
      return {
        ...winMap,
        [id]: {
          ...current,
          isMinimized: true,
        },
      };
    });
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows((winMap) =>
      raiseWindow(winMap, id, { isMaximized: !winMap[id].isMaximized, isMinimized: false })
    );
    setActiveWindowId(id);
  }, []);

  const updateWindowPosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((winMap) => {
      const current = winMap[id];
      if (!current) return winMap;
      return {
        ...winMap,
        [id]: {
          ...current,
          position,
        },
      };
    });
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
  };
}
