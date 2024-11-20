import { findHtmlElement } from '../../../helpers/dom';

export function fillTextDivider(container: HTMLElement) {
  try {
    const mainText = findHtmlElement('.text-divider__text', container);
    const gapText = findHtmlElement('.text-divider__gap-text', container);
    const viewportWidth = window.innerWidth;
    const gapWidth = window.getComputedStyle(container).columnGap || '0';
    const pairRepeatsCount =
      Math.ceil(viewportWidth / (mainText.offsetWidth + gapText.offsetWidth + parseInt(gapWidth))) * 2;
    const resultElementQueque = new Array(pairRepeatsCount)
      .fill(null)
      .map(() => [mainText.cloneNode(true), gapText.cloneNode(true)])
      .flat();

    container.innerHTML = '';
    container.append(...resultElementQueque);
  } catch (error) {
    console.error(error);
  }
}
