'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Folder,
  FileCode2,
  ExternalLink,
  Github,
  ChevronRight,
  HardDrive,
  Clock,
  Search,
  Grid,
  List,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectData } from '@/data/projects';

export const ProjectsExplorerApp: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData>(PROJECTS_DATA[0]);
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-full min-h-[520px] bg-[#0c0d14] select-none text-gray-200">
      {/* Finder Left Sidebar */}
      <aside className="w-56 border-r-2 border-[#1e2332] bg-[#0c0e15] p-3.5 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider px-1">
              WORLD DIRECTORY
            </span>
            <div className="mt-2 space-y-1">
              <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-none bg-[#1e271c] border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <Folder className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                <span>Active Builds</span>
                <span className="ml-auto text-[10px] font-pixel text-emerald-400">
                  {PROJECTS_DATA.length}
                </span>
              </button>
              <div className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-none text-gray-400 hover:text-white hover:bg-[#141822] text-xs cursor-pointer">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Seed Backups</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-pixel text-gray-400 uppercase tracking-wider px-1">
              REDSTONE ENCHANTMENTS
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5 px-1">
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#141723] border border-[#2b3347] text-emerald-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Server Memory Info */}
        <div className="p-2.5 rounded-none bg-[#11141c] border-2 border-[#202535] text-[11px] text-gray-300">
          <div className="flex items-center gap-2 text-emerald-400 font-pixel text-[9px] mb-1">
            <HardDrive className="w-3.5 h-3.5" />
            <span>OVERWORLD STORAGE</span>
          </div>
          <div className="w-full h-1.5 bg-[#090b10] rounded-none overflow-hidden p-0.5 mc-xp-bar-bg">
            <div className="w-4/5 h-full bg-emerald-400" />
          </div>
          <div className="mt-1 text-[9px] text-gray-400 font-mono">TPS: 20.0 · 0 Chunk Lag</div>
        </div>
      </aside>

      {/* Main Folder View & Inspector Pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Finder Toolbar & Breadcrumbs */}
        <div className="h-11 px-4 border-b-2 border-[#1e2332] bg-[#0f1118] flex items-center justify-between gap-4 shrink-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="hover:text-white cursor-pointer font-pixel text-[10px]">Overworld</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="hover:text-white cursor-pointer font-pixel text-[10px]">Saves</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-emerald-300 font-bold flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              Builds
            </span>
          </div>

          {/* Search & View Controls */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3 h-3 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-36 sm:w-44 pl-7 pr-2.5 py-1 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-gray-500 outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="hidden sm:flex items-center rounded-lg bg-white/[0.05] p-0.5 border border-white/10">
              <button
                onClick={() => setViewStyle('grid')}
                className={`p-1 rounded ${viewStyle === 'grid' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewStyle('list')}
                className={`p-1 rounded ${viewStyle === 'list' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area: Files Grid/List + Detail Inspector Pane */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* File Grid/List */}
          <div className="flex-1 p-5 overflow-y-auto">
            {viewStyle === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProjects.map((project) => {
                  const isSelected = selectedProject.title === project.title;
                  return (
                    <div
                      key={project.title}
                      onClick={() => setSelectedProject(project)}
                      className={`group p-3 rounded-xl cursor-pointer border transition-all duration-200 flex flex-col items-center text-center ${
                        isSelected
                          ? 'bg-violet-600/20 border-violet-500/50 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/30'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                      }`}
                    >
                      {/* Project File Icon / Preview Box */}
                      <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/60 relative border border-white/10 mb-2.5">
                        <Image
                          src={project.image}
                          alt={project.title}
                          placeholder="blur"
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-1.5 left-1.5">
                          <span className="text-[9px] code-mono px-1.5 py-0.5 rounded bg-black/70 text-violet-300 border border-white/10">
                            .app
                          </span>
                        </div>
                      </div>

                      {/* File Name */}
                      <span className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors truncate max-w-full">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-gray-400 code-mono mt-0.5 truncate max-w-full">
                        {project.subtitle}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] text-gray-500 font-bold uppercase border-b border-white/[0.06]">
                  <span className="col-span-5">Name</span>
                  <span className="col-span-4">Type / Tech</span>
                  <span className="col-span-3 text-right">Status</span>
                </div>
                {filteredProjects.map((project) => {
                  const isSelected = selectedProject.title === project.title;
                  return (
                    <div
                      key={project.title}
                      onClick={() => setSelectedProject(project)}
                      className={`grid grid-cols-12 items-center px-3 py-2 rounded-lg cursor-pointer text-xs border transition-colors ${
                        isSelected
                          ? 'bg-violet-600/20 border-violet-500/40 text-white'
                          : 'border-transparent text-gray-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="col-span-5 flex items-center gap-2 font-semibold">
                        <FileCode2 className="w-3.5 h-3.5 text-violet-400" />
                        <span>{project.title}</span>
                      </div>
                      <div className="col-span-4 text-gray-400 truncate text-[11px] code-mono">
                        {project.technologies.slice(0, 3).join(', ')}
                      </div>
                      <div className="col-span-3 text-right text-[10px] text-emerald-400 font-medium truncate">
                        Live
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Finder Inspector Pane (File Metadata & Quick Action) */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#090a10]/90 p-5 flex flex-col justify-between overflow-y-auto shrink-0">
            <div className="space-y-4">
              {/* Preview Banner */}
              <div className="aspect-video w-full rounded-xl overflow-hidden relative border border-white/10 shadow-lg">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  placeholder="blur"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">{selectedProject.subtitle}</p>
              </div>

              {/* Problem / Solution Summary */}
              <div className="space-y-2 text-xs bg-white/[0.03] p-3 rounded-xl border border-white/[0.06]">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">
                    Case Study
                  </span>
                  <p className="text-gray-300 leading-relaxed text-[11px]">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] code-mono px-2 py-0.5 rounded bg-violet-950/50 border border-violet-500/30 text-violet-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2 mt-4">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-all"
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
