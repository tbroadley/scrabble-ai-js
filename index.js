const fs = require('fs');

const PlayFinder = require('./play-finder.js');

function main() {
  const dictionary = fs.readFileSync('dictionary.txt').toString().split('\r\n');
  dictionary.pop();

  const finder = new PlayFinder(dictionary);
  console.log(finder.findPlays('recover'));
}

main();
