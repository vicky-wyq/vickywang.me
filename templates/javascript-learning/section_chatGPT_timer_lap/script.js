"use strict";

let count = 0;
let intervalId = null;
const display = document.querySelector("#display");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const laps = document.querySelector("#laps");

startBtn.addEventListener("click", () => {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    count++;
    display.innerText = count;
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

lapBtn.addEventListener("click", () => {
  if (intervalId === null) return; // ignore if not running
  const li = document.createElement("li");
  li.innerText = `Lap: ${count}`;
  laps.appendChild(li);
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  count = 0;
  display.innerText = count;
  laps.innerHTML = ""; // clear laps
});
