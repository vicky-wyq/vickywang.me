"use strict";
let count = 0; // in hundredths of a second (10ms)
let intervalId = null;
let lapCount = 1;


const display = document.querySelector("#display");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const pauseBtn = document.querySelector("#pauseBtn");

const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const laps = document.querySelector("#laps");

function formatTime(units) {
  const totalSeconds = Math.floor(units / 100);
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  const ms = String(units % 100).padStart(2, "0"); // 0–99 = hundredths
  return `${mins}:${secs}.${ms}`;
}

startBtn.addEventListener("click", () => {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    count++; // 10ms per tick
    display.innerText = formatTime(count);
  }, 10); // every 10ms
});


pauseBtn.addEventListener("click", () => {
  if (intervalId !== null) {
    // currently running → pause it
    clearInterval(intervalId);
    intervalId = null;
    pauseBtn.innerText = "▶️ Resume";
  } else {
    // currently paused → resume
    intervalId = setInterval(() => {
      count++;
      display.innerText = formatTime(count);
    }, 10);
    pauseBtn.innerText = "⏸ Pause";
  }
});


// stopBtn.addEventListener("click", () => {
//   clearInterval(intervalId);
//   intervalId = null;
// });

lapBtn.addEventListener("click", () => {
  if (intervalId === null) return;

  const li = document.createElement("li");
  li.innerText = `Lap ${lapCount}: ${formatTime(count)}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  laps.appendChild(li);

  lapCount++;
});


resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  count = 0;
  display.innerText = formatTime(count);
  laps.innerHTML = "";
  lapCount = 1; 

});
