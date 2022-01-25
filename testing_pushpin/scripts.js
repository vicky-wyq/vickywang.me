document.addEventListener("DOMContentLoaded", function (event) {
  //do work
  console.log('boo')


  $('.pushpin').each(function() {
    var $this = $(this);
    var $target = $('#' + $(this).attr('data-target'));
    $this.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height()
    });
  });




  $(document).ready(function(){
    $('.carousel').carousel();
  });
  





  // For more information, see greensock.com/docs/v3/Plugins/ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  var addColorTriggerMP = function (triggerMP) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerMP,
        start: "center 300px",
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
