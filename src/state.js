import onChange from 'on-change';
import initView from './view.js';
import render from './render.js';

export default (i18nextInstance) => {
  const initialState = {
    processState: 'waiting',
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
    AllPosts: [],
    openedPosts: [],
    currentElement: '',
    i18n: i18nextInstance,
  };

  const links = [];

  const watchedState = onChange(initialState, (path, current) => {
    initView(watchedState, path, current);
  });

  render(watchedState, links);
};
