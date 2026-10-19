const playBtn = document.querySelector("#play-btn");
const homePage = document.querySelector(".home-page");
const gameScreen = document.querySelector("#game-screen");
const easyBtn = document.querySelector("#easy-btn");
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

let timeLeft = 10;
let countdown;
let memorizeTimeout;
let resuleTimeout;
let score = 0;
let totalScore = 0;
const playerToppings = ["", "", ""];

playBtn.addEventListener("click", () => {
    timeLeft = 10;
    timer.textContent = timeLeft;
    score = 0;
    chosenTopping = null;
    generatePizza();
    playerToppings[0] = "";
    playerToppings[1] = "";
    playerToppings[2] = "";
    playerPosition1.textContent = "";
    playerPosition2.textContent = "";
    playerPosition3.textContent = "";
    homePage.style.display = 'none';
    gameScreen.style.display = 'block';
    gameScreen.hidden = false;
    referencePizza.hidden = false;
    playerPizza.hidden = true;
    resultScreen.hidden = true;
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

});

console.log(playerPizza);


const toppings = ["🍅", "🍄", "🧅", "🥓", "🍗", "🥦"];
let selectedToppings = [];
function generatePizza() {
    selectedToppings = [];
    for (let i = 0; i < 3; i++) {

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
}

console.log(selectedToppings);


const position1 = document.querySelector("#position-1");
const position2 = document.querySelector("#position-2");
const position3 = document.querySelector("#position-3");


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

finishBtn.addEventListener("click", () => {

    endRound();

});

function calculateScore() {

    score = 0;

    const remainingOriginal = [...selectedToppings];
    const remainingPlayer = [...playerToppings];

    for (let i = 0; i < 3; i++) {

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
    clearInterval(resuleTimeout);
    clearInterval(countdown);

    gameScreen.hidden = true;
    homePage.hidden = false;

    gameScreen.style.display = "none";
    homePage.style.display = "flex";
    winSreen.style.display = 'none';

});

function startNewRound() {

    timeLeft = 10;
    timer.textContent = timeLeft;

    chosenTopping = null;
    generatePizza();

    playerToppings[0] = "";
    playerToppings[1] = "";
    playerToppings[2] = "";

    playerPosition1.textContent = "";
    playerPosition2.textContent = "";
    playerPosition3.textContent = "";

    resultScreen.hidden = true;
    playerPizza.hidden = true;
    referencePizza.hidden = false;

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

}

function endRound() {

    clearInterval(countdown);
    calculateScore();

    referencePizza.hidden = false;
    playerPizza.hidden = false;

    resuleTimeout = setTimeout(() => {
        if (totalScore >= 10) {
            showWinScreen();
        } else {
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
    referencePizza.hidden =true;
    resultScreen.hidden = true;
    playerPizza.hidden = true;
    winSreen.hidden = true;

    loseScore.textContent = totalScore;
    loseSreen.hidden = false;

}

