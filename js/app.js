import { myWork } from "./my-work.js";

const LOADER = document.querySelector(".loader-container");
window.addEventListener("load", () => {
  LOADER.style.display = "none";
});

// ********************* NOTE SMOOTH SCROLLING ************************
function smoothScroll(link, element, duration) {
  let target = document.querySelector(element);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  // let distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animation);
}
let navLink1 = document.querySelector(".nav-link1");
navLink1.addEventListener("click", function () {
  smoothScroll(this, ".home", 800);
});
let navLink2 = document.querySelector(".nav-link2");
navLink2.addEventListener("click", function () {
  smoothScroll(this, ".about", 800);
});
let navLink3 = document.querySelector(".nav-link3");
navLink3.addEventListener("click", function () {
  smoothScroll(this, ".work", 800);
});
let navLink4 = document.querySelector(".nav-link4");
navLink4.addEventListener("click", function () {
  smoothScroll(this, ".contact", 800);
});

// NOTE NAVIGATION !!!
const menu = document.querySelector(".menu-btn");
let isOpen = false;
menu.addEventListener("click", (e) => {
  const navigation = document.querySelector(".nav");
  isOpen = !isOpen;
  if (isOpen) {
    navigation.style.display = "flex";
    e.target.textContent = "CLOSE";
  }
  if (!isOpen) {
    navigation.style.display = "none";
    e.target.textContent = "MENU";
    e.target.style["color"] = "purple";
  }
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
    // circle.setAttribute("onclick", "indicateSlides(this)");
    circle.addEventListener("click", (e) => {
      indicateSlides(e.target.id);
    });
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
  index = +element;
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

// NOTE MY WORK !!!  *********************************************
const modal = document.querySelector(".modal");
const workButtons = document.querySelectorAll(".work-btn");
workButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // NOTE Show Modal !!!
    modal.classList.add("show-modal");
    // NOTE Prevent Body Scroll !!!
    const body = document.querySelector("body");
    setTimeout(() => {
      body.style.overflow = "hidden";
    }, 600);
    // NOTE Get Requested Category !!!
    const category = e.target.id;
    renderThumbnails(category);
    showFirstGallery(category);
  });
});

// const galleryContainer = document.querySelector(".gallery-box");
const gallery = document.querySelector(".gallery");

function renderThumbnails(requestedCategory) {
  gallery.style.display = "none";
  gallery.innerHTML = "";
  const thumbs = document.querySelector(".thumbs");
  thumbs.innerHTML = "";
  myWork.forEach((element) => {
    if (element.category === requestedCategory) {
      let thumb = document.createElement("div");
      thumb.className = "thumb";
      let thumbImg = document.createElement("img");
      thumbImg.setAttribute("src", element.thumbnail);
      thumbImg.setAttribute("alt", "thumbnail");
      thumbImg.className = "thumb-img";

      thumbImg.addEventListener("click", renderGallery);

      thumb.append(thumbImg);
      thumbs.append(thumb);
    }
  });
}

function renderGallery(e) {
  // console.log(e);
  gallery.style.display = "grid";
  gallery.innerHTML = "";
  myWork.forEach((element) => {
    if (element.thumbnail === e.target.getAttribute("src")) {
      element.images.forEach((image) => {
        let imgDiv = document.createElement("div");
        if (element.category === "banners") {
          gallery.classList.add("gallery-tall");
        } else {
          if (gallery.classList.contains("gallery-tall")) {
            gallery.classList.remove("gallery-tall");
          }
        }
        imgDiv.className = "gallery-img";
        const galleryImg = document.createElement("img");
        galleryImg.setAttribute("src", image);
        galleryImg.addEventListener("click", showGalleryImage);
        // galleryContainer.prepend(description);
        imgDiv.append(galleryImg);
        gallery.append(imgDiv);
      });
    }
  });
}

function showFirstGallery(category) {
  let categoryArray = [];
  myWork.forEach((element) => {
    if (element.category === category) {
      categoryArray.push(element);
    }
  });
  const firstItem = categoryArray[0];
  gallery.style.display = "grid";
  firstItem.images.forEach((image) => {
    let imgDiv = document.createElement("div");
    if (firstItem.category === "banners") {
      gallery.classList.add("gallery-tall");
    } else {
      if (gallery.classList.contains("gallery-tall")) {
        gallery.classList.remove("gallery-tall");
      }
    }
    imgDiv.className = "gallery-img";
    const galleryImg = document.createElement("img");
    galleryImg.setAttribute("src", image);
    galleryImg.addEventListener("click", showGalleryImage);
    imgDiv.append(galleryImg);
    gallery.append(imgDiv);
  });
}

function showGalleryImage(e) {
  const galleryModal = document.querySelector(".gallery-modal");
  galleryModal.innerHTML = "";
  let src = e.target.getAttribute("src");
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  galleryModal.style.display = "flex";
  galleryModal.append(img);
  galleryModal.addEventListener("click", (e) => {
    e.target.style.display = "none";
  });
}

// NOTE CLOSE MODAL !!!
const close = document.querySelector(".close-btn");
close.addEventListener("click", () => {
  modal.classList.add("close");
  setTimeout(() => {
    modal.className = "modal";
  }, 600);

  const body = document.querySelector("body");
  body.style.overflow = "";
});

