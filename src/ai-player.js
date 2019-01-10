const Rack = require('./rack.js');

class AIPlayer {
  constructor(name, gameState) {
    this.name = name;
    this.gameState = gameState;
    this.rack = new Rack(this.gameState.bag);
    this.passedLastTurn = false;
  }

  makeMove() {
    if (this.gameState.isFirstTurn()) {
      this.makeFirstTurnMove();
    } else {
      throw 'TODO: implement AI';
    }
  }

  makeFirstTurnMove() {
    const plays = this.gameState.playFinder.findPlays(this.rack);
    console.log(this.rack.tiles);
    console.log(plays);
    // TODO find best play and play it
  }

  isRackEmpty() {
    return this.rack.length === 0;
  }
}

module.exports = AIPlayer;
