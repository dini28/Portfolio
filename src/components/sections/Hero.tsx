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
            className={`pointer-events-none absolute whitespace-nowrap font-mono text-[10px] font-medium leading-none tracking-normal text-accent ${className}`}
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
            <SpecLabel className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-1.5 py-1">{label}</SpecLabel>
        </>
    );
}

// Both layers render this exact markup so the split lines up pixel for pixel; only paint differs.
function Headline({ mode }: { mode: Mode }) {
    const design = mode === 'design';
    const ink = design ? 'hero-outline' : 'text-white';
    const frame = design ? 'hero-frame' : '';
    const pill = 'relative inline-block h-[0.74em] w-[1.7em] shrink-0 rounded-full';

    return (
        <div className="shell py-10 md:py-14">
            <div className="text-[clamp(2.75rem,15vw,4.75rem)] font-semibold md:text-[clamp(3.1rem,10.4vw,9.75rem)] leading-[0.9] tracking-[-0.045em]">
                <div className="flex items-center gap-[0.14em] whitespace-nowrap">
                    <span data-word className={`relative ${ink} ${frame}`}>
                        I design
                        {design && <SpecLabel className="-top-5 left-0 hidden md:block">Geom · Semibold · −4.5%</SpecLabel>}
                    </span>
                    {design ? (
                        <span className={`${pill} border border-dashed border-accent/60`}>
                            <Placeholder label="portrait.webp" />
                        </span>
                    ) : (
                        <span className={`${pill} overflow-hidden bg-surface`}>
                            <Image
                                src={dipeshImg}
                                alt=""
                                fill
                                priority
                                placeholder="blur"
                                sizes="(max-width: 768px) 90px, 240px"
                                className="object-cover object-[50%_38%]"
                            />
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-[0.14em] whitespace-nowrap md:ml-[calc(25%+var(--gutter)/4)]">
                    {design ? (
                        <span className={`${pill} border border-dashed border-accent/60`}>
                            <Placeholder label="<Component />" />
                        </span>
                    ) : (
                        <span className={`${pill} grid place-items-center bg-accent text-ink`}>
                            <CodeXml className="h-[0.42em] w-[0.42em]" strokeWidth={2.25} />
                        </span>
                    )}
                    <span data-word className={`relative ${ink} ${frame}`}>
                        &amp; build
                    </span>
                </div>

                <div className="flex justify-start whitespace-nowrap md:justify-end">
                    <span
                        data-word
                        className={`t-serif relative pr-[0.06em] text-[0.98em] tracking-[-0.03em] ${design ? 'hero-outline' : 'text-accent'} ${frame}`}
                    >
                        interfaces.
                        {design && (
                            <SpecLabel className="-bottom-5 right-0 hidden md:block">Genos · Medium Italic</SpecLabel>
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
    const target = useRef(100);
    const current = useRef(100);
    const frame = useRef(0);
    const dragging = useRef(false);
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
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

    useEffect(() => {
        const introSplit = () => {
            const stage = stageRef.current;
            const words = stage?.querySelectorAll<HTMLElement>('[data-word]');
            if (!stage || !words?.length) return 50;
            const box = stage.getBoundingClientRect();
            const rects = [...words].map((el) => el.getBoundingClientRect());
            const left = Math.min(...rects.map((r) => r.left));
            const right = Math.max(...rects.map((r) => r.right));
            return ((left + (right - left) * INTRO_BIAS - box.left) / box.width) * 100;
        };
        const intro = window.setTimeout(() => moveTo(introSplit()), 500);
        return () => {
            window.clearTimeout(intro);
            cancelAnimationFrame(frame.current);
            frame.current = 0;
        };
    }, [moveTo]);

    const pointerToSplit = (e: React.PointerEvent<HTMLDivElement>) => {
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
        <section id="top" aria-labelledby="hero-title" className="relative flex flex-col pt-24 md:pt-28 lg:min-h-[100dvh]">
            <h1 id="hero-title" className="sr-only">
                Dipesh Soni, UI/UX designer and frontend developer. I design and build interfaces.
            </h1>

            <div className="shell">
                <div className="grid-12 gap-y-3 border-b hairline pb-4 t-label">
                    <p className="rise col-span-2 md:col-span-3">Dipesh Soni</p>
                    <p className="rise col-span-2 md:col-span-3" style={{ '--delay': '60ms' } as CSSProperties}>
                        UI/UX Designer · Frontend Dev
                    </p>
                    <p
                        className="rise col-span-2 hidden md:col-span-3 md:block"
                        style={{ '--delay': '120ms' } as CSSProperties}
                    >
                        Udaipur, IN · {localTime || '—'} IST
                    </p>
                    <p
                        className="rise col-span-2 flex items-center gap-2 text-white md:col-span-3 md:justify-end"
                        style={{ '--delay': '180ms' } as CSSProperties}
                    >
                        <span className="dot-live" />
                        Open to freelance
                    </p>
                </div>
            </div>

            <div
                ref={stageRef}
                className="hero-stage rise mt-6 md:mt-10"
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
                    aria-valuenow={100}
                    onKeyDown={onKeyDown}
                    className="hero-handle"
                >
                    <span className="absolute right-[calc(50%+10px)] top-3 rounded-[var(--r-sm)] bg-raised px-2 py-1 font-mono text-[10px] text-white/70">
                        Figma
                    </span>
                    <span className="absolute left-[calc(50%+10px)] top-3 rounded-[var(--r-sm)] bg-accent px-2 py-1 font-mono text-[10px] font-semibold text-ink">
                        Code
                    </span>
                    <span className="hero-knob">
                        <ChevronsLeftRight className="h-5 w-5" />
                    </span>
                </div>
            </div>

            <div className="shell mt-auto pt-10 md:pt-12">
                <div className="grid-12 gap-y-8">
                    <p
                        className="rise t-lead col-span-4 md:col-span-6 lg:col-span-5"
                        style={{ '--delay': '320ms' } as CSSProperties}
                    >
                        UI/UX designer at Toba Tech and frontend developer. I take a product from the first wireframe in
                        Figma to a fast, accessible React build, so nothing gets lost between design and code.
                    </p>
                    <div
                        className="rise col-span-4 flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end md:self-end lg:col-start-7"
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

                <dl className="grid-12 mt-10 border-t hairline md:mt-14">
                    {FACTS.map((fact, i) => (
                        <div
                            key={fact.label}
                            className={`rise hairline col-span-2 flex flex-col-reverse justify-end gap-1.5 py-5 md:col-span-3 md:py-6 ${
                                i > 0 ? 'md:border-l md:pl-6' : ''
                            } ${i % 2 === 1 ? 'border-l pl-4' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''}`}
                            style={{ '--delay': `${460 + i * 60}ms` } as CSSProperties}
                        >
                            <dt className="text-sm leading-snug text-white/50">{fact.label}</dt>
                            <dd className="text-3xl font-semibold tabular-nums tracking-[-0.04em] text-white md:text-4xl">
                                {fact.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
