document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./images/hund.png",
    "./images/katt.png",
    "./images/kanin.png"
  ];

  let currentIndex = 0;

  const imgElement = document.querySelector(".card-info-emil img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
 
  if (!imgElement) {
    console.warn("Ingen <img> hittades i .card-info-emil — bildspelet körs inte.");
    return;
  }

  function updateImage() {
    console.log("Byter till:", images[currentIndex]);
    imgElement.src = images[currentIndex];
    imgElement.alt = `Emil image ${currentIndex + 1}`;
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