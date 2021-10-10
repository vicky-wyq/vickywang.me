document.addEventListener("DOMContentLoaded", function (event) {
  //do work
  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

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
  gsap.to(".ver1", {
    rotate: 90,
    scrollTrigger: {
      trigger: ".ver1",
      start: "top 380px", //trigger, viewport
      end: "bottom bottom",
      scrub: 1,
      markers: false,
      toggleActions: "restart pause reverse reset"
    }
  });


  // immediateRender: false, second scroll smooth

  var YAxisTrigger = function (trigger) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "trigger 300px",
        end: "trigger 800px",
        scrub: 3,
        markers: false
      },
    })
    tl.to(trigger, {
      color: "#A9D9D9",
      duration: 2,
      y: -5
    })
      .to(trigger, {
        color: "#000000",
        duration: 1,
        y: 5

      });
  }
  YAxisTrigger("#ytrigger-pg")
  YAxisTrigger("#ytrigger-pg2")
  YAxisTrigger("#ytrigger-pg3")
  YAxisTrigger("#ytrigger-pg4")
  YAxisTrigger("#ytrigger-pg5")
  YAxisTrigger("#ytrigger-pg6")
  YAxisTrigger("#ytrigger-pg7")
  YAxisTrigger("#ytrigger-pg8")
  YAxisTrigger("#ytrigger-pg9")
  YAxisTrigger("#ytrigger-pg10")
  YAxisTrigger("#ytrigger-pg11")
  YAxisTrigger("#ytrigger-pg12")
  YAxisTrigger("#ytrigger-pg13")
  YAxisTrigger("#ytrigger-pg14")
  YAxisTrigger("#ytrigger-pg15")
  YAxisTrigger("#ytrigger-pg16")
  YAxisTrigger("#ytrigger-pg17")
  YAxisTrigger("#ytrigger-pg18")
  // Y Axis change
  //ScrollTrigger
});
