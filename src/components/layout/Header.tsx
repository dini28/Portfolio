'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, FileText, Menu, X } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from '../../data/social';
import { scrollToSection } from '../common/SmoothScroll';
import { useScrolledPast } from '../../hooks/useScrolledPast';

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

// A section is active once its top crosses 40% of the viewport; the last one wins at the page end.
function useActiveSection() {
    const [active, setActive] = useState('');

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.4;
            let current = '';
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            }
            const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            setActive(atEnd ? SECTION_IDS[SECTION_IDS.length - 1] : current);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    return active;
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const activeSection = useActiveSection();
    const isScrolled = useScrolledPast(24);
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const pill = pillRef.current;
        if (!nav || !pill) return;
        const place = () => {
            const link = nav.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
            pill.style.opacity = link ? '1' : '0';
            if (!link) return;
            pill.style.transform = `translateX(${link.offsetLeft}px)`;
            pill.style.width = `${link.offsetWidth}px`;
        };
        place();
        const observer = new ResizeObserver(place);
        observer.observe(nav);
        return () => observer.disconnect();
    }, [activeSection]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        scrollToSection(href);
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 pt-3">
                <div className="shell">
                    <div
                        className={`flex h-16 items-center justify-between rounded-[18px] border border-white/12 bg-ink/80 px-2 backdrop-blur-xl transition-shadow duration-500 ${
                            isScrolled || isOpen ? 'shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)]' : ''
                        }`}
                    >
                        <a
                            href="#top"
                            onClick={(e) => handleNavClick(e, '#top')}
                            className="group flex items-center gap-3 rounded-[var(--r-btn)] pr-3"
                            aria-label="Dipesh Soni, back to top"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-[var(--r-btn)] bg-accent font-mono text-xs font-bold text-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
                                DS
                            </span>
                            <span className="flex flex-col leading-none">
                                <span className="text-[15px] font-semibold tracking-tight text-white">Dipesh Soni</span>
                                <span className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.12em] text-white/45 lg:block">
                                    Design &amp; Frontend
                                </span>
                            </span>
                        </a>

                        <nav
                            ref={navRef}
                            className="relative hidden items-center rounded-[14px] border border-white/10 bg-white/[0.03] p-1 md:flex"
                            aria-label="Primary"
                        >
                            <span
                                ref={pillRef}
                                aria-hidden="true"
                                className="absolute left-0 top-1 h-10 rounded-[var(--r-btn)] bg-white opacity-0 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            {NAV_LINKS.map((link) => {
                                const id = link.href.slice(1);
                                const isActive = activeSection === id;
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        data-section={id}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        aria-current={isActive ? 'location' : undefined}
                                        className={`relative z-10 flex h-10 items-center rounded-[var(--r-btn)] px-4 text-sm font-medium transition-colors duration-300 lg:px-5 ${
                                            isActive ? 'text-ink' : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-1.5">
                            <a
                                href={CONTACT_INFO.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden h-11 items-center gap-1.5 rounded-[var(--r-btn)] px-4 text-sm font-medium text-white/70 transition-colors hover:text-white lg:inline-flex"
                            >
                                <FileText className="h-4 w-4" />
                                CV
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="btn btn-primary hidden h-11 px-5 sm:inline-flex"
                            >
                                Let&apos;s talk
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="grid h-11 w-11 place-items-center rounded-[var(--r-btn)] border border-white/12 text-white transition-colors hover:border-white/30 md:hidden"
                                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {isOpen && (
                <div className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[var(--pad-x)] pb-10 pt-28 md:hidden">
                    <nav className="flex flex-col border-t hairline" aria-label="Mobile">
                        {NAV_LINKS.map((link, i) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    aria-current={isActive ? 'location' : undefined}
                                    className="rise flex items-center justify-between border-b hairline py-5"
                                    style={{ '--delay': `${i * 50}ms` } as React.CSSProperties}
                                >
                                    <span
                                        className={`text-4xl font-semibold tracking-[-0.04em] ${isActive ? 'text-accent' : 'text-white'}`}
                                    >
                                        {link.label}
                                    </span>
                                    <ArrowRight className={`h-5 w-5 ${isActive ? 'text-accent' : 'text-white/30'}`} />
                                </a>
                            );
                        })}
                    </nav>

                    <div className="space-y-5 pt-8">
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="btn btn-primary w-full"
                        >
                            Let&apos;s talk
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <div className="flex items-center justify-between">
                            <a href={CONTACT_INFO.resume} target="_blank" rel="noopener noreferrer" className="text-link">
                                <FileText className="h-4 w-4" />
                                Download CV
                            </a>
                            <div className="flex items-center gap-2">
                                {SOCIAL_LINKS.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target={social.href.startsWith('http') ? '_blank' : undefined}
                                            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            aria-label={social.label}
                                            className="grid h-11 w-11 place-items-center rounded-[var(--r-btn)] border hairline text-white/60 transition-colors hover:border-accent/50 hover:text-accent"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
