import i18next from 'i18next';
import ru from './locales/ru.js';
import state from './state.js';

export default () => {
  const i18nextInstance = i18next.createInstance();

  const initializeI18next = () => {
    const promise = i18nextInstance.init({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    })
      .then(() => i18nextInstance);
    return promise;
  };

  initializeI18next()
    .then(() => {
      state(i18nextInstance);
    })
    .catch((error) => {
      throw error;
    });
};
