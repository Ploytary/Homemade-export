import { findHtmlElement } from '../../helpers/dom';

export function initOverlay() {
  try {
    const overlayElement = findHtmlElement('.page-overlay');
    const tooltipElement = findHtmlElement('.tooltip', overlayElement);

    document.body.addEventListener('mousemove', (evt) => {
      Object.assign(tooltipElement.style, {
        transform: `translate3d(${evt.pageX}px, ${evt.pageY}px, 0)`,
      });
    });
  } catch (error) {
    console.error(error);
  }
}
