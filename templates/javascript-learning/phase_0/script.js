"use strict";

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
