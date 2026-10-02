'use client';

import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ChevronsLeftRight, CodeXml, FileText } from 'lucide-react';
import dipeshImg from '../../assets/dipesh.webp';
import { CONTACT_INFO } from '../../data/social';
import { PROJECTS_DATA } from '../../data/projects';
import { EDUCATION } from '../../data/experience';
import { scrollToSection } from '../common/SmoothScroll';
import { useLocalTime } from '../../hooks/useLocalTime';

type Mode = 'design' | 'build';

const FACTS = [
    { value: '1st', label: 'CodeFiesta 3.0 national hackathon' },
    { value: String(PROJECTS_DATA.length).padStart(2, '0'), label: 'Personal projects, designed and built solo' },
    { value: EDUCATION.cgpa, label: 'CGPA, B.Tech Computer Science' },
    { value: '< 24h', label: 'Typical reply to a message' },
] as const;

const KEY_STEP = 5;
// Where the split settles after the intro, as a fraction of the headline's own width.
const INTRO_BIAS = 0.46;

function SpecLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={`pointer-events-none absolute whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-medium leading-none tracking-normal text-accent ${className}`}
        >
            {children}
        </span>
    );
}

function Placeholder({ label }: { label: string }) {
    return (
        <>
            <svg className="absolute inset-0 h-full w-full text-accent/40" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
            </svg>
            <SpecLabel className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink/90 px-1 py-0.5 text-[8px] sm:text-[10px] max-w-[92%] truncate">
                {label}
            </SpecLabel>
        </>
    );
}

