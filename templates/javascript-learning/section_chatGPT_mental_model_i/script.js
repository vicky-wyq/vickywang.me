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

// ================================================================
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
// ================================================================
/*
Event(s) = ?
click to select or enter a number

State(s) = ?
no default value, probably should be a 0

DOM affected = ?
when multiply, value changed, dom need to update
Logic = ?
enter a number first
choose how to multiply
see result
*/



// DOM references
const numInput = document.querySelector("#numInput");
const multipliers = document.querySelector("#multipliers");
const result = document.querySelector("#result");

// Update function
function updateResult() {
  const inputValue = Number(numInput.value);
  const multiplier = Number(multipliers.value);

  // Only update if input is a number
  if (!isNaN(inputValue)) {
    result.innerText = inputValue * multiplier;
  } else {
    result.innerText = "–";
  }
}

// Listen for input or multiplier change
numInput.addEventListener("input", updateResult);
multipliers.addEventListener("change", updateResult);


// ==============================
/*
Event(s) = ?
2 events, one from input total amount, one from tip percentage selection

State(s) = ?
enter a total(number) first, then nothing changes, when select percentage, calc
just feel maybe we can set a default percentage, but will do it later

DOM affected = ?
when typed total, and select a percentage, then, calculate
the moment select percentage, it start to calc, but must with the total value, or 0 * any percentage =0

Logic = ?
get total value from dom
get percentage from dom, multiply with total, when click the percentage, total and tip amount both show up
 */

// step 1 get everything from html
const btn10 = document.querySelector("#btn10");
const btn15 = document.querySelector("#btn15");
const btn20 = document.querySelector("#btn20");

const billTotal = document.querySelector("#billTotal");
const tipAmount = document.querySelector("#tipAmount");
const totalAmount = document.querySelector("#totalAmount");


