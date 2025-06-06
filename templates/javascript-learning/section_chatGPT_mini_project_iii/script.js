"use strict";
const display = document.querySelector("#display"); // Where the number shows.
const addBtn = document.querySelector("#addBtn"); // Click to +1.
const resetBtn = document.querySelector("#resetBtn"); // Click to reset to 0.

let count = 0;

// function addOne(){

// }

addBtn.addEventListener("click", function () {
  count = count + 1;
  console.log(count);
  display.innerText = count;
});
resetBtn.addEventListener("click", function () {
  count = 0;
  display.innerText = count;
});