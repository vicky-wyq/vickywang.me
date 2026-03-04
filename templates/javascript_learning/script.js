const numbers = [1, 2, 3, 4];

const total = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

console.log(total); // 10

/* ============================*/
const numbers1 = [1, 2, 3, 4];

let total1 = 0;

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}

console.log(total1); // 10


// function evenTimesTen(arr) {
//   return arr.reduce(function (acc, value) {
//     if (value % 2 === 0) {
//       acc.push(value * 10);
//     }
//     return acc;
//   }, []);
// }

// console.log(evenTimesTen([1, 2, 3, 4, 5]));
// // [20, 40]


/* =================== accTrigger ===================*/
// const accTriggers = document.querySelectorAll(".accTrigger");

// accTriggers.forEach((trigger) => {
//   trigger.addEventListener("click", function () {
//     const content = this.nextElementSibling;
//     content.classList.toggle("is-open-acc");
//     this.classList.toggle("is-open-acc");

//     if (content.classList.contains("is-open-acc")) {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } else {
//       content.style.maxHeight = null;
//     }
//   });
// });



/* =================== accTrigger ===================*/