// NOTE FORM !!!  **************************************************
const formModal = document.querySelector(".form-modal");
const formMessage = document.querySelector(".form-message");
const formBtn = document.querySelector(".form-btn");
function SendEmail(name, email, message) {
  this.name = name;
  this.email = email;
  this.message = message;
  this.errors;
  this.json;
  this.prepareJson = () => {
    this.json = {
      name: this.name,
      email: this.email,
      message: this.message,
    };
  };
  // this.showError = () => {
  //   console.log(this.errors);
  // };
  this.sendRequest = () => {
    fetch("classes/script.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.json),
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return JSON.parse(response);
      })
      .then((serverResponse) => {
        if (serverResponse.status === "error") {
          formModal.style.display = "flex";
          formMessage.textContent = serverResponse.message;
          formMessage.style["color"] = "red";

          setTimeout(() => {
            formModal.style.display = "none";
          }, 2000);
          return false;
        } else {
          formModal.style.display = "flex";
          formMessage.textContent = serverResponse.message;
          formMessage.style["color"] = "green";

          setTimeout(() => {
            formModal.style.display = "none";
            document.querySelector("#name").value = "";
            document.querySelector("#email").value = "";
            document.querySelector("#message").value = "";
          }, 3000);
          return true;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  let sendMsg = new SendEmail(name, email, message);
  sendMsg.prepareJson();
  // if (sendMsg.errors) {
  //   formModal.style.display = "flex";
  //   formMessage.textContent = sendMsg.errors;
  //   formMessage.style["color"] = "red";
  //   setTimeout(() => {
  //     formModal.style.display = "none";
  //   }, 2000);
  // }
  try {
    sendMsg.sendRequest();
  } catch (error) {
    console.log(error);
  }
});

// NOTE SET ONSCROLL EVENTS !!! ***************************************8
gsap.registerPlugin(ScrollTrigger);

gsap.to(".img-container", {
  scrollTrigger: {
    trigger: ".img-container",
    start: "top bottom-=100",
    end: "center center+=100",
    scrub: 1,
  },
  scale: 1,
  opacity: 1,
});
gsap.to(".about-right", {
  scrollTrigger: {
    trigger: ".about-right",
    start: "top bottom-=200",
    end: "center center+=100",
    scrub: 1,
  },
  opacity: 1,
  y: 0,
});
gsap.to(".card1", {
  scrollTrigger: {
    trigger: ".card1",
    start: "top center",
    end: "top 100px",
    scrub: 1,
  },
  delay: 1,
  opacity: 1,
  x: 0,
});
gsap.to(".card2", {
  scrollTrigger: {
    trigger: ".card2",
    start: "top bottom",
    end: "top 100px",
    scrub: 1,
  },
  opacity: 1,
});
gsap.to(".card3", {
  scrollTrigger: {
    trigger: ".card3",
    start: "top center",
    end: "top 100px",
    scrub: 1,
  },
  opacity: 1,
  x: 0,
});
gsap.to(".card4", {
  scrollTrigger: {
    trigger: ".card4",
    start: "top center",
    end: "top 100px",
    scrub: 1,
  },
  opacity: 1,
  x: 0,
});
gsap.to(".card5", {
  scrollTrigger: {
    trigger: ".card5",
    start: "top bottom",
    end: "top 100px",
    scrub: 1,
  },
  opacity: 1,
});
gsap.to(".card6", {
  scrollTrigger: {
    trigger: ".card6",
    start: "top center",
    end: "top 100px",
    scrub: 1,
  },
  opacity: 1,
  x: 0,
});
gsap.to(".left-side", {
  scrollTrigger: {
    trigger: ".left-side",
    start: "top center",
    end: "top 200px",
    scrub: 1,
  },
  opacity: 1,
  x: 0,
});
gsap.to(".email-box", {
  scrollTrigger: {
    trigger: ".email-box",
    start: "top 90%",
    end: "top 70%",
    scrub: 1,
  },
  opacity: 1,
  x: 0,
});
gsap.to(".phone-box", {
  scrollTrigger: {
    trigger: ".phone-box",
    start: "top 90%",
    end: "top 80%",
    scrub: 1,
  },
  opacity: 1,
  x: 0,
});
gsap.to(".icon", {
  scrollTrigger: {
    trigger: ".icon",
    start: "top bottom-=100",
    end: "top 85%",
    scrub: 1,
  },
  duration: 2,
  opacity: 1,
  x: 0,
  stagger: 0.7,
  rotation: 360,
});

function renderSpots() {
  removeInterval();
  let galleryModal = document.querySelector(".gallery-modal");
  let spot = document.createElement("span");
  spot.className = "spot";
  let spotTop = Math.floor(Math.random() * 100);
  let spotLeft = Math.floor(Math.random() * 100);

  spot.style.top = spotTop + "%";
  spot.style.left = spotLeft + "%";
  setTimeout(() => {
    spot.className = "";
  }, 5000);

  galleryModal.append(spot);
}

let spotInterval = setInterval(renderSpots, 300);

function removeInterval() {
  clearInterval(spotInterval);
  spotInterval = setInterval(renderSpots, 300);
}
