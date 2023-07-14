const highScoreCounter = document.querySelector("#high-score");
let highScore = JSON.parse(localStorage.getItem("highScore"));
if (!highScore) {
  highScore = 0;
}
else {
  highScoreCounter.innerHTML = highScore;
}
const gameContainer = document.getElementById("game");
let guessOne = null;
let guessTwo = null;
let matches = 0;
let guessCount = 0;
const scoreCounter = document.querySelector("#current-score");
const scoreDiv = document.querySelector("#score-div");
let canClick = true;
let attempts = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  if (guessCount === 2 || !canClick) {
    return;
  }
  guess = event.target;
  guess.style.backgroundColor = `${event.target.classList.value}`;
  guess.classList.add("clicked");

  if (!guessOne && canClick) {
    guessOne = guess;
    console.log("guess one:", guessOne);
    guessCount ++;
  }
  else if (guessOne && !guessTwo && guess !== guessOne && canClick) {
    guessTwo = guess;
    console.log("guess two:", guessTwo);
    guessCount ++;
  }
  // console.log("guessCount:", guessCount);

  if (guessOne.className === guessTwo.className) {
    setTimeout(() => {
      guessOne.removeEventListener("click", handleCardClick);
      guessTwo.removeEventListener("click", handleCardClick);
      guessOne = null;
      guessTwo = null;
      guessCount = 0;
      matches ++;
      console.log("matches:", matches);
      attempts ++;
      scoreCounter.innerHTML = attempts;
    }, 1000);
  }
  else {
    setTimeout(() => {
      guessOne.style.backgroundColor = "";
      guessTwo.style.backgroundColor = "";
      guessOne.classList.remove("clicked");
      guessTwo.classList.remove("clicked");
      guessOne = null;
      guessTwo = null;
      guessCount = 0;
      attempts ++;
      scoreCounter.innerHTML = attempts;
    }, 1000);
  }
  // console.log("attempts:", attempts);
  setTimeout(() => {
    if (matches == (COLORS.length / 2)) {
      // saving highScore to localStorage / updating
        if (attempts < highScore || highScore === 0) {
          // console.log("set highscore");
          localStorage.setItem("highScore", attempts);
          highScoreCounter.innerHTML = JSON.parse(localStorage.getItem("highScore"));
        }
        else {
          return;
        }
    }
  }, 1000);
}

function startGame() {
  toggleScreen("start-screen", false);
  toggleScreen("game", true);
  // toggleScreen("challenge-yourself", true);
  toggleScreen("restart-button", true);
  toggleScreen("score-div", true);
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = ( toggle ) ? "flex" : "none";
  element.style.display = display;
}

function restart() {
  gameContainer.innerHTML = "";
  createDivsForColors(shuffle(COLORS));
  attempts = 0;
  matches = 0;
  scoreCounter.innerHTML = attempts;
}

// when the DOM loads
createDivsForColors(shuffledColors);



// function challenge(shuffledColors) {
//   createDivsForColors(shuffledColors);
// }