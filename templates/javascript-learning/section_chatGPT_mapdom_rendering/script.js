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
  taskList.innerHTML = `<li>New Task</li>`;


});
