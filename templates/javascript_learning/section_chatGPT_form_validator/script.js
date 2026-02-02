"use strict";
const input = document.querySelector("#emailInput");
const feedback = document.querySelector("#emailFeedback");

input.addEventListener("input", () => {
  const value = input.value.trim();

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (value === "") {
    feedback.innerText = "";
  } else if (isValid) {
    feedback.innerText = "✅ Valid email";
    feedback.style.color = "green";
  } else {
    feedback.innerText = "❌ Invalid email";
    feedback.style.color = "red";
  }
});
