"use strict";
let dragged = null;

const items = document.querySelectorAll(".draggable");
const dropZone = document.querySelector(".drop-zone");

items.forEach(item => {
  item.addEventListener("dragstart", () => {
    dragged = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    dragged = null;
    item.classList.remove("dragging");
  });
});

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
    dragged.setAttribute("draggable", "true"); // just in case
  }
});
