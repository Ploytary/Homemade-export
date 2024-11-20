import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initWaveTextDivider() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const dividers = Array.from(document.querySelectorAll('.wave-text-divider'));
  for (const divider of dividers) {
    gsap.set(divider.querySelector('textPath'), {
      attr: { startOffset: '-25%' },
    });
    gsap.to(divider.querySelector('textPath'), {
      scrollTrigger: {
        trigger: '.wave-text-divider',
        scrub: 1,
      },
      attr: { startOffset: '10%' },
    });
  }
}
