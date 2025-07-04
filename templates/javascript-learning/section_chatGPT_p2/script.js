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


//====
// let dragged = null;

// const source = document.querySelector(".draggables");
// const dropZone = document.querySelector(".drop-zone");

// function makeRemovable(item) {
//   if (!item.querySelector(".remove-btn")) {
//     const x = document.createElement("span");
//     x.textContent = "❌";
//     x.className = "remove-btn";
//     x.addEventListener("click", () => {
//       source.appendChild(item);
//       x.remove(); // remove the ❌ itself
//     });
//     item.appendChild(x);
//   }
// }

// function setupDrag(item) {
//   item.addEventListener("dragstart", () => {
//     dragged = item;
//     item.classList.add("dragging");
//   });

//   item.addEventListener("dragend", () => {
//     dragged = null;
//     item.classList.remove("dragging");
//   });
// }

// document.querySelectorAll(".draggable").forEach(setupDrag);

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
//     makeRemovable(dragged);
//   }
// });

//====
const source = document.querySelector(".draggables");
const dropZone = document.querySelector(".drop-zone");
let draggedItem = null;

// Setup draggable behavior
function setupDrag(item) {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    draggedItem = null;
    item.classList.remove("dragging");
  });
}

// Make ❌ button
function makeRemovable(item) {
  if (!item.querySelector(".remove-btn")) {
    const btn = document.createElement("span");
    btn.textContent = "❌";
    btn.className = "remove-btn";
    btn.addEventListener("click", () => {
      source.appendChild(item);
      btn.remove();
    });
    item.appendChild(btn);
  }
}

// Drag from source to drop zone
document.querySelectorAll(".draggable").forEach(setupDrag);

// Allow drop & reorder
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  const after = getDropTarget(e.clientY);
  if (after === null) {
    dropZone.appendChild(draggedItem);
  } else {
    dropZone.insertBefore(draggedItem, after);
  }
});

dropZone.addEventListener("drop", () => {
  if (draggedItem) {
    makeRemovable(draggedItem);
  }
});

// Reorder logic helper
function getDropTarget(y) {
  const items = [...dropZone.querySelectorAll(".draggable:not(.dragging)")];
  return items.find(item => {
    const box = item.getBoundingClientRect();
    return y < box.top + box.height / 2;
  }) || null;
}
