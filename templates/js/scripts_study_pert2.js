'use strict';

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio';
// const private = 534;

function logger() {
  console.log('My name is Jonas');
}
// calling / running / invoking function
logger();
logger(); 
logger(); 

function fruitProcessor(apples, oranges){
  // console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0)
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4)
console.log(appleOrangeJuice);

const num = Number('23');

// function declaration | can be called before it defined
function calcAge1(birthYear){
  return 2037 - birthYear;
}
const age1 = calcAge1(1991);
console.log(age1);

// function expression | can NOT be called before it defined
const calcAge2 = function (birthYear){
  return 2037 - birthYear;
}
const age2 = calcAge2(1991);
console.log(age1, age2);
*/



// arrow function
const calcAge3 = birthYear => 2037 - birthYear; // auto return, no braces
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));

// arrow does not get socal keyword ?

