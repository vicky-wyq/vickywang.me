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
const source = document.querySelector(".draggables"); // this is entired <div> as one element, not an array
const dropZone = document.querySelector(".drop-zone");
let draggedItem = null; // set item = null to begin with

// Setup draggable behavior
function setupDrag(item) { // not sure why "document.querySelectorAll(".draggable").forEach(setupDrag);" is below this function, base on this querySelectorAll, we loop through each of the item when items added from html, then call this fcuntion: setupDrag 
  item.addEventListener("dragstart", () => {
    draggedItem = item; // when drag started, draggedItem variable = item, the item is currently being draged
    item.classList.add("dragging"); // add class
  });

  item.addEventListener("dragend", () => { // when finished dragging, draggedItem = no item being selected(null)
    draggedItem = null;
    item.classList.remove("dragging"); // no one being selected, remove this dragging class
  });
}

// Make ❌ button
function makeRemovable(item) { 
  if (!item.querySelector(".remove-btn")) { // if the item not the item as selected, then add a delect btn
    const btn = document.createElement("span"); // build a new variable as html element span, named btn
    btn.textContent = "❌"; // add txt x to this btn
    btn.className = "remove-btn"; // add class with link to css
    btn.addEventListener("click", () => {
      source.appendChild(item); // when click btnm add child  "source.appendChild(item)" not sure where this item came from
      btn.remove();
    });
    item.appendChild(btn); // add btn
  }
}

// Drag from source to drop zone
document.querySelectorAll(".draggable").forEach(setupDrag); // call function above

// Allow drop & reorder
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  const after = getDropTarget(e.clientY); // what is e.clientY🙃
  if (after === null) { //😵‍💫 not sure i understand. since i do not understand line above, i also not understand "    dropZone.insertBefore(draggedItem, after);
"
    dropZone.appendChild(draggedItem);
  } else {
    dropZone.insertBefore(draggedItem, after);
  }
});

dropZone.addEventListener("drop", () => {
  if (draggedItem) { // if draggedItem exist? do "    makeRemovable(draggedItem);" but what is     makeRemovable(draggedItem);

    makeRemovable(draggedItem);
  }
});

// Reorder logic helper
function getDropTarget(y) { // completly lost here
  const items = [...dropZone.querySelectorAll(".draggable:not(.dragging)")];
  return items.find(item => {
    const box = item.getBoundingClientRect();
    return y < box.top + box.height / 2;
  }) || null;
}
