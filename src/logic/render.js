import onChange from 'on-change';
import i18next from 'i18next';
import validate from './validate.js';
import initView from './view.js';
import ru from '../locales/ru.js';

const app = (i18nextInstance) => {
  const initialState = {
    processState: 'filling',
    form: {
      valid: true,
      errors: null,
      url: '',
    },
    fieldUi: {
      redArea: false,
    },
    i18n: i18nextInstance,
  };

  const links = [];

  const watchedState = onChange(initialState, (path, current) => {
    initView(watchedState, path, current);
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentUrl = formData.get('url');
    validate(currentUrl, links)
      .then((url) => {
        links.push(url);
        watchedState.processState = 'addedLink';
        watchedState.form.url = currentUrl;
        watchedState.form.errors = null;
        watchedState.form.valid = true;
        watchedState.fieldUi.redArea = false;
        form.reset();
        form.focus();
      })
      .catch((errors) => {
        watchedState.processState = 'error';
        watchedState.form.errors = errors.message;
        watchedState.form.valid = false;
        watchedState.fieldUi.redArea = true;
      });
  });
};
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
      app(i18nextInstance);
    })
    .catch((error) => {
      throw error(error);
    });
};
