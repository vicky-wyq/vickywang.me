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

// LRcarousel Starts


let activeIndex = 0;

// Define a function to update the active slide indicator
function updateActiveSlide() {
  const slides = document.querySelectorAll('.slides-item');
  const navLinks = document.querySelectorAll('.slider-nav');
  const slidesContainer = document.querySelector('.LRslides');
  activeIndex = Math.round(slidesContainer.scrollTop / slidesContainer.clientHeight);

  // Remove 'active' class from all nav links and add it to the active one
  navLinks.forEach((navLink, index) => {
    if (index === activeIndex) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
      
    }
  });
}

let autoplayInterval;

// Define a function to scroll to the specified slide
function scrollToSlide(slideIndex) {
  const slidesContainer = document.querySelector('.LRslides');
  slidesContainer.scrollTo({
    top: slideIndex * slidesContainer.clientHeight,
    behavior: 'smooth',
  });
}

// Function to start autoplay
function startAutoplay() {
  const slidesContainer = document.querySelector('.LRslides');
  const totalSlides = document.querySelectorAll('.slides-item').length;

  let currentSlide = activeIndex;
  autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    scrollToSlide(currentSlide);
    updateActiveSlide();
  }, 3000); // Change the number to adjust the time interval between slide transitions (in milliseconds)
}

// Function to stop autoplay
function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Start autoplay on page load
startAutoplay();

// Add 'mouseenter' event listeners to the slider navigation links
const navLinks = document.querySelectorAll('.slider-nav');
navLinks.forEach((navLink, index) => {
  navLink.addEventListener('mouseenter', () => {
    scrollToSlide(index);
    updateActiveSlide();
    stopAutoplay(); // Stop autoplay when the user interacts with the carousel
  });
  navLink.addEventListener('mouseleave', () => {
    startAutoplay(); // Stop autoplay when the user interacts with the carousel
  });
});


// Add the scroll event listener
document.querySelector('.LRslides').addEventListener('scroll', updateActiveSlide);

// Update the active slide indicator on page load
updateActiveSlide();


// LRcarousel Ends


});
