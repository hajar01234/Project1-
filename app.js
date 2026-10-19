const playBtn = document.querySelector("#play-btn");
const homePage = document.querySelector(".home-page");
const gameScreen = document.querySelector("#game-screen");
const easyBtn = document.querySelector("#easy-btn");
const mediumBtn = document.querySelector("#medium-btn");
const hardBtn = document.querySelector("#hard-btn");
const referencePizza = document.querySelector("#reference-pizza");
const playerPizza = document.querySelector("#player-pizza");
const toppingsOptions = document.querySelector("#toppings-options");
const timer = document.querySelector("#timer");
const finishBtn = document.querySelector("#finish-btn");
const resultScreen = document.querySelector("#result-screen");
const scoreDisplay = document.querySelector("#score-display");
const totalScoreDisplay = document.querySelector("#total-score-display");
const exitBtn = document.querySelector("#exit-but")
const winSreen = document.querySelector("#win-screen")
const finalScore = document.querySelector("#final-score")
const loseSreen = document.querySelector("#lose-screen")
const loseScore = document.querySelector("#lose-score")
const memorizeTimer = document.querySelector("#memorize-timer");
const resultTimer = document.querySelector("#result-timer");
const levelScreen = document.querySelector("#level-screen");

let timeLeft = 10;
let countdown;
let memorizeTimeout;
let memorizeCountdown;
let resultCountdown;
let resuleTimeout;
let score = 0;
let totalScore = 0;
let roundFinished = false;
let currentRound = 1;
let currentLevel = 1;
let numberOfToppings = 3;
const playerToppings = ["", "", "", "", ""];

function startGame() {
    timeLeft = 10;
    timer.textContent = timeLeft;
    score = 0;
    totalScore = 0;
    currentRound = 1;

    winSreen.hidden = true;
    loseScore.hidden = false;
    resultScreen.hidden = true;
    memorizeTimer.parentElement.hidden = false;
    chosenTopping = null;
    generatePizza();
    playerToppings[0] = "";
    playerToppings[1] = "";
    playerToppings[2] = "";
    playerToppings[3] = "";
    playerToppings[4] = "";
    playerPosition1.textContent = "";
    playerPosition2.textContent = "";
    playerPosition3.textContent = "";
    playerPosition4.textContent = "";
    playerPosition5.textContent = "";
    homePage.style.display = 'none';
    gameScreen.style.display = 'block';
    gameScreen.hidden = false;
    referencePizza.hidden = false;
    playerPizza.hidden = true;
    resultScreen.hidden = true;
    let memorizeTimeLeft = 3;
    clearInterval(memorizeCountdown);
    memorizeTimer.textContent = memorizeTimeLeft;

    memorizeCountdown = setInterval(() => {
        memorizeTimeLeft--;
        memorizeTimer.textContent = memorizeTimeLeft;
        if (memorizeTimeLeft <= 0) {
            clearInterval(memorizeCountdown);
        }
    }, 1000);
    memorizeTimeout = setTimeout(() => {
        referencePizza.hidden = true;
        playerPizza.hidden = false;
        countdown = setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft === 0) {
                endRound();

            }

        }, 1000);

    }, 3000);

    playBtn.addEventListener("click", () => {

    homePage.style.display = "none";

    levelScreen.classList.remove("hidden");
    levelScreen.hidden = false;
    levelScreen.style.display = "block";

});

}

console.log(playerPizza);


const toppings = ["🍅", "🍄", "🧅", "🥓", "🍗", "🥦"];
let selectedToppings = [];
function generatePizza() {
    selectedToppings = [];
    for (let i = 0; i < numberOfToppings; i++) {

        const randomIndex = Math.floor(Math.random() * toppings.length);

        const randomTopping = toppings[randomIndex];

        if (selectedToppings.filter(topping => topping === randomTopping).length < 2) {

            selectedToppings.push(randomTopping);

        } else {

            i--;

        }

    }

    position1.textContent = selectedToppings[0];
    position2.textContent = selectedToppings[1];
    position3.textContent = selectedToppings[2];
    position4.textContent = selectedToppings[3] || "";
    position5.textContent = selectedToppings[4] || "";
}

console.log(selectedToppings);


const position1 = document.querySelector("#position-1");
const position2 = document.querySelector("#position-2");
const position3 = document.querySelector("#position-3");
const position4 = document.querySelector("#position-4");
const position5 = document.querySelector("#position-5");


let chosenTopping = null;

toppings.forEach((topping) => {

    const button = document.createElement("button");

    button.textContent = topping;

    button.addEventListener("click", () => {

        chosenTopping = topping;

        console.log("Chosen topping:", chosenTopping);

    });

    toppingsOptions.appendChild(button);

});


const playerPosition1 = document.querySelector("#player-position-1");
playerPosition1.addEventListener("click", () => {

    playerPosition1.textContent = chosenTopping;

    playerToppings[0] = chosenTopping;

});


const playerPosition2 = document.querySelector("#player-position-2");
playerPosition2.addEventListener("click", () => {

    playerPosition2.textContent = chosenTopping;

    playerToppings[1] = chosenTopping;

});


const playerPosition3 = document.querySelector("#player-position-3");
playerPosition3.addEventListener("click", () => {

    playerPosition3.textContent = chosenTopping;

    playerToppings[2] = chosenTopping;

});

const playerPosition4 = document.querySelector("#player-position-4");
playerPosition4.addEventListener("click", () => {
    if (chosenTopping === null) return;

    playerPosition4.textContent = chosenTopping;
    playerToppings[3] = chosenTopping;
});

