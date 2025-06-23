"use strict";

//Understand primitive vs reference behavior
//→ How JS handles memory and mutation internally.



//First: Primitive = Copy by Value
let a = 10;
let b = a; 
b = 20;
console.log(a); // 10
console.log(b); // 20


/*
b = a → copies the value 10 into b

So a and b are completely independent

✔️ a stays 10, b becomes 20

This is how primitive types (number, string, boolean, null, undefined, symbol, bigint) behave — copied by value
*/

//Second: Object = Copy by Reference

let obj1 = { value: 10 };
let obj2 = { ...obj1 }; // create a shallow copy
obj2.value = 20;
console.log(obj1.value); // 20
console.log(obj2.value); // 20

// =============
function outer() {
  let outerVar = 'I am outside!';
  
  function inner() {
    let innerVar = 'I am inside!';
    console.log(outerVar);
  }

  inner(); // this can work, because it calling a inner function
  console.log(innerVar); // will not print, because it calling a variable inside of a function
}

// outer();

// =============

function outer() {
  let count = 0;

  return function inner() { 
    count++;
    console.log(`Count is: ${count}`);
  };
}

const counter = outer(); // ← ✅ This calls `outer()` ONCE and stores the returned `inner()` function in `counter`

counter(); // ❗ Only calls `inner()` — NOT outer()
counter(); // ❗ Again, only calls `inner()`, NOT outer()

// =============


function createScoreTracker(name) {

  let score = 0;

  return function addPoint() {
    score = score + 5;
    console.log(`Current score: ${score}`);
    name = `${name}'s score: ${score}`;
    console.log(name);


  };
}
const myScore = createScoreTracker('vicky'); // outer runs, returns inner
myScore(); 
myScore(); 
myScore(); 