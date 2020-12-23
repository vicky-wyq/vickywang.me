document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  var carouselItems = document.getElementsByClassName("carousel-item");

  var selectedIndex = 0;



  document.getElementsByClassName("next")[0].addEventListener("click", function() {
    carouselItems[selectedIndex].classList.remove("selected")
    if (selectedIndex === carouselItems.length - 1) {selectedIndex = 0;
  } else {selectedIndex = selectedIndex+1;
  }
    carouselItems[selectedIndex].classList.add("selected")
  });

  document.getElementsByClassName("prev")[0].addEventListener("click", function() {
    carouselItems[selectedIndex].classList.remove("selected")

    if (selectedIndex === 0) {selectedIndex = carouselItems.length - 1;
  } else {selectedIndex = selectedIndex-1;
  }
    carouselItems[selectedIndex].classList.add("selected")

  });
});
