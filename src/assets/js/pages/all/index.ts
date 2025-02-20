import { initNavbarSearchBox } from './initNavbarSearchBox';
import { initBurgerMenu } from './initBurgerMenu';
import { initLazySizes } from './initLazySizes';
import { initSpecialDecorationImageAnimation } from './initSpecialDecorationImageAnimation';
import { initDecorationImageStickerAnimation } from './initDecorationImageStickerAnimation';
import { initOverlay } from './initOverlay';
import { initProgressBar } from './initProgressBar';
import { initClientsDivider } from './dividers/initClientsDivider';
import { initAchievementsDividerSection } from './dividers/initAchievementsDividerSection';
import { initTextDividers } from './dividers/initTextDividers';
import { initContactsForm } from './initContactsForm';
import { initWaveTextDivider } from './dividers/initWaveTextDivider';
import { initScrollButton } from './initScrollButton';
import '../../libs/GSAPAnimations';
import { scrollTest } from './scrollTest';

initOverlay();
initScrollButton();
initNavbarSearchBox();
initBurgerMenu();
initLazySizes();
initTextDividers();
initClientsDivider();
initSpecialDecorationImageAnimation();
initDecorationImageStickerAnimation();
initProgressBar();
initAchievementsDividerSection();
initContactsForm();
initWaveTextDivider();
scrollTest();
