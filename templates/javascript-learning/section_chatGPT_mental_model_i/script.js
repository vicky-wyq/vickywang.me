"use strict";

// link to html
const message = document.querySelector("#message");
const button = document.querySelector("#button");

// action 
button.addEventListener("click", () => {


  if (message.value === "") {
    message.value = "Hello, world!";
  } else {
    message.value = "";
  }
});

"use strict";

