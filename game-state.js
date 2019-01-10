const Bag = require('./bag.js');
const Board = require('./board.js');
const Rack = require('./rack.js');

class GameState {
  constructor() {
    this.board = new Board();
    this.bag = new Bag();
    this.players = [];
    this.turn = 1;
  }

  addPlayer(name) {
    this.players.push({ name, rack: new Rack(this.bag) });
  }
}

module.exports = GameState;
