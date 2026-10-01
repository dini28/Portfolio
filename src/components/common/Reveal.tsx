'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

    return (
        <div
            ref={ref}
            data-visible={isVisible}
            className={`reveal ${className}`}
            style={{ '--delay': `${delay}ms` } as CSSProperties}
        >
            {children}
        </div>
    );
}
