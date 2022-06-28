document.addEventListener("DOMContentLoaded", function (event) {
  //do work
  console.log(CryptoJS)

  const pass = document.getElementById("password");
  const submit = document.querySelectorAll(".passwordArr")[0];
  const msg = document.getElementById("pwIncorrect");
  const w = 'U2FsdGVkX19oLUQ5jGSt/8/BznuKKmnoGgwpbQPYIbeXe3qedrMX9ePhdFn9BFIe';

  // Get the input field
  var input = document.getElementById("password");

  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function (event) {
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


  //password
// Modal Setup
var modal = document.getElementById('modal');

var modalClose = document.getElementById('modal-close');
modalClose.addEventListener('click', function() { 
  modal.style.display = "none";
});
modal.addEventListener('click', function() { 
  modal.style.display = "none";
});

// global handler
document.addEventListener('click', function (e) { 
  if (e.target.className.indexOf('modal-target') !== -1) {
      var img = e.target;
      var modalImg = document.getElementById("modal-content");
      var captionText = document.getElementById("modal-caption");
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
   }
});



  window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
        } else {
          document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
        }
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

  });





  window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
        } else {
          document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
        }
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

  });
  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // You can use a ScrollTrigger in a tween or timeline
  gsap.to(".divider", {
    rotate: 90,
    scrollTrigger: {
      trigger: ".divider",
      start: "top 240px", //trigger, viewport
      end: "bottom bottom",
      scrub: 1,
      markers: false,
      toggleActions: "restart pause reverse reset"
    }
  });

  gsap.to(".divider1", {
    rotate: 90,
    scrollTrigger: {
      trigger: ".divider1",
      start: "top 240px", //trigger, viewport
      end: "bottom bottom",
      scrub: 1,
      markers: false,
      toggleActions: "restart pause reverse reset"
    }
  });
  gsap.to(".t-intro", {
    y: 110,
    scrollTrigger: {
      trigger: ".t-intro",
      start: "top 100px", //trigger, viewport
      end: "+=560",
      scrub: 1,
      markers: false,
      pin: true,
      toggleActions: "restart pause reverse reset"
    }
  });



  // immediateRender: false, second scroll smooth

  //ScrollTrigger


});
