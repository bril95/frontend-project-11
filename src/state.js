import onChange from 'on-change';
import initView from './view.js';
import controllers from './controllers.js';

const elements = {
  inputUrl: document.querySelector('#url-input'),
  feedback: document.querySelector('.feedback'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
  body: document.querySelector('body'),
  containerPost: document.querySelector('.container-xxl'),
  form: document.querySelector('form'),
  button: document.querySelector('.btn-lg'),
  modalWindow: {
    modal: document.querySelector('.modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFooterHref: document.querySelector('.modal-footer > a'),
  },
};

export default (i18nextInstance) => {
  const initialState = {
    processState: 'waiting',
    form: {
      valid: true,
      error: null,
    },
    AllRSS: [],
    AllPosts: [],
    openedPosts: [],
    currentElement: '',
    links: [],
  };

  const watchedState = onChange(initialState, (path, current) => {
    initView(watchedState, path, current, i18nextInstance, elements);
  });

  controllers(watchedState, elements);
};
