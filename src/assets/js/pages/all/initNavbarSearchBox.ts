import { gsap } from 'gsap';
import { ContentBox, ContentBoxParams, EventCallback } from '../../libs/ContentBox';

const params: ContentBoxParams = {
  containerClass: 'navbar-search-box',
  togglerButtonClass: 'navbar-search-box__toggler',
  contentClass: 'navbar-search-box__content',
  openedContentClass: 'navbar-search-box--open',
  openedContentCloseButtonClass: 'navbar-search-box__content-close-button',
  backdropClass: 'navbar-search-box__backdrop',
};

const ANIMATION_DURATION = 0.3;
const BREAKPOINT = 1200;

export function initNavbarSearchBox() {
  const searchBox = new ContentBox('.navbar-search-box', params, initHandler);
  const sizeObserver = setSizeObserver(searchBox);

  searchBox.onOpen(openHandler);
  searchBox.onClose(closeHandler);
  sizeObserver.observe(document.body);
}

const openHandler: EventCallback = (searchBox) => {
  const searchField = searchBox.containerElement.querySelector('.input-field__input');
  setTimeout(() => (searchField as HTMLElement).focus(), 100);
  const openTimeline = gsap.timeline();
  if (document.body.clientWidth < BREAKPOINT) {
    openTimeline.add(getMobileAnimation(searchBox).play());
  } else {
    openTimeline.add(getDesktopAnimation(searchBox).play());
  }
  searchField instanceof HTMLElement && searchField.focus();
};

const closeHandler: EventCallback = (searchBox) => {
  const closeTimeline = gsap.timeline();
  if (document.body.clientWidth < BREAKPOINT) {
    closeTimeline.add(getMobileAnimation(searchBox).reverse());
  } else {
    closeTimeline.add(getDesktopAnimation(searchBox).reverse());
  }
};

const initHandler: EventCallback = (instance) => {
  const { contentElement } = instance;
  gsap.set(contentElement, {
    autoAlpha: 0,
  });
};

function getMobileAnimation(searchBox: ContentBox) {
  const mobileAnimation = gsap.timeline({ paused: true });
  mobileAnimation.set(searchBox.closeButtonElement, {
    autoAlpha: 0,
    scale: 1,
  });
  mobileAnimation.fromTo(
    searchBox.contentElement,
    {
      autoAlpha: 0,
      yPercent: 120,
      scaleX: 1,
    },
    {
      autoAlpha: 1,
      yPercent: 100,
      duration: ANIMATION_DURATION,
      scaleX: 1,
    }
  );
  return mobileAnimation;
}

function getDesktopAnimation(searchBox: ContentBox) {
  const desktopAnimation = gsap.timeline({ paused: true });
  desktopAnimation.set(searchBox.contentElement, {
    yPercent: 0,
  });
  desktopAnimation.fromTo(
    searchBox.contentElement,
    {
      scaleX: 0,
      autoAlpha: 0,
      transformOrigin: 'right',
    },
    {
      autoAlpha: 1,
      scaleX: 1,
      duration: 0.2,
    }
  );
  desktopAnimation.fromTo(
    searchBox.closeButtonElement,
    {
      autoAlpha: 0,
      scale: 0.5,
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.2,
    }
  );

  return desktopAnimation;
}

function setSizeObserver(searchBox: ContentBox) {
  let mode: 'mobile' | 'desktop' | null = null;
  const sizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (searchBox.isOpen && entry.contentRect.width >= BREAKPOINT && mode !== 'desktop') {
        getDesktopAnimation(searchBox).play();
      }
      if (searchBox.isOpen && entry.contentRect.width < BREAKPOINT && mode !== 'mobile') {
        getMobileAnimation(searchBox).play();
      }
      if (entry.contentRect.width >= BREAKPOINT) {
        mode = 'desktop';
      } else {
        mode = 'mobile';
      }
    }
  });

  return sizeObserver;
}
