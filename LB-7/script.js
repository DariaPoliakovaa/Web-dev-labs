const characters = [
  {
    walk: "assets/sprites/walk.png",
    idle: "assets/sprites/idle.png",
    shoot: "assets/sprites/shoot.png",
    dead: "assets/sprites/dead.png"
  },
  {
    walk: "assets/sprites/walk2.png",
    idle: "assets/sprites/idle2.png",
    shoot: "assets/sprites/shoot2.png",
    dead: "assets/sprites/dead2.png"
  }
];

const crosshair = document.getElementById("crosshair");

document.addEventListener("mousemove", (e) => {
  crosshair.style.left = e.clientX + "px";
  crosshair.style.top = e.clientY + "px";
});

const initialState = {
  round: 1,
  score: 0,
  enemyTime: 2000
};

let state = { ...initialState };
let currentCharacter = null;
let timeoutId = null;
let canShoot = false;
let roundActive = false;

const charEl = document.getElementById("character");
const msgEl = document.getElementById("message");
const roundEl = document.getElementById("round");
const scoreEl = document.getElementById("score");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

restartBtn.style.display = "none";

const gunSound = new Audio("assets/sounds/gun.mp3");
const winSound = new Audio("assets/sounds/win.mp3");
const loseSound = new Audio("assets/sounds/lose.mp3");
const bgSound = new Audio("assets/sounds/bg.mp3");

bgSound.loop = true;

const getRandomCharacter = () =>
  characters[Math.floor(Math.random() * characters.length)];

const increaseDifficulty = (time) => time * 0.5;

const addScore = (score, round) => score + round * 10;

const setSprite = (type) => {
  charEl.className = "";
  charEl.style.backgroundImage = `url(${currentCharacter[type]})`;
  charEl.classList.add(type);
};

const startGame = () => {
  state = { ...initialState };
  bgSound.currentTime = 0;
  bgSound.play();
  nextRound();
};

const nextRound = () => {
  canShoot = false;
  roundActive = false;

  currentCharacter = getRandomCharacter();

  roundEl.textContent = "Round: " + state.round;
  scoreEl.textContent = "Score: " + state.score;

  msgEl.textContent = "Wait...";

  charEl.style.left = "-50px";
  setSprite("walk");

  let pos = -50;

  const walkInterval = setInterval(() => {
    pos += 3;
    charEl.style.left = pos + "px";

    if (pos >= 380) {
      clearInterval(walkInterval);
      setSprite("idle");
      prepareShoot();
    }
  }, 30);
};

const prepareShoot = () => {
  const delay = Math.random() * 2000 + 1000;

  timeoutId = setTimeout(() => {
    msgEl.textContent = "FIRE!";
    canShoot = true;
    roundActive = true;

    timeoutId = setTimeout(enemyShoot, state.enemyTime);
  }, delay);
};

const enemyShoot = () => {
  if (!roundActive) return;

  roundActive = false;

  setSprite("shoot");
  loseGame();
};

const playerShoot = () => {
  if (!roundActive) return;

  roundActive = false;
  clearTimeout(timeoutId);

  if (!canShoot) {
    loseGame();
    return;
  }

  gunSound.currentTime = 0;
  gunSound.play();

  setSprite("dead");

  state.score = addScore(state.score, state.round);
  state.round += 1;
  state.enemyTime = increaseDifficulty(state.enemyTime);

  msgEl.textContent = "YOU WIN!";
  winSound.currentTime = 0;
  winSound.play();

  setTimeout(nextRound, 1500);
};

const loseGame = () => {
  clearTimeout(timeoutId);
  roundActive = false;

  msgEl.textContent = "YOU LOSE!";
  loseSound.currentTime = 0;
  loseSound.play();

  restartBtn.style.display = "inline-block";
};

charEl.addEventListener("click", playerShoot);

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  startGame();
});

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  startGame();
});