const fs = require('fs');
const _ = require('lodash');

class Signature {
  constructor(word) {
    this.sig = _.range(0, 26).map(_.constant(0));
    word.toUpperCase().split('').forEach(c => this.sig[c.charCodeAt(0) - 65] += 1);
  }

  gt(sig) {
    return this.sig.every((n, i) => n >= sig.sig[i]);
  }
}

class PlayFinder {
  constructor(dictionary) {
    this.dictionary = dictionary.map(word => ({ word, signature: new Signature(word) }));
  }

  findPlays(word) {
    const sig = new Signature(word);
    return this.dictionary
      .filter(({ signature }) => sig.gt(signature))
      .map(({ word }) => word);
  }
}

function main() {
  const dictionary = fs.readFileSync('dictionary.txt').toString().split('\r\n');
  dictionary.pop();

  const finder = new PlayFinder(dictionary);
  console.log(finder.findPlays('recover'));
}

main();
