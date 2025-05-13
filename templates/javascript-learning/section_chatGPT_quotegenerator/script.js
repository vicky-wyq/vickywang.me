"use strict";

const input = document.querySelector("#usernameInput");
const button = document.querySelector("#searchButton");
const result = document.querySelector("#resultArea");

button.addEventListener("click", async function () {
  const username = input.value.trim();
  if (username === "") return;

  result.innerText = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    result.innerHTML = `
      <p><strong>Name:</strong> ${data.name || "(no name found)"}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
      <img src="${data.avatar_url}" width="100" />
    `;
  } catch (err) {
    result.innerText = "❌ " + err.message;
  }
});
