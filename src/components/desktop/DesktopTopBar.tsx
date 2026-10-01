'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, LayoutGrid, Scroll, Compass } from 'lucide-react';
import { WindowId } from '@/hooks/useWindowManager';

interface DesktopTopBarProps {
  activeWindowId: WindowId | null;
  viewMode: 'os' | 'classic';
  onToggleViewMode: () => void;
  onOpenApp: (id: WindowId) => void;
}

export const DesktopTopBar: React.FC<DesktopTopBarProps> = ({
  activeWindowId,
  viewMode,
  onToggleViewMode,
  onOpenApp,
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAppName = () => {
    switch (activeWindowId) {
      case 'about':
        return 'PLAYER PROFILE // STATS & LORE';
      case 'projects':
        return 'WORLD EXPLORER // BUILDS';
      case 'skills':
        return 'INVENTORY // SKILL STACK';
      case 'terminal':
        return 'SERVER CONSOLE // CLI';
      case 'contact':
        return 'END PORTAL // BEACON';
      case 'resume':
        return 'PLAYER CODEX // RESUME';
      default:
        return 'OVERWORLD HUD';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-9 z-50 px-4 bg-[#0a0c12]/90 backdrop-blur-xl border-b-2 border-white/10 text-xs flex items-center justify-between select-none shadow-md">
      {/* Left System Menu */}
      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-1.5 font-pixel text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
          title="Minecraft System Menu"
        >
          <span className="text-yellow-400">❖</span>
          <span>DIPESH_OS</span>
        </button>

        {isMenuOpen && (
          <div className="absolute top-8 left-0 w-60 rounded-none bg-[#12151e]/98 backdrop-blur-2xl border-2 border-white/20 shadow-2xl p-1.5 flex flex-col gap-1 z-50">
            <button
              onClick={() => {
                onOpenApp('about');
                setIsMenuOpen(false);
              }}
              className="text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-emerald-600/30 hover:text-white transition-colors"
            >
              Player Profile (About)
            </button>
            <button
              onClick={() => {
                onOpenApp('projects');
                setIsMenuOpen(false);
              }}
              className="text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-emerald-600/30 hover:text-white transition-colors"
            >
              Browse Builds (Projects)
            </button>
            <button
              onClick={() => {
                onOpenApp('skills');
                setIsMenuOpen(false);
              }}
              className="text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-emerald-600/30 hover:text-white transition-colors"
            >
              Equipped Skills (Inventory)
            </button>
            <button
              onClick={() => {
                onOpenApp('terminal');
                setIsMenuOpen(false);
              }}
              className="text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-emerald-600/30 hover:text-white transition-colors"
            >
              Server Console (Terminal)
            </button>
            <div className="h-0.5 bg-white/10 my-1" />
            <button
              onClick={() => {
                onToggleViewMode();
                setIsMenuOpen(false);
              }}
              className="text-left px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-600/30 transition-colors flex items-center justify-between"
            >
              <span>Switch to Classic View</span>
              <Scroll className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Active Application Context */}
        <span className="text-gray-300 font-pixel text-[10px] hidden sm:inline-block">
          {getAppName()}
        </span>

        {/* Level / Status Badge */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-pixel text-yellow-400 bg-black/40 px-2 py-0.5 border border-yellow-500/30">
          <span>LVL 99</span>
          <span className="text-gray-500">|</span>
          <span className="text-emerald-400">SERVER TPS: 20.0</span>
        </div>
      </div>

      {/* Right Control Strip: Date, Time & View Mode Toggle */}
      <div className="flex items-center gap-3">
        {/* Toggle Mode Button */}
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#181c28] border border-white/20 text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-400 transition-all text-[10px] font-pixel"
          title="Toggle between Desktop OS & Classic Portfolio"
        >
          {viewMode === 'os' ? (
            <>
              <Scroll className="w-3 h-3" />
              <span className="hidden sm:inline">CLASSIC VIEW</span>
            </>
          ) : (
            <>
              <LayoutGrid className="w-3 h-3" />
              <span className="hidden sm:inline">DESKTOP OS</span>
            </>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-2 text-gray-400">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <Wifi className="w-3.5 h-3.5 text-cyan-400" />
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-1.5 text-gray-300 font-pixel text-[10px]">
          <span className="hidden md:inline text-gray-400">{date}</span>
          <span className="text-white">{time}</span>
        </div>
      </div>
    </header>
  );
};
