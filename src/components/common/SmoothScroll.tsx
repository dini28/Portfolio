'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
    children: ReactNode;
}

const HEADER_OFFSET = 88;

let lenisInstance: Lenis | null = null;

// Lenis overrides native window.scrollTo, so section jumps must go through it.
export const scrollToSection = (target: string) => {
    if (target === '#' || target === '#top') {
        if (lenisInstance) lenisInstance.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const element = document.querySelector<HTMLElement>(target);
    if (!element) return;

    if (lenisInstance) {
        lenisInstance.scrollTo(element, { offset: -HEADER_OFFSET });
    } else {
        const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
    }
};

export const scrollToY = (top: number, immediate = false) => {
    if (lenisInstance) lenisInstance.scrollTo(top, { immediate });
    else window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
};

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisInstance = lenis;

        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    return <>{children}</>;
};
