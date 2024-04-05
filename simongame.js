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
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId); //If power is turned off it will clear interval
    }
});

startButton.addEventListener('click', (event) =>{
if(on || win) {
    play();
}
});

function play() { 
    //Resetting variables (If the game has been played before)
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {  
                                    //The board has 4 quadrants, loop fills order[]; up with random series of 
                                    //numbers to indicate the order they are gonna light up in the game
      order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
  
    intervalId = setInterval(gameTurn, 800);    //run gameturn function every 800 milliseconds, makes the computer
                                                //flashes a light every 800 milliseconds
                                                //keeps repeating until intervalId is cleared
                                                //It will clear after all lights have flashed
  }

  function gameTurn(){
    on = false; // When on is false, the player cant click the colors
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true; //The player can hit the colors 
      }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one(); //ORder is array, flash is no of time we flashed a color (starts at 0)
                                        // if the first item in array is 1, it will run the one(); function
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;    //Incremented, starts a 0 and goes up one every time computer flashes
                        //Happens after 200 milliseconds
        }, 200); //Waits 200 milliseconds and then perfom whats inside the arrowfunction of timeout
    }
  }

  function one() {
    if (noise) {
      let audio = document.getElementById("clip1");
      audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
  }
  
  function two() {
    if (noise) {
      let audio = document.getElementById("clip2");
      audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
  }
  
  function three() {
    if (noise) {
      let audio = document.getElementById("clip3");
      audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
  }
  
  function four() {
    if (noise) {
      let audio = document.getElementById("clip4");
      audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
  }

  function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
  }
  
  function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
  }

  
  topLeft.addEventListener('click', (event) => { // Event listener for clicking on the top left quadrant
    if (on) { // If the game is turned on
      playerOrder.push(1); // Add 1 to the playerOrder array to record the player's choice
      check(); // Check if the player's choice is correct
      one(); // Light up the top left quadrant
      if(!win) { // If the player hasn't won
        setTimeout(() => { // Wait 300 milliseconds before executing the next action
          clearColor(); // Clear all flashing lights
        }, 300); // Wait 300 milliseconds before executing the next action
      }
    }
  })

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() { //Checks if the playerOrder is correct, comparing to the array order[];
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 20 && good) { //The player must complete 20 rounds to win
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn; //if player hits the wrong color, the turncounter goes back to showin
                                    //which turn the player is at and shows the order again
      clearColor();

      if (strict) { //If strict is enabled, the player loses if he hits the wrong color
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}





