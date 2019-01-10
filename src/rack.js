class Rack {
  constructor(bag) {
    this.bag = bag;
    this.tiles = this.bag.draw(7);
  }
}

module.exports = Rack;
