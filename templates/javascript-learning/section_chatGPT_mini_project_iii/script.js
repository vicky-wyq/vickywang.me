"use strict";
const display = document.querySelector("#display"); // Where the number shows.
const addBtn = document.querySelector("#addBtn"); // Click to +1.
const reduceBtn = document.querySelector("#reduceBtn"); // Click to -1.
const resetBtn = document.querySelector("#resetBtn"); // Click to reset to 0.
const feedback = document.querySelector("#feedback");

const progressBar = document.querySelector("#progressBar");

/*
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
 */

let count = 0;

const MAX = 10;

function updateDisplay() {
  display.innerText = count;
  feedback.classList.add("hidden");

  // Button disable logic
  addBtn.disabled = count >= MAX;
  reduceBtn.disabled = count <= 0;

  // Progress bar update
  const percent = (count / MAX) * 100; // why * 100?
  progressBar.style.width = percent + "%"; // why percent + "%"
}

addBtn.addEventListener("click", function () {
  if (count < MAX) {
    count++;
    updateDisplay();
  } else {
    showFeedback();
  }
});

reduceBtn.addEventListener("click", function () {
  if (count > 0) {
    count--;
    updateDisplay();
  } else {
    showFeedback();
  }
});

resetBtn.addEventListener("click", function () {
  count = 0;
  updateDisplay();
});

function showFeedback() {
  feedback.classList.remove("hidden");
}

// ===========================================================================
const slider = document.querySelector("#volume");
const volumeValue = document.querySelector("#volumeValue");

slider.addEventListener("input", function () {
  volumeValue.textContent = slider.value;
});

// ===========================================================================
// 📌 First loop = reset all 📌 Second step = activate clicked one
const lights = document.querySelectorAll(".light");
console.log(lights);
for (let i = 0; i < lights.length; i++) {
  let light = lights[i];

  light.addEventListener("click", function () {
    // Turn off all lights first
    for (let j = 0; j < lights.length; j++) {
      lights[j].classList.remove("on");
    }

    // Then turn on the clicked one
    light.classList.add("on");
  });
}
// toggle

const lights1 = document.querySelectorAll(".panel");
for (let i = 0; i < lights1.length; i++) {
  let light = lights1[i];
  light.addEventListener("click", function () {
    light.classList.toggle("on1"); // just toggle this one
  });
}
// ===========================================================================

// add stars into js
// loop through stars, check which one is clicked
// from the one being clicked, fill all starts before or equal that click

const stars = document.querySelectorAll(".star"); // ★
const feedbackStar = document.querySelector("#feedbackStar");

for (let i = 0; i < stars.length; i++) {
  let star = stars[i];

  star.addEventListener("click", function () {
    for (let k = 0; k < stars.length; k++) {
      stars[k].innerText = "☆";
    }

    for (let j = 0; j <= i; j++) {
      stars[j].innerText = "★";
    }
    feedbackStar.innerText = `You rated: ${i + 1} star${i > 0 ? "s" : ""}`;
  });
}

// ===========================================================================

const box = document.querySelector("#box");
const colorBtns = document.querySelectorAll(".colorBtn");

for (let i = 0; i < colorBtns.length; i++) {
  const btn = colorBtns[i];

  btn.addEventListener("click", function () {
    const selectedColor = btn.getAttribute("data-color");
    box.style.backgroundColor = selectedColor;

    // Restart animation
    box.classList.remove("animate");
    void box.offsetWidth; // 💡 forces reflow
    box.classList.add("animate");

    const clickSound = document.querySelector("#clickSound");
    clickSound.currentTime = 0; // rewind if already playing
    clickSound.play();
  });
}
