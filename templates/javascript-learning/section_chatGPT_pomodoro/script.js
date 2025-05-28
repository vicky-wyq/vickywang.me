"use strict";
"use strict";
let timeLeft = 25 * 60; // seconds
let intervalId = null;
let mode = "focus"; // "focus", "short", "long"
let sessionCount = 0;

const display = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const modeLabel = document.querySelector("#mode");
const progress = document.querySelector("#progress");






function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  display.innerText = format(timeLeft);
}

function updateProgress() {
  progress.innerHTML = ""; // clear

  for (let i = 0; i < 4; i++) {
    const dot = document.createElement("span");
    dot.innerText = "●";
    dot.style.fontSize = "1.5rem";
    dot.style.margin = "0 4px";
    dot.style.color = i < sessionCount ? "green" : "#ccc";
    progress.appendChild(dot);
  }
}
function switchMode(newMode) {
  mode = newMode;
  modeLabel.innerText =
    newMode === "focus" ? "Focus" : newMode === "short" ? "Short Break" : "Long Break";
  timeLeft = newMode === "focus" ? 25 * 60 : newMode === "short" ? 5 * 60 : 15 * 60;
  updateDisplay();
  updateProgress();
}


startBtn.addEventListener("click", () => {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      intervalId = null;

      if (mode === "focus") {
        sessionCount++;
        switchMode(sessionCount % 4 === 0 ? "long" : "short");
      } else {
        switchMode("focus");
      }
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  switchMode("focus");
  sessionCount = 0;
});

switchMode("focus");
updateProgress();
