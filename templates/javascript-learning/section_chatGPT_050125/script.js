"use strict";
/*
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

addButton.addEventListener("click", function () {
  const task = taskInput.value.trim();

  if (task === "") return;

  // Step 1: create a <li> element
  const li = document.createElement("li");

  // Step 2: set its text
  li.innerText = task;

  // delete list via btn
  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = " ❌";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.marginLeft = "8px";
  deleteBtn.addEventListener("click", function (event) {
    li.remove();
    event.stopPropagation(); // optional if we later add li toggle behavior
  });
  li.addEventListener("click", function () {
    li.classList.toggle("done");
  });
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  // Step 3: append it to taskList
  taskList.appendChild(li);
  taskInput.value = "";
});
*/

"use strict";

const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

let tasks = []; // ⬅️ This is your model

// 🔁 1. RENDER FUNCTION
function renderTasks() {
  taskList.innerHTML = ""; // clear first

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.innerText = task.text;
    if (task.done) li.classList.add("done");

    // ✅ click = toggle done
    li.addEventListener("click", function () {
      task.done = !task.done;
      renderTasks();
    });

    // ❌ delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = " ❌";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "8px";
    deleteBtn.addEventListener("click", function (event) {
      tasks.splice(index, 1); // ⬅️ remove from array
      renderTasks();
      event.stopPropagation();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// ➕ 2. ADD BUTTON HANDLER
addButton.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text: text, done: false }); // ⬅️ add to array
  taskInput.value = "";
  renderTasks(); // ⬅️ rebuild view
});
