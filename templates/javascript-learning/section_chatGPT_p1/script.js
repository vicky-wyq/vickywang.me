"use strict";
const passwordInput = document.querySelector("#passwordInput");
const submitBtn = document.querySelector("#submitBtn");
const statusText = document.querySelector("#statusText");

const FAKE_SERVER_PASSWORD = "openSesame";

submitBtn.addEventListener("click", function () {
  const input = passwordInput.value;
  statusText.textContent = "Checking...";
  statusText.className = "";

  setTimeout(function () {
    if (input === FAKE_SERVER_PASSWORD) {
      statusText.textContent = "✅ Access Granted";
      statusText.className = "success";
    } else {
      statusText.textContent = "❌ Wrong Password";
      statusText.className = "error";
    }
  }, 1500); // Simulates server delay
});
