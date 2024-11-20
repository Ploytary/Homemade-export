import { BaseComponent } from '../helpers/BaseComponent';
import { findHtmlElement } from '../helpers/dom';

export function initTooltip(targetContainer: HTMLElement, targetElements: HTMLElement[], styleClass: string) {
  try {
    const visibilityClass = 'tooltip--visible';

    targetContainer.addEventListener('mouseenter', () => tooltipElement.classList.add(styleClass));
    targetContainer.addEventListener('mouseleave', () => tooltipElement.classList.remove(styleClass));

    const tooltipElement = findHtmlElement('.page-overlay > .tooltip');
    const tooltipContainerElement = new BaseComponent({ tagName: 'p', props: { classList: 'tooltip__container' } });
    const tooltipNameElement = new BaseComponent({ tagName: 'span', props: { classList: 'tooltip__name' } });
    const tooltipCategoryElement = new BaseComponent({ tagName: 'span', props: { classList: 'tooltip__category' } });
    tooltipContainerElement.append(tooltipNameElement, tooltipCategoryElement);

    targetElements.forEach((element) => {
      element.addEventListener('mouseenter', (evt) => {
        if (!(evt.target instanceof HTMLElement)) return;
        tooltipElement.innerHTML = '';
        const { name, category } = evt.target.dataset;
        const errorMsg = 'cant find html data att';
        tooltipNameElement.setTextContent(name ?? errorMsg);
        tooltipCategoryElement.setTextContent(category ?? errorMsg);
        tooltipElement.append(tooltipContainerElement.getElement());
        tooltipElement.classList.add(visibilityClass);
      });
      element.addEventListener('mouseleave', () => tooltipElement.classList.remove(visibilityClass));
    });
  } catch (error) {
    console.error(error);
  }
}
