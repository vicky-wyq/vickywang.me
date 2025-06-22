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

outer();
