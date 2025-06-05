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

// ========================================================================
/*🧩 Mini Project: Accordion
✅ Goal
You have multiple sections (like questions or headers)

When you click one:

Its content expands

Others collapse (optional — for single-open behavior)
 */

/*
Event = ?
click any of the content
State = ?
open and close

DOM affected = ?
show accordion content / hide accordion content

Logic = ?
default, everything closed
click any, open
click any other one, close the opened one, open the one that being clicked
click the open one, it close itself
 */

const headers = document.querySelectorAll(".accordion-header"); // we only select header cuz it is the only one clickble

headers.forEach((header) => { // everything in one function, which is for each loop, addEventListener inside of this loop, because any of the header could be clicked, so is it just keep looping, how the looping data flows?
  header.addEventListener("click", () => {
    const content = header.nextElementSibling; // nextElementSibling first time see it, base on research, this is the next element next to this header?

    // Close all other contents
    document.querySelectorAll(".accordion-content").forEach((section) => { // another for each, this is looping through content, section as argument, not sure how section argument pass in
      if (section !== content) { // the logic here is understandble, if section not equal to content, add class active, this is inside of click event
        section.classList.remove("active");
      }
    });

    // Toggle clicked one
    content.classList.toggle("active"); // add remove active class
  });
});
