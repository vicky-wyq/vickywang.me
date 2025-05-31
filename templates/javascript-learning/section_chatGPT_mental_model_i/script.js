"use strict";

// ================

const message = document.querySelector("#message");
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  if (message.value === "") {
    message.value = "Hello, world!";
  } else {
    message.value = "";
  }
});

// ================
/*

Answer these:

What is the event? - click

What is the state? - default state number = 0

What part of the DOM changes? change the number

What should the logic do? add 1 number each time

Just write something like:

Event = ?
addBtn.addEventListener("click", () => {
});
State = ?
const number = 0;

DOM = ?
const addBtn = document.querySelector("#addBtn");



Logic = ?
when click button, add 1 each time
so, the add function should be inside of the click event

*/

const addBtn = document.querySelector("#addBtn");
const subtractBtn = document.querySelector("#subtractBtn");

const resetBtn = document.querySelector("#resetBtn");

const number = document.querySelector("#number");

let count = 0;

addBtn.addEventListener("click", () => {
  count += 1;
  updateDisplay();
});

subtractBtn.addEventListener("click", () => {
  count -= 1;
  updateDisplay();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateDisplay();
});

function updateDisplay() {
  number.innerText = count;

  if (count > 0) {
    number.style.color = "green";
  } else if (count < 0) {
    number.style.color = "red";
  } else {
    number.style.color = "black";
  }
}
