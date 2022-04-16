'use strict'


const MEME_KEY = 'memeDB'
var gClickedLine = NaN
var gMemes = []
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function switchLineIdx() {
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx >= gMeme.lines.length) {
            gMeme.selectedLineIdx = 0
        }
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

function clearClickLine() {
    gClickedLine = NaN
}

function isLineClicked(clickedPos) {
    return gMeme.lines.some(line => {
        var { x, y, size } = line
        const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2)

        if (distance <= size) {
            gClickedLine = line
            return true
        }
    })
}

function dragLine(dx, dy) {
    gClickedLine.x += dx
    gClickedLine.y += dy
}

function setSelectedLineIdx() {
    gMeme.selectedLineIdx = getClickedLinIdx()
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
    let { size } = getCurrLine()
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

function setLineDrag(isDrag) {
    gClickedLine.isDrag = isDrag
}
// getters

function getMeme() {
    return gMeme
}

function getCurrTxt() {
    if (getCurrLine()) return getCurrLine().txt
}

function geSelectedImgId() {
    return gMeme.selectedImgId
}

function getCurrLine() {
    if (gMeme.lines.length !== 0) return gMeme.lines[gMeme.selectedLineIdx]
}

function getClickedLine() {
    return gClickedLine
}

function getClickedLinIdx() {
    return gMeme.lines.findIndex(line => line === gClickedLine)
}

// function saveCanvas(href) {
//     gMemes.push(href)
//     saveMemsToStorage
// }

// function saveMemsToStorage() {
//     saveToStorage(MEME_KEY, gMemes)
// }

// function loadMemesFromStorage() {
//     loadFromStorage(MEME_KEY)
// }