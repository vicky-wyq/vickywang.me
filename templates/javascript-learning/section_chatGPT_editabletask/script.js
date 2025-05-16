"use strict";

const taskInput = document.querySelector("#taskInput");
const tagSelect = document.querySelector("#tagSelect");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

const tags = [
  { id: 1, label: "Groceries" },
  { id: 2, label: "Health" },
  { id: 3, label: "Learning" }
];

let tasks = [];


addButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const tagId = Number(tagSelect.value);

  if (text === "") return;

  tasks.push({ text, done: false, tagId });
  taskInput.value = "";
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const tag = tags.find(t => t.id === task.tagId);
    const tagLabel = tag ? tag.label : "Unlabeled";

    li.innerText = `${task.text} (${tagLabel})`;

    // Optional: add toggle + delete logic here
    taskList.appendChild(li);
  });
}
