import { useRef, useEffect } from 'react'
import Effect from "./Effect.js";
import './MatrixRain.scss'
import { isInViewport } from '../../customHooks/useIsInView.js';


function MatrixRain() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas == null) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const context = canvas.getContext('2d');
		if (context == null) return;

		// creating effect object which initializes symbols array with Symbol objects
		const effect = new Effect(canvas.width, canvas.height);

		let lastTime = 0;
		const fps = 30;
		const nextframe = 1000 / fps; //for fps = 50, nextFrame = 20
		let timer = 0;

		function animate(timeStamp: number) {
			if (context == null || canvas == null) return;
			if (timeStamp == 0) drawBackgroundOverlay('ff', context, canvas);

			// checking paint time difference
			const deltaTime = timeStamp - lastTime;
			//updating lastTime = current elapsed time to  paint the screen
			lastTime = timeStamp;
			// if time exceeds nextframe value then paint
			// and reset timer to zero else add delta time
			if (timer > nextframe && isInViewport(canvas)) {
				// drawing transparent rectangle over text to hide previous text
				drawBackgroundOverlay('14', context, canvas);

				// text color — read from CSS variable so it reacts to theme switches
				context.fillStyle = getComputedStyle(document.body).getPropertyValue('--matrix-rain-color').trim();
				//drawing text column
				effect.characterColumns.forEach((symbol) => {
					symbol.draw(context);
					symbol.update();
				});
				timer = 0;
			} else {
				timer += deltaTime;
			}

			requestAnimationFrame(animate);
		}
		animate(0);

		// resize event to handle columns adjustment on window resize
		window.addEventListener("resize", () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			effect.resize(canvas.width, canvas.height);
		});
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