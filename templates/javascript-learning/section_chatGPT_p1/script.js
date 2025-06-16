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

const listItems = document.querySelectorAll("#sortable-list li");
let draggedItem = null; // not sure i understand null

listItems.forEach(item => { // loop querySelectorAll
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    // item.classList.add("dragging");
    item.classList.add("drop-target");

  });

  item.addEventListener("dragend", () => {
    draggedItem = null;
    // item.classList.remove("dragging");
    item.classList.remove("drop-target");

  });

  item.addEventListener("dragover", (e) => { // never see the e before
    e.preventDefault(); // Required for drop to work
  });

  item.addEventListener("drop", () => {
    if (draggedItem && draggedItem !== item) { // if change order
      const list = item.parentNode; // what is parentNode
      const items = Array.from(list.children); // what are these???
      const draggedIndex = items.indexOf(draggedItem); 
      const targetIndex = items.indexOf(item);

      if (draggedIndex < targetIndex) {
        list.insertBefore(draggedItem, item.nextSibling);
      } else {
        list.insertBefore(draggedItem, item);
      }
    }
  });
});
