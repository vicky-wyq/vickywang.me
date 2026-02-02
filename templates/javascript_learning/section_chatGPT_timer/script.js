"use strict";

let count = 0; // starting number displayed on screen.
let intervalId = null; // No interval is running now. | this variable has no value yet.
const display = document.querySelector("#countDisplay");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

// set 3 btns
startBtn.addEventListener("click", () => {
  if (intervalId !== null) return; // prevents multiple intervals from stacking

  intervalId = setInterval(() => { 
    count++; 
    display.innerText = count; 
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalId); 
  intervalId = null; 
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId); 
  intervalId = null;
  count = 0; 
  display.innerText = count;
});
