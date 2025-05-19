"use strict";
//Setup
const items = ["Apple", "Banana", "Avocado", "Orange", "Grapes"];

const input = document.querySelector("#searchInput");
const list = document.querySelector("#itemList");

input.addEventListener("input", function () {
  //filtering
  const keyword = input.value.trim().toLowerCase();
  const filtered = items.filter((item) => item.toLowerCase().includes(keyword));

  // render
  list.innerHTML = ""; // clear list
  filtered.forEach((item) => {
    const li = document.createElement("li");
    const start = item.toLowerCase().indexOf(keyword);
    if (start !== -1 && keyword !== "") {
      const end = start + keyword.length;
      li.innerHTML =
        item.slice(0, start) +
        "<mark>" +
        item.slice(start, end) +
        "</mark>" +
        item.slice(end);
    } else {
      li.innerText = item;
    }
    list.appendChild(li);
  });
  // empty state
  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.innerText = "No matches found.";
    list.appendChild(li);
  }
});
