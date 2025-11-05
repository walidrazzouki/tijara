// === ÉCRAN DE PRÉCHARGEMENT ===
const preloadScreen = document.createElement("div");
Object.assign(preloadScreen.style, {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "9999",
  transition: "opacity 1s ease",
  color: "#fff",
  fontFamily: "sans-serif",
  fontSize: "22px",
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

  animateSeamless(document.querySelector('.carousellogos'), 4);
  animateSeamless(document.querySelector('.carousellogos2'), 4);
  animateSeamless(document.querySelector('.carousellogos3'), 4);
  animateSeamless(document.querySelector('.carousellogos4'), 4);
  animateSeamless(document.querySelector('.carousellogos5'), 4);
  animateSeamless(document.querySelector('.carousellogos6'), 4);
}
const close = document.createElement('div')
  close.className = "close"
  close.innerHTML = "X"
  close.style.setProperty("top", "0");
  close.style.setProperty("position", "absolute");
  close.style.setProperty("padding", "10px");
  close.style.setProperty("background", "red");
  close.style.setProperty("color", "white");
  close.style.setProperty("display", "none");
  close.style.setProperty("position", "fixed");
  close.style.setProperty("font-weight", "bold");
  document.body.append(close)
const carousels = document.querySelectorAll('.carousels')
carousels.forEach(cr=>{
cr.style.background = "#0f0f10"
cr.addEventListener('click',()=>{
  cr.style.setProperty("flex-wrap", "wrap");
  cr.style.setProperty("position", "fixed");
  cr.style.setProperty("justify-content", "center");
  cr.style.width ="100%";
  cr.style.height ="100%";
  cr.style.left="0";
  cr.style.top="0";
  cr.style.height ="100%";

  const images = cr.querySelectorAll('img'); // all images on page
  const total = images.length;
  const half = total / 2;

  for (let i = half; i < total; i++) {
    images[i].style.visibility = 'hidden';
  }


  close.style.removeProperty("display");
  close.style.setProperty("left", "0");
  close.style.setProperty("cursor", "pointer");

  close.addEventListener('click',()=>{
  cr.style.removeProperty("flex-wrap");
  cr.style.removeProperty("position");
   for (let i = half; i < total; i++) {
    images[i].style.visibility = 'visible';

  }
  setTimeout(() => {
      close.style.setProperty("left", "-50px");
  }, 1000);
})
})
})

// open what app 

function openWhatsApp() {
  const phoneNumber = "+212681170546"; // Replace with the target number (include country code, no +)
  const message = encodeURIComponent("Hello! I’d like to contact you. from www.packaman.online");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}
