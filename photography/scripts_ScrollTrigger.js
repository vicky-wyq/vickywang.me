document.addEventListener("DOMContentLoaded", function (event) {
  //do work

// For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// You can use a ScrollTrigger in a tween or timeline
gsap.to(".divider", {
  rotate: 90,
  scrollTrigger: {
    trigger: ".divider",
    start: "top 240px", //trigger, viewport
    end: "bottom bottom",
    scrub: 1,
    markers: false,
    toggleActions: "restart pause reverse reset"
  }
});

gsap.to(".divider1", {
  rotate: 90,
  scrollTrigger: {
    trigger: ".divider1",
    start: "top 240px", //trigger, viewport
    end: "bottom bottom",
    scrub: 1,
    markers: false,
    toggleActions: "restart pause reverse reset"
  }
});
gsap.to(".t-intro", {
  y: 110,
  scrollTrigger: {
    trigger: ".t-intro",
    start: "top 100px", //trigger, viewport
    end: "+=560",
    scrub: 1,
    markers: false,
    pin: true,
    toggleActions: "restart pause reverse reset"
  }
});



// immediateRender: false, second scroll smooth

//ScrollTrigger


});
