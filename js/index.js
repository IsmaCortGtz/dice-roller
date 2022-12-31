/* ===== Define Service Worker ===== */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js');
}


/* ===== Define HTML elements ===== */

const diceOne = document.getElementById("diceOne");
const diceTwo = document.getElementById("diceTwo");
const diceResult = document.getElementById("dice-result");
const rollButton = document.getElementById("roll-button");
const firstSelect = document.getElementById("first-select");
const secondSelect = document.getElementById("second-select");

const diceScreen = document.getElementById("diceScreen");
const selectScreen = document.getElementById("selectScreen");


/* ===== Define global vars ===== */

var diceNumber = 2;
var firstDice = 1;
var secondDice = 2;
var totalDice = firstDice + secondDice;
var animationMil = 600;


/* ===== Set traductions ===== */

rollButton.innerHTML = getKey("ROLL_BUTTON");
firstSelect.innerHTML = getKey("ONE_DICE");
secondSelect.innerHTML = getKey("TWO_DICES");


/* ===== Define functions ===== */

function goToRoll(number){
  if (number === 1){
    diceTwo.style.display = "none";
    diceNumber = number;
    diceResult.innerHTML = "1";
  }

  selectScreen.style.display = "none";
  diceScreen.style.display = "flex";
}

function getRandomNumber(){
  return rando(1, 6);
}

function roll(){
  firstDice = getRandomNumber();
  secondDice = getRandomNumber();
  rollButton.disabled = true;
  diceResult.innerHTML = "¿?";
  diceOne.setAttribute("value", "0");
  diceTwo.setAttribute("value", "0");

  diceOne.animate({ transform: "rotate(1080deg" }, {duration: animationMil, iterations: 1})
  diceTwo.animate({ transform: "rotate(1080deg" }, {duration: animationMil, iterations: 1})
  setTimeout(() => {
    diceOne.setAttribute("value", firstDice);
    diceTwo.setAttribute("value", secondDice);
    diceResult.innerHTML = totalDice;
    rollButton.disabled = false;
  }, animationMil);

  if (diceNumber === 2){
    totalDice = firstDice + secondDice;
  }else if (diceNumber === 1){
    totalDice = firstDice;
  }
}