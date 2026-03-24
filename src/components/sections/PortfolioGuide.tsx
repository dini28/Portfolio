import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Sparkles, Code, Award, Rocket, Mail, Star, Zap, Info, BookOpen, Target, Lightbulb, Trophy, MapPin, CheckCircle, ArrowRight, Mouse } from 'lucide-react';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    threshold: number;
}

type SectionKey = 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'general';

const PortfolioGuide = () => {
    const [isVisible] = useState(true);
    const [currentFact, setCurrentFact] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [currentSection, setCurrentSection] = useState<SectionKey>('hero');
    const [seenFacts, setSeenFacts] = useState<Set<string>>(new Set());
    const [totalClicks, setTotalClicks] = useState(0);
    const [showWelcome, setShowWelcome] = useState(true);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [characterMood, setCharacterMood] = useState('info');
    const [isIdle, setIsIdle] = useState(false);
    const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);

    useEffect(() => {
        const savedAchievements = localStorage.getItem('portfolio_achievements');
        const savedSeenFacts = localStorage.getItem('portfolio_seen_facts');
        const savedTotalClicks = localStorage.getItem('portfolio_total_clicks');

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
        if (savedSeenFacts) setSeenFacts(new Set(JSON.parse(savedSeenFacts)));
        if (savedTotalClicks) setTotalClicks(parseInt(savedTotalClicks));
    }, []);

    useEffect(() => {
        localStorage.setItem('portfolio_achievements', JSON.stringify(achievements));
        localStorage.setItem('portfolio_seen_facts', JSON.stringify(Array.from(seenFacts)));
        localStorage.setItem('portfolio_total_clicks', totalClicks.toString());
    }, [achievements, seenFacts, totalClicks]);

    const facts: Record<SectionKey, string[]> = useMemo(() => ({
        hero: [
            "Welcome! I'm Dipesh's portfolio assistant. Click me in each section to discover achievements and technical details.",

            "This portfolio is built with React 18+ and modern ES6+ JavaScript for optimal performance.",

            "The design uses a minimalist black & white color scheme for professional elegance and readability.",

            "Every animation you see is optimized for 60fps performance using CSS transforms and transitions."
        ],
        about: [
            "National Achievement: Dipesh won CODEFIESTA 3.0, a prestigious national-level hackathon.",

            "Education: Currently pursuing Computer Science at Geetanjali Institute of Technical Studies(GITS).",

            "The glassmorphism effect here uses backdrop-filter CSS property with blur and transparency.",

            "This section showcases problem-solving abilities and passion for innovative technology solutions."
        ],
        skills: [
            "Frontend Stack: React.js, Tailwind CSS, and responsive design principles mastered through multiple projects.",

            "Backend Skills: Node.js and Express.js used to build scalable REST APIs and server-side applications.",

            "These interactive 3D card effects use CSS transform properties and JavaScript event listeners.",

            "Full-Stack Capability: Combines MERN stack (MongoDB, Express, React, Node) for complete web solutions.",

            "Modern tools like Vite for blazing-fast builds and hot module replacement during development."
        ],
        projects: [
            "Ghummakkad: A travel platform with 15+ properties across 9 Rajasthan destinations - real data integration.",

            "AI Art Generator: Uses Stability AI's API to generate images from text prompts - modern AI implementation.",

            "Expense Tracker: Features real-time budget monitoring with visual charts using Chart.js library.",

            "All projects are production-ready, deployed on Vercel/Render, and include GitHub source code.",

            "Each project demonstrates real-world problem-solving from concept to deployment."
        ],
        contact: [
            "Email: dipeshrathod2706@gmail.com - Professional inquiries welcome.",
            "LinkedIn & GitHub: Active profiles with projects, contributions, and professional network.",
            "The contact form includes client-side validation using HTML5 form attributes and JavaScript.",
            "Response time: Typically 24-48 hours for collaboration and job opportunities."
        ],
        general: [
            "This entire portfolio demonstrates full-stack development capabilities from concept to deployment.",

            "Smooth scroll behavior is achieved using CSS scroll-behavior: smooth and Intersection Observer API.",

            "Mobile-first responsive design ensures perfect viewing on devices from 320px to 4K displays.",

            "Performance optimized: Lazy loading images, code splitting, and minimal bundle size for fast load times.",

            "Every element is carefully crafted for both aesthetics and user experience."
        ]
    }), []);


    const achievementsList = useMemo(() => [
        { id: 'first_click', title: 'Curious Explorer', description: 'Clicked the guide', icon: Target, threshold: 1 },
        { id: 'five_clicks', title: 'Knowledge Seeker', description: 'Discovered 5 facts', icon: BookOpen, threshold: 5 },
        { id: 'all_sections', title: 'Section Master', description: 'Visited all sections', icon: MapPin, threshold: -1 },
        { id: 'ten_clicks', title: 'Super Explorer', description: 'Found 10 facts', icon: Star, threshold: 10 },
        { id: 'easter_egg', title: 'Secret Seeker', description: 'Found the hidden skill', icon: Sparkles, threshold: -3 },
        { id: 'completionist', title: 'Completionist', description: 'Saw all facts', icon: Trophy, threshold: -2 }
    ], []);

    const updatePosition = useCallback(() => {
        const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
        const index = sections.indexOf(currentSection);

        const isMobile = window.innerWidth < 768;
        const margin = isMobile ? 16 : 40;
        const iconSize = isMobile ? 40 : 56; // 10rem (40px) vs 14rem (56px)

        const isLeft = index % 2 === 0;
        const x = isLeft ? margin : window.innerWidth - iconSize - margin;
        const y = 30 + (Math.random() * 10); // Slight vertical variance for organic feel

        setPosition({ x, y });

        const moods = ['info', 'sparkles', 'lightbulb'];
        setCharacterMood(moods[Math.floor(Math.random() * moods.length)]);
    }, [currentSection]);

    // Initial position, periodic updates, and resize handler
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        updatePosition();

        const handleResize = () => updatePosition();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [updatePosition]);

    useEffect(() => {
        const idleInterval = setInterval(() => {
            setIsIdle(true);
            setTimeout(() => setIsIdle(false), 1000);
        }, 5000);

        return () => clearInterval(idleInterval);
    }, []);

    const CharacterIcon = useMemo(() => {
        const iconMap: Record<string, Record<string, React.ElementType>> = {
            about: { info: Award, sparkles: Star, lightbulb: Lightbulb },
            skills: { info: Code, sparkles: Zap, lightbulb: Lightbulb },
            projects: { info: Rocket, sparkles: Star, lightbulb: Target },
            contact: { info: Mail, sparkles: ArrowRight, lightbulb: Info },
            hero: { info: Sparkles, sparkles: Star, lightbulb: Info }
        };

        const sectionIcons = iconMap[currentSection] || iconMap.hero;
        return sectionIcons[characterMood] || sectionIcons.info;
    }, [currentSection, characterMood]);

    const getSectionTitle = useCallback(() => {
        const titles: Record<string, string> = {
            hero: 'Welcome',
            about: 'About Dipesh',
            skills: 'Technical Skills',
            projects: 'Featured Projects',
            contact: 'Get in Touch'
        };
        return titles[currentSection] || 'Portfolio';
    }, [currentSection]);

    const SectionIcon = useMemo(() => {
        const icons: Record<string, React.ElementType> = {
            hero: Sparkles,
            about: Award,
            skills: Code,
            projects: Rocket,
            contact: Mail
        };
        return icons[currentSection] || Sparkles;
    }, [currentSection]);

    const getAvailableFacts = useCallback(() => {
        const sectionFacts = facts[currentSection] || facts.general;

        const unseenFacts = sectionFacts.filter((fact: string) => !seenFacts.has(fact));

        // If all facts seen, reset for this section
        if (unseenFacts.length === 0) {
            return sectionFacts;
        }
        return unseenFacts;
    }, [currentSection, facts, seenFacts]);

    const checkAchievements = useCallback((clicks: number) => {
        const newAchievements: Achievement[] = [];

        achievementsList.forEach(achievement => {
            if (achievement.threshold > 0 &&
                clicks === achievement.threshold &&
                !achievements.find(a => a.id === achievement.id)) {
                newAchievements.push(achievement);
            }
        });

        // All sections visited achievement
        if (clicks >= 5 && !achievements.find(a => a.id === 'all_sections')) {
            const sectionsVisited = new Set();
            seenFacts.forEach(fact => {
                Object.entries(facts).forEach(([section, sectionFacts]) => {
                    if (sectionFacts.includes(fact)) sectionsVisited.add(section);
                });
            });
            if (sectionsVisited.size >= 5) {
                const achievement = achievementsList.find(a => a.id === 'all_sections');
                if (achievement) newAchievements.push(achievement);
            }
        }

        // Completionist achievement
        const totalFacts = Object.values(facts).flat().length;
        if (seenFacts.size === totalFacts && !achievements.find(a => a.id === 'completionist')) {
            const achievement = achievementsList.find(a => a.id === 'completionist');
            if (achievement) newAchievements.push(achievement);
        }

        if (newAchievements.length > 0) {
            setAchievements(prev => [...prev, ...newAchievements]);
            setLatestAchievement(newAchievements[newAchievements.length - 1] || null);
            setCharacterMood('sparkles');
        }
    }, [achievements, achievementsList, seenFacts, facts]);

    useEffect(() => {
        if (latestAchievement) {
            const timer = setTimeout(() => {
                setLatestAchievement(null);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [latestAchievement]);

    const showRandomFact = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCharacterMood('sparkles');

        const availableFacts = getAvailableFacts();

        const randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];

        setCurrentFact(randomFact);
        setSeenFacts(prev => new Set([...prev, randomFact]));

        const newClickCount = totalClicks + 1;
        setTotalClicks(newClickCount);
        checkAchievements(newClickCount);
        setTimeout(() => {
            setCurrentFact(null);
            setIsAnimating(false);
            setCharacterMood('info');
        }, 10000);
    }, [getAvailableFacts, totalClicks, checkAchievements, isAnimating]);

    useEffect(() => {
        const handleScroll = () => {
            const sections: SectionKey[] = ['hero', 'about', 'skills', 'projects', 'contact'];

            const viewportHeight = window.innerHeight;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        handleScroll(); // Initial call
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'i' || e.key === 'I') {
                showRandomFact();
            } else if (e.key === 'Escape') {
                setCurrentFact(null);
            } else if (e.key === 'm' || e.key === 'M') {
                updatePosition();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // Secret achievement trigger: Ctrl + S
                if (!achievements.find(a => a.id === 'easter_egg')) {
                    const easterEgg = achievementsList.find(a => a.id === 'easter_egg');
                    if (easterEgg) {
                        setAchievements(prev => [...prev, easterEgg]);
                        setLatestAchievement(easterEgg);
                        setCharacterMood('sparkles');
                        setCurrentFact("Wow! You found the secret shortcut! I've unlocked a hidden achievement for you. Keep exploring!");
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showRandomFact, updatePosition, achievements, achievementsList]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const progressPercent = Math.round((seenFacts.size / Object.values(facts).flat().length) * 100);

    return (
        <>
            <div
                className="fixed z-50 transition-all duration-1000 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}vh`,
                }}
                role="button"
                aria-label="Portfolio guide - click for information"
                tabIndex={0}
            >
                <div
                    className="relative group cursor-pointer"
                    onClick={showRandomFact}
                    onKeyPress={(e) => e.key === 'Enter' && showRandomFact()}
                >
                    <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />

                    <div
                        className={`relative w-10 h-10 md:w-14 md:h-14 bg-black rounded-full border-2 border-white shadow-2xl flex items-center justify-center transition-all duration-300 ${isIdle ? 'scale-95' : 'group-hover:scale-110'
                            } group-active:scale-95`}>
                        <CharacterIcon
                            className={`w-4 h-4 md:w-6 md:h-6 text-white transition-transform duration-300 ${isIdle ? 'animate-pulse' : ''
                                }`}
                            strokeWidth={2}
                        />

                        <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-20" />

                        <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform duration-500 border-2 border-black">
                            <Info className="w-2.5 h-2.5 md:w-3 md:h-3 text-black" strokeWidth={2.5} />
                        </div>

                        {totalClicks > 0 && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg border-2 border-black group-hover:scale-110 transition-transform">
                                {totalClicks}
                            </div>
                        )}
                    </div>

                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-black/10 font-medium hidden md:block">
                        <Mouse className="inline w-3 h-3 mr-1.5" />
                        Click for insights
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-t border-l border-black/10 rotate-45" />
                    </div>
                </div>
            </div>

            {totalClicks > 0 && (
                <div className="fixed top-24 left-6 z-40 bg-black text-white rounded-xl px-4 py-3 shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-white" strokeWidth={2} />
                        <div>
                            <div className="text-[10px] font-semibold tracking-wide">Discovery Progress</div>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden border border-white/10">
                                    <div
                                        className="h-full bg-white transition-all duration-700"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                <span className="text-xs font-mono font-semibold">{progressPercent}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentFact && (
                <div
                    className="fixed z-50 transition-all duration-500 animate-in fade-in slide-in-from-left-4"
                    style={{
                        left: `${Math.min(position.x + 80, window.innerWidth - 300)}px`,
                        top: `${position.y}vh`,
                        maxWidth: '280px',
                    }}
                >
                    <div className="relative bg-black text-white rounded-xl p-3 shadow-2xl border border-white/30">
                        <div className="absolute left-0 top-10 -translate-x-3 w-6 h-6 bg-black border-l border-b border-white/30 rotate-45" />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentFact(null);
                                setIsAnimating(false);
                            }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-lg border-2 border-black"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" strokeWidth={2.5} />
                        </button>

                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/20">
                            <div className="p-1.5 bg-white/10 rounded-lg border border-white/20">
                                <SectionIcon className="w-4 h-4" strokeWidth={2} />
                            </div>
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                {getSectionTitle()}
                            </span>
                        </div>

                        <p className="text-xs leading-relaxed text-white/90">{currentFact}</p>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                            <span className="text-white/60 flex items-center gap-1.5 font-medium">
                                <Zap className="w-3 h-3" strokeWidth={2} />
                                Press 'I' for more
                            </span>
                            <span className="text-white/40 font-mono">
                                {seenFacts.size}/{Object.values(facts).flat().length}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {!currentFact && showWelcome && (
                <div
                    className="fixed bottom-8 right-8 z-40 bg-black text-white rounded-xl p-4 shadow-2xl border border-white/30 max-w-sm animate-in fade-in slide-in-from-bottom-6"
                    style={{ animationDelay: '1s', animationDuration: '0.6s' }}
                >
                    <button
                        onClick={() => setShowWelcome(false)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-lg border-2 border-black"
                        aria-label="Close welcome message"
                    >
                        <X className="w-4 h-4" strokeWidth={2.5} />
                    </button>

                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg border-2 border-black">
                            <Info className="w-5 h-5 text-black" strokeWidth={2} />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1 text-base flex items-center gap-2">
                                Interactive Portfolio Guide
                                <Sparkles className="w-4 h-4" strokeWidth={2} />
                            </h4>
                            <p className="text-xs text-white/80 leading-relaxed mb-2">
                                I'll move around as you explore. Click me to discover:
                            </p>
                            <ul className="text-[10px] text-white/70 space-y-1.5">
                                <li className="flex items-center gap-2">
                                    <Award className="w-3.5 h-3.5" strokeWidth={2} />
                                    Dipesh's achievements & qualifications
                                </li>
                                <li className="flex items-center gap-2">
                                    <Code className="w-3.5 h-3.5" strokeWidth={2} />
                                    Technical implementation details
                                </li>
                                <li className="flex items-center gap-2">
                                    <Rocket className="w-3.5 h-3.5" strokeWidth={2} />
                                    Project features & technologies
                                </li>
                            </ul>
                            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/60 font-medium">
                                <Lightbulb className="inline w-3 h-3 mr-1" strokeWidth={2} />
                                Keyboard: Press 'I' for info | 'M' to move
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============ ACHIEVEMENT NOTIFICATIONS ============ */}
            {latestAchievement && (
                <div
                    key={latestAchievement.id}
                    className="fixed top-24 right-8 z-50 bg-white text-black rounded-xl p-4 shadow-2xl border-2 border-black animate-in fade-in slide-in-from-right-6"
                    style={{ animationDuration: '0.5s' }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                            {latestAchievement.icon && <latestAchievement.icon className="w-6 h-6 text-white" strokeWidth={2} />}
                        </div>
                        <div>
                            <div className="font-bold text-sm flex items-center gap-2">
                                Achievement Unlocked
                                <CheckCircle className="w-4 h-4" strokeWidth={2} />
                            </div>
                            <div className="text-sm font-semibold mt-0.5">{latestAchievement.title}</div>
                            <div className="text-xs opacity-70">{latestAchievement.description}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============ CUSTOM ANIMATIONS ============ */}
            <style>
                {`
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slide-in-from-bottom-6 {
                        from { transform: translateY(1.5rem); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes slide-in-from-top-4 {
                        from { transform: translateY(-1rem); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes slide-in-from-left-4 {
                        from { transform: translateX(-1rem); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }

                    @keyframes slide-in-from-right-6 {
                        from { transform: translateX(1.5rem); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }

                    .animate-in {
                        animation: fade-in 0.4s ease-out;
                    }

                    /* Responsive adjustments */
                    @media (max-width: 640px) {
                        .fixed.bottom-8.right-8 {
                            bottom: 1rem;
                            right: 1rem;
                            max-width: calc(100vw - 2rem);
                        }
                    }

                    /* Accessibility - professional focus state */
                    [role="button"]:focus-visible {
                        outline: 2px solid #fff;
                        outline-offset: 4px;
                    }

                    /* Performance optimization */
                    * {
                        backface-visibility: hidden;
                        -webkit-font-smoothing: antialiased;
                    }
                `}
            </style>
        </>
    );
};

export default PortfolioGuide;