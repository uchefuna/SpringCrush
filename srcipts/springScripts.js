

//variables for the Modal
let usrName, keysCycles = 0, usrAttempts = 5;

//variable to get number of cycles to play the game
let gameCycles = 0;

//variable to count number of spring
let springCount = 0;

//variable to count number of spring the player collected
let springCrushed = 0;

//an array used to award prizes when the play reached a certain level
let springRewards = ["Bronze", "Silver", "Gold", "Platinum"];

//getting the elements of the HTML
const gameStart = document.getElementById('playstart');
const springBoxDiv = document.querySelector('.springdivbox1>div');
const springBoxSpan = document.querySelectorAll('.divspan');
const springScreen = document.querySelector('.springdivbox2');
const springDisplayP = document.querySelectorAll('.springdivbox2 p');
const htmlConsole1 = document.querySelectorAll('.displ1');
const htmlConsole2 = document.querySelectorAll('.displ2');
const springScores = document.querySelectorAll('.springinfo');
const modalBox = document.querySelectorAll('.modalbox');
const qml = window.matchMedia("(max-width:1100px)")

//variable used to start and stop the game
let stopSpring = 0;

function checkCurrentHeigth() {
  if (qml.matches) {
    springBoxDiv.style.height = '580px';
    if (stopSpring == 0)
      htmlConsole2[11].innerHTML =
        'Current page height: ' + springBoxDiv.style.height;
  } else {
    springBoxDiv.style.height = 'auto';
    if (stopSpring == 0)
      htmlConsole2[11].innerHTML =
        'Current page height: ' + springScreen.offsetHeight;
  }
}

window.onload = e => {
  gameRulesDisplay1();
  checkCurrentHeigth();
  gameStart.focus();
}

//click functionality of the HTML
window.onclick = event => {
  if (stopSpring == 2)
    clickSameBoxToGainPoints(event);

  if (stopSpring == 3)
    if (event.target == htmlConsole2[10]) {
      reStartGame();
    }

  if (event.target == gameStart) {
    if (stopSpring == 0)
      initProcess();
    else if (stopSpring == 5) {
      modalBoxCall('PlayCycle', 'Enter game cycles');
      divChild.remove();
      stopSpring = 6;
    }
  }

  if (stopSpring == 0 || stopSpring == 6) {
    if (event.target == modalBox[4]) {
      modalBox[1].style.overflowY = "auto";
    }
    else if (event.target == modalBox[6]) {
      htmlConsole1[11].innerHTML = "You cancelled the Modal.";
      modalRmoval(), gameStart.focus();
    }
    else if (event.target == modalBox[5]) {
      if (modalBox[2].textContent === 'Passcode' || modalBox[2].textContent === 'PlayCycle') {
        passCycles(modalBox[3].value);
        modalBox[3].value = '';
      } else if (modalBox[2].textContent === 'Username') {
        usrNameInput(modalBox[3].value);
        modalBox[3].value = '';
      }
    }
  }
}

let divChild; //variable to remove the div child
function prodGhild() {
  setTimeout(e => {
    let fz = '';
    if (qml.matches) {
      fz = 'font-size: 0.9em;';
    } else {
      fz = 'font-size: 1,2em;';
    }
    divChild = document.getElementById('modalcontent').appendChild(document.createElement('div'));
    divChild.style.cssText = 'text-align: center; height: 50px; background-color: #444343;' + fz;

    let paraChild = divChild.appendChild(document.createElement('p'));
    paraChild.innerHTML = 'Passcode: ';
    paraChild.style.cssText = 'color: #fffffffb; font-size: 1.4em; letter-spacing: 2px; margin: 0; padding: 3% 0 0;';

    let spanChild;
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = '2831';
    spanChild.style.cssText = 'color: #ffdb11f8;';
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = ' | ';
    spanChild.style.cssText = 'color: #ff2111f8;';
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = 'Username: ';
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = 'UCHE';
    spanChild.style.cssText = 'color: #ffdb11f8;';
  }, 700);
}

