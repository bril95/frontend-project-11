import { openPost, addLink, addNewRSSPosts } from './makeElements.js';

const initView = (initialState, i18nextInstance, elements) => (path, currentValue) => {
  const ulPosts = elements.posts.querySelector('ul');
  const allPost = initialState.AllPosts.flat();
  switch (initialState.processState) {
    case 'waiting':
      break;
    case 'response':
      elements.button.setAttribute('disabled', true);
      break;
    case 'addedLink':
      addLink(initialState, path, currentValue, i18nextInstance, elements);
      break;
    case 'openPost': {
      openPost(initialState, elements);
      break;
    }
    case 'openLink': {
      const id = initialState.currentElement.itemId;
      const currentLi = document.querySelector(`a[data-id="${id}"]`);
      currentLi.classList.add('link-secondary');
      currentLi.classList.remove('fw-bold');
      break;
    }
    case 'update':
      ulPosts.textContent = '';
      addNewRSSPosts(allPost, initialState, i18nextInstance, elements);
      break;
    case 'error':
      if (elements.inputUrl.classList.contains('text-success')) {
        elements.inputUrl.classList.remove('text-success');
      }
      elements.feedback.classList.add('text-danger');
      elements.inputUrl.classList.add('is-invalid');
      elements.feedback.textContent = i18nextInstance.t(initialState.form.error);
      elements.button.removeAttribute('disabled');
      break;
    default:
      throw new Error(`Unknown process state: ${initialState.processState}`);
  }
};

export default initView;
