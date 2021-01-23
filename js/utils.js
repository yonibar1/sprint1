'use strict'
var gTimeInterval;

function buildBoard(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        mat[i] = []
        for (var j = 0; j < size; j++) {
            gCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            mat[i][j] = gCell
        }
    }
    return mat
}

function setTime() {
    var time = Date.now()
    gTimeInterval = setInterval(function () {
        var timeElapsed = (Date.now() - time) / 1000
        document.querySelector('.time').innerText = timeElapsed
    }, 100);
}

function resetTimer() {
    clearInterval(gTimeInterval)
    document.querySelector('.time').innerText = 0
    gGame.shownCount = 0

}

function renderSmiley(num) {
    var strHTML = ''
    switch (num) {
        case 0:
            strHTML = `<img class="smiley" src="images/smile.png" alt="smiley-face"></img>`
            break;
        case 1:
            strHTML = `<img class="smiley" src="images/lose.png" alt="smiley-face"></img>`
            break;
        case 2:
            strHTML = `<img class="smiley" src="images/win.png" alt="smiley-face"></img>`
            break;
    }
    var elBtn = document.querySelector('.btn-container')
    elBtn.innerHTML = strHTML
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
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function setBestScore(time) {
    var bestTime = localStorage.getItem('bestTime');
    var convertedTime = parseInt(time)
    if (!bestTime || bestTime > convertedTime) {
        localStorage.setItem('bestTime', convertedTime)
    }
    renderBestTime()
}


function renderBestTime() {
    var bestTime = localStorage.getItem('bestTime')
    if (bestTime) {
        document.querySelector('.my-best').innerText = 'your best time is:' + bestTime + 's'
    }
}

