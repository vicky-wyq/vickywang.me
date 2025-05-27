"use strict";

let count = 0; // start from 0? 
let intervalId = null; // first time see null

const display = document.querySelector("#countDisplay");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

// set 3 btns
startBtn.addEventListener("click", () => {
  if (intervalId !== null) return; // can u please explain a bit more about null data type

  intervalId = setInterval(() => { // can u explain setInterval, this is a build in function? loop?
    count++; // i assume make it countdown is about make count--
    display.innerText = count; //adding to ui
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalId); // "intervalId" link to previous one
  intervalId = null; // same null data type im not familiar
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);  // "intervalId" link to previous one
  intervalId = null;
  count = 0; // reset?
  display.innerText = count;//adding to ui?
});
