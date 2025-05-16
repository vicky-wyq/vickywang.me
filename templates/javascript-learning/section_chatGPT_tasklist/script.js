"use strict";
const tasks = [
  { text: "Buy eggs", done: false, tagId: 1 },
  { text: "Workout", done: true, tagId: 2 },
  { text: "Read book", done: false, tagId: 3 }
];

const tags = [
  { id: 1, label: "Groceries" },
  { id: 2, label: "Health" },
  { id: 3, label: "Learning" }
];
const list = document.querySelector("#taskList");

tasks.forEach(task => {
  const li = document.createElement("li");

  const tag = tags.find(t => t.id === task.tagId); // ← sync by id
  const tagLabel = tag ? tag.label : "Unlabeled";

  li.innerText = `${task.text} (${tagLabel})`;

  list.appendChild(li);
});
