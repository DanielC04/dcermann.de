import CharacterColumn from "./CharacterColumn";

export default class Effect {
  canvasWidth: number;
  canvasHeight: number;
  fontSize: number;
  columns: number;
  characterColumns: Array<CharacterColumn>;
  private isFirstInitialization = true;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 17;
    this.columns = canvasWidth / this.fontSize;
    this.characterColumns = [];
    console.log("new initialization")
    this.#initialize();
  }

  #initialize() {
    let computeStartValue =  (x: number) => Infinity;
    if (this.isFirstInitialization) {
      computeStartValue = (x: number) => Math.sin(x);
      this.isFirstInitialization = false;
    }
    // initializing symbols array with Symbol objects
    for (let i = 0; i < this.columns; i++) {
      let newY = this.characterColumns[i]?.y;
      if (newY == undefined) newY = computeStartValue(i);
      this.characterColumns[i] = new CharacterColumn(i, newY, this.fontSize, this.canvasHeight);
    }
  }

  //function will be called when window resize event occurs
  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.#initialize();
  }
}