const fs = require('fs');
const readline = require('readline');

let X = 1;
let intervals = [20,60,100,140,180,220];
let strength = 0;

// let oldInstruction = null;
let instructions = [];

function executeAsyncInstruction() {
    let instr = instructions.shift();
    if(instr) {
        X+=instr;
    }
}

async function compute1() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        if(line === "noop") {
            instructions.push(null);
        }
        if (line !== "noop") {
            instructions.push(null);
            instructions.push(+line.split(' ')[1]);
        }

    }
    for(let i=2; i<=220; i++) {
        executeAsyncInstruction();
        if(intervals.includes(i)) {
            strength += (i*X);
        }
    }
    console.log(`Result is ${strength}`)
}

compute1()