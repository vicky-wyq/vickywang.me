"use strict";
/*
Event = ?
count user typed in char

State = ?


DOM affected = ?
show how many char left

Logic = ?
max char
count current char
provide feedback for how many char left


*/

const textarea = document.querySelector("#textarea");
const feedback = document.querySelector("#feedback");


function count() {
  let currentChar = textarea.value.trim().length;

  feedback.innerText = `Current characters are ${currentChar}, you have ${100-currentChar} left`;

if (currentChar > 100) {
  feedback.innerText = `You cannot exceed 100 characters`;
  feedback.style.color = "red";
} else {
  feedback.innerText = `You have ${100 - currentChar} characters left`;
  feedback.style.color = "black";
}



}

textarea.addEventListener("input", count);
