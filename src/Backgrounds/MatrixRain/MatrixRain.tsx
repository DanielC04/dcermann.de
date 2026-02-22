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

		//single color
		const singleColor = "#0aff0a";

		//gradient color
		let gradientColor = makeGradientColor(context, window.innerWidth, window.innerHeight);

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

				// text color
				context.fillStyle = document.body.getAttribute('data-theme') === 'dark' ? singleColor : gradientColor;
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
			gradientColor = makeGradientColor(context, window.innerWidth, window.innerHeight);
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

function makeGradientColor(context: CanvasRenderingContext2D, width: number, height: number) {
	const gradientColor = context.createLinearGradient(0, 0, width, height);
	gradientColor.addColorStop(0, "darkred");
	gradientColor.addColorStop(0.2, "violet");
	gradientColor.addColorStop(0.4, "darkgreen");
	gradientColor.addColorStop(0.6, "darkblue");
	gradientColor.addColorStop(0.8, "blue");
	gradientColor.addColorStop(0, "magenta");
	return gradientColor;
}

function drawBackgroundOverlay(hexOpacity: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	const backgroundColor = getComputedStyle(document.body).getPropertyValue('--background-color');
	context.fillStyle = `${backgroundColor}${hexOpacity}`;
	context.fillRect(0, 0, canvas.width, canvas.height);
}


export default MatrixRain;