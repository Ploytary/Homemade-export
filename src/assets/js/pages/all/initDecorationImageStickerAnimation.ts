import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { positionInDocumentLayout } from '../../helpers/layout';
import '../../libs/GSAPAnimations';

export function initDecorationImageStickerAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const imageElements = gsap.utils.toArray<HTMLElement>('.image-decorative-w-sticker');
  imageElements.forEach((element) => {
    const imageTimeline = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none none',
      },
    });
    const position = positionInDocumentLayout(element);
    imageTimeline.add(
      gsap.effects.fadeIn(element.firstElementChild, {
        direction: position === 'left' ? 'right' : 'left',
        percents: 50,
      })
    );
    imageTimeline.add(gsap.effects.fadeIn(element.lastElementChild));
  });
}
