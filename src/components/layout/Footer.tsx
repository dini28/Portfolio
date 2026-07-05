import logo from '../../assets/logo.svg';
import SectionBackground from '../common/SectionBackground';
import { SOCIAL_LINKS, FOOTER_LINKS } from '../../data/social';
import { ArrowUp, Quote } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="bg-black text-white py-16 sm:py-24 relative overflow-hidden border-t border-white/5">
            <SectionBackground variant="subtle" />

            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-white/[0.01] blur-3xl pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none -z-10 animate-pulse duration-[12000ms]" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 relative z-10">

                {/* Main Asymmetrical Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 sm:mb-20 pb-12 sm:pb-16 border-b border-white/10">

                    {/* Left 5 Columns: Massive Statement */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div className="space-y-6">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-white">
                                Let's build <br className="hidden sm:inline" />
                                something <br className="hidden sm:inline" />
                                <span className="bg-gradient-to-r from-neutral-200 via-white to-neutral-400 bg-clip-text text-transparent">exceptional.</span>
                            </h2>
                            <p className="text-neutral-400 text-base sm:text-lg max-w-md leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>
                        </div>
                    </div>

                    {/* Right 7 Columns: Link structures */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10">

                        {/* Navigation Links */}
                        <div className="space-y-6">
                            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-500">Navigation</h4>
                            <ul className="space-y-5">
                                {FOOTER_LINKS.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="flex items-center gap-4.5 text-base font-semibold text-neutral-400 hover:text-white transition-all group cursor-pointer hover:translate-x-1.5 duration-300"
                                        >
                                            <span className="text-neutral-500 group-hover:text-white transition-colors duration-300">
                                                <link.icon className="w-5 h-5" />
                                            </span>
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Connect */}
                        <div className="space-y-6">
                            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-500">Connect</h4>
                            <ul className="space-y-5">
                                {SOCIAL_LINKS.map((link) => {
                                    let brandColor = "text-neutral-500 group-hover:text-white";
                                    
                                    if (link.label.toLowerCase() === 'github') {
                                        brandColor = "text-neutral-500 group-hover:text-white";
                                    } else if (link.label.toLowerCase() === 'linkedin') {
                                        brandColor = "text-neutral-500 group-hover:text-[#00a0dc]";
                                    } else if (link.label.toLowerCase() === 'email') {
                                        brandColor = "text-neutral-500 group-hover:text-[#ff6b5a]";
                                    }

                                    return (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4.5 text-base font-semibold text-neutral-400 hover:text-white transition-all group cursor-pointer hover:translate-x-1.5 duration-300"
                                            >
                                                <span className={`transition-colors duration-300 ${brandColor}`}>
                                                    <link.icon className="w-5 h-5" />
                                                </span>
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {/* Philosophy Card (Below) */}
                        <div className="space-y-6 sm:col-span-2 mt-4">
                            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-500">Philosophy</h4>
                            <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden group">
                                <Quote className="absolute -right-2 -bottom-2 w-24 h-24 text-white/[0.02] select-none pointer-events-none transform -rotate-12 transition-transform duration-500 group-hover:rotate-0" />
                                <blockquote className="text-sm text-neutral-400 italic leading-relaxed relative z-10 border-l border-white/20 pl-4 max-w-2xl">
                                    "I believe learning doesn't end. There's always a better way to do things, and I'm always curious enough to go find it."
                                </blockquote>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center border-t border-white/10 pt-8">
                    {/* Brand Meta */}
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                            <img src={logo} alt="Logo" className="w-full h-full brightness-0 invert" />
                        </div>
                        <p className="text-xs text-neutral-500 tracking-wider">
                            © {currentYear} | Built by <span className="text-neutral-300 font-semibold">Dipesh Soni</span>
                        </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {['React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 rounded-md text-neutral-400 font-semibold"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Back to Top */}
                    <div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer"
                        >
                            <span>BACK TO TOP</span>
                            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;