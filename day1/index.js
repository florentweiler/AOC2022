const fs = require('fs');
const readline = require('readline');


let maxCalories = [0];
let currentElfCalories = 0;
let maxMode = 0;

function checkIsTOPCalories() {
    const calLength = maxCalories.length;
    for (let i=0; i<calLength; i++) {
      if(currentElfCalories >= maxCalories[i]) {
        maxCalories.push(currentElfCalories);
        maxCalories.sort((a,b) => b-a);
        break;
      }
    }
    maxCalories = maxCalories.slice(0, maxMode);
}

function outputTopCalories() {
    const total = maxCalories.reduce((acc, curr) => acc + curr);
    console.log(`Top calories : ${maxCalories.join(', ')} wich is ${total} in total`);
}

async function getTopCalories() {
    const fileStream = fs.createReadStream('./elf_calories.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if(line == '') {
        checkIsTOPCalories();
        currentElfCalories = 0;
      } else {
        currentElfCalories += +line;
      }
    }
    outputTopCalories();
}

async function exec() {
  maxMode = 1;
  await getTopCalories();

  maxCalories = [0];
  currentElfCalories = 0;
  maxMode = 3;
  await getTopCalories();
}

exec();