'use client';

import React, { useState, useMemo } from 'react';
import {
    SiTypescript,
    SiJavascript,
    SiReact,
    SiTailwindcss,
    SiNextdotjs,
    SiNodedotjs,
    SiMongodb,
    SiGit,
    SiFirebase,
    SiDocker,
    SiPostman,
    SiVercel,
    SiFigma
} from '@icons-pack/react-simple-icons';
import { Layers, Cpu, Cloud, Wrench } from 'lucide-react';

export interface SkillItem {
    id: string;
    name: string;
    category: 'Frontend & Design' | 'Backend & Cloud' | 'Tools & DevOps';
    proficiency: number;
    color: string;
    bgGlow: string;
    borderColor: string;
    icon: React.ComponentType<{ className?: string; color?: string; size?: number | string }>;
    description: string;
    projects: string[];
}

export const SKILLS_LIST: SkillItem[] = [
    {
        id: 'react',
        name: 'React 19',
        category: 'Frontend & Design',
        proficiency: 92,
        color: '#61DAFB',
        bgGlow: 'rgba(97, 218, 251, 0.15)',
        borderColor: 'rgba(97, 218, 251, 0.3)',
        icon: SiReact,
        description: 'Component architecture, custom hooks, concurrent rendering, and reactive state systems.',
        projects: ['Ghummakkad', 'Portfolio', 'Fiction Games']
    },
    {
        id: 'ts',
        name: 'TypeScript',
        category: 'Frontend & Design',
        proficiency: 88,
        color: '#3178C6',
        bgGlow: 'rgba(49, 120, 198, 0.15)',
        borderColor: 'rgba(49, 120, 198, 0.3)',
        icon: SiTypescript,
        description: 'Strict type safety, generic utilities, crash-resistant architecture, and enterprise patterns.',
        projects: ['Portfolio', 'PixelWings', 'Design System']
    },
    {
        id: 'next',
        name: 'Next.js 15',
        category: 'Frontend & Design',
        proficiency: 85,
        color: '#ffffff',
        bgGlow: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        icon: SiNextdotjs,
        description: 'Server components, App Router, metadata SEO, static & dynamic rendering, and caching.',
        projects: ['Ghummakkad', 'Portfolio']
    },
    {
        id: 'figma',
        name: 'Figma & UI/UX',
        category: 'Frontend & Design',
        proficiency: 90,
        color: '#F24E1E',
        bgGlow: 'rgba(242, 78, 30, 0.15)',
        borderColor: 'rgba(242, 78, 30, 0.3)',
        icon: SiFigma,
        description: 'User flows, wireframing, high-fidelity prototypes, design tokens, and developer handoffs.',
        projects: ['Toba Tech Apps', 'PixelWings']
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'Frontend & Design',
        proficiency: 94,
        color: '#38BDF8',
        bgGlow: 'rgba(56, 189, 248, 0.15)',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        icon: SiTailwindcss,
        description: 'Custom design systems, fluid responsive utilities, dark mode theming, and animations.',
        projects: ['Portfolio', 'PixelWings', 'Fiction Games']
    },
    {
        id: 'js',
        name: 'JavaScript (ES6+)',
        category: 'Frontend & Design',
        proficiency: 90,
        color: '#F7DF1E',
        bgGlow: 'rgba(247, 223, 30, 0.15)',
        borderColor: 'rgba(247, 223, 30, 0.3)',
        icon: SiJavascript,
        description: 'Asynchronous workflows, closures, event-loop handling, and functional programming.',
        projects: ['All Web Apps', 'Dynamic Canvas']
    },
    {
        id: 'node',
        name: 'Node.js & Express',
        category: 'Backend & Cloud',
        proficiency: 78,
        color: '#5FA04E',
        bgGlow: 'rgba(95, 160, 78, 0.15)',
        borderColor: 'rgba(95, 160, 78, 0.3)',
        icon: SiNodedotjs,
        description: 'RESTful API construction, server routing, middleware integrations, and authentication.',
        projects: ['Ghummakkad', 'Backend Services']
    },
    {
        id: 'mongo',
        name: 'MongoDB',
        category: 'Backend & Cloud',
        proficiency: 75,
        color: '#47A248',
        bgGlow: 'rgba(71, 162, 72, 0.15)',
        borderColor: 'rgba(71, 162, 72, 0.3)',
        icon: SiMongodb,
        description: 'Document database modeling, aggregation queries, indexes, and database connectivity.',
        projects: ['Ghummakkad']
    },
    {
        id: 'firebase',
        name: 'Firebase',
        category: 'Backend & Cloud',
        proficiency: 74,
        color: '#FFCA28',
        bgGlow: 'rgba(255, 202, 40, 0.15)',
        borderColor: 'rgba(255, 202, 40, 0.3)',
        icon: SiFirebase,
        description: 'Realtime database, authentication services, storage, and serverless backends.',
        projects: ['Ghummakkad', 'Live Prototypes']
    },
    {
        id: 'git',
        name: 'Git & GitHub',
        category: 'Tools & DevOps',
        proficiency: 88,
        color: '#F05032',
        bgGlow: 'rgba(240, 80, 50, 0.15)',
        borderColor: 'rgba(240, 80, 50, 0.3)',
        icon: SiGit,
        description: 'Branch management, pull requests, semantic versioning, and collaborative development.',
        projects: ['All Projects']
    },
    {
        id: 'vercel',
        name: 'Vercel',
        category: 'Tools & DevOps',
        proficiency: 90,
        color: '#ffffff',
        bgGlow: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        icon: SiVercel,
        description: 'Continuous deployment pipelines, edge analytics, custom domains, and serverless hosting.',
        projects: ['Fiction Games', 'Portfolio']
    },
    {
        id: 'postman',
        name: 'Postman',
        category: 'Tools & DevOps',
        proficiency: 82,
        color: '#FF6C37',
        bgGlow: 'rgba(255, 108, 55, 0.15)',
        borderColor: 'rgba(255, 108, 55, 0.3)',
        icon: SiPostman,
        description: 'API endpoint testing, parameter validation, environment variables, and payload mocks.',
        projects: ['API Integrations']
    },
    {
        id: 'docker',
        name: 'Docker',
        category: 'Tools & DevOps',
        proficiency: 65,
        color: '#2496ED',
        bgGlow: 'rgba(36, 150, 237, 0.15)',
        borderColor: 'rgba(36, 150, 237, 0.3)',
        icon: SiDocker,
        description: 'Containerized micro-environments and consistent multi-platform dev setups.',
        projects: ['Local Dev Environments']
    },
];

