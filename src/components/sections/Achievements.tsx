'use client';

import Section from '../common/Section';
import { ACHIEVEMENTS } from '../../data/experience';

export default function Achievements() {
    return (
        <Section id="achievements" index="04" title="Achievements" intro="Hackathons and innovation challenges.">
            <ol className="border-t border-white/[0.08]">
                {ACHIEVEMENTS.map((item, i) => (
                    <li
                        key={item.title}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-8 border-b border-white/[0.08]"
                    >
                        <p
                            className={`sm:col-span-3 text-3xl sm:text-4xl font-semibold leading-none tracking-[-0.04em] ${
                                i === 0 ? 'text-accent' : 'text-white'
                            }`}
                        >
                            {item.rank}
                        </p>
                        <div className="sm:col-span-9">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                                <span className="font-mono text-xs text-white/50">{item.date}</span>
                            </div>
                            <p className="mt-0.5 text-white/55">{item.organizer}</p>
                            <p className="mt-3 text-sm leading-relaxed text-white/65">{item.detail}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
