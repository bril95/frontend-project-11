import i18next from 'i18next';
import ru from './locales/ru.js';
import initState from './state.js';

export default () => {
  const i18nextInstance = i18next.createInstance();

  const initializeI18next = () => {
    const promise = i18nextInstance.init({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    });
    return promise;
  };

  initializeI18next()
    .then(() => {
      initState(i18nextInstance);
    })
    .catch((error) => {
      throw error;
    });
};
