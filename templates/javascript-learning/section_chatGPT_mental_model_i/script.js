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

const totalInput = document.querySelector("#totalInput");
const tipAmount = document.querySelector("#tipAmount");
const tipPercentages = document.querySelector("#tipPercentages");

const btn10 = document.querySelector("#btn10");
const btn15 = document.querySelector("#btn15");
const btn20 = document.querySelector("#btn20");

function updateTip(percentage) {
  const total = Number(totalInput.value);

  if (!isNaN(total)) {
    const tip = total * percentage;
    const finalTotal = total + tip;

    tipAmount.innerText = tip.toFixed(2);
    totalAmount.innerText = finalTotal.toFixed(2);
  } else {
    tipAmount.innerText = "–";
    totalAmount.innerText = "–";
  }
}

// Add click listeners to buttons
btn10.addEventListener("click", () => updateTip(0.1));
btn15.addEventListener("click", () => updateTip(0.15));
btn20.addEventListener("click", () => updateTip(0.2));

// ==============================

const numberInput = document.querySelector("#numberInput");
const multi2 = document.querySelector("#multi2");
const resultmulti2 = document.querySelector("#resultmulti2");

function multiplyTow() {
  const userInput = Number(numberInput.value);

  if (!isNaN(userInput)) {
    resultmulti2.innerText = (userInput * 2).toFixed(2);
  } else {
    resultmulti2.style.color = "red";
    resultmulti2.innerText = "Please enter a number!";
  }
}
numberInput.addEventListener("input", multiplyTow);

// ==============================

/* 
Event(s) = ?
2 events for each input

State(s) = ?
State = any data your app is tracking internally so it can make decisions or update the UI.
📦 Think of it like this:
[ user types ] → [ JS stores value as state ] → [ JS updates the view ]


DOM affected = ?
take 2 numbers from dom, calc, then add them back
Logic = ?
number a + b
*/

const inputA = document.querySelector("#inputA");
const inputB = document.querySelector("#inputB");
const combineAB = document.querySelector("#combineAB");
function addAB() {
  const numberA = Number(inputA.value);
  const numberB = Number(inputB.value);
  if (!isNaN(numberA) && !isNaN(numberB)) {
    combineAB.innerText = (numberA + numberB).toFixed(2);
    combineAB.style.color = "black";
  } else {
    combineAB.style.color = "red";
    combineAB.innerText = "Please enter a number!";
  }
}
inputA.addEventListener("input", addAB);
inputB.addEventListener("input", addAB);

// ==============================
/*
Event(s) = ?
2 inputs by typing numbers, and 4 btns by adding click event, just realized you said using dropdown, i use btn try first round since i build html already

State(s) = ?
take number and calc logic from dom, then calc


DOM affected = ?
when enter first number, nothing changes, unless not a number
then select calc methord, untill enter the 2nd number, dom update result

Logic = ?
it could be +, −, ×, or ÷, depends on which btn user clicks

*/

const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiplication");
const division = document.querySelector("#division");

const input1stNumber = document.querySelector("#input1stNumber");
const input2ndNumber = document.querySelector("#input2ndNumber");
const calcResult = document.querySelector("#calcResult");

function calcNumbers(method) {
  const number1st = Number(input1stNumber.value);
  const number2nd = Number(input2ndNumber.value);

  let result;

  if (!isNaN(number1st) && !isNaN(number2nd)) {
    if (method === "+") {
      result = number1st + number2nd;
    } else if (method === "-") {
      result = number1st - number2nd;
    } else if (method === "*") {
      result = number1st * number2nd;
    } else if (method === "/") {
      result = number2nd !== 0 ? number1st / number2nd : "Can't divide by 0";
    }

    calcResult.style.color = "black";
    calcResult.innerText =
      typeof result === "number" ? result.toFixed(2) : result;
  } else {
    calcResult.style.color = "red";
    calcResult.innerText = "Please enter valid numbers";
  }
}

addition.addEventListener("click", () => calcNumbers("+"));
subtraction.addEventListener("click", () => calcNumbers("-"));
multiplication.addEventListener("click", () => calcNumbers("*"));
division.addEventListener("click", () => calcNumbers("/"));
