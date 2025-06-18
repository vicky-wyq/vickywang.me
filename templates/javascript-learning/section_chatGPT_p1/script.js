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
  e.target.classList.add("dragging");
  

  setTimeout(() => (draggedItem.style.display = "none"), 0); // hide original while dragging
});

list.addEventListener("dragend", () => {
    draggedItem.classList.remove("dragging");

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
  const items = [
    ...container.querySelectorAll(
      "li:not(.placeholder):not([style*='display: none'])"
    ),
  ];

  return items.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//==================================================================
// const box = document.querySelector("#dragBox");
// const zone = document.querySelector("#dropZone");

// box.addEventListener("dragstart", function () {
//   box.classList.add("dragging");
// });

// box.addEventListener("dragend", function () {
//   box.classList.remove("dragging");
// });

// // Allow drop
// zone.addEventListener("dragover", function (e) {
//   e.preventDefault(); // required
//   zone.classList.add("active");
// });

// zone.addEventListener("dragleave", function () {
//   zone.classList.remove("active");
// });

// // On drop: move the box
// zone.addEventListener("drop", function () {
//   zone.classList.remove("active");
//   zone.appendChild(box);
// });



//===
let draggedItem1 = null; // buila variable as toggle for future use?

const item = document.querySelector(".draggable");
const zone = document.querySelector(".drop-zone");

item.addEventListener("dragstart", function () {
  draggedItem1 = item; // why we need to update draggedItem1 = item or not?
  item.classList.add("dragging"); 
});

item.addEventListener("dragend", function () {
  draggedItem1 = null; // why we need to tracking this?
  item.classList.remove("dragging"); // without draggedItem1 variable still works befor
});

zone.addEventListener("dragover", function (e) {
  e.preventDefault();  // override default browser setting?
  zone.classList.add("active"); // understand, zone has hover effect
});

zone.addEventListener("dragleave", function () {
  zone.classList.remove("active"); // remove class same like before
});

zone.addEventListener("drop", function () {
  if (draggedItem1) { // i believe here is the place for draggedItem1 variable, so if draggedItem1 not null, then add Child(draggedItem1) when drop?
    zone.appendChild(draggedItem1); // 🎯 Drop logic
  }
  zone.classList.remove("active"); // Reset visual, got it
});
