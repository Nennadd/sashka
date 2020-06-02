const LOADER = document.querySelector(".loader-container");

window.addEventListener("load", () => {
  LOADER.style.display = "none";
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
    e.target.style["color"] = "red";
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
  });
});

// NOTE CLICK ON THUMBS !!!
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

// NOTE FORM
const formModal = document.querySelector(".form-modal");
const formMessage = document.querySelector(".form-message");

function SendEmail(name, email, message) {
  this.name = name;
  this.email = email;
  this.message = message;
  this.errors;
  this.json;
  this.prepareJson = () => {
    // try {
    //   if (this.name.length === 0) {
    //     throw new Error("Name cannot be empty!");
    //   }
    //   if (this.email.length === 0) {
    //     throw new Error("Email cannot be empty!");
    //   }
    //   if (this.message.length === 0) {
    //     throw new Error("Message cannot be empty!");
    //   }
    // } catch (error) {
    //   this.errors = error.message;
    // }

    this.json = {
      name: this.name,
      email: this.email,
      message: this.message,
    };
  };
  this.showError = () => {
    console.log(this.errors);
  };
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
const formBtn = document.querySelector(".form-btn");
let spinner = document.getElementById("btn-spinner");
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
    // spinner.textContent = "";
    // spinner.className = "form-spinner";
    sendMsg.sendRequest();
  } catch (error) {
    console.log(error);
  } finally {
    // spinner.textContent = "SEND";
    // spinner.className = "";
  }
});
