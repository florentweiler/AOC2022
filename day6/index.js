const fs = require('fs');
const readline = require('readline');


async function compute1() {
    const data = fs.readFileSync('./input.txt').toString();
    console.log(data)
    let chars = data.toString().split('');
    for (let i=3; i<chars.length; i++) {
        let testString = data.substring(i -3, i+1);
        if(new Set(testString).size == testString.length) {
            console.log(`Part 1 : ${i+1}`);
            break;
        }
    }
    for (let i=3; i<chars.length; i++) {
        let testString = data.substring(i -13, i+1);
        if(new Set(testString).size == testString.length) {
            console.log(`Part 2 : ${i+1}`);
            break;
        }
    }
}

compute1()