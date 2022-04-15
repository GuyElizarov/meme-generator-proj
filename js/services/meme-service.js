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
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function clearAllLines() {
    gMeme.lines = []
}

function creatLine(txt = 'Edit me', font = 'impact') {
    const { x, y } = creatCoords()
    gMeme.lines.push({
        x,
        y,
        txt,
        size: 50,
        align: 'center',
        color: getRandomColor(),
        font: 'impact',
    })
}

function creatCoords() {
    const lineCount = gMeme.lines.length
    if (lineCount === 0 || lineCount > 2) {
        return { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    } else if (lineCount === 1) {
        return { x: gElCanvas.width / 2, y: gElCanvas.height / 3 }
    } else {
        return { x: gElCanvas.width / 2, y: gElCanvas.height / 1.5 }
    }
}

function moveLine(diff) {
    const line = getCurrLine()
    line.y += diff
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
    let size = getCurrLine().size
    if (size + dif > 20 && size + dif < 200) {
        getCurrLine().size += dif
    }
}

function setFont(font) {
    getCurrLine().font = font
}

function setTextAlign(align) {
    gMeme.lines.forEach(line => line.align = align)
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