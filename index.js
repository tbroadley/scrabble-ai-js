const fs = require('fs');
const _ = require('lodash');

function buildSignature(word) {
  const signature = new Uint8Array(26);
  const upperCaseWord = word.toUpperCase();
  for (let i = 0; i < word.length; i += 1) {
    signature[upperCaseWord.charCodeAt(i) - 65] += 1;
  }
  return signature;
}

function signatureGte(sig1, sig2) {
  for (let i = 0; i < 26; i += 1) {
    if (sig1[i] < sig2[i]) return false;
  }
  return true;
}

class PlayFinder {
  constructor(dictionary) {
    this.dictionary = dictionary.map(word => ({ word, signature: buildSignature(word) }));
  }

  findPlays(rack) {
    const rackSignature = buildSignature(rack);
    return this.dictionary
      .filter(({ signature }) => signatureGte(rackSignature, signature))
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
