import { fillTextDivider } from './fillTextDivider';
import { setTextDividerAnimation } from './initTextDividerAnimation';

export function initTextDividers() {
  const dividers = Array.from(document.querySelectorAll('.text-divider'));
  for (const divider of dividers) {
    if (divider && divider instanceof HTMLElement) {
      fillTextDivider(divider);
      setTextDividerAnimation(divider);
    }
  }
}
