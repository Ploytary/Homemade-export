import { findHtmlElement } from '../helpers/dom';

//Structure:
// <div class="navbar content-box">
//   <nav class="navbar__site">
//     <div class="content-box__content"> - for expand
//       ...
//       <button class="content-box__content-close-button">close</button>
//     </div>
//   </nav>
//   <div class="navbar__user"></div>
//   <button class="button content-box__toggler"></button> - for toggle
// </div>

export interface ContentBoxParams {
  containerClass: string;
  togglerButtonClass: string;
  contentClass: string;
  openedContentClass: string;
  openedContentCloseButtonClass: string;
  backdropClass: string;
}

const defaultParams: ContentBoxParams = {
  containerClass: 'content-box',
  togglerButtonClass: 'content-box__toggler',
  contentClass: 'content-box__content',
  openedContentClass: 'content-box--open',
  openedContentCloseButtonClass: 'content-box__content-close-button',
  backdropClass: 'content-box__backdrop',
};

interface AnimationParams {
  containerElement: HTMLElement;
  togglerButtonElement: HTMLElement;
  contentElement: HTMLElement;
  closeButtonElement: HTMLElement | null;
  backdropElement: HTMLElement;
}

export interface AnimationCallback {
  (params: AnimationParams): void;
}

export interface EventCallback {
  (instance: ContentBox): void;
}

export class ContentBox {
  private params: ContentBoxParams;
  public containerElement: HTMLElement;
  public togglerButtonElement: HTMLElement;
  public contentElement: HTMLElement;
  public closeButtonElement: HTMLElement | null = null;
  public backdropElement: HTMLElement;
  public isOpen: boolean = false;
  private handleTogglerClick = this.togglerButtonClickEventHandler.bind(this);
  private handleOutClick = this.outerClickHandler.bind(this);
  private handleCloseButtonClick = this.close.bind(this);
  private onInitHandler: EventCallback | null = null;
  private onOpenHandler: EventCallback | null = null;
  private onCloseHandler: EventCallback | null = null;
  constructor(
    selector: string | HTMLElement,
    customParams?: Partial<ContentBoxParams>,
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

    this.addEvents();
    this.onInitHandler && this.onInitHandler(this);
  }

  public close(): void {
    if (!this.isOpen) return;
    this.switchOpenState(false);
    this.onCloseHandler && this.onCloseHandler(this);
    this.backdropElement.remove();
  }

  public open(): void {
    if (this.isOpen) return;
    this.switchOpenState(true);
    this.onOpenHandler && this.onOpenHandler(this);
    this.containerElement.append(this.backdropElement);
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
    this.containerElement.classList.toggle(this.params.openedContentClass, this.isOpen);
    this.containerElement.classList.toggle(defaultParams.openedContentClass, this.isOpen);
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
