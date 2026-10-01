'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { scrollToSection, scrollToY } from '../common/SmoothScroll';
import { useScrubProgress } from '../../hooks/useScrubProgress';
import { PROJECTS_DATA, TEAM_PROJECTS, type ProjectData } from '../../data/projects';
import { CONTACT_INFO } from '../../data/social';

const pad = (n: number) => String(n).padStart(2, '0');
const hostOf = (url: string) => new URL(url).host.replace(/^www\./, '');

const SLIDE_COUNT = PROJECTS_DATA.length + 1;

// Horizontal distance from the first slide to each slide's left edge.
const slideOffsets = (track: HTMLElement | null) => {
    const slides = [...(track?.children ?? [])] as HTMLElement[];
    const first = slides[0]?.offsetLeft ?? 0;
    return slides.map((el) => el.offsetLeft - first);
};

const PIN_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';
const subscribePin = (onChange: () => void) => {
    const mq = window.matchMedia(PIN_QUERY);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
};
const usePinned = () =>
    useSyncExternalStore(
        subscribePin,
        () => window.matchMedia(PIN_QUERY).matches,
        () => false
    );

function ProjectSlide({ project, index }: { project: ProjectData; index: number }) {
    return (
        <article className="flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--r-lg)] border hairline bg-surface md:w-[min(80vw,70rem)] md:flex-row">
            <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${project.title} live site`}
                className="group/shot flex flex-col border-b hairline md:w-[58%] md:border-b-0 md:border-r"
            >
                <div className="flex h-9 shrink-0 items-center gap-1.5 border-b hairline px-4">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="mx-auto font-mono text-[11px] text-white/40">{hostOf(project.liveUrl)}</span>
                    <span className="w-7" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[22rem] md:flex-1">
                    <Image
                        src={project.image}
                        alt={`${project.title} home page`}
                        fill
                        placeholder="blur"
                        sizes="(max-width: 768px) 86vw, 680px"
                        className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.035]"
                    />
                    <span className="absolute bottom-4 right-4 grid h-12 w-12 translate-y-2 place-items-center rounded-[var(--r-btn)] bg-accent text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:translate-y-0 group-hover/shot:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                    </span>
                </div>
            </a>

            <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tabular-nums text-accent">{pad(index + 1)}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-white/20" />
                    {project.status ? <span className="tag">{project.status}</span> : <span className="t-label">Live</span>}
                </div>
                <h3 className="t-h3 mt-5 text-[clamp(1.6rem,2.6vw,2.25rem)]">{project.title}</h3>
                <p className="mt-1.5 text-white/55">{project.subtitle}</p>
                <p className="t-body mt-4">{project.description}</p>
                <ul className="mt-4 space-y-2">
                    {project.built.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/60">
                            <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
                            {point}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto space-y-5 pt-7">
                    <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} tech stack`}>
                        {project.technologies.map((tech) => (
                            <li key={tech} className="chip">
                                {tech}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-6">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link text-white">
                            Live site
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                            <Github className="h-4 w-4" />
                            Source
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

function NextSlide() {
    return (
        <div className="flex w-[86vw] shrink-0 snap-start flex-col justify-between gap-10 rounded-[var(--r-lg)] border border-dashed border-white/15 p-8 md:w-[min(34vw,26rem)] md:p-10">
            <div>
                <p className="t-label">{pad(SLIDE_COUNT)} · Next up</p>
                <p className="t-h3 mt-4">
                    Your product <em className="text-accent">could be here.</em>
                </p>
                <p className="t-body mt-3">New work is always in progress. Have a project in mind? Let&apos;s make it the next one.</p>
            </div>
            <a
                href="#contact"
                onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                }}
                className="btn btn-ghost self-start"
            >
                Start a project
                <ArrowRight className="h-4 w-4" />
            </a>
        </div>
    );
}

function RailControls({
    active,
    fillRef,
    onStep,
}: {
    active: number;
    fillRef: React.RefObject<HTMLSpanElement | null>;
    onStep: (direction: -1 | 1) => void;
}) {
    const current = PROJECTS_DATA[active];
    return (
        <div className="shell mt-8 flex items-center gap-5 md:mt-10 md:gap-8">
            <p className="t-label flex min-w-0 items-center gap-3 tabular-nums md:w-64" aria-live="polite">
                <span className="text-white">{pad(active + 1)}</span>
                <span>/ {pad(SLIDE_COUNT)}</span>
                <span key={active} className="fade-swap hidden truncate text-white/60 md:inline">
                    {current ? current.title : 'Next up'}
                </span>
            </p>
            <div className="relative h-px flex-1 overflow-hidden bg-white/15">
                <span
                    ref={fillRef}
                    className="absolute inset-0 origin-left bg-accent"
                    style={{ transform: `scaleX(${1 / SLIDE_COUNT})` }}
                />
            </div>
            <div className="flex gap-2">
                {([-1, 1] as const).map((direction) => {
                    const Icon = direction < 0 ? ArrowLeft : ArrowRight;
                    const disabled = direction < 0 ? active === 0 : active === SLIDE_COUNT - 1;
                    return (
                        <button
                            key={direction}
                            type="button"
                            onClick={() => onStep(direction)}
                            disabled={disabled}
                            aria-label={direction < 0 ? 'Previous project' : 'Next project'}
                            className="grid h-11 w-11 cursor-pointer place-items-center rounded-[var(--r-btn)] border hairline text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:border-[var(--line)] disabled:hover:bg-transparent disabled:hover:text-white"
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function ProjectRail() {
    const pinned = usePinned();
    const wrapRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLSpanElement>(null);
    const [distance, setDistance] = useState(0);
    const [active, setActive] = useState(0);

    const sync = useCallback((x: number, max: number) => {
        const progress = max > 0 ? Math.min(1, Math.max(0, x / max)) : 0;
        if (fillRef.current) {
            fillRef.current.style.transform = `scaleX(${1 / SLIDE_COUNT + progress * (1 - 1 / SLIDE_COUNT)})`;
        }
        const offsets = slideOffsets(trackRef.current).map((offset) => Math.min(offset, max));
        let next = 0;
        offsets.forEach((offset, i) => {
            if (Math.abs(offset - x) < Math.abs(offsets[next] - x)) next = i;
        });
        if (x >= max - 1) next = offsets.length - 1;
        setActive(next);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;
        const measure = () => setDistance(Math.max(0, track.offsetWidth - viewport.clientWidth));
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [pinned]);

    useScrubProgress(
        wrapRef,
        (progress) => {
            const x = progress * distance;
            if (trackRef.current) trackRef.current.style.transform = `translate3d(${-x}px, 0, 0)`;
            sync(x, distance);
        },
        pinned
    );

    const goTo = (index: number, immediate = false) => {
        const target = Math.min(slideOffsets(trackRef.current)[index] ?? 0, distance);
        if (pinned) {
            const wrap = wrapRef.current;
            if (wrap) scrollToY(wrap.getBoundingClientRect().top + window.scrollY + target, immediate);
        } else {
            viewportRef.current?.scrollTo({ left: target, behavior: immediate ? 'auto' : 'smooth' });
        }
    };

    const onStep = (direction: -1 | 1) => goTo(Math.min(SLIDE_COUNT - 1, Math.max(0, active + direction)));

    // Tabbing into an off-screen slide would scroll the clipped viewport; move the page instead.
    const onFocus = (e: React.FocusEvent) => {
        if (!pinned) return;
        const index = [...(trackRef.current?.children ?? [])].findIndex((el) => el.contains(e.target));
        if (viewportRef.current) viewportRef.current.scrollLeft = 0;
        if (index >= 0 && index !== active) goTo(index, true);
    };

    const track = (
        <div ref={trackRef} onFocus={onFocus} className={`rail-pad relative flex w-max items-stretch gap-4 md:gap-6 ${pinned ? 'will-change-transform' : ''}`}>
            {PROJECTS_DATA.map((project, i) => (
                <ProjectSlide key={project.title} project={project} index={i} />
            ))}
            <NextSlide />
        </div>
    );

    if (!pinned) {
        return (
            <div>
                <div
                    ref={viewportRef}
                    onScroll={(e) => {
                        const el = e.currentTarget;
                        sync(el.scrollLeft, el.scrollWidth - el.clientWidth);
                    }}
                    className="rail-scroll snap-x snap-mandatory overflow-x-auto pb-2"
                >
                    {track}
                </div>
                <RailControls active={active} fillRef={fillRef} onStep={onStep} />
            </div>
        );
    }

    return (
        <div ref={wrapRef} style={{ height: `calc(100vh + ${distance}px)` }}>
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
                <div ref={viewportRef} className="overflow-hidden">
                    {track}
                </div>
                <RailControls active={active} fillRef={fillRef} onStep={onStep} />
            </div>
        </div>
    );
}

export default function Project() {
    return (
        <Section
            id="projects"
            index="02"
            label="Selected work"
            title={
                <>
                    Designed in Figma, <em>shipped</em> to the web.
                </>
            }
            intro="Projects I designed and built end to end. Each one is live, with its source on GitHub."
            aside={
                <p className="t-label flex items-center gap-2 tabular-nums">
                    ({pad(PROJECTS_DATA.length)}) · <span className="md:hidden">Swipe</span>
                    <span className="hidden md:inline">Scroll</span> to explore
                    <ArrowRight className="h-3.5 w-3.5" />
                </p>
            }
            bleed={<ProjectRail />}
        >
            <Reveal>
                <div className="flex items-end justify-between gap-6 border-b hairline pb-5">
                    <h3 className="t-label">Team & hackathon builds</h3>
                    <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="text-link">
                        <Github className="h-4 w-4" />
                        More on GitHub
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </Reveal>
            <div className="grid-12 mt-8 gap-y-6">
                {TEAM_PROJECTS.map((project, i) => (
                    <Reveal key={project.title} className="col-span-4 md:col-span-6" delay={i * 120}>
                        <article className="surface flex h-full flex-col p-7 md:p-8">
                            <div className="flex items-baseline justify-between gap-4">
                                <h4 className="t-h3">{project.title}</h4>
                                <span className="t-label">Team</span>
                            </div>
                            <p className="mt-1.5 text-sm text-white/55">{project.subtitle}</p>
                            <p className="t-body mt-4">{project.description}</p>
                            <ul className="mt-4 space-y-2">
                                {project.contribution.map((point) => (
                                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/60">
                                        <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                                {project.technologies.map((tech) => (
                                    <li key={tech} className="chip">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
