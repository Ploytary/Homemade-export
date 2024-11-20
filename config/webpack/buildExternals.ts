export function buildExternals() {
  const yandexApiLoader = {
    '@yandex/ymaps3-types': [
      `promise new Promise((resolve) => {
          if (typeof ymaps3 !== 'undefined') {
            return ymaps3.ready.then(() => resolve(ymaps3));
          }

          const script = document.createElement('script');
          const lang = ['ru', 'ru-RU'].includes(navigator.language) ? 'ru_RU' : 'en-US';
          script.src = "https://api-maps.yandex.ru/v3/?apikey=${process.env.YANDEX_MAPS_API_KEY}&lang=" + lang;
          script.onload = () => {
            ymaps3.ready.then(() => resolve(ymaps3));
          };
          document.head.appendChild(script);
        })`,
    ],
  };

  return Object.assign({}, yandexApiLoader);
}