const playerPosition5 = document.querySelector("#player-position-5");
playerPosition5.addEventListener("click", () => {
    if (chosenTopping === null) return;

    playerPosition5.textContent = chosenTopping;
    playerToppings[4] = chosenTopping;
});


finishBtn.addEventListener("click", () => {

    endRound();

});

function calculateScore() {

    score = 0;

    const remainingOriginal = [...selectedToppings];
    const remainingPlayer = [...playerToppings];

    for (let i = 0; i < numberOfToppings; i++) {

        if (playerToppings[i] !== "" && playerToppings[i] === selectedToppings[i]) {

            score = score + 2;

            remainingOriginal[i] = null;
            remainingPlayer[i] = null;
        }
    }

    for (let i = 0; i < 3; i++) {

        if (remainingPlayer[i] !== null && remainingPlayer[i] !== "") {

            const index = remainingOriginal.indexOf(remainingPlayer[i]);

            if (index !== -1) {
                score = score + 1;
                remainingOriginal[index] = null;
            }

        }
    }

    totalScore = totalScore + score;
    console.log("Total Score:" + totalScore);
    console.log("Round Score:" + score);
    scoreDisplay.textContent = score;
    totalScoreDisplay.textContent = totalScore;
    resultScreen.hidden = false;

    referencePizza.hidden = false;
    playerPizza.hidden = false;


}

exitBtn.addEventListener("click", () => {

    clearTimeout(memorizeTimeout);
    clearTimeout(resuleTimeout);
    clearInterval(countdown);
    clearInterval(memorizeCountdown);
    clearInterval(resultCountdown);

    gameScreen.hidden = true;
    homePage.hidden = false;

    gameScreen.style.display = "none";
    homePage.style.display = "flex";
    //winSreen.style.display = 'none';
    winSreen.hidden = true;
    loseSreen.hidden = true;
    resultScreen.hidden = true;

});

function startNewRound() {
    roundFinished = false;

    timeLeft = 10;
    timer.textContent = timeLeft;

    chosenTopping = null;
    updateToppingPositions();
    generatePizza();

    playerToppings[0] = "";
    playerToppings[1] = "";
    playerToppings[2] = "";
    playerToppings[3] = "";
    playerToppings[4] = "";

    playerPosition1.textContent = "";
    playerPosition2.textContent = "";
    playerPosition3.textContent = "";
    playerPosition4.textContent = "";
    playerPosition5.textContent = "";

    resultScreen.hidden = true;
    playerPizza.hidden = true;
    referencePizza.hidden = false;
    memorizeTimer.parentElement.hidden = false;
    let memorizeTimeLeft = 3;
    memorizeTimer.textContent = memorizeTimeLeft;

    memorizeCountdown = setInterval(() => {
        memorizeTimeLeft--;
        memorizeTimer.textContent = memorizeTimeLeft;
    }, 1000);

    memorizeTimeout = setTimeout(() => {
        clearInterval(memorizeCountdown);

        referencePizza.hidden = true;
        playerPizza.hidden = false;

        countdown = setInterval(() => {

            timeLeft--;
            console.log("Time Left:", timeLeft);

            timer.textContent = timeLeft;

            if (timeLeft === 0) {
                endRound();
            }

        }, 1000);

    }, 3000);

}

function endRound() {
    if (roundFinished) return;
    roundFinished = true;

    clearInterval(countdown);
    calculateScore();

    referencePizza.hidden = false;
    playerPizza.hidden = false;
    memorizeTimer.parentElement.hidden = true;
    let resultTimeLeft = 10;
    resultTimer.textContent = resultTimeLeft;

    resultCountdown = setInterval(() => {
        resultTimeLeft--;
        resultTimer.textContent = resultTimeLeft;
    }, 1000);

    resuleTimeout = setTimeout(() => {
        clearInterval(resultCountdown);
        if (totalScore >= 10) {
            showWinScreen();
        } else if ((currentRound === 1 && totalScore <= 3) ||
            (currentRound === 2 && totalScore <= 5) ||
            (currentRound === 3 && totalScore <= 7) ||
            (currentRound === 4 && totalScore <= 9)
        ) {

            showLoseScreen();

        } else {
            currentRound++;
            startNewRound();
        }
    }, 5000);
}

function showWinScreen() {
    referencePizza.hidden = true;
    playerPizza.hidden = true;
    resultScreen.hidden = true;

    finalScore.textContent = totalScore;
    winSreen.hidden = false;

}

function showLoseScreen() {
    referencePizza.hidden = true;
    resultScreen.hidden = true;
    playerPizza.hidden = true;
    winSreen.hidden = true;

    loseScore.textContent = totalScore;
    loseSreen.hidden = false;

}

function updateToppingPositions() {

    const referencePositions = [
        position1, position2, position3, position4, position5
    ];

    const playerPositions = [
        playerPosition1, playerPosition2, playerPosition3,
        playerPosition4, playerPosition5
    ];

    for (let i = 0; i < 5; i++) {

        referencePositions[i].hidden = i >= numberOfToppings;

        playerPositions[i].hidden = i >= numberOfToppings;
    }
}

easyBtn.addEventListener("click", () => {
    currentLevel = 1;
    numberOfToppings = 3;
});

mediumBtn.addEventListener("click", () => {
    currentLevel = 2;
    numberOfToppings = 4;
});

hardBtn.addEventListener("click", () => {
    currentLevel = 3;
    numberOfToppings = 5;
});