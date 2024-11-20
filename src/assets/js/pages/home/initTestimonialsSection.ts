import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export function initTestimonialsSection() {
  new Swiper('.testimonials__slider', {
    modules: [Pagination],
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}
