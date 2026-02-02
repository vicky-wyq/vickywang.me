"use strict";

const tagInput = document.querySelector("#tagInput");
const tagButton = document.querySelector("#tagButton");
const tagOutput = document.querySelector("#tagOutput");

tagButton.addEventListener("click", function () {
  const input = tagInput.value;

  const tags = input
    .split(",")                            // turn into array
    .map(tag => tag.trim())               // trim each
    .filter(tag => tag !== "")            // remove empty
    .map(tag => "#" + tag);               // prepend hash

  tagOutput.innerText = tags.join(" ");
});
