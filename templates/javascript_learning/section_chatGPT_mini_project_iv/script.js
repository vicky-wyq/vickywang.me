"use strict";
const passwordInput = document.querySelector("#password");
const strengthText = document.querySelector("#strengthText");
const strengthBar = document.querySelector("#strengthBar");

passwordInput.addEventListener("input", function () {
  const value = passwordInput.value; // got value from input
  let strength = 0; // is this default value? not ui, just js value?

  if (value.length >= 6) strength++; // understand
  if (/[A-Z]/.test(value)) strength++; // first time saw "/[A-Z]/" "/[0-9]/" "/[^A-Za-z0-9]/"
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  if (strength <= 1) {
    // <1 then it will be nothing lol
    strengthText.textContent = "Strength: Weak";
    strengthBar.className = "weak";
  } else if (strength === 2 || strength === 3) {
    // got it
    strengthText.textContent = "Strength: Medium";
    strengthBar.className = "medium";
  } else {
    strengthText.textContent = "Strength: Strong";
    strengthBar.className = "strong";
  }
});

// ========

const passwordInputToggle = document.querySelector("#passwordInput");
const toggleBtn = document.querySelector("#toggleBtn");

toggleBtn.addEventListener("click", function () {
  const isHidden = passwordInputToggle.type === "password";

  if (isHidden) {
    // here if hidden or not hidden? current default value = "password" === hidden, then why below is passwordInputToggle.type = "text"
    passwordInputToggle.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInputToggle.type = "password";
    toggleBtn.textContent = "Show";
  }
});
// ========

const toggleSecretBtn = document.querySelector("#toggleSecretBtn");
const message = document.querySelector("#secretMessage");

toggleSecretBtn.addEventListener("click", function () {
  const isHidden = message.classList.contains("hidden");

  if (isHidden) {
    message.classList.remove("hidden"); // Show the message
    toggleSecretBtn.textContent = "Hide Message"; // Update button
  } else {
    message.classList.add("hidden"); // Hide the message
    toggleSecretBtn.textContent = "Show Message"; // Update button
  }
});

// ========


const passwordInput1 = document.querySelector("#passwordInput1");
const unlockBtn = document.querySelector("#unlockBtn");
const box = document.querySelector("#box");
const feedback = document.querySelector("#feedback");

const SECRET = "openSesame";

unlockBtn.addEventListener("click", function () {
  const entered = passwordInput1.value;

  if (entered === SECRET) {
    box.classList.remove("hidden");
    feedback.classList.add("hidden"); 
  } else {
    box.classList.add("hidden");
    feedback.classList.remove("hidden");
  }
});
