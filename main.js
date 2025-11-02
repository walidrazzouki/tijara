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

animateSeamless(carousellogos, 3, false);  // Horizontal
animateSeamless(carousellogos2, 3, false);  // Horizontal
animateSeamless(carousellogos3, 3, false);  // Horizontal
animateSeamless(carousellogos4, 3, false);  // Horizontal
animateSeamless(carousellogos5, 3, false);  // Horizontal


// === ÉCRAN DE PRÉCHARGEMENT ===

// Création de l'écran de chargement
const preloadScreen = document.createElement("div");
preloadScreen.style.position = "fixed";
preloadScreen.style.top = 0;
preloadScreen.style.left = 0;
preloadScreen.style.width = "100%";
preloadScreen.style.height = "100%";
preloadScreen.style.background = "#000";
preloadScreen.style.display = "flex";
preloadScreen.style.alignItems = "center";
preloadScreen.style.justifyContent = "center";
preloadScreen.style.zIndex = "9999";
preloadScreen.style.transition = "opacity 1s ease";
preloadScreen.style.color = "#fff";
preloadScreen.style.fontFamily = "sans-serif";
preloadScreen.style.fontSize = "22px";
preloadScreen.innerText = "Chargement...";

// Animation simple (texte qui clignote)
let dots = 0;
const dotAnim = setInterval(() => {
  dots = (dots + 1) % 4;
  preloadScreen.innerText = "RAZZDESIGNER - Chargement" + ".".repeat(dots);
}, 400);

document.body.appendChild(preloadScreen);

// === PRÉCHARGEMENT DES IMAGES ===
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const temp = new Image();
    temp.src = src;
    temp.onload = resolve;
    temp.onerror = reject;
  });
}

async function preloadAll() {
  const allImages = document.querySelectorAll("img");
  const sources = Array.from(allImages).map(img => img.src);

  // Attente du chargement complet de toutes les images
  await Promise.all(sources.map(preloadImage));

  // Petite attente supplémentaire pour l'effet fluide
  setTimeout(() => {
    clearInterval(dotAnim);
    preloadScreen.style.opacity = "0";
    setTimeout(() => preloadScreen.remove(), 1000); // disparition
  }, 500);
}


// Lancer après le chargement du DOM
window.addEventListener("load", preloadAll);







