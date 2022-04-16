'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos

var gElCanvas
var gCtx


function onInit() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
        // resizeCanvas()
    renderMeme()
    addMouseListeners()
    addTouchListeners()
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
    markLine()
    switchInputText()
}

function switchInputText() {
    const elTxtInput = document.querySelector(`[name='txt']`)
    elTxtInput.value = getCurrTxt()
}

function onDownloadCanvas(elLink) {
    elLink.href = gElCanvas.toDataURL()
    elLink.download = 'my-meme.jpg'
}

function onSaveCanvas() {
    const href = gElCanvas.toDataURL()
    saveCanvas(href)
}

function onCreateLine() {
    creatLine()
    renderMeme()
}

function resetTextInputToPlaceholder() {
    const elTxtInput = document.querySelector(`[name='txt']`)
    if (getCurrTxt()) elTxtInput.value = getCurrTxt()
    else elTxtInput.value = ''
}

function onDeleteLine() {
    clearLine()
    renderMeme()
    resetTextInputToPlaceholder()
        // const elTxtInput = document.querySelector(`[name='txt']`)
        // elTxtInput.value = getCurrTxt()
}

function onClearAll() {
    clearAllTxt()
    renderMeme()
    resetTextInputToPlaceholder()
}

function onCloseEditor() {
    clearAllLines()
    toggleEditor()
    resetTextInputToPlaceholder()
}

function toggleEditor() {
    const elMainGallery = document.querySelector('.main-gallery')
    const elEditorContainer = document.querySelector('.editor-container')
    elMainGallery.classList.toggle('close-gallery')
    elEditorContainer.classList.toggle('open-editor')
}

// function toggleMenu() {
//     document.body.classList.toggle('menu-open')
// }

function markLine() {
    const { txt, x, y, size } = getCurrLine()
    const textMeasure = gCtx.measureText(txt)
    gCtx.beginPath()
    gCtx.rect(x - textMeasure.width / 2 - 5, y - size / 2 - 5, textMeasure.width + 10, size + 10)
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'firebrick'
    gCtx.stroke()
    setTimeout(renderMeme, 1500)
}

// i could not make it work :( //
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    if (getClickedLine()) {
        setSelectedLineIdx()
        setLineDrag(true)
        switchInputText()
    }
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getClickedLine()
    if (!line) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    dragLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    if (getClickedLine()) setLineDrag(false)
    clearClickLine()
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}