import gsap from 'gsap';

interface fadeConfig extends gsap.TweenVars {
  direction?: 'up' | 'down' | 'left' | 'right';
  pixels: number;
  percents: number;
  stagger: gsap.NumberValue | gsap.StaggerVars | undefined;
}

gsap.registerEffect({
  name: 'fadeIn',
  effect: (targets: gsap.TweenTarget, config: fadeConfig) => {
    switch (config.direction) {
      case 'up': {
        return gsap.fromTo(
          targets,
          { opacity: 0, y: config.pixels, yPercent: config.percents },
          { opacity: 1, y: 0, yPercent: 0, duration: config.duration, stagger: config.stagger }
        );
      }
      case 'down': {
        return gsap.fromTo(
          targets,
          { opacity: 0, y: config.pixels * -1, yPercent: config.percents * -1 },
          { opacity: 1, y: 0, yPercent: 0, duration: config.duration, stagger: config.stagger }
        );
      }
      case 'left': {
        return gsap.fromTo(
          targets,
          { opacity: 0, x: config.pixels, xPercent: config.percents },
          { opacity: 1, x: 0, xPercent: 0, duration: config.duration, stagger: config.stagger }
        );
      }
      case 'right': {
        return gsap.fromTo(
          targets,
          { opacity: 0, x: config.pixels * -1, xPercent: config.percents * -1 },
          { opacity: 1, x: 0, xPercent: 0, duration: config.duration, stagger: config.stagger }
        );
      }
      default: {
        return gsap.fromTo(targets, { opacity: 0 }, { duration: config.duration, opacity: 1 });
      }
    }
  },
  defaults: { duration: 0.5, pixels: 0, percents: 0 },
  extendTimeline: true,
});
