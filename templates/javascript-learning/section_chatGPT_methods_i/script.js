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

const enteredValue = document.querySelector("#enteredValue");
const button = document.querySelector("#button");
const returnedList = document.querySelector("#returnedList");

button.addEventListener("click", function () {
  const convertToArr = enteredValue.value.split(",");
  console.log(convertToArr); // why here is array

  returnedList.innerHTML = "";
  for (let i = 0; i < convertToArr.length; i++) {
    const cleanValue = convertToArr[i].trim();
    console.log(cleanValue); // why trim made array disappeared?

    const li = document.createElement("li");
    li.innerText = cleanValue;
    returnedList.appendChild(li);
  }
});



/* my version
const rawNames = "alice, bob, charlie, dave";

const splitName = rawNames.split(",");
console.log(splitName);

const trimName = [];

for (let i = 0; i < splitName.length; i++) {
  const trimmed = splitName[i].trim();
  if (trimmed !== "") {
    trimName.push(trimmed);
  }
}
console.log(trimName);

const sliceName = [];
for (let i = 0; i < trimName.length; i++) {
  const sliced = trimName.slice([i], [i + 1]);
  sliceName.push(sliced);
}
console.log(sliceName);

const format = sliceName[0].toUpperCase();

console.log(format);

const joinData = format.Join();

*/

const rawNames = "alice, bob, charlie, dave";
const splitName = rawNames.split(",");
const cleanedNames = [];

for (let i = 0; i < splitName.length; i++) {
  const trimmed = splitName[i].trim();
  if (trimmed !== "") {
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    cleanedNames.push(capitalized);
  }
}

const joinedArr = cleanedNames.join(", ");
console.log(joinedArr); // → "Alice, Bob, Charlie, Dave"


const names = rawNames
  .split(",")
  .map(name => name.trim())
  .filter(name => name !== "")
  .map(name => name.charAt(0).toUpperCase() + name.slice(1))
  .join(", ");
console.log(names);


const oneName = "samantha";


const firstCharacter = oneName.charAt(0); 
console.log(firstCharacter);


const cap = firstCharacter.charAt(0).toUpperCase(); 
console.log(cap);

const restCharacters = oneName.slice(1);

console.log(restCharacters);

console.log(cap + restCharacters);



const anotherName = ["samantha"]

const mapName = anotherName

  .map(name => name.charAt(0).toUpperCase() + name.slice(1));

  console.log(mapName);
console.log(mapName.join()); 

// ====================


const nameList = ["samantha", "charlie", "dave"];

const capitalized = nameList.map(name =>
  name.charAt(0).toUpperCase() + name.slice(1)
);

console.log(capitalized); // → ["Samantha", "Charlie", "Dave"]


const anotherNameList = ["samantha", "charlie", "dave"];

const cap1 = anotherNameList.map(name=>name.charAt(0).toUpperCase() + name.slice(1)

)
