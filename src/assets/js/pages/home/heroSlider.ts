import gsap from 'gsap';
import Swiper from 'swiper';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import '../../libs/GSAPAnimations';

export function initHeroSlider() {
  const slides = gsap.utils.toArray('.hero-slider__slide-content').filter((result): result is HTMLElement => !!result);

  const slideAnimations = slides.map((slide) => {
    const slideAnimation = gsap.timeline({ paused: true });
    slideAnimation.add(gsap.effects.fadeIn(slide.children, { direction: 'left', pixels: 100, stagger: 0.2 }));
    return slideAnimation;
  });

  const playSlideAnimation = ({ realIndex }: Swiper) => slideAnimations[realIndex].restart();

  const swiper = new Swiper('.hero-slider', {
    modules: [Pagination, Autoplay, EffectFade],
    init: false,
    loop: true,
    autoplay: {
      delay: 10000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  swiper.on('init', (instance) => {
    const animation = playSlideAnimation(instance);
    const animationDur = animation.duration();
    gsap.from(instance.pagination.bullets, { opacity: 0, delay: animationDur });
  });
  swiper.on('slidesUpdated', preloadSlideImage);
  swiper.on('realIndexChange', preloadSlideImage);
  swiper.on('realIndexChange', playSlideAnimation);
  swiper.init();
}

function preloadSlideImage({ slides, realIndex }: Swiper) {
  const slidesCount = slides.length;
  if (realIndex + 1 >= slidesCount) return;
  slides[realIndex + 1].querySelector('.hero-slider__slide')?.classList.add('lazyload');
}
