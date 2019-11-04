////////////// DECLARATIONS OF FREQUENT USED VARIABLES
///// GAME BUTTONS
let newGame = document.querySelector(".btn-new");
let rollDIce = document.querySelector(".btn-roll");
let hold = document.querySelector(".btn-hold");

///// GAME INPUTS
let winLimitInput = document.querySelector(".inputWin");
winLimitInput.value = "";

///// PLAYERS SCORE DATA
let player_0_panel = document.querySelector(".player-0-panel");
let player_1_panel = document.querySelector(".player-1-panel");
let player1_g_score = document.querySelector(".pl-gsc-1");
let player2_g_score = document.querySelector(".pl-gsc-2");
let player1_score = document.querySelector(".pl-sc-1");
let player2_score = document.querySelector(".pl-sc-2");

///// DICE OBJECTS
let dice = document.querySelector("#dice");
let dice2 = document.querySelector("#dice2");

////////////// NUMBER RANDOMIZER(1-6) FUNCTION
let randomNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

////////////// HELPING DEFAULT VALUES VARIABLES
var buttonKey = true;
var compVar = true;
var winLimit = Number(winLimitInput.value) || 50;

////////////// OPEN GAME RULES FUNCTION
document.querySelector(".gameRules").onclick = function() {
  let gameRules = document.querySelector(".gameRules");
  if (gameRules.innerHTML == "Game rules") {
    document.querySelector(".flip-card-inner").classList.toggle("flip");
    gameRules.innerHTML = "Back to the Game";
  } else {
    document.querySelector(".flip-card-inner").classList.toggle("flip");
    gameRules.innerHTML = "Game rules";
  }
};

/////////////// GAME SWITCH CONTROLLERS

///// SWITCH BETWEEN PLAYING THE GAME WITCH MOUSE CLICK OR KEYBOARD PRESS

// INVOKING THE MAIN FUNCTION AT THE BEGINNING
switch_Click_Press();

// CLICK EVENT ON THE SWITCH
document
  .querySelector(".switchContainer")
  .addEventListener("click", function(event) {
    switch_Click_Press();
  });

// THE MAIN FUNCTION
function switch_Click_Press() {
  if (buttonKey == true) {
    let body = document.querySelector("body");
    document.querySelector(".switch").style.transform = "translateX(0px)";
    document.querySelector("#mouse").classList.toggle("bold");
    document.querySelector("#keyboard").classList.toggle("bold");
    document.querySelector("body").onkeydown = null;
    document.querySelector("body").onkeyup = null;
    document.querySelector("html").onkeyup = null;
    rollDIce.onclick = diceRolling;
    hold.onclick = holdPress;
    newGame.onclick = Reload;
    buttonKey = false;
    return buttonKey;
  } else if (buttonKey == false) {
    document.querySelector(".switch").style.transform = "translateX(27.5px)";
    document.querySelector("#mouse").classList.toggle("bold");
    document.querySelector("#keyboard").classList.toggle("bold");
    rollDIce.onclick = null;
    hold.onclick = null;
    newGame.onclick = null;
    document.querySelector("body").onkeydown = forReload;
    document.querySelector("body").onkeyup = forHoldPress;
    document.querySelector("html").onkeyup = forDiceRolling;
    buttonKey = true;
    return buttonKey;
  }
}

///// SWITCH BETWEEN PLAYER_1 VS PLAYER_2 MODE AND PLAYER_1 VS COMPUTER MODE

// INVOKING THE MAIN FUNCTION AT THE BEGINNING
switchPlayer_Computer();

// CLICK EVENT ON THE SWITCH
document
  .querySelector(".switchContainer2")
  .addEventListener("click", function(event) {
    switchPlayer_Computer();
  });

