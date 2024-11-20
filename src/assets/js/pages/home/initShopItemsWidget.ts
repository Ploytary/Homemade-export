import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

export function initShopItemsWidget() {
  const widgetSlider = new Swiper('.shop-items-widget__slider', {
    modules: [Navigation, Pagination],
    loop: true,
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      380: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  });
  widgetSlider.slidesEl.style.gap = 'normal';
}
