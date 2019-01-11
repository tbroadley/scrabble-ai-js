const AIPlayer = require('./ai-player.js');
const Bag = require('./bag.js');
const Board = require('./board.js');
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

  applyPlay(player, play) {
    player.rack.play(play);
    this.board.play(play);
    player.score += play.getScore();
  }

  playTurn() {
    const playerToPlay = this.players[this.turn % this.players.length];

    console.log(`It's player ${playerToPlay.name}'s turn. Their rack is ${playerToPlay.rack.toString()}.`);

    const play = playerToPlay.getPlay();
    // TODO handle passing and exchanging
    this.applyPlay(playerToPlay, play);
    this.turn += 1;

    console.log(`Player ${playerToPlay.name} plays ${play.tiles.map(t => t.letter).join('')} for ${play.getScore()} points.`);
    console.log(`Player ${playerToPlay.name}'s score is now ${playerToPlay.score}.`);
    console.log(this.board.toString());
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
