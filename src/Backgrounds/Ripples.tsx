import { useRef, useEffect } from 'react';
import './SectionBg.scss';

interface Ripple {
    x: number; y: number;
    age: number;
    maxAge: number;
    maxR: number;
}

const SPAWN_INTERVAL = 1600; // ms between new ripples

export default function Ripples() {
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

        const ripples: Ripple[] = [];
        let paused = false, raf: number, lastTime = 0, spawnAccum = 0;

        const vis = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
        vis.observe(canvas);

        const spawnRipple = () => {
            const { width: w, height: h } = canvas;
            ripples.push({
                x: Math.random() * w,
                y: Math.random() * h,
                age: 0,
                maxAge: 2200,
                maxR: Math.min(w, h) * (0.15 + Math.random() * 0.2),
            });
        };
        spawnRipple();

        const tick = (t: number) => {
            const dt = Math.min(t - lastTime, 50);
            lastTime = t;

            if (!paused) {
                const { width: w, height: h } = canvas;
                const accentCol = getComputedStyle(document.body).getPropertyValue('--contrast-color').trim();

                ctx.clearRect(0, 0, w, h);

                spawnAccum += dt;
                if (spawnAccum >= SPAWN_INTERVAL) {
                    spawnRipple();
                    spawnAccum = 0;
                }

                for (let i = ripples.length - 1; i >= 0; i--) {
                    ripples[i].age += dt;
                    if (ripples[i].age > ripples[i].maxAge) {
                        ripples.splice(i, 1);
                        continue;
                    }
                    const { x, y, age, maxAge, maxR } = ripples[i];
                    const progress = age / maxAge;
                    const r = progress * maxR;
                    const alpha = (1 - progress) * 0.18;

                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.strokeStyle = accentCol;
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    // Inner ring (slightly offset in phase)
                    if (progress > 0.12) {
                        const r2 = (progress - 0.12) * maxR;
                        ctx.beginPath();
                        ctx.arc(x, y, r2, 0, Math.PI * 2);
                        ctx.globalAlpha = alpha * 0.5;
                        ctx.stroke();
                    }
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
