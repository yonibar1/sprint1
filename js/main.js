'use strict'

const FLAG = '🚩'
const MINE = '💣'

var gLife;
var gBombCount;
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
    gLife = 3
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    console.log(gBoard);
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


function setMinesNegsCount(clickedCell, clickedI, clickedJ) {
    var count = 0;
    for (var i = clickedI - 1; i <= clickedI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = clickedJ - 1; j <= clickedJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            if (i === clickedI && j === clickedJ) continue;
            if (gBoard[i][j].isMine) count++
        }
    }

    gCell.minesAroundCount = count


    return count;
}


function cellclicked(elCell, i, j) {
    var cell = elCell
    if (gGame.shownCount === 0) placeBomb(i, j)

    var negs = setMinesNegsCount(elCell, i, j)

    if (!cell.innerText) {
        gGame.shownCount++
    }
    if (gBoard[i][j].isMine) {
        document.querySelector('.heart').removeChild(
            document.querySelector('.heart').firstChild
        );
        gLife--
        if (!gLife) { gameOver() }

        cell.innerText = MINE
    } else {
        cell.innerText = negs
    }
    if (isVictory()) alert('you win')
}

function gameOver() {
    console.log('bomb');
    gGame.isOn = false
}

function isVictory() {
    var pressed = gGame.markedCount + gGame.shownCount
    var fullBoard = gLevel.SIZE * gLevel.SIZE
    if (pressed === fullBoard) return true
    else return false
}

function putFlag(elCell, i, j) {
    var cell = elCell
    if (cell.innerText === FLAG) {

        gBoard[i][j].isMarked = false
        gGame.markedCount--
        cell.innerText = ''

    } else {
        gBoard[i][j].isMarked = true
        gGame.markedCount++
        cell.innerText = FLAG
    }
    if (isVictory()) alert('you win')
}


//MY PROJECT AT 19:03 Wednesday
