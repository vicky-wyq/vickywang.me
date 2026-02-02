"use strict";

const todos = [];

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

function renderTodos() {
  list.innerHTML = "";

  todos.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task;

    const del = document.createElement("button");
    del.textContent = "❌";
    del.addEventListener("click", function () {
      todos.splice(index, 1);
      renderTodos();
    });

    li.appendChild(del);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  const task = input.value.trim();
  if (task) {
    todos.push(task);
    input.value = "";
    renderTodos();
  }
});

