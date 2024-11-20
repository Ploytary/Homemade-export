import { sentenceCase } from '../../helpers/text';
import { findHtmlElement } from '../../helpers/dom';
import throttle from 'lodash/throttle';

interface Params {
  containerClass: string;
  containerHideClass: string;
  buttonClass: string;
  labelClass: string;
  iconClass: string;
  labelText: string;
  hideLabel: boolean;
  svgIconMarkup: string;
  scrollThreshold: number;
  parent: HTMLElement;
  clickHandler: Listener;
}

type Listener = Parameters<HTMLElement['addEventListener']>[1];

const defaultParams: Params = {
  containerClass: 'scroll-to',
  containerHideClass: 'scroll-to--hidden',
  buttonClass: 'scroll-to__button',
  labelClass: 'scroll-to__label',
  iconClass: 'scroll-to__svg-icon',
  labelText: 'scroll to top',
  svgIconMarkup: `<svg viewBox="0 0 100 100"><polygon points="0,0 100,0 50,100" /></svg>`,
  hideLabel: true,
  scrollThreshold: window.innerHeight,
  parent: document.body,
  clickHandler: () => window.scrollTo(0, 0),
};

export class ScrollToButton {
  private params: Params;
  private container: HTMLElement;
  private button: HTMLElement;
  private label: HTMLElement;
  constructor(customParams?: Partial<Params>) {
    this.params = Object.assign({}, defaultParams, customParams);

    const existingButton = document.querySelector('.' + this.params.containerClass);
    if (existingButton) {
      this.container = existingButton as HTMLElement;
      this.button = findHtmlElement('.' + this.params.buttonClass, existingButton);
      this.label = findHtmlElement('.' + this.params.labelClass, existingButton);
    } else {
      this.container = document.createElement('div');
      this.container.className = this.params.containerClass;
      this.params.parent.append(this.container);

      this.button = document.createElement('button');
      this.button.className = this.params.buttonClass;
      this.container.append(this.button);

      this.label = document.createElement('span');
      this.label.textContent = sentenceCase(this.params.labelText);
      this.params.hideLabel && this.label.classList.add('visually-hidden');
      this.button.append(this.label);

      const span = document.createElement('span');
      span.innerHTML = this.params.svgIconMarkup;
      const svg = span.lastElementChild;
      svg?.classList.add(this.params.iconClass);
      svg && this.button.append(svg);
    }

    window.addEventListener('scroll', throttle(this.switchVisibilityClass.bind(this), 500), { passive: true });

    this.switchVisibilityClass();
    this.addClickHandler(this.params.clickHandler);
  }

  private switchVisibilityClass() {
    this.container.classList.toggle(
      this.params.containerHideClass,
      document.documentElement.scrollTop < this.params.scrollThreshold
    );
  }

  public addClickHandler(clickHanler: Listener) {
    this.button.addEventListener('click', clickHanler);
  }
}
