const fs = require('fs');

const GameState = require('./game-state.js');
const PlayFinder = require('./play-finder.js');

function main() {
  const dictionary = fs.readFileSync('dictionary.txt').toString().split('\r\n');
  dictionary.pop();

  const finder = new PlayFinder(dictionary);

  const game = new GameState();
  game.addPlayer('AI');

  const { tiles } = game.players[0].rack;
  console.log(tiles);
  console.log(finder.findPlays(tiles));
}

main();
