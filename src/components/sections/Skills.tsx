import { useState } from 'react';
import { Code2, Database, Wrench, X } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal';
import SectionBackground from '../common/SectionBackground';
import { SKILL_CATEGORIES, getSkillLevel } from '../../data/skills';


const SKILL_ICON_MAP = { Database, Code2, Wrench } as const;

const Skills = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });
    const { containerRef, visibleItems } = useStaggerReveal<HTMLDivElement>(SKILL_CATEGORIES.length, { staggerDelay: 150 });
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const getIcon = (iconName: string) => {
        const IconComp = SKILL_ICON_MAP[iconName as keyof typeof SKILL_ICON_MAP];
        return IconComp ? <IconComp className="w-8 h-8" /> : null;
    };

    return (
        <section ref={sectionRef} id="skills" className="py-20 bg-neutral-950 relative overflow-hidden">
            {/* Background */}
            <SectionBackground variant="subtle" animated />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-lg text-gray-400 font-medium mb-4 uppercase tracking-wider">Technical Proficiency</p>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                        Skills & Technologies
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full mb-4" />
                    <p className="text-sm text-gray-500">Click on any card to see proficiency levels</p>
                </div>

                {/* Skills Grid */}
                <div ref={containerRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {SKILL_CATEGORIES.map((category, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-700 ${visibleItems[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        >
                            <Card
                                className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 cursor-pointer group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
                                onClick={() => setActiveIndex(index)}
                            >
                                <CardContent className="p-8">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                            {getIcon(category.iconName)}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                                        <div className="h-0.5 w-12 mx-auto bg-white/50 rounded-full" />
                                    </div>

                                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                                        {category.skills.map((skill) => (
                                            <span key={skill.name} className="px-3 py-1.5 bg-white/10 border border-white/20 text-gray-300 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-xs text-gray-500 text-center group-hover:text-gray-400 transition-colors">
                                        Click to view proficiency
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Additional Note */}
                <div className={`text-center mt-16 transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="inline-block border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
                            <p className="text-base sm:text-lg text-gray-400 leading-relaxed italic">
                                "Always learning and exploring new technologies. The tech world moves fast, and I enjoy keeping up with the latest trends and best practices."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Overlay */}
            {activeIndex !== null && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setActiveIndex(null)}>
                    <div className="bg-black border-2 border-white/20 rounded-2xl max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-400 rounded-lg flex items-center justify-center">
                                    {getIcon(SKILL_CATEGORIES[activeIndex].iconName)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{SKILL_CATEGORIES[activeIndex].title}</h3>
                                    <p className="text-xs text-gray-500">Proficiency Breakdown</p>
                                </div>
                            </div>
                            <button onClick={() => setActiveIndex(null)} className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                            {SKILL_CATEGORIES[activeIndex].skills.map((skill, idx) => (
                                <div key={skill.name} className="space-y-2" style={{ animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both` }}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">{skill.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-white text-black">
                                                {getSkillLevel(skill.proficiency)}
                                            </span>
                                            <span className="text-sm font-bold text-white">{skill.proficiency}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${skill.proficiency}%` }}
                                        />
                                    </div>
                                    {skill.projects && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Used in:</span>
                                            {skill.projects.map((p: string) => (
                                                <span key={p} className="text-[10px] text-gray-400 font-medium">
                                                    • {p}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default Skills;