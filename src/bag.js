const fs = require('fs');
const _ = require('lodash');

function parseTileData(data) {
  const lines = data.split('\n');
  lines.pop();
  return lines.map(line => {
    const [letter, frequency, value] = line.split(' ');
    return {
      letter,
      frequency: _.toInteger(frequency),
      value: _.toInteger(value),
    };
  });
}

const tileData = parseTileData(fs.readFileSync('data/tile-data.txt').toString());

class Bag {
  constructor() {
    this.bag = _(tileData)
      .map(({ letter, frequency, value }) => _.times(frequency, _.constant({ letter, value})))
      .flatten()
      .shuffle()
      .value();
  }

  isEmpty() {
    return this.bag.length === 0;
  }

  draw(number) {
    number = _.min([number, this.bag.length]);

    const result = _.take(this.bag, number);
    this.bag = _.drop(this.bag, number);
    return result;
  }

  exchange(tiles) {
    if (this.bag.length < 7) return tiles;

    const newTiles = this.draw(tiles.length);
    this.bag = _.shuffle(this.bag.concat(tiles));
    return newTiles;
  }
}

module.exports = Bag;
