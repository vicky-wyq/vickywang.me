"use strict";
const display = document.querySelector("#display"); // Where the number shows.
const addBtn = document.querySelector("#addBtn"); // Click to +1.
const reduceBtn = document.querySelector("#reduceBtn"); // Click to -1.
const resetBtn = document.querySelector("#resetBtn"); // Click to reset to 0.
const feedback = document.querySelector("#feedback");

let count = 0;
addBtn.addEventListener("click", function () {
  if (count < 10) {
    count = count + 1;
    console.log(count);
    display.innerText = count;
  } else {
    // addBtn.style.backgroundColor = "red";
    addBtn.classList.add("disabledBtn");

    showFeedback();
  }
});
reduceBtn.addEventListener("click", function () {
  if (count > 0) {
    count = count - 1;
    display.innerText = count;
  } else {
    // reduceBtn.style.backgroundColor = "red";
    reduceBtn.classList.add("disabledBtn");
    showFeedback();
  }
});

function showFeedback() {
  feedback.classList.remove("hidden");
}

//disabledBtn
resetBtn.addEventListener("click", function () {
  count = 0;
  display.innerText = count;
  addBtn.classList.remove("disabledBtn");

  reduceBtn.classList.remove("disabledBtn");
  feedback.classList.add("hidden"); // show
});
