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

function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();
    const temp = new Image();
    temp.onload = resolve;
    temp.onerror = resolve;
    temp.src = src;
  });
}

async function preloadAll() {
  // === 1. Enable lazy loading for all images ===
  document.querySelectorAll("img").forEach(img => {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });

  // === 2. Collect image sources (avoid duplicates) ===
  const allImages = document.querySelectorAll("img");
  const sources = [...new Set(Array.from(allImages).map(img => img.src))];

  // === 3. Preload only visible (above-the-fold) images immediately ===
  const visibleImages = Array.from(allImages).filter(img => {
    const rect = img.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });

  await Promise.all(
    visibleImages.map(img => new Promise(res => {
      if (img.complete) return res();
      img.onload = res;
      img.onerror = res;
    }))
  );

  // === 4. Decode all images silently (removes flicker) ===
  for (const img of allImages) {
    try { await img.decode(); } catch {}
  }

  // === 5. Hide preloader smoothly ===
  clearInterval(dotAnim);
  preloadScreen.style.opacity = "0";
  setTimeout(() => preloadScreen.remove(), 1000);
  document.querySelectorAll("img").forEach(img => {
  if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });
  // === 6. Launch carousels after images are ready ===
  startCarousels();
}


window.addEventListener("load", preloadAll);

// === CAROUSELS AVEC BOUTONS GAUCHE/DROITE ===
function startCarousels() {
  const carousels = document.querySelectorAll(".carousels");

  carousels.forEach((carousel) => {
    const container = carousel.parentElement;
    container.style.position = "relative";

    carousel.style.display = "flex";
    carousel.style.overflowX = "auto";
    carousel.style.scrollBehavior = "smooth";
    carousel.style.scrollSnapType = "x mandatory";
    carousel.querySelectorAll("img").forEach(img => {
      img.style.scrollSnapAlign = "center";
    });

    // === Boutons ===
    const leftBtn = document.createElement("button");
    const rightBtn = document.createElement("button");

    Object.assign(leftBtn.style, {
      position: "absolute",
      top: "50%",
      left: "5px",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.6)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      cursor: "pointer",
      fontSize: "20px",
      zIndex: "10",
      transition: "opacity 0.3s",
    });
    Object.assign(rightBtn.style, {
      position: "absolute",
      top: "50%",
      right: "5px",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.6)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      cursor: "pointer",
      fontSize: "20px",
      zIndex: "10",
      transition: "opacity 0.3s",
    });

    leftBtn.innerText = "‹";
    rightBtn.innerText = "›";

    container.appendChild(leftBtn);
    container.appendChild(rightBtn);

    // === Scroll une image à la fois ===
    function getScrollStep() {
      const img = carousel.querySelector("img");
      return img ? img.clientWidth + 10 : 200;
    }

    leftBtn.addEventListener("click", () => {
      carousel.scrollLeft -= getScrollStep();
    });

    rightBtn.addEventListener("click", () => {
      carousel.scrollLeft += getScrollStep();
    });

    // Apparition des boutons au survol
    leftBtn.style.opacity = "0";
    rightBtn.style.opacity = "0";
    container.addEventListener("mouseenter", () => {
      leftBtn.style.opacity = "1";
      rightBtn.style.opacity = "1";
    });
    container.addEventListener("mouseleave", () => {
      leftBtn.style.opacity = "0";
      rightBtn.style.opacity = "0";
    });
  });
}

// === CLOSE BUTTON ===
const close = document.createElement('div');
close.className = "close";
close.innerHTML = "X";
Object.assign(close.style, {
  top: "0",
  position: "fixed",
  padding: "10px",
  background: "red",
  color: "white",
  display: "none",
  fontWeight: "bold",
  zIndex: "1000",
  cursor: "pointer",
});
document.body.append(close);

const carousels = document.querySelectorAll('.carousels');
carousels.forEach(cr => {
  cr.style.background = "#0f0f10";
  cr.addEventListener('click', () => {
    cr.style.setProperty("flex-wrap", "wrap");
    cr.style.setProperty("position", "fixed");
    cr.style.setProperty("justify-content", "center");
    cr.style.width = "100%";
    cr.style.height = "100%";
    cr.style.left = "0";
    cr.style.top = "0";
    cr.style.zIndex = "1000";

    close.style.display = "block";
    close.addEventListener('click', () => {
      cr.style.removeProperty("flex-wrap");
      cr.style.removeProperty("position");
      close.style.display = "none";
    });
  });
});

// === WHATSAPP ===
function openWhatsApp() {
  const phoneNumber = "+212681170546";
  const message = encodeURIComponent("Hello! I’d like to contact you. from www.packaman.online");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}
