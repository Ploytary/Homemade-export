import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function setTextDividerAnimation(element: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const dividerElement = element;
  gsap.set(dividerElement, {
    xPercent: -100,
  });
  gsap.to(dividerElement, {
    scrollTrigger: {
      trigger: element,
      scrub: 1,
    },
    xPercent: 0,
  });
}
