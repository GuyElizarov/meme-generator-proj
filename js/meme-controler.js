'use strict'

var gElCanvas
var gCtx
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
        // resizeCanvas()
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const elImg = document.querySelector(`[data-id="${geSelectedImgId()}"]`)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    getMeme().lines.forEach((line, indx) => {
        if (indx === 0) {
            drawText(0, gElCanvas.width / 2, gElCanvas.height / 3.5)
        } else if (indx === 1) {
            drawText(1, gElCanvas.width / 2, gElCanvas.height / 1.5)
        } else {
            drawText(indx, 300, 300)
        }
        return
    })
}

function drawText(lineIdx, x, y) {
    const line = getMeme().lines[lineIdx]
    const { size, color, txt } = line
    line.x = x
    line.y = y

    gCtx.lineWidth = 2
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.font = `${size}px impact`
    gCtx.fillStyle = color
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = '#232b2b'
    gCtx.strokeText(txt, x, y)
}

function onCreateLine() {
    creatLine()
    renderMeme()
        // const lastLineIdx = getMeme().lines.length - 1
        // drawText(lastLineIdx, 300, 300)
}

function onImgSelect(imgId) {
    setImgId(imgId)
    renderMeme()
    document.querySelector('.main-editor').hidden = false
}

function onTxtChange(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onColorChange(color) {
    setColor(color)
    renderMeme()
}

function onChangeTxtSize(dif) {
    setTxtSize(dif)
    renderMeme()
}

function onCloseEditor() {
    document.querySelector(".main-editor").hidden = true
}

function onSwitchLine() {
    switchLineIdx()
    const elTxtInput = document.querySelector(`[name='txt']`)
    elTxtInput.value = getCurrTxt()
}

function onDeleteLine() {
    clearLine()
    renderMeme()
    const elTxtInput = document.querySelector(`[name='txt']`)
    elTxtInput.value = 'do something...'

}

function onClearAll() {
    clearAllTxt()
    renderMeme()
    const elTxtInput = document.querySelector(`[name='txt']`)
    elTxtInput.value = 'do something...'
}
















function draw(ev) {
    const { offsetX, offsetY } = ev
    switch (gCurrShape) {
        case 'text':
            drawText('שלום', offsetX, offsetY);
            break;
    }
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth - 30;
    gElCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}