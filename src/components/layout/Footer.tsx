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
        <footer className="bg-black text-white py-12 sm:py-16 relative overflow-hidden">
            <SectionBackground variant="subtle" />

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-white/[0.02] blur-3xl pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none -z-10 animate-pulse duration-[12000ms]" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 relative z-10">
                {/* Footer Top */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-white/10">
                    {/* Brand */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2">
                                <img src={logo} alt="Dipesh Soni Logo" className="w-full h-full brightness-0 invert" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl text-white font-bold">
                                    Dipesh Soni
                                </h2>
                                <p className="text-sm sm:text-base text-gray-400">Frontend Developer</p>
                            </div>
                        </div>
                    </div>

                    {/* Thank You Message */}
                    <div className="text-center lg:text-right flex flex-col items-center lg:items-end gap-3">
                        <div>
                            <p className="text-base sm:text-lg text-white font-medium">
                                Thank you for visiting my portfolio!
                            </p>
                            <p className="text-sm sm:text-base text-gray-400 mt-1">
                                Let's build something amazing together
                            </p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer"
                        >
                            Back to Top
                            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Navigation</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors group cursor-pointer"
                                    >
                                        <span className="group-hover:scale-110 transition-transform">
                                            <link.icon className="w-4 h-4" />
                                        </span>
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Connect</h4>
                        <div className="flex flex-wrap gap-3">
                            {SOCIAL_LINKS.map((link) => {
                                let hoverBg = "hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:text-white";
                                let brandColor = "text-gray-400";
                                
                                if (link.label.toLowerCase() === 'github') {
                                    hoverBg = "hover:bg-neutral-800/80 hover:border-neutral-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:text-white";
                                } else if (link.label.toLowerCase() === 'linkedin') {
                                    hoverBg = "hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)] hover:text-[#00a0dc]";
                                    brandColor = "text-gray-400 group-hover:text-[#00a0dc]";
                                } else if (link.label.toLowerCase() === 'email') {
                                    hoverBg = "hover:bg-[#ea4335]/20 hover:border-[#ea4335]/40 hover:shadow-[0_0_20px_rgba(234,67,53,0.3)] hover:text-[#ff6b5a]";
                                    brandColor = "text-gray-400 group-hover:text-[#ff6b5a]";
                                }

                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 group ${hoverBg}`}
                                    >
                                        <span className={`transition-all duration-300 group-hover:scale-110 ${brandColor}`}>
                                            <link.icon className="w-5 h-5" />
                                        </span>
                                        <span className="text-sm sm:text-base font-medium">{link.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Philosophy</h4>
                        <div className="relative p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group">
                            {/* Decorative Quote Icon Background */}
                            <Quote className="absolute -right-2 -bottom-2 w-24 h-24 text-white/5 select-none pointer-events-none transform -rotate-12 transition-transform duration-500 group-hover:rotate-0" />
                            
                            <blockquote className="text-sm sm:text-base text-gray-300 italic leading-relaxed relative z-10 border-l-2 border-white/20 pl-4">
                                "I believe learning doesn't end. There's always a better way to do things,
                                and I'm always curious enough to go find it."
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-6 sm:pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-center">
                        {/* Copyright */}
                        <p className="text-sm sm:text-base text-gray-500 flex flex-wrap items-center justify-center gap-2">
                            <span>© {currentYear}</span>
                            <span className="hidden sm:inline text-gray-600">|</span>
                            <span className="flex items-center gap-1.5">
                                Built by
                                <span className="text-white font-semibold">Dipesh Soni</span>
                            </span>
                        </p>

                        {/* Technologies */}
                        <p className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                            <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-gray-400 font-medium ">React</span>
                            <span className="text-gray-600">+</span>
                            <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-gray-400 font-medium ">TypeScript</span>
                            <span className="text-gray-600">+</span>
                            <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-gray-400 font-medium ">Tailwind CSS</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;