import { addNewRSSPosts, createHeader } from './makeElements.js';

const initView = (watchedState, path, current, i18n, elements) => {
  const ulPosts = elements.posts.querySelector('ul');
  const allPost = watchedState.AllPosts.flat();
  const ulFeeds = elements.feeds.querySelector('ul');
  switch (watchedState.processState) {
    case 'waiting':
      break;
    case 'addedLink':
      if (elements.inputUrl.classList.contains('is-invalid')) {
        elements.inputUrl.classList.remove('is-invalid');
      }
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.feedback.textContent = i18n.t('addedLink');
      if (elements.posts.childElementCount === 0) {
        elements.posts.append(createHeader('posts', i18n));
        elements.feeds.append(createHeader('feeds', i18n));
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
        addNewRSSPosts(lastAddRss.items, watchedState, i18n, elements);
      }
      break;
    case 'openPost': {
      const id = watchedState.currentElement.itemId;
      const currentLi = document.querySelector(`a[data-id="${id}"]`);
      if (path === 'form.alert') {
        if (elements.body.classList.contains('modal-open')) {
          currentLi.classList.remove('fw-bold');
          currentLi.classList.add('fw-normal');
          currentLi.classList.add('link-secondary');
          elements.modalWindow.modalTitle.textContent = watchedState.currentElement.itemTitle;
          elements.modalWindow.modalBody.textContent = watchedState.currentElement.itemDescription;
          elements.modalWindow.modalFooterHref.href = watchedState.currentElement.itemLink;
        }
      }
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
      break;
    default:
      throw new Error(`Unknown process state: ${watchedState.processState}`);
  }
};

export default initView;
