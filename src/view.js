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
      allPost.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
        const a = document.createElement('a');
        a.href = item.itemLink;
        a.classList.add('fw-bold');
        a.setAttribute('data-id', item.itemId);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = item.itemTitle;
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.setAttribute('data-id', item.itemId);
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
        button.textContent = watchedState.i18n.t('buttonView');
        li.appendChild(a);
        li.appendChild(button);
        ul.appendChild(li);
      });
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
        addNewRSSPosts(lastAddRss, watchedState);
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
