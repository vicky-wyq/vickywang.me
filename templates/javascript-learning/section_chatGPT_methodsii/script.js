"use strict";

// ========================================================================
const scores = [10, 20, 15, 5];

const array = scores;

const total = scores.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

console.log(total); // → 50

// alt: const total = scores.reduce((a, c) => a + c, 0);

// ========================================================================

const words = ["JavaScript", "is", "fun"];
const trimArr = words.reduce((accumulator, current) => {
  return accumulator + " " + current;
});

console.log(trimArr);

const trimArray = ["JavaScript", "is", "fun"].reduce(
  (acc, curr) => acc + " " + curr
);
console.log(trimArray);
// ========================================================================

const nums = [2, 3, 4];

const multiply = nums.reduce((accumulator, current) => {
  return accumulator * current;
}, 1);

console.log(multiply);
// ========================================================================

const players = [
  { name: "Alice", score: 10 },
  { name: "Bob", score: 20 },
  { name: "Charlie", score: 15 },
];
const totalScore = players.reduce((accumulator, current) => {
  return accumulator + current.score;
}, 0);

console.log(totalScore);

// ========================================================================

const players1 = [
  { name: "Alice", team: "Red" },
  { name: "Bob", team: "Blue" },
  { name: "Charlie", team: "Red" },
  { name: "David", team: "Blue" },
  { name: "Eve", team: "Green" },
];

const regroup = players1.reduce((acc, current) => {
  const team = current.team;

  // If team doesn't exist yet in acc, create it
  if (!acc[team]) {
    acc[team] = [];
  }

  // Push player name to correct team array
  acc[team].push(current.name);

  return acc;
}, {}); // Start with an empty object

console.log(regroup);
// ========================================================================

const names = ["Alice", "Bob", "Amanda", "Charlie", "David", "Becky"];
/*
{
  A: ["Alice", "Amanda"],
  B: ["Bob", "Becky"],
  C: ["Charlie"],
  D: ["David"]
}
*/

const grouped = names.reduce((acc, name) => {
  const first = name.charAt(0); //store first letter
  if (!acc[first]) {
    // if acc name first char does not including itself,
    acc[first] = []; // If there’s not already a group in acc for this letter, create an empty array
  }

  acc[first].push(name);
  return acc;
}, {}); // start with an empty object {}

console.log(grouped);

// =======================================================================

const groupedNames = {
  A: ["Alice", "Amanda"],
  B: ["Bob", "Becky"],
  C: ["Charlie"],
  D: ["David"],
};

const objValue = Object.values(groupedNames);
console.log(`--- obj value ---${objValue}`);

const flatten = objValue.flat();
console.log(`--- flatten ---${flatten}`);

const flattenArr = objValue.reduce((acc, nameGroup) => {
  return acc.concat(nameGroup);
}, []);
console.log(flattenArr);

// =======================================================================

const nested = [["a", "b"], ["c"], ["d", "e", "f"]];
const takeValue = Object.values(nested);
console.log(`--- value from nested arr ---${takeValue}`);

const buildArr = takeValue.reduce((acc, nameGroup) => {
  return acc.concat(nameGroup);
}, []);
console.log(buildArr);

// =======================================================================
const playersTeams = [
  { name: "Alice", team: "Red" },
  { name: "Bob", team: "Blue" },
  { name: "Charlie", team: "Red" },
  { name: "David", team: "Blue" },
  { name: "Eve", team: "Green" },
];

const countTeams = playersTeams.reduce((acc, curr) => {
  const team = curr.team;

  if (!acc[team]) {
    acc[team] = 0;
  }

  acc[team] += 1;

  console.log(`--- acc[team] ---${acc[team]}`);

  return acc;
}, {});
console.log(countTeams);

// =======================================================================

const fistNames = [
  "Alice",
  "Amanda",
  "Bob",
  "Becky",
  "Charlie",
  "Cleo",
  "David",
];

