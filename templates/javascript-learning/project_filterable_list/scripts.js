"use strict";

const employees = [
  { name: "Vicky", department: "Design" },
  { name: "Jonas", department: "Engineering" },
  { name: "Amy", department: "Design" },
  { name: "Peter", department: "Marketing" },
  { name: "Tom", department: "Engineering" },
];
const listEl = document.getElementById("employee-list");

function renderList(data) {
  listEl.innerHTML = ""; // clear old list first

  data.forEach(function (emp) {
    const li = document.createElement("li");
    li.textContent = `${emp.name} (${emp.department})`;
    listEl.appendChild(li);
  });
}

// render the full list on page load
renderList(employees);

const buttons = document.querySelectorAll("#buttons button");

buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const dept = btn.dataset.dept;

    if (dept === "All") {
      renderList(employees);
    } else {
      const filtered = employees.filter(function (emp) {
        return emp.department === dept;
      });

      renderList(filtered);
    }
  });
});
