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
    li.innerText = item;
    list.appendChild(li);
  });
});
