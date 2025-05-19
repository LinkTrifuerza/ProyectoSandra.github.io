const track = document.querySelector(".carrousel__track");
const items = document.querySelectorAll(".carrousel__item");
const btnLeft = document.querySelector(".carrousel__btn.left");
const btnRight = document.querySelector(".carrousel__btn.right");

let currentIndex = 0;

function updateCarousel() {
  const width = items[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

btnRight.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

btnLeft.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
console.log("funcionado SI");
