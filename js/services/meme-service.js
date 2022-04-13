'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['funny'] },
    { id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['funny'] },
    { id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['funny'] },
]


// var gMeme = {
//     selectedLineIdx: 0,
//     lines: [{
//         txt: 'I sometimes eat Falafel',
//         size: 20,
//         align: 'left',
//         color: 'red'
//     }]
// }

var gMeme = {
    selectedImgId: 1,
    lines: {
        txt: 'I sometimes eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    },

    line: 'text',
    color: '#F2F2F2'
}

function setLineTxt(txt) {
    gMeme.lines.txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    gMeme.lines.color = color

}

function setTxtSize(dif) {
    let size = gMeme.lines.size
    if (size + dif > 5 && size + dif < 80) {
        gMeme.lines.size += dif
    }
}








function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}