'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SquareDashedMousePointer, X } from 'lucide-react';

interface Info {
    tag: string;
    cls: string;
    size: string;
    font: string;
    color: string;
    padding: string;
    margin: string;
}

const SEEN_KEY = 'inspect-hint-seen';

const isTyping = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

const px = (value: string) => Math.max(0, Math.round(parseFloat(value) || 0));
const sides = (cs: CSSStyleDeclaration, prop: 'padding' | 'margin') =>
    (['Top', 'Right', 'Bottom', 'Left'] as const).map((side) => px(cs[`${prop}${side}`]));

const toHex = (color: string) => {
    const [r, g, b] = color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0];
    return `#${[r, g, b].map((n) => Math.round(n).toString(16).padStart(2, '0')).join('')}`;
};

function describe(el: HTMLElement): Info {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const firstClass = [...el.classList].find((c) => !c.includes(':') && !c.includes('[')) ?? '';
    const family = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    return {
        tag: el.tagName.toLowerCase(),
        cls: firstClass ? `.${firstClass}` : '',
        size: `${Math.round(rect.width)} × ${Math.round(rect.height)}`,
        font: `${family} · ${px(cs.fontSize)}px · ${cs.fontWeight}`,
        color: toHex(cs.color),
        padding: sides(cs, 'padding').join(' '),
        margin: sides(cs, 'margin').join(' '),
    };
}

