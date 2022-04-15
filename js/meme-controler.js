'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
        // resizeCanvas()
        // addListeners()
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
    toggleEditor()
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
    toggleEditor()
}

// function toggleMenu() {
//     document.body.classList.toggle('menu-open')
// }

function toggleEditor() {
    const elMainGallery = document.querySelector('.main-gallery')
    const elEditorContainer = document.querySelector('.editor-container')

    elMainGallery.classList.toggle('close-gallery')
    elEditorContainer.classList.toggle('open-editor')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.log('elContainer', elContainer)
    console.log('gElCanvas', gElCanvas)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}