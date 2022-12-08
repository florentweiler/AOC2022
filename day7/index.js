const fs = require('fs');
const readline = require('readline');

class Node {
    constructor(name, parent) {
      this.name = name;
      this.parent = parent;
      this.children = []
      this.filesSize = 0;
      this.totalSize = 0;
    }
    incrementFileSize(data) {
      this.filesSize += data
    }
}

class Tree {
    constructor() {
        this.root = null
    }
}

let possibleDirs = [];

let check = 0;

let count = 0;

const tree = new Tree();
let currentFolder = null;
let childFolder = null;

function buildtree(line) {
    if (line === '$ cd /') {
        tree.root = new Node('/', null);
        currentFolder = tree.root;
    } else if(line  === '$ ls') {

    } else if(line.startsWith('dir')) {
        currentFolder.children.push(new Node(line.replace('dir ', ''), currentFolder));
    } else if(line ===  '$ cd ..') {
        childFolder = currentFolder;
        currentFolder = currentFolder.parent;
    } else if(line.startsWith('$ cd')) {
        currentFolder = currentFolder.children.find(c => c.name === line.replace('$ cd ', ''));
    } else {
        currentFolder.incrementFileSize(+line.split(' ')[0])
        check += +line.split(' ')[0];
    }
}

function computeTreeSize(node) {
    let childrenSizes = node.children.map(child => computeTreeSize(child));
    node.totalSize = node.filesSize + childrenSizes.reduce((partialSum, a) => partialSum + a, 0);
    if(node.totalSize <= 100000) {
        count+= node.totalSize;
    }
    if(node.totalSize >= 6090134) {
        possibleDirs.push(node.totalSize);
    }
    return node.totalSize;
}

async function compute() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        buildtree(line);
    }
    let size = computeTreeSize(tree.root);
    console.log(size)
    console.log(`Part 1 : ${count}`);
    console.log(`Part 1 : ${Math.min(...possibleDirs)}`)
    
}

compute();