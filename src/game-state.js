const AIPlayer = require('./ai-player.js');
const Bag = require('./bag.js');
const { Board } = require('./board.js');
const WordFinder = require('./word-finder.js');

const FIRST_TURN = 0;

class GameState {
  constructor(dictionary) {
    this.board = new Board();
    this.bag = new Bag();
    this.players = [];
    this.turn = FIRST_TURN;
    this.wordFinder = new WordFinder(dictionary);
  }

  isFirstTurn() {
    return this.turn === FIRST_TURN;
  }

  addAIPlayer(name) {
    this.players.push(new AIPlayer(name, this));
  }

  isGameOver() {
    return this.bag.isEmpty() && (
      this.players.some(player => player.isRackEmpty()) ||
      this.players.every(player => player.passedLastTurn)
    );
  }

  playTurn() {
    this.players[this.turn % this.players.length].makeMove();
    this.turn += 1;
  }

  playGame() {
    while (!this.isGameOver()) this.playTurn();
    this.updateScoresByRemainingTiles();
  }

  updateScoresByRemainingTiles() {
    // TODO
  }
}

module.exports = GameState;
