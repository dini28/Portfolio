import { useEffect, useState, useRef, useMemo } from 'react';
import { Code2, ArrowRight } from 'lucide-react';
import heroImage from '../../assets/dipesh.webp';
import { useMagnetic } from '../../hooks/useMagnetic';

const Hero = () => {
    const [textState, setTextState] = useState({
        text: '',
        index: 0,
        charIndex: 0,
        isDeleting: false
    });
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLElement>(null);
    const viewWorkRef = useMagnetic<HTMLButtonElement>(0.2);
    const scrollDownRef = useMagnetic<HTMLButtonElement>(0.3);

    const roles = useMemo(() => ['Frontend Developer', 'React Enthusiast', 'UI/UX Designer', 'Web Developer'], []);

    // spotlight effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;

            const rect = heroRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            heroRef.current.style.setProperty('--mouse-x', `${x}%`);
            heroRef.current.style.setProperty('--mouse-y', `${y}%`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // typewriter
    useEffect(() => {
        const { index, charIndex, isDeleting } = textState;
        const currentRole = roles[index];
        const typeSpeed = isDeleting ? 50 : 100;

        const nextStep = () => {
            if (!isDeleting && charIndex < currentRole.length) {
                setTextState(prev => ({
                    ...prev,
                    text: currentRole.substring(0, charIndex + 1),
                    charIndex: charIndex + 1
                }));
            } else if (isDeleting && charIndex > 0) {
                setTextState(prev => ({
                    ...prev,
                    text: currentRole.substring(0, charIndex - 1),
                    charIndex: charIndex - 1
                }));
            } else if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => setTextState(prev => ({ ...prev, isDeleting: true })), 2000);
            } else if (isDeleting && charIndex === 0) {
                setTextState(prev => ({
                    ...prev,
                    isDeleting: false,
                    index: (index + 1) % roles.length
                }));
            }
        };

        const timer = setTimeout(nextStep, typeSpeed);
        return () => clearTimeout(timer);
    }, [textState, roles]);

    // scroll to section
    const scrollToSection = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={heroRef}
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent py-16 lg:py-0"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="mouse-glow absolute w-[800px] h-[800px] rounded-full blur-[80px] transition-opacity duration-300 ease-out" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-pulse duration-[4000ms]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl animate-pulse duration-[6000ms] delay-2000" />
            </div>


            {/* Left Rotated Sidebar Banner */}
            <div className="hidden lg:flex absolute left-12 top-0 bottom-0 py-20 flex-col items-center justify-between pointer-events-none z-20">
                <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase [writing-mode:vertical-lr] rotate-180 font-medium">
                    Frontend Developer
                </span>
                <div className="w-[1px] flex-1 bg-neutral-800 my-8" />
                <span className="text-[10px] tracking-[0.3em] text-neutral-500 font-medium">
                    2026
                </span>
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10 lg:pl-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16 max-w-7xl mx-auto">

                    {/* Left/Center Side: Content Block */}
                    <div className={`lg:col-span-7 flex flex-col justify-center text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                        {/* Stats Row */}
                        <div className="flex gap-10 sm:gap-16 justify-center lg:justify-start mb-12 sm:mb-16">
                            <div>
                                <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">+3</div>
                                <div className="text-[11px] text-neutral-500 uppercase tracking-widest font-semibold">Featured Projects</div>
                            </div>
                            <div className="w-[1px] bg-neutral-800 self-stretch" />
                            <div>
                                <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">+10</div>
                                <div className="text-[11px] text-neutral-500 uppercase tracking-widest font-semibold">Tools & Tech</div>
                            </div>
                        </div>

                        {/* Title and Intro */}
                        <div className="space-y-6 mb-10">
                            <h1 className="text-5xl sm:text-8xl lg:text-9.5xl font-bold tracking-tight text-white leading-none select-none">
                                Hello
                            </h1>
                            <div className="text-lg sm:text-2xl text-neutral-400 font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                                <span>— It's Dipesh Soni, a</span>
                                <div className="inline-flex items-center gap-2 text-white font-semibold border-b border-white/20 pb-0.5 min-h-[36px]">
                                    <Code2 className="w-5 h-5 text-neutral-400" />
                                    <span>{textState.text}</span>
                                    <span className="animate-pulse border-l-2 border-white ml-0.5 h-5 inline-block align-middle" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
                            Passionate about creating beautiful and functional web experiences. Learning and building with
                            <span className="text-white font-semibold"> React</span>,
                            <span className="text-white font-semibold"> Vite</span>,
                            and modern frontend technologies.
                        </p>

                        {/* Action Link & Scroll Down */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                            <button
                                ref={viewWorkRef}
                                onClick={() => scrollToSection('#projects')}
                                className="group inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-all text-sm cursor-pointer shadow-lg hover:shadow-white/10"
                            >
                                View Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                ref={scrollDownRef}
                                onClick={() => scrollToSection('#about')}
                                className="group inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-white uppercase tracking-[0.25em] transition-colors cursor-pointer py-2"
                            >
                                <span>Scroll down</span>
                                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Squarish Portrait Image */}
                    <div className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-12 lg:mt-0`}>
                        <div className="relative w-full max-w-[300px] sm:max-w-[420px] aspect-square rounded-[2rem] overflow-hidden border-2 border-white/25 group-hover:border-white/60 transition-all duration-500 group bg-neutral-950 shadow-2xl mx-auto">
                            {/* Ambient Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />

                            <img
                                src={heroImage}
                                alt="Dipesh Soni"
                                className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-105 grayscale group-hover:grayscale-0 brightness-[0.85] group-hover:brightness-100"
                            />

                            {/* Subtle dark gradient fade on bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-75 pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;