qml.addEventListener('change', () => {
  checkCurrentHeigth();

  if (modalBox[0].style.display === "none") {
    divChild.remove();
  } else if (modalBox[0].style.display === "block") {
    divChild.remove();
    prodGhild();
  }
});

//function to initialize the game
function initProcess() {
  modalBoxCall('Passcode', 'Enter the Passcode');

  // let twowords1 = "Enter the passcode to continue.";
  htmlConsole1[11].innerHTML = "Enter the passcode to continue.";

  htmlConsole2[10].innerHTML = '';
  modalBox[0].animate(
    [
      { top: "-300px", opacity: "0" },
      { top: "0", opacity: "0.5" },
    ],
    {
      duration: 170,
    }
  );
  prodGhild();
}

//function to display game rules/instruction on HTML
function gameRulesDisplay1() {
  htmlConsole2[0].innerHTML = 'Please read the instruction/rules carefully before starting this game.';
  htmlConsole2[0].style.cssText = 'color: #e7d422;font-size: 1.1em;';
  htmlConsole2[1].innerHTML = 'Game Instruction';
  htmlConsole2[1].style.cssText = 'color: #fc1919;font-size: 1.4em;';
  htmlConsole2[2].innerHTML = "Click 'Start Game' to start the game.";
  htmlConsole2[3].innerHTML = "Enter the 'Passcode' and 'Username' below the Modal box that pops up.";
  htmlConsole2[4].innerHTML = "Enter the number of cycles (from 5 above), that's the number of times you want to play the game, into the Modal box for the game to start.";
  htmlConsole2[5].innerHTML = "Refresh the browser at any point to start all over.";
  htmlConsole2[5].style.cssText = 'color: #e7d422;font-size: 1.2em;';
  springDisplayP[27].remove();
  springDisplayP[28].remove();
  springDisplayP[29].remove();
}

function gameRulesDisplay2() {
  htmlConsole2[0].innerHTML = 'Game Rules';
  htmlConsole2[0].style.cssText = 'color: #e7d422;font-size: 1.4em;';
  htmlConsole2[1].innerHTML = 'Click on the spring boxes of the same colour side-by-side to each other (match) to score points and win rewards';
  htmlConsole2[1].style.cssText = '';
  htmlConsole2[2].innerHTML = 'match of 2 = 3pts, match of 3 = 5pts';
  htmlConsole2[3].innerHTML = 'match of 4 = 7pts, match of 5 = 10pts';
  htmlConsole2[4].innerHTML = "When there's no match in any of the column, the game ends and restart pop out, click on to restart the game and go another cycle.";
  htmlConsole2[5].style.cssText = '';
  htmlConsole2[5].innerHTML = "When you've used up the number of cycles, it'll be game over. Used the 'Start Game' to start a new set of game.";
  htmlConsole2[6].innerHTML = "Refresh the browser at any point to start all over.";
  htmlConsole2[6].style.cssText = 'color: #e7d422;font-size: 1.2em;';
  springDisplayP[26].remove();
  springDisplayP[27].remove();
  springDisplayP[28].remove();
  springDisplayP[29].remove();
}

//function to clear display of the HTML
function claerHTMLDisplay() {
  for (i = 0; i < htmlConsole1.length; i++)
    htmlConsole1[i].innerHTML = '';
  for (i = 0; i < htmlConsole2.length - 2; i++)
    htmlConsole2[i].innerHTML = '';
  htmlConsole2[11].innerHTML = '';
}

//function to call the Modal box
function modalBoxCall(lebel, inputspace) {
  document.body.style.height = "100%";
  modalBox[0].style.display = "block";
  modalBox[2].textContent = lebel;
  modalBox[3].placeholder = inputspace;
  modalBox[3].focus();
}

