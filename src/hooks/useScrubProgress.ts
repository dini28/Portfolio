'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Reports how far the page has scrolled through a tall element, from 0 when its top meets the
 * viewport top to 1 when its bottom meets the viewport bottom. Pair it with a sticky child.
 */
export function useScrubProgress<T extends HTMLElement>(
    ref: RefObject<T | null>,
    onProgress: (progress: number) => void,
    enabled = true
) {
    const callback = useRef(onProgress);

    useEffect(() => {
        callback.current = onProgress;
    });

    useEffect(() => {
        if (!enabled) return;

        let frame = 0;
        const measure = () => {
            frame = 0;
            const element = ref.current;
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const distance = rect.height - window.innerHeight;
            callback.current(distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 1);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [ref, enabled]);
}
