'use client';

import React from 'react';
import {
  FolderGit2,
  User,
  Cpu,
  Terminal,
  Mail,
  FileText,
} from 'lucide-react';
import { WindowId, WindowState } from '@/hooks/useWindowManager';

interface DesktopDockProps {
  windows: Record<WindowId, WindowState>;
  onOpenApp: (id: WindowId) => void;
}

interface DockItem {
  id: WindowId;
  label: string;
  icon: React.ReactNode;
  slotNumber: string;
  accentColor: string;
}

export const DesktopDock: React.FC<DesktopDockProps> = ({ windows, onOpenApp }) => {
  const dockItems: DockItem[] = [
    {
      id: 'projects',
      label: 'Builds (Projects)',
      icon: <FolderGit2 className="w-5 h-5 text-amber-300" />,
      slotNumber: '1',
      accentColor: 'border-amber-500/40',
    },
    {
      id: 'about',
      label: 'Profile (About)',
      icon: <User className="w-5 h-5 text-emerald-300" />,
      slotNumber: '2',
      accentColor: 'border-emerald-500/40',
    },
    {
      id: 'skills',
      label: 'Inventory (Skills)',
      icon: <Cpu className="w-5 h-5 text-cyan-300" />,
      slotNumber: '3',
      accentColor: 'border-cyan-500/40',
    },
    {
      id: 'terminal',
      label: 'Console (CLI)',
      icon: <Terminal className="w-5 h-5 text-green-400" />,
      slotNumber: '4',
      accentColor: 'border-green-500/40',
    },
    {
      id: 'contact',
      label: 'End Portal (Mail)',
      icon: <Mail className="w-5 h-5 text-purple-300" />,
      slotNumber: '5',
      accentColor: 'border-purple-500/40',
    },
    {
      id: 'resume',
      label: 'Codex (Resume)',
      icon: <FileText className="w-5 h-5 text-yellow-300" />,
      slotNumber: '6',
      accentColor: 'border-yellow-500/40',
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      {/* Minecraft Hotbar Container */}
      <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 bg-[#12141d]/95 backdrop-blur-2xl border-2 border-white/20 shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_1px_1px_0_rgba(255,255,255,0.15)]">
        {dockItems.map((item) => {
          const win = windows[item.id];
          const isRunning = win && win.isOpen;

          return (
            <button
              key={item.id}
              onClick={() => onOpenApp(item.id)}
              className="group relative flex flex-col items-center focus:outline-none"
            >
              {/* Tooltip */}
              <div className="absolute -top-11 scale-0 group-hover:scale-100 transition-all duration-150 px-2 py-1 bg-[#10121a] text-white text-[10px] font-pixel border-2 border-white/20 shadow-lg pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>

              {/* Hotbar Slot Box */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 relative flex items-center justify-center transition-all duration-150 active:translate-y-0.5 ${
                  isRunning
                    ? 'mc-slot-selected border-2 border-emerald-400 bg-[#1e2333]'
                    : 'mc-slot border-2 border-[#2b3042] bg-[#121520] hover:border-white/30'
                }`}
              >
                {/* Hotbar Slot Key Number */}
                <span className="absolute top-0.5 left-1 text-[8px] font-pixel text-gray-500 group-hover:text-gray-300">
                  {item.slotNumber}
                </span>

                {/* App Icon */}
                <div className="transition-transform duration-150 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Running Pip */}
                {isRunning && (
                  <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.9)]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
