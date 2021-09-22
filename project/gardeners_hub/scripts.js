document.addEventListener("DOMContentLoaded", function (event) {
  //do work

  function makeCarouselGH(carouselGH) {
    var carouselContent = carouselGH.querySelector('.carouselContentGH');
    var slides = carouselGH.querySelectorAll('.slideGH');
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
      var slides = carouselGH.querySelectorAll('.slideGH');
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
      var slides = carouselGH.querySelectorAll('.slideGH');
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
        carouselDisplaying = 5;
      } else if (window.innerWidth >= 300) {
        carouselDisplaying = 3;
      } else {
        carouselDisplaying = 1;
      }
      getScreenSize();
    }

    function getScreenSize() {
      var slides = carouselGH.querySelectorAll('.slide');
      var slidesArray = Array.prototype.slice.call(slides);
      lengthOfSlide = (carouselGH.offsetWidth / carouselDisplaying);
      var initialWidth = -lengthOfSlide;
      slidesArray.forEach(function (el) {
        el.style.width = lengthOfSlide + "px";
        el.style.left = initialWidth + "px";
        initialWidth += lengthOfSlide;
      });
    }


    var rightNav = carouselGH.querySelector('.nav-right-gh');
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

    var leftNav = carouselGH.querySelector('.nav-left-gh');
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
      var slides = document.querySelectorAll('.slideGH');
      var slidesArray = Array.prototype.slice.call(slides);
      initialPos = [];
      slidesArray.forEach(function (el) {
        var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
        initialPos.push(left);
      });
    }

    function slightMoveSlides(newX) {
      var slides = document.querySelectorAll('.slideGH');
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
  var carouselsGH = document.getElementsByClassName("carouselGH")
  var index = 0;
  while (index < carouselsGH.length) {
    makeCarouselGH(carouselsGH[index]);
    index++
  }
  //vanilla js carousel longer 
  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  var addColorTrigger = function (trigger) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "center 600px",
        end: "bottom 900px",
        scrub: 3,
        //toggleClass: "active",
        markers: false
      },
    })
    tl.to(trigger, {
      backgroundColor: "#4C665B",
      duration: 15,
      y: 60
    })
      .to(trigger, {
        backgroundColor: "#EAF0EE",
        duration: 15,
        y: 90
      });
  }
  addColorTrigger("#bg-color-trigger")
  //bg color change
  var addOpacityTrigger = function (trigger) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top center",
        end: "bottom 900px",
        scrub: 3,
        markers: false
      },
    })
    tl.to(trigger, {
      backgroundColor: "#EAF0EE",
      duration: 15,
      y: 30
    });
  }
  addOpacityTrigger("#bg-color-opc")
  addOpacityTrigger("#bg-color-opc1")
  addOpacityTrigger("#bg-color-opc2")
  //bg opacity change
  var YAxisTrigger = function (trigger) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "trigger 600px",
        end: "trigger 800px",
        scrub: 3,
        markers: false
      },
    })
    tl.to(trigger, {
      color: "#A9D9D9",
      duration: 2,
      y: -30
    })
    .to(trigger, {
      color: "#000000",
      duration: 1,
      y: 20

    });
  }
  YAxisTrigger("#ytrigger-gh1")
  YAxisTrigger("#ytrigger-gh2")
  YAxisTrigger("#ytrigger-gh3")
  YAxisTrigger("#ytrigger-gh4")
  //ScrollTrigger


 
});
