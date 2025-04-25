//

class FibonacciSphere {
  #points;

  get points() {
    return this.#points;
  }

  constructor(N) {
    this.#points = [];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y ** 2);
      const a = goldenAngle * i;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;

      this.#points.push([x, y, z]);
    }
  }
}

class TagsCloud {
  #root;
  #size;
  #sphere;
  #tags;
  #rotationAxis;
  #rotationAngle;
  #rotationSpeed;
  #frameRequestId;

  constructor(root) {
    this.#root = root;
    this.#size = this.#root.offsetWidth;
    this.#tags = root.querySelectorAll(".tag");
    this.#sphere = new FibonacciSphere(this.#tags.length);
    this.#rotationAxis = [1, 0, 0];
    this.#rotationAngle = 0;
    this.#rotationSpeed = 0;

    this.#updatePositions();
    this.#initEventListeners();
    this.#root.classList.add("-loaded");
  }

  #initEventListeners() {
    window.addEventListener("resize", this.#updatePositions.bind(this));
    document.addEventListener("mousemove", this.#onMouseMove.bind(this));
  }

  #updatePositions() {
    this.#size = this.#root.offsetWidth;

    const sin = Math.sin(this.#rotationAngle);
    const cos = Math.cos(this.#rotationAngle);
    const ux = this.#rotationAxis[0];
    const uy = this.#rotationAxis[1];
    const uz = this.#rotationAxis[2];

    const rotationMatrix = [
      [
        cos + ux ** 2 * (1 - cos),
        ux * uy * (1 - cos) - uz * sin,
        ux * uz * (1 - cos) + uy * sin,
      ],
      [
        uy * ux * (1 - cos) + uz * sin,
        cos + uy ** 2 * (1 - cos),
        uy * uz * (1 - cos) - ux * sin,
      ],
      [
        uz * ux * (1 - cos) - uy * sin,
        uz * uy * (1 - cos) + ux * sin,
        cos + uz ** 2 * (1 - cos),
      ],
    ];

    const N = this.#tags.length;

    for (let i = 0; i < N; i++) {
      const x = this.#sphere.points[i][0];
      const y = this.#sphere.points[i][1];
      const z = this.#sphere.points[i][2];

      const transformedX =
        rotationMatrix[0][0] * x +
        rotationMatrix[0][1] * y +
        rotationMatrix[0][2] * z;
      const transformedY =
        rotationMatrix[1][0] * x +
        rotationMatrix[1][1] * y +
        rotationMatrix[1][2] * z;
      const transformedZ =
        rotationMatrix[2][0] * x +
        rotationMatrix[2][1] * y +
        rotationMatrix[2][2] * z;

      const translateX = (this.#size * transformedX) / 2;
      const translateY = (this.#size * transformedY) / 2;
      const scale = (transformedZ + 2) / 3;
      const transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
      const opacity = (transformedZ + 1.5) / 2.5;

      this.#tags[i].style.transform = transform;
      this.#tags[i].style.opacity = opacity;
    }
  }

  #onMouseMove(e) {
    const rootRect = this.#root.getBoundingClientRect();
    const deltaX = e.clientX - (rootRect.left + this.#root.offsetWidth / 2);
    const deltaY = e.clientY - (rootRect.top + this.#root.offsetHeight / 2);
    const a = Math.atan2(deltaX, deltaY) - Math.PI / 2;
    const axis = [Math.sin(a), Math.cos(a), 0];
    const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 120;

    this.#rotationAxis = axis;
    this.#rotationSpeed = speed;
  }

  #update() {
    this.#rotationAngle += this.#rotationSpeed;

    this.#updatePositions();
  }

  start() {
    this.#update();

    this.#frameRequestId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.#frameRequestId);
  }
}

function main() {
  {
    const root = document.getElementById("TagsCloud");
    if (!root) {
      console.info("TagsCloud not found, skipping initialization");
      return;
    }

    const cloud = new TagsCloud(root);
    cloud.start();
  }
}
// TagsCloud

(function () {
  var lastKnownScrollY = 0;
  var currentScrollY = 0;
  var ticking = false;
  var idOfHeader = "header";
  var eleHeader = null;
  const classes = {
    pinned: "header-pin",
    unpinned: "header-unpin",
  };

  function onScroll() {
    currentScrollY = window.pageYOffset;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    if (currentScrollY < lastKnownScrollY) {
      pin();
    } else if (currentScrollY > lastKnownScrollY) {
      unpin();
    }
    lastKnownScrollY = currentScrollY;
    ticking = false;
  }

  function pin() {
    if (eleHeader && eleHeader.classList.contains(classes.unpinned)) {
      eleHeader.classList.remove(classes.unpinned);
      eleHeader.classList.add(classes.pinned);
    }
  }

  function unpin() {
    if (
      eleHeader &&
      (eleHeader.classList.contains(classes.pinned) ||
        !eleHeader.classList.contains(classes.unpinned))
    ) {
      eleHeader.classList.remove(classes.pinned);
      eleHeader.classList.add(classes.unpinned);
    }
  }

  function initHeader() {
    eleHeader = document.getElementById(idOfHeader);
    if (eleHeader) {
      document.addEventListener("scroll", onScroll, false);
    } else {
      console.error("Header element not found");
    }
  }

  // Ensuring this code doesn't conflict with other window.onload events
  if (window.addEventListener) {
    window.addEventListener("load", initHeader);
  } else if (window.attachEvent) {
    window.attachEvent("onload", initHeader);
  }
})();

function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
    height = document.body.scrollHeight - document.body.clientHeight,
    scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
  console.log("height", height);
  console.log("scrollHeight", document.documentElement.scrollHeight);
  console.log("clientHeight", document.documentElement.clientHeight);
}

window.onscroll = function () {
  progressBarScroll();
};
//progressBarScroll

// ====== Components ====== //

function toggleContent(button) {
  const content = button.previousElementSibling;

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    button.innerHTML = "Read More &#8744;";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    button.innerHTML = "Read Less &#8743;";
  }
}

function initializeToggles() {
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(function (toggle) {
    // Add the click event listener to each button
    toggle.addEventListener("click", function () {
      toggleContent(toggle);
    });
  });
}
//Read more/less

const k = {
  onboardingSubscription:
    "U2FsdGVkX1/flTfDtan9WXoDnkCK30v0Y5pr4g5B680u6cXGNODszTEE+d0dCpzHn1coOmfqkGnppGteFyeRmn8ogiL8n2JOH2IyzJ2ygMU=",
  consumerBooking:
    "U2FsdGVkX1+VI5o7dvnsAbt6FozAHMjH4sdn9h0J39WmKfWQNAEz2YSscVzqJMF3P9e0jZAOqfvspeHkrDkmYA==",
  reportDashboard:
    "U2FsdGVkX18Z2dWz5GK/EO+7PK/3YIzwGzsIprovMAIRhty//ju8XJucom0hVJc9IxVLutYG370p04QhtuF+IO2U7eeof9Z/znjSkQQ4Fog=",
  b2bAppRedesign:
    "U2FsdGVkX19Uce5voQ0Q4b/a5B0LT6weF9bp/oUKbcGnyA8rXm7v93bU6txTPFJ3M1xXp5IAB7AdCT2sGfkRrQ==",
  adminPanel:
    "U2FsdGVkX19K1sDLgl3F24dUiedAbfbc+45iz09vBJtd1gB97S1G9o0KzVVroLCBb2nZ1scw21KiZFSO4OXzPg==",
  costCalculator:
    "U2FsdGVkX1/2lRGAhqW904kCtrCxk6BDNW/6OEzFa7lpDi0+mAcRz1TmS6BOm/EwSh5A8LMTshIgcaaeHJzuJjHeeq/180eXb0eDZitlj98=",
  rxZero:
    "U2FsdGVkX1/IJBtSaeMqta+AxGqEUk0aAWJWTn5PNgNcBe/c0pmDLVT544lK0G2wfOzexAFV6g2C6E+d0hx3Fw==",
};

function initializePassword() {
  // Select all password fields and submit buttons
  const passwordFields = document.querySelectorAll(".psJS");
  const submitButtons = document.querySelectorAll(".passwordArr");

  // Iterate over each password field
  passwordFields.forEach((pass, index) => {
    const submit = submitButtons[index]; // Corresponding submit button
    const msg = pass
      .closest(".input-field")
      .querySelector(".pwIncorrectHeight span");

    // Add event listener for keypress on password field
    pass.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
      }
    });

    // Add event listener for click on submit button
    submit.addEventListener("click", () => {
      // Your existing logic to check password and handle redirection
      if (!k[pass.id]) {
        throw new Error(
          `${pass.id} is not a valid page. Please ensure the "id" field of the password input is correct`
        );
      }
      const w = k[pass.id];
      let redirect;
      try {
        let decrypted = CryptoJS.AES.decrypt(w, pass.value);
        redirect = CryptoJS.enc.Utf8.stringify(decrypted);
      } catch (e) {
        console.log(e);
      }
      if (redirect && redirect.includes("BYP_LH")) {
        window.location.href = redirect;
        msg.style.display = "none";
      } else {
        // Correctly display the message when the password is incorrect
        msg.style.display = "block";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  //do work
// ====== AOS Starts ====== //

AOS.init({
  delay: 180,
  duration: 1000
});


// ====== AOS Ends ====== //

  


  // ====== Hamburger Menu Starts ====== //
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }
  // ====== Hamburger Menu Ends ====== //

  /* =================== number animation  ===================*/
  class CountUp {
    constructor(el) {
      this.el = el;
      this.setVars();
      this.init();
    }

    setVars() {
      this.number = this.el.querySelectorAll("[data-countup-number]");
      this.observerOptions = {
        root: null,
        rootMargin: "0px 0px",
        threshold: 0,
      };
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const end = parseFloat(
            entry.target.dataset.countupNumber.replace(/,/g, "")
          );
          const decimals = this.countDecimals(end);
          if (entry.isIntersecting) {
            this.iterateValue(entry.target, end, decimals);
          }
        });
      }, this.observerOptions);
    }

