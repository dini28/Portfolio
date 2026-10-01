export interface ExperienceItem {
    readonly role: string;
    readonly organization: string;
    readonly period: string;
    readonly current?: boolean;
    readonly points: readonly string[];
}

export interface Achievement {
    readonly rank: string;
    readonly title: string;
    readonly organizer: string;
    readonly date: string;
    readonly detail: string;
}

export interface Certification {
    readonly name: string;
    readonly issuer: string;
    readonly date: string;
}

export const EXPERIENCE_DATA: readonly ExperienceItem[] = [
    {
        role: 'UI/UX Designer',
        organization: 'Toba Tech',
        period: 'Mar 2026 — Present',
        current: true,
        points: ['Designing user interfaces and prototypes for client projects.'],
    },
    {
        role: 'Design Lead',
        organization: 'Centre for Incubation & Innovation (CII Club)',
        period: 'Nov 2024 — Present',
        current: true,
        points: [
            'Lead the club’s visual identity and branding across posters, presentations and social media.',
            'Design promotional material for workshops, events and pitch sessions with the core team.',
        ],
    },
    {
        role: 'Scientific Volunteer',
        organization: 'Institute for Plasma Research (IPR)',
        period: 'Apr 2024',
        points: ['Guided visitors and explained plasma technologies at a science exhibition.'],
    },
    {
        role: 'Event Management Volunteer',
        organization: 'Innovation, Design and Entrepreneurship (IDE)',
        period: 'Jan 2024',
        points: ['Ran the registration desk, participant onboarding and session schedules.'],
    },
];

export const ACHIEVEMENTS: readonly Achievement[] = [
    {
        rank: '1st',
        title: 'Winner, CodeFiesta Hackathon 3.0',
        organizer: 'Global Institute of Technology, Jaipur',
        date: 'Oct 2024',
        detail: 'First place among 100+ teams in a 24-hour hackathon, from idea to a deployed, working application.',
    },
    {
        rank: 'Finalist',
        title: 'International Innovation Challenge',
        organizer: 'Manipal University, Jaipur',
        date: 'Oct 2024',
        detail: 'Selected as a finalist for a tech-driven solution designed and presented with my team.',
    },
    {
        rank: 'Winner',
        title: 'Smart India Hackathon 2023, internal round',
        organizer: 'Geetanjali Institute of Technical Studies',
        date: 'Oct 2023',
        detail: 'Internal winner, selected to represent the institute at the national level.',
    },
];

export const EDUCATION = {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Geetanjali Institute of Technical Studies, Udaipur',
    graduation: '2027',
    cgpa: '9.55',
} as const;

export const CERTIFICATIONS: readonly Certification[] = [
    { name: 'System Administrator (Red Hat Certified)', issuer: 'Red Hat', date: 'Jul 2025' },
    { name: 'Database Management System', issuer: 'NPTEL · IIT Kharagpur', date: 'Mar 2025' },
    { name: 'AWS Cloud Practitioner Essentials', issuer: 'AWS Skill Builder', date: 'Nov 2024' },
    { name: 'Problem Solving through Programming in C', issuer: 'NPTEL · IIT Kharagpur', date: 'Apr 2024' },
];
