const fs = require('fs');
const _ = require('lodash');

const Direction = require('./direction.js');
const Play = require('./play.js');
const TileType = require('./tile-type.js');

const boardData = fs.readFileSync('data/board-data.txt').toString()
  .split('\n')
  .slice(0, -1)
  .map(line => (line + _.repeat(' ', 15 - line.length)).split(''))

function charToTileType(c) {
  return {
    ' ': TileType.NORMAL,
    'd': TileType.DOUBLE_LETTER_SCORE,
    't': TileType.TRIPLE_LETTER_SCORE,
    'D': TileType.DOUBLE_WORD_SCORE,
    'T': TileType.TRIPLE_WORD_SCORE,
  }[c];
}

class Board {
  constructor() {
    this.board = boardData.map(line => line.map(c => ({ type: charToTileType(c), start: false })));
    this.board[7][7].start = true;
  }

  at(x, y) {
    return this.board[y][x];
  }
}

module.exports = Board;
