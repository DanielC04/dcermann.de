import { useRef, useEffect } from 'react';
import './SectionBg.scss';

interface Node {
    x: number; y: number;
    vx: number; vy: number;
}

function makeNodes(w: number, h: number): Node[] {
    return Array.from({ length: 18 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
    }));
}

const CONNECT_DIST = 130;

export default function NetworkMesh() {
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

        const nodes = makeNodes(canvas.width, canvas.height);
        let paused = false, raf: number, lastTime = 0;

        const vis = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
        vis.observe(canvas);

        const tick = (t: number) => {
            const dt = Math.min(t - lastTime, 50);
            lastTime = t;

            if (!paused) {
                const { width: w, height: h } = canvas;
                const style = getComputedStyle(document.body);
                const textCol    = style.getPropertyValue('--text-color').trim();
                const accentCol  = style.getPropertyValue('--contrast-color').trim();

                ctx.clearRect(0, 0, w, h);

                for (const n of nodes) {
                    n.x += n.vx * dt * 0.1;
                    n.y += n.vy * dt * 0.1;
                    if (n.x < 0 || n.x > w) n.vx *= -1;
                    if (n.y < 0 || n.y > h) n.vy *= -1;
                    n.x = Math.max(0, Math.min(w, n.x));
                    n.y = Math.max(0, Math.min(h, n.y));
                }

                // Edges
                for (let i = 0; i < nodes.length; i++) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        const dx = nodes[j].x - nodes[i].x;
                        const dy = nodes[j].y - nodes[i].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < CONNECT_DIST) {
                            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
                            ctx.beginPath();
                            ctx.moveTo(nodes[i].x, nodes[i].y);
                            ctx.lineTo(nodes[j].x, nodes[j].y);
                            ctx.strokeStyle = accentCol;
                            ctx.globalAlpha = alpha;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }

                // Nodes
                for (const n of nodes) {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = textCol;
                    ctx.globalAlpha = 0.18;
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
