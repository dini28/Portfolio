'use client';

import Section from '../common/Section';
import { CERTIFICATIONS, EDUCATION } from '../../data/experience';

export default function Education() {
    return (
        <Section id="education" index="06" title="Education & certifications">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 rounded-xl border border-white/10 bg-surface p-6 sm:p-8">
                <div className="md:col-span-8">
                    <p className="meta-label">Degree</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{EDUCATION.degree}</h3>
                    <p className="mt-1 text-white/55">{EDUCATION.institution}</p>
                    <p className="mt-4 font-mono text-xs text-white/50">Expected graduation {EDUCATION.graduation}</p>
                </div>
                <div className="md:col-span-4 md:border-l md:border-white/10 md:pl-6 flex md:flex-col items-baseline md:items-start justify-between md:justify-center gap-2 pt-6 md:pt-0 border-t md:border-t-0 border-white/10">
                    <p className="meta-label">CGPA</p>
                    <p className="text-5xl font-semibold tracking-[-0.04em] text-white tabular-nums">
                        {EDUCATION.cgpa}
                        <span className="ml-1 text-lg font-normal text-white/40">/ 10</span>
                    </p>
                </div>
            </div>

            <h3 className="meta-label mt-12 pb-3 border-b border-white/[0.08]">Certifications</h3>
            <ul>
                {CERTIFICATIONS.map((cert) => (
                    <li
                        key={cert.name}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-4 border-b border-white/[0.06]"
                    >
                        <span className="sm:col-span-6 text-white">{cert.name}</span>
                        <span className="sm:col-span-4 text-sm text-white/55">{cert.issuer}</span>
                        <span className="sm:col-span-2 sm:text-right font-mono text-xs text-white/45 sm:pt-1">{cert.date}</span>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
