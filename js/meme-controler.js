'use strict'

var gElCanvas
var gCtx
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
        // resizeCanvas()
    renderMeme()
    renderGallery()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    document.querySelector('.main-editor').hidden = false
}

function renderMeme() {
    const meme = getMeme()
    const memeImg = getImgs().find(img => img.id === meme.selectedImgId)
    var img = new Image()
    img.src = memeImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(0, gElCanvas.width / 2, gElCanvas.height / 3.5)
        drawText(1, gElCanvas.width / 2, gElCanvas.height / 1.5)
    }
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

function onSwitchLine() {
    switchLineIdx()
    const elTxtInput = document.querySelector(`[name='txt']`)
    elTxtInput.value = getCurrTxt()
}

function drawText(lineIdx, x, y) {
    const meme = getMeme()
    const line = meme.lines[lineIdx]
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.font = `${line.size}px arial`
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeStyle = '#383838'
    gCtx.strokeText(line.txt, x, y)
        // gCtx.drawFocusIfNeeded(gElCanvas)
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