import Swiper from 'swiper';

export function initClientSectionList() {
  new Swiper('.client-slider', {
    loop: true,
    slidesPerView: 'auto',
  });
}
