import { findHtmlElement } from '../helpers/dom';

const defaultOptions = {
  containerClass: 'counter',
  decreaseButtonClass: 'counter__button--decrease',
  increaseButtonClass: 'counter__button--increase',
  valueClass: 'counter__value',
};

export class Counter {
  public options: typeof defaultOptions;
  public container: HTMLElement;
  public decreaseButton: HTMLElement;
  public increaseButton: HTMLElement;
  public valueOutput: HTMLElement;
  public value = 1;

  constructor(userOptions?: Partial<typeof defaultOptions>) {
    this.options = Object.assign(defaultOptions, userOptions);
    this.container = findHtmlElement('.' + this.options.containerClass);
    this.decreaseButton = findHtmlElement('.' + this.options.decreaseButtonClass, this.container);
    this.increaseButton = findHtmlElement('.' + this.options.increaseButtonClass, this.container);
    this.valueOutput = findHtmlElement('.' + this.options.valueClass, this.container);
    this.addEvents();
  }

  private addEvents() {
    this.decreaseButton.addEventListener('click', this.decrease);
    this.increaseButton.addEventListener('click', this.increase);
  }

  private decrease = () => {
    this.valueOutput.textContent = this.setValue(this.value - 1);
  };
  private increase = () => {
    this.valueOutput.textContent = this.setValue(this.value + 1);
  };

  private setValue(value: number) {
    this.value = value < 1 ? 1 : value;
    return String(this.value);
  }
}
