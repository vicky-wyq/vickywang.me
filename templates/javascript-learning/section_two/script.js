"use strict";

/* 
let hasDriversLicense = false;
const passTest = true;

if(passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio'
// const private = 534;






function logger(){
  console.log('My name is Vicky');
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges){
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apple and ${oranges} oranges`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);

console.log(appleJuice);

// console.log(fruitProcessor(5, 0));



const appleOrangeJuice =  fruitProcessor(2, 4);
console.log(appleOrangeJuice);


// function declaration
function calcAge1(birthYear){
  return 2037 - birthYear
}
const age1 = calcAge1(1987);


// function expression

const calcAge2 = function (birthYear){
  return 2037 - birthYear
};

const age2 = calcAge2(1987);

// console.log(age1, age2);



// Arrow function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);


const yearUntilRetirement = (birthYear, firstName) =>{
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`
  

} 

console.log(yearUntilRetirement(1991, 'Jonas')); 

console.log(yearUntilRetirement(1998, 'Bob')); 


function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);


  const juice = `Juice with ${apples} apple and ${oranges} oranges`;
  return juice;
}

fruitProcessor(2, 3);



const calcAge = function(year){
  return 2037 - year;
}




const yearUntilRetirement = function (birthYear, firstName){
  const age = calcAge(birthYear);
  const retirement = 65 - age;


  if(retirement > 0){
    return retirement
  } else {
    return -1;
  }


  // return `${firstName} retires in ${retirement} years`
  

} 

console.log(yearUntilRetirement(1991, 'Vicky'));
console.log(yearUntilRetirement(1970, 'Mike'));

// =================== practice with ChatGPT =================== 
const greet = function(name){
  return `Hello, ${name}!`
}

console.log(greet("chatGPT"));




const multiply = function (a, b) {
  if (a === undefined && b === undefined) {
    return 0;
  }
  if (a === undefined) {
    return b * b;
  }
  if (b === undefined) {
    return a * a;
  }
  return a * b;
};

console.log(multiply(2, 2)); // 4
console.log(multiply(8, 2)); // 16
console.log(multiply(5));    // 25
console.log(multiply());     // 0


const multiplyChatGPT = function (a, b) {
  if (a !== undefined && b !== undefined) return a * b;
  if (a !== undefined) return a * a;
  return 0;
};
console.log(multiplyChatGPT(3, 4)); // 12 ✅
console.log(multiplyChatGPT(5));    // 25 ✅
console.log(multiplyChatGPT());     // 0 ✅


//✅ Exercise 1: Check if a number is positive
const isPositive = function (checkNumber) {
  if (checkNumber > 0) {
    return "positive";
  }
  if (checkNumber < 0) {
    return "negative"; // ← you had 'negative' without quotes
  }
  if (checkNumber === 0) {
    return "zero";
  }
};

console.log(isPositive(1));


//Exercise 2: Return the larger of two numbers



function max(n1, n2) {
  if(n1 > n2){
    return n1;
  }
  else return n2
  
}

console.log(max(6,2));


// Exercise 3: Describe a number
function describeNumber(number){
  if (number === even || ){
    return `even ${number}` 
  }
  else if (number === odd){
    return `odd ${number}`  
}
    else return "not a number"

}

console.log(describeNumber(2));



const canVote = function (age) {
  if (age >= 18) {
    return "can vote";
  } else return "too young";
};
console.log(canVote(1));


const gradeFeedback =  function(score){
  if(score> 90){
    return 'Excellent';
  }
  else if(score > 70 && score < 89){
    return 'Good'
  }
  else {
    return 'Needs improvement'
  }
    

}
console.log(gradeFeedback(99));

*/


function calcAge(birthYear){
  return 2037 - birthYear
}
const years = [1990, 1967, 2002, 2010, 2018];

console.log(calcAge(years[0]));