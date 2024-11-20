import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { findHtmlElement } from '../../helpers/dom';
import { initTooltip } from '../../libs/tooltip';

export function portfolioWidgetSlider() {
  const portfolioSlider = new Swiper('.portfolio-slider', {
    modules: [Navigation],
    loop: true,
    spaceBetween: 40,
    breakpoints: {
      380: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  portfolioSlider.slidesEl.style.gap = 'normal';

  try {
    const slidesContent = portfolioSlider.slides
      .map((item) => item.querySelector('.portfolio-item'))
      .filter((item): item is HTMLElement => !!item);
    const portfolioSecitonElement = findHtmlElement('.portfolio-widget');
    initTooltip(portfolioSecitonElement, slidesContent, 'tooltip--portfolio-slider-style');
  } catch (error) {
    console.error(error);
  }
}
