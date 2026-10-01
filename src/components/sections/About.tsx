'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PenTool, Terminal } from 'lucide-react';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import dipeshImg from '../../assets/dipesh.webp';
import { CONTACT_INFO } from '../../data/social';
import { ACHIEVEMENTS, EDUCATION, EXPERIENCE_DATA } from '../../data/experience';

const VARIANTS = {
    designer: {
        label: 'Designer',
        icon: PenTool,
        story: [
            'I started in Figma, learning how people read and move through an interface. Every project still begins there: user flows, wireframes, then a prototype people can actually click.',
            'At Toba Tech I design interfaces and prototypes for client projects. As Design Lead of the CII Club, I run the visual identity across posters, decks and social media.',
        ],
        traits: ['User flows', 'Wireframes', 'Prototypes', 'Design systems', 'Visual identity'],
    },
    developer: {
        label: 'Developer',
        icon: Terminal,
        story: [
            'I learned to code so I could build what I designed. Today I take a screen from wireframe to a responsive React and TypeScript app, matched to the design down to the pixel.',
            'Winning first place at the CodeFiesta 3.0 national hackathon pushed me past the frontend. Now I am learning backend properly, to take a product from Figma to production on my own.',
        ],
        traits: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Motion'],
    },
} as const;

type Variant = keyof typeof VARIANTS;

const PROPERTIES = [
    { label: 'Based in', value: CONTACT_INFO.location },
    { label: 'Currently', value: 'UI/UX Designer, Toba Tech' },
    { label: 'Studying', value: `B.Tech CSE · CGPA ${EDUCATION.cgpa} · ${EDUCATION.graduation}` },
    { label: 'Learning next', value: 'APIs, databases and scalable systems' },
] as const;

function Handles() {
    const corner = 'absolute h-2.5 w-2.5 border border-accent bg-ink';
    return (
        <>
            <span className={`${corner} -left-[5px] -top-[5px]`} />
            <span className={`${corner} -right-[5px] -top-[5px]`} />
            <span className={`${corner} -bottom-[5px] -left-[5px]`} />
            <span className={`${corner} -bottom-[5px] -right-[5px]`} />
        </>
    );
}

