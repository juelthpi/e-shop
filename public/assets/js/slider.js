const heroSlider = new Swiper(".hero-banner-slider", {
  loop: true,
  slidesPerView: 1,
  speed: 1000,

  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
});
const newProductListSlider = new Swiper(".new-product-list-slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 6000,
  autoplay: {
    delay: 1500,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 8,
    },
    1399: {
      slidesPerView: 10,
    },
  },
});
const hotProductListSlider = new Swiper(".hot-product-list-slider", {
  loop: true,
  slidesPerView: 1,
  rtl: true,
  speed: 6000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 10,
  autoplay: true,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 8,
    },
    1399: {
      slidesPerView: 10,
    },
  },
});
const topOfferProductSlider = new Swiper(".top-offer-product-slider", {
  loop: true,
  slidesPerView: 1,

  speed: 6000,
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: true,
  //   pauseOnMouseEnter: true,
  // },
  spaceBetween: 10,
  autoplay: false,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 4,
    },
    840: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});
// slider more start
document.querySelectorAll(".product-list-show-slider").forEach((sliderEl) => {
  const swiper = new Swiper(sliderEl, {
    loop: true,
    slidesPerView: 1,
    speed: 500,
    spaceBetween: 10,

    autoplay: {
      delay: 600,
      disableOnInteraction: false,
    },
  });

  swiper.autoplay.stop();
  sliderEl.addEventListener("mouseenter", () => {
    swiper.autoplay.start();
  });
  sliderEl.addEventListener("mouseleave", () => {
    swiper.autoplay.stop();
  });
});
// slider more end
const topBrandsProductSlider = new Swiper(".top-brands-product-slider", {
  loop: true,
  slidesPerView: 1,

  speed: 6000,
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: true,
  //   pauseOnMouseEnter: true,
  // },
  spaceBetween: 10,
  autoplay: false,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 4,
    },
    840: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});
const hotBannerSlider = new Swiper(".hot-banner-slider", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.5,
  spaceBetween: 20,
  speed: 5000,

  slideToClickedSlide: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
});
