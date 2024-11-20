import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAchievementsDividerSection() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const elements = gsap.utils.toArray<HTMLElement>('.achievements-divider-section__description');
  gsap.registerPlugin(ScrollTrigger);

  for (const element of elements) {
    const startValue = 0;
    const endValue = parseInt(element.textContent ?? '0');
    const counter = {
      value: startValue,
    };

    gsap.to(counter, {
      scrollTrigger: {
        trigger: '.achievements-divider-section',
      },
      value: endValue,
      duration: 2,
      snap: 'value',
      ease: 'power3.out',
      onUpdate: () => {
        element.textContent = counter.value.toString();
        if (elements.indexOf(element) === 3) element.textContent += '+';
      },
    });
  }
}
