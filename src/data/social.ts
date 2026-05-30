import { Github, Linkedin, Mail, Code2, User, Terminal } from 'lucide-react';

export const SOCIAL_LINKS = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/dini28' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dipesh-soni/' },
    { icon: Mail, label: 'Email', href: 'mailto:dipeshsonitech@gmail.com' },
] as const;

export const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
    { icon: User, label: 'About', href: '#about' },
    { icon: Code2, label: 'Skills', href: '#skills' },
    { icon: Terminal, label: 'Projects', href: '#projects' },
    { icon: Mail, label: 'Contact', href: '#contact' },
] as const;

export const CONTACT_INFO = {
    email: 'dipeshsonitech@gmail.com',
    phone: '+916377796008',
    location: 'Udaipur, Rajasthan, India',
    linkedIn: 'https://linkedin.com/in/dipesh-soni',
    github: 'https://github.com/dini28',
    whatsappNumber: '6377796008',
} as const;
