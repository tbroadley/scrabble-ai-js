const Direction = require('./direction.js');
const TileType = require('./tile-type.js');

class Play {
  constructor(gameState, start, direction, tiles) {
    this.gameState = gameState;
    this.start = start;
    this.direction = direction;
    this.tiles = tiles;
  }

  // TODO handle playing through an existing word
  // TODO handle secondary words
  getScore() {
    let score = 0;
    let wordScoreMultiplier = 1;
    const bingoBonus = this.tiles.length === 7 ? 50 : 0;

    this.tiles.forEach((tile, index) => {
      const x = this.start.x + (this.direction === Direction.ACROSS ? index : 0);
      const y = this.start.y + (this.direction === Direction.DOWN ? index : 0);

      if (tile === undefined) console.log(this.tiles);
      let tileScore = tile.value;

      const space = this.gameState.board.at(x, y);
      switch (space.type) {
        case TileType.DOUBLE_LETTER_SCORE:
          tileScore *= 2;
          break;
        case TileType.TRIPLE_LETTER_SCORE:
          tileScore *= 3;
          break;
        case TileType.DOUBLE_WORD_SCORE:
          wordScoreMultiplier *= 2;
          break;
        case TileType.TRIPLE_WORD_SCORE:
          wordScoreMultiplier *= 3;
          break;
      }

      score += tileScore;
    });

    return score * wordScoreMultiplier + bingoBonus;
  }
}

module.exports = Play;
