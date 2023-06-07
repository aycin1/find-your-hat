const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor() {
    this.state = {
      field: [
        ["*", "░", "O"],
        ["░", "O", "░"],
        ["░", "^", "░"],
      ],
      xCoordinate: 0,
      yCoordinate: 0,
      replay: true,
    };
  }
  print() {
    console.log(this.state.field.join());
  }
  currentLocationUpdater() {
    this.print();
    const direction = prompt("Which direction would you like to go?");
    if (direction === "up" || direction === "w") {
      this.state.yCoordinate -= 1;
    } else if (direction === "down" || direction === "s") {
      this.state.yCoordinate += 1;
    } else if (direction === "left" || direction === "a") {
      this.state.xCoordinate -= 1;
    } else if (direction === "right" || direction === "d") {
      this.state.xCoordinate += 1;
    }
    this.print();
  }
  didUserLoseOrWin() {
    if (
      this.state.xCoordinate < 0 ||
      this.state.yCoordinate < 0 ||
      this.state.xCoordinate > 2 ||
      this.state.yCoordinate > 2
    ) {
      console.log("You moved outside of the field! You lose :(");
      this.state.replay = false;
    } else if (
      this.state.field[this.state.yCoordinate][this.state.xCoordinate] === hole
    ) {
      console.log("You fell into the hole! You lose :(");
      this.state.replay = false;
    } else if (
      this.state.field[this.state.yCoordinate][this.state.xCoordinate] === hat
    ) {
      console.log("You found the hat! You win :)");
      this.state.replay = false;
    } else {
      this.state.replay = true;
    }
  }
  static generateField(height, width, holePercent) {
    const newField = [];
    for (let i = 0; i < height; i++) {
      newField[i] = [];
      for (let j = 0; j < width; j++) {
        newField[i][j] = fieldCharacter;
      }
    }
    let holeCounter = 0;
    let holeLimit = (width * height * holePercent) / 100;
    while (holeCounter < holeLimit) {
      newField[Math.ceil(Math.random() * (height - 1))][
        Math.ceil(Math.random() * (width - 1))
      ] = hole;
      holeCounter += 1;
    }
    newField[Math.ceil(Math.random() * (height - 1))][
      Math.ceil(Math.random() * (width - 1))
    ] = hat;
    newField[0][0] = pathCharacter;
    return newField;
  }
  render() {
    while (this.state.replay) {
      this.currentLocationUpdater();
      this.didUserLoseOrWin();
      if (this.state.replay) {
        this.state.field[this.state.yCoordinate][this.state.xCoordinate] =
          pathCharacter;
      }
    }
  }
}

const field = new Field();
// field.render();
console.log(Field.generateField(5, 6, 30));