export const ThreeDSkillStack: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS_LIST[0]);

    const categories = [
        { label: 'All Technologies', value: 'all', icon: Layers },
        { label: 'Frontend & Design', value: 'Frontend & Design', icon: Cpu },
        { label: 'Backend & Cloud', value: 'Backend & Cloud', icon: Cloud },
        { label: 'Tools & DevOps', value: 'Tools & DevOps', icon: Wrench },
    ];

    const filteredSkills = useMemo(() => {
        if (selectedCategory === 'all') return SKILLS_LIST;
        return SKILLS_LIST.filter(item => item.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="w-full space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCategory === cat.value;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                                    : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Main Interactive Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 max-w-5xl mx-auto">
                {filteredSkills.map((skill) => {
                    const Icon = skill.icon;
                    const isSelected = activeSkill.id === skill.id;

                    return (
                        <button
                            key={skill.id}
                            onClick={() => setActiveSkill(skill)}
                            className={`p-4 rounded-2xl flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer border group ${
                                isSelected
                                    ? 'bg-violet-600/15 border-violet-500/50 shadow-xl shadow-violet-600/20 scale-105'
                                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/15 hover:scale-[1.02]'
                            }`}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: skill.bgGlow,
                                    border: `1px solid ${skill.borderColor}`
                                }}
                            >
                                <Icon size={24} color={skill.color} />
                            </div>

                            <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                                {skill.name}
                            </span>
                            <span className="text-[11px] font-mono text-gray-400 mt-1">
                                {skill.proficiency}%
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Active Skill Inspector Card */}
            <div className="glass-card p-6 sm:p-8 max-w-3xl mx-auto rounded-3xl relative overflow-hidden transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                            style={{
                                backgroundColor: activeSkill.bgGlow,
                                border: `1px solid ${activeSkill.borderColor}`
                            }}
                        >
                            {React.createElement(activeSkill.icon, { size: 32, color: activeSkill.color })}
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    {activeSkill.name}
                                </h3>
                                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                                    {activeSkill.category}
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed max-w-lg">
                                {activeSkill.description}
                            </p>
                        </div>
                    </div>

                    <div className="w-full sm:w-48 shrink-0 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-gray-400">Mastery</span>
                            <span className="font-bold text-violet-400">{activeSkill.proficiency}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden p-0.5">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-500"
                                style={{ width: `${activeSkill.proficiency}%` }}
                            />
                        </div>
                        <div className="pt-2 text-[11px] text-gray-400 font-mono">
                            Used in: <span className="text-gray-200">{activeSkill.projects.join(', ')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