    init() {
      if (this.number.length > 0) {
        this.number.forEach((el) => {
          this.observer.observe(el);
        });
      }
    }

    iterateValue(el, end, decimals) {
      const start = 0;
      const duration = 2500;
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsedPercent = (timestamp - startTimestamp) / duration;
        const easedProgress = Math.min(this.easeOutQuint(elapsedPercent), 1);
        let interimNumber = Math.abs(easedProgress * (end - start) + start);
        el.innerHTML = this.formatNumber(interimNumber, decimals);
        if (easedProgress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }

    easeOutQuint(x) {
      return 1 - Math.pow(1 - x, 5);
    }

    countDecimals(val) {
      if (Math.floor(val) === val) return 0;
      return val.toString().split(".")[1]?.length || 0;
    }

    formatNumber(val, decimals) {
      return val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
  }

  // Simplified version to attach instances for this demo
  const dataModules = [...document.querySelectorAll('[data-module="countup"]')];

  dataModules.forEach((element) => {
    new CountUp(element);
  });

  /* =================== number animation  ===================*/

  /* =================== click show pw  ===================*/
  var cards = document.querySelectorAll(".img__wrap");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      var description = card.querySelector(".img__description");
      description.classList.add("img__description--visible");
    });

    card.addEventListener("mouseleave", function () {
      var description = card.querySelector(".img__description");
      description.classList.remove("img__description--visible");
    });
  });
  /* =================== click show pw  ===================*/

  /* =================== carousel intro  ===================*/

  //autoplay

  (function () {
    const slider = document.querySelector(".slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    // Check if the required elements exist
    if (!slider || !prevButton || !nextButton) {
      return; // Exit the function if any element is missing
    }

    let autoplayIntervalID;
    let isAutoplayPaused = false;

    function activate(e) {
      const items = document.querySelectorAll(".item");
      if (e.target.matches(".next") || e.type === "autoplay") {
        slider.append(items[0]);
      } else if (e.target.matches(".prev")) {
        slider.prepend(items[items.length - 1]);
      }
    }

    document.addEventListener("click", activate, false);

    // Autoplay functionality
    const autoplayInterval = 5000; // 5000 milliseconds = 5 seconds

    function autoplay() {
      if (!isAutoplayPaused) {
        const items = document.querySelectorAll(".item");
        slider.append(items[0]); // Move the first item to the end of the slider
      }
    }

    autoplayIntervalID = setInterval(autoplay, autoplayInterval);

    // Pause autoplay on button click
    function pauseAutoplay() {
      isAutoplayPaused = true;
      clearInterval(autoplayIntervalID);
    }

    prevButton.addEventListener("click", pauseAutoplay);
    nextButton.addEventListener("click", pauseAutoplay);
  })();

  /* ===================
  //no autoplay
  const slider = document.querySelector(".slider");
  
  function activate(e) {
    const items = document.querySelectorAll(".item");
    e.target.matches(".next") && slider.append(items[0]);
    e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
  }
  
  document.addEventListener("click", activate, false);
  ===================*/

  /* =================== carousel intro  ===================*/

  // ====== Scroll bar ====== //

  initializeToggles();
/* =================== accTrigger ===================*/
const accTriggers = document.querySelectorAll(".accTrigger");

accTriggers.forEach((trigger) => {
  trigger.addEventListener("click", function () {
    const content = this.nextElementSibling;
    content.classList.toggle("is-open");
    this.classList.toggle("is-open");

    if (content.classList.contains("is-open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});



/* =================== accTrigger ===================*/



  // ====== accordion Starts ====== //
  const accordionBtns = document.querySelectorAll(".accordion");

  accordionBtns.forEach((accordion) => {
    accordion.onclick = function () {
      this.classList.toggle("is-open");

      let content = this.nextElementSibling;
      console.log(content);

      if (content.style.maxHeight) {
        //this is if the accordion is open
        content.style.maxHeight = null;
      } else {
        //if the accordion is currently closed
        content.style.maxHeight = content.scrollHeight + "px";
        console.log(content.style.maxHeight);
      }
    };
  });
  // ====== accordion Ends ====== //

  initializePassword();



  // ====== Back to Top Starts ====== //

  var mybutton = document.getElementById("myBtn");
  //Get the button

  if (mybutton) {
    window.addEventListener("scroll", function () {
      scrollFunction();
    });
    mybutton.addEventListener("click", topFunction);
  }

  // When the user scrolls down 20px from the top of the document, show the button

  function scrollFunction() {
    if (
      document.body.scrollTop > 1200 ||
      document.documentElement.scrollTop > 1200
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // When the user clicks on the button, scroll to the top of the document

  // ====== Back to Top Ends ====== //

  // ====== Call TagsCloud Starts ====== //

  main();
  // Call TagsCloud
  // ====== Call TagsCloud Ends ====== //

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
      navigator.clipboard.writeText(text).then(
        function () {
          callback(null);
        },
        function (err) {
          callback(err);
        }
      );
    } else {
      // Fallback for older browsers without clipboard API
      try {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        var successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!successful) throw new Error("Failed to copy");
        callback(null);
      } catch (err) {
        callback(err);
      }
    }
  }

  // Attach event listener to all .ClipboardIconOnly buttons
  document.querySelectorAll(".ClipboardIconOnly").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default action

      var currentButton = e.currentTarget;
      // Extract text from the .clickIconCopy element inside the clicked button
      var textToCopy = currentButton.querySelector(".clickIconCopy").innerText;

      // Copy the extracted text to the clipboard
      copyTextToClipboard(textToCopy, function (err) {
        if (err) {
          throw err;
        } else {
          // Optional: Show a temporary "Copied!" message or any other feedback mechanism
          var feedback = document.createElement("div");

          feedback.className = "copiedByClickIcon";
          feedback.innerText = "Copied!";
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
      navigator.clipboard.writeText(textToCopy).then(
        function () {
          callback(null);
        },
        function (err) {
          callback(err);
        }
      );
    } else {
      try {
        var textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        var successful = document.execCommand("copy");
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
        copyAlert.innerText = "Copied";

        // Append the copyAlert inside the ClipboardBox
        ClipboardBox.appendChild(copyAlert);

        setTimeout(function () {
          copyAlert.remove();
        }, 1500);
      });
    });
  });

  //copy Clipboard

  const gifImages = document.querySelectorAll(".gif-toggle");

  gifImages.forEach((gifImage) => {
    let isPlaying = false; // Initially, the GIF is not playing

    gifImage.addEventListener("mouseover", function () {
      this.src = this.dataset.gif;
    });

    gifImage.addEventListener("mouseout", function () {
      this.src = this.dataset.static;
    });

    // Handling touch devices
    gifImage.addEventListener("touchend", function () {
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
  var modal = document.getElementById("modal");
  var modalClose = document.getElementById("modal-close");

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // global handler
  document.addEventListener("click", function (e) {
    if (e.target.className.indexOf("modal-target") !== -1) {
      var img = e.target;
      var modalImg = document.getElementById("modal-content");
      var captionText = document.getElementById("modal-caption");

      // Read background color from the clicked element's data attribute
      var bgColor = img.getAttribute("data-bgcolor");
      if (bgColor) {
        modal.style.backgroundColor = bgColor;
      }

      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
    }
  });

  // Scroll add/remove classes Starts
  window.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const anchor = document.querySelector(`nav li a[href="#${id}"]`);

        if (anchor) {
          const activeLi = anchor.parentElement;
          const ul = activeLi.querySelector("ul");

          if (entry.intersectionRatio > 0) {
            activeLi.classList.add("active");
            if (ul) {
              ul.classList.add("active");
            }
          } else {
            activeLi.classList.remove("active");
            if (ul) {
              ul.classList.remove("active");
            }
          }
        }
      });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
  });

  // Scroll add/remove classes ends

  // TBcarousel Starts
  (function () {
    function initCarousel(carouselSelector) {
      let activeIndex = 0;

      function updateActiveSlide(carousel) {
        const slides = carousel.querySelectorAll(".TBslidesItem");
        const navLinks = carousel.querySelectorAll(".TBsliderNav");
        const slidesContainer = carousel.querySelector(".TBslides");
        activeIndex = Math.round(
          slidesContainer.scrollLeft / slidesContainer.clientWidth
        );

        navLinks.forEach((navLink, index) => {
          if (index === activeIndex) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        });
      }

      function scrollToSlide(slideIndex, carousel) {
        const slidesContainer = carousel.querySelector(".TBslides");
        slidesContainer.scrollTo({
          left: slideIndex * slidesContainer.clientWidth,
          behavior: "smooth",
        });
      }

      const carousels = document.querySelectorAll(carouselSelector);
      carousels.forEach((carousel) => {
        // If the carousel doesn't exist, skip this iteration
        if (!carousel) return;

        const navLinks = carousel.querySelectorAll(".TBsliderNav");
        navLinks.forEach((navLink, index) => {
          navLink.addEventListener("mouseenter", () => {
            scrollToSlide(index, carousel);
            updateActiveSlide(carousel);
          });
        });

        carousel
          .querySelector(".TBslides")
          .addEventListener("scroll", () => updateActiveSlide(carousel));

        updateActiveSlide(carousel);
      });
    }

    // Usage
    initCarousel("#TBcarousel1");
    initCarousel("#TBcarousel2");
    initCarousel("#TBcarouselGlorify1");
    initCarousel("#TBcarouselGlorify2");
    initCarousel("#TBcarouselGlorify3");
    initCarousel("#TBcarouselGlorify4");
    initCarousel("#TBcarouselGlorify5");
    initCarousel("#TBcarouselGlorify6");
    initCarousel("#TBcarouselGlorify7");
    initCarousel("#TBcarouselGlorify8");
    initCarousel("#TBcarouselGlorify9");
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
        const slides = carousel.querySelectorAll(".slides-item");
        const navLinks = carousel.querySelectorAll(".slider-nav");
        const slidesContainer = carousel.querySelector(".LRslides");
        activeIndex = Math.round(
          slidesContainer.scrollTop / slidesContainer.clientHeight
        );

        navLinks.forEach((navLink, index) => {
          if (index === activeIndex) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        });
      }

      function scrollToSlide(slideIndex) {
        const slidesContainer = carousel.querySelector(".LRslides");
        slidesContainer.scrollTo({
          top: slideIndex * slidesContainer.clientHeight,
          behavior: "smooth",
        });
      }

      const navLinks = carousel.querySelectorAll(".slider-nav");
      navLinks.forEach((navLink, index) => {
        navLink.addEventListener("mouseenter", () => {
          scrollToSlide(index);
          updateActiveSlide();
        });
      });

      carousel
        .querySelector(".LRslides")
        .addEventListener("scroll", updateActiveSlide);

      updateActiveSlide();
    }

    // Usage
    initLRcarousel("carousel1");
    initLRcarousel("carousel2");
    initLRcarousel("carousel3");
  })();
  // LRCarousel ends

  // Global variable to hold the currently playing audio element
  let currentlyPlaying = null;

  function initAudioPlayer(audioContainer) {
    const audioElement = audioContainer.querySelector("audio");
    const playButton = audioContainer.querySelector(".play-button");
    const timeDisplay = audioContainer.querySelector(".time-display");

    playButton.addEventListener("click", function () {
      // Pause the currently playing audio if there is one
      if (currentlyPlaying && currentlyPlaying !== audioElement) {
        currentlyPlaying.pause();
        currentlyPlaying
          .closest(".audio-container")
          .querySelector(".play-button").innerHTML = "Play";
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
    audioElement.addEventListener("timeupdate", function () {
      const currentTime = audioElement.currentTime;
      const duration = audioElement.duration;
      timeDisplay.innerHTML = `${formatTime(currentTime)} / ${formatTime(
        duration
      )}`;
    });

    // Reset the play button and currentlyPlaying when the audio ends
    audioElement.addEventListener("ended", function () {
      playButton.innerHTML = "Play";
      currentlyPlaying = null;
    });

    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }

  // Initialize each audio player
  document.querySelectorAll(".audio-container").forEach(initAudioPlayer);
  (function () {
    // Initialize each 'filed' component
    var fileds = document.querySelectorAll(".filed");
    fileds.forEach(function (filed) {
      initializeFiled(filed);
    });

    // Event listeners for radio buttons
    document
      .querySelectorAll(".select-EJS, .select-HTML, .select-CSS")
      .forEach(function (radioBtn) {
        radioBtn.addEventListener("click", function () {
          showCode(
            this,
            this.classList.contains("select-EJS")
              ? "ejs"
              : this.classList.contains("select-HTML")
              ? "html"
              : "css"
          );
        });
      });

    function initializeFiled(filed) {
      var ejsRadio = filed.querySelector(".select-EJS");
      var ejsBlock = filed.querySelector(".ejs-block");
      var htmlRadio = filed.querySelector(".select-HTML");
      var htmlBlock = filed.querySelector(".html-block");
      var cssBlock = filed.querySelector(".css-block");
      var copyButton = filed.querySelector(".copy-btn");

      // Check the initially selected radio button
      var checkedRadio = filed.querySelector(
        ".select-EJS:checked, .select-HTML:checked, .select-CSS:checked"
      );

      if (checkedRadio === ejsRadio) {
        ejsBlock.style.display = "block";
        htmlBlock.style.display = "none";
        cssBlock.style.display = "none";
        setupCopyButton(copyButton, ejsBlock.querySelector(".ejs-code"));
      } else if (checkedRadio === htmlRadio) {
        ejsBlock.style.display = "none";
        htmlBlock.style.display = "block";
        cssBlock.style.display = "none";
        setupCopyButton(copyButton, htmlBlock.querySelector(".html-code"));
      } else {
        ejsBlock.style.display = "none";
        htmlBlock.style.display = "none";
        cssBlock.style.display = "block";
        setupCopyButton(copyButton, cssBlock.querySelector(".css-code"));
      }
    }

    function showCode(radioBtn, type) {
      var container = radioBtn.closest(".filed");
      var ejsBlock = container.querySelector(".ejs-block");
      var htmlBlock = container.querySelector(".html-block");
      var cssBlock = container.querySelector(".css-block");
      var copyButton = container.querySelector(".copy-btn");

      if (type === "ejs") {
        ejsBlock.style.display = "block";
        htmlBlock.style.display = "none";
        cssBlock.style.display = "none";
        setupCopyButton(copyButton, ejsBlock.querySelector(".ejs-code"));
      } else if (type === "html") {
        ejsBlock.style.display = "none";
        htmlBlock.style.display = "block";
        cssBlock.style.display = "none";
        setupCopyButton(copyButton, htmlBlock.querySelector(".html-code"));
      } else {
        ejsBlock.style.display = "none";
        htmlBlock.style.display = "none";
        cssBlock.style.display = "block";
        setupCopyButton(copyButton, cssBlock.querySelector(".css-code"));
      }
    }

    function setupCopyButton(button, codeBlock) {
      button.onclick = function () {
        copyToClipboard(codeBlock, button);
      };
    }

    function copyToClipboard(codeBlock, btnElement) {
      var copyText = codeBlock.innerText;
      var textarea = document.createElement("textarea");
      textarea.textContent = copyText;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");

      document.body.removeChild(textarea);

      btnElement.textContent = "Copied!";

      setTimeout(function () {
        btnElement.textContent = "Copy Code";
      }, 2000);
    }
  })();

  //copy code to clipboard + tabs

  // Simulate a click on the default tab link when the page loads
  window.onload = function () {
    var defaultTabLink = document.getElementById("default-tab");
    if (defaultTabLink) {
      defaultTabLink.click();
    }
  };
});
