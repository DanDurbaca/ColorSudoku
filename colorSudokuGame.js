"use strict;";

var solution = [];
const colors = ["white", "OrangeRed", "red", "yellow", "DeepPink", "blue", "lime", "DarkTurquoise", "purple", "DarkRed"];

/*
This function will compute/generate a MATRIX of 9x9 sudoku numbers.
 */
function recursiveSolution(idxReached, matrixGenerated) {
    if (idxReached == 81) return true;
    let j = idxReached % 9;
    let i = (idxReached - j) / 9;
    let possibleValues = [...Array(9).keys()];

    // check on the same column:
    for (let testFrom = 0; testFrom < i; testFrom++) {
        const index = possibleValues.indexOf(matrixGenerated[testFrom][j]);
        if (index > -1) possibleValues.splice(index, 1);
    }

    // check on the same row:
    for (let testFrom = 0; testFrom < j; testFrom++) {
        const index = possibleValues.indexOf(matrixGenerated[i][testFrom]);
        if (index > -1) possibleValues.splice(index, 1);
    }

    // check AROUND 3x3
    let startRow = Math.floor(i / 3) * 3;
    let startCol = Math.floor(j / 3) * 3;
    for (let rowChecker = startRow; rowChecker < startRow + 3; rowChecker++)
        if (rowChecker <= i)
            for (let colChecker = startCol; colChecker < startCol + 3; colChecker++) {
                const index = possibleValues.indexOf(matrixGenerated[rowChecker][colChecker]);
                if (index > -1) possibleValues.splice(index, 1);
            }
    /////////
    while (possibleValues.length > 0) {
        let newColorIdx = Math.floor(Math.random() * possibleValues.length);
        matrixGenerated[i][j] = possibleValues[newColorIdx];
        possibleValues.splice(newColorIdx, 1);

        if (recursiveSolution(idxReached + 1, matrixGenerated)) return true;
    }
    matrixGenerated[i][j] = -1;
    return false;
}

/* The game starts here !*/
function startGame(hiddenBoxes = 4, containerId = "container") {
    solution.length = 0; // clear the contents of this array -> we will GENERATE it now !
    for (let i = 0; i < 9; i++) {
        solution.push([]);
        for (let j = 0; j < 9; j++) solution[i][j] = -1;
    }
    recursiveSolution(0, solution);

    var displaySolution = JSON.parse(JSON.stringify(solution));
    while (hiddenBoxes > 0) {
        let randomRow = Math.floor(Math.random() * 9);
        let randomCol = Math.floor(Math.random() * 9);
        if (displaySolution[randomRow][randomCol] !== -1) {
            hiddenBoxes--;
            displaySolution[randomRow][randomCol] = -1;
        }
    }

    let myContainer = document.getElementById(containerId);
    for (let bigBoxRow = 0; bigBoxRow < 3; bigBoxRow++)
        for (let bigBoxCol = 0; bigBoxCol < 3; bigBoxCol++) {
            let newBigBox = document.createElement("div");
            newBigBox.style.border = "solid black 5px";
            newBigBox.style.display = "flex";
            newBigBox.style.justifyContent = "space-around";
            newBigBox.style.alignContent = "space-around";
            newBigBox.style.flexWrap = "wrap";
            newBigBox.style.width = "30%";
            newBigBox.style.height = "30%";
            for (let smallBoxRow = 0; smallBoxRow < 3; smallBoxRow++)
                for (let smallBoxCol = 0; smallBoxCol < 3; smallBoxCol++) {
                    let newSmallBox = document.createElement("div");
                    newSmallBox.style.width = "30%";
                    let myId = (bigBoxRow * 3 + smallBoxRow) * 9 + bigBoxCol * 3 + smallBoxCol;
                    newSmallBox.id = "Box" + myId;
                    newSmallBox.style.height = "30%";
                    newSmallBox.style.backgroundColor = colors[displaySolution[bigBoxRow * 3 + smallBoxRow][bigBoxCol * 3 + smallBoxCol] + 1];
                    newBigBox.appendChild(newSmallBox);
                    if (displaySolution[bigBoxRow * 3 + smallBoxRow][bigBoxCol * 3 + smallBoxCol] === -1) addWheel(newSmallBox);
                }
            myContainer.appendChild(newBigBox);
        }
}
