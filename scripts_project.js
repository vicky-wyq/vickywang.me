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
        const activeLi = document.querySelector(`nav li a[href="#${id}"]`).parentElement;
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
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
  });

  /*
    window.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.intersectionRatio > 0) {
            const activeLi = document.querySelector(`nav li a[href="#${id}"]`).parentElement;
            activeLi.classList.add('active');
            activeLi.querySelector('ul').classList.add('active'); // add this line
          } else {
            const inactiveLi = document.querySelector(`nav li a[href="#${id}"]`).parentElement;
            inactiveLi.classList.remove('active');
            inactiveLi.querySelector('ul').classList.remove('active'); // add this line
          }
        });
      });
  
      // Track all sections that have an `id` applied
      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });
    });
   */

  // Scroll add/remove classes ends

  // LRcarousel Starts

  class Carousel {
    constructor(carouselId) {
      this.carouselId = carouselId;
      this.activeIndex = 0;
      this.autoplayInterval = null;

      this.init();
    }

    init() {
      this.startAutoplay();

      const navLinks = document.querySelectorAll(`#${this.carouselId} .slider-nav`);
      navLinks.forEach((navLink, index) => {
        navLink.addEventListener('mouseenter', () => {
          this.scrollToSlide(index);
          this.updateActiveSlide();
          this.stopAutoplay();
        });
        navLink.addEventListener('mouseleave', () => {
          this.startAutoplay();
        });
      });

      document.querySelector(`#${this.carouselId} .LRslides`).addEventListener('scroll', () => {
        this.updateActiveSlide();
      });

      this.updateActiveSlide();
    }

    updateActiveSlide() {
      const slides = document.querySelectorAll(`#${this.carouselId} .slides-item`);
      const navLinks = document.querySelectorAll(`#${this.carouselId} .slider-nav`);
      const slidesContainer = document.querySelector(`#${this.carouselId} .LRslides`);
      this.activeIndex = Math.round(slidesContainer.scrollTop / slidesContainer.clientHeight);

      navLinks.forEach((navLink, index) => {
        if (index === this.activeIndex) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      });
    }

    scrollToSlide(slideIndex) {
      const slidesContainer = document.querySelector(`#${this.carouselId} .LRslides`);
      slidesContainer.scrollTo({
        top: slideIndex * slidesContainer.clientHeight,
        behavior: 'smooth',
      });
    }

    startAutoplay() {
      const slidesContainer = document.querySelector(`#${this.carouselId} .LRslides`);
      const totalSlides = document.querySelectorAll(`#${this.carouselId} .slides-item`).length;

      let currentSlide = this.activeIndex;
      this.autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        this.scrollToSlide(currentSlide);
        this.updateActiveSlide();
      }, 3800);
    }

    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    }
  }

  const carousel1 = new Carousel('carousel1');
  const carousel2 = new Carousel('carousel2');


  // LRcarousel Ends


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



  // TBcarousel Starts


  


  // TBcarousel Ends


});
