'use client';

import { useEffect, useState } from 'react';

export const GRID_TOGGLE_EVENT = 'toggle-layout-grid';

const isTyping = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

export default function GridOverlay() {
    const [strong, setStrong] = useState(false);

    useEffect(() => {
        const toggle = () => setStrong((value) => !value);
        const onKey = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() !== 'g' || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
            toggle();
        };

        window.addEventListener('keydown', onKey);
        window.addEventListener(GRID_TOGGLE_EVENT, toggle);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener(GRID_TOGGLE_EVENT, toggle);
        };
    }, []);

    return (
        <div aria-hidden="true" className="layout-grid" data-strong={strong}>
            <div className="shell grid-12 h-full">
                {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={i >= 4 ? 'hidden md:block' : undefined} />
                ))}
            </div>
        </div>
    );
}
