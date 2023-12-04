



document.addEventListener("DOMContentLoaded", function (event) {
  //do work




  // Helper function to copy text to the clipboard
  function copyToClipboard(textElement, feedbackElement) {
    textElement.select();
    document.execCommand("copy");
    feedbackElement.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
      feedbackElement.classList.remove("active");
    }, 2500);
  }
  // Attach event listener to all .copy-text button elements
  let copyTextContainers = document.querySelectorAll(".copy-text");

  copyTextContainers.forEach(function (container) {
    let button = container.querySelector("button");
    let input = container.querySelector("input.text");

    button.addEventListener("click", function () {
      copyToClipboard(input, container);
    });
  });

  // ====== textbox copy to clipboard ======







  function copyTextToClipboard(text, callback) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        callback(null);
      }, function (err) {
        callback(err);
      });
    } else {
      // Fallback for older browsers without clipboard API
      try {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!successful) throw new Error("Failed to copy");
        callback(null);
      } catch (err) {
        callback(err);
      }
    }
  }

  // Attach event listener to all .ClipboardIconOnly buttons
  document.querySelectorAll('.ClipboardIconOnly').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default action

      var currentButton = e.currentTarget;
      // Extract text from the .clickIconCopy element inside the clicked button
      var textToCopy = currentButton.querySelector('.clickIconCopy').innerText;

      // Copy the extracted text to the clipboard
      copyTextToClipboard(textToCopy, function (err) {
        if (err) {
          throw err;
        } else {
          // Optional: Show a temporary "Copied!" message or any other feedback mechanism
          var feedback = document.createElement('div');

          feedback.className = "copiedByClickIcon";
          feedback.innerText = 'Copied!';
          currentButton.appendChild(feedback);
          setTimeout(function () {
            currentButton.removeChild(feedback);
          }, 1500);
        }
      });
    });
  });
  // Append the copyAlert inside the ClipboardBox

  // ========== click icon to copy  

  function copyTargetText(e, callback) {
    var textToCopy = e.target.innerText;


    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(function () {
        callback(null);
      }, function (err) {
        callback(err);
      });
    } else {
      try {
        var textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!successful) throw new Error("Failed to copy");
        callback(null);
      } catch (err) {
        callback(err);
      }
    }
  }

  // Get all buttons with class "Clipboard"
  var buttons = document.querySelectorAll("button.Clipboard");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      copyTargetText(e, function (err) {
        if (err) {
          console.error("Failed to copy: ", err);
          return;
        }
        var ClipboardBox = e.target.closest(".ClipboardBox"); // Find the closest .ClipboardBox parent of the clicked button
        var copyAlert = document.createElement("div");
        copyAlert.className = "copied";
        copyAlert.innerText = 'Copied';

        // Append the copyAlert inside the ClipboardBox
        ClipboardBox.appendChild(copyAlert);

        setTimeout(function () {
          copyAlert.remove();
        }, 1500);
      });
    });
  });

  //copy Clipboard


  const copyButtonLabel = "Copy Code";

  // use a class selector if available
  let blocks = document.querySelectorAll("pre");

  blocks.forEach((block) => {
    // only add button if browser supports Clipboard API
    if (navigator.clipboard) {
      let button = document.createElement("button");

      button.innerText = copyButtonLabel;
      block.appendChild(button);

      button.addEventListener("click", async () => {
        await copyCode(block, button);
      });
    }
  });

  async function copyCode(block, button) {
    let code = block.querySelector("code");
    let text = code.innerText;

    await navigator.clipboard.writeText(text);

    // visual feedback that task is completed
    button.innerText = "Code Copied";

    setTimeout(() => {
      button.innerText = copyButtonLabel;
    }, 700);
  }
  //copy code



  const gifImages = document.querySelectorAll('.gif-toggle');

  gifImages.forEach(gifImage => {
    let isPlaying = false;  // Initially, the GIF is not playing

    gifImage.addEventListener('mouseover', function () {
      this.src = this.dataset.gif;
    });

    gifImage.addEventListener('mouseout', function () {
      this.src = this.dataset.static;
    });

    // Handling touch devices
    gifImage.addEventListener('touchend', function () {
      if (isPlaying) {
        this.src = this.dataset.static;
      } else {
        this.src = this.dataset.gif;
      }
      isPlaying = !isPlaying;
    });
  });
  //gif hover/tap to play

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

      // Read background color from the clicked element's data attribute
      var bgColor = img.getAttribute('data-bgcolor');
      if (bgColor) {
        modal.style.backgroundColor = bgColor;
      }

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

      function scrollToSlide(slideIndex, carousel) {
        const slidesContainer = carousel.querySelector('.TBslides');
        slidesContainer.scrollTo({
          left: slideIndex * slidesContainer.clientWidth,
          behavior: 'smooth',
        });
      }

      const carousels = document.querySelectorAll(carouselSelector);
      carousels.forEach(carousel => {
        // If the carousel doesn't exist, skip this iteration
        if (!carousel) return;

        const navLinks = carousel.querySelectorAll('.TBsliderNav');
        navLinks.forEach((navLink, index) => {
          navLink.addEventListener('mouseenter', () => {
            scrollToSlide(index, carousel);
            updateActiveSlide(carousel);
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




  // LRCarousel starts
  (function () {
    function initLRcarousel(carouselId) {
      const carousel = document.querySelector(`#${carouselId}`);

      // If the carousel doesn't exist, stop here.
      if (!carousel) {
        return;
      }

      let activeIndex = 0;

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

      const navLinks = carousel.querySelectorAll('.slider-nav');
      navLinks.forEach((navLink, index) => {
        navLink.addEventListener('mouseenter', () => {
          scrollToSlide(index);
          updateActiveSlide();
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



  // Global variable to hold the currently playing audio element
let currentlyPlaying = null;

function initAudioPlayer(audioContainer) {
  const audioElement = audioContainer.querySelector('audio');
  const playButton = audioContainer.querySelector('.play-button');
  const timeDisplay = audioContainer.querySelector('.time-display');

  playButton.addEventListener("click", function() {
    // Pause the currently playing audio if there is one
    if (currentlyPlaying && currentlyPlaying !== audioElement) {
      currentlyPlaying.pause();
      currentlyPlaying.closest('.audio-container').querySelector('.play-button').innerHTML = "Play";
    }

    // Play or pause the clicked audio element
    if (audioElement.paused) {
      audioElement.play();
      playButton.innerHTML = "Pause";
      currentlyPlaying = audioElement;
    } else {
      audioElement.pause();
      playButton.innerHTML = "Play";
      currentlyPlaying = null;
    }
  });

  // Update time display during playback
  audioElement.addEventListener("timeupdate", function() {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    timeDisplay.innerHTML = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  });

  // Reset the play button and currentlyPlaying when the audio ends
  audioElement.addEventListener("ended", function() {
    playButton.innerHTML = "Play";
    currentlyPlaying = null;
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

// Initialize each audio player
document.querySelectorAll('.audio-container').forEach(initAudioPlayer);






});
