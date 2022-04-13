'use strict'

function renderGallery() {

    document.querySelector('.images').innerHTML = getImgs().map(img => `
    <img src=${img.url} onclick="onImgSelect(${img.id})">
    `).join('')
}