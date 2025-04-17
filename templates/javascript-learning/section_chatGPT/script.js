"use strict";
/*
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
 */

// ======= lesson 1

// Select elements
const title = document.querySelector('#main-title');
const button = document.querySelector('#change-btn');

// Add click interaction
button.addEventListener('click', function () {
  title.textContent = 'You Clicked!';
  title.style.color = '#13fc03';
});
// ======= lesson 2 =========


const titlel2 = document.querySelector('#main-title-l2');
const buttonl2 = document.querySelector('#toggle-btn-l2');

buttonl2.addEventListener('click', function () {
  titlel2.classList.toggle('highlight');
});
// ======= lesson 3 =========
const multiTitle = document.querySelector('#multi-title');
const multiBtn = document.querySelector('#multi-btn');

multiBtn.addEventListener('click', function () {
  multiTitle.classList.toggle('colorChange');
  multiTitle.classList.toggle('bigText');
});

// ======= lesson 4 =========


const titlel4 = document.querySelector('#multi-title-l4');
const buttonl4 = document.querySelector('#multi-btn-l4');

buttonl4.addEventListener('click', function () {
  titlel4.classList.add('colorChange-l4');
  titlel4.classList.remove('bigText-l4');
});
// ======= lesson 5 =========


const titlel5 = document.querySelector('#multi-title-l5');
const buttonl5 = document.querySelector('#multi-btn-l5');

buttonl5.addEventListener('click', function () {
  if (titlel5.classList.contains('bigText-l5')) {
    titlel5.classList.remove('bigText-l5');
  } else {
    titlel5.classList.add('bigText-l5');
  }
});
// ======= lesson 6 =========


const titlel6 = document.querySelector('#multi-title-l6');
const buttonl6 = document.querySelector('#multi-btn-l6');

buttonl6.addEventListener('click', function () {
  if (titlel6.classList.contains('bigText-l6')) {
    titlel6.classList.remove('bigText-l6');
    buttonl6.textContent = 'Enlarge';
  } else {
    titlel6.classList.add('bigText-l6');
    buttonl6.textContent = 'Shrink';
  }
});
// ======= lesson 7 =========
const titlel7 = document.querySelector('#title-l7');
const buttonl7 = document.querySelector('#btn-l7');

// 1. Check saved state on load
if (localStorage.getItem('isBig') === 'true') {
  titlel7.classList.add('bigText-l7');
  buttonl7.textContent = 'Shrink';
}

// 2. Handle toggle + save
buttonl7.addEventListener('click', function () {
  const isBig = title.classList.toggle('bigText-l7');
  buttonl7.textContent = isBig ? 'Shrink' : 'Enlarge';
  localStorage.setItem('isBig', isBig); // save boolean as string
});
