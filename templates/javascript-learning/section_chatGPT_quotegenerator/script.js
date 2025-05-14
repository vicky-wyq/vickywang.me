"use strict";

const button = document.querySelector("#quoteButton");
const quoteArea = document.querySelector("#quoteArea");

button.addEventListener("click", async function () {
  quoteArea.innerText = "Loading...";

  try {
    const response = await fetch("https://thequoteshub.com/api/");
    const data = await response.json(); // ✅ single quote object
    // console.log(data);

    quoteArea.innerHTML = `
    <p>"${data.text}"</p>
    <p><strong>— ${data.author || "Unknown"}</strong></p>
  `;
  } catch (err) {
    quoteArea.innerText = "❌ Failed to load quote.";
  }
});
