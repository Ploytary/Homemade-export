import { findHtmlElement } from '../helpers/dom';
import gsap from 'gsap';

const ANIMATION_DURATION = 1;
const DEFAULT_VALUE = 50;

export function animateProgressBar(element: HTMLElement, duration: number = ANIMATION_DURATION) {
  const initValue = 0;
  const targetValue = Number(element.dataset.value || DEFAULT_VALUE);
  const animation = {
    value: initValue,
  };
  const progressElement = findHtmlElement('.progress-bar__bar-value', element);
  const progressValueDigitElement = findHtmlElement('.progress-bar__value > span:first-child', element);

  const timeline = gsap.timeline();

  timeline
    .fromTo(
      animation,
      { value: initValue, duration: duration },
      {
        value: targetValue,
        duration: duration,
        snap: 'value',
        onUpdate: () => {
          progressValueDigitElement.textContent = animation.value.toString();
        },
      }
    )
    .fromTo(
      progressElement,
      { scaleX: animation.value / 100 },
      {
        scaleX: targetValue / 100,
        duration: duration,
      },
      0
    );

  return timeline;
}
