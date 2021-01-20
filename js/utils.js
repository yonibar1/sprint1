'use strict'
function buildBoard(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        mat[i] = []
        for (var j = 0; j < size; j++) {
            gCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            mat[i][j] = gCell
        }
    }
    return mat
}


function placeBomb(clickedI, clickedJ) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var rNum = getRandomInt(0, gLevel.SIZE)
        var rNum1 = getRandomInt(0, gLevel.SIZE)
        if (rNum === clickedI && rNum1 === clickedJ) {
            i--
        } else {
            gBoard[rNum][rNum1].isMine = true
        }
        console.log(rNum, rNum1);
    }
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
