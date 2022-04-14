'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function switchLineIdx() {
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function clearLine() {
    getCurrLine().txt = ''
}

function clearAllTxt() {
    gMeme.lines.forEach(line => line.txt = '')
}

function creatLine(txt = 'Edit me') {
    gMeme.lines.push({
        txt,
        size: 50,
        align: 'left',
        color: getRandomColor(),
    })

}

//setters

function setLineTxt(txt) {
    const line = getCurrLine()
    if (!line) creatLine(txt)
    else line.txt = txt
}

function setImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    getCurrLine().color = color

}

function setTxtSize(dif) {
    let size = gMeme.lines[gMeme.selectedLineIdx].size
    if (size + dif > 5 && size + dif < 80) {
        getCurrLine().size += dif
    }
}

// getters

function getCurrTxt() {
    return getCurrLine().txt
}

function geSelectedImgId() {
    return gMeme.selectedImgId
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}