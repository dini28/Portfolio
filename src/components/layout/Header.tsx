import { useState, useEffect } from "react";
import CV from '../../assets/CV.pdf';
import logo_header from '../../assets/logo_header.svg';
import { NAV_LINKS } from '../../data/social';



export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

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
        <>
        <header
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 rounded-2xl border ${
                isScrolled 
                    ? "bg-black/80 backdrop-blur-xl py-1.5 border-white/10 shadow-[0_8px_30px_rgba(255,255,255,0.05)]" 
                    : "bg-black/40 backdrop-blur-md py-3 border-white/5 shadow-lg"
            }`}
        >
            <nav className="mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
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

                            <span className="relative text-2xl tracking-tight transition-all duration-300 flex items-center gap-2 text-white"
                                style={{
                                    fontFamily: "Offside",
                                    fontWeight: "bold"
                                }}>
                                <img
                                    src={logo_header}
                                    alt="Logo"
                                    className="w-8 h-8 object-contain brightness-0 invert group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500"
                                />
                                <span className="lg:hidden bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-neutral-400 transition-all duration-500">DS</span>
                                <span className="hidden lg:inline bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-neutral-400 transition-all duration-500">Dipesh Soni</span>
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <ul className="flex items-center space-x-1">
                            {NAV_LINKS.map((link, index) => (
                                <li 
                                    key={link.href} 
                                    className="relative"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        aria-current={
                                            activeSection === link.href.substring(1) ? "page" : undefined
                                        }
                                        className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 z-10 ${
                                            activeSection === link.href.substring(1)
                                                ? "text-white"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        {link.label}
                                        {activeSection === link.href.substring(1) && (
                                            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                        )}
                                    </a>
                                    {/* Hover Capsule Background */}
                                    <span
                                        className={`absolute inset-0 bg-white/5 rounded-lg -z-0 transition-all duration-200 pointer-events-none ${
                                            hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                        }`}
                                    />
                                </li>
                            ))}
                        </ul>

                        {/* Download CV Button */}
                        <button
                            onClick={handleDownloadCV}
                            className="relative overflow-hidden px-4 py-2 bg-white text-black font-semibold rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 group cursor-pointer"
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

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex flex-col justify-center items-center w-10 h-10 rounded-xl text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 group"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            <div className="flex flex-col justify-between w-5 h-4 relative">
                                <span 
                                    className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out transform ${
                                        isOpen ? "rotate-45 translate-y-[7px] bg-white" : ""
                                    }`} 
                                />
                                <span 
                                    className={`w-full h-[2px] bg-white rounded-full transition-all duration-200 ease-in-out ${
                                        isOpen ? "opacity-0 scale-x-0" : "opacity-100"
                                    }`} 
                                />
                                <span 
                                    className={`w-full h-[2px] bg-white rounded-full transition-all duration-300 ease-in-out transform ${
                                        isOpen ? "-rotate-45 -translate-y-[7px] bg-white" : ""
                                    }`} 
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>
        </header>

            {/* Mobile Navigation — Full-screen Overlay (outside header for proper z-stacking) */}
            {/* Backdrop */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <div
                className={`lg:hidden fixed inset-0 z-40 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8 pointer-events-none"
                }`}
            >
                <div className="bg-gradient-to-b from-black via-neutral-950 to-black h-full flex flex-col pt-28 pb-10 px-8">
                    {/* Nav Links */}
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map((link, index) => {
                            const isActive = activeSection === link.href.substring(1);
                            const sectionNum = String(index + 1).padStart(2, '0');
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="group relative block py-5 transition-all duration-500"
                                    style={{
                                        transitionDelay: isOpen ? `${100 + index * 70}ms` : '0ms',
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                                    }}
                                >
                                    {/* Active highlight bar */}
                                    <span
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-300 ${
                                            isActive
                                                ? "h-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                                                : "h-0 bg-white/40 group-hover:h-5"
                                        }`}
                                    />

                                    <div className="flex items-baseline gap-4 pl-5">
                                        {/* Section number */}
                                        <span
                                            className={`text-[11px] font-mono tracking-widest transition-colors duration-300 ${
                                                isActive ? "text-white" : "text-neutral-600 group-hover:text-neutral-400"
                                            }`}
                                        >
                                            {sectionNum}
                                        </span>

                                        {/* Label */}
                                        <span
                                            className={`text-4xl font-bold tracking-tight transition-all duration-300 ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-neutral-500 group-hover:text-white group-hover:translate-x-2"
                                            }`}
                                            style={{ fontFamily: 'Genos, sans-serif' }}
                                        >
                                            {link.label}
                                        </span>
                                    </div>

                                    {/* Separator */}
                                    <span className="absolute bottom-0 left-5 right-5 h-px bg-white/[0.06]" />
                                </a>
                            );
                        })}
                    </nav>

                    {/* Download CV */}
                    <div
                        className="mt-10 px-2 transition-all duration-500"
                        style={{
                            transitionDelay: isOpen ? `${100 + NAV_LINKS.length * 70}ms` : '0ms',
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        <button
                            onClick={() => { handleDownloadCV(); setIsOpen(false); }}
                            className="w-full group relative overflow-hidden px-6 py-4 rounded-2xl font-semibold text-sm bg-white text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
                            <span className="relative">Download CV</span>
                        </button>
                    </div>

                    {/* Bottom decorative footer */}
                    <div
                        className="mt-auto px-5 transition-all duration-500"
                        style={{
                            transitionDelay: isOpen ? `${200 + NAV_LINKS.length * 70}ms` : '0ms',
                            opacity: isOpen ? 1 : 0,
                        }}
                    >
                        <div className="flex items-center gap-3 text-neutral-600 text-[10px] tracking-[0.3em] uppercase font-mono">
                            <span className="h-px flex-1 bg-white/[0.06]" />
                            Portfolio &copy; {new Date().getFullYear()}
                            <span className="h-px flex-1 bg-white/[0.06]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}