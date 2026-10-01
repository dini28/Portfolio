'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Section from '../common/Section';
import Reveal from '../common/Reveal';
import { SKILL_TRACKS, SPECTRUM_SKILLS, type SkillTrack, type SpectrumSkill } from '../../data/skills';
import { CERTIFICATIONS } from '../../data/experience';

const LANE_HEIGHT = 46;
const PILL_GAP = 10;
const AXIS_TICKS = [0, 25, 50, 75, 100];

const estimateWidth = (skill: SpectrumSkill) => skill.name.length * 7.6 + (skill.icon ? 60 : 36);

// Each pill sits centred over its x position; pills that would collide drop into the next lane.
function layoutTrack(skills: readonly SpectrumSkill[], trackWidth: number, widths: Record<string, number>) {
    const laneEnds: number[] = [];
    const placed = [...skills]
        .sort((a, b) => a.x - b.x)
        .map((skill) => {
            const width = widths[skill.name] ?? estimateWidth(skill);
            const left = Math.min(Math.max((skill.x / 100) * trackWidth - width / 2, 0), Math.max(0, trackWidth - width));
            let lane = laneEnds.findIndex((end) => end + PILL_GAP <= left);
            if (lane === -1) lane = laneEnds.push(0) - 1;
            laneEnds[lane] = left + width;
            return { skill, left, lane };
        });
    return { placed, lanes: Math.max(1, laneEnds.length) };
}

const describe = (x: number) => (x < 40 ? 'Design side' : x > 60 ? 'Engineering side' : 'Right in between');

function Readout({ skill }: { skill: SpectrumSkill | null }) {
    const track = SKILL_TRACKS.find((t) => t.id === skill?.track);
    return (
        <div className="grid-12 mt-10 items-end gap-y-6 border-t hairline pt-6" aria-live="polite">
            <div className="col-span-4 md:col-span-5">
                <p className="t-label">Selected</p>
                <p key={skill?.name ?? 'none'} className="fade-swap t-h3 mt-3">
                    {skill ? skill.name : <span className="text-white/35">Hover a skill to inspect it</span>}
                </p>
            </div>
            <div className="col-span-2 md:col-span-3">
                <p className="t-label">Track</p>
                <p className="mt-3 text-sm text-white">{track ? track.label : '—'}</p>
            </div>
            <div className="col-span-2 md:col-span-4">
                <p className="t-label">Used in</p>
                <p className="mt-3 text-sm text-white">{skill?.usedIn ?? '—'}</p>
            </div>
            <div className="col-span-4 md:col-span-12">
                <div className="relative h-px bg-white/15">
                    <span
                        className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[left,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ left: `${skill?.x ?? 50}%`, opacity: skill ? 1 : 0 }}
                    />
                </div>
                <p className="mt-3 font-mono text-[11px] text-white/45">{skill ? describe(skill.x) : 'Design ⟷ Engineering'}</p>
            </div>
        </div>
    );
}

