"use strict";

// let g = 0;
// function bump() { g++; return g; }



// function bump() { let n = 0; n++; return n; }


function makeCounter() {
  let count = 0;               // local box
  return function() {          // inner function keeps reference
    count++;
    return count;
  };
}
const c = makeCounter();


console.log(c());
console.log(c());
console.log(c());



// =======
/* 
function makeCounter() {
  let count = 0;          // allocate a private box: count → 0
  return function () {     // return a function that knows where that box lives
    count++;               // mutate the same box
    return count;
  };
}

// prove a
const a = makeCounter();
console.log(typeof a); // "function"

// orive instance isolation
const x = makeCounter();
const y = makeCounter();
console.log(x()); // 1
console.log(x()); // 2
console.log(y()); // 1  <-- different box


// Prove shared state when you move the box global:

let g = 0;
function bump() { g++; return g; }

console.log(bump()); // 1
console.log(bump()); // 2
// No encapsulation. Every caller hits the same g.


*/





/*
function makeCounter() {
  let count = 0;          // allocate a private box: count → 0
  return function () {     // return a function that knows where that box lives
    count++;               // mutate the same box
    return count;
  };
}

const a = makeCounter();   // a === (function () { count++; return count; })
                           // a closes over the *same* count box (currently 0)

a(); // 1  -> increments the box: count = 1
a(); // 2  -> same box again:    count = 2
a(); // 3  -> same box again:    count = 3
*/







/* 
function makeCounter() {
  return function () {
    let count = 0;
    count++;
    return count;
  };
}

const a = makeCounter();
console.log(a());
console.log(a());
console.log(a());
*/




//1. Predict each console.log output before running it. | 1, 2, 3

//2. Explain exactly where count lives after each call. (Imagine the memory box—what happens to it.)
// "const a = makeCounter();" & "console.log(a());" call founction makeCounter() & print.
// inside of function, "  let count = 0;" but return function +1, first console.log = 1, this 1 will store into const a, so now const a pointing 1
// now 2nd  "console.log(a());" will call function again, this time inside of the function, count still = 0, so result from the function = 1, since a = 1, so the secound console.log just merge the 1 into the previous one, so the 2nd console.log = 2, next is the same logic

//3. Then break it on purpose: move let count = 0 inside the returned function, run again, and describe why it fails to “remember.”
// i moved, and saw the result = 1,1,1
// wich means each time at return, count = 0 again, then return + 1 = 1. now i am confused about the previous one, so the 1 never stored into const a? or the const a never pointing to 1 or 2?



/*
// A) Resets every call (no persistent state)

function counterOnce() {
  let count = 0; // created fresh on every call
  count++;
  return count;
}

console.log(counterOnce()); // 1
console.log(counterOnce()); // 1

//B) Resets every call (closure used incorrectly)
function makeBadCounter() {
  return function () {
    let count = 0; // declared in the inner function, so it reinitializes each call
    count++;
    return count;
  };
}

const x = makeBadCounter();
console.log(x()); // 1
console.log(x()); // 1

//C) Shared global (persists, but no isolation)
let gCount = 0;
function globalCounter() {
  gCount++;
  return gCount;
}

console.log(globalCounter()); // 1
console.log(globalCounter()); // 2
// Another “instance” would also increment the same gCount. Bad encapsulation.

//D) Proper closure (persists per instance)
function makeCounter() {
  let count = 0; // captured by the inner function, persists per instance
  return function () {
    count++;
    return count;
  };
}

const a = makeCounter();
console.log(a()); // 1
console.log(a()); // 2

const b = makeCounter();
console.log(b()); // 1
console.log(b()); // 2

//Tiny drills (do them now)
//1. Predict outputs, then run:
function makeWeird() {
  let n = 0;
  return {
    next: () => ++n,
    peek: () => n,
  };
}
const w = makeWeird();
console.log(w.peek()); // not sure i fully understand this arrow function "next: () => ++n, peek: () => n,", but it will add up
console.log(w.next()); // +nn
console.log(w.next()); // +nnn
console.log(w.peek()); // +nnnn

//2. Rewrite D so it also exposes a reset() method without breaking encapsulation:
// your turn
function makeCounter3() {
  let count = 0;
  count++;
  return count;
}
console.log(makeCounter3());
console.log(makeCounter3());
console.log(makeCounter3());
// interesting, here can not make a variable, only log derectly, only function with nesting can be stored into variable?

//3. Break D on purpose by moving let count = 0 into the returned function. Verify it resets to 1 every call. State exactly which line causes the bug and why.

function makeCounter2() {
  return function () {
    let count = 0;

    count++;
    return count;
  };
}
const D = makeCounter2();
console.log(D());
console.log(D());

/* 
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const a = makeCounter();
console.log(a()); //1
console.log(a()); //2

// Run it. Predict output before you do. | 1, 2

// Explain why the variable count doesn’t reset to 0 every time. | because "const a" saved return result

// Rewrite it without closures (just plain variables) and see what breaks. | remove "return count;" it is undefined, because can not read a inner function from outside of the function

// rewrite

function makeCounter1() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const c = makeCounter1();
console.log(c()); // 1
console.log(c()); // 2
console.log(c()); // 3





*/
