const fs = require('fs');
const readline = require('readline');

let stacks = [['D', 'H', 'N', 'Q', 'T', 'W', 'V', 'B'],
    ['D', 'W', 'B'],
    ['T', 'S', 'Q', 'W', 'J', 'C'],
    ['F', 'J', 'R', 'N', 'Z', 'T', 'P'],
    ['G', 'P', 'V', 'J', 'M', 'S', 'T'],
    ['B', 'W', 'F', 'T', 'N'],
    ['B', 'L', 'D', 'Q', 'F', 'H', 'V', 'N'],
    ['H', 'P', 'F', 'R'],
    ['Z', 'S', 'M', 'B', 'L', 'N', 'P', 'H']];

async function compute1() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        const moveInstruction = line.split('-');
        for (let i=0; i<moveInstruction[0]; i++) {

            let move = stacks[moveInstruction[1]-1].pop();
            stacks[moveInstruction[2]-1].push(move);
        }

    }
    for(let i=0; i<stacks.length; i++) {
        console.log(stacks[i].pop());
    }
    // console.log(`Result is ${part1} for part1, ${part2} for part2`);
}

async function compute2() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        const moveInstruction = line.split('-');
        // console.log(line)
        let spliced = stacks[moveInstruction[1]-1].splice(stacks[moveInstruction[1]-1].length - moveInstruction[0], moveInstruction[0]);
        stacks[moveInstruction[2]-1].push(...spliced);

    }
    for(let i=0; i<stacks.length; i++) {
        console.log(stacks[i].pop());
    }
    // console.log(`Result is ${part1} for part1, ${part2} for part2`);
}

async function exec() {
    await compute1();
    console.log('----------');
    stacks = [['D', 'H', 'N', 'Q', 'T', 'W', 'V', 'B'],
        ['D', 'W', 'B'],
        ['T', 'S', 'Q', 'W', 'J', 'C'],
        ['F', 'J', 'R', 'N', 'Z', 'T', 'P'],
        ['G', 'P', 'V', 'J', 'M', 'S', 'T'],
        ['B', 'W', 'F', 'T', 'N'],
        ['B', 'L', 'D', 'Q', 'F', 'H', 'V', 'N'],
        ['H', 'P', 'F', 'R'],
        ['Z', 'S', 'M', 'B', 'L', 'N', 'P', 'H']];
    await compute2();
}

exec();