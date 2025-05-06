"use strict";

const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

let tasks = [];


tasks.push("Buy eggs"); // manually add a task
tasks.push("Buy apple"); // manually add a task




addButton.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") return;



  // update model

  for (let i = 0; i < tasks.length; i++) {
  
    const li = document.createElement("li");
    li.innerText = tasks[i];
    tasks.push(text);     
    taskList.appendChild(li);
  }

// clear input
  taskInput.value = ""; 
  renderTasks();        // update view




  
});





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