// THE MAIN FUNCTION
function switchPlayer_Computer() {
  if (compVar == true) {
    document.querySelector(".switch2").style.transform = "translateX(0px)";
    document.querySelector("#playerGame").classList.toggle("bold");
    document.querySelector("#computerGame").classList.toggle("bold");
    document.querySelector(".pl-n-2").innerHTML = "Player 2";
    compVar = false;
    return compVar;
  } else if (compVar == false) {
    document.querySelector(".switch2").style.transform = "translateX(27.5px)";
    document.querySelector("#playerGame").classList.toggle("bold");
    document.querySelector("#computerGame").classList.toggle("bold");
    document.querySelector(".pl-n-2").innerHTML = "Computer";
    player1_score.innerHTML = 0;
    player2_score.innerHTML = 0;
    player1_g_score.innerHTML = 0;
    player2_g_score.innerHTML = 0;
    player_0_panel.classList.add("active");
    player_1_panel.classList.remove("active");
    compVar = true;
    return compVar;
  }
}

////////////// HELPING FUNCTIONS FOR ADDING ONKEYPRESS EVENTS FOR  NEW GAME--ROLL THE DICE--HOLD FUNCTIONS

function forDiceRolling(event) {
  event.preventDefault();
  if (event.code == "Space") {
    diceRolling();
  }
}

function forHoldPress(event) {
  if (event.code == "KeyS") {
    holdPress();
  }
}

function forReload(event) {
  if (event.code == "KeyN") {
    Reload();
  }
}

////////////// THE PROCESS OF DICE ROLLING INCLUDING ALL HELPING FUNCTIONS

///// FIRST DICE ROLLING FUNCTION THAT CONTAINS ALL THE CONDITIONS IN WHICH THE DICES SHOULD ROLL
function diceRolling() {
  var winLimit = Number(winLimitInput.value) || 50;
  rollDIce.blur();
  if (
    player1_g_score.innerHTML > winLimit ||
    player2_g_score.innerHTML > winLimit
  ) {
  } else {
    if (player_0_panel.classList.contains("active")) {
      rolling(player1_score, player1_g_score);
    } else {
      if (compVar == true) {
        rollDIce.onclick = null;
        hold.onclick = null;
        newGame.onclick = null;
        document.querySelector("body").onkeydown = null;
        document.querySelector("body").onkeyup = null;
        document.querySelector("html").onkeyup = null;
      } else {
      }
      rolling(player2_score, player2_g_score);
    }
  }
}

///// THE ACTUAL ROLLING DICE FUNCTION THAT IS ACTIVATED
///// WHEN THE PREVIOUS FUNCTION DECIDES UNDER WHAT CONDITIONS THE DICE SHOULD BE ROLLED
function rolling(x, y) {
  dice.style.display = "block";
  dice2.style.display = "block";
  let nr = randomNumber();
  let nr2 = randomNumber();
  animate(nr, dice);
  animate(nr2, dice2);
  if (nr !== 1 && nr2 !== 1) {
    setTimeout(function() {
      x.innerHTML = Number(x.innerHTML) + nr + nr2;
    }, 500);
    setTimeout(function() {
      comp();
    }, 500);
  } else if (nr == 1 && nr2 == 1) {
    y.innerHTML = 0;
    resetScore();
    setTimeout(function() {
      comp();
    }, 500);
  } else {
    resetScore();
    setTimeout(function() {
      comp();
    }, 500);
  }
}

///// THE DICE ROLLING 3D ANIMATION THAT IS CALLED IN THE PREVIOUS ROLLING FUNCTION;
function animate(num, x) {
  if (num == 1) {
    x.style.transform = "rotateY(360deg)";
    x.style["-webkit-transform"] = "rotateY(360deg)";
  }
  if (num == 2) {
    x.style.transform = "rotateY(-90deg)";
    x.style["-webkit-transform"] = "rotateY(-90deg)";
  }
  if (num == 3) {
    x.style.transform = "rotateY(180deg)";
    x.style["-webkit-transform"] = "rotateY(180deg)";
  }
  if (num == 4) {
    x.style.transform = "rotateY(90deg)";
    x.style["-webkit-transform"] = "rotateY(90deg)";
  }
  if (num == 5) {
    x.style.transform = "rotateX(-90deg)";
    x.style["-webkit-transform"] = "rotateX(-90deg)";
  }
  if (num == 6) {
    x.style.transform = "rotateX(90deg)";
    x.style["-webkit-transform"] = "rotateX(90deg)";
  }
}

