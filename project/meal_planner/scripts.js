document.addEventListener("DOMContentLoaded", function (event) {
  //do work


  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  var addColorTriggerMP = function (triggerMP) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerMP,
        start: "center 600px",
        end: "bottom 900px",
        scrub: 3,
        //toggleClass: "active",
        markers: false
      },
    })
    tl.to(triggerMP, {
      backgroundColor: "#FFE28B",
      duration: 30,
      y: 50
    })
      .to(triggerMP, {
        backgroundColor: "#F5F5F5",
        duration: 15,
        y: 90
      });
  }
  addColorTriggerMP("#bg-color-triggerMP")
  //bg color change
  //ScrollTrigger


 
});
