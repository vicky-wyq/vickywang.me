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

  if (strength <= 1) { // <1 then it will be nothing lol
    strengthText.textContent = "Strength: Weak";
    strengthBar.className = "weak";
  } else if (strength === 2 || strength === 3) { // got it
    strengthText.textContent = "Strength: Medium";
    strengthBar.className = "medium";
  } else {
    strengthText.textContent = "Strength: Strong"; 
    strengthBar.className = "strong";
  }
});



const passwordInputToggle = document.querySelector("#passwordInput");
const toggleBtn = document.querySelector("#toggleBtn"); 

toggleBtn.addEventListener("click", function () { 
  const isHidden = passwordInputToggle.type === "password"; // are you saying here by default = hidden, when passwordInputToggle.type not equal to "password"? after click show?

  passwordInputToggle.type = isHidden ? "text" : "password"; 
  toggleBtn.textContent = isHidden ? "Hide" : "Show";
});
