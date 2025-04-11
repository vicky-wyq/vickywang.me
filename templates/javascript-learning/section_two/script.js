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


const friends = ['Michael', 'Steven', 'Peter'];


// add element
const newLength = friends.push('Jay')


console.log(newLength); // 4

friends.unshift('John');
console.log(friends);

const popped = friends.pop();
console.log(popped + ' popped');
console.log(friends);



// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');


// for loop keeps running while condition is TRUE
for(let rep = 1; rep <=10; rep++){
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
};


const types = [];

for (let i = 0; i < jonas.length; i++) {
  console.log(jonas[i], typeof jonas[i]);
  // filling types array
  // types[i]= typeof jonas[i];
  types.push(typeof jonas[i]);


}
console.log(types, 'print for types');


const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++){
  ages.push(2037 - years[i]);

}

console.log(ages);

// continue and break


const jonas = [
  "Jonas",
  "Smith",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true
];

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);

}

for(let exercise=1; exercise<4; exercise++){
  console.log(`------Starting exercise ${exercise}`);
  for (let rep = 1; rep <6; rep++){
    console.log(`lifting ${rep}`);
  }
}

const printNames = ['Vicky', 'Jonas', 'Peter'];


for (let i = 0; i < printNames.length; i++) {
  console.log(printNames[i]);

}
function printNames(nameArray) {
  for (let i = 0; i < nameArray.length; i++) {
    console.log(`${i + 1}, ${nameArray[i]}`);
  }
}

printNames(['Vicky', 'Jonas', 'Peter']);




function pickName(names) {
  for (let i = 0; i < names.length; i++) {
    if (names[i].length < 5) {
      const pickedName = names[i];
      console.log(`Name: ${pickedName}`);

      for (let j = 0; j < pickedName.length; j++) {
        console.log(pickedName[j]); // print each letter
      }
    }
  }
}

pickName(['Vicky', 'Jonas', 'Peter', 'Bee']);



const sumUntilStop = function (arrNumber) {
  let total = 0;

  for (let i = 0; i < arrNumber.length; i++) {
    if (arrNumber[i] === 0) {
      break; // stop the loop
    }
    total += arrNumber[i]; // add the number
  }

  return total;
};

console.log(sumUntilStop([3, 4, 5, 0, 10])); // → 12



const makeExcited = function(arrString){
  const result = [];

  for (let i = 0; i < arrString.length; i++) {
   result.push(`${arrString[i]}!`);

  }
  return result;

};

console.log(makeExcited(["hi", "code", "yes"])); 


const onlyStrings = function(array){
  const stringArr = [];

  for (let i = 0; i < array.length; i++) {
    if(typeof array[i] === 'string'){
      stringArr.push(array[i]);

    };

  };
  return stringArr
}
console.log(onlyStrings(["hi", 2, false, "yes", 42]));

const onlyBooleans = function (array) {
  const booleanArr = [];
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "boolean") {
      booleanArr.push(array[i]);
    };
  };
  return booleanArr


}

console.log(onlyBooleans(["hi", true, 2, false, "no", true]));

function truthyStringsOnly(array) {
  const onlyStrings = [];

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "string" && !"" && !null && !0 && !false) {
      onlyStrings.push();
    }
  }
  return onlyStrings;
}
console.log(truthyStringsOnly(["hi", "", "yes", 0, false, " ", null]));

function falsyStringsOnly(array){
  const falsyStrings = [];

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "string" && !array[i]) {
      falsyStrings.push(array[i]);
    }
  }
  return falsyStrings;

}

console.log(falsyStringsOnly(["", "hi", 0, null, " ", false, undefined]));
function stringLengths(stringArr){
  const stringLengthNumbers = [];
  for (let i = 0; i < stringArr.length; i++) {
    stringLengthNumbers.push(stringArr[i].length);

  }
  return stringLengthNumbers;

}
console.log(stringLengths(["hi", "code", "yes"]));
function stringLengths(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(`${arr[i]} → ${arr[i].length}`);
  }

  return result;
}

console.log(stringLengths(["hi", "code", "yes"]));

function flattenAndLog(array2D) {
  const newArr = [];
  for (let i = 0; i < array2D.length; i++) {

    for(let a = 0; a < array2D[i].length; a++){
      newArr.push(`${array2D[i][a]}`);
    }
  }
  return newArr;
}
console.log(
  flattenAndLog([["Vicky", "Jonas"], ["Peter", "Steven"], ["Alice"]])
);


function flattenAndLog(array2D) {
  const newArr = [];
  for (let i = 0; i < array2D.length; i++) {

    for(let a = 0; a < array2D[i].length; a++){
      console.log(array2D[i][a]);
    }
  }
  return newArr;
}
  flattenAndLog([["Vicky", "Jonas"], ["Peter", "Steven"], ["Alice"]])

const flattenAndLogLongNames = function (array2D) {
  for (let i = 0; i < array2D.length; i++) {
    for (let a = 0; a < array2D[i].length; a++) {

      if (array2D[i][a].length >= 5) {
        console.log(array2D[i][a]);

      }
    }
  }
};

flattenAndLogLongNames([
  ["Vicky", "Jon", "Amy"],
  ["Steven", "Li", "Tommy"],
  ["Al"],
]);


const filterEmployeesByRole = function (employeeObj) {
  for (let i = 0; i < employeeObj.length; i++) {
    if (filterEmployeesByRole.role === "Designer") {
      console.log(filterEmployeesByRole.name);
    }
  }
}

filterEmployeesByRole([
  { name: "Vicky", role: "Designer" },
  { name: "Jonas", role: "Engineer" },
  { name: "Peter", role: "Designer" },
  { name: "Amy", role: "Manager" }
]);

