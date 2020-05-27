const button = document.querySelector("button");
button.addEventListener("click", (e) => {
  e.preventDefault();
});

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let index = 0;
let intervalID;
prev.addEventListener("click", () => {
  prevSlide();
});
next.addEventListener("click", () => {
  nextSlide();
});

function prevSlide() {
  if (index === 0) {
    index = 2;
  } else {
    index--;
  }
  changeSlide();
}

function nextSlide() {
  if (index === slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[index].classList.add("active");
}

// intervalID = setInterval(() => {
//   nextSlide();
// }, 4000);
