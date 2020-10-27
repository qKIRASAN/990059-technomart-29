if (document.querySelector(".modal-write-us")) {
  const writeUs = document.querySelector(".modal-write-us");
  const writeUsForm = writeUs.querySelector(".modal-write-us__form");
  const userName = writeUs.querySelector("[name=user-name]");
  const userEmail = writeUs.querySelector("[name=user-email]");
  const userMessage = writeUs.querySelector("[name=user-message]");
  const writeUsCloseButton = writeUs.querySelector(".modal__close");
  const writeUsButton = document.querySelector(".contacts__btn");
  let isStorageSupport = true;
  let userNameStorage = "";
  let userEmailStorage = "";

  try {
    userNameStorage = localStorage.getItem("userName");
    userEmailStorage = localStorage.getItem("userEmail");
  } catch (error) {
    isStorageSupport = false;
  }

  writeUsButton.addEventListener("click", (event) => {
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

  writeUsForm.addEventListener("submit", (event) => {
    if (!userName.value || !userEmail.value || !userMessage.value) {
      event.preventDefault();
      writeUs.classList.remove("modal--error");
      writeUs.offsetWidth;
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

  writeUsCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    writeUs.classList.remove("modal--show");
    writeUs.classList.remove("modal--error");
  });

  window.addEventListener("keydown", (event) => {
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

  modalMapButton.addEventListener("click", (event) => {
    event.preventDefault();
    modalMap.classList.add("modal--show");
  });

  modalMapCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    modalMap.classList.remove("modal--show");
  });

  window.addEventListener("keydown", (event) => {
    if (event.keyCode === 27 || event.key === "escape") {
      if (modalMap.classList.contains("modal--show")) {
        event.preventDefault();
        modalMap.classList.remove("modal--show");
      }
    }
  });
}

if (document.querySelector(".slider")) {
  const slider = document.querySelector(".slider");
  const sliderButtons = slider.querySelectorAll(".slider__btn");
  const slidePerforator = slider.querySelector(".slider__item--perforator");
  const slideDrill = slider.querySelector(".slider__item--drill");

  const toggleSlide = function () {
    if (slidePerforator.classList.contains("slider__item--show")) {
      slidePerforator.classList.remove("slider__item--show");
      slideDrill.classList.add("slider__item--show");
      sliderButtons[1].classList.remove("slider__btn--current");
      sliderButtons[0].classList.add("slider__btn--current");
    } else {
      slideDrill.classList.remove("slider__item--show");
      slidePerforator.classList.add("slider__item--show");
      sliderButtons[0].classList.remove("slider__btn--current");
      sliderButtons[1].classList.add("slider__btn--current");
    }
  };

  slider.addEventListener("click", (event) => {
    event.preventDefault();
    let currentTarget = event.target;
    if (!currentTarget.classList.contains("slider__link") && !currentTarget.classList.contains("slider__btn")) return;
    toggleSlide();
  });
}

if (document.querySelector(".tab")) {
  const tabButtons = document.querySelectorAll(".tab__btn");
  const tabContent = document.querySelectorAll(".tab-content");

  tabButtons.forEach((tabButton, index) => {
    tabButton.addEventListener("click", (event) => {
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

  productCardBuyButtons.forEach((productCarBuyButton) => {
    productCarBuyButton.addEventListener("click", (event) => {
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

  addCartCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    addCart.classList.remove("modal--show");
  });

  productCardFavoritesButtons.forEach((productCardFavoritesButton) => {
    productCardFavoritesButton.addEventListener("click", (event) => {
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

  window.addEventListener("keydown", (event) => {
    if (event.keyCode === 27 || event.key === "escape") {
      if (addCart.classList.contains("modal--show")) {
        event.preventDefault();
        addCart.classList.remove("modal--show");
      }
    }
  });
}
