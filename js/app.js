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

// NOTE MY WORK !!!  *********************************************
modal = document.querySelector(".modal");
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
  });
});
// NOTE CLICK ON THUMBS !!!

const gallery = document.querySelector(".gallery");

function renderThumbnails(requestedCategory) {
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
  gallery.style.display = "grid";
  gallery.innerHTML = "";
  myWork.forEach((element) => {
    if (element.thumbnail === e.target.getAttribute("src")) {
      element.images.forEach((image) => {
        let imgDiv = document.createElement("div");
        imgDiv.className = "gallery-img";

        galleryImg = document.createElement("img");
        galleryImg.setAttribute("src", image);
        // galleryImg.addEventListener("click", showGalleryImage);
        imgDiv.append(galleryImg);
        gallery.append(imgDiv);
      });
    }
  });
}

// function showGalleryImage(e) {
//   const galleryModal = document.querySelector(".gallery-modal");
//   galleryModal.innerHTML = "";
//   let src = e.target.getAttribute("src");
//   const img = document.createElement("img");
//   img.setAttribute("src", src);

//   galleryModal.style.display = "flex";
//   galleryModal.append(img);
//   galleryModal.addEventListener("click", (e) => {
//     e.stopPropagation();
//     e.target.style.display = "none";
//   });
// }

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
        } else {
          formModal.style.display = "flex";
          formMessage.textContent = serverResponse.message;
          formMessage.style["color"] = "green";
          setTimeout(() => {
            formModal.style.display = "none";
          }, 3000);
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
function onScroll() {
  let height = scrollY;
  // let width = innerWidth;
  // console.log(width);
  if (height > 400) aboutImgContainer.classList.add("img-show");
  if (height > 800) {
    workCard1.classList.add("card1-show");
    workCard2.classList.add("card2-show");
    workCard3.classList.add("card3-show");
  }
  if (height > 1200) {
    workCard4.classList.add("card1-show");
    workCard5.classList.add("card2-show");
    workCard6.classList.add("card3-show");
  }
  if (height > 1850) leftBox.classList.add("email-box-show");
  if (height > 1950) rightBox.classList.add("phone-box-show");
  if (height > 2050) {
    buttons.forEach((element) => {
      element.classList.add("icon-show");
    });
  }
}
window.addEventListener("scroll", onScroll);

function renderSpots() {
  galleryModal = document.querySelector(".gallery-modal");
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

setInterval(() => {
  renderSpots();
}, 500);
