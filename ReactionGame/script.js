document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start-button");
  const resetButton = document.querySelector(".reset-button");
  const gameArea = document.querySelector(".game-area");
  const currentTimeDisplay = document.querySelector(".current-time");
  const bestTimeDisplay = document.querySelector(".best-time");

  let startTime;
  let bestTime = null;
  let shapeTimeout;

  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

  function startGame() {
    if (gameArea.querySelector(".shape") === null) {
      clearTimeout(shapeTimeout);
      generateShape();
    }
  }

  function resetGame() {
    const shapes = gameArea.querySelectorAll(".shape");
    shapes.forEach((shape) => shape.remove());

    clearTimeout(shapeTimeout);
    currentTimeDisplay.textContent = "0.000";
    bestTime = null;
    bestTimeDisplay.textContent = "-";
  }

  function generateShape() {
    const shape = document.createElement("div");
    shape.classList.add("shape");

    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    shape.style.backgroundColor = randomColor;

    const size = Math.random() * 50 + 50;
    const maxLeft = gameArea.clientWidth - size;
    const maxTop = gameArea.clientHeight - size;
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;

    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${left}px`;
    shape.style.top = `${top}px`;

    if (Math.random() > 0.5) {
      shape.style.borderRadius = "50%";
    }

    gameArea.appendChild(shape);

    startTime = Date.now();
    shape.addEventListener("click", function () {
      const reactionTime = (Date.now() - startTime) / 1000;
      currentTimeDisplay.textContent = reactionTime.toFixed(3);

      if (bestTime === null || reactionTime < bestTime) {
        bestTime = reactionTime;
        bestTimeDisplay.textContent = bestTime.toFixed(3);
      }

      gameArea.removeChild(shape);
      shapeTimeout = setTimeout(generateShape, Math.random() * 2000 + 500);
    });
  }
});
