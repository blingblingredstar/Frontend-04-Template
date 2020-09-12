const $ = Symbol("$");

interface Node {
  [key: string]: Node | null;
  [$]?: number;
}

interface Trie {
  root: Node;
}

class Trie {
  constructor() {
    this.root = Object.create(null);
  }

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = Object.create(null);
      node = node[char]!;
    }

    if (!($ in node)) node[$] = 0;

    node[$]++;
  }

  most() {
    let max = 0;
    let maxWord = null;
    const visit = (node: Node, word: string) => {
      if (node[$] && node[$] > max) {
        max = node[$];
        maxWord = word;
      }
      for (let p in node) {
        visit(node[p]!, word + p);
      }
    };

    visit(this.root, "");
    console.log(maxWord, max);
  }
}

function randomWord(length: number) {
  let s = "";
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
  }
  return s;
}

const trie = new Trie();

for (let i = 0; i < 100000; i++) {
  trie.insert(randomWord(4));
}

console.dir(trie);
trie.most();
