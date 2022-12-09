const fs = require('fs');
const readline = require('readline');

let visitedDic = {};

class Coordinate{
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    U() {
        this.x++;
    }
    D() {
        this.x--;
    }
    R(){
        this.y++;
    }
    L(){
        this.y--;
    }
    register() {
        visitedDic[`${this.x}.${this.y}`] = true;
    }
}

let ropes = Array.from({length:10}, u => (new Coordinate()));
let arrayPos = 0;

function tailFollow(direction, coorNumber){
    if ((Math.abs(ropes[arrayPos-1].x - ropes[arrayPos].x) + Math.abs(ropes[arrayPos-1].y - ropes[arrayPos].y)) > 2) {
        ropes[arrayPos].x = ropes[arrayPos].x > ropes[arrayPos-1].x ? ropes[arrayPos].x-1 : ropes[arrayPos].x+1;
        ropes[arrayPos].y = ropes[arrayPos].y > ropes[arrayPos-1].y ? ropes[arrayPos].y-1 : ropes[arrayPos].y+1;
    } else if (Math.abs((ropes[arrayPos-1].x - ropes[arrayPos].x)) > 1 || Math.abs((ropes[arrayPos-1].y - ropes[arrayPos].y)) > 1) {
        if (Math.abs((ropes[arrayPos-1].x - ropes[arrayPos].x)) > 1) {
            if(ropes[arrayPos].x > ropes[arrayPos-1].x) {
                ropes[arrayPos].x--;
            } else {
                ropes[arrayPos].x++;
            }
        } else if (Math.abs((ropes[arrayPos-1].y - ropes[arrayPos].y)) > 1) {
            if(ropes[arrayPos].y > ropes[arrayPos-1].y) {
                ropes[arrayPos].y--;
            } else {
                ropes[arrayPos].y++;
            }
        }
    }

    if(arrayPos === coorNumber-1) {
        ropes[arrayPos].register();
    }
    if(arrayPos + 1 < coorNumber) {
        arrayPos++;
        tailFollow(direction, coorNumber)
    }
}

function moveCoordinates(direction, times, coorNumber) {
    for(let i=0; i<times; i++) {
        arrayPos = 1;
        ropes[0][direction]();
        tailFollow(direction, coorNumber);
    }

}

async function compute1() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        const moveInstr = line.split(' ');
        moveCoordinates(moveInstr[0], +moveInstr[1], 2);
    }
    console.log(`Result 1: ${Object.keys(visitedDic).length}`);
}

async function compute2() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
        const moveInstr = line.split(' ');
        moveCoordinates(moveInstr[0], +moveInstr[1], 10);
    }
    console.log(`Result 2: ${Object.keys(visitedDic).length}`);
}

async function exec() {
    await compute1();
    ropes = Array.from({length:10}, u => (new Coordinate()));
    visitedDic = {};
    await compute2();
}

exec();