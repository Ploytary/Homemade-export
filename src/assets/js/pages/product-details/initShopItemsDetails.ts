import Swiper from 'swiper';
import { Thumbs, Zoom } from 'swiper/modules';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Tabs } from '../../libs/Tabs';
import { Counter } from '../../libs/Counter';
import { findHtmlElement } from '../../helpers/dom';

export function initShopItemsDetails() {
  try {
    const tabs = new Tabs();
    new Counter();
    initViewer();

    const lightbox = new PhotoSwipeLightbox({
      gallery: '.image-viewer__viewport .swiper-wrapper',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    const reviewLink = findHtmlElement('.shop-item-details__product-reviews-count');
    reviewLink.addEventListener('click', () => {
      tabs.showTab(2);
    });
  } catch (error) {
    console.error(error);
  }
}

function initViewer() {
  const thrumbsSwiper = new Swiper('.image-viewer__thrumbs', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  new Swiper('.image-viewer__viewport', {
    modules: [Thumbs, Zoom],
    zoom: {
      toggle: true,
    },
    loop: true,
    spaceBetween: 10,
    thumbs: {
      swiper: thrumbsSwiper,
    },
  });
}
