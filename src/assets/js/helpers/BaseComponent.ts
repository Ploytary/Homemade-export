export interface BaseComponentOptions {
  tagName?: keyof HTMLElementTagNameMap;
  labelKey?: string;
  props?: Partial<BaseComponentAttributes>;
  children?: (BaseComponentOptions | BaseComponent | HTMLElement)[];
  parentNode?: HTMLElement | BaseComponent;
}

interface BaseComponentAttributes {
  classList: string | string[];
  textContent: string;
  title: string;
  href: string;
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  style: CSSStyleDeclaration;
  draggable: boolean;
  lang: string;
  id: string;
  tabIndex: number;
  type: HTMLButtonElement['type'];
}

interface EventListenerRecord {
  type: keyof HTMLElementEventMap;
  listener: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}

export class BaseComponent {
  private node;
  public nodeEventListenerList: EventListenerRecord[] = [];

  constructor(options: BaseComponentOptions = {}) {
    const { tagName = 'div', props = {}, children, parentNode } = options;
    const { classList, href, src, srcset, sizes, alt, type, ...otherProps } = props;

    this.node = document.createElement(tagName);
    Object.assign(this.node, otherProps);

    parentNode && parentNode.append(this.node);
    classList && this.addClass(classList);
    href && this.node instanceof HTMLAnchorElement && (this.node.href = href);

    if (
      this.node instanceof HTMLImageElement ||
      this.node instanceof HTMLSourceElement ||
      this.node instanceof HTMLMediaElement
    ) {
      src && this.node instanceof HTMLImageElement && (this.node.src = src);
    }

    if (this.node instanceof HTMLImageElement || this.node instanceof HTMLSourceElement) {
      srcset && this.node instanceof HTMLImageElement && (this.node.srcset = srcset);
      sizes && this.node instanceof HTMLImageElement && (this.node.sizes = sizes);
    }

    if (this.node instanceof HTMLImageElement) {
      alt && this.node instanceof HTMLImageElement && (this.node.alt = alt);
    }

    if (this.node instanceof HTMLButtonElement) {
      type && this.node instanceof HTMLImageElement && (this.node.type = type);
    }

    if (children) {
      for (const child of children) {
        switch (true) {
          case child instanceof HTMLElement: {
            this.node.append(child);
            break;
          }
          case child instanceof BaseComponent: {
            this.node.append(child.getElement());
            break;
          }
          case typeof child === 'object': {
            this.node.append(new BaseComponent(child).getElement());
            break;
          }
          default: {
            const rest: never = child;
            rest;
          }
        }
      }
    }
  }

  public setTextContent(value: string) {
    this.node.textContent = value;
  }

  public setStyle(style: Partial<CSSStyleDeclaration>): void {
    Object.assign(this.node.style, style);
  }

  public resetStyles(): void {
    if (this.node.attributeStyleMap) {
      this.node.attributeStyleMap.clear();
    } else {
      //@ts-ignore
      this.node.style = '';
    }
  }

  public setAttribute(qualifiedName: string, value: string): void {
    this.node.setAttribute(qualifiedName, value);
  }

  public removeAttribute(qualifiedName: string): void {
    this.node.removeAttribute(qualifiedName);
  }

  public addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.nodeEventListenerList.push({ type, listener, options });
    this.node.addEventListener(type, listener, options);
  }

  public removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.node.removeEventListener(type, listener, options);
    const matchedListenerIndex = this.nodeEventListenerList.findIndex(
      (item) => item.type === type && item.listener === listener
    );
    this.nodeEventListenerList =
      matchedListenerIndex === -1
        ? this.nodeEventListenerList
        : this.nodeEventListenerList
            .slice(0, matchedListenerIndex)
            .concat(this.nodeEventListenerList.slice(matchedListenerIndex + 1));
  }

  public clearEventListeners(type?: keyof HTMLElementEventMap): void {
    const listeners = type
      ? this.nodeEventListenerList.filter((item) => item.type === type)
      : this.nodeEventListenerList;
    listeners.forEach((item) => {
      this.removeEventListener(item.type, item.listener, item.options);
    });
  }

  public addClass(value: string | string[]): void {
    if (typeof value === 'string') {
      if (value.trim() === '') return;
      const classList = value.trim().split(' ');
      this.node.classList.add(...classList);
    } else {
      this.node.classList.add(...value);
    }
  }

  public removeClass(value: string | string[]): void {
    if (typeof value === 'string') {
      if (value.trim() === '') return;
      const classList = value.trim().split(' ');
      this.node.classList.remove(...classList);
    } else {
      this.node.classList.remove(...value);
    }
  }

  public toggleClass(token: string, force?: boolean | undefined): void {
    this.node.classList.toggle(token, force);
  }

  public append(...components: BaseComponent[] | HTMLElement[]): void {
    for (const component of components) {
      if (component instanceof BaseComponent) this.node.append(component.getElement());
      if (component instanceof HTMLElement) {
        this.node.append(component);
      }
    }
  }

  public destroy(): void {
    this.node.remove();
  }

  public getElement(): HTMLElement {
    return this.node;
  }

  public buildChildren(children: BaseComponentOptions[]): Record<string, BaseComponent> {
    const componentArray = BaseComponent.buidler({ children, parentNode: this });
    return Object.fromEntries(componentArray);
  }

  private setNode(element: HTMLElement): void {
    this.node = element;
  }

  public static buildStructure(structure: BaseComponentOptions): Record<string, BaseComponent> {
    const componentArray = BaseComponent.buidler(structure);
    return Object.fromEntries(componentArray);
  }

  private static buidler(structure: BaseComponentOptions | BaseComponentOptions[]): [string, BaseComponent][] {
    const resultArray: [string, BaseComponent][] = [];
    const workStructure: BaseComponentOptions[] = Array.isArray(structure) ? structure : [structure];

    for (const structureItem of workStructure) {
      const newComponent = new BaseComponent(structureItem);
      structureItem.labelKey && resultArray.push([structureItem.labelKey, newComponent]);
      if (structureItem.children) {
        for (const child of structureItem.children) {
          switch (true) {
            case child instanceof HTMLElement: {
              const childComponent = BaseComponent.fromHTMLElement(child);
              newComponent.append(childComponent);
              break;
            }
            case child instanceof BaseComponent: {
              newComponent.append(child);
              break;
            }
            case typeof child === 'object': {
              resultArray.push(...BaseComponent.buidler(child));
              break;
            }
            default: {
              const rest: never = child;
              rest;
            }
          }
        }
      }
    }

    return resultArray;
  }

  private static fromHTMLElement(element: HTMLElement): BaseComponent {
    const component = new BaseComponent();
    component.setNode(element);
    return component;
  }
}
