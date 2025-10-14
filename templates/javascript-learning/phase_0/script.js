"use strict";
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}

const a = makeCounter();
console.log(a());
console.log(a());
