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

// map

const nums = [2, 4, 6];
const tripled = nums.map(n => n * 3);

console.log(tripled);

// filter()
const words = ["car", "apple", "cat", "dog"];
const cWords = words.filter(word => word.startsWith("c"));
console.log(cWords);

// find()
const values = [3, 8, 12, 5, 20];
const firstBig = values.find(value => value > 10);
console.log(firstBig);




// map
const names = ["alice", "bob", "charlie"];
const uppercased = names.map(name => name.toUpperCase());
console.log(uppercased);

// filter()
const numsArr = [2, 3, 4, 6, 9, 10];
const divisibleBy3 = numsArr.filter(num => num % 3 === 0);
console.log(divisibleBy3);

// find()
const wordsArr = ["cat", "apple", "house", "cup", "train"];
const fiveLetters = wordsArr.find(wordlength => wordlength.length === 5);
console.log(fiveLetters);

// ==========================================


// Double each number in the array:
const numArray = [1, 2, 3, 4];
const doubled = numArray.map(n => n * 2);

console.log(doubled);

//Keep only names that include the letter “e”:
const namesArr = ["Amy", "Ben", "Leo", "Max", "Eve"];
const withE = namesArr.filter(name => name.toLowerCase().includes("e"));
console.log(withE);


//Find the first number less than 0:
const data = [5, 3, 0, -2, -4];
const firstNegative = data.find(n => n<0);
console.log(firstNegative);

// ==========================================


//Make all words lowercase:
const wordsArray = ["HELLO", "World", "JAVASCRIPT"];
const lowercased = wordsArray.map(w => w.toLowerCase());
console.log(lowercased);


//Keep numbers greater than 50:
const numbers = [12, 99, 42, 80, 3];
const bigNums = numbers.filter(n => n > 50);
console.log(bigNums);

//Find the first string that starts with “A”:
const items = ["cat", "Apple", "banana", "Avocado"];
const startsWithA = items.find(s => s.startsWith('A') )
console.log(startsWithA);

