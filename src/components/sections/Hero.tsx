import { useEffect, useState, useRef, useMemo } from 'react';
import { ArrowRight, Code2, Laptop, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import dipesh from '../../assets/dipesh.webp';
import { SOCIAL_LINKS } from '../../data/social';

// Hero-specific social links (GitHub + LinkedIn only)
const heroSocials = SOCIAL_LINKS.filter(s => s.label !== 'Email');

const Hero = () => {
    const [textState, setTextState] = useState({
        text: '',
        index: 0,
        charIndex: 0,
        isDeleting: false
    });
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

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
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-12 lg:py-0"
        >


            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Grid */}
                <div
                    className="absolute inset-0 opacity-[0.5]"
                    style={{
                        backgroundImage: `linear-gradient(var(--theme-grid-color) 2px, transparent 2px), linear-gradient(90deg, var(--theme-grid-color) 2px, transparent 2px)`,
                        backgroundSize: '80px 80px',
                        animation: 'grid-move 20s linear infinite'
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: `linear-gradient(var(--theme-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--theme-grid-color) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--theme-blob-bg),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--theme-blob-bg),transparent_50%)]" />

                <div className="mouse-glow absolute w-[800px] h-[800px] rounded-full blur-[80px] transition-opacity duration-300 ease-out" />

                <div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse duration-[4000ms]" 
                    style={{ backgroundColor: 'var(--theme-blob-bg)' }}
                />
                <div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse duration-[6000ms] delay-2000" 
                    style={{ backgroundColor: 'var(--theme-blob-bg)' }}
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-7xl mx-auto">

                    {/* Left Side: Text */}
                    <div className={`flex-1 text-center lg:text-left max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="space-y-4 mb-8">
                            <p className="text-xl text-gray-400 font-medium tracking-wide">Hey! I'm</p>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                                <span className="inline-block text-white"
                                    style={{ fontFamily: "Offside", fontWeight: "bold" }}>
                                    Dipesh Soni
                                </span>
                            </h1>

                            {/* Typewriter Container */}
                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl mt-4">
                                <Code2 className="w-5 h-5 text-gray-400" />
                                <div className="text-xl sm:text-2xl font-medium text-white min-w-[200px] text-left">
                                    {textState.text}
                                    <span className="animate-pulse border-l-2 border-white ml-1 h-6 inline-block align-middle" />
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                            Passionate about creating beautiful and functional web experiences. Learning and building with
                            <span className="text-white font-semibold"> React</span>,
                            <span className="text-white font-semibold"> Vite</span>,
                            and modern frontend technologies.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
                            <Button size="lg" onClick={() => scrollToSection('#projects')} className="bg-white text-black text-lg hover:bg-gray-200 transition-all group px-8 rounded-lg">
                                View Work
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => scrollToSection('#contact')} className="text-lg text-gray-400 hover:text-white px-8 rounded-lg">
                                <Mail className="mr-2 w-5 h-5" />
                                Let's Talk
                            </Button>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center lg:justify-start gap-6">
                            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Connect</span>
                            <div className="h-px w-8 bg-white/10" />
                            {heroSocials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200
                                    hover:-rotate-15"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Profile Image */}
                    <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative group w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
                            {/* Glow Backdrop */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-white/10 via-transparent to-white/5 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />

                            {/* Image Frame */}
                            <div className="relative h-full w-full rounded-[2rem] border-2 border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-3 group-hover:border-white/20 transition-all duration-500">
                                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                                    <img
                                        src={dipesh}
                                        alt="Dipesh Soni"
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

                                    {/* Tech Icons Overlay */}
                                    <div className="absolute inset-0 flex items-end justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="flex gap-2">
                                            {[Laptop, Code2].map((Icon, idx) => (
                                                <div key={idx} className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Shimmer Border Animation */}
                                <div
                                    className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                                        animation: 'shimmer 3s infinite linear'
                                    }}
                                />
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-3xl" />
                            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-3xl" />

                            {/* Floating Stats */}
                            <FloatingCard position="-bottom-6 -left-6" label="Status" value="Open to Work" delay={0} />
                            <FloatingCard position="-top-6 -right-6" label="Projects" value="5+" delay={100} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sub-component for cleaner code
const FloatingCard = ({ position, label, value, delay }: { position: string; label: string; value: string; delay: number }) => (
    <div className={`absolute ${position}`} style={{ transitionDelay: `${delay}ms` }}>
        <div className="relative">
            <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-20" />
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3 shadow-2xl">
                <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                <div className="text-xl font-bold text-white">{value}</div>
            </div>
        </div>
    </div>
);

export default Hero;