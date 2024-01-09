import {
  addNewRSSPosts, viewingPost, createHeader,
} from './utilities/makeElements.js';

const initView = (watchedState, path, current) => {
  const inputUrl = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  const posts = document.querySelector('.posts');
  const feeds = document.querySelector('.feeds');
  const ulPosts = posts.querySelector('ul');
  const allPost = watchedState.AllPosts.flat();
  const ulFeeds = feeds.querySelector('ul');

  switch (watchedState.processState) {
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
        posts.append(createHeader('posts', watchedState));
        feeds.append(createHeader('feeds', watchedState));
      }
      if (path === 'AllRSS') {
        const lastAddRss = current[current.length - 1];
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0', 'border-end-0');
        const h3 = document.createElement('h3');
        h3.classList.add('h6', 'm-0');
        h3.textContent = lastAddRss.title;
        const p = document.createElement('p');
        p.classList.add('small', 'm-0', 'text-black-50');
        p.textContent = lastAddRss.description;
        li.append(h3, p);
        ulFeeds.append(li);
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
      const id = watchedState.currentElement.itemId;
      const currentLi = document.querySelector(`a[data-id="${id}"]`);
      currentLi.classList.add('link-secondary');
      currentLi.classList.remove('fw-bold');
      break;
    }
    case 'update':
      ulPosts.textContent = '';
      addNewRSSPosts(allPost, watchedState);
      break;
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
