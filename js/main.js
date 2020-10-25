if (document.querySelector(".modal-write-us")) {
  const writeUs = document.querySelector(".modal-write-us");
  const writeUsForm = writeUs.querySelector(".modal-write-us__form");
  const userName = writeUs.querySelector("[name=user-name]");
  const userEmail = writeUs.querySelector("[name=user-email]");
  const userMessage = writeUs.querySelector("[name=user-message]");
  const writeUsCloseButton = writeUs.querySelector(".modal__close");
  const writeUsButton = document.querySelector(".contacts__btn");
  let isStorageSupport = true;
  let userNameStorage = localStorage.setItem("userName", userName.value);
  let userEmailStorage = localStorage.setItem("userEmail", userEmail.value);

  try {
    userNameStorage = localStorage.getItem("userName");
    userEmailStorage = localStorage.getItem("userEmail");
  } catch (error) {
    isStorageSupport = false;
  }

  writeUsButton.addEventListener("click", function (event) {
    event.preventDefault();
    writeUs.classList.add("modal--show");
    if (userNameStorage) {
      userName.value = userNameStorage;
      if (!userEmailStorage) {
        userEmail.focus();
      } else {
        userMessage.focus();
      }
    } else {
      userName.focus();
    }
  });

  writeUsForm.addEventListener("submit", function (event) {
    if (!userName.value || !userEmail.value || !userMessage.value) {
      event.preventDefault();
      writeUs.classList.add("modal--error");
      if (!userName.value) {
        userName.focus();
      }
      if (userName.value && !userEmail.value) {
        userEmail.focus();
      }
      if (userName.value && userEmail.value && !userMessage.value) {
        userMessage.focus();
      }
    } else {
      if (isStorageSupport) {
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("userEmail", userEmail.value);
      }
    }
  });

  writeUsCloseButton.addEventListener("click", function (event) {
    event.preventDefault();
    writeUs.classList.remove("modal--show");
    writeUs.classList.remove("modal--error");
  });

  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27 || event.key === "escape") {
      if (writeUs.classList.contains("modal--show")) {
        event.preventDefault();
        writeUs.classList.remove("modal--show");
        writeUs.classList.remove("modal--error");
      }
    }
  });
}

if (document.querySelector(".modal-map")) {
  const modalMap = document.querySelector(".modal-map");
  const modalMapCloseButton = modalMap.querySelector(".modal__close");
  const modalMapButton = document.querySelector(".contacts__map");

  modalMapButton.addEventListener("click", function (event) {
    event.preventDefault();
    modalMap.classList.add("modal--show");
  });

  modalMapCloseButton.addEventListener("click", function (event) {
    event.preventDefault();
    modalMap.classList.remove("modal--show");
  });

  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27 || event.key === "escape") {
      if (modalMap.classList.contains("modal--show")) {
        event.preventDefault();
        modalMap.classList.remove("modal--show");
      }
    }
  });
}

if (document.querySelector(".slider")) {
  const sliderButtonNext = document.querySelector(".slider__link--next");
  const sliderButtonPrevious = document.querySelector(".slider__link--previous");
  const sliderButtons = document.querySelectorAll(".slider__btn");
  const slides = document.querySelectorAll(".slider__item");
  let slideCount = 0;
  let sliderButtonCount = 1;

  sliderButtonNext.addEventListener("click", event => {
    event.preventDefault();
    if (slides[slideCount].classList.contains("slider__item--show")) {
      slides[slideCount].classList.remove("slider__item--show");
    }
    if (sliderButtons[sliderButtonCount].classList.contains("slider__btn--current")) {
      sliderButtons[sliderButtonCount].classList.remove("slider__btn--current");
    }
    slideCount++;
    sliderButtonCount++;
    if (slideCount >= slides.length) {
      slideCount = 0;
    }
    if (sliderButtonCount >= sliderButtons.length) {
      sliderButtonCount = 0;
    }
    slides[slideCount].classList.add("slider__item--show");
    sliderButtons[sliderButtonCount].classList.add("slider__btn--current");
  });

  sliderButtonPrevious.addEventListener("click", event => {
    event.preventDefault();
    if (slides[slideCount].classList.contains("slider__item--show")) {
      slides[slideCount].classList.remove("slider__item--show");
    }
    if (sliderButtons[sliderButtonCount].classList.contains("slider__btn--current")) {
      sliderButtons[sliderButtonCount].classList.remove("slider__btn--current");
    }
    slideCount--;
    sliderButtonCount--;
    if (slideCount < 0) {
      slideCount = slides.length - 1;
    }
    if (sliderButtonCount < 0) {
      sliderButtonCount = sliderButtons.length - 1;
    }
    slides[slideCount].classList.add("slider__item--show");
    sliderButtons[sliderButtonCount].classList.add("slider__btn--current");
  });
}

if (document.querySelector(".tab")) {
  const tabButtons = document.querySelectorAll(".tab__btn");
  const tabContent = document.querySelectorAll(".tab-content");

  tabButtons.forEach((tabButton, index) => {
    tabButton.addEventListener("click", event => {
      event.preventDefault();
      tabButton.classList.add("tab__btn--current");
      tabButton.removeAttribute("href");
      tabContent[index].classList.add("tab-content--show");
      for (let i = 0; i < tabButtons.length; i++) {
        if (i !== index) {
          tabButtons[i].classList.remove("tab__btn--current");
          tabButtons[i].setAttribute("href", "#");
          tabContent[i].classList.remove("tab-content--show");
        }
      }
    });
  });
}

if (document.querySelector(".modal-add-cart")) {
  const addCart = document.querySelector(".modal-add-cart");
  const addCartCloseButton = addCart.querySelector(".modal__close");
  const orderButton = addCart.querySelector(".modal-add-cart__order-btn");
  const productCardBuyButtons = document.querySelectorAll(".product-card__btn--buy");
  const productCardFavoritesButtons = document.querySelectorAll(".product-card__btn--favorites");
  const cart = document.querySelector(".header__btn--cart");
  let cartCount = 10;
  const bookmark = document.querySelector(".header__btn--bookmark");
  let bookmarkCount = 0;

  productCardBuyButtons.forEach(productCarBuyButton => {
    productCarBuyButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (cart.classList.contains("header__btn--add")) {
        cart.classList.remove("header__btn--add");
      }
      cartCount++;
      cart.textContent = "Корзина: " + cartCount;
      if (cartCount > 0) {
        cart.classList.add("header__btn--add");
      }
      addCart.classList.add("modal--show");
      orderButton.focus();
    });
  });

  addCartCloseButton.addEventListener("click", function (event) {
    event.preventDefault();
    addCart.classList.remove("modal--show");
  });

  productCardFavoritesButtons.forEach(productCardFavoritesButton => {
    productCardFavoritesButton.addEventListener("click", function(event) {
      event.preventDefault();
      if (bookmark.classList.contains("header__btn--add")) {
        bookmark.classList.remove("header__btn--add");
      }
      bookmarkCount++;
      bookmark.textContent = "Закладки: " + bookmarkCount;
      if (bookmarkCount > 0) {
        bookmark.classList.add("header__btn--add");
      }
    });
  });

  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27 || event.key === "escape") {
      if (addCart.classList.contains("modal--show")) {
        event.preventDefault();
        addCart.classList.remove("modal--show");
      }
    }
  });
}
