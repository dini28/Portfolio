import { useState, useEffect } from "react";
import CV from '../../assets/CV.pdf';
import logo_header from '../../assets/logo_header.svg';
import { NAV_LINKS } from '../../data/social';



export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                setScrollProgress((window.scrollY / totalScroll) * 100);
            } else {
                setScrollProgress(0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -80% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        NAV_LINKS.forEach((link) => {
            const element = document.querySelector(link.href);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        setIsOpen(false);

        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = CV;
        link.download = 'Dipesh_Soni_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
                : "bg-transparent"
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between h-20">
                    {/* Logo/Name */}
                    <a
                        href="#"
                        onClick={(e) => handleNavClick(e, "#")}
                        className="flex items-center space-x-3 group relative"
                    >
                        <div className="relative">
                            {/* Animated glow on hover */}
                            <div
                                className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 duration-300 blur-sm"
                                style={{
                                    background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                                }}
                            />

                            <span className="relative text-3xl tracking-tight transition-all duration-300 flex items-center gap-2 text-white"
                                style={{
                                    fontFamily: "Offside",
                                    fontWeight: "bold"
                                }}>
                                <img
                                    src={logo_header}
                                    alt="Logo"
                                    className="w-10 h-10 object-contain brightness-0 invert group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500"
                                />
                                <span className="lg:hidden bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-neutral-400 transition-all duration-500">DS</span>
                                <span className="hidden lg:inline bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-neutral-400 transition-all duration-500">Dipesh Soni</span>
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center space-x-1">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        aria-current={
                                            activeSection === link.href.substring(1) ? "page" : undefined
                                        }
                                        className={`relative px-4 py-2 text-base font-medium transition-colors duration-300 hover:text-white group ${activeSection === link.href.substring(1)
                                            ? "text-white"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {link.label}
                                        <span
                                            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-white transition-all duration-300 ${activeSection === link.href.substring(1)
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                                }`}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Download CV Button */}
                        <button
                            onClick={handleDownloadCV}
                            className="relative overflow-hidden px-5 py-2.5 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 group cursor-pointer"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-shine transition-transform" />
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Download CV
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden flex flex-col justify-center items-center w-11 h-11 rounded-xl text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 group"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <div className="flex flex-col justify-between w-6 h-5 relative">
                            <span 
                                className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out transform ${
                                    isOpen ? "rotate-45 translate-y-[9px] bg-white" : ""
                                }`} 
                            />
                            <span 
                                className={`w-full h-[2px] bg-white rounded-full transition-all duration-200 ease-in-out ${
                                    isOpen ? "opacity-0 scale-x-0" : "opacity-100"
                                }`} 
                            />
                            <span 
                                className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out transform ${
                                    isOpen ? "-rotate-45 -translate-y-[9px] bg-white" : ""
                                }`} 
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden absolute top-20 left-0 right-0 transition-all duration-300 ease-out origin-top ${isOpen
                        ? "opacity-100 scale-y-100 translate-y-0"
                        : "opacity-0 scale-y-95 -translate-y-4 pointer-events-none"
                        }`}
                >
                    <div className="bg-black/98 backdrop-blur-xl border-t border-white/10 shadow-2xl">
                        <ul className="container mx-auto px-6 py-6 space-y-1">
                            {NAV_LINKS.map((link, index) => (
                                <li
                                    key={link.href}
                                    className="transform transition-all duration-300"
                                    style={{
                                        transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                                    }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`block px-5 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${activeSection === link.href.substring(1)
                                            ? "text-black shadow-lg bg-white"
                                            : "text-gray-400 hover:text-black"
                                            }`}
                                    >
                                        {/* Background on hover */}
                                        <span
                                            className={`absolute inset-0 bg-white transition-all duration-300 ${activeSection === link.href.substring(1)
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                                }`}
                                        />

                                        {/* Icon indicator */}
                                        <span className="relative z-10 flex items-center gap-3">
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === link.href.substring(1)
                                                    ? "bg-black scale-100"
                                                    : "bg-gray-600 scale-0 group-hover:scale-100 group-hover:bg-black"
                                                    }`}
                                            />
                                            {link.label}
                                        </span>
                                    </a>
                                </li>
                            ))}

                            {/* Mobile Download CV Button */}
                            <li
                                className="transform transition-all duration-300 pt-2"
                                style={{
                                    transitionDelay: isOpen ? `${NAV_LINKS.length * 50}ms` : '0ms',
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                                }}
                            >
                                <button
                                    onClick={handleDownloadCV}
                                    className="w-full px-5 py-4 rounded-xl font-semibold bg-white text-black transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                >
                                    <svg
                                        className="w-4 h-4 group-hover:animate-bounce"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    Download CV
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-neutral-500 via-white to-neutral-500 shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
        </header>
    );
}