"use strict";

const tagSelect = document.querySelector("#tagSelect");
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

const tags = [
  { id: 1, label: "Groceries" },
  { id: 2, label: "Health" },
  { id: 3, label: "Learning" },
];

let tasks = loadTasks(); // replaces: let tasks = [];
renderTasks();

function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("myTasks");
  return stored ? JSON.parse(stored) : [];
}

addButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const tagId = Number(tagSelect.value);

  if (text === "") return;

  tasks.push({ text, done: false, tagId });
  saveTasks();

  taskInput.value = "";
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  /*
    tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const tag = tags.find(t => t.id === task.tagId);
    const tagLabel = tag ? tag.label : "Unlabeled";

    li.innerText = `${task.text} (${tagLabel})`;

    // Optional: add toggle + delete logic here
    taskList.appendChild(li);
  });
  */
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Create tag dropdown for this task
    const select = document.createElement("select");

    tags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag.id;
      option.innerText = tag.label;
      if (tag.id === task.tagId) option.selected = true;
      select.appendChild(option);
    });

    // When user changes tag, update the task’s tagId
    select.addEventListener("change", function () {
      task.tagId = Number(select.value);
      saveTasks();
      renderTasks(); // Re-render to reflect new label
    });

    li.appendChild(select);
    li.append(" " + task.text); // ← this keeps the text *after* the dropdown
    taskList.appendChild(li);
  });
}
