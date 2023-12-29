import onChange from 'on-change';
import validate from './utilities/validate.js';
import initView from './view.js';
import parsing from './utilities/parsing.js';
import findObject from './utilities/findObj.js';

export default (i18nextInstance) => {
  const initialState = {
    processState: 'filling',
    form: {
      valid: true,
      state: null,
      url: '',
      alert: false,
    },
    fieldUi: {
      redArea: false,
    },
    AllRSS: [],
    currentElement: '',
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
        return url;
      })
      .then((url) => parsing(url))
      .then((currentParsenedUrl) => {
        watchedState.processState = 'addedLink';
        watchedState.form.url = currentUrl;
        watchedState.form.state = 'correctLink';
        watchedState.form.valid = true;
        watchedState.fieldUi.redArea = false;
        return currentParsenedUrl;
      })
      .then((currentParsenedUrl) => {
        watchedState.AllRSS.push(currentParsenedUrl);
        const linksA = document.querySelectorAll('li > a');
        linksA.forEach((link) => {
          link.addEventListener('click', () => {
            const currentID = link.dataset.id;
            const currentInfo = findObject(initialState.AllRSS, currentID);
            watchedState.currentElement = currentInfo;
            watchedState.processState = 'openLink';
          });
        });
        const buttons = document.querySelectorAll('.btn-sm');
        buttons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            const currentID = button.dataset.id;
            const currentInfo = findObject(initialState.AllRSS, currentID);
            watchedState.processState = 'openPost';
            watchedState.currentElement = currentInfo;
            watchedState.form.alert = true;
            const modal = document.getElementById('modal');
            if (modal) {
              modal.focus();
            }
          });
        });
        const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
        closeButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            watchedState.processState = 'closePost';
            watchedState.form.alert = false;
          });
        });
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            watchedState.processState = 'closePost';
            watchedState.form.alert = false;
          }
        });
      })
      .then(() => form.reset())
      .catch((errors) => {
        watchedState.processState = 'error';
        watchedState.form.state = errors.message;
        watchedState.form.valid = false;
        watchedState.fieldUi.redArea = true;
      });
  });
};
