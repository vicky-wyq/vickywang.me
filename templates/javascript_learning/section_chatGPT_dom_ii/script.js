"use strict";

const fruitList = document.querySelector("#fruitList");

const items = ["Apple", "Banana", "Cherry"];

function renderHTML() {
  const itemToHTML = items.map((item) => `<li>${item}</li>`).join("");
  fruitList.innerHTML = itemToHTML;

  console.log(itemToHTML);
}
renderHTML();

// ========================================================
const statusText = document.querySelector("#statusText");
function txtUpdate() {
  statusText.innerText = "Loaded";
}
txtUpdate();
// ========================================================

const statusText1 = document.querySelector("#statusText1");

function addClass() {
  statusText1.classList.add("success");
}
addClass();

// ========================================================

const secret = document.querySelector("#secret");
const toggleBtn = document.querySelector("#toggleBtn");

toggleBtn.addEventListener("click", () => {
  console.log("Button clicked");
  secret.classList.toggle("hidden");
  // secret.classList.remove("hidden");
});

// ========================================================
const taskList = document.querySelector("#taskList");
const addTask = document.querySelector("#addTask");

addTask.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerText = "New Task ";

  const deleteBtn = document.createElement("button"); // we create a btn
  deleteBtn.innerText = "❌"; // make it looks like ❌

  deleteBtn.addEventListener("click", () => {
    li.remove(); // we did not make li why here = remove li?
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
});
// ========================================================
const itemInput = document.querySelector("#itemInput");
const addItem = document.querySelector("#addItem");
const itemList = document.querySelector("#itemList");
itemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem.click(); // ⬅️ simulate button click
  }
});
addItem.addEventListener("click", () => {
  const userInput = itemInput.value.trim();
  if (userInput === "") return;

  const li = document.createElement("li");
  li.innerText = userInput;

  // ✅ Toggle .done on click
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", () => {
    li.remove(); // we did not make li why here = remove li?
  });
  li.appendChild(deleteBtn);

  li.classList.add("flash");
  setTimeout(() => {
  li.classList.remove("flash"); // ⬅️ remove after animation
}, 300);

  itemList.appendChild(li);
  itemInput.value = ""; // clear input
  
});
// ========================================================

const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
// ========================================================

const themeToggle1 = document.querySelector("#themeToggle1");

themeToggle1.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // 🌙 → ☀️ and vice versa
  if (document.body.classList.contains("dark")) {
    themeToggle1.innerText = "☀️ Light Mode";
  } else {
    themeToggle1.innerText = "🌙 Dark Mode";
  }
});
themeToggle.innerText = document.body.classList.contains("dark")
  ? "☀️ Light Mode"
  : "🌙 Dark Mode";