///// DICE ROLLING HELPING FUNCTION THAT RESETS THE SCORE WHEN SWITCHING FROM ONE PLAYER TO ANOTHER TOGGLING ACTIVE CLASS
function resetScore() {
  if (buttonKey == false) {
    rollDIce.onclick = diceRolling;
    hold.onclick = holdPress;
    newGame.onclick = Reload;
  } else if (buttonKey == true) {
    document.querySelector("body").onkeydown = forReload;
    document.querySelector("body").onkeyup = forHoldPress;
    document.querySelector("html").onkeyup = forDiceRolling;
  }
  player_0_panel.classList.toggle("active");
  player_1_panel.classList.toggle("active");
  player1_score.innerHTML = 0;
  player2_score.innerHTML = 0;
}

///////////// THE FUNCTION THAT IS SIMULATING THE COMPUTER IN THE PLAYER_1 VS COMPUTER MODE
function comp() {
  if (compVar == true) {
    if (player_1_panel.classList.contains("active")) {
      if (
        Number(player2_g_score.innerHTML) + Number(player2_score.innerHTML) >
        winLimit
      ) {
        setTimeout(function() {
          holdPress();
        }, 1000);
      } else if (
        (player2_score.innerHTML < 10 && player1_g_score.innerHTML < 20) ||
        (player2_score.innerHTML < 18 &&
          player1_g_score.innerHTML < 30 &&
          player1_g_score.innerHTML >= 20) ||
        (player1_g_score.innerHTML >= 30 && player2_score.innerHTML < 24)
      ) {
        setTimeout(function() {
          diceRolling();
        }, 1000);
      } else {
        setTimeout(function() {
          holdPress();
        }, 1000);
      }
    }
  } else {
  }
}

///////////// THE FUNCTION THAT VERIFIES CONSTANTLY THE SCORE AND ANNOUNCES THE WINNER WHEN THE WINNING LIMIT IS REACHED
function verifyScore() {
  var winLimit = Number(winLimitInput.value) || 50;
  if (
    Number(player1_g_score.innerHTML) > Number(player2_g_score.innerHTML) &&
    Number(player1_g_score.innerHTML) > winLimit
  ) {
    document.querySelector(".pl-n-1").innerHTML = "WINNER";
    document.querySelector(".pl-n-1").style.fontWeight = "500";
    player1_g_score.style.fontWeight = "500";
    document.querySelector("#view").style.display = "none";
    document.querySelector("#view2").style.display = "none";
    player_0_panel.classList.add("winnerClass");
    player1_g_score.classList.add("pulse");
  }
  if (
    Number(player2_g_score.innerHTML) > Number(player1_g_score.innerHTML) &&
    Number(player2_g_score.innerHTML) > winLimit
  ) {
    document.querySelector(".pl-n-2").innerHTML = "WINNER";
    document.querySelector(".pl-n-2").style.fontWeight = "500";
    player2_g_score.style.fontWeight = "500";
    document.querySelector("#view").style.display = "none";
    document.querySelector("#view2").style.display = "none";
    player_1_panel.classList.add("winnerClass");
    player2_g_score.classList.add("pulse");
  }
  // resetScore();
}

////////////// THE HOLD FUNCTION THAT IS SAVING THE LOCAL SCORE TO GLOBAL SCORE
function holdPress() {
  hold.blur();
  if (player_0_panel.classList.contains("active")) {
    player1_g_score.innerHTML =
      Number(player1_g_score.innerHTML) + Number(player1_score.innerHTML);
    setTimeout(function() {
      comp();
    }, 1000);
  } else if (player_1_panel.classList.contains("active")) {
    player2_g_score.innerHTML =
      Number(player2_g_score.innerHTML) + Number(player2_score.innerHTML);
  }
  resetScore();
  verifyScore();
}

////////////// THE NEW GAME FUNCTION THAT RELOADS THE PAGE TO START A NEW GAME
//(IT WAS EASIER TO RELOAD THE PAGE IN THIS PARTICULAR SITUATION THEN REMOVING ALL APPLIED STYLING :) )
function Reload() {
  newGame.blur();
  winLimitInput.value = null;
  location.reload();
}
