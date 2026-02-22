import { useRef, useEffect } from 'react';
import './SectionBg.scss';

export default function DotWaveBg() {
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

        let paused = false, raf: number, lastTime = 0;

        const vis = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
        vis.observe(canvas);

        const SPACING = 28;
        const DOT_R = 1.4;

        const tick = (t: number) => {
            const dt = Math.min(t - lastTime, 50);
            lastTime = t;

            if (!paused) {
                const { width: w, height: h } = canvas;
                const textCol = getComputedStyle(document.body).getPropertyValue('--text-color').trim();

                ctx.clearRect(0, 0, w, h);

                const time = t * 0.001;
                const cols = Math.ceil(w / SPACING) + 1;
                const rows = Math.ceil(h / SPACING) + 1;

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const x = c * SPACING;
                        const y = r * SPACING;
                        const wave = Math.sin(c * 0.35 + r * 0.18 + time * 0.9) * 0.5 + 0.5;
                        const opacity = 0.04 + 0.1 * wave;

                        ctx.beginPath();
                        ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
                        ctx.fillStyle = textCol;
                        ctx.globalAlpha = opacity;
                        ctx.fill();
                    }
                }
                ctx.globalAlpha = 1;
            }

            raf = requestAnimationFrame(tick);
            void dt;
        };
        raf = requestAnimationFrame(tick);

        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); vis.disconnect(); };
    }, []);

    return <canvas ref={canvasRef} className="section-bg-canvas" />;
}