function SpectrumBoard({ onSelect, selected }: { onSelect: (s: SpectrumSkill | null) => void; selected: SpectrumSkill | null }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const pillRefs = useRef(new Map<string, HTMLButtonElement>());
    const [trackWidth, setTrackWidth] = useState(1000);
    const [widths, setWidths] = useState<Record<string, number>>({});

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const observer = new ResizeObserver(([entry]) => setTrackWidth(entry.contentRect.width));
        observer.observe(track);

        const measured: Record<string, number> = {};
        pillRefs.current.forEach((el, name) => (measured[name] = el.offsetWidth));
        setWidths(measured);
        return () => observer.disconnect();
    }, []);

    const layouts = useMemo(
        () =>
            Object.fromEntries(
                SKILL_TRACKS.map(({ id }) => [
                    id,
                    layoutTrack(
                        SPECTRUM_SKILLS.filter((s) => s.track === id),
                        trackWidth,
                        widths
                    ),
                ])
            ) as Record<SkillTrack, ReturnType<typeof layoutTrack>>,
        [trackWidth, widths]
    );

    return (
        <div className="hidden md:block" onMouseLeave={() => onSelect(null)}>
            <div className="grid-12 pb-4">
                <div className="col-span-10 col-start-3 flex justify-between font-mono text-[11px] text-white/45">
                    <span>← Design</span>
                    <span>Both</span>
                    <span>Engineering →</span>
                </div>
            </div>

            {SKILL_TRACKS.map(({ id, label, note }, rowIndex) => {
                const { placed, lanes } = layouts[id];
                return (
                    <div key={id} className="grid-12 border-t hairline">
                        <div className="col-span-2 py-5 pr-2">
                            <p className="text-sm font-semibold text-white">{label}</p>
                            <p className="mt-1 text-xs leading-snug text-white/45">{note}</p>
                        </div>
                        <div
                            ref={rowIndex === 0 ? trackRef : undefined}
                            className="relative col-span-10 my-5"
                            style={{ height: lanes * LANE_HEIGHT - (LANE_HEIGHT - 36) }}
                        >
                            {AXIS_TICKS.map((tick) => (
                                <span
                                    key={tick}
                                    aria-hidden="true"
                                    className="absolute -bottom-5 -top-5 w-px border-l border-dashed border-white/[0.07]"
                                    style={{ left: `${tick}%` }}
                                />
                            ))}
                            {placed.map(({ skill, left, lane }) => {
                                const Icon = skill.icon;
                                const isSelected = selected?.name === skill.name;
                                return (
                                    <button
                                        key={skill.name}
                                        ref={(el) => {
                                            if (el) pillRefs.current.set(skill.name, el);
                                        }}
                                        type="button"
                                        onMouseEnter={() => onSelect(skill)}
                                        onFocus={() => onSelect(skill)}
                                        onClick={() => onSelect(skill)}
                                        aria-pressed={isSelected}
                                        className={`absolute inline-flex h-9 cursor-default items-center gap-2 whitespace-nowrap rounded-[var(--r-btn)] border px-3.5 text-sm transition-[border-color,background-color,color,left,top] duration-300 ${
                                            isSelected
                                                ? 'border-accent bg-accent text-ink'
                                                : 'border-white/12 bg-surface text-white/80 hover:text-white'
                                        }`}
                                        style={{ left, top: lane * LANE_HEIGHT }}
                                    >
                                        {Icon && <Icon size={14} title="" aria-hidden="true" />}
                                        {skill.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function SpectrumList() {
    return (
        <div className="space-y-10 md:hidden">
            {SKILL_TRACKS.map(({ id, label, note }) => (
                <div key={id}>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 text-xs text-white/45">{note}</p>
                    <ul className="mt-4 border-t hairline">
                        {SPECTRUM_SKILLS.filter((s) => s.track === id).map((skill) => {
                            const Icon = skill.icon;
                            return (
                                <li key={skill.name} className="border-b hairline py-3.5">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="flex items-center gap-2 text-sm text-white">
                                            {Icon && <Icon size={14} title="" aria-hidden="true" />}
                                            {skill.name}
                                        </span>
                                        {skill.usedIn && <span className="text-right text-xs text-white/45">{skill.usedIn}</span>}
                                    </div>
                                    <div className="relative mt-3 h-px bg-white/10" aria-hidden="true">
                                        <span
                                            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                                            style={{ left: `${skill.x}%` }}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <p className="flex justify-between font-mono text-[11px] text-white/45">
                <span>← Design</span>
                <span>Engineering →</span>
            </p>
        </div>
    );
}

export default function Skills() {
    const [selected, setSelected] = useState<SpectrumSkill | null>(null);

    return (
        <Section
            id="skills"
            index="04"
            label="Skills"
            title={
                <>
                    A toolkit that spans the <em>whole</em> spectrum.
                </>
            }
            intro="Every skill placed where it sits between design and engineering, grouped by how often I use it."
        >
            <Reveal>
                <SpectrumBoard onSelect={setSelected} selected={selected} />
                <div className="hidden md:block">
                    <Readout skill={selected} />
                </div>
                <SpectrumList />
            </Reveal>

            <div className="mt-24 md:mt-32">
                <Reveal>
                    <h3 className="t-label border-b hairline pb-5">Certifications</h3>
                </Reveal>
                <ul className="grid-12 gap-y-8 pt-8">
                    {CERTIFICATIONS.map((cert, i) => (
                        <li key={cert.name} className="col-span-4 md:col-span-6 lg:col-span-3">
                            <Reveal delay={i * 80}>
                                <p className="font-mono text-xs tabular-nums text-accent">{cert.date}</p>
                                <p className="mt-3 font-semibold leading-snug tracking-tight text-white">{cert.name}</p>
                                <p className="mt-1.5 text-sm text-white/50">{cert.issuer}</p>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}
