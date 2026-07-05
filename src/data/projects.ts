import pixelwings from '../assets/pixelwings.webp';
import fictiongames from '../assets/fictiongames.webp';
import ghummakkad from '../assets/ghummakkad.webp';

export interface ProjectData {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly image: string;
    readonly technologies: readonly string[];
    readonly liveUrl: string;
    readonly githubUrl: string;
    readonly status?: string;
    readonly caseStudy: {
        readonly problem: string;
        readonly solution: string;
        readonly impact: string;
    };
}

export const PROJECTS_DATA: readonly ProjectData[] = [
    {
        title: 'PixelWings',
        subtitle: 'Service Based Platform',
        description: 'A full-stack React application with modern architecture, featuring state management, responsive design, and seamless user experience.',
        image: pixelwings,
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        liveUrl: 'https://pixelwingstrust.vercel.app/',
        githubUrl: 'https://github.com/dini28/pixelwings',
        caseStudy: {
            problem: "Small businesses struggled to manage their digital presence effectively using complex traditional tools.",
            solution: "Developed a streamlined, design-first platform that simplifies pixel-perfect deployments.",
            impact: "Enabled businesses to launch their storefronts with faster loading times and zero configuration overhead."
        }
    },
    {
        title: 'Fiction Games',
        subtitle: 'Next-Gen Web Gaming',
        status: 'Currently developing',
        description: 'Bold gaming experiences where every click writes a new story. Built with React and JavaScript, deployed on Vercel for seamless performance.',
        image: fictiongames,
        technologies: ['React', 'JavaScript', 'GSAP', 'Vercel', 'Lenis', 'Lottie'],
        liveUrl: 'https://fictiongames.vercel.app',
        githubUrl: 'https://github.com/dini28/fiction',
        caseStudy: {
            problem: "Most studio websites feel static, templated, and fail to capture the energy of modern games.",
            solution: "A high-performance showcase platform built with React and GSAP enabling fluid transitions, animated world reveals, and story-driven navigation.",
            impact: "Studios can present their games with native-like fluidity, maintaining 60fps performance on mobile while delivering immersive, cinematic experiences."
        }
    },
    {
        title: 'Ghummakkad',
        subtitle: 'Hotel Booking Engine',
        status: 'Currently developing on Next.js',
        description: 'A high-performance hotel booking platform reconstructed with Next.js App Router. Featuring SEO optimization, server-side rendering for lightning-fast speeds, and secure payment integrations.',
        image: ghummakkad,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'MongoDB', 'Firebase'],
        liveUrl: 'https://ghummakkad.vercel.app/',
        githubUrl: 'https://github.com/dini28/Ghummakkad',
        caseStudy: {
            problem: "The tourism platform struggled with poor search visibility and slow load times, limiting discoverability for hotels and experiences across Rajasthan.",
            solution: "Rebuilt the platform using Next.js 14+, leveraging Server Components for fast, SEO-optimized content delivery and Server Actions to power secure, seamless hotel booking workflows.",
            impact: "The platform will achieve near-perfect Lighthouse scores, stronger organic visibility for Rajasthan tourism searches, and a 50% reduction in time-to-interactive, driving faster bookings and higher engagement."
        }
    },
];