export default function About() {
    const [variant, setVariant] = useState<Variant>('designer');
    const active = VARIANTS[variant];
    const isDesigner = variant === 'designer';

    return (
        <Section
            id="about"
            index="01"
            label="About"
            title={
                <>
                    Two disciplines, <em>one</em> pair of hands.
                </>
            }
        >
            <div className="grid-12 gap-y-14">
                <Reveal className="col-span-4 md:col-span-5">
                    <figure>
                        <div className="relative">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--r-lg)] bg-surface">
                                <Image
                                    src={dipeshImg}
                                    alt="Portrait of Dipesh Soni in Udaipur"
                                    fill
                                    placeholder="blur"
                                    sizes="(max-width: 768px) 100vw, 480px"
                                    className={`object-cover object-[50%_30%] transition-[filter,transform] duration-700 ease-out ${
                                        isDesigner ? 'scale-[1.03] grayscale' : 'scale-100 grayscale-0'
                                    }`}
                                />
                                <div
                                    aria-hidden="true"
                                    className={`absolute inset-x-4 bottom-4 rounded-[var(--r-md)] bg-ink/85 p-4 font-mono text-[11px] leading-5 backdrop-blur-md transition-opacity duration-500 ${
                                        isDesigner ? 'opacity-0' : 'opacity-100'
                                    }`}
                                >
                                    <span className="text-white/40">const</span> <span className="text-white">dipesh</span>{' '}
                                    <span className="text-white/40">=</span> {'{'}
                                    <br />
                                    &nbsp;&nbsp;role: <span className="text-accent">&apos;design + frontend&apos;</span>,
                                    <br />
                                    &nbsp;&nbsp;ships: <span className="text-accent">true</span>
                                    <br />
                                    {'}'}
                                </div>
                            </div>
                            <div
                                aria-hidden="true"
                                className={`pointer-events-none absolute inset-0 rounded-[var(--r-lg)] border border-accent transition-opacity duration-500 ${
                                    isDesigner ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <Handles />
                                <span className="absolute -top-7 left-0 rounded-[var(--r-sm)] bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink">
                                    Dipesh · Frame
                                </span>
                                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent">
                                    480 × 600
                                </span>
                            </div>
                        </div>
                        <figcaption className="mt-10 flex items-center justify-between font-mono text-xs text-white/40">
                            <span>Udaipur, Rajasthan</span>
                            <span>IST · UTC+5:30</span>
                        </figcaption>
                    </figure>
                </Reveal>

                <Reveal className="col-span-4 md:col-span-6 md:col-start-7" delay={120}>
                    <blockquote className="t-serif text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.15] text-white">
                        &ldquo;Learning doesn&apos;t end. There&apos;s always a better way to do things, and I&apos;m curious
                        enough to go find it.&rdquo;
                    </blockquote>

                    <div className="mt-10 flex items-center justify-between gap-4 rounded-[14px] border hairline bg-surface p-1.5 pl-4">
                        <span className="t-label">Variant</span>
                        <div role="radiogroup" aria-label="Read my story as" className="flex gap-1">
                            {(Object.keys(VARIANTS) as Variant[]).map((key) => {
                                const { label, icon: Icon } = VARIANTS[key];
                                const checked = key === variant;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        role="radio"
                                        aria-checked={checked}
                                        onClick={() => setVariant(key)}
                                        className={`flex h-10 cursor-pointer items-center gap-2 rounded-[var(--r-btn)] px-4 text-sm font-medium transition-colors duration-300 ${
                                            checked ? 'bg-accent text-ink' : 'text-white/60 hover:text-white'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div key={variant} className="fade-swap mt-8 space-y-5" aria-live="polite">
                        {active.story.map((paragraph) => (
                            <p key={paragraph} className="t-body text-base">
                                {paragraph}
                            </p>
                        ))}
                        <ul className="flex flex-wrap gap-2 pt-2" aria-label={`${active.label} skills`}>
                            {active.traits.map((trait) => (
                                <li key={trait} className="chip">
                                    {trait}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <dl className="mt-10 border-t hairline">
                        {PROPERTIES.map((row) => (
                            <div key={row.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b hairline py-3.5 text-sm">
                                <dt className="text-white/45">{row.label}</dt>
                                <dd className="text-white">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>

            <div className="grid-12 mt-24 gap-y-16 md:mt-32">
                <Reveal className="col-span-4 md:col-span-6">
                    <h3 className="t-label">Experience</h3>
                    <ol className="mt-5 border-t hairline">
                        {EXPERIENCE_DATA.map((item) => (
                            <li key={`${item.role}-${item.organization}`} className="border-b hairline py-5">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h4 className="font-semibold tracking-tight text-white">{item.role}</h4>
                                    <span className="shrink-0 font-mono text-xs tabular-nums text-white/45">
                                        {item.period}
                                    </span>
                                </div>
                                <p className="mt-1 flex items-center gap-2 text-sm text-white/55">
                                    {item.organization}
                                    {item.current && <span className="tag">Now</span>}
                                </p>
                            </li>
                        ))}
                    </ol>
                </Reveal>

                <Reveal className="col-span-4 md:col-span-6" delay={120}>
                    <h3 className="t-label">Recognition</h3>
                    <ol className="mt-5 border-t hairline">
                        {ACHIEVEMENTS.map((item) => (
                            <li key={item.title} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b hairline py-5">
                                <span className="t-serif text-3xl leading-none text-accent">{item.rank}</span>
                                <div>
                                    <h4 className="font-semibold tracking-tight text-white">{item.title}</h4>
                                    <p className="mt-1 text-sm text-white/55">
                                        {item.organizer} · {item.date}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-white/45">{item.detail}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </div>
        </Section>
    );
}
