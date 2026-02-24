import { useRef, useEffect } from 'react'
import Effect from "./Effect.js";
import './MatrixRain.scss'


function MatrixRain() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas == null) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const context = canvas.getContext('2d');
		if (context == null) return;

		const effect = new Effect(canvas.width, canvas.height);

		let lastTime = 0;
		const fps = 30;
		const nextframe = 1000 / fps;
		let timer = 0;
		let animFrameId: number | null = null;
		let active = false;
		let inView = false;

		function animate(timeStamp: number) {
			if (context == null || canvas == null) return;
			const deltaTime = timeStamp - lastTime;
			lastTime = timeStamp;
			if (timer > nextframe) {
				drawBackgroundOverlay('14', context, canvas);
				context.fillStyle = getComputedStyle(document.body).getPropertyValue('--matrix-rain-color').trim();
				effect.characterColumns.forEach((symbol) => {
					symbol.draw(context);
					symbol.update();
				});
				timer = 0;
			} else {
				timer += deltaTime;
			}
			animFrameId = requestAnimationFrame(animate);
		}

		function start() {
			if (active) return;
			active = true;
			lastTime = 0;
			timer = nextframe + 1; // draw immediately on first frame
			animFrameId = requestAnimationFrame(animate);
		}

		function stop() {
			if (!active) return;
			active = false;
			if (animFrameId !== null) {
				cancelAnimationFrame(animFrameId);
				animFrameId = null;
			}
		}

		drawBackgroundOverlay('ff', context, canvas);

		const observer = new IntersectionObserver((entries) => {
			inView = entries[0].isIntersecting;
			if (inView && !document.hidden) start();
			else stop();
		}, { threshold: 0 });
		observer.observe(canvas);

		const onVisibilityChange = () => {
			if (!document.hidden && inView) start();
			else stop();
		};
		document.addEventListener('visibilitychange', onVisibilityChange);

		const onResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			effect.resize(canvas.width, canvas.height);
		};
		window.addEventListener("resize", onResize);

		return () => {
			stop();
			observer.disconnect();
			document.removeEventListener('visibilitychange', onVisibilityChange);
			window.removeEventListener("resize", onResize);
		};
	}, [])


	return (
		<div id="matrix-rain">
			<canvas ref={canvasRef}>
			</canvas>
		</div>
	)
}

function drawBackgroundOverlay(hexOpacity: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	const backgroundColor = getComputedStyle(document.body).getPropertyValue('--background-color');
	context.fillStyle = `${backgroundColor}${hexOpacity}`;
	context.fillRect(0, 0, canvas.width, canvas.height);
}


export default MatrixRain;