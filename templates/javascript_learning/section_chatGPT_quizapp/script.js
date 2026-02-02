"use strict";

const questions = [
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Color of the sky?", answer: "blue" },
];

const questionText = document.querySelector("#questionText"); // title
const answerInput = document.querySelector("#answerInput"); // text input filed
const checkButton = document.querySelector("#checkButton");
const feedbackArea = document.querySelector("#feedbackArea");
const nextButton = document.querySelector("#nextButton");
const scoreDisplay = document.querySelector("#scoreDisplay");
const progressBar = document.querySelector("#progressBar");
const summaryArea = document.querySelector("#summaryArea");
const restartButton = document.querySelector("#restartButton");

let current = 0;
let score = 0;
let answers = [];

scoreDisplay.innerText = "Score: 0";

// Initial render
function showQuestion() {
  questionText.innerText = questions[current].question;
  answerInput.value = "";
  feedbackArea.innerText = "";
  nextButton.style.display = "none"; // hide next
  checkButton.disabled = false; // re-enable check
  updateProgress();
}

checkButton.addEventListener("click", function () {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correct = questions[current].answer.toLowerCase();
  answers.push({
    question: questions[current].question,
    userAnswer: userAnswer,
    correctAnswer: questions[current].answer,
    isCorrect: userAnswer === correct,
  });
  if (userAnswer === correct) {
    feedbackArea.innerText = "✅ Correct!";
    score++; // ✅ increase score
    scoreDisplay.innerText = `Score: ${score}`;

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
      feedbackArea.innerText = `You got ${score} out of ${questions.length} correct.`;

      let summaryHTML = "<h3>Review:</h3><ul>";

      answers.forEach(function (item) {
        const result = item.isCorrect ? "✅" : "❌";
        summaryHTML += `<li>${result} <strong>${item.question}</strong><br> Your answer: ${item.userAnswer} <br> Correct answer: ${item.correctAnswer}</li><br>`;
      });

      summaryHTML += "</ul>";
      summaryArea.innerHTML = summaryHTML;

      updateProgress(); // fill bar to 100%

      answerInput.remove();
      restartButton.style.display = "inline";

      checkButton.remove();
      nextButton.remove();
      
    }
  });
});
function updateProgress() {
  const percent = (current / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}
restartButton.addEventListener("click", function () {
  // Reset state
  current = 0;
  score = 0;
  answers = [];

  // Recreate input + buttons if removed
  location.reload(); // ✅ simplest full reset

  // Optional: if you prefer soft-reset instead of reload, re-add elements manually
});


showQuestion(); // start the app
