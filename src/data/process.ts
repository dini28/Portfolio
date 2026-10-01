export type ProcessSide = 'design' | 'code';

export interface ProcessStep {
    readonly title: string;
    readonly side: ProcessSide;
    readonly summary: string;
    readonly outputs: readonly string[];
    readonly tools: readonly string[];
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
    {
        title: 'Understand',
        side: 'design',
        summary: 'Who is this for, what should they get done, and what is getting in their way today.',
        outputs: ['User goals', 'Content inventory', 'Success criteria'],
        tools: ['Notes', 'FigJam'],
    },
    {
        title: 'Wireframe & prototype',
        side: 'design',
        summary: 'Low-fidelity flows first, then clickable prototypes that answer real questions before any code exists.',
        outputs: ['User flows', 'Wireframes', 'Clickable prototype'],
        tools: ['Figma'],
    },
    {
        title: 'Design system',
        side: 'code',
        summary: 'Type, spacing, color and components defined once as tokens, so design and code speak the same language.',
        outputs: ['Tokens', 'Component library', 'Responsive rules'],
        tools: ['Figma', 'Tailwind CSS'],
    },
    {
        title: 'Build & ship',
        side: 'code',
        summary: 'Typed React components, motion with purpose, accessibility checks, and a fast deploy to production.',
        outputs: ['Production code', 'Accessibility pass', 'Live deploy'],
        tools: ['React', 'TypeScript', 'Vercel'],
    },
];
