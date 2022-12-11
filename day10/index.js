const fs = require('fs');
const readline = require('readline');

let X = 1;
let intervals = [20,60,100,140,180,220];
let strength = 0;

let instructions = [];
let screenArray = [];

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
    for(let i=1; i<=240; i++) {
        if(i>1) {
            executeAsyncInstruction();
        }
        if(i>1 && i< 221) {
            if(intervals.includes(i)) {
                strength += (i*X);
            }
        }
        if(i%40 === 1) {
            screenArray.push('\n')
        }
        if(i%40 >= X && i%40 <=X+2) {
            screenArray.push('#');
        } else {
            screenArray.push('.')
        }
    }
    console.log(`Result is ${strength}`)
    console.log(screenArray,
        
        screenArray.join(''))
}

compute1()