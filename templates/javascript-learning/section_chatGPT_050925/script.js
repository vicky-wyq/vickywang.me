"use strict";

const questions = [
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Color of the sky?", answer: "blue" },
];

let current = 0;

const questionText = document.querySelector("#questionText"); // title
const answerInput = document.querySelector("#answerInput"); // text input filed
const checkButton = document.querySelector("#checkButton");
const feedbackArea = document.querySelector("#feedbackArea");
const nextButton = document.querySelector("#nextButton");

// Initial render
function showQuestion() {
  questionText.innerText = questions[current].question;
  answerInput.value = "";
  feedbackArea.innerText = "";

  nextButton.style.display = "none"; // hide next
  checkButton.disabled = false; // re-enable check
}

checkButton.addEventListener("click", function () {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correct = questions[current].answer.toLowerCase();

  if (userAnswer === correct) {
    feedbackArea.innerText = "✅ Correct!";
    nextButton.style.display = "inline"; // show Next button
    checkButton.disabled = true; // disable check until next
  } else {
    feedbackArea.innerText = "❌ Try again.";
    return; // don't move to next yet
  }

  nextButton.addEventListener("click", function () {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      questionText.innerText = "🎉 Quiz complete!";
      answerInput.remove();
      checkButton.remove();
      nextButton.remove();
    }
  });
});




showQuestion(); // start the app