//function to remove the Modal box
function modalRmoval() {
  divChild.remove();
  modalBox[3].value = '';
  modalBox[0].animate({
    opacity: [1, 0.5, 0],
    top: ['0px', '-100px', '-300px', '-500px', '-1000px'],
  }, 350);

  setTimeout(e => {
    modalBox[0].style.display = "none";
    document.body.style.height = "auto";
  }, 320)
}

//listening event to use the ENTER buttton to start the game
gameStart.addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    if (stopSpring == 0)
      initProcess();
    else if (stopSpring == 5) {
      modalBoxCall('PlayCycle', 'Enter game cycles');
      divChild.remove();
      stopSpring = 6;
    }
  }
});

//listening events to use the ENTER buttton after inputting values
modalBox[3].addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    if (stopSpring == 0 || stopSpring == 6) {
      event.preventDefault();
      if (modalBox[3].value === '') {
        htmlConsole1[11].innerHTML = "You cancelled the Modal.";
        modalRmoval(), gameStart.focus();
      } else if (modalBox[2].textContent === 'Passcode' || modalBox[2].textContent === 'PlayCycle') {
        passCycles(modalBox[3].value);
        modalBox[3].value = '';
      } else if (modalBox[2].textContent === 'Username') {
        usrNameInput(modalBox[3].value);
        modalBox[3].value = '';
      }
    }
  }
});

function rewardScores(randomColorArrayParam, k, r) {
  let newRandomColorArray = [];

  for (let j = 0; j < randomColorArrayParam.length; j++) {
    springContainerArr2D[k][j].remove();
  }

  newRandomColorArray = goRandom('randcolors', k);
  for (let i = 0; i < randomColorArrayParam.length; i++) {
    generateColorBubble(i, k + 1, newRandomColorArray, i, 'rca');
  }

  springCrushed++;
  if (r == 2)
    springCrushed += 2;
  else if (r == 3)
    springCrushed += 4;
  else if (r == 4)
    springCrushed += 6;
  else if (r == 5)
    springCrushed += 9;

  if ((springCrushed >= keysCycles) && (springCrushed < (2 * keysCycles))) {
    springScores[3].innerHTML = springRewards[0];
  } else if ((springCrushed >= (2 * keysCycles)) && (springCrushed < (5 * keysCycles))) {
    springScores[3].innerHTML = springRewards[1];
  } else if ((springCrushed >= (5 * keysCycles)) && (springCrushed < (8 * keysCycles))) {
    springScores[3].innerHTML = springRewards[2];
  } else if (springCrushed >= (8 * keysCycles)) {
    springScores[3].innerHTML = springRewards[3];
  }

  springScores[2].innerHTML = springCrushed;
  return newRandomColorArray;
}

//function to get input values of the passcode and number of cycles
function passCycles(modalInputVal) {
  keysCycles = parseInt(modalInputVal);

  let twowords1, twowords2;
  if (isNaN(keysCycles)) {
    if (modalBox[2].textContent === 'Passcode') {
      twowords1 = modalInputVal.toString().length == 1 ? 'value' : 'values';
      twowords2 = " entered is not a number. Please start again and enter numbers.";
      htmlConsole1[11].innerHTML = "Input " + twowords1 + twowords2;
      gameStart.focus(), modalRmoval();
      return;
    } else {
      htmlConsole1[12].innerHTML = '';
      twowords1 = modalInputVal.toString().length == 1 ? 'cycle' : 'cycles';
      twowords2 = " entered is not a number. Please enter number between 5 or more cycles to start the game.";
      htmlConsole1[11].innerHTML = "Input " + twowords1 + twowords2;
    }
  } else {
    if (modalBox[2].textContent === 'Passcode') {
      if (modalInputVal != '2831') {
        twowords1 = "Passcode entered is incorrect. Please start again and enter the correct passcode.";
        htmlConsole1[11].innerHTML = twowords1;
        gameStart.focus(), modalRmoval();
        return;
      } else {
        twowords1 = "The passcode is correct! Please enter rhe username to continue.";
        htmlConsole1[11].innerHTML = twowords1;
        modalBoxCall('Username', 'Enter the username');
      }
    } else {
      htmlConsole1[12].innerHTML = '';
      if (keysCycles < 5) {
        twowords1 = "Number of cycles entered is below 5. Please enter 5 or more cycles to start the game.";
        htmlConsole1[11].innerHTML = twowords1;
      } else {
        gameCycles = parseInt(modalInputVal);
        keysCycles = 40 * parseInt(modalInputVal);
        twowords1 = "You've " + gameCycles + " cyles to play.";
        htmlConsole1[11].innerHTML = twowords1;
        twowords1 = "The game will start in 1 second.";
        htmlConsole1[12].innerHTML = twowords1;
        modalRmoval();
        setTimeout(e => { startSpringGame(); }, 500);
      }
    }
  }
}

