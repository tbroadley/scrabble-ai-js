const fs = require('fs');

const GameState = require('./src/game-state.js');

function main() {
  const dictionary = fs.readFileSync('data/dictionary.txt').toString().split('\r\n');
  dictionary.pop();

  const game = new GameState(dictionary);
  game.addAIPlayer('AI');
  game.playGame();
}

main();