const countFirstChar = fistNames.reduce((acc, curr) => {
  const firstChar = curr.charAt(0); // "A", "B", etc.

  if (!acc[firstChar]) {
    acc[firstChar] = 0; // first time: create key
  }

  acc[firstChar] += 1; // count up

  return acc;
}, {});

console.log(countFirstChar);

// =======================================================================

const numbers = [1, 2, 3, 4, 5, 6];
const oddEven = numbers.reduce((acc, curr) => {
  const even = "even";
  const odd = "odd";

  if (curr % 2 === 0) {
    acc[even] = (acc[even] || 0) + 1;
  } else {
    acc[odd] = (acc[odd] || 0) + 1;
  }

  return acc;
}, {});
console.log(oddEven);

// =======================================================================

const animals = ["cat", "giraffe", "dog", "elephant", "bee", "lion"];
const countWords = animals.reduce((acc, curr) => {
  const short = "short";
  const long = "long";

  if (curr.length > 3) {
    acc[long] = (acc[long] || 0) + 1;
  } else {
    acc[short] = (acc[short] || 0) + 1;
  }

  return acc;
}, {});
console.log(countWords);

// =======================================================================

const letters = ["a", "b", "e", "f", "i", "j", "o", "u"];
const checkWords = letters.reduce((acc, curr) => {
  const vowel = "vowel";
  const consonant = "consonant";
  const arrVowel = ["a", "e", "i", "o", "u"];

  if (arrVowel.includes(curr)) {
    acc[vowel] = (acc[vowel] || 0) + 1;
  } else {
    acc[consonant] = (acc[consonant] || 0) + 1;
  }

  return acc;
}, {});
console.log(checkWords);

// =======================================================================

const numbersArr = [5, -3, 0, 8, -2, 0, 1];
const countNumbers = numbersArr.reduce((acc, curr) => {
  const positive = "positive";
  const negative = "negative";
  const zero = "zero";

  if (curr > 0) {
    acc[positive] = (acc[positive] || 0) + 1;
  } else if (curr < 0) {
    acc[negative] = (acc[negative] || 0) + 1;
  } else {
    acc[zero] = (acc[zero] || 0) + 1;
  }

  return acc;
}, {});
console.log(`--- countNumbers ---`);
console.log(countNumbers);

// =======================================================================

const answers = [true, false, true, true, false, false, true];
const trueOrFalse = answers.reduce((acc, curr) => {
  const truthy = true;
  const falsy = false;
  if (curr === truthy) {
    acc[String(truthy)] = (acc[truthy] || 0) + 1;
  } else {
    acc[String(falsy)] = (acc[falsy] || 0) + 1;
  }

  return acc;
}, {});
console.log(`--- trueOrFalse ---`);
console.log(trueOrFalse);

// =======================================================================

const namesArr = ["Anna", "Alice", "Bob", "Becky", "Brian", "Coco"];
const countFirstLetter = namesArr.reduce((acc, curr) => {
  // const A = "A";
  // const B = "B";
  // const C = "C";

  const key = curr.charAt(0).toUpperCase();
  acc[key] = (acc[key] || 0) + 1;

  return acc;
}, {});
console.log(`--- countFirstLetter ---`);
console.log(countFirstLetter);

// =======================================================================

const wordsArr = ["cat", "elephant", "dog", "giraffe", "bee", "lion"];
const countFourLetters = wordsArr.reduce((acc, curr) => {

  // let fourMore = wordsArr.filter((word) => word.length > 4);

  // console.log(`--- fourMore ---`);
  // console.log(fourMore);

  // if(acc.filter((curr) => curr.length > 4)){
  //   const key = curr.charAt(0);
  //   acc[key] = (acc[key] || 0) + 1;
  // }

  if(curr.length > 4){
    const key = curr.charAt(0);
    acc[key] = (acc[key] || 0) + 1;

  }

  return acc;
}, {});
console.log(`--- countFourLetters ---`);
console.log(countFourLetters);
