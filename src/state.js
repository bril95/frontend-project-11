import onChange from 'on-change';
import initView from './view.js';
import render from './render.js';
import checkNewPosts from './utilities/checkNewPosts.js';

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
    currentElement: '',
    i18n: i18nextInstance,
  };

  const links = [];

  const watchedState = onChange(initialState, (path, current) => {
    initView(watchedState, path, current);

    const checkAndUpdate = () => {
      checkNewPosts(initialState)
        .then((newPosts) => {
          watchedState.AllPosts.unshift(newPosts);
          // console.log(initialState.AllPosts.flat());
          console.log(initialState.processState);
          watchedState.processState = 'update';
          watchedState.processState = 'waiting';
          setTimeout(checkAndUpdate, 5000);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(checkAndUpdate, 5000);
        });
    };

    if (path === 'AllRSS') {
      checkAndUpdate();
    }
  });

  render(watchedState, links);
};