function listTeamByDepartment(teamArr) {
  const newTeam = [];

  for (let i = 0; i < teamArr.length; i++) {
    if (teamArr[i].department === "Engineering") {
      newTeam.push(teamArr[i].name);
    }
    else if (teamArr[i].department === "Marketing"){
      newTeam.push(teamArr[i].name);

    }
  }
  console.log(newTeam);

  return newTeam;



}


listTeamByDepartment([
  { name: "Vicky", department: "Design" },
  { name: "Jonas", department: "Engineering" },
  { name: "Amy", department: "Design" },
  { name: "Peter", department: "Marketing" }
]);


const getHighEarners = function (arr) {
  const highEarners = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].salary >= 70000) {
      highEarners.push(arr[i].name);
    }
  }
  return highEarners;
};
const employee = [
  { name: "Vicky", salary: 85000 },
  { name: "Jonas", salary: 65000 },
  { name: "Amy", salary: 95000 },
  { name: "Peter", salary: 40000 },
];

console.log(getHighEarners(employee));


const employee = [
  { name: "Vicky", salary: 85000 },
  { name: "Jonas", salary: 65000 },
  { name: "Amy", salary: 95000 },
  { name: "Peter", salary: 40000 },
];

function sumSalaries(employeeArr) {
  let sum = 0;

  for (let i = 0; i < employeeArr.length; i++) {
    sum += employeeArr[i].salary;

  }
  return sum
}

console.log(sumSalaries(employee));


function averageSalary(employeeArr) {
  let sum = 0;

  for (let i = 0; i < employeeArr.length; i++) {
    sum += employeeArr[i].salary;

  }
  return sum / employeeArr.length



}
console.log(averageSalary(employee));


function getTopEarner(employeeArr){
  let topSalary = 0;
  let topName = ""


  for (let i = 0; i < employeeArr.length; i++) {
    if(employeeArr[i].salary>topSalary){
      topSalary = employeeArr[i].salary;
      topName = employeeArr[i].name;
    }

  
  }      
  return topName

}
console.log(getTopEarner(employee));
const listTeamByDepartment = [
  { name: "Vicky", department: "Design" },
  { name: "Jonas", department: "Engineering" },
  { name: "Amy", department: "Design" },
  { name: "Peter", department: "Marketing" }
];


// function countByDepartment(arr){
//   let counts = {}
//   for (let i = 0; i< arr.length; i++){
//     if (!arr[i].department) {
//       counts = arr[i].department = 1;
//     } else {
//       counts = arr[i].department++;
//     }
//   }

//   return counts


// }

function countByDepartment(arr) {
  let counts = {};

  for (let i = 0; i < arr.length; i++) {
    let dept = arr[i].department;

    if (!counts[dept]) {
      counts[dept] = 1;
    } else {
      counts[dept]++;
    }
  }

  return counts;
}

console.log(countByDepartment(listTeamByDepartment));

function totalSalaryByDepartment(arr) {
  let totals = {}

  for (let i = 0; i < arr.length; i++) {

    if (arr[i].department === 'Design'){
      totals.department += arr[i].salary;
    }
    else if (arr[i].department === 'Engineering'){
      totals.department += arr[i].salary;
    }
    else{
      totals.department += arr[i].salary;
      return totals;

    }

  }

}

let employeesData = [
  { name: "Vicky", department: "Design", salary: 85000 },
  { name: "Jonas", department: "Engineering", salary: 65000 },
  { name: "Amy", department: "Design", salary: 95000 },
  { name: "Peter", department: "Marketing", salary: 40000 }
];


let scores = {};            // Start with empty object

scores["Vicky"] = 10;       // Add a key "Vicky" → 10
scores["Jonas"] = 20;       // Add another key "Jonas" → 20
scores["Vicky"] = 25;       // Update existing key "Vicky" → 25

console.log(scores);
// { Vicky: 25, Jonas: 20 }


const user = "Amy";
const points = 15;

scores[user] = points;

console.log(scores);
// { Vicky: 25, Jonas: 20, Amy: 15 }

const deptTotals = {};


deptTotals['Design'] = 85000;

deptTotals['Engineering'] = 65000;

deptTotals['Design'] += 95000;
deptTotals['Marketing'] = 40000;


console.log(deptTotals);



let totals = {};
let dept = "Design";
let salary = 85000;

if(!totals[dept]){
  totals[dept] = salary;

} else {
  totals[dept] += salary;
}

console.log(totals);


let totalsDept = {};

dept = "Engineering"; salary = 65000;
dept = "Design"; salary = 95000;
dept = "Marketing"; salary = 40000;

if(!totalsDept[dept]){
  totalsDept[dept] = salary;

} else {
  totalsDept[dept] += salary;
}
console.log(totalsDept);

let employee = {
  "Design": 85000,
  "Engineering": 65000,
  "Design": 95000,
  "Marketing": 40000,
}



const salaryGen = function (obj) {
  let totals = {};


  for (let i = 0; i < obj.length; i++) {

    let dept = obj[i].keys;

    if (!totals[dept]) {
      totals[dept] = salary;
    } else {
      totals[dept] += salary;
    }

  }
}


console.log(salaryGen(employee));


const employeesData = [
  { name: "Vicky", department: "Design", salary: 85000 },
  { name: "Jonas", department: "Engineering", salary: 65000 },
  { name: "Amy", department: "Design", salary: 95000 },
  { name: "Peter", department: "Marketing", salary: 40000 }
];

const salaries = {};

for (let i = 0; i < employeesData.length; i++) {
  const employee = employeesData[i];

  if (!salaries[employee.department]) {
    salaries[employee.department] = 0;
  }
  salaries[employee.department] += employee.salary;
}

console.log(salaries);

  */
