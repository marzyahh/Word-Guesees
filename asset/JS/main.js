
let arrPersian = [
  1570, 1575, 1576, 1662, 1578, 1579, 1580, 1670, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1601, 1602, 1705, 1711, 1604, 1605, 1606, 1608, 1607, 1740
]

let _keyboard = document.querySelector('.keyboard')
let _wordDisplay = document.querySelector('.word-display')
let _guessesWord = document.querySelector('.gusse-txt b')
let _gameModal = document.querySelector('.game-modal')
let _playAgainBtn = document.querySelector('.play-again')

let correctWord;
let wrongGuessesCount = 0
let maxGuessed = 6
let correctLetters = []

const resetGame = () => {
  correctLetters = []
  wrongGuessesCount = 0
  _guessesWord.innerHTML = `
   ${wrongGuessesCount} / ${maxGuessed}
`
  _wordDisplay.innerHTML = correctWord.split('').map(() => `<li class="letter"></li>`).join('')

  _keyboard.querySelectorAll('button').forEach(btn => {
    btn.disabled = false
  })
  _gameModal.classList.remove('show')
}

// Function to reverse string
function ReverseString(str) {
  return str.split('').reverse().join('')
}
const getRandomWord = () => {

  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
  correctWord = word;
  document.querySelector('.hint-txt b').innerText = hint
  resetGame()
  _wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('')

}

const gameOver = (isVictory) => {
  setTimeout(() => {
    const _modalTxt = isVictory ? 'You found the word:' : 'the correct word was: '
    _gameModal.querySelector('img').src = `./asset/CSS/img/${isVictory ? 'victory' : 'lost'}.gif`
    _gameModal.querySelector('h4').innerHTML = `${isVictory ? 'Congrats!' : 'Game Over!'}`
    _gameModal.querySelector('p').innerHTML = `${_modalTxt} <b>${ReverseString(correctWord)}</b>`

    _gameModal.classList.add('show')

  }, 300);

}

const initGame = (button, clickedLetter) => {
  if (correctWord.includes(clickedLetter)) {
    // Show all Correct Letter
    [...correctWord].forEach((letter, i) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter)
        _wordDisplay.querySelectorAll('li')[i].innerText = letter
        _wordDisplay.querySelectorAll('li')[i].classList.add('guessed')
      }
    })
  } else {
    wrongGuessesCount++
  }
  button.disabled = true
  _guessesWord.innerHTML = `
           ${wrongGuessesCount} / ${maxGuessed}
        `

  // Show Modal Game
  // console.log(correctLetters);
  // console.log(correctWord);
  if (wrongGuessesCount === maxGuessed) return gameOver(false)
  if (correctLetters.length === correctWord.length) return gameOver(true)
}

//   Virtical KeyBoard 
arrPersian.forEach((val) => {
  let _button = document.createElement('button')
  _button.innerHTML = String.fromCharCode(val)
  _keyboard.appendChild(_button)
  _button.addEventListener('click', e => {
    initGame(e.target, String.fromCharCode(val))
  })
})


//   console.log(_playAgainBtn);
//   Getting Random words from Array
getRandomWord()

_playAgainBtn.addEventListener('click', getRandomWord)