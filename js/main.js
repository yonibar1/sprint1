'use strict'
// weekend TODO: *Best Score BONUS* ,other BONUSES ,fixing other bugs
const FLAG = '🚩'
const MINE = '💣'

var gLife;
var gBoard;
var gCell;
var gLevel = {
    SIZE: 4,
    MINES: 2
};


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    renderSmiley(0)
    resetTimer()
    gLife = 3
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    renderLife()
}


function toggleLevel(size, mines) {
    gLevel = { SIZE: size, MINES: mines }
    resetTimer()
    initGame()
}


function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td class="cell cell-${i}-${j}" oncontextmenu="putFlag(this,${i},${j}) "onclick="cellclicked(this,${i},${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.game-container')
    elBoard.innerHTML = strHTML
    elBoard.addEventListener('contextmenu', e => {
        e.preventDefault();
    });
}

function renderLife() {
    var strHTML = ''
    for (var i = 0; i < gLife; i++) {
        strHTML += `<span class="life"><img src="images/heart.gif"></span>`
    }
    var elHearts = document.querySelector('.heart')
    elHearts.innerHTML = strHTML
}

function setMinesNegsCount(clickedI, clickedJ) {
    var count = 0;
    for (var i = clickedI - 1; i <= clickedI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = clickedJ - 1; j <= clickedJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            if (i === clickedI && j === clickedJ) continue;
            if (gBoard[i][j].isMine) {
                count++;
            } else {
                var elNeg = document.querySelector(`.cell-${i}-${j}`)
                expandShown(gBoard, elNeg, i, j)
            }
        }
    }
    gCell.minesAroundCount = count
    return count;
}


function expandShown(board, negs, clickedI, clickedJ) {
    var count = 0
    for (var i = clickedI - 1; i <= clickedI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = clickedJ - 1; j <= clickedJ + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === clickedI && j === clickedJ) continue;
            if (gBoard[i][j].isMine) {
                count++;
            }
        }

    }
    negs.minesAroundCount = count
    negs.innerText = count
    gBoard[clickedI][clickedJ].minesAroundCount = count
    gBoard[clickedI][clickedJ].isShown = true


}


function cellclicked(elCell, i, j) {
    if (gBoard[i][j].isShown) return
    var cell = elCell
    if (gGame.shownCount === 0) {
        placeBomb(i, j)
        setTime()
    }
    if (!cell.innerText) {
        gGame.shownCount++
    }
    if (gBoard[i][j].isMine) {
        var boom = new Audio('sounds/explode.wav');
        boom.play()
        var elHeart = document.querySelector('.life')
        elHeart.remove()
        gLife--
        gBoard[i][j].isShown = true
        cell.innerText = MINE
        if (!gLife) { gameOver() }
    } else {
        var negs = setMinesNegsCount(i, j)
        gBoard[i][j].isShown = true
        cell.innerText = negs
    }
    if (isVictory()) {
        renderSmiley(2)
        // var currTime = document.querySelector('.time').innerText
        // setBestScore(currTime)
        resetTimer()
    }
}

function gameOver() {
    renderSmiley(1)
    resetTimer()
    gGame.isOn = false
}


function isVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isShown) return false
            if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
                if (gLife > 0) continue
            }
            if (gBoard[i][j].isMarked && !gBoard[i][j].isMine) return false
            if (!gBoard[i][j].isMarked && gBoard[i][j].isMine) return false
        }
    }
    return true
}

function putFlag(elCell, i, j) {
    var cell = elCell
    if (cell.innerText === FLAG) {

        gBoard[i][j].isMarked = false
        Board[i][j].isShown = false
        gGame.markedCount--
        cell.innerText = ''

    } else {
        gBoard[i][j].isMarked = true
        gBoard[i][j].isShown = true
        gGame.markedCount++
        cell.innerText = FLAG
    }
    if (isVictory()) {
        renderSmiley(2)
        // var best = document.querySelector('.my-best').innerText
        // setBestScore(best)
        resetTimer()
    }
}