// Both layers render this exact markup so the split lines up pixel for pixel; only paint differs.
function Headline({ mode }: { mode: Mode }) {
    const design = mode === 'design';
    const ink = design ? 'hero-outline' : 'text-white';
    const frame = design ? 'hero-frame' : '';
    const pill = 'relative inline-flex items-center justify-center h-[1.22em] w-[1.22em] shrink-0 rounded-xl sm:rounded-2xl align-middle';

    return (
        <div className="shell py-8 sm:py-10 md:py-14">
            <div className="flex flex-col gap-2.5 sm:gap-3.5 md:gap-5 text-[clamp(2.15rem,9.5vw,3.75rem)] sm:text-[clamp(3.1rem,9vw,5.5rem)] md:text-[clamp(4.2rem,8.2vw,7.25rem)] lg:text-[clamp(5.2rem,8.5vw,8.75rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                {/* Line 1: I design + Portrait */}
                <div className="flex items-center gap-[0.18em] whitespace-nowrap">
                    <span data-word className={`relative ${ink} ${frame}`}>
                        I design
                        {design && (
                            <SpecLabel className="-top-4 sm:-top-5 left-0 hidden sm:block">
                                Geom · Semibold · −4.5%
                            </SpecLabel>
                        )}
                    </span>
                    {design ? (
                        <span className={`${pill} border border-dashed border-accent/60`}>
                            <Placeholder label="portrait.webp" />
                        </span>
                    ) : (
                        <span className={`${pill} overflow-hidden bg-surface`}>
                            <Image
                                src={dipeshImg}
                                alt="Dipesh Soni"
                                fill
                                priority
                                placeholder="blur"
                                sizes="(max-width: 640px) 70px, (max-width: 1024px) 110px, 160px"
                                className="object-cover object-[50%_38%]"
                            />
                        </span>
                    )}
                </div>

                {/* Line 2: Component + & build */}
                <div className="flex items-center gap-[0.18em] whitespace-nowrap ml-6 sm:ml-10 md:ml-[26%] lg:ml-[28%]">
                    {design ? (
                        <span className={`${pill} border border-dashed border-accent/60`}>
                            <Placeholder label="<Component />" />
                        </span>
                    ) : (
                        <span className={`${pill} bg-accent text-ink`}>
                            <CodeXml className="h-[0.55em] w-[0.55em]" strokeWidth={2.25} />
                        </span>
                    )}
                    <span data-word className={`relative ${ink} ${frame}`}>
                        &amp; build
                    </span>
                </div>

                {/* Line 3: interfaces. */}
                <div className="flex justify-end whitespace-nowrap">
                    <span
                        data-word
                        className={`t-serif relative pr-[0.06em] text-[0.98em] tracking-[-0.03em] ${design ? 'hero-outline' : 'text-accent'} ${frame}`}
                    >
                        interfaces.
                        {design && (
                            <SpecLabel className="-bottom-4 sm:-bottom-5 right-0 hidden sm:block">
                                Genos · Medium Italic
                            </SpecLabel>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Hero() {
    const stageRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const target = useRef(47);
    const current = useRef(47);
    const frame = useRef(0);
    const dragging = useRef(false);
    const userInteracted = useRef(false);
    const localTime = useLocalTime('Asia/Kolkata');

    const paint = useCallback((value: number) => {
        stageRef.current?.style.setProperty('--split', `${value}%`);
        const handle = handleRef.current;
        if (!handle) return;
        const rounded = Math.round(value);
        handle.setAttribute('aria-valuenow', String(rounded));
        handle.setAttribute('aria-valuetext', `${rounded}% design, ${100 - rounded}% build`);
    }, []);

    const animate = useCallback(() => {
        if (frame.current) return;
        const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const tick = () => {
            const delta = target.current - current.current;
            current.current = reduce || Math.abs(delta) < 0.05 ? target.current : current.current + delta * 0.14;
            paint(current.current);
            frame.current = current.current === target.current ? 0 : requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
    }, [paint]);

    const moveTo = useCallback(
        (value: number) => {
            target.current = Math.min(100, Math.max(0, value));
            animate();
        },
        [animate]
    );

    const calculateIntroSplit = useCallback(() => {
        const stage = stageRef.current;
        if (!stage) return 47;
        const words = stage.querySelectorAll<HTMLElement>('[data-word]');
        if (!words.length) return 47;
        const box = stage.getBoundingClientRect();
        const rects = [...words].map((el) => el.getBoundingClientRect());
        const left = Math.min(...rects.map((r) => r.left));
        const right = Math.max(...rects.map((r) => r.right));
        const textWidth = right - left;
        if (textWidth <= 0 || box.width <= 0) return 47;
        const calculated = ((left + textWidth * INTRO_BIAS - box.left) / box.width) * 100;
        // Clamp to a balanced window where both Figma wireframe and Code build are clearly visible
        return Math.min(52, Math.max(42, calculated));
    }, []);

    useEffect(() => {
        const intro = window.setTimeout(() => {
            moveTo(calculateIntroSplit());
        }, 500);

        const handleResize = () => {
            if (!userInteracted.current) {
                moveTo(calculateIntroSplit());
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.clearTimeout(intro);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frame.current);
            frame.current = 0;
        };
    }, [moveTo, calculateIntroSplit]);

    const pointerToSplit = (e: React.PointerEvent<HTMLDivElement>) => {
        userInteracted.current = true;
        const rect = e.currentTarget.getBoundingClientRect();
        moveTo(((e.clientX - rect.left) / rect.width) * 100);
    };

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        pointerToSplit(e);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragging.current || e.pointerType === 'mouse') pointerToSplit(e);
    };

    const onPointerUp = () => {
        dragging.current = false;
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        userInteracted.current = true;
        const keys: Record<string, number> = {
            ArrowLeft: target.current - KEY_STEP,
            ArrowRight: target.current + KEY_STEP,
            Home: 0,
            End: 100,
        };
        if (!(e.key in keys)) return;
        e.preventDefault();
        moveTo(keys[e.key]);
    };

    const goTo = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToSection(href);
    };

    return (
        <section id="top" aria-labelledby="hero-title" className="relative flex flex-col pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-10">
            <h1 id="hero-title" className="sr-only">
                Dipesh Soni, UI/UX designer and frontend developer. I design and build interfaces.
            </h1>

            {/* Top Info Bar / Ticker */}
            <div className="shell">
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 border-b hairline pb-3.5 sm:pb-4 t-label md:grid-cols-12 md:gap-y-0">
                    <p className="rise col-span-1 flex items-center md:col-span-3">
                        Dipesh Soni
                    </p>
                    <p
                        className="rise col-span-1 flex items-center md:col-span-3 md:justify-start"
                        style={{ '--delay': '60ms' } as CSSProperties}
                    >
                        UI/UX Designer · Frontend Dev
                    </p>
                    <p
                        className="rise col-span-1 flex items-center md:col-span-3 md:justify-start"
                        style={{ '--delay': '120ms' } as CSSProperties}
                    >
                        Udaipur, IN · {localTime || '—'} IST
                    </p>
                    <p
                        className="rise col-span-1 flex items-center justify-end gap-2 text-white md:col-span-3 md:justify-end"
                        style={{ '--delay': '180ms' } as CSSProperties}
                    >
                        <span className="dot-live" />
                        <span className="truncate">Open to freelance</span>
                    </p>
                </div>
            </div>

            {/* Stage: Interactive Design vs Build Split */}
            <div
                ref={stageRef}
                className="hero-stage rise mt-6 sm:mt-8 md:mt-10"
                style={{ '--delay': '200ms' } as CSSProperties}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                <div aria-hidden="true" className="hero-blueprint border-y border-dashed border-accent/20">
                    <Headline mode="design" />
                </div>
                <div
                    aria-hidden="true"
                    className="hero-build border-y border-transparent bg-ink bg-[radial-gradient(55%_90%_at_88%_70%,rgba(143,211,255,0.1),transparent_70%)]"
                >
                    <Headline mode="build" />
                </div>

                <div
                    ref={handleRef}
                    role="slider"
                    tabIndex={0}
                    aria-label="Compare the design file with the built page"
                    aria-orientation="horizontal"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={47}
                    onKeyDown={onKeyDown}
                    className="hero-handle"
                >
                    <span className="absolute right-[calc(50%+10px)] top-3 flex h-5 items-center rounded-[var(--r-sm)] border border-white/10 bg-raised px-2 font-mono text-[10px] leading-none text-white/70">
                        Figma
                    </span>
                    <span className="absolute left-[calc(50%+10px)] top-3 flex h-5 items-center rounded-[var(--r-sm)] border border-accent/40 bg-accent px-2 font-mono text-[10px] font-semibold leading-none text-ink">
                        Code
                    </span>
                    <span className="hero-knob">
                        <ChevronsLeftRight className="h-4 w-4" />
                    </span>
                </div>
            </div>

            {/* Bottom Summary, Actions & Facts */}
            <div className="shell mt-8 sm:mt-10 md:mt-12">
                <div className="grid-12 gap-y-6 md:gap-y-8 items-end">
                    <p
                        className="rise t-lead col-span-4 md:col-span-6 lg:col-span-6"
                        style={{ '--delay': '320ms' } as CSSProperties}
                    >
                        UI/UX designer at Toba Tech and frontend developer. I take a product from the first wireframe in
                        Figma to a fast, accessible React build, so nothing gets lost between design and code.
                    </p>
                    <div
                        className="rise col-span-4 flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end"
                        style={{ '--delay': '400ms' } as CSSProperties}
                    >
                        <a href="#projects" onClick={goTo('#projects')} className="btn btn-primary">
                            See selected work
                            <ArrowDown className="h-4 w-4" />
                        </a>
                        <a href="#contact" onClick={goTo('#contact')} className="btn btn-ghost">
                            Start a project
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href={CONTACT_INFO.resume} target="_blank" rel="noopener noreferrer" className="text-link px-2">
                            <FileText className="h-4 w-4" />
                            CV
                        </a>
                    </div>
                </div>

                {/* Facts Grid */}
                <dl className="mt-8 sm:mt-10 md:mt-14 border-t hairline grid grid-cols-2 md:grid-cols-4">
                    {FACTS.map((fact, i) => (
                        <div
                            key={fact.label}
                            className={`rise flex flex-col-reverse justify-end gap-1.5 py-4 sm:py-5 md:py-6 ${
                                i % 2 === 1 ? 'border-l hairline pl-4 sm:pl-6' : 'pr-4 sm:pr-6'
                            } ${
                                i >= 2 ? 'border-t hairline md:border-t-0' : ''
                            } ${
                                i > 0 ? 'md:border-l md:hairline md:pl-6 md:pr-6' : 'md:pr-6 md:pl-0'
                            } ${
                                i === 3 ? 'md:pr-0' : ''
                            }`}
                            style={{ '--delay': `${460 + i * 60}ms` } as CSSProperties}
                        >
                            <dt className="text-xs sm:text-sm leading-snug text-white/50">{fact.label}</dt>
                            <dd className="text-2xl sm:text-3xl font-semibold tabular-nums tracking-[-0.04em] text-white md:text-4xl">
                                {fact.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
