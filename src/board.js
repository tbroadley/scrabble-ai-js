const fs = require('fs');
const _ = require('lodash');

const boardData = fs.readFileSync('data/board-data.txt').toString()
  .split('\n')
  .slice(0, -1)
  .map(line => (line + _.repeat(' ', 15 - line.length)).split(''))

const TileType = Object.freeze({
  NORMAL: 0,
  DOUBLE_LETTER_SCORE: 1,
  TRIPLE_LETTER_SCORE: 2,
  DOUBLE_WORD_SCORE: 3,
  TRIPLE_WORD_SCORE: 4,
});

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
    return this.board[y - 1][x - 1];
  }
}

module.exports = Board;
