import gsap from 'gsap';
import { BurgerMenu, EventCallback } from '../../libs/BurgerMenu';

const ANIMATION_DURATION = 0.3;

export function initBurgerMenu() {
  const burgerMenu = new BurgerMenu('.burger-menu', { breakpoint: 1200 }, initHandler);
  const closeButton = burgerMenu.closeButtonElement;
  const toggleButton = burgerMenu.togglerButtonElement;
  const closeButtonTimeline = closeButton && getBurgerButtonGsapAnimation(closeButton);
  const toggleButtonTimeline = getBurgerButtonGsapAnimation(toggleButton);
  const menuTimeline = getMenuTimeline(burgerMenu);

  const openHandler: EventCallback = () => {
    const openTimeline = gsap.timeline();
    openTimeline.add(menuTimeline.play());
    closeButtonTimeline && openTimeline.add(closeButtonTimeline.play());
  };
  burgerMenu.onOpen(openHandler);

  const closeHandler: EventCallback = () => {
    const closeTimeline = gsap.timeline();
    closeTimeline.add(menuTimeline.reverse());
    closeTimeline.add(toggleButtonTimeline.reverse());
  };
  burgerMenu.onClose(closeHandler);
}

const initHandler: EventCallback = (instance) => {
  const { contentElement } = instance;
  gsap.set(contentElement, {
    visibility: 'visible',
    xPercent: -100,
    x: -40,
  });
};

function getBurgerButtonGsapAnimation(button: HTMLElement) {
  const buttons = button.querySelectorAll('.burger-button__icon > span');
  const iconContainer = button.querySelector('.burger-button__icon');

  const elements = Array.from(buttons) as HTMLElement[];
  const [top, middle, bottom] = elements;

  if (!(iconContainer && top && middle && bottom)) return gsap.timeline();
  const iconHeight = iconContainer.clientHeight;
  const stokeWidth = top.clientHeight;
  const offset = iconHeight / 2 - stokeWidth / 2;

  const topTimeline = gsap.timeline();
  topTimeline.to(top, {
    y: offset,
    duration: ANIMATION_DURATION * 0.4,
  });
  topTimeline.to(top, {
    rotate: 45,
    duration: ANIMATION_DURATION * 0.6,
  });

  const bottomTimeline = gsap.timeline();
  bottomTimeline.to(bottom, {
    y: -1 * offset,
    duration: ANIMATION_DURATION * 0.4,
  });
  bottomTimeline.to(bottom, {
    rotate: 135,
    duration: ANIMATION_DURATION * 0.6,
  });

  const middleTimeline = gsap.timeline();
  middleTimeline.to(middle, {
    opacity: 0,
    scale: 0,
    duration: ANIMATION_DURATION,
  });

  const mainTimeline = gsap.timeline({ paused: true });
  mainTimeline.add(topTimeline);
  mainTimeline.add(middleTimeline, 0);
  mainTimeline.add(bottomTimeline, 0);

  return mainTimeline;
}

function getMenuTimeline(burgerMenu: BurgerMenu) {
  const menuTimeline = gsap.timeline({ paused: true });

  menuTimeline.fromTo(
    burgerMenu.backdropElement,
    {
      autoAlpha: 0,
    },
    { autoAlpha: 0.5, duration: ANIMATION_DURATION }
  );
  menuTimeline.to(
    burgerMenu.contentElement,
    {
      xPercent: 0,
      x: 0,
      duration: ANIMATION_DURATION,
    },
    '<'
  );
  return menuTimeline;
}
