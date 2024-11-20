import Swiper from 'swiper';

export function initClientsDivider() {
  new Swiper('.client-slider', {
    loop: true,
    slidesPerView: 'auto',
    breakpoints: {
      380: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });
}
