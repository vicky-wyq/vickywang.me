"use strict";
const display = document.querySelector("#display"); // Where the number shows.
const addBtn = document.querySelector("#addBtn"); // Click to +1.
const reduceBtn = document.querySelector("#reduceBtn"); // Click to -1.
const resetBtn = document.querySelector("#resetBtn"); // Click to reset to 0.
const feedback = document.querySelector("#feedback");

feedback.style.display = "none";

let count = 0;
addBtn.addEventListener("click", function () {
  if (count < 10) {
    count = count + 1;
    console.log(count);
    display.innerText = count;
  } else {
    addBtn.style.backgroundColor = "red";
    feedback.style.display = "block";
  }
});
reduceBtn.addEventListener("click", function () {
  if (count > 0) {
    count = count - 1;
    display.innerText = count;
  } else {
    reduceBtn.style.backgroundColor = "red";
    feedback.style.display = "block";
  }
});
resetBtn.addEventListener("click", function () {
  count = 0;
  display.innerText = count;
});
