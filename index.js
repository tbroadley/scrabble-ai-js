const fs = require('fs');

const GameState = require('./game-state.js');

function main() {
  const dictionary = fs.readFileSync('dictionary.txt').toString().split('\r\n');
  dictionary.pop();

  const game = new GameState(dictionary);
  game.addAIPlayer('AI');
  game.playGame();
}

main();
