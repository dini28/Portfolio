'use client';

import Section from '../common/Section';
import { EXPERIENCE_DATA } from '../../data/experience';

export default function Experience() {
    return (
        <Section
            id="experience"
            index="02"
            title="Experience & leadership"
            intro="Design work, club leadership and volunteering, most recent first."
        >
            <ol className="border-t border-white/[0.08]">
                {EXPERIENCE_DATA.map((item) => (
                    <li
                        key={`${item.role}-${item.organization}`}
                        className="group grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-7 border-b border-white/[0.08]"
                    >
                        <div className="sm:col-span-3 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
                            <span className="font-mono text-xs text-white/50 tabular-nums">{item.period}</span>
                            {item.current && (
                                <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-accent" />
                                    Current
                                </span>
                            )}
                        </div>
                        <div className="sm:col-span-9">
                            <h3 className="text-lg font-semibold tracking-tight text-white">{item.role}</h3>
                            <p className="mt-0.5 text-white/55">{item.organization}</p>
                            <ul className="mt-3 space-y-1.5">
                                {item.points.map((point) => (
                                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/65">
                                        <span className="mt-[0.55rem] w-1 h-1 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
