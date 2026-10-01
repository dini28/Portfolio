'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function PaddingMarker() {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<number | null>(null);

    useEffect(() => {
        const section = ref.current?.parentElement;
        if (!section) return;
        const observer = new ResizeObserver(() => setValue(Math.round(parseFloat(getComputedStyle(section).paddingTop))));
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="spec-gap pointer-events-none absolute top-0 hidden h-[var(--section-y)] md:block"
        >
            <div className="spec-redline h-full">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-accent/60">
                    padding-top · {value ?? '—'}
                </span>
            </div>
        </div>
    );
}

interface SectionProps {
    id: string;
    index: string;
    title: ReactNode;
    label?: string;
    intro?: ReactNode;
    aside?: ReactNode;
    /** Full-width content placed between the header and the shell-aligned children. */
    bleed?: ReactNode;
    children?: ReactNode;
}

export default function Section({ id, index, title, label, intro, aside, bleed, children }: SectionProps) {
    const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
    const eyebrow = label ?? (typeof title === 'string' ? title : id);

    return (
        <section id={id} aria-labelledby={`${id}-title`} className="relative section-y">
            <PaddingMarker />
            <div className="shell">
                <header ref={ref} data-visible={isVisible} className="reveal grid-12 gap-y-6 border-t hairline pt-6">
                    <p className="t-label col-span-4 flex items-center gap-3 self-start md:col-span-3 md:pt-3">
                        <span className="text-accent">{index}</span>
                        <span aria-hidden="true" className="h-px w-6 bg-white/20" />
                        {eyebrow}
                    </p>
                    <div className="col-span-4 md:col-span-9">
                        <h2 id={`${id}-title`} className="t-h2">
                            {title}
                        </h2>
                        {(intro || aside) && (
                            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                {intro && <p className="t-lead">{intro}</p>}
                                {aside}
                            </div>
                        )}
                    </div>
                </header>
            </div>
            {bleed && <div className="mt-14 md:mt-20">{bleed}</div>}
            {children && (
                <div className="shell">
                    <div className="mt-14 md:mt-20">{children}</div>
                </div>
            )}
        </section>
    );
}
