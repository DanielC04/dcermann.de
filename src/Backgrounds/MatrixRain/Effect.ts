import CharacterColumn from "./CharacterColumn";

export default class Effect {
  canvasWidth: number;
	canvasHeight: number;
	fontSize: number;
	columns: number;
	characterColumns: Array<CharacterColumn>;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 17;
    this.columns = canvasWidth / this.fontSize;
    this.characterColumns = [];
    this.#initialize();
  }

  #initialize() {
    // initializing symbols array with Symbol objects
    for (let i = 0; i < this.columns; i++) {
      this.characterColumns[i] = new CharacterColumn(i, Math.sin(i), this.fontSize, this.canvasHeight);
    }
  }

  //function will be called when window resize event occurs
  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.characterColumns = [];
    this.#initialize();
  }
}