import { useRef, useEffect } from 'react';
import './SectionBg.scss';

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    r: number;
    opacity: number;
    accent: boolean;
}

function makeParticles(w: number, h: number): Particle[] {
    return Array.from({ length: 55 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.3 + 0.1),
        r: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.22 + 0.08,
        accent: Math.random() < 0.1,
    }));
}

export default function ParticlesBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const p = canvas.parentElement;
            if (p) { canvas.width = p.offsetWidth; canvas.height = p.offsetHeight; }
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = makeParticles(canvas.width, canvas.height);
        let paused = false, raf: number, lastTime = 0;

        const vis = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
        vis.observe(canvas);

        const tick = (t: number) => {
            const dt = Math.min(t - lastTime, 50);
            lastTime = t;

            if (!paused) {
                const { width: w, height: h } = canvas;
                const style = getComputedStyle(document.body);
                const textCol   = style.getPropertyValue('--text-color').trim();
                const accentCol = style.getPropertyValue('--contrast-color').trim();

                ctx.clearRect(0, 0, w, h);

                for (const p of particles) {
                    p.x += p.vx * dt * 0.1;
                    p.y += p.vy * dt * 0.1;
                    if (p.y < -5)    { p.y = h + 5; p.x = Math.random() * w; }
                    if (p.x < -5)    p.x = w + 5;
                    if (p.x > w + 5) p.x = -5;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle   = p.accent ? accentCol : textCol;
                    ctx.globalAlpha = p.opacity;
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); vis.disconnect(); };
    }, []);

    return <canvas ref={canvasRef} className="section-bg-canvas" />;
}
