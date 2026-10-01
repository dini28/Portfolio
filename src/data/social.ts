import { Github, Linkedin, Mail } from 'lucide-react';

export const SOCIAL_LINKS = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/dini28' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dipesh-soni/' },
    { icon: Mail, label: 'Email', href: 'mailto:dipeshsonitech@gmail.com' },
] as const;

export const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#process', label: 'Process' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
] as const;

export const FOOTER_LINKS = NAV_LINKS;

export const CONTACT_INFO = {
    email: 'dipeshsonitech@gmail.com',
    phone: '+916377796008',
    location: 'Udaipur, Rajasthan, India',
    linkedIn: 'https://linkedin.com/in/dipesh-soni',
    github: 'https://github.com/dini28',
    whatsappNumber: '916377796008',
    resume: '/CV.pdf',
} as const;
