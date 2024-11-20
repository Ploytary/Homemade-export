export function alertFormFields(form: HTMLFormElement) {
  const formData = new FormData(form);
  const fields: string[] = [];
  formData.forEach((value, key) => fields.push(`${key}: ${value}`));
  alert(fields.length ? fields.join('\n') : 'no filled fields');
}

export function resetFormFields(form: HTMLFormElement) {
  const formElements = Array.from(form);
  const textFieldElements: (HTMLInputElement | HTMLTextAreaElement)[] = [];
  const inputElements: HTMLInputElement[] = [];
  formElements.forEach((element) => {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) textFieldElements.push(element);
    if (element instanceof HTMLInputElement) inputElements.push(element);
  });
  textFieldElements.forEach((element) => (element.value = ''));
  inputElements.forEach((element) => (element.checked = false));
}

export function findHtmlElement(selector: string, place: Element | Document = document): HTMLElement {
  const element = findElement(selector, place);
  if (element instanceof HTMLElement) {
    return element;
  }
  throw new Error(
    `the element found with selector "${selector}" with type ${element.constructor.name} is not an instance of HTMLelement`
  );
}

export function findHtmlElements(selector: string, place: Element | Document = document): HTMLElement[] {
  const elements = findElements(selector, place);
  if (isHtmlElements(elements)) return elements;
  throw new Error(`the elements found with selector "${selector}" is not an instance of HTMLelement`);
}

function findElement(selector: string, place: Element | Document = document): Element {
  const element = place.querySelector(selector);
  if (!element) throw Error(`element ${selector} does not exist`);
  return element;
}

function findElements(selector: string, place: Element | Document = document): Element[] {
  const elements = Array.from(place.querySelectorAll(selector));
  return elements;
}

export function isHtmlElement(element: Element | EventTarget | null): element is HTMLElement {
  return element instanceof HTMLElement;
}

function isHtmlElements(elements: Element[]): elements is HTMLElement[] {
  return elements.every((element) => isHtmlElement(element));
}

export function getEventClosestElement<E extends Element = Element>(evt: Event, selector: string): E | null;
export function getEventClosestElement<K extends keyof HTMLElementTagNameMap>(
  evt: Event,
  selector: K
): HTMLElementTagNameMap[K] | null {
  const target = evt.target;
  if (!(target instanceof Element)) {
    throw new Error(`Event target is not instance of Element`);
  }
  const element = target.closest(selector);
  return element;
}

const observerDefaultOptions = { rootMargin: '1500px' };

export function backgroundLazyLoad(options: IntersectionObserverInit = observerDefaultOptions) {
  const intersectionHandler: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target instanceof HTMLElement) {
        entry.target.style.backgroundImage = `url(${entry.target.dataset.bgImage})`;
        myObserver.unobserve(entry.target);
      }
    });
  };

  const myObserver = new IntersectionObserver(intersectionHandler, options);
  const lazyBackgrounds = document.querySelectorAll('.background--lazyload');
  lazyBackgrounds.forEach((element: Element) => {
    myObserver.observe(element);
  });
}
