import onChange from 'on-change';
import i18next from 'i18next';
import validate from './validate.js';
import initView from './view.js';
import ru from '../locales/ru.js';

const app = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'en',
    debug: true,
    resources: {
      ru,
    },
  });

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

export default app;
