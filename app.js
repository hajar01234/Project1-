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
const levelTitle = document.querySelector("#level-title");


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
    if (currentLevel == 1) {
        levelTitle.textContent = "Easy Level";
    } else if (currentLevel == 2) {
        levelTitle.textContent = "Medium Level";
    } else {

        levelTitle.textContent = "Hard Level";
    }
    timeLeft = 10;
    timer.textContent = timeLeft;
    score = 0;
    totalScore = 0;
    currentRound = 1;
    roundFinished = false;

    clearInterval(countdown);
    clearInterval(memorizeCountdown);
    clearInterval(resultCountdown);
    clearTimeout(memorizeTimeout);
    clearTimeout(resuleTimeout);

    winSreen.hidden = true;
    loseScore.hidden = false;
    resultScreen.hidden = true;
    memorizeTimer.parentElement.hidden = false;
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
    levelScreen.style.display = "none";
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

    }, 10000);

}

playBtn.addEventListener("click", () => {

    homePage.style.display = "none";

    levelScreen.classList.remove("hidden");
    levelScreen.hidden = false;
    levelScreen.style.display = "block";

});

console.log(playerPizza);


const toppings = ["./img/tomato.PNG", "./img/mushroom.PNG", "./img/onion.PNG", "./img/pepperroni.PNG", "./img/olive.PNG", "./img/bell-pepper.PNG"];

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


    position1.src = selectedToppings[0];
    position2.src = selectedToppings[1];
    position3.src = selectedToppings[2];
    position4.src = selectedToppings[3] || "";
    position5.src = selectedToppings[4] || "";
}

console.log(selectedToppings);


const position1 = document.querySelector("#position-1").children[0];
const position2 = document.querySelector("#position-2").children[0];
const position3 = document.querySelector("#position-3").children[0];
const position4 = document.querySelector("#position-4").children[0];
const position5 = document.querySelector("#position-5").children[0];


let chosenTopping = null;

toppings.forEach((topping) => {

    const button = document.createElement("button");
    const buttonImage = document.createElement('img')
    buttonImage.src = `${topping}`
    buttonImage.classList.add('veggies')
    button.appendChild(buttonImage)

    // button.textContent = topping;

    button.addEventListener("click", () => {

        chosenTopping = topping;

        console.log("Chosen topping:", chosenTopping);

    });

    toppingsOptions.appendChild(button);

});


const playerPosition1 = document.querySelector("#player-position-1");

playerPosition1.addEventListener("click", () => {
    const playerPosition1Image = document.createElement('img')
    playerPosition1Image.src = chosenTopping
    playerPosition1Image.classList.add('position1Image')
    playerPosition1.replaceChildren(playerPosition1Image)
    // playerPosition1Image.src = chosenTopping

    // playerPosition1.textContent = chosenTopping;


    playerToppings[0] = chosenTopping;
    console.log('here')

});


const playerPosition2 = document.querySelector("#player-position-2");
playerPosition2.addEventListener("click", () => {

    const playerPosition2Image = document.createElement('img')
    playerPosition2Image.src = chosenTopping
    playerPosition2Image.classList.add('position2Image')
    playerPosition2.replaceChildren(playerPosition2Image)

    playerPosition2.src = chosenTopping;

    playerToppings[1] = chosenTopping;

});


const playerPosition3 = document.querySelector("#player-position-3");
playerPosition3.addEventListener("click", () => {

    const playerPosition3Image = document.createElement('img')
    playerPosition3Image.src = chosenTopping
    playerPosition3Image.classList.add('position3Image')
    playerPosition3.replaceChildren(playerPosition3Image)

    playerPosition3.src = chosenTopping;

    playerToppings[2] = chosenTopping;

});

const playerPosition4 = document.querySelector("#player-position-4");
playerPosition4.addEventListener("click", () => {
    if (chosenTopping === null) return;
    const playerPosition4Image = document.createElement('img')
    playerPosition4Image.src = chosenTopping
    playerPosition4Image.classList.add('position4Image')
    playerPosition4.replaceChildren(playerPosition4Image)

    playerPosition4.src = chosenTopping;
    playerToppings[3] = chosenTopping;
});

const playerPosition5 = document.querySelector("#player-position-5");
playerPosition5.addEventListener("click", () => {
    if (chosenTopping === null) return;
    const playerPosition5Image = document.createElement('img')
    playerPosition5Image.src = chosenTopping
    playerPosition5Image.classList.add('position5Image')
    playerPosition5.replaceChildren(playerPosition5Image)

    playerPosition5.src = chosenTopping;
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
    }, 10000);
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
    loseScore.hidden = false;
    loseSreen.hidden = false;

}

function updateToppingPositions() {

    const referencePositions = [position1, position2, position3, position4, position5];

    const playerPositions = [playerPosition1, playerPosition2, playerPosition3, playerPosition4, playerPosition5];

    for (let i = 0; i < 5; i++) {
        if (i < numberOfToppings) {
            referencePositions[i].style.display = "block";
            playerPositions[i].style.display = "block";
        } else {
            referencePositions[i].style.display = "none";
            playerPositions[i].style.display = "none";
        }

        // referencePositions[i].style.display = i >= numberOfToppings ? "" : none;
        // playerPositions[i].style.display = i >= numberOfToppings ? "" : none;
    }
}

easyBtn.addEventListener("click", () => {
    currentLevel = 1;
    numberOfToppings = 3;
    startGame();
});

mediumBtn.addEventListener("click", () => {
    currentLevel = 2;
    numberOfToppings = 4;
    startGame();
});

hardBtn.addEventListener("click", () => {
    currentLevel = 3;
    numberOfToppings = 5;
    startGame();
});

