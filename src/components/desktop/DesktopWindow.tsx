'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { WindowState } from '@/hooks/useWindowManager';

interface DesktopWindowProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange?: (pos: { x: number; y: number }) => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

type Point = { x: number; y: number };

const TOP_BAR_HEIGHT = 36;
const DOCK_SPACE = 80;
const EDGE_GAP = 8;
const DEFAULT_POS: Point = { x: 100, y: 60 };
const DEFAULT_SIZE = { width: 900, height: 600 };

const subscribeToResize = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};
const getViewportWidth = () => window.innerWidth;
const getViewportHeight = () => window.innerHeight;
const getServerViewportWidth = () => 1280;
const getServerViewportHeight = () => 800;

export const DesktopWindow: React.FC<DesktopWindowProps> = ({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  icon,
  children,
}) => {
  const { isOpen, isMinimized, isMaximized, zIndex, position, size, title } = windowState;
  const [dragPos, setDragPos] = useState<Point | null>(null);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; startX: number; startY: number } | null>(null);

  const viewportWidth = useSyncExternalStore(subscribeToResize, getViewportWidth, getServerViewportWidth);
  const viewportHeight = useSyncExternalStore(subscribeToResize, getViewportHeight, getServerViewportHeight);

  const width = Math.min(size?.width ?? DEFAULT_SIZE.width, viewportWidth - EDGE_GAP * 2);
  const height = Math.min(
    size?.height ?? DEFAULT_SIZE.height,
    viewportHeight - TOP_BAR_HEIGHT - DOCK_SPACE - EDGE_GAP * 2
  );

  const clampToViewport = (p: Point): Point => {
    const minY = TOP_BAR_HEIGHT + EDGE_GAP;
    const maxX = Math.max(EDGE_GAP, viewportWidth - width - EDGE_GAP);
    const maxY = Math.max(minY, viewportHeight - DOCK_SPACE - height - EDGE_GAP);
    return {
      x: Math.min(Math.max(EDGE_GAP, p.x), maxX),
      y: Math.min(Math.max(minY, p.y), maxY),
    };
  };

  const currentPos = clampToViewport(dragPos ?? position ?? DEFAULT_POS);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    onFocus();
    if (isMaximized || e.button !== 0) return;
    // Pointer capture would retarget the click away from the title bar buttons.
    if ((e.target as HTMLElement).closest('button')) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: currentPos.x,
      startY: currentPos.y,
    };
    setDragPos(currentPos);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start) return;
    setDragPos({
      x: start.startX + e.clientX - start.pointerX,
      y: start.startY + e.clientY - start.pointerY,
    });
  };

  const handlePointerUp = () => {
    if (!dragStartRef.current) return;
    dragStartRef.current = null;
    if (dragPos) onPositionChange?.(clampToViewport(dragPos));
    setDragPos(null);
  };

  if (!isOpen || isMinimized) return null;

  return (
    <div
      onPointerDown={onFocus}
      style={{
        zIndex,
        transform: isMaximized
          ? 'none'
          : `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`,
        width: isMaximized ? '100vw' : `${width}px`,
        height: isMaximized ? `calc(100dvh - ${TOP_BAR_HEIGHT}px - ${DOCK_SPACE}px)` : `${height}px`,
        top: isMaximized ? `${TOP_BAR_HEIGHT}px` : 0,
        left: 0,
      }}
      className={`fixed ${dragPos ? '' : 'transition-[opacity,transform] duration-150'} flex flex-col rounded-none overflow-hidden border-2 border-white/20 bg-[#0d0f17]/95 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(34,197,94,0.15)] ring-1 ring-black ${
        isMaximized ? 'border-x-0' : ''
      }`}
    >
      {/* Title Bar Header */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={onMaximize}
        className="h-9 px-3 flex items-center justify-between select-none touch-none bg-[#161926] border-b-2 border-white/10 cursor-grab active:cursor-grabbing shrink-0"
      >
        {/* Minecraft Square Block Controls */}
        <div className="flex items-center gap-1.5 group/lights">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-4 h-4 rounded-none bg-[#e11d48] border border-[#f43f5e] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-4 h-4 rounded-none bg-[#d97706] border border-[#f59e0b] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            title="Minimize"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-4 h-4 rounded-none bg-[#16a34a] border border-[#22c55e] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <Square className="w-2 h-2" />
            ) : (
              <Maximize2 className="w-2 h-2" />
            )}
          </button>
        </div>

        {/* Window Title & Icon */}
        <div className="flex items-center gap-2 px-3 text-[11px] font-pixel text-gray-200 truncate max-w-[65%]">
          {icon && <span className="text-emerald-400 shrink-0">{icon}</span>}
          <span className="truncate">{title}</span>
        </div>

        {/* Right Status Decor */}
        <div className="flex items-center gap-1.5 text-[9px] font-pixel text-gray-500">
          <span className="hidden sm:inline text-emerald-500/80">OVERWORLD</span>
          <span className="w-1.5 h-1.5 bg-emerald-400" />
        </div>
      </div>

      {/* Window Body Interior */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gradient-to-b from-[#0e111a]/90 to-[#07080d]/95 text-gray-200">
        {children}
      </div>
    </div>
  );
};
