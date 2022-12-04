const fs = require('fs');
const readline = require('readline');

let part1 = 0;
let part2 = 0;

function completeOverlap(assignments) {
    return (assignments[0] <= assignments[2] && assignments[1] >= assignments[3]) || (assignments[0] >= assignments[2] && assignments[1] <= assignments[3]);
}

function partialOverlap(assignments) {
    return !((assignments[1] < assignments[2]) || (assignments[3] < assignments[0]));
}

async function compute() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        const assignments = line.replace(',', '-').split('-').map(a => +a);
        if(completeOverlap(assignments)) {
            part1++;
        }
        if(partialOverlap(assignments)) {
            part2++;
        }
    }
    console.log(`Result is ${part1} for part1, ${part2} for part2`);
}

compute();