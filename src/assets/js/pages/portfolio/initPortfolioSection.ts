import Isotope from 'isotope-layout';
import { findHtmlElement, findHtmlElements } from '../../helpers/dom';
import { initTooltip } from '../../libs/tooltip';

export function initPortfolioSection() {
  try {
    const grid = findHtmlElement('.tile-viewer__wrapper');
    const iso = new Isotope(grid, {
      itemSelector: '.tile-viewer__item',
      percentPosition: true,
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.tile-viewer__grid-sizer',
      },
    });

    const controls = findHtmlElements('.tile-viewer__filter-button');
    controls.forEach((button) =>
      button.addEventListener('click', (evt) => {
        const id = (evt.currentTarget as HTMLElement).dataset.category;
        const selector = id === 'All' ? `*` : `.${id}`;
        iso.arrange({ filter: selector });
      })
    );

    const limitElements = (limit: number) => {
      iso.arrange({
        filter: (element) => {
          return Number(element.dataset.index) < limit;
        },
      });
    };

    let itemsLimit = 4;
    const LIMIT_STEP = 4;
    limitElements(itemsLimit);

    const button = findHtmlElement('.tile-viewer__load-more-button');
    button.addEventListener('click', () => {
      itemsLimit = itemsLimit + LIMIT_STEP;
      limitElements(itemsLimit);
      itemsLimit >= iso.items.length && button.remove();
    });

    const portfolioSecitonElement = findHtmlElement('.portfolio-section__tile-viewer');
    const targetElements = iso.items.map((item) => item.element);
    initTooltip(portfolioSecitonElement, targetElements, 'tooltip--portfolio-slider-style');
  } catch (error) {
    console.error(error);
  }
}
