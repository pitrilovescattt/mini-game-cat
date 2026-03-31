let score = 0;
  document.getElementById("highscore").innerText = "High Score: " + highscore;

  updateUI();

  document.getElementById("game-area").innerHTML = "";

  gameInterval = setInterval(spawnCat, 600);
  timerInterval = setInterval(updateTimer, 1000);
}

function spawnCat() {
  const gameArea = document.getElementById("game-area");

  const cat = document.createElement("img");
  cat.src = cats[Math.floor(Math.random() * cats.length)];
  cat.classList.add("cat");

  const x = Math.random() * (gameArea.clientWidth - 80);
  const y = Math.random() * (gameArea.clientHeight - 80);

  cat.style.left = x + "px";
  cat.style.top = y + "px";

  cat.onclick = (e) => {
    score++;
    combo++;

    document.getElementById("meow").play();

    showCombo(e.pageX, e.pageY);

    updateUI();
    cat.remove();
  };

  gameArea.appendChild(cat);

  setTimeout(() => {
    cat.remove();
    combo = 0;
  }, 800);
}

function showCombo(x, y) {
  const text = document.createElement("div");
  text.classList.add("combo");
  text.innerText = combo > 1 ? "🔥 x" + combo : "✨";

  text.style.left = x + "px";
  text.style.top = y + "px";

  document.body.appendChild(text);

  setTimeout(() => text.remove(), 500);
}

function updateUI() {
  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("timer").innerText = "Time: " + time;
}

function updateTimer() {
  time--;
  updateUI();

  if (time <= 0) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
    }

    alert("Game Over! Score: " + score);
  }
}
