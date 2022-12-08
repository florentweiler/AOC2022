const fs = require('fs');
const readline = require('readline');

let matrice = [];
let matriceByCol = [];

let count = 0;
let leftMaxes = new Array(99).fill(-1);
let rightMaxes = new Array(99).fill(-1);

let topMaxes = new Array(99).fill(-1);
let botMaxes = new Array(99).fill(-1);

let maxScenic = 0;

function checkTopLeftMax(j, k, currentTree) {
    let isNewMax = false;
    if(leftMaxes[j] < currentTree.value) {
        isNewMax = true;
        leftMaxes[j] = currentTree.value;
    }
    if(topMaxes[k] < currentTree.value) {
        isNewMax = true;
        topMaxes[k] = currentTree.value;
    }
    if(isNewMax) {
        currentTree.visible = true;
        count++;
    }
}

function computeTopLeftScenic(matrice, j, k) {
    let j2 = j-1;
    let k2 = k-1;
    let shorterTree = true;
    let distance = 0;
    while(j2>=0 && shorterTree) {
        distance++;
        if(matrice[j2][k].value >=  matrice[j][k].value) {
            shorterTree = false;
        j2--;
    }
    matrice[j][k].scenicArray.push(distance);
    distance =0;
    while(k2>=0 && shorterTree) {
        distance++;
        if(matrice[j][k2].value >=  matrice[j][k].value) {
            shorterTree = false;
        k2--;
    }
    matrice[j][k].scenicArray.push(distance);
}

function computeBottomRightScenic(matrice, j, k) {
    let j2 = j+1;
    let k2 = k+1;
    let shorterTree = true;
    let distance = 0;
    while(j2<matrice.length && shorterTree) {
        distance++;
        if(matrice[j2][k].value >=  matrice[j][k].value) {
            shorterTree = false;
        j2++;
    }
    matrice[j][k].scenicArray.push(distance);
    distance =0;
    while(k2 < matrice.length && shorterTree) {
        distance++;
        if(matrice[j][k2].value >=  matrice[j][k].value) {
            shorterTree = false;
        k2++;
    }
    matrice[j][k].scenicArray.push(distance);
}

function checkBottomRightMax(j, k, currentTree) {
    let isNewMax = false;
    if(rightMaxes[j] < currentTree.value) {
        isNewMax = true;
        rightMaxes[j] = currentTree.value;
    }
    if(botMaxes[k] < currentTree.value) {
        isNewMax = true;
        botMaxes[k] = currentTree.value;
    }
    if(isNewMax && !currentTree.visible) {
        currentTree.visible = true;
        count++;
    }
}

async function compute1() {
    const fileStream = fs.createReadStream('./input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    let i=0;
    for await (const line of rl) {
        matrice[i] = line.split('').map(v => ({value: +v, visible: false, scenicArray: []}));
        i++;
    }
    for (let j=0; j < matrice.length; j++) {
        for (let k=0; k <matrice.length; k++) {
            checkTopLeftMax(j, k, matrice[j][k]);
            computeTopLeftScenic(matrice, j, k);
        }
    }
    for (let j= matrice.length-1; j >= 0; j--) {
        for (let k= matrice.length-1; k >= 0; k--) {
            checkBottomRightMax(j, k, matrice[j][k]);
            computeBottomRightScenic(matrice, j, k);
        }
    }
    console.log(count);
    for (let j=0; j < matrice.length; j++) {
        for (let k=0; k <matrice.length; k++) {
            let currScenic = matrice[j][k].scenicArray.reduce((a, b) => a * b );
            if(currScenic > maxScenic) {
                maxScenic = currScenic;
            }
        }
    }
    console.log(maxScenic);
}

compute1();