export default function InspectMode() {
    const [active, setActive] = useState(false);
    const [hint, setHint] = useState(false);
    const [info, setInfo] = useState<Info | null>(null);
    const target = useRef<HTMLElement | null>(null);
    const frame = useRef(0);
    const marginRef = useRef<HTMLDivElement>(null);
    const paddingRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);

    const paint = useCallback(() => {
        frame.current = 0;
        const el = target.current;
        const layers = [marginRef.current, paddingRef.current, contentRef.current, tipRef.current];
        if (layers.some((layer) => !layer)) return;
        const [marginBox, paddingBox, contentBox, tip] = layers as HTMLDivElement[];
        if (!el) {
            layers.forEach((layer) => (layer!.style.opacity = '0'));
            return;
        }

        const rect = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const [mt, mr, mb, ml] = sides(cs, 'margin');
        const [pt, pr, pb, pl] = sides(cs, 'padding');
        const [bt, br, bb, bl] = (['Top', 'Right', 'Bottom', 'Left'] as const).map((s) => px(cs[`border${s}Width`]));

        Object.assign(marginBox.style, {
            opacity: '1',
            left: `${rect.left - ml}px`,
            top: `${rect.top - mt}px`,
            width: `${rect.width + ml + mr}px`,
            height: `${rect.height + mt + mb}px`,
            borderWidth: `${mt}px ${mr}px ${mb}px ${ml}px`,
        });
        Object.assign(paddingBox.style, {
            opacity: '1',
            left: `${rect.left + bl}px`,
            top: `${rect.top + bt}px`,
            width: `${rect.width - bl - br}px`,
            height: `${rect.height - bt - bb}px`,
            borderWidth: `${pt}px ${pr}px ${pb}px ${pl}px`,
        });
        Object.assign(contentBox.style, {
            opacity: '1',
            left: `${rect.left + bl + pl}px`,
            top: `${rect.top + bt + pt}px`,
            width: `${Math.max(0, rect.width - bl - br - pl - pr)}px`,
            height: `${Math.max(0, rect.height - bt - bb - pt - pb)}px`,
        });

        const tipBox = tip.getBoundingClientRect();
        const below = rect.bottom + mb + 10;
        const top = below + tipBox.height < window.innerHeight ? below : Math.max(10, rect.top - mt - tipBox.height - 10);
        const left = Math.min(Math.max(10, rect.left), window.innerWidth - tipBox.width - 10);
        tip.style.opacity = '1';
        tip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    }, []);

    const schedule = useCallback(() => {
        if (!frame.current) frame.current = requestAnimationFrame(paint);
    }, [paint]);

    useEffect(() => {
        if (sessionStorage.getItem(SEEN_KEY)) return;
        const show = window.setTimeout(() => setHint(true), 2600);
        const hide = window.setTimeout(() => setHint(false), 12000);
        return () => {
            window.clearTimeout(show);
            window.clearTimeout(hide);
        };
    }, []);

    const toggle = useCallback(() => {
        sessionStorage.setItem(SEEN_KEY, '1');
        setHint(false);
        setActive((value) => !value);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
            if (e.key.toLowerCase() === 'i') toggle();
            if (e.key === 'Escape') setActive(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [toggle]);

    useEffect(() => {
        if (!active) return;
        document.documentElement.dataset.inspect = 'on';

        const onMove = (e: PointerEvent) => {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (!(el instanceof HTMLElement) || el === document.body || el === document.documentElement) return;
            if (el !== target.current) {
                target.current = el;
                setInfo(describe(el));
            }
            schedule();
        };
        const onLeave = () => {
            target.current = null;
            setInfo(null);
            schedule();
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', schedule, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        return () => {
            delete document.documentElement.dataset.inspect;
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('scroll', schedule);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            cancelAnimationFrame(frame.current);
            frame.current = 0;
            target.current = null;
            setInfo(null);
        };
    }, [active, schedule]);

    useEffect(() => {
        schedule();
    }, [info, schedule]);

    return (
        <>
            {active && (
                <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[75]">
                    <div ref={marginRef} className="inspect-ring inspect-margin opacity-0" />
                    <div ref={paddingRef} className="inspect-ring inspect-padding opacity-0" />
                    <div ref={contentRef} className="inspect-content opacity-0" />
                    <div
                        ref={tipRef}
                        className="fixed left-0 top-0 w-max max-w-[18rem] rounded-[var(--r-md)] border border-white/15 bg-ink/95 p-3 font-mono text-[11px] leading-5 text-white/70 opacity-0 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md"
                    >
                        {info && (
                            <>
                                <div className="flex items-baseline justify-between gap-6">
                                    <span className="truncate">
                                        <span className="text-white">{info.tag}</span>
                                        <span className="text-accent">{info.cls}</span>
                                    </span>
                                    <span className="shrink-0 text-white/50">{info.size}</span>
                                </div>
                                <div className="mt-2 grid grid-cols-[4.5rem_1fr] gap-x-3 border-t border-white/10 pt-2">
                                    <span className="text-white/35">Font</span>
                                    <span className="truncate">{info.font}</span>
                                    <span className="text-white/35">Color</span>
                                    <span className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-[3px] border border-white/20" style={{ background: info.color }} />
                                        {info.color}
                                    </span>
                                    <span className="text-white/35">Padding</span>
                                    <span className="text-accent">{info.padding}</span>
                                    <span className="text-white/35">Margin</span>
                                    <span>{info.margin}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="fixed bottom-6 left-6 z-[60] hidden flex-col items-start gap-3 [@media(hover:hover)_and_(pointer:fine)]:flex">
                {hint && !active && (
                    <div className="rise relative w-64 rounded-[var(--r-md)] border border-white/15 bg-ink/90 p-4 text-sm text-white/75 backdrop-blur-md">
                        <button
                            type="button"
                            onClick={() => {
                                sessionStorage.setItem(SEEN_KEY, '1');
                                setHint(false);
                            }}
                            aria-label="Dismiss tip"
                            className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-[var(--r-sm)] text-white/40 hover:text-white"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                        <p className="t-label text-accent">Try this</p>
                        <p className="mt-2 pr-4 leading-snug">
                            Inspect this site like a designer. Hover anything to see its size, padding and margin.
                        </p>
                    </div>
                )}
                <button
                    type="button"
                    onClick={toggle}
                    aria-pressed={active}
                    className={`inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-[var(--r-btn)] border px-4 text-sm font-medium backdrop-blur-md transition-colors duration-300 ${
                        active
                            ? 'border-accent bg-accent text-ink'
                            : `border-white/15 bg-ink/80 text-white hover:border-white/40 ${hint ? 'nudge' : ''}`
                    }`}
                >
                    <SquareDashedMousePointer className="h-4 w-4" />
                    {active ? 'Inspecting' : 'Inspect'}
                    <kbd
                        className={`grid h-5 min-w-5 place-items-center rounded-[4px] border px-1 font-mono text-[10px] ${
                            active ? 'border-ink/30 text-ink/70' : 'border-white/20 text-white/50'
                        }`}
                    >
                        {active ? 'Esc' : 'I'}
                    </kbd>
                </button>
            </div>
        </>
    );
}
