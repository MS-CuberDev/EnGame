let cardsCollected = [];
let DeckOfCards = [];
let cardOneElement, cardTwoElement, startTime;
let seconds = 0;
let currentTurn = 0;
let moves = 0;
let stars = 3;
let gameWon = false;

const deck = document.querySelector('.deck');
const winContainer = document.querySelector('.win');
const btnReplay = document.querySelector('.replay');
const moveHolder = document.querySelector('.moves');
const starHolder = document.querySelector('.star');
const resetButton = document.querySelector('.refresh');
const movesContainer = document.querySelector('.moves-selector');
const starsList = document.querySelectorAll('.stars');
const startBtn = document.querySelector('.game-start-btn');
const timerContainer = document.querySelector('.timer');
const secondsContainer = document.querySelector('.seconds');

const classList = ['fa-html5', 'fa-html5', 'fa-css3-alt', 'fa-css3-alt', 'fa-js-square', 'fa-js-square', 'fa-npm', 'fa-npm', 'fa-react', 'fa-react', 'fa-node-js', 'fa-node-js', 'fa-gulp', 'fa-gulp', 'fa-github', 'fa-github'];
const filteredList = ['fa-html5', 'fa-css3-alt', 'fa-js-square', 'fa-npm', 'fa-react', 'fa-node-js', 'fa-gulp', 'fa-github'];
const halfStar = "fas fa-star-half-alt";
const emptyStar = "far fa-star";
const fullSar = "fas fa-star stars";


startBtn.addEventListener('click', function() {

    this.classList.add('hide-start-btn');
    game();
});

btnReplay.addEventListener('click', replayTheGame);
resetButton.addEventListenr('click', replayTheGame);




// game function
function game() {
    // Part 1. Shuffle the cards
    letsShuffleThis();

    // Part 2: set the timer: timer function taken from sltackoverflow: https://stackoverflow.com/a/29972322
    startTime = Date.now();
    setInterval(function() {
        const delta = Date.now() - startTime; // milliseconds elapsed since start
        seconds = (Math.floor(delta / 1000)); // in seconds
        timerContainer.textContent = seconds;
    }, 1000); // update about every second

    // Part 3: add the flipping functionality to the deck of cards
    //  make use of the bubbling of events and attach the listener to the parent
    deck.addEventListener('click', cardClickHandler)
}

// Function to shuffle a list of class names and then attaches them to a card
function letsShuffleThis() {
    // 1. shuffle the list to randomize position
    DeckOfCards = shuffle([...classList]);
    // 2. get a refrence of the icon element to add class font awesome to.
    const icons = document.querySelectorAll('.back');
    // 3. remove any pre-defined classes in them
    icons.forEach(function(el) {
        for (let x = 0; x < filteredList.length; x++) {
            if (el.classList.contains(filteredList[x])) {
                el.classList.remove(filteredList[x]);
            }
        }
    });
    // 4. add the class to the list of classes in the icon element
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.add(DeckOfCards[i]);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function replayTheGame() {
    hideWin();
    document.querySelectorAll('.cant-click-this').forEach(function(el) {
        el.classList.remove('cant-click-this');
    });
    document.querySelectorAll('.card-container').forEach(function(el) {
        flipDown(el);
    });
    resetGame();

    resetUI();

    game();
}

function resetGame() {
    cardsCollected = [];
    DeckOfCards = [];
    cardOneElement = null;
    cardTwoElement = null;
    startTime = null;
    currentTurn = 0;
    gameWon = false;
    seconds = 0;
    moves = 0;
    stars = 3;
}

function cardClickHandler(e) {
    console.log('card clicked')
    const cardIsNotAlreadyChosen = e.target.parentNode != cardOneElement;
    if (!gameWon && e.target.classList.contains('card-face') && cardIsNotAlreadyChosen) {
        checkStats(e.target.parentNode);
        flipUp(e.target.parentNode);
    }
}

function checkStats(el) {
    switch (currentTurn) {
        case 0:
            cardOneElement = el;
            currentTurn += 1;
            break;
        case 1:
            cardTwoElement = el;
            break;
    }

    if (cardOneElement && cardTwoElement) {
        disableClick(deck);
        setTimeout(function() {
            areTheyEqual()
        }, 1000);
    }

}

function areTheyEqual() {
    const cardOneValue = cardOneElement.innerHTML.trim();
    const cardTwoValue = cardTwoElement.innerHTML.trim();
    if (!cardsCollected.includes(cardOneValue) && (cardOneValue === cardTwoValue)) { // if they are equal
        equal(cardOneValue, cardTwoValue);
    } else {
        notEqual();
    }
    moves += 1;
    starSetter();
    updateUI();

    currentTurn = 0;

    if (cardsCollected.length === 16) {
        gameWon = true;
        setTimeout(winMessage, 300);
    }
}

function equal(itemOne, itemTwo) {
    cardsCollected.push(itemOne, itemTwo);
    correct(cardOneElement);
    correct(cardTwoElement);
    setTimeout(function() {
        removeCorrect(cardOneElement)
    }, 350);
    setTimeout(function() {
        removeCorrect(cardTwoElement)
    }, 350);
    disableClick(cardOneElement);
    disableClick(cardTwoElement);
    setTimeout(resetElementPointer, 300);
}

function notEqual() {
    wrong(cardOneElement);
    wrong(cardTwoElement);
    setTimeout(function() {
        removeWrong(cardOneElement);
        flipDown(cardOneElement);
    }, 250);
    setTimeout(function() {
        removeWrong(cardTwoElement);
        flipDown(cardTwoElement);
    }, 250);
    setTimeout(resetElementPointer, 300);
}

function starSetter() {
    if (moves >= 10 && moves <= 15) {
        starsList[2].className = halfStar;
        stars = 2.5;
    } else if (moves >= 16 && moves <= 20) {
        starsList[2].className = emptyStar;
        stars = 2;
    } else if (moves >= 21 && moves <= 24) {
        starsList[1].className = halfStar;
        stars = 1.5;
    } else if (moves >= 25 && moves <= 28) {
        starsList[1].className = emptyStar;
        stars = 1;
    } else if (moves >= 29) {
        starsList[0].className = halfStar;
        stars = 0.5;
    }
}

function winMessage() {
    moveHolder.textContent = moves;
    starHolder.textContent = stars;
    secondsContainer.textContent = seconds;

    winContainer.classList.add('win-screen');

    deck.removeEventListener('click', cardClickHandler);
}

function hideWin() {
    winContainer.classList.remove('win-screen');
}

function flipUp(element) {
    element.classList.add('flipped');
}

function flipDown(element) {
    element.classList.remove('flipped');
}

function correct(el) {
    el.classList.add('correct');
}

function removeCorrect(el) {
    el.classList.remove('correct');
}

function wrong(el) {
    el.classList.add('wrong');
}

function removeWrong(el) {
    el.classList.remove('wrong');
}

function disableClick(el) {
    el.classList.add('cant-click-this');
}

function enableClick(el) {
    console.log('clicks enabled')
    el.classList.remove('cant-click-this');
}

function updateUI() {
    movesContainer.textContent = moves;
}

function resetUI() {
    movesContainer.textContent = moves;
    starsList.forEach(function(el) {
        el.className = fullSar;
    });
    timerContainer.textContent = "";
}

function resetElementPointer() {
    cardOneElement = null;
    cardTwoElement = null;
    enableClick(deck)
}