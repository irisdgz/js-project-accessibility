document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./images/hund.png",
    "./images/katt.png",
    "./images/kanin.png"
  ];

    const alts = [
    "Maya – Emils dog",
    "Dessie – Emils cat",
    "Pampam – Emils bunny"
  ];

  const imgElement = document.querySelector(".card-info-emil img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
 
  let currentIndex = 0;

  if (!imgElement) {
    console.warn("No <img> found .card-info-emil — The slideshow is not running.");
    return;
  }

  function updateImage() {
    console.log("Byter till:", images[currentIndex]);
    imgElement.src = images[currentIndex];
    imgElement.alt = alts[currentIndex];
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  prevBtn?.addEventListener("click", showPrevImage);
  nextBtn?.addEventListener("click", showNextImage);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showPrevImage();
    else if (e.key === "ArrowRight") showNextImage();
  });

  updateImage();
});