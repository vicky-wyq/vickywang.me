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
  let outerVar = "I am outside!";

  function inner() {
    let innerVar = "I am inside!";
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
  };
}
let myScore = createScoreTracker("vicky"); // outer runs, returns inner
myScore();
myScore();
myScore();


myScore = 0;
console.log(myScore);


function resetScore() {
    myScore = 0;
    return myScore;
}
console.log(resetScore());

// =============
const inventory = [
  { id: 1, name: "apple", quantity: 3 },
  { id: 2, name: "banana", quantity: 5 },
  { id: 3, name: "orange", quantity: 2 }
];

function getItemByName(arr, name) { // this founction helps to locate the right item, banana === banana. 2 arguments, arr is inventory? only take whole arr? then name just find the name that passed from "const result = getItemByName(inventory, "banana");"
  return arr.find(item => item.name === name);
}

const result = getItemByName(inventory, "banana");
console.log(result); // is that should be 5? this is my guessing, not sure how to get 5 since only "  return arr.find(item => item.name === name);" return the right name. maybe return true?

//Why is .find() used here instead of .map() or .forEach()? find is find something from many items in an arr, map is more like a pair, always a goes with 1, b go with 2 something like that. forEach is loop through the whole arr find something need, actually i feel foreach should also work here

//What’s the mental difference between using arrays vs using objects directly? arr has order, obj is not. obj has key, arr does not have the key. if we wanna have a random order with name pair its data, obj is good, if we want to keep the order without having name, arr is better, i  saw arr obj before, that kinda use both features, can use arr methord to manipulate the arr obj

// =============

//i am not sure i fully understand the code ...

const inventorySystem = createInventorySystem();
// we have a variable called inventorySystem, and pass function "createInventorySystem();"

function createInventorySystem() { // we have a function, returen including more functions. but no premeter
  let inventory = []; // built a variable is called inventory, clean arr

  return {
    addItem: function(item) {// never see "addItem: ..." but i assume this is adding an item to arr
      inventory.push(item);
    },
    removeItem: function(name) { // filter the differ name in the inventory
      inventory = inventory.filter(i => i.name !== name);
    },
    updateQuantity: function(name, newQuantity) { //adjust quantity?
      const target = inventory.find(i => i.name === name); // find the same name
      if (target) target.quantity = newQuantity; // if target exist, assign new quantity
    },
    getLowStock: function(threshold) {
      return inventory.filter(item => item.quantity < threshold);
    },

    getInventory: function() {
      return inventory; // this is the final return you taught me before? just ensure there is a final saved and easy to access?
    }
  };
}
const system = createInventorySystem(); // new variable is called system, also link the the same function like the inventorySystem

system.addItem({ id: 1, name: 'apple', quantity: 3 }); // pass obj, to variable system.addItem, where this goes???🫣, obj structure: id: 1, name: 'apple', quantity: 3. oh, this goes to function createInventorySystem( then add item inner function under the return? but how can we access this inner function from here? oh, the "system.addItem"
system.addItem({ id: 2, name: 'banana', quantity: 5 });
system.addItem({ id: 3, name: 'orange', quantity: 2 });

console.log(system.getInventory());

system.updateQuantity('banana', 10);
console.log(system.getInventory());

system.removeItem('apple');
console.log(system.getInventory());



console.log(system.getLowStock(3));
