"use strict";
// let dragged = null;

// const items = document.querySelectorAll(".draggable");
// const dropZone = document.querySelector(".drop-zone");

// items.forEach(item => {
//   item.addEventListener("dragstart", () => {
//     dragged = item;
//     item.classList.add("dragging");
//   });

//   item.addEventListener("dragend", () => {
//     dragged = null;
//     item.classList.remove("dragging");
//   });
// });

// dropZone.addEventListener("dragover", e => {
//   e.preventDefault();
//   dropZone.classList.add("active");
// });

// dropZone.addEventListener("dragleave", () => {
//   dropZone.classList.remove("active");
// });

// dropZone.addEventListener("drop", () => {
//   dropZone.classList.remove("active");
//   if (dragged) {
//     dropZone.appendChild(dragged);
//     dragged.setAttribute("draggable", "true"); // just in case
//   }
// });
let dragged = null;

const source = document.querySelector(".draggables");
const dropZone = document.querySelector(".drop-zone");

function makeRemovable(item) {
  if (!item.querySelector(".remove-btn")) {
    const x = document.createElement("span");
    x.textContent = "❌";
    x.className = "remove-btn";
    x.addEventListener("click", () => {
      source.appendChild(item);
      x.remove(); // remove the ❌ itself
    });
    item.appendChild(x);
  }
}

function setupDrag(item) {
  item.addEventListener("dragstart", () => {
    dragged = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    dragged = null;
    item.classList.remove("dragging");
  });
}

document.querySelectorAll(".draggable").forEach(setupDrag);

dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.classList.add("active");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("active");
});

dropZone.addEventListener("drop", () => {
  dropZone.classList.remove("active");
  if (dragged) {
    dropZone.appendChild(dragged);
    makeRemovable(dragged);
  }
});
