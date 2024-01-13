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
    AllRSS: [],
    AllPosts: [],
    openedPosts: [],
    currentElement: '',
    links: [],
  };

  const watchedState = onChange(initialState, (path, current) => {
    initView(watchedState, path, current, i18nextInstance);
  });

  render(watchedState);
};
