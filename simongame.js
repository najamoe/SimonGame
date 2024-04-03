"use Strict";

let order = []; //Limited scope, only applied to where it is defined - keeps track on the order of the lights flash
let playerOrder = []; //Order of the players pressing
let flash; //Integer of numbers of flashes in game
let turn; // Keeps track of which turn the game is on 
let good; //True or false, whether the player hits the right colors
let compTurn; //boolean, keep track of its the computer or players turn
let intervalId; // 
let strict = false; //check if strict button is enabled
let noise = true; 
let on = false; //If programme has been turned on (start turned off)
let win; 

//#css selector for all html-elements we interact with
const turnCounter = document.querySelector("#turn"); 
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
})

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
    }
})




