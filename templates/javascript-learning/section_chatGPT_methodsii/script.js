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
  if (!acc[first]) { // if acc name first char does not including itself, 
    acc[first] = []; // If there’s not already a group in acc for this letter, create an empty array
  }

  acc[first].push(name);
  return acc;
}, {}); // start with an empty object {}

console.log(grouped);

