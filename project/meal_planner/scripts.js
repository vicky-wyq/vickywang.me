function isCenter(slide) {
  return slide.left === 40;
}

/**
Slides:
- left: number
- isRotating: boolean
- index: number

**/
function initializeSlides(slideElements) {
  var slides = [];
  slideElements.forEach((slideElement, index) => {
    slides.push({
      left: index * 20,
      element: slideElement,
      isRotating: false,
    });
  });
  return slides;
}

function moveLeft(slides) {
  if (slides[slides.length - 1].left === 60) {
    return;
  }
  slides.forEach((slide) => {
    slide.left -= 20;
    slide.isRotating = false;
  });
}

function moveRight(slides) {
  if (slides[0].left === 40) {
    return;
  }
  slides.forEach((slide) => {
    slide.left += 20;
    slide.isRotating = false;
  });
}

function convertToPixels(number) {
  return number + '%';
}


function renderSlides(slides) {
  slides.forEach((slide) => {
    if (slide.isRotating) {
      slide.element.style.transition = 'none';
    } else {
      slide.element.style.transition = 'left .05s cubic-bezier(.47,.13,.15,.89)';
    }

    setTimeout(function () {
      if (isCenter(slide)) {
        slide.element.classList.add('centerElement');
      } else {
        slide.element.classList.remove('centerElement');
      }
    }, 1);


    slide.element.style.left = convertToPixels(slide.left);
  })
}

function createCarousel(slidesClass, leftNavClass, rightNavClass) {
  var slideElements = document.querySelectorAll(slidesClass);

  var slides = initializeSlides(slideElements);
  renderSlides(slides);

  var leftButton = document.querySelector(leftNavClass);
  leftButton.addEventListener('click', () => {
    moveLeft(slides);
    renderSlides(slides);
  })

  var rightButton = document.querySelector(rightNavClass);
  rightButton.addEventListener('click', () => {
    moveRight(slides);
    renderSlides(slides);
  })
}

document.addEventListener("DOMContentLoaded", function (event) {
  //do work
  createCarousel('.hfSlide', '.hfLeft', '.hfRight');
  createCarousel('.lfSlide', '.lfLeft', '.lfRight');
  createCarousel('.mfSlide', '.mfLeft', '.mfRight');
  createCarousel('.hfSlide1', '.hfLeft1', '.hfRight1');



  //do xxxx







  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  var addColorTriggerMP = function (triggerMP) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerMP,
        start: "center 600px",
        end: "bottom 900px",
        scrub: 3,
        //toggleClass: "active",
        markers: false
      },
    })
    tl.to(triggerMP, {
      backgroundColor: "#FFE28B",
      duration: 30,
      y: 50
    })
      .to(triggerMP, {
        backgroundColor: "#F5F5F5",
        duration: 15,
        y: 90
      });
  }
  addColorTriggerMP("#bg-color-triggerMP")
  //bg color change
  //ScrollTrigger



});
