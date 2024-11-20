import { findHtmlElement } from '../../helpers/dom';
const DEFAULT_VALUE = 50;

export function initProgressBar() {
  const barElements = Array.from(document.querySelectorAll('.progress-bar')) as HTMLElement[];
  for (const bar of barElements) {
    const targetValue = Number(bar.dataset.value || DEFAULT_VALUE);
    const progressElement = findHtmlElement('.progress-bar__bar-value', bar);
    progressElement.style.transform = `scaleX(${targetValue / 100})`;
  }
}
