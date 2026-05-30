import logo from '../../assets/logo.svg';
import SectionBackground from '../common/SectionBackground';
import { SOCIAL_LINKS, FOOTER_LINKS } from '../../data/social';

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
                    <div className="text-center lg:text-right">
                        <p className="text-base sm:text-lg text-white font-medium">
                            Thank you for visiting my portfolio!
                        </p>
                        <p className="text-sm sm:text-base text-gray-400 mt-1">
                            Let's build something amazing together
                        </p>
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
                        <ul className="space-y-2 sm:space-y-3">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors group"
                                    >
                                        <span className="group-hover:scale-110 transition-transform">
                                            <link.icon className="w-5 h-5" />
                                        </span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quote */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Philosophy</h4>
                        <blockquote className="text-sm sm:text-base text-gray-400 italic leading-relaxed border-l-4 border-white/30 pl-3 sm:pl-4">
                            "I believe learning doesn't end. There's always a better way to do things,
                            and I'm always curious enough to go find it."
                        </blockquote>
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