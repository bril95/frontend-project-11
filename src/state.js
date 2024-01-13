import onChange from 'on-change';
import initView from './view.js';
import controllers from './controllers.js';

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
    initView(watchedState, path, current, i18nextInstance);
  });

  controllers(watchedState);
};
