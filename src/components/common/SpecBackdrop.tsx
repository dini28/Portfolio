'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Side = 'left' | 'right';

interface Placement {
    top: string;
    side: Side;
    inset: string;
    depth: number;
}

function Placed({ top, side, inset, depth, children }: Placement & { children: ReactNode }) {
    return (
        <div
            className="spec-item absolute hidden md:block"
            style={{ top, [side]: inset, '--depth': depth } as CSSProperties}
        >
            {children}
        </div>
    );
}

/* ─── Design side: box model, redlines, frames ─── */

function BoxModel() {
    return (
        <div className="relative w-[17rem] font-mono text-[10px] text-white/35">
            <span className="absolute -top-5 left-0">margin · 48</span>
            <div className="spec-hatch-white border border-dashed border-white/20 p-6">
                <div className="relative spec-hatch border border-accent/30 p-5">
                    <span className="absolute -top-4 left-0 text-accent/55">padding · 24</span>
                    <div className="grid h-20 place-items-center border border-accent/40 bg-accent/[0.06] text-accent/60">
                        content · 172 × 80
                    </div>
                </div>
            </div>
        </div>
    );
}

function Redline({ value, length = '9rem' }: { value: string; length?: string }) {
    return (
        <div className="spec-redline relative flex flex-col items-center" style={{ height: length }}>
            <span className="absolute top-1/2 left-3 -translate-y-1/2 whitespace-nowrap bg-ink px-1 font-mono text-[10px] text-accent/60">
                {value}
            </span>
        </div>
    );
}

function Gap({ value }: { value: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="h-14 w-20 rounded-[var(--r-sm)] border border-dashed border-white/20" />
            <div className="spec-redline-x relative w-8">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent/60">{value}</span>
            </div>
            <div className="h-14 w-20 rounded-[var(--r-sm)] border border-dashed border-white/20" />
        </div>
    );
}

function Frame({ name, size }: { name: string; size: string }) {
    return (
        <div className="relative h-36 w-56 border border-accent/30">
            <span className="absolute -top-5 left-0 font-mono text-[10px] text-accent/55">{name}</span>
            <span className="absolute -bottom-5 right-0 font-mono text-[10px] text-white/30">{size}</span>
            {['-left-1 -top-1', '-right-1 -top-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((corner) => (
                <span key={corner} className={`absolute h-2 w-2 border border-accent/60 bg-ink ${corner}`} />
            ))}
            <div className="absolute inset-4 grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="bg-accent/[0.05]" />
                ))}
            </div>
        </div>
    );
}

/* ─── Developer side: code fragments ─── */

const k = 'text-accent/55';
const s = 'text-white/40';

function Code({ children }: { children: ReactNode }) {
    return <pre className="font-mono text-[11px] leading-5 text-white/25">{children}</pre>;
}

const SNIPPETS: ReactNode[] = [
    <Code key="css">
        <span className={k}>.section</span> {'{'}
        {'\n'}  padding-block: <span className={s}>var(--section-y)</span>;
        {'\n'}  display: <span className={s}>grid</span>;
        {'\n'}  gap: <span className={s}>24px</span>;
        {'\n'}
        {'}'}
    </Code>,
    <Code key="jsx">
        {'<'}
        <span className={k}>Section</span> id=<span className={s}>&quot;work&quot;</span> index=<span className={s}>&quot;02&quot;</span>
        {'>'}
        {'\n'}  {'<'}
        <span className={k}>ProjectRail</span> pinned {'/>'}
        {'\n'}
        {'</'}
        <span className={k}>Section</span>
        {'>'}
    </Code>,
    <Code key="tokens">
        <span className={k}>export const</span> space = [<span className={s}>4, 8, 12, 16, 24, 32, 48</span>];
        {'\n'}
        <span className={k}>export const</span> radius = {'{'} btn: <span className={s}>10</span>, card: <span className={s}>20</span> {'}'};
    </Code>,
    <Code key="hook">
        <span className={k}>const</span> [active, setActive] = <span className={k}>useState</span>(<span className={s}>0</span>);
        {'\n'}
        <span className={k}>useEffect</span>(() =&gt; {'{'}
        {'\n'}  observe(ref.current);
        {'\n'}
        {'}'}, []);
    </Code>,
    <Code key="tw">
        className=<span className={s}>&quot;grid-12 gap-6</span>
        {'\n'}  <span className={s}>md:col-span-8 rounded-[10px]&quot;</span>
    </Code>,
];

const ITEMS: (Placement & { node: ReactNode })[] = [
    { top: '5%', side: 'right', inset: '0%', depth: 0.05, node: <Redline value="pt · 96" /> },
    { top: '9%', side: 'left', inset: '-0.5%', depth: 0.08, node: SNIPPETS[0] },
    { top: '17%', side: 'right', inset: '0.5%', depth: 0.06, node: <BoxModel /> },
    { top: '25%', side: 'left', inset: '0.5%', depth: 0.1, node: <Frame name="Frame · About" size="1440 × 900" /> },
    { top: '33%', side: 'right', inset: '-0.5%', depth: 0.07, node: SNIPPETS[1] },
    { top: '41%', side: 'left', inset: '0%', depth: 0.05, node: <Gap value="24" /> },
    { top: '50%', side: 'right', inset: '0.5%', depth: 0.09, node: SNIPPETS[2] },
    { top: '58%', side: 'left', inset: '-0.5%', depth: 0.06, node: <Redline value="gap · 80" length="7rem" /> },
    { top: '64%', side: 'left', inset: '1.5%', depth: 0.08, node: SNIPPETS[3] },
    { top: '72%', side: 'right', inset: '0%', depth: 0.06, node: <Frame name="Card · Skill" size="320 × 46" /> },
    { top: '81%', side: 'left', inset: '0.5%', depth: 0.07, node: <BoxModel /> },
    { top: '90%', side: 'right', inset: '0.5%', depth: 0.05, node: SNIPPETS[4] },
];

// Page-tall layer of faint design specs and code; it drifts slightly slower than the page.
export default function SpecBackdrop() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            ref.current?.style.setProperty('--sy', String(window.scrollY));
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
        };
    }, []);

    return (
        <div ref={ref} aria-hidden="true" className="spec-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {ITEMS.map(({ node, ...placement }, i) => (
                <Placed key={i} {...placement}>
                    {node}
                </Placed>
            ))}
        </div>
    );
}
