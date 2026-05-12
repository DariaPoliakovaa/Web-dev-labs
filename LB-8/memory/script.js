function createCards(count) {
  const symbols = ['🍎','🍌','🍓','🍇','🍒','🥝','🍍','🥑'];

  let arr = [];

  for (let i = 0; i < count / 2; i++) {
    arr.push(symbols[i], symbols[i]);
  }

  return shuffle(arr);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getTimeByDifficulty(level) {
  if (level === "easy") return 180;
  if (level === "medium") return 120;
  if (level === "hard") return 60;
  return 120;
}

function createState(rows, cols, level) {
  const total = rows * cols;

  return {
    cards: createCards(total),
    flipped: [],
    moves: 0,
    player: 1,
    score1: 0,
    score2: 0,
    found: 0,
    totalPairs: total / 2,
    time: getTimeByDifficulty(level)
  };
}

function flipCard(state, index) {
  if (state.flipped.length === 2) return state;

  if (state.flipped.includes(index)) return state;

  return {
    ...state,
    flipped: [...state.flipped, index]
  };
}

function checkMatch(state) {
  if (state.flipped.length < 2) return state;

  const [i1, i2] = state.flipped;
  const match = state.cards[i1] === state.cards[i2];

  if (match) {
    return {
      ...state,
      found: state.found + 1,
      score1: state.player === 1 ? state.score1 + 1 : state.score1,
      score2: state.player === 2 ? state.score2 + 1 : state.score2,
      flipped: []
    };
  } else {
    return {
      ...state,
      player: state.player === 1 ? 2 : 1,
      flipped: []
    };
  }
}

function addMove(state) {
  return {
    ...state,
    moves: state.moves + 1
  };
}

function isGameOver(state) {
  return state.found === state.totalPairs;
}

const game = document.getElementById('game');
const info = document.getElementById('info');
const timerText = document.getElementById('timer');

let state;
let timer;
let cols;

function render(state, cols) {
  game.innerHTML = "";
  game.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

  state.cards.forEach((val, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    const isFlipped = state.flipped.includes(index);

    card.innerHTML = `
      <div class="front"></div>
      <div class="back">${isFlipped ? val : ""}</div>
    `;

    if (isFlipped) {
      card.classList.add('flip');
    }

    game.appendChild(card);
  });
}

function renderInfo(state) {
  info.innerText =
    `Moves: ${state.moves} || Player: ${state.player} || Score ${state.score1}:${state.score2}`;
}

function startTimer() {
  timerText.innerText = "Time: " + state.time;

  timer = setInterval(() => {
    state = {
      ...state,
      time: state.time - 1
    };

    timerText.innerText = "Time: " + state.time;

    if (state.time <= 0) {
      clearInterval(timer);
      alert("Time's up!");
    }
  }, 1000);
}

game.addEventListener('click', (e) => {
  const card = e.target.closest('.card');

  if (!card) return;

  const index = +card.dataset.index;

  state = flipCard(state, index);

  render(state, cols);
  renderInfo(state);

  if (state.flipped.length === 2) {
    state = addMove(state);

    renderInfo(state);

    setTimeout(() => {
      state = checkMatch(state);

      render(state, cols);
      renderInfo(state);

      if (isGameOver(state)) {
        clearInterval(timer);

        let winner = "";

        if (state.score1 > state.score2) {
          winner = "Won player 1";
        } else if (state.score2 > state.score1) {
          winner = "Won player 2";
        } else {
          winner = "Draw";
        }

        alert("Game finished! " + winner);
      }

    }, 700);
  }
});

function startGame() {
  clearInterval(timer);

  const rows = +document.getElementById('rows').value;
  cols = +document.getElementById('cols').value;

  const level = document.getElementById('difficulty').value;

  if ((rows * cols) % 2 !== 0) {
    alert("number of cards should be even!");
    return;
  }

  state = createState(rows, cols, level);

  render(state, cols);
  renderInfo(state);

  startTimer();
}

document.getElementById('start').addEventListener('click', startGame);