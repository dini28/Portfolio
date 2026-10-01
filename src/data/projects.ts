import type { StaticImageData } from 'next/image';
import pixelwings from '../assets/pixelwings.webp';
import fictiongames from '../assets/fictiongames.webp';
import ghummakkad from '../assets/ghummakkad.webp';

export interface ProjectData {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly built: readonly string[];
    readonly image: StaticImageData;
    readonly technologies: readonly string[];
    readonly liveUrl: string;
    readonly githubUrl: string;
    readonly status?: string;
}

export interface TeamProject {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly contribution: readonly string[];
    readonly technologies: readonly string[];
}

export const PROJECTS_DATA: readonly ProjectData[] = [
    {
        title: 'PixelWings',
        subtitle: 'Service platform for small businesses',
        description:
            'Small businesses often struggle to manage their online presence with complicated tools. PixelWings is a design-first service platform that makes getting a business online simple.',
        built: [
            'Designed the interface first, then built it screen by screen in React',
            'Typed, reusable components with TypeScript',
            'Responsive layouts styled with Tailwind CSS, tuned for fast loading',
        ],
        image: pixelwings,
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        liveUrl: 'https://pixelwingstrust.vercel.app/',
        githubUrl: 'https://github.com/dini28/pixelwings',
    },
    {
        title: 'Fiction',
        subtitle: 'Game studio showcase website',
        status: 'In development',
        description:
            'Most game studio websites feel static and templated. Fiction is a showcase site built to carry the energy of the games, with story-driven navigation where every click moves you through the world.',
        built: [
            'Fluid page transitions and animated world reveals with GSAP',
            'Smooth scrolling with Lenis and animated illustrations with Lottie',
            'Built to stay at 60 fps on mobile, deployed on Vercel',
        ],
        image: fictiongames,
        technologies: ['React', 'JavaScript', 'GSAP', 'Lenis', 'Lottie', 'Vercel'],
        liveUrl: 'https://fictiongames.vercel.app',
        githubUrl: 'https://github.com/dini28/fiction',
    },
    {
        title: 'Ghummakkad',
        subtitle: 'Hotel booking for Rajasthan tourism',
        status: 'Rebuilding in Next.js',
        description:
            'A hotel booking site for travellers exploring Rajasthan. The first version was slow to load and hard to find in search, so I am rebuilding it on the Next.js App Router.',
        built: [
            'First version built with HTML, CSS and JavaScript, backed by MongoDB and Firebase',
            'Rebuild uses Server Components for fast, search-friendly pages',
            'Rebuild uses Server Actions for a secure booking flow',
        ],
        image: ghummakkad,
        technologies: ['Next.js', 'JavaScript', 'MongoDB', 'Firebase', 'HTML5', 'CSS3'],
        liveUrl: 'https://ghummakkad.vercel.app/',
        githubUrl: 'https://github.com/dini28/Ghummakkad',
    },
];

export const TEAM_PROJECTS: readonly TeamProject[] = [
    {
        title: 'MilkoScan',
        subtitle: 'Milk quality detection device',
        description: 'A web-connected IoT device that detects urea in milk and reports quality in real time.',
        contribution: [
            'Built the frontend and backend that connect to the IoT device',
            'Displayed real-time quality readings to flag milk adulteration',
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'IoT sensors'],
    },
    {
        title: 'NutriScan',
        subtitle: 'Food quality and redistribution platform',
        description:
            'A platform that checks food quality and helps restaurants and hotels redistribute leftover food to people in need.',
        contribution: [
            'Designed and developed the complete website',
            'Built a portal for restaurants to list leftover food for donation',
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
    },
];
