import {
  createHead, addNewRSSFeed, addNewRSSPosts, viewingPost, viewingLink,
} from './utilities/makeElements.js';

const initView = (watchedState, path, current) => {
  const inputUrl = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');
  const ul = posts.querySelector('ul');
  const allPost = watchedState.AllPosts.flat();

  switch (watchedState.processState) {
    case 'update':
      ul.textContent = '';
      addNewRSSPosts(allPost, watchedState);
      break;
    case 'waiting':
      break;
    case 'addedLink':
      if (inputUrl.classList.contains('is-invalid')) {
        inputUrl.classList.remove('is-invalid');
      }
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = watchedState.i18n.t(watchedState.form.state);
      if (posts.childElementCount === 0) {
        posts.append(createHead('posts', watchedState));
        feeds.append(createHead('feeds', watchedState));
      }
      if (path === 'AllRSS') {
        const lastAddRss = current[current.length - 1];
        addNewRSSFeed(lastAddRss);
        addNewRSSPosts(lastAddRss.items, watchedState);
      }
      break;
    case 'openPost': {
      viewingPost(watchedState, path);
      break;
    }
    case 'closePost': {
      viewingPost(watchedState, path);
      break;
    }
    case 'openLink': {
      viewingLink(watchedState);
      break;
    }
    case 'error':
      if (inputUrl.classList.contains('text-success')) {
        inputUrl.classList.remove('text-success');
      }
      feedback.classList.add('text-danger');
      inputUrl.classList.add('is-invalid');
      feedback.textContent = watchedState.i18n.t(watchedState.form.state);
      break;
    default:
      throw new Error(`Unknown process state: ${watchedState.processState}`);
  }
};

export default initView;
