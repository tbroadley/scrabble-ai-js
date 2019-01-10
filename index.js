const fs = require('fs');

class Signature {
  constructor(word) {
    this.sig = word.toUpperCase().split('')
      .reduce((acc, c) => { acc[c] = acc[c] || 0; acc[c] += 1; return acc }, {});
  }

  gt(sig) {
    for (const c in sig.sig) {
      if (!this.sig[c] || this.sig[c] < sig.sig[c]) return false;
    }
    return true;
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
