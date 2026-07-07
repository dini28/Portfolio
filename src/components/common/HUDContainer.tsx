import { useEffect, useState, useRef, useMemo } from 'react';

interface HUDContainerProps {
    children: React.ReactNode;
    title?: string;
}

export const HUDContainer = ({ children, title }: HUDContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const { width: W, height: H } = dimensions;

    const pathData = useMemo(() => {
        if (!W || !H) return '';

        const r = 24; // corner radius for rounded corners
        const bevel = 24; // bevel size for bottom-right corner
        const notchHeight = 24; // height of top notch
        const notchBevel = 24; // bevel width for top notch slants

        // Top notch setup (centered)
        const isMobile = W < 768;
        const hasTopNotch = !isMobile && !!title;
        const notchTopWidth = hasTopNotch ? Math.min(360, W * 0.45) : 0;

        let path = '';

        if (isMobile || !hasTopNotch) {
            // Draw a standard rounded box with a bevel bottom-right
            const activeBevel = isMobile ? 16 : bevel;
            path = `
                M ${r},0
                L ${W - r},0
                Q ${W},0 ${W},${r}
                L ${W},${H - activeBevel}
                L ${W - activeBevel},${H}
                L ${r},${H}
                Q ${0},${H} ${0},${H - r}
                L ${0},${r}
                Q ${0},${0} ${r},${0}
                Z
            `;
        } else {
            // Top notch coordinates
            const xTopStart = W / 2 - notchTopWidth / 2 - notchBevel;
            const xTopNotchStart = W / 2 - notchTopWidth / 2;
            const xTopNotchEnd = W / 2 + notchTopWidth / 2;
            const xTopEnd = W / 2 + notchTopWidth / 2 + notchBevel;

            // Path construction with top notch and beveled bottom-right corner
            path = `
                M ${r},0
                L ${xTopStart},0
                L ${xTopNotchStart},${notchHeight}
                L ${xTopNotchEnd},${notchHeight}
                L ${xTopEnd},0
                L ${W - r},0
                Q ${W},0 ${W},${r}
                L ${W},${H - bevel}
                L ${W - bevel},${H}
                L ${r},${H}
                Q ${0},${H} ${0},${H - r}
                L ${0},${r}
                Q ${0},${0} ${r},${0}
                Z
            `;
        }

        return path.trim().replace(/\s+/g, ' ');
    }, [W, H, title]);

    const isMobile = W < 768;

    return (
        <div 
            ref={containerRef} 
            className={
                isMobile 
                    ? "relative w-full h-full bg-transparent p-0 transition-all duration-300" 
                    : "relative w-full h-full bg-neutral-950/20 backdrop-blur-[4px] rounded-[2rem] p-8 md:p-12 lg:p-14 transition-all duration-300"
            }
        >
            {W > 0 && H > 0 && !isMobile && (
                <>
                    {/* SVG Notched Border */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Glow Layer */}
                        <path
                            d={pathData}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="3"
                            className="blur-sm"
                        />
                        {/* Crisp Line */}
                        <path
                            d={pathData}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.12)"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    {/* Left Decorative Bracket */}
                    {W >= 1024 && (
                        <div className="absolute left-[-20px] top-[10%] bottom-[10%] w-[12px] pointer-events-none opacity-40 z-0">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d={`M 12,0 L 4,0 L 0,8 L 0,${H * 0.8 - 8} L 4,${H * 0.8} L 12,${H * 0.8}`}
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.2)"
                                    strokeWidth="1.2"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                        </div>
                    )}

                    {/* Right Decorative Bracket */}
                    {W >= 1024 && (
                        <div className="absolute right-[-20px] top-[10%] bottom-[10%] w-[12px] pointer-events-none opacity-40 z-0">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d={`M 0,0 L 8,0 L 12,8 L 12,${H * 0.8 - 8} L 8,${H * 0.8} L 0,${H * 0.8}`}
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.2)"
                                    strokeWidth="1.2"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                        </div>
                    )}

                    {/* Top Notch Content */}
                    {title && (
                        <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center text-[9px] font-mono text-neutral-500 tracking-[0.3em] uppercase pointer-events-none select-none"
                            style={{ width: `${Math.min(360, W * 0.45)}px`, height: `24px` }}
                        >
                            {title}
                        </div>
                    )}
                </>
            )}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
