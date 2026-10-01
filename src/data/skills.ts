import type { IconType } from '@icons-pack/react-simple-icons';
import {
    SiDocker,
    SiFigma,
    SiFirebase,
    SiGit,
    SiGreensock,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiPostman,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
} from '@icons-pack/react-simple-icons';

export type SkillTrack = 'daily' | 'tools' | 'learning';

export interface SpectrumSkill {
    readonly name: string;
    readonly track: SkillTrack;
    /** Position on the spectrum: 0 is pure design, 100 is pure engineering. */
    readonly x: number;
    readonly usedIn?: string;
    readonly icon?: IconType;
}

export const SKILL_TRACKS: readonly { id: SkillTrack; label: string; note: string }[] = [
    { id: 'daily', label: 'Daily', note: 'What I reach for on every project' },
    { id: 'tools', label: 'Tools', note: 'How work gets tested and shipped' },
    { id: 'learning', label: 'Learning', note: 'What I am studying right now' },
];

export const SPECTRUM_SKILLS: readonly SpectrumSkill[] = [
    { name: 'UI/UX design', track: 'daily', x: 4, usedIn: 'Toba Tech, PixelWings' },
    { name: 'Figma & design systems', track: 'daily', x: 14, usedIn: 'Toba Tech', icon: SiFigma },
    { name: 'Motion: GSAP, Lenis, Lottie', track: 'daily', x: 34, usedIn: 'Fiction', icon: SiGreensock },
    { name: 'HTML5 & CSS3', track: 'daily', x: 46, usedIn: 'Every project', icon: SiHtml5 },
    { name: 'Tailwind CSS', track: 'daily', x: 52, usedIn: 'PixelWings, this site', icon: SiTailwindcss },
    { name: 'React 19', track: 'daily', x: 64, usedIn: 'PixelWings, Fiction', icon: SiReact },
    { name: 'JavaScript', track: 'daily', x: 72, usedIn: 'Fiction, Ghummakkad', icon: SiJavascript },
    { name: 'TypeScript', track: 'daily', x: 80, usedIn: 'PixelWings, this site', icon: SiTypescript },

    { name: 'Git & GitHub', track: 'tools', x: 70, usedIn: 'Every project', icon: SiGit },
    { name: 'Vercel', track: 'tools', x: 80, usedIn: 'Every project', icon: SiVercel },
    { name: 'Postman', track: 'tools', x: 90, usedIn: 'API testing', icon: SiPostman },

    { name: 'Next.js App Router', track: 'learning', x: 66, usedIn: 'Ghummakkad rebuild', icon: SiNextdotjs },
    { name: 'Firebase', track: 'learning', x: 78, usedIn: 'Ghummakkad', icon: SiFirebase },
    { name: 'Node.js & Express', track: 'learning', x: 86, usedIn: 'Hackathon backends', icon: SiNodedotjs },
    { name: 'MongoDB', track: 'learning', x: 92, usedIn: 'Ghummakkad', icon: SiMongodb },
    { name: 'Docker', track: 'learning', x: 98, usedIn: 'Learning the basics', icon: SiDocker },
];
