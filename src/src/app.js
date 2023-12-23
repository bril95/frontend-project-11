import i18next from 'i18next';
import ru from '../locales/ru.js';
import render from './render.js';

export default () => {
  const i18nextInstance = i18next.createInstance();

  const initializeI18next = () => {
    return new Promise((resolve, reject) => {
      i18nextInstance.init({
        lng: 'ru',
        debug: true,
        resources: {
          ru,
        },
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(i18nextInstance);
        }
      });
    });
  };

  initializeI18next()
    .then(() => {
      render(i18nextInstance);
    })
    .catch((error) => {
      throw error(error);
    });
};
