let cardValueArr = ['&#36;', '&#163;', '&#8364;', '&#165;', '&#8377;', '&#8381;'];
let flippedCardCount = 0;
let fadedCardsCount = 0;
let flippedCards = [];
let scoreArr = [];
let gameMode = 0;

function spawnCards(row, col) {
    let stopwatchContainer = document.getElementById('timeScore');
    stopwatchContainer.innerHTML = 'Your Time:';
    let stopwatch = new Stopwatch(stopwatchContainer);
    stopwatch.start();
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    cardContainer.style.width = 13 * col + 'rem';
    let tempCardArr = [];
    let tempIter = 0;
    for (let i = 0; i < row * col / 2; i++) {
        if (tempIter > cardValueArr.length - 1) tempIter = 0;
        tempCardArr.push(cardValueArr[tempIter]);
        tempCardArr.push(cardValueArr[tempIter]);
        tempIter++;
    }
    shuffle(tempCardArr);
    for (let i = 0; i < tempCardArr.length; i++) {
        let tempCard = document.createElement('DIV');
        tempCard.className = 'card flipped';
        tempCard.id = `${i}-card`;
        tempCard.value = 'not-flipped';
        tempCard.onclick = function () {
            tempCard.classList.toggle('flipped');
            contest(this.id, row * col, stopwatch);
        };
        tempCard.innerHTML = `<figure class="front">${tempCardArr[i]}</figure>`
            + `<figure class="back">&#160;</figure>`;
        cardContainer.appendChild(tempCard);
    }
}

function contest(contestantId, count, stopwatch) {
    console.log(fadedCardsCount);
    let currentlyFlippedCard = document.getElementById(contestantId);
    currentlyFlippedCard.onclick = null;
    flippedCardCount++;
    flippedCards.push(contestantId);
    if (flippedCardCount >= 2) {
        let allCards = document.getElementsByClassName('card');
        disableCardClicks(allCards);
        let firstCardContent = document.getElementById(`${flippedCards[0]}`);
        let secondCardContent = document.getElementById(`${flippedCards[1]}`);
        setTimeout(function () {
            if (firstCardContent.innerText === secondCardContent.innerText) {
                fadeOut(firstCardContent);
                fadeOut(secondCardContent);
                enableAllCards(allCards, count, stopwatch);
                fadedCardsCount = fadedCardsCount + 2;
            } else {
                firstCardContent.classList.toggle('flipped');
                secondCardContent.classList.toggle('flipped');
                enableAllCards(allCards, count, stopwatch);
            }
            if (fadedCardsCount >= Math.floor(count)) {
                payrollScore(stopwatch.stop());
                fadedCardsCount=0;
            }
        }, 1000);
        flippedCardCount = 0;
        flippedCards = [];
    }

    currentlyFlippedCard.onclick = function () {
        currentlyFlippedCard.classList.toggle('flipped');
        contest(this.id, count, stopwatch);
    };
}

function fadeOut(element) {
    let fadeEffect = setInterval(function () {
        if (!element.style.opacity) {
            element.style.opacity = '1';
        }
        if (element.style.opacity < 0.01) {
            element.innerHTML = '<figure>&#160;</figure>';
            clearInterval(fadeEffect);
        } else {
            element.style.opacity -= '0.01';
        }
    }, 10);
}

function disableCardClicks(allCards) {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].onclick = null;
    }
}

function enableAllCards(allCards, count, stopwatch) {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].onclick = function () {
            allCards[i].classList.toggle('flipped');
            contest(this.id, count, stopwatch);
        };
    }
}

function payrollScore(time) {
    let allScores = [];
    if (!!localStorage.scoreAll) {
        allScores = JSON.parse(localStorage.scoreAll);
    }
    let currentScore = new Score(JSON.parse(localStorage.user), gameMode, time);
    let tempCurrUserScoreOutput=document.createElement('P');
    tempCurrUserScoreOutput.innerText=`Your Score: ${Math.floor(gameMode /time * 1000)}`;
    document.getElementById('timeScore').appendChild(tempCurrUserScoreOutput);
    allScores.push(currentScore);
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    let tempLength=10;
    if(allScores.length<10){
        tempLength=allScores.length;
    }
    allScores.sort((a, b) => {
        return Math.floor(b.gameMode / b.time * 1000) - Math.floor(a.gameMode / a.time * 1000);
    });
    for (let i = 0; i < tempLength; i++) {
        let tempContent = document.createElement('H3');
        tempContent.innerText = `${i + 1}. ${allScores[i].user.firstName} ${allScores[i].user.lastName} ${allScores[i].user.email} ${Math.floor((allScores[i].gameMode / allScores[i].time) * 1000)} `;
        cardContainer.appendChild(tempContent);
    }
    localStorage.scoreAll = JSON.stringify(allScores);
}