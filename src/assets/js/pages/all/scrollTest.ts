import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function scrollTest() {
  const animation = gsap.timeline({ paused: true });
  const headerNav = document.querySelector('.page-navigation');
  animation.set(document.body, {
    paddingTop: headerNav?.clientHeight || 0,
  });
  animation.set(headerNav, {
    position: 'fixed',
    insetInline: 0,
    top: 0,
    yPercent: -100,
    autoAlpha: 0,
  });
  animation.to(headerNav, {
    autoAlpha: 1,
    yPercent: 0,
    duration: 0.3,
    onComplete: function () {
      gsap.set(this.targets(), { clearProps: 'transform' });
    },
  });

  let prevDirection = 0;
  ScrollTrigger.create({
    trigger: 'main',
    start: 'top -500px',
    onUpdate: (self) => {
      if (self.direction === 1 && prevDirection !== 1) {
        animation.reverse();
        prevDirection = 1;
      }
      if (self.direction === -1 && prevDirection !== -1) {
        animation.play();
        prevDirection = -1;
      }
    },
    onLeaveBack: () => {
      animation.reverse();
    },
  });
}
