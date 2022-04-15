'use strict'


const MEME_KEY = 'memeDB'
var gMemes = []
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
        isDrag: false
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

function saveCanvas(href) {
    gMemes.push(href)
    saveMemsToStorage
}

function saveMemsToStorage() {
    saveToStorage(MEME_KEY, gMemes)
}

function loadMemes() {
    gMemes = loadFromStorage(MEME_KEY)
}











function isCircleClicked(clickedPos) {
    const { x, y, size } = gMeme.lines[selectedLineIdx]
    const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2)
    return distance <= size
}


function setLineDrag(isDrag) {
    gCircle.isDrag = isDrag
}

// function moveCircle(dx, dy) {
//     gCircle.pos.x += dx
//     gCircle.pos.y += dy
// }

















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