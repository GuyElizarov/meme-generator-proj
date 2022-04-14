'use strict'

var gElCanvas
var gCtx

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
    getMeme().lines.forEach((line, indx) => drawText(indx))
}

function drawText(lineIdx) {
    const line = getMeme().lines[lineIdx]
    const { x, y, size, color, txt, align, font } = line

    gCtx.lineWidth = 2
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.font = `${size}px ${font}`
    gCtx.fillStyle = color
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = '#232b2b'
    gCtx.strokeText(txt, x, y)
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

function onChangeFont(font) {
    setFont(font)
    renderMeme()
}

function onMoveLine(diff) {
    const currY = getCurrLine().y
    if (diff + currY > gElCanvas.height || diff + currY < 0) return
    moveLine(diff)
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

function onChangeAlign(align) {
    setTextAlign(align)
    renderMeme()
}

function onSwitchLine() {
    switchLineIdx()
    const elTxtInput = document.querySelector(`[name='txt']`)
    elTxtInput.value = getCurrTxt()
}

function onDownloadCanvas(elLink) {
    elLink.href = gElCanvas.toDataURL()
    elLink.download = 'my-meme.jpg'
}

function onCreateLine() {
    creatLine()
    renderMeme()
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

function onCloseEditor() {
    document.querySelector(".main-editor").hidden = true
}


// function draw(ev) {
//     const { offsetX, offsetY } = ev
//     switch (gCurrShape) {
//         case 'text':
//             drawText('שלום', offsetX, offsetY);
//             break;
//     }
// }

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     gElCanvas.width = elContainer.offsetWidth - 30;
//     gElCanvas.height = elContainer.offsetHeight
// }