const formBtn = document.querySelector(".form-btn");
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-container");
  loader.style.display = "none";
});
// NOTE NAVIGATION !!!
const menu = document.querySelector(".menu-btn");
let isOpen = false;
menu.addEventListener("click", () => {
  const navigation = document.querySelector(".nav");
  isOpen = !isOpen;
  if (isOpen) navigation.style.display = "block";
  if (!isOpen) navigation.style.display = "none";
});

// NOTE HOME SLIDER !!!
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
  const rightBox = document.querySelector(".phone-box");
  const leftBox = document.querySelector(".email-box");
  const buttons = document.querySelectorAll(".icon");
  const workCard1 = document.querySelector(".card1");
  const workCard2 = document.querySelector(".card2");
  const workCard3 = document.querySelector(".card3");
  const workCard4 = document.querySelector(".card4");
  const workCard5 = document.querySelector(".card5");
  const workCard6 = document.querySelector(".card6");

  let height = scrollY;
  // let width = innerWidth;
  // console.log(width);
  //  if (width > 560) {
  if (height > 400) aboutImgContainer.classList.add("img-show");
  if (height > 800) workCard1.classList.add("card1-show");
  if (height > 800) workCard2.classList.add("card2-show");
  if (height > 800) workCard3.classList.add("card3-show");
  if (height > 1200) workCard4.classList.add("card1-show");
  if (height > 1200) workCard5.classList.add("card2-show");
  if (height > 1200) workCard6.classList.add("card3-show");
  if (height > 1850) leftBox.classList.add("email-box-show");
  if (height > 1950) rightBox.classList.add("phone-box-show");
  if (height > 2050) {
    buttons.forEach((element) => {
      element.classList.add("icon-show");
    });
  }
  //  }
}

window.addEventListener("scroll", onScroll);

// NOTE MY WORK !!!
modal = document.querySelector(".modal");
const workButtons = document.querySelectorAll(".work-btn");
workButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // NOTE Show Modal !!!
    modal.classList.add("show-modal");
    // NOTE Prevent Scroll !!!
    const body = document.querySelector("body");
    setTimeout(() => {
      body.style.overflow = "hidden";
    }, 1000);

    const category = e.target.id;
    getData(category);
  });
});

// NOTE SOMETHING...
const thumbs = document.querySelectorAll(".thumb-img");

// NOTE CLOSE MODAL !!!
const close = document.querySelector(".close-btn");
close.addEventListener("click", () => {
  modal.classList.add("close");
  setTimeout(() => {
    modal.className = "modal";
  }, 1000);

  const body = document.querySelector("body");
  body.style.overflow = "";
});

async function getData(requestedCategory) {
  try {
    let response = await fetch("data.json");
    if (response.status !== 200) throw new Error("Fetching problems !!!");
    let json = await response.text();
    let data = JSON.parse(json);
    renderThumbnails(requestedCategory, data);
  } catch (error) {
    console.log(error.message);
  }
}

function renderThumbnails(category, data) {
  console.log(data);
}
