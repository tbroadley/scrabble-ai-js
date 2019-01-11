const _ = require('lodash');

const BLANK_INDEX = 26;

function buildSignature(word) {
  const signature = new Uint8Array(27);
  const upperCaseWord = word.toUpperCase();
  for (let i = 0; i < word.length; i += 1) {
    const charCode = upperCaseWord.charCodeAt(i);
    const index = charCode === '*'.charCodeAt(0) ? BLANK_INDEX : charCode - 65;
    signature[index] += 1;
  }
  return signature;
}

function signatureGte(sig1, sig2) {
  let mismatches = 0;
  for (let i = 0; i < 26; i += 1) {
    mismatches += _.max([0, sig2[i] - sig1[i]]);
  }
  return mismatches <= sig1[BLANK_INDEX];
}

class WordFinder {
  constructor(dictionary) {
    this.dictionary = dictionary.map(word => ({ word, signature: buildSignature(word) }));
  }

  findWords(rack) {
    const rackSignature = buildSignature(_.map(rack.tiles, 'letter').join(''));
    return this.dictionary
      .filter(({ signature }) => signatureGte(rackSignature, signature))
      .map(({ word }) => word.split('')
        .map(c => _.find(rack.tiles, { letter: c }) ||
                  _.find(rack.tiles, { letter: '*' })));
  }
}

module.exports = WordFinder;
