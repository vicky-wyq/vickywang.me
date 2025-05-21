"use strict";


// ========================================================================
const scores = [10, 20, 15, 5];

const array = scores;
const current = 0;




const total = scores.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

console.log(total); // → 50

// alt: const total = scores.reduce((a, c) => a + c, 0);

// ========================================================================


const words = ["JavaScript", "is", "fun"];
const trimArr = words.reduce((accumulator, current) => {
  return accumulator + current;
});

console.log(trimArr);