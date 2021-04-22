document.addEventListener("DOMContentLoaded", function (event) {
  //do work


  function makeCarousel(carousel) {

  
    var carouselContent = carousel.querySelector('.carousel-content');
    var slides = carousel.querySelectorAll('.slide');
    var arrayOfSlides = Array.prototype.slice.call(slides);
    var carouselDisplaying;
    var screenSize;
    setScreenSize();
    var lengthOfSlide;

    function addClone() {
      var lastSlide = carouselContent.lastElementChild.cloneNode(true);
      lastSlide.style.left = (-lengthOfSlide) + "px";
      carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    }

    function removeClone() {
      var firstSlide = carouselContent.firstElementChild;
      firstSlide.parentNode.removeChild(firstSlide);
    }

    function moveSlidesRight() {
      var slides = carousel.querySelectorAll('.slide');
      var slidesArray = Array.prototype.slice.call(slides);
      var width = 0;

      slidesArray.forEach(function (el, i) {
        el.style.left = width + "px";
        width += lengthOfSlide;
      });
      addClone();
    }
    moveSlidesRight();

    function moveSlidesLeft() {
      var slides = carousel.querySelectorAll('.slide');
      var slidesArray = Array.prototype.slice.call(slides);
      slidesArray = slidesArray.reverse();
      var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

      slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide;
        el.style.left = maxWidth + "px";
      });
    }

    window.addEventListener('resize', setScreenSize);

    function setScreenSize() {
      if (window.innerWidth >= 500) {
        carouselDisplaying = 1;
      } else if (window.innerWidth >= 300) {
        carouselDisplaying = 1;
      } else {
        carouselDisplaying = 1;
      }
      getScreenSize();
    }

    function getScreenSize() {
      var slides = carousel.querySelectorAll('.slide');
      var slidesArray = Array.prototype.slice.call(slides);
      lengthOfSlide = (carousel.offsetWidth / carouselDisplaying);
      var initialWidth = -lengthOfSlide;
      slidesArray.forEach(function (el) {
        el.style.width = lengthOfSlide + "px";
        el.style.left = initialWidth + "px";
        initialWidth += lengthOfSlide;
      });
    }


    var rightNav = carousel.querySelector('.nav-right');
    rightNav.addEventListener('click', moveLeft);

    var moving = true;
    function moveRight() {
      if (moving) {
        moving = false;
        var lastSlide = carouselContent.lastElementChild;
        lastSlide.parentNode.removeChild(lastSlide);
        carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
        removeClone();
        var firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener('transitionend', activateAgain);
        moveSlidesRight();
      }
    }

    function activateAgain() {
      var firstSlide = carouselContent.firstElementChild;
      moving = true;
      firstSlide.removeEventListener('transitionend', activateAgain);
    }

    var leftNav = carousel.querySelector('.nav-left');
    leftNav.addEventListener('click', moveRight);

    // var moveLeftAgain = true;

    function moveLeft() {
      if (moving) {
        moving = false;
        removeClone();
        var firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener('transitionend', replaceToEnd);
        moveSlidesLeft();
      }
    }

    function replaceToEnd() {
      var firstSlide = carouselContent.firstElementChild;
      firstSlide.parentNode.removeChild(firstSlide);
      carouselContent.appendChild(firstSlide);
      firstSlide.style.left = ((arrayOfSlides.length - 1) * lengthOfSlide) + "px";
      addClone();
      moving = true;
      firstSlide.removeEventListener('transitionend', replaceToEnd);
    }




    carouselContent.addEventListener('mousedown', seeMovement);

    var initialX;
    var initialPos;
    function seeMovement(e) {
      initialX = e.clientX;
      getInitialPos();
      carouselContent.addEventListener('mousemove', slightMove);
      document.addEventListener('mouseup', moveBasedOnMouse);
    }

    function slightMove(e) {
      if (moving) {
        var movingX = e.clientX;
        var difference = initialX - movingX;
        if (Math.abs(difference) < (lengthOfSlide / 4)) {
          slightMoveSlides(difference);
        }
      }
    }

    function getInitialPos() {
      var slides = document.querySelectorAll('.slide');
      var slidesArray = Array.prototype.slice.call(slides);
      initialPos = [];
      slidesArray.forEach(function (el) {
        var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
        initialPos.push(left);
      });
    }

    function slightMoveSlides(newX) {
      var slides = document.querySelectorAll('.slide');
      var slidesArray = Array.prototype.slice.call(slides);
      slidesArray.forEach(function (el, i) {
        var oldLeft = initialPos[i];
        el.style.left = (oldLeft + newX) + "px";
      });
    }

    function moveBasedOnMouse(e) {
      var finalX = e.clientX;
      if (initialX - finalX > 0) {
        moveRight();
      } else if (initialX - finalX < 0) {
        moveLeft();
      }
      document.removeEventListener('mouseup', moveBasedOnMouse);
      carouselContent.removeEventListener('mousemove', slightMove);
    }



  }



  var carousels = document.getElementsByClassName("carousel")
  var index = 0;
  while (index < carousels.length) {
    makeCarousel(carousels[index]);
    index++
  }
  //vanilla js carousel





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









  //-------------------------
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
      start: "top 300px", //trigger, viewport
      end: "bottom bottom",
      scrub: 2,
      markers: false,
      toggleActions: "restart pause reverse reset"
    }
  });

  gsap.to(".p1", {
    y: -90,
    scrollTrigger: {
      trigger: ".p1",
      start: "top 380px", //trigger, viewport
      end: "bottom bottom",
      scrub: 1,
      markers: false,
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
