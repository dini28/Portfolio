import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    radius: number;
    color: string;
}

export const ThreeDParticleCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const particles: Particle[] = [];
        // Calculate particle count dynamically based on screen size
        const getParticleCount = (w: number, h: number) => {
            return Math.min(80, Math.floor((w * h) / 25000));
        };
        
        let particleCount = getParticleCount(width, height);
        const focalLength = 350; // Focal length for 3D projection

        // Mouse coordinates relative to page/canvas
        let mouseX = 0;
        let mouseY = 0;
        let isMouseOver = false;

        // Initialize particles in a 3D box
        const initParticles = () => {
            particles.length = 0;
            particleCount = getParticleCount(width, height);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: (Math.random() - 0.5) * width * 1.1,
                    y: (Math.random() - 0.5) * height * 1.1,
                    z: (Math.random() - 0.5) * 600, // Depth range: -300 to 300
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    vz: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.8 + 0.8,
                    color: 'rgba(255, 255, 255, 0.45)'
                });
            }
        };

        initParticles();

        // 3D rotation variables (slow constant auto-rotation)
        let angleX = 0.0002;
        let angleY = 0.0003;

        // Rotate point in 3D around X axis
        const rotateX = (p: Particle, angle: number) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const y1 = p.y * cos - p.z * sin;
            const z1 = p.z * cos + p.y * sin;
            p.y = y1;
            p.z = z1;
        };

        // Rotate point in 3D around Y axis
        const rotateY = (p: Particle, angle: number) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const x1 = p.x * cos - p.z * sin;
            const z1 = p.z * cos + p.x * sin;
            p.x = x1;
            p.z = z1;
        };

        const handleResize = () => {
            if (!canvasRef.current) return;
            width = canvasRef.current.width = canvasRef.current.offsetWidth;
            height = canvasRef.current.height = canvasRef.current.offsetHeight;
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseOver = true;

            // Introduce slight mouse-based rotation drift
            const driftY = (e.clientX - rect.left - rect.width / 2) * 0.0000015;
            const driftX = (e.clientY - rect.top - rect.height / 2) * 0.0000015;
            angleX = 0.0002 + driftX;
            angleY = 0.0003 + driftY;
        };

        const handleMouseLeave = () => {
            isMouseOver = false;
            angleX = 0.0002;
            angleY = 0.0003;
        };

        window.addEventListener('resize', handleResize);
        // Track mousemove over the window to capture events easily, but constrain coordinates
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // Update & rotate particles
            particles.forEach((p) => {
                // Apply velocity
                p.x += p.vx;
                p.y += p.vy;
                p.z += p.vz;

                // Apply continuous slow rotation
                rotateX(p, angleX);
                rotateY(p, angleY);

                // Boundary box wrapping in 3D space
                const boundX = width * 0.7;
                const boundY = height * 0.7;
                const boundZ = 300;

                if (p.x < -boundX) p.x = boundX;
                if (p.x > boundX) p.x = -boundX;
                if (p.y < -boundY) p.y = boundY;
                if (p.y > boundY) p.y = -boundY;
                if (p.z < -boundZ) p.z = boundZ;
                if (p.z > boundZ) p.z = -boundZ;

                // 3D to 2D projection
                const scale = focalLength / (focalLength + p.z);
                const projX = centerX + p.x * scale;
                const projY = centerY + p.y * scale;

                // Mouse repulsion in projected 2D coordinates, mapped back to 3D space
                if (isMouseOver) {
                    const dx = projX - mouseX;
                    const dy = projY - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const interactionRadius = 140;

                    if (dist < interactionRadius) {
                        const force = (interactionRadius - dist) / interactionRadius;
                        const angle = Math.atan2(dy, dx);
                        // Push slightly away in 3D
                        p.x += Math.cos(angle) * force * 1.5;
                        p.y += Math.sin(angle) * force * 1.5;
                    }
                }
            });

            // Project all particles and cache their screen coords for line drawing
            const projected = particles.map((p) => {
                const scale = focalLength / (focalLength + p.z);
                return {
                    x: centerX + p.x * scale,
                    y: centerY + p.y * scale,
                    scale,
                    z: p.z,
                    radius: p.radius * scale,
                    color: p.color
                };
            });

            // Draw connecting lines in 3D
            ctx.lineWidth = 0.5;
            for (let i = 0; i < projected.length; i++) {
                const p1 = projected[i];
                for (let j = i + 1; j < projected.length; j++) {
                    const p2 = projected[j];

                    // Distance in projected 2D coordinates
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist2D = Math.sqrt(dx * dx + dy * dy);

                    // Distance in depth (Z coordinate)
                    const distZ = Math.abs(p1.z - p2.z);

                    // Only connect if close in both 2D and 3D depth
                    if (dist2D < 100 && distZ < 120) {
                        const alpha = (1 - dist2D / 100) * 0.12 * Math.min(p1.scale, p2.scale);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            projected.forEach((p) => {
                if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) return;

                // Base opacity scales with depth (scale ranges from ~0.5 to ~1.8)
                const opacity = Math.min(0.6, Math.max(0.08, (p.scale - 0.45) * 0.4));
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0.4, p.radius), 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50 mix-blend-screen" />;
};
