import { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, X, Lightbulb, Target, Rocket as RocketIcon } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal';
import SectionBackground from '../common/SectionBackground';
import { PROJECTS_DATA } from '../../data/projects';



const Project = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
    const { containerRef, visibleItems } = useStaggerReveal<HTMLDivElement>(PROJECTS_DATA.length, { staggerDelay: 200 });
    const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS_DATA)[number] | null>(null);

    return (
        <section ref={sectionRef} id="projects" className="py-20 bg-black relative overflow-hidden">
            {/* Background */}
            <SectionBackground />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-lg text-gray-400 font-medium mb-4 uppercase tracking-wider">Featured Work</p>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                        Projects
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full" />
                </div>

                {/* Projects Grid */}
                <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {PROJECTS_DATA.map((project, index) => (
                        <div
                            key={project.title}
                            className={`transition-all duration-700 ${visibleItems[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        >
                            <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-500 overflow-hidden group h-full flex flex-col hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <div className="px-3 py-1.5 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg">
                                            <p className="text-xs font-semibold text-white">{project.subtitle}</p>
                                        </div>
                                        {project.status && (
                                            <div className="w-fit px-3 py-1 bg-white text-black border border-white/20 rounded-lg animate-pulse">
                                                <p className="text-[10px] font-bold uppercase tracking-wider">{project.status}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                                            >
                                                <ExternalLink className="w-4 h-4 text-black" />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                                            >
                                                <Github className="w-4 h-4 text-black" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <CardContent className="p-6 flex flex-col flex-grow">
                                    {/* Title */}
                                    <h3
                                        className="text-2xl font-bold text-white mb-3 flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {project.title}
                                        <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-medium bg-white/10 border border-white/20 text-gray-300 rounded-md hover:bg-white hover:text-black transition-all duration-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-white border-white/10 hover:bg-white hover:text-black mt-auto"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        View Case Study
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`text-center mt-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                        asChild
                    >
                        <a href="https://github.com/dini28" target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            View All Projects on GitHub
                        </a>
                    </Button>
                </div>
            </div>

            {/* Case Study Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-2xl bg-black border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header/Image */}
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-6 left-8">
                                <h3 className="text-3xl font-bold text-white mb-1">{selectedProject.title}</h3>
                                <p className="text-gray-400 font-medium">{selectedProject.subtitle}</p>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-8">
                            <div className="grid gap-6">
                                {/* Problem */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                        <Target className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-2">The Problem</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.caseStudy.problem}</p>
                                    </div>
                                </div>

                                {/* Solution */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                        <Lightbulb className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-2">Technical Solution</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.caseStudy.solution}</p>
                                    </div>
                                </div>

                                {/* Impact */}
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                        <RocketIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-2">Impact & Result</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.caseStudy.impact}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {selectedProject.technologies.slice(0, 3).map(tech => (
                                        <span key={tech} className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{tech}</span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {selectedProject.githubUrl && (
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {selectedProject.liveUrl && (
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Project;