//function to get input value of the username
function usrNameInput(usrName) {
  let twowords1, twowords2;
  if (usrName.toLowerCase() == 'uche') {
    twowords1 = "The username is: " + usrName + ". That's correct! You can now enter the cycles amount to play the game (5 above).";
    htmlConsole1[11].innerHTML = twowords1;
    htmlConsole1[12].innerHTML = '';

    usrName = '';
    usrAttempts = 5;
    divChild.remove();
    modalBoxCall('PlayCycle', 'Enter game cycles');
  } else {
    twowords1 = "Wrong username entered. Please try again and enter the correct usename.";
    htmlConsole1[11].innerHTML = twowords1;
    modalBox[3].focus();

    usrAttempts--;
    if (usrAttempts == 0) {
      twowords1 = "You used all the atempts required.";
      htmlConsole1[12].innerHTML = twowords1;
      twowords1 = "Wrong entry 5 times. Please start all over again.";
      htmlConsole1[11].innerHTML = twowords1;
      usrName = '';
      usrAttempts = 5;
      modalRmoval(), gameStart.focus();
      return;
    } else {
      twowords1 = usrAttempts == 1 ? ' attempt ' : ' attempts ';
      twowords2 = usrAttempts + twowords1 + 'remaining.';
      htmlConsole1[12].innerHTML = twowords2;
    }
  }
}

//function to gnerate random outputs
function goRandom(rands, k) {
  let randomItem = [];
  if (rands == 'colors' || rands == 'picks') {
    randomItem = ['red', 'green', 'Purple', 'blue'];
    if (rands == 'picks') {
      let randomNum = Math.floor(Math.random() * randomItem.length);
      return randomNum;
    }
  } else if (rands == 'randcolors') {
    randomItem = randomColorArr2D[k];
  }

  for (let i = randomItem.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = randomItem[i];
    randomItem[i] = randomItem[j];
    randomItem[j] = k;
  }
  return randomItem;
}

//function to start the game after correct passcode and username input
function startSpringGame() {
  if (stopSpring == 6)
    endSpringGame(), stopSpring = 7;
  else if (stopSpring == 0)
    stopSpring = 1;
  console.clear(), claerHTMLDisplay();
  htmlConsole1[0].innerHTML = "Game started.";
  setTimeout(e => {
    gameCycles--;
    htmlConsole1[1].innerHTML = "Remaining game cycle: " + gameCycles;
    gameRulesDisplay2();
    springAdventures(10, 0, 1);
  }, 500);
}

function reStartGame() {
  htmlConsole2[10].innerHTML = '';
  htmlConsole2[10].style.cssText = "display: none; ";
  stopSpring = 4;
  clearGameDisplay();
  console.clear(), claerHTMLDisplay();
  setTimeout(e => {
    htmlConsole1[1].innerHTML = "Remaining game cycle: " + gameCycles;
    gameRulesDisplay2();
    springAdventures(10, 0, 1);
  }, 100);
}

function clearGameDisplay() {
  for (i = 0; i < randomColorArr2D.length; i++)
    randomColorArr2D[i].splice(0, randomColorArr2D[i].length);
  for (i = 0; i < springContainerArr2D.length; i++) {
    for (let j = 0; j < springContainerArr2D[i].length; j++)
      springContainerArr2D[i][j].style.display = 'none';
    springContainerArr2D[i].splice(0, springContainerArr2D[i].length);
  }
  randomColorArr2D = [], springContainerArr2D = [], springSpans = [];
}


