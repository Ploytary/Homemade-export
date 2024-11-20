import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { findHtmlElement } from '../../helpers/dom';
import { animateProgressBar } from '../../libs/animateProgressBar';
import '../../libs/GSAPAnimations';

gsap.registerPlugin(ScrollTrigger);
const FADE_ANIMATION_DURATION = 0.5;

export function initBestRecipesSection() {
  const sectionElement = findHtmlElement('.promo-best-recipes-section');
  const barContainerElement = findHtmlElement('.promo-best-recipes-section__progress-bars', sectionElement);
  const textElement = findHtmlElement('.promo-best-recipes-section__text');

  const bars = Array.from(barContainerElement.children) as HTMLElement[];

  const barFadeAnimation = gsap.timeline();
  barFadeAnimation.add(
    gsap.effects.fadeIn(bars, {
      direction: 'up',
      pixels: 100,
      duration: FADE_ANIMATION_DURATION,
      stagger: FADE_ANIMATION_DURATION / 5,
    })
  );

  const barTextAnimation = gsap.timeline();
  bars.map((barElement) => barTextAnimation.add(animateProgressBar(barElement), '<'));

  const sectionElementsAnimation = gsap.timeline({ scrollTrigger: sectionElement });
  sectionElementsAnimation.add(
    gsap.effects.fadeIn(textElement.children, {
      direction: 'up',
      pixels: 100,
      duration: FADE_ANIMATION_DURATION,
      stagger: FADE_ANIMATION_DURATION / 3,
    })
  );

  sectionElementsAnimation.add(barFadeAnimation);
  sectionElementsAnimation.add(barTextAnimation, '<');
}
