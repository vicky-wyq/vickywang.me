/* =================== accTrigger ===================*/
const accTriggers = document.querySelectorAll(".accTrigger");

accTriggers.forEach((trigger) => {
  trigger.addEventListener("click", function () {
    const content = this.nextElementSibling;
    content.classList.toggle("is-open-acc");
    this.classList.toggle("is-open-acc");

    if (content.classList.contains("is-open-acc")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});



/* =================== accTrigger ===================*/