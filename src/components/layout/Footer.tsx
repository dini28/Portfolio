'use client';

import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO, FOOTER_LINKS, SOCIAL_LINKS } from '../../data/social';
import { scrollToSection } from '../common/SmoothScroll';
import { GRID_TOGGLE_EVENT } from '../common/GridOverlay';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t hairline">
            <div className="shell">
                <div className="grid-12 gap-y-12 py-16 md:py-20">
                    <div className="col-span-4 md:col-span-5">
                        <p className="t-h3">
                            Designed in Figma. <em className="text-accent">Built in code.</em>
                        </p>
                        <p className="t-body mt-4 max-w-sm">
                            UI/UX designer and frontend developer based in Udaipur, India. Open to remote work.
                        </p>
                        <a href={`mailto:${CONTACT_INFO.email}`} className="text-link mt-6 text-white">
                            {CONTACT_INFO.email}
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    <nav className="col-span-2 md:col-span-3 md:col-start-7" aria-label="Footer">
                        <h3 className="t-label">Sections</h3>
                        <ul className="mt-5 space-y-3">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="cursor-pointer text-sm text-white/60 transition-colors hover:text-accent"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="col-span-2 md:col-span-3 md:col-start-10">
                        <h3 className="t-label">Elsewhere</h3>
                        <ul className="mt-5 space-y-3">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-sm text-white/60 transition-colors hover:text-accent"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={CONTACT_INFO.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/60 transition-colors hover:text-accent"
                                >
                                    CV (PDF)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p
                    aria-hidden="true"
                    className="select-none whitespace-nowrap text-center text-[clamp(3.5rem,16.5vw,15rem)] font-semibold leading-[0.8] tracking-[-0.065em] text-white/[0.06]"
                >
                    Dipesh Soni
                </p>

                <div className="flex flex-col gap-4 border-t hairline py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Dipesh Soni. Designed and built by me.</p>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => window.dispatchEvent(new Event(GRID_TOGGLE_EVENT))}
                            className="hidden cursor-pointer items-center gap-2 transition-colors hover:text-accent md:inline-flex"
                        >
                            <kbd className="rounded-[4px] border hairline px-1.5 py-0.5 font-mono text-[10px]">G</kbd>
                            Toggle layout grid
                        </button>
                        <button
                            onClick={() => scrollToSection('#top')}
                            className="inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-accent"
                        >
                            Back to top
                            <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
