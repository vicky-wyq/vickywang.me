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






  // TBcarousel Starts
  
  (function () {
    let activeIndex = 0;

    function updateActiveSlide() {
      const slides = document.querySelectorAll('.TBslidesItem');
      const navLinks = document.querySelectorAll('.TBsliderNav');
      const slidesContainer = document.querySelector('.TBslides');
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

    function scrollToSlide(slideIndex) {
      const slidesContainer = document.querySelector('.TBslides');
      slidesContainer.scrollTo({
        left: slideIndex * slidesContainer.clientWidth,
        behavior: 'smooth',
      });
    }

    function startAutoplay() {
      const slidesContainer = document.querySelector('.TBslides');
      const totalSlides = document.querySelectorAll('.TBslidesItem').length;

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

    const navLinks = document.querySelectorAll('.TBsliderNav');
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

    document.querySelector('.TBslides').addEventListener('scroll', updateActiveSlide);

    updateActiveSlide();
})();

  // TBcarousel Ends


});
