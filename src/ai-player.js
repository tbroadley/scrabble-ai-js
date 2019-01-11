const _ = require('lodash');

const Direction = require('./direction.js');
const Play = require('./play.js');
const Rack = require('./rack.js');

class AIPlayer {
  constructor(name, gameState) {
    this.name = name;
    this.gameState = gameState;
    this.rack = new Rack(this.gameState.bag);
    this.passedLastTurn = false;
    this.score = 0;
  }

  // TODO decide what blank should be before returning play
  // TODO consider exchanging or passing
  getPlay() {
    if (this.gameState.isFirstTurn()) {
      return this.getFirstTurnPlay();
    } else {
      throw 'TODO: implement AI';
    }
  }

  getFirstTurnPlay() {
    const words = this.gameState.wordFinder.findWords(this.rack);
    const plays = _(words)
      .map(word => _.range(0, word.length)
        .map(index => new Play(this.gameState, { x: 7 - index, y: 7 }, Direction.ACROSS, word)))
      .flatten()
      .value();
    return _.maxBy(plays, play => play.getScore());
  }

  isRackEmpty() {
    return this.rack.length === 0;
  }
}

module.exports = AIPlayer;
