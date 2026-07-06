import { GraduationCap, Code2, Rocket, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionBackground from '../common/SectionBackground';
import about from '../../assets/about.webp';

const About = () => {
    // We use separate hooks to create a staggered entrance effect
    const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.1 });
    const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
    const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-20 bg-transparent relative overflow-hidden"
        >
            <SectionBackground animated />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 relative z-10">
                {/* --- Header --- */}
                <div className={`text-center mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-lg text-gray-400 font-medium mb-4 uppercase tracking-wider">Get To Know More</p>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full" />
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-16 max-w-7xl mx-auto">

                    {/* --- Left: Image Section --- */}
                    <div
                        ref={imageRef}
                        className={`shrink-0 lg:w-1/2 transition-all duration-1000 ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    >
                        <div className="relative group max-w-md mx-auto">

                            {/* Decorative Glow */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                            {/* Image Frame */}
                            <div className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-3 group-hover:border-white/20 transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                <div className="overflow-hidden rounded-2xl relative">
                                    <img
                                        src={about}
                                        alt="Dipesh Soni - Frontend Developer"
                                        loading="lazy"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 grayscale"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Geometric Corners */}
                            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-white/20 rounded-tr-3xl" />
                            <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-white/20 rounded-bl-3xl" />
                        </div>
                    </div>

                    {/* --- Right: Content Section --- */}
                    <div
                        ref={contentRef}
                        className={`lg:w-1/2 space-y-8 transition-all duration-1000 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                    >

                        {/* Info Cards Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Education Card */}
                            <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500">
                                <CardContent className="p-6 text-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <GraduationCap className="w-7 h-7 text-black" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Education</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">B.Tech in CSE</p>
                                </CardContent>
                            </Card>

                            {/* Status Card */}
                            <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500">
                                <CardContent className="p-6 text-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Award className="w-7 h-7 text-black" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Projects Built</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">5+ Personal Projects</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* My Journey Story */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 mb-4">
                                <BookOpen className="w-6 h-6 text-white" />
                                <h3 className="text-2xl font-bold text-white">My Journey</h3>
                            </div>
                            <div className="space-y-4">
                                <p className="text-base leading-relaxed text-gray-400 text-justify">
                                    <span className="font-semibold text-white">I'm a frontend developer passionate about crafting exceptional web experiences.</span> What started with curiosity during my first semester has grown into a genuine commitment to building things on the web. My first website was far from perfect, but seeing it live taught me something important — code has the power to create real value.
                                </p>
                                <p className="text-base leading-relaxed text-gray-400 text-justify">
                                    Over the past year, I've sharpened my skills by shipping real projects — from responsive landing pages to full-stack applications. Each project pushed me to learn something new. Winning <span className="font-semibold text-white">CODEFIESTA 3.0 National Hackathon</span> taught me how to deliver under pressure and collaborate effectively.
                                </p>
                                <p className="text-base leading-relaxed text-gray-400 text-justify">
                                    I work confidently with React and modern frontend tools, and I'm actively expanding into Next.js and full-stack development. I thrive on challenges, love learning from the developer community, and I'm excited to contribute to projects that push boundaries.
                                </p>
                            </div>
                        </div>

                        {/* Tech Stack Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Current Stack */}
                            <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 relative overflow-hidden group">
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius: '0 100% 0 0' }} />
                                <CardContent className="p-5 relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-lg flex items-center justify-center shadow-lg">
                                            <Code2 className="w-5 h-5 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Comfortable With</h4>
                                            <p className="text-xs text-gray-500">Core technologies</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['HTML/CSS', 'JavaScript', 'React', 'Tailwind'].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 bg-white/10 border border-white/20 text-gray-300 rounded-lg text-xs font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Learning Next */}
                            <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius: '0 0 0 100%' }} />
                                <CardContent className="p-5 relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-lg flex items-center justify-center shadow-lg">
                                            <Rocket className="w-5 h-5 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Learning Next</h4>
                                            <p className="text-xs text-gray-500">Currently exploring</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Next.js', 'TypeScript', 'Node.js'].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 bg-white/10 border border-white/20 text-gray-300 rounded-lg text-xs font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;