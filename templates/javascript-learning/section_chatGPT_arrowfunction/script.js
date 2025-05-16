"use strict";
/*

// One parameter, one-line return

function double1(x) {
  return x * 2;
}
const double = x => x * 2;


// Multiple parameters
const add = (a, b) => a + b;

// No parameters
const greet = () => "Hello";

//🔹 With curly braces ({}): need explicit return
const triple = x => {
  return x * 3;
};

//🔹 Used with array methods (most common):
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);  // [2, 4, 6]
*/



/*
🔸 Key Differences from function keyword:
this is not bound (lexical scoping). Often useful in React or inside objects.

Can't be used as constructors (new ArrowFunc() will fail).

Cleaner syntax for callbacks and quick operations.
*/

/*
//✅ 1. Map – Double each number

const nums1 = [1, 2, 3, 4];

const doubled1 = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]


//✅ 2. Filter – Keep even numbers
const nums2 = [1, 2, 3, 4, 5, 6];

const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

//✅ 3. Find – First word longer than 5 chars
const words = ["hi", "banana", "cat", "elephant"];

const longWord = words.find(w => w.length > 5);
console.log(longWord); // "banana"

 */


const nums = [2, 4, 6];

// your code here:
const tripled = nums.map(n => n * 3);

console.log(tripled);


const words = ["car", "apple", "cat", "dog"];

// your code here:
const cWords = words.filter((word) ==='c');
console.log(cWords);



const values = [3, 8, 12, 5, 20];

// your code here:
const firstBig = values.find(value => value > 10);
console.log(firstBig);