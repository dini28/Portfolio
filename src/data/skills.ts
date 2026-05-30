import { Code2, Database, Wrench } from 'lucide-react';

export const SKILL_CATEGORIES = [
    {
        title: 'Database & Cloud',
        iconName: 'Database' as const,
        skills: [
            { name: 'MongoDB', proficiency: 65, projects: ['Ghummakkad'] },
            { name: 'Firebase', proficiency: 65, projects: ['Portfolio'] },
            { name: 'Netlify', proficiency: 60, projects: ['All Projects'] },
            { name: 'Vercel', proficiency: 80, projects: ['Fiction Games'] },
            { name: 'AWS', proficiency: 30 }
        ]
    },
    {
        title: 'Development',
        iconName: 'Code2' as const,
        skills: [
            { name: 'React.js', proficiency: 75, projects: ['Ghummakkad', 'Portfolio'] },
            { name: 'Next.js', proficiency: 45, projects: ['Ghummakkad', 'Coming Soon'] },
            { name: 'TypeScript', proficiency: 50, projects: ['Portfolio'] },
            { name: 'Tailwind', proficiency: 80, projects: ['All Modern Apps'] },
            { name: 'shadcn/ui', proficiency: 70, projects: ['UI Components'] },
            { name: 'JavaScript', proficiency: 75, projects: ['All Projects'] },
            { name: 'HTML5 & CSS3', proficiency: 95, projects: ['Base Foundations'] },
            { name: 'Express.js', proficiency: 55, projects: ['Working on'] },
            { name: 'Node.js', proficiency: 65, projects: ['Server Logic'] }
        ]
    },
    {
        title: 'Tools & Platforms',
        iconName: 'Wrench' as const,
        skills: [
            { name: 'Git', proficiency: 55, projects: ['Version Control'] },
            { name: 'Docker', proficiency: 45, projects: ['Learning'] },
            { name: 'RedHat Linux', proficiency: 65, projects: ['Learning'] },
            { name: 'Postman', proficiency: 75, projects: ['API Testing'] },
            { name: 'VS Code', proficiency: 95, projects: ['My Primary IDE'] }
        ]
    }
];

export const SKILL_ICONS = { Database, Code2, Wrench };

export const getSkillLevel = (proficiency: number) => {
    if (proficiency >= 85) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Learning';
};
