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
    this.#tags = root.querySelectorAll('.tag');
    this.#sphere = new FibonacciSphere(this.#tags.length);
    this.#rotationAxis = [1, 0, 0];
    this.#rotationAngle = 0;
    this.#rotationSpeed = 0;

    this.#updatePositions();
    this.#initEventListeners();
    this.#root.classList.add('-loaded');
  }

  #initEventListeners() {
    window.addEventListener('resize', this.#updatePositions.bind(this));
    document.addEventListener('mousemove', this.#onMouseMove.bind(this));
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
    const root = document.getElementById('TagsCloud');
    if (!root) {
      console.info('TagsCloud not found, skipping initialization');
      return;
    }

    const cloud = new TagsCloud(root);
    cloud.start();
  }
}
// TagsCloud



var lastKnownScrollY = 0;
var currentScrollY = 0;
var ticking = false;
var idOfHeader = 'header';
var eleHeader = null;
const classes = {
  pinned: 'header-pin',
  unpinned: 'header-unpin',
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
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned);
    eleHeader.classList.add(classes.pinned);
  }
}
function unpin() {
  if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.pinned);
    eleHeader.classList.add(classes.unpinned);
  }
}
window.onload = function () {
  eleHeader = document.getElementById(idOfHeader);
  document.addEventListener('scroll', onScroll, false);
}
//header

function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
    height = document.body.scrollHeight - document.body.clientHeight,
    scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
  console.log('height', height);
  console.log('scrollHeight', document.documentElement.scrollHeight);
  console.log('clientHeight', document.documentElement.clientHeight);

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
  const toggles = document.querySelectorAll('.toggle')

  toggles.forEach(function(toggle) {
    // Add the click event listener to each button
    toggle.addEventListener('click', function() {
      toggleContent(toggle);
    });
  });
}

function initializePassword() {
  // ====== Password Starts ====== //
  const pass = document.getElementById("password");
  const submit = document.querySelectorAll(".passwordArr")[0];
  const msg = document.getElementById("pwIncorrect");
  const w = 'U2FsdGVkX1+qBYYpwqY4fxufbaVwlCa29R7uRhGBWGzr5X6zmNO/9WfCnL7sVkCf';

  // Get the input field
  // Execute a function when the user presses a key on the keyboard
  if (pass && submit) {
    pass.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        submit.click();
      }
    });
    submit.addEventListener("click", () => {
      let redirect;
      try {
        let decrypted = CryptoJS.AES.decrypt(w, pass.value);
        redirect = CryptoJS.enc.Utf8.stringify(decrypted);
      } catch (e) {
        console.log(e);
      }

      if (redirect && redirect.includes("lsh")) {
        window.location.href = redirect;
        msg.style.display = "none";
      } else {
        // handle some error
        msg.style.display = "block";
      }
    });
  }
  // ====== Password Ends ====== //
}
//Read more/less


// ====== Components ====== //





document.addEventListener("DOMContentLoaded", function (event) {
  //do work
  
  initializeToggles();
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

  // ====== Hamburger Menu Starts ====== //
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

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
  // ====== Hamburger Menu Ends ====== //

  // ====== AOS Starts ====== //

  AOS.init({
    delay: 180, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  });
  //  2 links on html 
  // ====== AOS Ends ====== //


  // ====== Back to Top Starts ====== //

  var mybutton = document.getElementById("myBtn");
  //Get the button

  if (mybutton) {
    window.addEventListener('scroll', function () {
      scrollFunction()
    })
    mybutton.addEventListener('click', topFunction)
  }

  // When the user scrolls down 20px from the top of the document, show the button

  function scrollFunction() {
    if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
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







});
