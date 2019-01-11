const _ = require('lodash');

const { Direction, Play } = require('./play.js');
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
    const words = this.gameState.wordFinder.findWords(this.rack);
    const plays = _(words)
      .map(word => _.range(0, word.length)
        .map(index => new Play(this.gameState, { x: 7 - index, y: 7 }, Direction.ACROSS, word)))
      .flatten()
      .value();
    const play = _.maxBy(plays, play => play.getScore());
    console.log(play);
    console.log(play.getScore());
  }

  isRackEmpty() {
    return this.rack.length === 0;
  }
}

module.exports = AIPlayer;
