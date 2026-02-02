"use strict";

const tagInput = document.querySelector("#tagInput");
const tagButton = document.querySelector("#tagButton");
const tagOutput = document.querySelector("#tagOutput");

tagButton.addEventListener("click", function () {
  const splitInput = tagInput.value.split(",");
  console.log(splitInput);

  const cleaned = [];

  for (let i = 0; i < splitInput.length; i++) {
    const trimmed = splitInput[i].trim();
    if (trimmed !== "") {
      cleaned.push(trimmed);
    }
  }
  console.log(cleaned);

  const finalString = "#" + cleaned.join(" #");
    console.log(finalString);

  tagOutput.innerText = finalString;
});

