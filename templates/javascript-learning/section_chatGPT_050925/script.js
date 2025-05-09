"use strict";


const questions = [
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Color of the sky?", answer: "blue" }
];

let current = 0;

const questionText = document.querySelector("#questionText"); // title
const answerInput = document.querySelector("#answerInput"); // text input filed
const checkButton = document.querySelector("#checkButton");
const feedbackArea = document.querySelector("#feedbackArea");

// Initial render
function showQuestion() {
  questionText.innerText = questions[current].question;
  answerInput.value = "";
  feedbackArea.innerText = "";
}

checkButton.addEventListener("click", function () {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correct = questions[current].answer.toLowerCase();

  if (userAnswer === correct) {
    feedbackArea.innerText = "✅ Correct!";
  } else {
    feedbackArea.innerText = "❌ Try again.";
    return; // don't move to next yet
  }

  current++;
  if (current < questions.length) {
    showQuestion(); // move to next
  } else {
    questionText.innerText = "🎉 Quiz finished!";
    answerInput.remove();
    checkButton.remove();
  }
});

showQuestion(); // start the app
