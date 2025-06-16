"use strict";
const passwordInput = document.querySelector("#passwordInput");
const submitBtn = document.querySelector("#submitBtn");
const statusText = document.querySelector("#statusText");
const spinner = document.querySelector("#spinner");

submitBtn.addEventListener("click", function () {
  statusText.textContent = "";
  spinner.classList.remove("hidden");
  submitBtn.disabled = true; // ⛔ Disable button

  setTimeout(function () {
    spinner.classList.add("hidden");
    submitBtn.disabled = false; // ✅ Re-enable button

    const value = passwordInput.value;
    if (value === "letmein") {
      statusText.textContent = "✅ Access granted";
      statusText.className = "success";
    } else {
      statusText.textContent = "❌ Access denied";
      statusText.className = "error";
    }
  }, 2000);
});

//==================================================================
const list = document.getElementById("sortable-list");
let draggedItem = null;
let placeholder = document.createElement("li");
placeholder.className = "placeholder";

list.addEventListener("dragstart", (e) => {
  draggedItem = e.target;
  setTimeout(() => draggedItem.style.display = "none", 0); // hide original while dragging
});

list.addEventListener("dragend", () => {
  draggedItem.style.display = "block";
  draggedItem = null;
  placeholder.remove(); // remove gap
});

list.addEventListener("dragover", (e) => {
  e.preventDefault();

  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement === null) {
    list.appendChild(placeholder);
  } else {
    list.insertBefore(placeholder, afterElement);
  }
});

list.addEventListener("drop", () => {
  list.insertBefore(draggedItem, placeholder);
  placeholder.remove();
});
function getDragAfterElement(container, y) {
  const items = [...container.querySelectorAll("li:not(.placeholder):not([style*='display: none'])")];

  return items.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
