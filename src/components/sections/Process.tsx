'use client';

import { useState } from 'react';
import { CodeXml, PenTool } from 'lucide-react';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { PROCESS_STEPS, type ProcessSide } from '../../data/process';

const SIDE: Record<ProcessSide, { label: string; icon: typeof PenTool }> = {
    design: { label: 'Design', icon: PenTool },
    code: { label: 'Code', icon: CodeXml },
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function Process() {
    const [active, setActive] = useState<number | null>(null);
    const handoffAt = PROCESS_STEPS.findIndex((step) => step.side === 'code');

    return (
        <Section
            id="process"
            index="03"
            label="Process"
            title={
                <>
                    From first sketch to <em>shipped</em> product.
                </>
            }
            intro="Most products lose detail in the handoff between designer and developer. I work on both sides of it, so the decisions made in Figma survive all the way to production."
        >
            <Reveal className="hidden lg:block">
                <div className="grid-12 relative">
                    {PROCESS_STEPS.map((step, i) => {
                        const isCode = step.side === 'code';
                        const lit = active === i;
                        return (
                            <div key={step.title} className="col-span-3">
                                <div
                                    className={`h-2 rounded-full transition-colors duration-500 ${
                                        isCode
                                            ? lit
                                                ? 'bg-accent'
                                                : 'bg-accent/35'
                                            : lit
                                              ? 'bg-white'
                                              : 'border border-dashed border-white/30'
                                    }`}
                                />
                                <p className={`mt-3 font-mono text-[11px] ${lit ? 'text-white' : 'text-white/40'}`}>
                                    {pad(i + 1)} · {SIDE[step.side].label}
                                </p>
                            </div>
                        );
                    })}
                    {handoffAt > 0 && (
                        <div
                            className="pointer-events-none absolute -top-12 flex -translate-x-1/2 flex-col items-center"
                            style={{ left: `${(handoffAt / PROCESS_STEPS.length) * 100}%` }}
                        >
                            <span className="whitespace-nowrap rounded-[var(--r-sm)] bg-raised px-2.5 py-1 font-mono text-[10px] text-white/70">
                                No handoff gap
                            </span>
                            <span className="h-9 w-px bg-white/30" />
                        </div>
                    )}
                </div>
            </Reveal>

            <ol className="grid-12 gap-y-6 lg:mt-10">
                {PROCESS_STEPS.map((step, i) => {
                    const { label, icon: Icon } = SIDE[step.side];
                    const isCode = step.side === 'code';
                    return (
                        <li key={step.title} className="col-span-4 md:col-span-6 lg:col-span-3">
                            <Reveal delay={i * 90} className="h-full">
                                <article
                                    onMouseEnter={() => setActive(i)}
                                    onMouseLeave={() => setActive(null)}
                                    className="surface group flex h-full flex-col p-6 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/20"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="t-serif text-6xl leading-none text-white/15 transition-colors duration-500 group-hover:text-accent">
                                            {pad(i + 1)}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-[var(--r-sm)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${
                                                isCode ? 'bg-accent/10 text-accent' : 'border border-dashed border-white/25 text-white/60'
                                            }`}
                                        >
                                            <Icon className="h-3 w-3" />
                                            {label}
                                        </span>
                                    </div>
                                    <h3 className="t-h3 mt-10">{step.title}</h3>
                                    <p className="t-body mt-3 text-sm">{step.summary}</p>
                                    <ul className="mt-6 space-y-2 border-t hairline pt-5">
                                        {step.outputs.map((output) => (
                                            <li key={output} className="flex items-center gap-3 text-sm text-white/70">
                                                <span aria-hidden="true" className="h-px w-3 bg-accent" />
                                                {output}
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Tools">
                                        {step.tools.map((tool) => (
                                            <li key={tool} className="chip">
                                                {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            </Reveal>
                        </li>
                    );
                })}
            </ol>
        </Section>
    );
}
