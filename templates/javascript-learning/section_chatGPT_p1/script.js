"use strict";
const passwordInput = document.querySelector("#passwordInput");
const submitBtn = document.querySelector("#submitBtn");
const statusText = document.querySelector("#statusText");
const spinner = document.querySelector("#spinner");

submitBtn.addEventListener("click", function () {
  statusText.textContent = "";
  spinner.classList.remove("hidden");
  submitBtn.disabled = true; // ⛔ Disable button

  setTimeout(function () {
    spinner.classList.add("hidden");
    submitBtn.disabled = false; // ✅ Re-enable button

    const value = passwordInput.value;
    if (value === "letmein") {
      statusText.textContent = "✅ Access granted";
      statusText.className = "success";
    } else {
      statusText.textContent = "❌ Access denied";
      statusText.className = "error";
    }
  }, 2000);
});
