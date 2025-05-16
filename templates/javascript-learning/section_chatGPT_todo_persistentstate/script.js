"use strict";

const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

let tasks = loadTasks(); // ⬅️ Load saved tasks at start

renderTasks();


// add button is like after user input txt, then click, add input data to save task
addButton.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") return; // if entered nothing, finish this function

  tasks.push({ text, done: false }); //understand text, but done:false with comma, it means this including 2 set of data or something? "done: false" is this a first time to create done boolean?
  taskInput.value = "";

  saveTasks();    // this call saveTasks()
  renderTasks();  // this call renderTasks()
  // so when click, everything run once
});


// for ui 
function renderTasks() {
  taskList.innerHTML = ""; // clean up taskList html

  // loop through tasks. add li
  tasks.forEach((task, index) => {
    const li = document.createElement("li"); // new variable li, each li = add new html element
    li.innerText = task.text;
    if (task.done) li.classList.add("done"); // this is css .done class, i double checked css. 

    // another event listerner, first event listerner is about add info to list. this event listerner is about it is rendered, still click to change done/undone. half guessing here
    li.addEventListener("click", () => {
      task.done = !task.done; // click task.done = undone task, then render again
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("span"); // new variable, element created
    deleteBtn.innerText = " ❌"; // add " ❌" to html element. these probably can also do the samething to toggle a css class above, but we wanna explore diff way to deal with this situation 😊
    deleteBtn.style.cursor = "pointer"; 
    deleteBtn.style.marginLeft = "8px";
    // goal is click to delete
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // never see this before
      tasks.splice(index, 1); // not sure what is splice(index, 1). save and render below
      saveTasks(); 
      renderTasks(); 
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("myTasks");
  return stored ? JSON.parse(stored) : [];
}
