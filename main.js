const carousellogos = document.querySelector('.carousellogos');
const carousellogos2 = document.querySelector('.carousellogos2');
const carousellogos3 = document.querySelector('.carousellogos3');
const carousellogos4 = document.querySelector('.carousellogos4');
const carousellogos5 = document.querySelector('.carousellogos5');

const carousels = document.querySelectorAll('.carousels');



carousels.forEach(cp=>{
  cp.style.padding = "0 20px"
  cp.addEventListener('click', () => paused = false);

})

const lefts = document.querySelectorAll('.left')
const rights = document.querySelectorAll('.right')


lefts.forEach((left)=>{
    left.style.height = left.parentElement.clientHeight + "px"
    
})
rights.forEach(right=>{
    right.style.height = right.parentElement.clientHeight + "px"
})


// animation  
// animation  

function animateSeamless(carousel, speed = 1, vertical = false) {
  let paused = false;

  // Duplicate content once for seamless looping
  carousel.innerHTML += carousel.innerHTML;

  function loop() {
    if (!paused) {
      if (vertical) {
        carousel.scrollTop += speed;
        // When we scroll past half (duplicated part), reset smoothly   
        if (carousel.scrollTop >= carousel.scrollHeight / 2) {
          carousel.scrollTop = 0;
        }
      } else {
        carousel.scrollLeft += speed;
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
    }
    requestAnimationFrame(loop);
  }

  // Pause when hover
  carousel.addEventListener('mouseenter', () => paused = true);
  carousel.addEventListener('mouseleave', () => paused = false);

  requestAnimationFrame(loop);
}


window.onload = () => {
  animateSeamless(carousellogos, 3, false);  // Horizontal
  animateSeamless(carousellogos2, 3, false);  // Horizontal
  animateSeamless(carousellogos3, 3, false);  // Horizontal
  animateSeamless(carousellogos4, 3, false);  // Horizontal
  animateSeamless(carousellogos5, 3, false);  // Horizontal
};
















