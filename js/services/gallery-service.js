'use strict'
var gFilter
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['funny', 'boss'] },
    { id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['funny', 'dog', 'baby'] },
    { id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['funny', 'boss'] },
    { id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['funny', 'boss'] },
    { id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['funny', 'wrestling'] },
    { id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['funny', 'boss'] },
]

function getImgs() {
    if (!gFilter || gFilter === 'all') {
        return gImgs
    } else {
        return findImgsForDisplay()
    }
}

function findImgsForDisplay() {
    return gImgs.reduce((acc, img) => {
        img.keywords.forEach(keyword => {
            if (keyword.includes(gFilter)) acc.push(img)
            return
        })
        return acc
    }, [])
}

function setFilter(tag) {
    gFilter = tag
}

function loadMemes() {
    gMemes = loadFromStorage(MEME_KEY)
}