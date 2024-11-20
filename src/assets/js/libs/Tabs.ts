import { findHtmlElement, findHtmlElements } from '../helpers/dom';

const defaultOptions = {
  containerClass: 'tabs',
  triggerClass: 'tabs__item-trigger',
  contentClass: 'tabs__item-content',
  headlineClass: 'tabs__headline',
  floatDecorElement: 'tabs__triggers-decor-element',
  activePrefix: '--active',
  floatDurationSec: 0.3,
};

export class Tabs {
  public options: typeof defaultOptions;
  public container: HTMLElement;
  public itemTriggers: HTMLElement[];
  public itemContents: HTMLElement[];
  public headlineElement: HTMLElement;
  public decorElement: HTMLElement;
  public currentTab: number = 0;

  constructor(userOptions?: Partial<typeof defaultOptions>) {
    this.options = Object.assign(defaultOptions, userOptions);
    this.container = findHtmlElement('.' + this.options.containerClass);
    this.itemTriggers = findHtmlElements('.' + this.options.triggerClass, this.container);
    this.itemContents = findHtmlElements('.' + this.options.contentClass, this.container);
    this.headlineElement = findHtmlElement('.' + this.options.headlineClass, this.container);
    this.decorElement = findHtmlElement('.' + this.options.floatDecorElement, this.container);

    this.headlineElement.style.position = 'relative';
    this.decorElement.style.transitionDuration = `${this.options.floatDurationSec}s`;

    this.addEvents();
    this.showTab(this.currentTab);
  }

  showTab(current: number): void {
    this.currentTab = current;
    this.itemTriggers.forEach((element, index) => {
      element.classList.toggle(`${this.options.triggerClass}${this.options.activePrefix}`, index === current);
    });
    this.itemContents.forEach((element, index) => {
      element.classList.toggle(`${this.options.contentClass}${this.options.activePrefix}`, index === current);
    });
    const currentTrigger = this.itemTriggers.find((element, index) => index === this.currentTab);
    if (!currentTrigger) return;
    this.decorElement.style.transform = `translateX(${currentTrigger.offsetLeft}px)`;
  }

  addEvents(): void {
    this.headlineElement.addEventListener('click', (evt: Event) => {
      const target = evt.target;
      if (!(target instanceof HTMLElement)) return;
      const button = target.closest('button');
      if (!button) return;
      this.currentTab = this.itemTriggers.indexOf(button);
      this.showTab(this.currentTab);
    });
  }
}
