// === ÉCRAN DE PRÉCHARGEMENT ===
const preloadScreen = document.createElement("div");
Object.assign(preloadScreen.style, {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.2)", // ← نصف شفاف (50%),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "9999",
  transition: "opacity 1s ease",
  color: "#fff",
  fontFamily: "sans-serif",
  fontSize: "22px"
});
preloadScreen.innerText = "Chargement...";
document.body.appendChild(preloadScreen);

let dots = 0;
const dotAnim = setInterval(() => {
  dots = (dots + 1) % 4;
  preloadScreen.innerText = "RAZZDESIGNER - Chargement" + ".".repeat(dots);
}, 400);

// === PRÉCHARGEMENT DES IMAGES ===
function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(); // ignorer vide
    const temp = new Image();
    temp.onload = resolve;
    temp.onerror = resolve;
    temp.src = src;
  });
}

async function preloadAll() {
  const allImages = document.querySelectorAll("img");
  const sources = [...new Set(Array.from(allImages).map(img => img.src))]; // éviter doublons

  await Promise.all(sources.map(preloadImage));

  clearInterval(dotAnim);
  preloadScreen.style.opacity = "0";
  setTimeout(() => preloadScreen.remove(), 1000);

  // lancer animation APRÈS chargement
  startCarousels();
}

// lancer après que tout le DOM soit prêt
window.addEventListener("load", preloadAll);


// === CAROUSEL APRÈS LE PRÉCHARGEMENT ===
function startCarousels() {
  const carousels = document.querySelectorAll('.carousels');

  carousels.forEach(cp => {
    cp.style.padding = "0 20px";
  });

  function animateSeamless(carousel, speed = 1, vertical = false) {
    let paused = false;

    // Dupliquer une seule fois maintenant
    carousel.innerHTML += carousel.innerHTML;

    function loop() {
      if (!paused) {
        if (vertical) {
          carousel.scrollTop += speed;
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

    carousel.addEventListener('mouseenter', () => paused = true);
    carousel.addEventListener('mouseleave', () => paused = false);
    requestAnimationFrame(loop);
  }

  animateSeamless(document.querySelector('.carousellogos'), 3);
  animateSeamless(document.querySelector('.carousellogos2'), 3);
  animateSeamless(document.querySelector('.carousellogos3'), 3);
  animateSeamless(document.querySelector('.carousellogos4'), 3);
  animateSeamless(document.querySelector('.carousellogos5'), 3);
}




