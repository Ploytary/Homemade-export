// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type Swiper from 'swiper';

declare module 'swiper' {
  interface Swiper {
    slidesEl: HTMLElement;
  }
}
