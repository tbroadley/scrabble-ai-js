const _ = require('lodash');

class Rack {
  constructor(bag) {
    this.bag = bag;
    this.tiles = this.bag.draw(7);
  }

  play(play) {
    play.tiles.forEach(tile => _.pull(this.tiles, tile));
    this.tiles = this.tiles.concat(this.bag.draw(play.tiles.length));
  }

  toString() {
    return this.tiles.map(t => t.letter).join('');
  }
}

module.exports = Rack;
