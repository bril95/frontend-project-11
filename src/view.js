import { openPost, addLink, addNewRSSPosts } from './makeElements.js';

const initView = (watchedState, path, current, i18n, elements) => {
  const ulPosts = elements.posts.querySelector('ul');
  const allPost = watchedState.AllPosts.flat();
  switch (watchedState.processState) {
    case 'waiting':
      break;
    case 'response':
      elements.button.setAttribute('disabled', true);
      break;
    case 'addedLink':
      addLink(watchedState, path, current, i18n, elements);
      break;
    case 'openPost': {
      openPost(watchedState, elements);
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
      addNewRSSPosts(allPost, watchedState, i18n, elements);
      break;
    case 'error':
      if (elements.inputUrl.classList.contains('text-success')) {
        elements.inputUrl.classList.remove('text-success');
      }
      elements.feedback.classList.add('text-danger');
      elements.inputUrl.classList.add('is-invalid');
      elements.feedback.textContent = i18n.t(watchedState.form.error);
      elements.button.removeAttribute('disabled');
      break;
    default:
      throw new Error(`Unknown process state: ${watchedState.processState}`);
  }
};

export default initView;
