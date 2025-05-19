"use strict";

/*

const sentence = "JavaScript is powerful!";
const itemList = document.querySelector("#itemList");
const boldScript = sentence.slice(4, 10);

const start = sentence.slice(0, 4);     // "Java"
const mid = sentence.slice(4, 10);      // "Script"
const end = sentence.slice(10);         // " is powerful!"

const li = document.createElement("li");
li.innerHTML = `${start}<strong>${mid}</strong>${end}`;
itemList.appendChild(li);



*/
// =================================================

const sentence = "JavaScript is powerful!";
const updateSentence = document.querySelector("#updateSentence");

const front = sentence.slice(0, 4);
const mid = sentence.slice(4, 10);
const back = sentence.slice(10);

console.log(front, mid, back);

const li = document.createElement("li");
li.innerHTML = `${front}<strong>${mid}</strong>${back}`;
updateSentence.appendChild(li);

// =================================================

const colors = "red,green,blue,yellow";
const colorArray = document.querySelector("#colorArray");

const split = colors.split(",");

for (let i = 0; i < split.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = split[i];
  colorArray.appendChild(li);
}

// =================================================
const fruits = ["apple", "banana", "orange"];
const fruitText = document.querySelector("#fruitText");

const joined = fruits.join(" + "); // → "apple + banana + orange"

fruitText.innerText = joined; // ✅ show whole string

// =================================================
const animals = "cat,dog,rabbit,lion";

const splitAnimals = animals.split(",");
splitAnimals.push("elephant");
console.log(splitAnimals);

const joinAnimals = splitAnimals.join(" / ");

console.log(joinAnimals);

const animalText = document.querySelector("#animalText");

animalText.innerText = joinAnimals;

// =================================================

// link html
const userInput = document.querySelector("#userInput");
const convertButton = document.querySelector("#convertButton");
const resultList = document.querySelector("#resultList");

//
convertButton.addEventListener("click", function () {
  const inputArr = userInput.value.split(",");
  console.log(inputArr);

  for (let i = 0; i < inputArr.length; i++) {
    let clean = inputArr[i].trim();
    console.log(clean);
  }


resultList.innerHTML = "";
for (let i = 0; i < inputArr.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = inputArr[i];
  resultList.appendChild(li);
}

});

// =================================================

const enteredValue = document.querySelector("#userInput");
const button = document.querySelector("#convertButton");
const returnedList = document.querySelector("#resultList");
convertButton.addEventListener("click", function () {


};