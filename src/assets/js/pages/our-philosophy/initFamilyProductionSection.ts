import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initFamilyProductionSection() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const targetSelector = '.promo-family-production-section__circle-text';
  gsap.to(targetSelector, {
    scrollTrigger: {
      trigger: targetSelector,
      scrub: 1,
    },
    rotate: 360,
  });
}
