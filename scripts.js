document.addEventListener("DOMContentLoaded", function(event) { 
  //do work



  $("#lightSlider").lightSlider({
    gallery:true,
    item:1,
    thumbItem:4,
    vThumbWidth:100,
  }); 
  function makeCarousel(carousel) {
    var selectedIndex = 0
    
    var carouselItems = carousel.getElementsByClassName("carousel-item");
    carousel.getElementsByClassName("next")[0].addEventListener("click", function() {
      carouselItems[selectedIndex].classList.remove("selected")
    
      if (selectedIndex === 0) {
        selectedIndex = carouselItems.length - 1;
      } else {
        selectedIndex = selectedIndex - 1;
      }
      carouselItems[selectedIndex].classList.add("selected")
    })
    
    carousel.getElementsByClassName("prev")[0].addEventListener("click", function() {
      carouselItems[selectedIndex].classList.remove("selected")
    
      if (selectedIndex === carouselItems.length - 1) {
        selectedIndex = 0;
      } else {
        selectedIndex = selectedIndex + 1;
      }
      carouselItems[selectedIndex].classList.add("selected")
    })
  }
  




  var carousels = document.getElementsByClassName("carousel")
  var index = 0;
  while (index < carousels.length) {
    makeCarousel(carousels[index]);
    index++
  }




});
