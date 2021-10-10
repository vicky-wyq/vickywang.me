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
  if (slides[slides.length - 1].left === 40) {
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




