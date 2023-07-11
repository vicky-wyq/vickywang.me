document.addEventListener("DOMContentLoaded", function (event) {
  //do work

  // Modal Setup
  var modal = document.getElementById('modal');
  var modalClose = document.getElementById('modal-close');

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener('click', function () {
      modal.style.display = "none";
    });
  }


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

  // Scroll add/remove classes Starts
  window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const anchor = document.querySelector(`nav li a[href="#${id}"]`);

        if (anchor) {
          const activeLi = anchor.parentElement;
          const ul = activeLi.querySelector('ul');

          if (entry.intersectionRatio > 0) {
            activeLi.classList.add('active');
            if (ul) {
              ul.classList.add('active');
            }
          } else {
            activeLi.classList.remove('active');
            if (ul) {
              ul.classList.remove('active');
            }
          }
        }
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
  });

  // Scroll add/remove classes ends



  (function () {
    function initLRcarousel(carouselId) {
      const carousel = document.querySelector(`#${carouselId}`);
  
      // If the carousel doesn't exist, stop here.
      if (!carousel) {
        return;
      }
  
      let activeIndex = 0;
      let autoplayInterval;
  
      function updateActiveSlide() {
        const slides = carousel.querySelectorAll('.slides-item');
        const navLinks = carousel.querySelectorAll('.slider-nav');
        const slidesContainer = carousel.querySelector('.LRslides');
        activeIndex = Math.round(slidesContainer.scrollTop / slidesContainer.clientHeight);
  
        navLinks.forEach((navLink, index) => {
          if (index === activeIndex) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        });
      }
  
      function scrollToSlide(slideIndex) {
        const slidesContainer = carousel.querySelector('.LRslides');
        slidesContainer.scrollTo({
          top: slideIndex * slidesContainer.clientHeight,
          behavior: 'smooth',
        });
      }
  
      function startAutoplay() {
        const totalSlides = carousel.querySelectorAll('.slides-item').length;
  
        let currentSlide = activeIndex;
        autoplayInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          scrollToSlide(currentSlide);
          updateActiveSlide();
        }, 3800);
      }
  
      function stopAutoplay() {
        clearInterval(autoplayInterval);
      }
  
      startAutoplay();
  
      const navLinks = carousel.querySelectorAll('.slider-nav');
      navLinks.forEach((navLink, index) => {
        navLink.addEventListener('mouseenter', () => {
          scrollToSlide(index);
          updateActiveSlide();
          stopAutoplay();
        });
        navLink.addEventListener('mouseleave', () => {
          startAutoplay();
        });
      });
  
      carousel.querySelector('.LRslides').addEventListener('scroll', updateActiveSlide);
  
      updateActiveSlide();
    }
  
    // Usage
    initLRcarousel('carousel1');
    initLRcarousel('carousel2');
  })();
  // LRCarousel ends
  




  // TBcarousel Starts
  /*
    (function () {
    function initCarousel(carouselSelector) {
      let activeIndex = 0;

      function updateActiveSlide() {
        const carousel = document.querySelector(carouselSelector);
        const slides = carousel.querySelectorAll('.TBslidesItem');
        const navLinks = carousel.querySelectorAll('.TBsliderNav');
        const slidesContainer = carousel.querySelector('.TBslides');
        activeIndex = Math.round(slidesContainer.scrollLeft / slidesContainer.clientWidth);

        navLinks.forEach((navLink, index) => {
          if (index === activeIndex) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        });
      }

      let autoplayInterval;

      function scrollToSlide(slideIndex, carousel) {
        const slidesContainer = carousel.querySelector('.TBslides');
        slidesContainer.scrollTo({
          left: slideIndex * slidesContainer.clientWidth,
          behavior: 'smooth',
        });
      }

      function startAutoplay(carousel) {
        const slidesContainer = carousel.querySelector('.TBslides');
        const totalSlides = carousel.querySelectorAll('.TBslidesItem').length;

        let currentSlide = activeIndex;
        autoplayInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          scrollToSlide(currentSlide, carousel);
          updateActiveSlide();
        }, 3800);
      }

      function stopAutoplay() {
        clearInterval(autoplayInterval);
      }

      const carousels = document.querySelectorAll(carouselSelector);
      carousels.forEach(carousel => {
        startAutoplay(carousel);

        const navLinks = carousel.querySelectorAll('.TBsliderNav');
        navLinks.forEach((navLink, index) => {
          navLink.addEventListener('mouseenter', () => {
            scrollToSlide(index, carousel);
            updateActiveSlide();
            stopAutoplay();
          });
          navLink.addEventListener('mouseleave', () => {
            startAutoplay(carousel);
          });
        });

        carousel.querySelector('.TBslides').addEventListener('scroll', updateActiveSlide);

        updateActiveSlide();
      });
    }

    // Usage
    initCarousel('#TBcarousel1');
    initCarousel('#TBcarousel2');
    initCarousel('#TBcarouselGlorify1');
  })();
  */

  // TBcarousel Ends






  // TBcarousel Starts
  (function () {
    function initCarousel(carouselSelector) {
      let activeIndex = 0;

      function updateActiveSlide(carousel) {
        const slides = carousel.querySelectorAll('.TBslidesItem');
        const navLinks = carousel.querySelectorAll('.TBsliderNav');
        const slidesContainer = carousel.querySelector('.TBslides');
        activeIndex = Math.round(slidesContainer.scrollLeft / slidesContainer.clientWidth);

        navLinks.forEach((navLink, index) => {
          if (index === activeIndex) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        });
      }

      let autoplayInterval;

      function scrollToSlide(slideIndex, carousel) {
        const slidesContainer = carousel.querySelector('.TBslides');
        slidesContainer.scrollTo({
          left: slideIndex * slidesContainer.clientWidth,
          behavior: 'smooth',
        });
      }

      function startAutoplay(carousel) {
        const slidesContainer = carousel.querySelector('.TBslides');
        const totalSlides = carousel.querySelectorAll('.TBslidesItem').length;

        let currentSlide = activeIndex;
        autoplayInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          scrollToSlide(currentSlide, carousel);
          updateActiveSlide(carousel);
        }, 3800);
      }

      function stopAutoplay() {
        clearInterval(autoplayInterval);
      }

      const carousels = document.querySelectorAll(carouselSelector);
      carousels.forEach(carousel => {
        // If the carousel doesn't exist, skip this iteration
        if (!carousel) return;

        startAutoplay(carousel);

        const navLinks = carousel.querySelectorAll('.TBsliderNav');
        navLinks.forEach((navLink, index) => {
          navLink.addEventListener('mouseenter', () => {
            scrollToSlide(index, carousel);
            updateActiveSlide(carousel);
            stopAutoplay();
          });
          navLink.addEventListener('mouseleave', () => {
            startAutoplay(carousel);
          });
        });

        carousel.querySelector('.TBslides').addEventListener('scroll', () => updateActiveSlide(carousel));

        updateActiveSlide(carousel);
      });
    }

    // Usage
    initCarousel('#TBcarousel1');
    initCarousel('#TBcarousel2');
    initCarousel('#TBcarouselGlorify1');
    initCarousel('#TBcarouselGlorify2');
    initCarousel('#TBcarouselGlorify3');
    initCarousel('#TBcarouselGlorify4');
    initCarousel('#TBcarouselGlorify5');
    initCarousel('#TBcarouselGlorify6');
    initCarousel('#TBcarouselGlorify7');
    initCarousel('#TBcarouselGlorify8');
    initCarousel('#TBcarouselGlorify9');


  })();
  // TBcarousel Ends



  // TBcarousel Ends





});
