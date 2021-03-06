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

  placeTile(x, y, tile) {
    this.board[y][x].tile = tile;
  }

  play({ start: { x, y }, direction, tiles }) {
    for (let i = 0; i < tiles.length; i += 1) {
      while (this.at(x, y).tile) {
        if (direction === Direction.ACROSS) {
          x += 1;
        } else {
          y += 1;
        }
      }

      this.placeTile(x, y, tiles[i]);
    }
  }

  toString() {
    return this.board.map(row => row.map(space => space.tile ? space.tile.letter : '-').join('')).join('\n') + '\n';
  }
}

module.exports = Board;
