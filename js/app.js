const button = document.querySelector("button");
button.addEventListener("click", (e) => {
  e.preventDefault();
});

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let index = 0;

prev.addEventListener("click", () => {
  console.log(prevSlide());
});
next.addEventListener("click", () => {
  nextSlide();
  changeSlide();
});

function prevSlide() {
  if (index === 0) return (index = 2);
  return --index;
}

function nextSlide() {
  if (index === slides.length - 1) return (index = 0);
  return ++index;
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    if (i === index) {
      slides[i].classList.add("active");
    } else {
      slides[i].classList.remove("active");
    }
  }
}