//function to end the game after completed number of the cycles
function endSpringGame() {
  springCount = 0, springCrushed = 0, springRewards = [];
  clearGameDisplay();
  for (i = 0; i < springScores.length; i++)
    springScores[i].innerHTML = '';
}

var randomColorArr2D = [], springContainerArr2D = [];
let springSpans = [], randomColorArray = ['uche'], dd = 0;

function generateColorBubble(cc, num, selectedColorArray, i, colorStatus) {
  springSpans[cc] = springBoxSpan[num - 1].appendChild(document.createElement('span'));//craete span element
  let ccc = cc < 10 ? '0' + cc : cc;
  springSpans[cc].innerHTML = 'ring' + ccc;// give it a name

  if (colorStatus === 'rca')
    ccc = "bottom: " + (23 * cc) + "px;transition: all 2s ease-out;";
  else
    ccc = '';

  springSpans[cc].className = 'color-span';// give it a class name
  springSpans[cc].style.cssText = // and style it
    "position: absolute;border: 1px solid hsl(51, 82%, 56%);background-color: " + selectedColorArray[i] + ";color: rgb(255, 255, 255);padding: 0.1% 2.5%;border-radius: 6px;left: 20%;cursor: pointer; " + ccc;
}

function springAnimateTimer(springAdventure, cc, springRate, num) {
  let pickNum = goRandom('picks');
  let defaultColorArray = goRandom('colors');
  generateColorBubble(cc, num, defaultColorArray, pickNum, 'dca');
  randomColorArray[dd] = defaultColorArray[pickNum]; //add to the list of colours
  dd++;

  springSpans[cc].style.visibility = 'hidden';
  springSpans[cc].animate(
    [
      { bottom: ((springScreen.offsetHeight - 25) - (1 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (2 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (3 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (4 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (5 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (6 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (7 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (8 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (9 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (10 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (11 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (12 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (13 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (14 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (15 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (16 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (17 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (18 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (19 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (20 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (21 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (22 * cc)) + "px" },
      { bottom: ((springScreen.offsetHeight - 25) - (23 * cc)) + "px" },
    ],
    {
      duration: springRate,
    }
  );

  setTimeout(e => {
    springSpans[cc].style.bottom = (23 * cc) + 'px';
    springCount++;
    springScores[0].innerHTML = springCount;
  }, springRate - 2);


  setTimeout(e => {
    springSpans[cc].style.visibility = 'visible';
    springRate = 10;
    cc++;

    if (cc == 20 && num <= 10) {
      randomColorArr2D[num - 1] = randomColorArray;
      springContainerArr2D[num - 1] = springSpans;
      cc = 0, randomColorArray = [], springSpans = [], dd = 0;
      num++;
      if (num > 10)
        stopSpring = 2;
      else
        springAdventure(springRate, 0, num);
    } else {
      springAdventure(springRate, cc, num);
    }
  }, springRate + 10);
}

//------- 10 individual function call ---------------------------------------
function springAdventures(springRate, c, m) {
  if (stopSpring == 1 || stopSpring == 4 || stopSpring == 7) {
    for (let p = 1; p <= 10; p++) {
      if (p === m) {
        springAnimateTimer(springAdventures, c, springRate, m);
        break;
      }
    }
  }
}
//--------------------------------------------------------------------------

function checkForSamelements(i, r) {
  let checkMismatch1 = [];
  randomColorArr2D[i] = rewardScores(randomColorArr2D[i], i, r);
  springContainerArr2D[i] = springSpans;
  springSpans = [];

  setTimeout(e => {
    for (let p = 0; p < randomColorArr2D.length; p++) {
      for (let q = 0; q < randomColorArr2D[p].length; q++) {
        if (randomColorArr2D[p][q + 1] === randomColorArr2D[p][q])
          springSpans[q] = 'match';
        else
          springSpans[q] = 'mismatch';
      }
      checkMismatch1[p] = springSpans;
      springSpans = [];
    }

    let checkMismatch2 = [];
    for (let p = 0; p < checkMismatch1.length; p++)
      checkMismatch2 = checkMismatch2.concat(checkMismatch1[p]);

    if (checkMismatch2.every((e, i, a) => e === 'mismatch')) {
      stopSpring = 3;
      console.log('ALL MISMATCHED');

      if (gameCycles != 0)
        gameCycles--;
      if (gameCycles == 0) {
        stopSpring = 5;
        htmlConsole2[10].innerHTML = "GAME OVER!";
      } else {
        htmlConsole2[10].innerHTML = 'No more match. Click to play another cycle.';
        htmlConsole2[10].style.cssText = // and style it
          "border: 1px solid hsl(51, 82%, 56%);color: rgb(255, 255, 255);cursor: pointer; padding:1%; ";
      }
    }
  }, 100);
}

function clickSameBoxToGainPoints(event) {
  for (let i = 0; i < springContainerArr2D.length; i++) {
    for (let j = 0; j < springContainerArr2D[i].length; j++) {
      if (event.target == springContainerArr2D[i][j]) {

        if ((randomColorArr2D[i][j] === randomColorArr2D[i][j - 1]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j - 2]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j - 3]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j - 4])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j - 1].remove(), springContainerArr2D[i][j - 2].remove(), springContainerArr2D[i][j - 3].remove(), springContainerArr2D[i][j - 4].remove();
          springContainerArr2D[i].splice(j - 1, 2);
          randomColorArr2D[i].splice(j - 1, 2);
          return checkForSamelements(i, 5);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j + 1]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j + 2]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j + 3]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j + 4])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j + 1].remove(), springContainerArr2D[i][j + 2].remove(), springContainerArr2D[i][j + 3].remove(), springContainerArr2D[i][j + 4].remove();
          springContainerArr2D[i].splice(j, 2);
          randomColorArr2D[i].splice(j, 2);
          return checkForSamelements(i, 5);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j - 1]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j - 2]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j - 3])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j - 1].remove(), springContainerArr2D[i][j - 2].remove(), springContainerArr2D[i][j - 3].remove();
          springContainerArr2D[i].splice(j - 1, 2);
          randomColorArr2D[i].splice(j - 1, 2);
          return checkForSamelements(i, 4);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j + 1]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j + 2]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j + 3])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j + 1].remove(), springContainerArr2D[i][j + 2].remove(), springContainerArr2D[i][j + 3].remove();
          springContainerArr2D[i].splice(j, 2);
          randomColorArr2D[i].splice(j, 2);
          return checkForSamelements(i, 4);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j - 1]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j - 2])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j - 1].remove(), springContainerArr2D[i][j - 2].remove();
          springContainerArr2D[i].splice(j - 1, 2);
          randomColorArr2D[i].splice(j - 1, 2);
          return checkForSamelements(i, 3);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j + 1]) && (randomColorArr2D[i][j] === randomColorArr2D[i][j + 2])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j + 1].remove(), springContainerArr2D[i][j + 2].remove();
          springContainerArr2D[i].splice(j, 2);
          randomColorArr2D[i].splice(j, 2);
          return checkForSamelements(i, 3);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j - 1])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j - 1].remove();
          springContainerArr2D[i].splice(j - 1, 2);
          randomColorArr2D[i].splice(j - 1, 2);
          return checkForSamelements(i, 2);
        } else if ((randomColorArr2D[i][j] === randomColorArr2D[i][j + 1])) {
          springContainerArr2D[i][j].remove(), springContainerArr2D[i][j + 1].remove();
          springContainerArr2D[i].splice(j, 2);
          randomColorArr2D[i].splice(j, 2);
          return checkForSamelements(i, 2);
        }
      }
    }
  }
}
