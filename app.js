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

let timeLeft = 10;
let countdown;
let score = 0;
const playerToppings = ["", "", ""];

playBtn.addEventListener("click", () => {

    homePage.hidden = true;
    gameScreen.hidden = false;

    setTimeout(() => {

        referencePizza.hidden = true;
        playerPizza.hidden = false;

        countdown = setInterval(() => {

            timeLeft--;

            timer.textContent = timeLeft;

            if (timeLeft === 0) {

                clearInterval(countdown);

                referencePizza.hidden = false;
                playerPizza.hidden = true;

                calculateScore();

            }

        }, 1000);

    }, 3000);

});

console.log(playerPizza);


const toppings = ["🍅", "🍄", "🧅", "🥓", "🍗", "🥦"];

const selectedToppings = [];

for (let i = 0; i < 3; i++) {

    const randomIndex = Math.floor(Math.random() * toppings.length);

    const randomTopping = toppings[randomIndex];

    if (selectedToppings.filter(topping => topping === randomTopping).length < 2) {

        selectedToppings.push(randomTopping);

    } else {

        i--;

    }

}

console.log(selectedToppings);


const position1 = document.querySelector("#position-1");
position1.textContent = selectedToppings[0];

const position2 = document.querySelector("#position-2");
position2.textContent = selectedToppings[1];

const position3 = document.querySelector("#position-3");
position3.textContent = selectedToppings[2];


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

    clearInterval(countdown);

    referencePizza.hidden = false;
    playerPizza.hidden = true;

    calculateScore();

})

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

    console.log("Score:" + score);
    scoreDisplay.textContent = score;
    resultScreen.hidden = false;

    referencePizza.hidden = false;
    playerPizza.hidden = false;


}





// For Later
//let selectedLevel =null;

//easyBtn.addEventListener("click", () => {

//selectedLevel = "easy";

//console.log(selectedLevel);

//});