'use client';

import React from 'react';
import {
  FolderGit2,
  User,
  Cpu,
  Terminal as TerminalIcon,
  Mail,
  FileText,
  Sparkles,
  ExternalLink,
  Download,
} from 'lucide-react';
import { useWindowManager, WindowId } from '@/hooks/useWindowManager';
import { DesktopTopBar } from './DesktopTopBar';
import { DesktopDock } from './DesktopDock';
import { DesktopWindow } from './DesktopWindow';
import { TerminalApp } from './TerminalApp';
import { ProjectsExplorerApp } from './ProjectsExplorerApp';
import About from '@/components/sections/About';
import { ThreeDSkillStack } from '@/components/sections/ThreeDSkillStack';
import Contact from '@/components/sections/Contact';
import { CONTACT_INFO } from '@/data/social';

interface DesktopScreenProps {
  onToggleViewMode: () => void;
  viewMode: 'os' | 'classic';
}

interface DesktopFolderIcon {
  id: WindowId;
  name: string;
  badge?: string;
  icon: React.ReactNode;
  gradient: string;
}

export const DesktopScreen: React.FC<DesktopScreenProps> = ({
  onToggleViewMode,
  viewMode,
}) => {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  const folderIcons: DesktopFolderIcon[] = [
    {
      id: 'projects',
      name: 'Active Builds',
      badge: 'x3',
      icon: <FolderGit2 className="w-7 h-7 text-amber-300 drop-shadow-md" />,
      gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    },
    {
      id: 'about',
      name: 'Player Profile',
      badge: 'Lvl 99',
      icon: <User className="w-7 h-7 text-emerald-300 drop-shadow-md" />,
      gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    },
    {
      id: 'skills',
      name: 'Inventory Stack',
      badge: 'x64',
      icon: <Cpu className="w-7 h-7 text-cyan-300 drop-shadow-md" />,
      gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    },
    {
      id: 'terminal',
      name: 'Server Console',
      badge: 'CLI',
      icon: <TerminalIcon className="w-7 h-7 text-green-400 drop-shadow-md" />,
      gradient: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
    },
    {
      id: 'contact',
      name: 'End Portal',
      badge: 'Beacon',
      icon: <Mail className="w-7 h-7 text-purple-300 drop-shadow-md" />,
      gradient: 'from-purple-500/20 to-fuchsia-500/10 border-purple-500/30',
    },
    {
      id: 'resume',
      name: 'Player Codex',
      badge: 'PDF',
      icon: <FileText className="w-7 h-7 text-yellow-300 drop-shadow-md" />,
      gradient: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30',
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-transparent">
      {/* Top Status Bar */}
      <DesktopTopBar
        activeWindowId={activeWindowId}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
        onOpenApp={openWindow}
      />

      {/* Desktop Workspace Grid (Folders & App Launchers) */}
      <main className="absolute inset-0 pt-14 pb-24 px-6 md:px-12 flex flex-col justify-between pointer-events-auto">
        {/* Desktop Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl">
          {folderIcons.map((folder) => {
            const isWindowOpen = windows[folder.id]?.isOpen;

            return (
              <button
                key={folder.id}
                onClick={() => openWindow(folder.id)}
                className="group relative flex flex-col items-center p-3 rounded-none hover:bg-white/[0.04] border-2 border-transparent hover:border-white/10 transition-all duration-150 focus:outline-none focus:bg-white/10 focus:border-emerald-500/40"
              >
                {/* Folder/App Icon Container with Minecraft Slot Bevel */}
                <div
                  className={`w-16 h-16 rounded-none mc-slot border-2 border-[#2b3042] bg-[#121520] flex items-center justify-center shadow-lg transition-transform duration-150 group-hover:scale-105 group-active:scale-95 relative ${
                    isWindowOpen ? 'mc-slot-selected border-emerald-400 bg-[#1e2333]' : ''
                  }`}
                >
                  {folder.icon}
                  {folder.badge && (
                    <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 rounded-none text-[8px] font-pixel bg-emerald-600 text-white border border-emerald-400 shadow-md">
                      {folder.badge}
                    </span>
                  )}
                </div>

                {/* Name Label */}
                <span className="mt-2.5 text-[11px] font-pixel text-gray-200 text-center tracking-tight group-hover:text-emerald-300 drop-shadow-sm">
                  {folder.name}
                </span>

                {isWindowOpen && (
                  <span className="w-1.5 h-1.5 bg-emerald-400 mt-1 shadow-[0_0_6px_rgba(74,222,128,0.9)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Center Desktop Welcome Card / Hint */}
        <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-none card-surface max-w-md mx-auto text-center pointer-events-none mb-12">
          <div className="flex items-center gap-2 text-emerald-400 font-pixel text-[10px] uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OVERWORLD SYSTEM // ACTIVE</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">Interactive Player Environment</h2>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Click or tap any inventory slot or hotbar item to inspect builds, 3D skill stacks, and bio dossiers in dedicated windows.
          </p>
        </div>
      </main>

      {/* WINDOW: About Me */}
      <DesktopWindow
        windowState={windows.about}
        onClose={() => closeWindow('about')}
        onMinimize={() => minimizeWindow('about')}
        onMaximize={() => toggleMaximizeWindow('about')}
        onFocus={() => focusWindow('about')}
        onPositionChange={(pos) => updateWindowPosition('about', pos)}
        icon={<User className="w-4 h-4" />}
      >
        <div className="p-4 sm:p-6">
          <About />
        </div>
      </DesktopWindow>

      {/* WINDOW: Featured Projects (Finder Style Explorer) */}
      <DesktopWindow
        windowState={windows.projects}
        onClose={() => closeWindow('projects')}
        onMinimize={() => minimizeWindow('projects')}
        onMaximize={() => toggleMaximizeWindow('projects')}
        onFocus={() => focusWindow('projects')}
        onPositionChange={(pos) => updateWindowPosition('projects', pos)}
        icon={<FolderGit2 className="w-4 h-4" />}
      >
        <ProjectsExplorerApp />
      </DesktopWindow>

      {/* WINDOW: 3D Skills Stack */}
      <DesktopWindow
        windowState={windows.skills}
        onClose={() => closeWindow('skills')}
        onMinimize={() => minimizeWindow('skills')}
        onMaximize={() => toggleMaximizeWindow('skills')}
        onFocus={() => focusWindow('skills')}
        onPositionChange={(pos) => updateWindowPosition('skills', pos)}
        icon={<Cpu className="w-4 h-4" />}
      >
        <div className="p-4 sm:p-6">
          <ThreeDSkillStack />
        </div>
      </DesktopWindow>

      {/* WINDOW: Terminal Shell */}
      <DesktopWindow
        windowState={windows.terminal}
        onClose={() => closeWindow('terminal')}
        onMinimize={() => minimizeWindow('terminal')}
        onMaximize={() => toggleMaximizeWindow('terminal')}
        onFocus={() => focusWindow('terminal')}
        onPositionChange={(pos) => updateWindowPosition('terminal', pos)}
        icon={<TerminalIcon className="w-4 h-4" />}
      >
        <TerminalApp />
      </DesktopWindow>

      {/* WINDOW: Mail & Contact */}
      <DesktopWindow
        windowState={windows.contact}
        onClose={() => closeWindow('contact')}
        onMinimize={() => minimizeWindow('contact')}
        onMaximize={() => toggleMaximizeWindow('contact')}
        onFocus={() => focusWindow('contact')}
        onPositionChange={(pos) => updateWindowPosition('contact', pos)}
        icon={<Mail className="w-4 h-4" />}
      >
        <div className="p-4 sm:p-6">
          <Contact />
        </div>
      </DesktopWindow>

      {/* WINDOW: Resume Viewer */}
      <DesktopWindow
        windowState={windows.resume}
        onClose={() => closeWindow('resume')}
        onMinimize={() => minimizeWindow('resume')}
        onMaximize={() => toggleMaximizeWindow('resume')}
        onFocus={() => focusWindow('resume')}
        onPositionChange={(pos) => updateWindowPosition('resume', pos)}
        icon={<FileText className="w-4 h-4" />}
      >
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <FileText className="w-8 h-8 text-indigo-400" />
          </div>

          <div className="max-w-md space-y-2">
            <h3 className="text-2xl font-bold text-white">Dipesh Soni — Curriculum Vitae</h3>
            <p className="text-sm text-gray-400">
              Frontend Developer &amp; UI/UX Designer specializing in React 19, TypeScript, and high-conversion web apps.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
            >
              <span>Open PDF</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={CONTACT_INFO.resume}
              download="Dipesh_Soni_CV.pdf"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <span>Download PDF</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </DesktopWindow>

      {/* Floating Bottom Dock */}
      <DesktopDock windows={windows} onOpenApp={openWindow} />
    </div>
  );
};
