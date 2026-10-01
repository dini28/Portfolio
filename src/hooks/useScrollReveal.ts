import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
    threshold?: number;
}

interface UseStaggerRevealOptions {
    staggerDelay?: number;
    threshold?: number;
}

const MIN_VISIBLE_PX = 160;

// Basic scroll reveal for single elements
export const useScrollReveal = <T extends HTMLElement = HTMLElement>({ threshold = 0.1 }: UseScrollRevealOptions = {}) => {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Elements much taller than their clipping container (e.g. inside a desktop window)
                // can never reach a ratio threshold, so also reveal once a solid chunk is on screen.
                const showsEnough = entry.intersectionRect.height >= MIN_VISIBLE_PX;
                if (entry.isIntersecting && (entry.intersectionRatio >= threshold || showsEnough)) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            { threshold: [0, threshold, 0.25, 0.5] }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
};

// Staggered reveal for lists/grids
export const useStaggerReveal = <T extends HTMLElement = HTMLElement>(
    count: number,
    { staggerDelay = 100, threshold = 0.2 }: UseStaggerRevealOptions = {}
) => {
    const containerRef = useRef<T>(null);
    const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    // Trigger staggered animation
                    for (let index = 0; index < count; index++) {
                        setTimeout(() => {
                            setVisibleItems(prev => {
                                const newState = [...prev];
                                newState[index] = true;
                                return newState;
                            });
                        }, index * staggerDelay);
                    }

                    observer.disconnect();
                }
            },
            { threshold }
        );

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [count, staggerDelay, threshold]);

    return { containerRef, visibleItems };
};