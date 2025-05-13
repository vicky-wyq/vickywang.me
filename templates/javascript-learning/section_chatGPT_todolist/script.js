"use strict";

const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const filterType = document.querySelector("#filterType");
const sortType = document.querySelector("#sortType");
sortType.addEventListener("change", renderTasks);





let tasks = [{ text: "Buy eggs", done: false }];

function renderTasks() {
  
  taskList.innerHTML = "";

  let filtered = tasks;

  if (filterType.value === "done") {
    filtered = tasks.filter(task => task.done);
  } else if (filterType.value === "todo") {
    filtered = tasks.filter(task => !task.done);
  }

  if (sortType.value === "az") {
    filtered.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortType.value === "za") {
    filtered.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sortType.value === "newest") {
    filtered.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortType.value === "oldest") {
    filtered.sort((a, b) => a.createdAt - b.createdAt);
  }
  




  for (let i = 0; i < filtered.length; i++) {
    const task = filtered[i];
    const li = document.createElement("li");
    li.innerText = task.text;
    if (task.done) li.classList.add("done");

    li.addEventListener("click", function () {
      const realIndex = tasks.indexOf(task); // find actual task in full array
      tasks[realIndex].done = !tasks[realIndex].done;
      renderTasks();
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = " ❌";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "8px";

    deleteBtn.addEventListener("click", function (event) {
      const realIndex = tasks.indexOf(task);
      tasks.splice(realIndex, 1);
      renderTasks();
      event.stopPropagation();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

// ✅ Register ONCE — outside renderTasks
addButton.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text: text,
    done: false,
    createdAt: Date.now()
  });

  taskInput.value = "";
  renderTasks();
});



renderTasks();



/*
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
