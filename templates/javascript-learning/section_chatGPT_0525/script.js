"use strict";

// practice 1
let arrayNumber = [1, 2, 3, 4, 5, 6];
let newArrayNumber = [];

for (let i = 0; i < arrayNumber.length; i++) {
  if (arrayNumber[i] % 2 === 0) {
    newArrayNumber.push(arrayNumber[i] * 2); // fix push
  }
}
console.log(newArrayNumber);

// practice 2

let arrNumber = [3, 10, 12, 20];
let newArrNumber = [];

for (let i = 0; i < arrNumber.length; i++) {
  if (arrNumber[i] > 10) {
    newArrNumber.push(arrNumber[i] + 5); // fix push
  }
}
console.log(newArrNumber);

// practice 3

let allNumber = [1, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < allNumber.length; i++) {
  if (allNumber[i] % 2 !== 0) {
    sum += allNumber[i];
  }
}
console.log(sum);

// practice 3

let result = sumOddNumbers([1, 2, 3, 4, 5]);

function sumOddNumbers(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      sum += arr[i];
    }
  }
  return sum;
}
console.log(result); // should print 9

// example

function getEvenNumbers(arr) {
  let evenArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenArr.push(arr[i]);
    }
  }
  return evenArr;
}

let resultA = getEvenNumbers([1, 2, 3, 4, 5, 6]);
console.log(resultA);
// Output: [2, 4, 6]

const numbers = [3, 7, 1, 9, 5, 2];

const resultB = numbers.filter(numbGreaterThan5);

function numbGreaterThan5(arr) {
  if (arr > 5) {
    return numbers;
  }
}

console.log(resultB);

// practice

let newArr = [1, 5, 2, 8, 3, 7];

const resultC = newArr.filter(checkNewArr);

function checkNewArr(arr) {
  if (arr < 4) {
    return arr;
  }
}
console.log(resultC);

const allNumbers = [2, 3, 4, 5, 6, 7];
const resultD = allNumbers.filter(oddNumberFilter);

function oddNumberFilter(arr) {
  if (arr % 2 !== 0) {
    return arr;
  }
}
console.log(resultD);

// task

function isOddAndBig(number) {
  //Declaration
  if (number % 2 !== 0 && number > 10) {
    //Expression
    return number;
  } else {
    return false;
  }
}

console.log(isOddAndBig(27)); //Execution

// task
let numbersA = [1, 2, 3, 4];

let transferNumbersA = numbersA.map(function (num) {
  return "item" + num;
});

console.log(transferNumbersA);



// task

let numbersOneToSix = [1, 2, 3, 4, 5, 6];

let filterNumber = numbersOneToSix.filter(evenNumberFilter);

function evenNumberFilter(arr) {
  return arr % 2 === 0;

}
console.log(filterNumber);


let addEven = filterNumber.map(function (num) {
  return "Even: " + num;
});

console.log(addEven);
