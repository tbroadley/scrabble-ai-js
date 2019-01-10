const fs = require('fs');

String.prototype.sort = function() { return this.split('').sort().join(''); }

class TrieNode {
  constructor() {
    this.children = {};
    this.indices = [];
  }

  addChild(character) {
    if (!this.children[character]) {
      this.children[character] = new TrieNode();
    }
    return this.children[character];
  }

  insert(word, index) {
    if (word.length === 0) {
      return;
    }

    const sortedWord = word.sort();
    const nextChild = this.addChild(sortedWord.charAt(0));
    nextChild.insertHelper(sortedWord, 1, index);
  }

  insertHelper(sortedWord, positionInWord, index) {
    if (positionInWord === sortedWord.length) {
      this.indices.push(index);
    } else {
      const nextChild = this.addChild(sortedWord.charAt(positionInWord));
      nextChild.insertHelper(sortedWord, positionInWord + 1, index);
    }
  }

  getChildIndices(word) {
    return this.getChildIndicesHelper(word.toUpperCase().sort(), 0);
  }

  getChildIndicesHelper(sortedWord, positionInWord) {
    if (positionInWord === sortedWord.length) {
      return [];
    }

    const nextChild = this.children[sortedWord.charAt(positionInWord)];
    console.log(sortedWord.charAt(positionInWord));
    console.log(nextChild);
    const deeperIndices = nextChild.getChildIndicesHelper(sortedWord, positionInWord + 1);
    return this.indices.concat(deeperIndices);
  }
}

class PlayFinder {
  constructor(dictionary) {
    this.trie = new TrieNode();
    this.dictionary = dictionary;

    dictionary.forEach((word, index) => {
      this.trie.insert(word, index);
    });
  }

  findPlays(word) {
    return this.trie.getChildIndices(word).map(index => this.dictionary[index]);
  }
}

function main() {
  const dictionary = fs.readFileSync('dictionary.txt').toString().split('\r\n');
  const finder = new PlayFinder(dictionary);
  console.log(finder.findPlays('recover'));
}

main();
