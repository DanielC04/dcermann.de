export default class CharacterColumn{
	private characters: string;
	x: number;
	y: number;
	fontSize: number;
	canvasHeight: number;
	text: string;

	constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
		this.characters =
			"アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.canvasHeight = canvasHeight;
		this.text = "";
	}

	draw(context: CanvasRenderingContext2D) {
		// generating a random symbol from characters string
		this.text = this.characters.charAt(
			Math.floor(Math.random() * this.characters.length)
		);
		//drawing text
		context.textAlign = "center";
		context.font = this.fontSize + "px monospace";
		context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
	}
	// resetting y-axis to 0 if it crosses the height of the window
	// otherwise incerementing y-axis value by 1
	update() {
		if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.998) {
			this.y = 0;
		} else {
			this.y += 1;
		}
	}
}