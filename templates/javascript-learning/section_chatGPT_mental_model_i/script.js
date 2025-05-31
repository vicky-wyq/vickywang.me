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
  count += 1; // update state

  number.innerText = count; // update DOM
});
subtractBtn.addEventListener("click", () => {
  count -= 1; // update state

  number.innerText = count; // update DOM
});
resetBtn.addEventListener("click", () => {
  count = 0; // update state

  number.innerText = count; // update DOM
});

/*
Event = ?
click to reset, so add a click event

State = ?
i am going to add to current practice, the default state is 0, but if user click add 1 button, it could be any

DOM = ?
change this number to 0 = reset
const number = document.querySelector("#number");


Logic = ?
click - change number to 0

*/
