interface SectionBackgroundProps {
    variant?: 'default' | 'subtle';
    animated?: boolean;
}

const SectionBackground = ({ variant = 'default', animated = false }: SectionBackgroundProps) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Fine Grid Texture */}
            <div
                className="absolute inset-0 opacity-[0.6]"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--theme-grid-color) 1px, transparent 1px),
                        linear-gradient(90deg, var(--theme-grid-color) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Ambient Gradient Blobs */}
            <div
                className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${animated ? 'animate-pulse' : ''}`}
                style={{
                    backgroundColor: 'var(--theme-blob-bg)',
                    opacity: variant === 'subtle' ? 0.6 : 1,
                    animationDuration: animated ? '4s' : undefined
                }}
            />
            <div
                className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl ${animated ? 'animate-pulse' : ''}`}
                style={{
                    backgroundColor: 'var(--theme-blob-bg)',
                    opacity: variant === 'subtle' ? 0.4 : 0.6,
                    animationDuration: animated ? '6s' : undefined,
                    animationDelay: animated ? '2s' : undefined
                }}
            />
        </div>
    );
};

export default SectionBackground;
