const fs = require('fs');
const readline = require('readline');

let globalCount = 0;

const roundResultPart1 = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 7,
    'C Y': 2,
    'C Z': 6
}

const roundResultPart2 = {
    'A X': 3,
    'A Y': 4,
    'A Z': 8,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 2,
    'C Y': 6,
    'C Z': 7
}

async function compute(resultSet) {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        globalCount += resultSet[line];
    }
    console.log(`Result is ${globalCount}`);
}

async function exec() {
    await compute(roundResultPart1);
    globalCount = 0;
    await compute(roundResultPart2);
}

exec();