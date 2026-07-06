import { useRef, useEffect } from 'react';

/**
 * A custom React hook that adds a magnetic pulling effect to an element when hovered.
 * @param strength The multiplier for how strongly the element pulls towards the cursor.
 */
export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>(strength = 0.35) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Distance from cursor to button center
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Calculate active range (only pull if cursor is near or inside the bounds of the element plus padding)
            const padding = 50;
            const maxDistanceX = rect.width / 2 + padding;
            const maxDistanceY = rect.height / 2 + padding;

            if (Math.abs(deltaX) < maxDistanceX && Math.abs(deltaY) < maxDistanceY) {
                // Apply strength factor
                const moveX = deltaX * strength;
                const moveY = deltaY * strength;

                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                element.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
            } else {
                // Return to center if cursor wanders outside active range
                element.style.transform = 'translate3d(0, 0, 0)';
                element.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            }
        };

        const handleMouseLeave = () => {
            element.style.transform = 'translate3d(0, 0, 0)';
            element.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        };

        // Listen on the document or the element's parent container for better proximity tracking,
        // but here standard element-based mousemove works perfectly.
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};
