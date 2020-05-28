const button = document.querySelector(".form-btn");
button.addEventListener("click", (e) => {
  e.preventDefault();
});

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let index = 0;
let indicators = document.querySelector(".indicators");

prev.addEventListener("click", () => {
  prevSlide();
  updateIndicators();
});
next.addEventListener("click", () => {
  nextSlide();
  updateIndicators();
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
  resetTimer();
}

(function circleIndicators() {
  for (let i = 0; i < slides.length; i++) {
    let circle = document.createElement("div");
    circle.textContent = i + 1;
    circle.id = i;
    circle.setAttribute("onclick", "indicateSlides(this)");
    if (i === 0) circle.className = "active-circle";

    indicators.appendChild(circle);
  }
})();

function updateIndicators() {
  for (let i = 0; i < indicators.children.length; i++) {
    indicators.children[i].classList.remove("active-circle");
  }
  indicators.children[index].classList.add("active-circle");
}
function indicateSlides(element) {
  index = +element.id;
  changeSlide();
  updateIndicators();
}

function autoPlay() {
  nextSlide();
  updateIndicators();
}

let timer = setInterval(autoPlay, 5000);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoPlay, 5000);
}

// NOTE SET ONSCROLL EVENTS !!! ***************************************8
function onScroll() {
  const aboutImgContainer = document.querySelector(".img-container");
  const rightBox = document.querySelector(".right-box");
  const leftBox = document.querySelector(".left-box");
  const buttons = document.querySelectorAll(".icon");
  const workCard1 = document.querySelector(".card1");
  const workCard2 = document.querySelector(".card2");
  const workCard3 = document.querySelector(".card3");

  let height = scrollY;
  // console.log(height);
  if (height > 400) aboutImgContainer.classList.add("img-show");
  if (height > 800) workCard1.classList.add("card1-show");
  if (height > 800) workCard2.classList.add("card2-show");
  if (height > 800) workCard3.classList.add("card3-show");
  if (height > 1160) rightBox.classList.add("right-box-show");
  if (height > 1550) leftBox.classList.add("left-box-show");
  if (height > 1630) {
    buttons.forEach((element) => {
      element.classList.add("icon-show");
    });
  }
}

window.addEventListener("scroll", onScroll);