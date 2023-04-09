const gameDisplay = document.querySelector('.game')
const gameStart = document.querySelector('.game-start')

const arr = [
    {uz:"Zebra",eng:"zebra"},
    {uz:"Bug\'u",eng:"Deer"}
]

arr.forEach((lang) => {
    gameStart.addEventListener('click', () => {
        const vocabBtn = document.createElement('button')
        vocabBtn.textContent = lang.uz
        gameDisplay.appendChild(vocabBtn)

        const vocabBtnEn = document.createElement('button')
        vocabBtnEn.textContent = lang.eng
        gameDisplay.appendChild(vocabBtnEn)
    })
})