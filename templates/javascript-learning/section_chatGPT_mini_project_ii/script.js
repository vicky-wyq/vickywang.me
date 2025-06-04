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
const MAX_CHAR = 100;


// function count() {
//   let currentChar = textarea.value.trim().length;

//   feedback.innerText = `Current characters are ${currentChar}, you have ${100 - currentChar} left`;

//   if (currentChar > 10) {
//     feedback.innerText = `You cannot exceed 100 characters`;
//     feedback.style.color = "red";
//   } else {
//     feedback.innerText = `You have ${100 - currentChar} characters left`;
//     feedback.style.color = "black";
//   }
// }

function count() {
  let currentChar = textarea.value.length;

  // Cut off extra input beyond max
  if (currentChar > MAX_CHAR) {
    textarea.value = textarea.value.slice(0, MAX_CHAR);
    currentChar = MAX_CHAR; // update count after slice
  }

  // Feedback
  feedback.innerText = `You have ${MAX_CHAR - currentChar} characters left`;
  feedback.style.color = currentChar === MAX_CHAR ? "red" : "black";
}




textarea.addEventListener("input", count);
