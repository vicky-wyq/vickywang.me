document.addEventListener("DOMContentLoaded", function (event) {
  //do work






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


  document.getElementById('about').addEventListener('click', function (e) {
    e.preventDefault()
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  })
  // go to bottom 




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
    start: "top 240px", //trigger, viewport
    end: "bottom bottom",
    scrub: 1,
    markers: false,
    toggleActions: "restart pause reverse reset"
  }
  });
  gsap.to(".ver1", {
    rotate: 90,
    scrollTrigger: {
    trigger: ".ver1",
    start: "top 380px", //trigger, viewport
    end: "bottom bottom",
    scrub: 1,
    markers: false,
    toggleActions: "restart pause reverse reset"
  }
  });
  gsap.to(".ver2", {
    rotate: 90,
    scrollTrigger: {
    trigger: ".ver2",
    start: "0px 380px", //trigger, viewport
    end: "bottom bottom",
    scrub: 1,
    markers: true,
    toggleActions: "restart pause reverse reset"
  }
  });
// immediateRender: false, second scroll smooth
//ScrollTrigger


AOS.init({

  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms

});
//aos + 2 links on html 


const showAnim = gsap.from('.main-tool-bar', {
  yPercent: -100,
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});
//main-tool-bar + 2 links on html


window.onscroll = function () { myFunction() };

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - window.innerHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
//progress-bar 0 link on html
function animateFrom(elem, direction) {
  direction = direction | 1;

  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
    duration: 1.25,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}
function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () { animateFrom(elem) },
      onEnterBack: function () { animateFrom(elem, -1) },
      onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});
  //body scroll + 2 links on html
















});
