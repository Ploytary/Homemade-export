import { findHtmlElement } from '../helpers/dom';

export interface BurgerMenuParams {
  containerClass?: string;
  togglerButtonClass?: string;
  openedContentTogglerButtonClass?: string;
  contentClass?: string;
  openedContentClass?: string;
  openedContentCloseButtonClass?: string;
  backdropClass?: string;
  breakpoint: number;
}

const defaultParams: Required<BurgerMenuParams> = {
  containerClass: 'burger-menu',
  togglerButtonClass: 'burger-menu__toggler',
  openedContentTogglerButtonClass: 'burger-menu__toggler--opened',
  contentClass: 'burger-menu__content',
  openedContentClass: 'burger-menu__content--open',
  openedContentCloseButtonClass: 'burger-menu__content-close-button',
  backdropClass: 'burger-menu__backdrop',
  breakpoint: 768,
};

export interface EventCallback {
  (instance: BurgerMenu): void;
}

export class BurgerMenu {
  private params: Required<BurgerMenuParams>;
  public containerElement: HTMLElement;
  public togglerButtonElement: HTMLElement;
  public contentElement: HTMLElement;
  public closeButtonElement: HTMLElement | null = null;
  public backdropElement: HTMLElement;
  private isOpen: boolean = false;
  private handleTogglerClick = this.togglerButtonClickEventHandler.bind(this);
  private handleOutClick = this.outerClickHandler.bind(this);
  private handleCloseButtonClick = this.close.bind(this);
  private onInitHandler: EventCallback | null = null;
  private onOpenHandler: EventCallback | null = null;
  private onCloseHandler: EventCallback | null = null;

  constructor(
    selector: string | HTMLElement,
    customParams?: Partial<BurgerMenuParams>,
    onInitHandler: EventCallback | null = null
  ) {
    this.params = Object.assign({}, defaultParams, customParams);
    this.onInitHandler = onInitHandler;

    if (selector instanceof HTMLElement) {
      this.containerElement = selector;
    } else {
      this.containerElement = findHtmlElement(selector);
    }

    this.containerElement.classList.add(this.params.containerClass, defaultParams.containerClass);
    this.togglerButtonElement = findHtmlElement(`.${this.params.togglerButtonClass}`, this.containerElement);
    this.togglerButtonElement.classList.add(defaultParams.togglerButtonClass);
    this.contentElement = findHtmlElement(`.${this.params.contentClass}`, this.containerElement);
    this.contentElement.classList.add(defaultParams.contentClass);
    this.closeButtonElement = this.containerElement.querySelector(`.${this.params.openedContentCloseButtonClass}`);
    this.closeButtonElement?.classList.add(defaultParams.openedContentCloseButtonClass);

    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add(this.params.backdropClass, defaultParams.backdropClass);
    this.backdropElement.style.visibility = 'hidden';

    this.containerElement.append(this.backdropElement);
    this.addEvents();
    this.onInitHandler && this.onInitHandler(this);
    this.setWindowSizeObserver();
  }

  private setWindowSizeObserver() {
    const sizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width >= this.params.breakpoint) {
          this.close();
        }
      }
    });
    sizeObserver.observe(document.body);
  }

  public close(): void {
    if (!this.isOpen) return;
    this.switchOpenState(false);
    this.backdropElement.style.visibility = 'hidden';
    document.documentElement.style.overflow = 'visible';
    this.onCloseHandler && this.onCloseHandler(this);
  }

  public open(): void {
    if (this.isOpen) return;
    this.switchOpenState(true);
    this.backdropElement.style.visibility = 'visible';
    document.documentElement.style.overflow = 'hidden';
    this.onOpenHandler && this.onOpenHandler(this);
  }

  public destroy(): void {
    this.backdropElement.remove();
    this.removeEvents();
  }

  public onInit(callback: EventCallback) {
    this.onInitHandler = callback;
  }

  public onOpen(callback: EventCallback) {
    this.onOpenHandler = callback;
  }

  public onClose(callback: EventCallback) {
    this.onCloseHandler = callback;
  }

  private switchOpenState(predicate: boolean): void {
    this.isOpen = predicate;
    this.contentElement.classList.toggle(this.params.openedContentClass, this.isOpen);
    this.contentElement.classList.toggle(defaultParams.openedContentClass, this.isOpen);

    this.togglerButtonElement.classList.toggle(this.params.openedContentTogglerButtonClass, this.isOpen);
    this.togglerButtonElement.classList.toggle(defaultParams.openedContentTogglerButtonClass, this.isOpen);

    this.closeButtonElement?.classList.toggle(this.params.openedContentTogglerButtonClass, this.isOpen);
    this.closeButtonElement?.classList.toggle(defaultParams.openedContentTogglerButtonClass, this.isOpen);
  }

  private addEvents(): void {
    this.togglerButtonElement.addEventListener('click', this.handleTogglerClick);
    document.addEventListener('click', this.handleOutClick);
    this.closeButtonElement?.addEventListener('click', this.handleCloseButtonClick);
  }

  private removeEvents(): void {
    this.togglerButtonElement.removeEventListener('click', this.handleTogglerClick);
    document.removeEventListener('click', this.handleOutClick);
    this.closeButtonElement?.removeEventListener('click', this.handleCloseButtonClick);
  }

  private togglerButtonClickEventHandler(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private outerClickHandler(evt: Event): void {
    if (evt.target === this.backdropElement) {
      this.close();
    }
  }
}
