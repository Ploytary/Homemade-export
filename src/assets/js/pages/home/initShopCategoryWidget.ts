import gsap from 'gsap';
import { BindElementGroups } from '../../libs/BindElementGroups';

export function initShopCategoryWidget() {
  const firstElementGroup = Array.from(document.querySelectorAll('.shop-category-widget__link-item')) as HTMLElement[];
  const secondElementGroup = Array.from(
    document.querySelectorAll('.shop-category-widget__category-decorative-image')
  ) as HTMLElement[];

  const duration = 0.3;
  const accentColor = window.getComputedStyle(document.documentElement).getPropertyValue('--brand-color-accent');
  const mainItemsTimelines = firstElementGroup.map((element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, { color: accentColor, duration: duration, ease: 'none' });
    return tl;
  });
  const imageTimelines = secondElementGroup.map((element) => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      element,
      { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', data: 'main' },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: duration, data: 'main' }
    );
    return tl;
  });

  const binding = new BindElementGroups(firstElementGroup, secondElementGroup);
  binding.setChangeIndexTrigger('mouseover');
  binding.setChangeIndexHandler((element, index, isActive) => {
    if (isActive) {
      mainItemsTimelines[index].play();
    } else {
      mainItemsTimelines[index].reverse();
    }
  }, firstElementGroup);
  binding.setChangeIndexHandler((element, index, isActive) => {
    if (isActive) {
      gsap.getTweensOf(element).forEach((tween) => tween.data !== 'main' && tween.kill());
      gsap.set(element, { zIndex: 100, opacity: 1 });
      imageTimelines[index].restart();
    } else {
      gsap.getTweensOf(element).forEach((tween) => tween.data !== 'main' && tween.kill());
      gsap.set(element, { zIndex: 'auto' });
      gsap.set(element, { opacity: 0, delay: duration });
    }
  }, secondElementGroup);
}
