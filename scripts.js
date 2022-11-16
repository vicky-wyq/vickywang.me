document.addEventListener("DOMContentLoaded", function (event) {
  //do work


  console.log(CryptoJS)

  const pass = document.getElementById("password");
  const submit = document.querySelectorAll(".passwordArr")[0];
  const msg = document.getElementById("pwIncorrect");
  const w = 'U2FsdGVkX19oLUQ5jGSt/8/BznuKKmnoGgwpbQPYIbeXe3qedrMX9ePhdFn9BFIe';

  // Get the input field
  // Execute a function when the user presses a key on the keyboard
  if (pass && submit) {
    pass.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        submit.click();
      }
    });
    submit.addEventListener("click", () => {
      let redirect;
      try {
        let decrypted = CryptoJS.AES.decrypt(w, pass.value);
        redirect = CryptoJS.enc.Utf8.stringify(decrypted);
      } catch (e) {
        console.log(e);
      }

      if (redirect && redirect.includes("/xb")) {
        window.location.href = redirect;
        msg.style.display = "none";
      } else {
        // handle some error
        msg.style.display = "block";
      }
    });
  }
  //password

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  
  document.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
  //Responsive hamburger menu




  AOS.init({

    delay: 180, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  });
  //aos + 2 links on html 

  function progressBarScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.body.scrollHeight - document.body.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
    console.log('height', height);
    console.log('scrollHeight', document.documentElement.scrollHeight);
    console.log('clientHeight', document.documentElement.clientHeight);

  }
  
  window.onscroll = function () {
    progressBarScroll();
  };
  //progressBarScroll

  //Get the button
  var mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.addEventListener('scroll', function () {
    scrollFunction()
  })

  function scrollFunction() {
    if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  mybutton.addEventListener('click', topFunction)
  // back to top 

});
