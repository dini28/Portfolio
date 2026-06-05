interface SectionBackgroundProps {
    variant?: 'default' | 'subtle';
    animated?: boolean;
}

const SectionBackground = ({ variant = 'default', animated = false }: SectionBackgroundProps) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Fine Grid Texture */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Ambient Gradient Blobs */}
            <div
                className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${variant === 'subtle' ? 'bg-white/3' : 'bg-white/5'
                    } ${animated ? 'animate-pulse' : ''}`}
                style={animated ? { animationDuration: '4s' } : undefined}
            />
            <div
                className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl ${variant === 'subtle' ? 'bg-white/2' : 'bg-white/3'
                    } ${animated ? 'animate-pulse' : ''}`}
                style={animated ? { animationDuration: '6s', animationDelay: '2s' } : undefined}
            />
        </div>
    );
};

export default SectionBackground;
