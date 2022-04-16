'use strict'

function renderGallery() {
    const elImgs = document.querySelector('.images')
    const imgs = getImgs()
    elImgs.innerHTML = imgs.map(img => `
    <img src=${img.url} data-id="${img.id}" onclick="onImgSelect(${img.id})">
    `).join('')
}

function onFilter(tag) {
    setFilter(tag)
    renderGallery()
}

// function onOpenMemes() {
//     loadMemes()
//     renderSavedMemes()
// }