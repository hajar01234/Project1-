const playBtn = document.querySelector("#play-btn");
const homePage = document.querySelector(".home-page");
const gameScreen = document.querySelector("#game-screen");
const easyBtn = document.querySelector("#easy-btn");
const referencePizza = document.querySelector("#reference-pizza");
const playerPizza = document.querySelector("#player-pizza");
const toppingsOptions = document.querySelector("#toppings-options");

const timer = document.querySelector("#timer");
let timeLeft = 8;


// Play Button
playBtn.addEventListener("click", () => {

    homePage.hidden = true;
    gameScreen.hidden = false;

    setTimeout(() => {

        referencePizza.hidden = true;
        playerPizza.hidden = false;

        const countdown = setInterval(() => {

            timeLeft--;

            timer.textContent = timeLeft;

            if (timeLeft === 0) {

                clearInterval(countdown);

                referencePizza.hidden = false;
                playerPizza.hidden = true;

            }

        }, 1000);

    }, 3000);

});

console.log(playerPizza);


// Available Toppings
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


// Reference Pizza Positions
const position1 = document.querySelector("#position-1");
position1.textContent = selectedToppings[0];

const position2 = document.querySelector("#position-2");
position2.textContent = selectedToppings[1];

const position3 = document.querySelector("#position-3");
position3.textContent = selectedToppings[2];


// Player Topping Selection
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


// Player Pizza Position 1
const playerPosition1 = document.querySelector("#player-position-1");

playerPosition1.addEventListener("click", () => {

    playerPosition1.textContent = chosenTopping;

});


// Player Pizza Position 2
const playerPosition2 = document.querySelector("#player-position-2");

playerPosition2.addEventListener("click", () => {

    playerPosition2.textContent = chosenTopping;

});


// Player Pizza Position 3
const playerPosition3 = document.querySelector("#player-position-3");

playerPosition3.addEventListener("click", () => {

    playerPosition3.textContent = chosenTopping;

});


// For Later
//let selectedLevel =null;

//easyBtn.addEventListener("click", () => {

    //selectedLevel = "easy";

    //console.log(selectedLevel);

//});