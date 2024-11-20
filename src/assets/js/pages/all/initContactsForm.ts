import JustValidate, { GlobalConfigInterface, Rules } from 'just-validate';
import phpHandler from '../../../php/subscriptions-form-handler.php';
import { callGTM } from '../../helpers/googleTagManager';
import { findHtmlElement } from '../../helpers/dom';

const dictLocale = [
  {
    key: 'Name is required',
    dict: {
      en: 'Name is required',
      ru: 'Имя обязательно',
    },
  },
  {
    key: 'Email is required',
    dict: {
      en: 'Email is required',
      ru: 'Почта обязательна',
    },
  },
  {
    key: 'Value is incorrect',
    dict: {
      en: 'Value is incorrect',
      ru: 'Почта введена некорректно',
    },
  },
];

const modalLocale = {
  title: {
    successVariant: {
      ru: 'Успешно!',
      en: 'Success!',
    },
    failureVariant: {
      ru: 'Ошибка!',
      en: 'Failure!',
    },
  },
};

const config: Partial<GlobalConfigInterface> = {
  errorLabelStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--error-color') },
};

export function initContactsForm() {
  try {
    const validator = new JustValidate('.contacts-form', config, dictLocale);
    const locale = document.documentElement.lang as 'ru' | 'en';
    validator.setCurrentLocale(locale);
    validator.onSuccess(async (event) => {
      if (!(event instanceof SubmitEvent)) return;
      const form = event.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const response = await fetch(phpHandler, { method: 'POST', body: formData });
      const content = await response.json();

      const modalElement = findHtmlElement('.default-modal');
      const modalSubmitButton = findHtmlElement('.default-modal__sumbit-button', modalElement);
      const modalTitle = findHtmlElement('.default-modal__title', modalElement);
      const modalMessage = findHtmlElement('.default-modal__message', modalElement);
      const modalBackground = findHtmlElement('.default-modal__background', modalElement);
      modalSubmitButton.addEventListener('click', () => (modalElement.style.display = 'none'));
      modalBackground.addEventListener('click', () => (modalElement.style.display = 'none'));
      modalElement.style.display = 'flex';

      if (response.ok) {
        form.reset();
        callGTM('formSubscribeSuccess', {});
        modalTitle.textContent = modalLocale.title.successVariant[locale];
        modalMessage.textContent = content.message;
      } else {
        callGTM('formSubscribeFailure', {
          message: content.message,
        });
        modalTitle.textContent = modalLocale.title.failureVariant[locale];
        modalMessage.textContent = content.message;
      }
    });

    validator
      .addField('.contacts-form__name .input-field__input', [
        {
          rule: Rules.Required,
          errorMessage: 'Name is required',
        },
        {
          rule: Rules.MinLength,
          value: 2,
          errorMessage: 'Min length 2',
        },
        {
          rule: Rules.MaxLength,
          value: 50,
          errorMessage: 'Max length 50',
        },
      ])
      .addField('.contacts-form__email .input-field__input', [
        {
          rule: Rules.Required,
          errorMessage: 'Email is required',
        },
        {
          rule: Rules.CustomRegexp,
          value: /^([\w]+\.?)+(?<!\.)@(?!\.)[a-zа-я0-9ё\\.-]+\.?[a-zа-яё]{2,}$/,
          errorMessage: 'Email is incorrect',
        },
        {
          rule: Rules.MinLength,
          value: 3,
          errorMessage: 'Min length 3',
        },
        {
          rule: Rules.MaxLength,
          value: 50,
          errorMessage: 'Max length 50',
        },
      ]);
  } catch (error) {
    // console.error(error);
  }
}
