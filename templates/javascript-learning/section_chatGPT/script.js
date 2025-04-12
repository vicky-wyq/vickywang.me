"use strict";

const employees = [
  { name: "Vicky", department: "Design", salary: 85000 },
  { name: "Jonas", department: "Engineering", salary: 65000 },
  { name: "Amy", department: "Design", salary: 95000 },
  { name: "Peter", department: "Marketing", salary: 40000 },
  { name: "Tom", department: "Engineering", salary: 72000 }
];



const calcSalary = employees.reduce((total, emp1, emp2) => {

  if (!emp1.department) {
    emp1.department = emp2.salary;
  } else {
    emp1.department += emp2.salary;
  }

  return total + emp2.salary;
  
}, 0);

console.log(calcSalary);

