const fs = require('fs');
const readline = require('readline');

let globalCount = 0;

function getCommon(stringList) {
    return stringList[0].split('').filter(c => stringList[1].includes(c) && (stringList.length === 2 ? true : stringList[2].includes(c)));
}

async function compute1() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        const length = line.length;
        const rucksack1 = line.substring(0,length/2);
        const rucksack2 = line.substring(length/2,length);
        let commonChar = getCommon([rucksack1, rucksack2])[0];
        if(commonChar.charCodeAt() > 96) {
            globalCount+= commonChar.charCodeAt() - 96;
        } else {
            globalCount+= commonChar.charCodeAt() - 38;
        }
    }
    console.log(`Result is ${globalCount}`);
}

async function compute2() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    let lineGroup = [];
    for await (const line of rl) {
        lineGroup.push(line);
        if(lineGroup.length === 3) {
            let commonChar = getCommon(lineGroup)[0];
            if(commonChar.charCodeAt() > 96) {
                globalCount+= commonChar.charCodeAt() - 96;
            } else {
                globalCount+= commonChar.charCodeAt() - 38;
            }
            lineGroup = [];
        }
    }
    console.log(`Result is ${globalCount}`);
}

async function exec() {
    await compute1();
    globalCount = 0;
    await compute2();
}

exec();