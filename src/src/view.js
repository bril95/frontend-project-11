import { createHead, addNewRSSFeed, addNewRSSPosts } from './utilities/makeElements.js';

const initView = (watchedState, path, current) => {
  const inputUrl = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  const postsClass = document.querySelector('.posts');
  const feedsClass = document.querySelector('.feeds');

  switch (watchedState.processState) {
    case 'filling':
      break;
    case 'addedLink':
      if (inputUrl.classList.contains('is-invalid')) {
        inputUrl.classList.remove('is-invalid');
      }
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = watchedState.i18n.t('correctLink');
      if (postsClass.childElementCount === 0) {
        postsClass.append(createHead('posts', watchedState));
        feedsClass.append(createHead('feeds', watchedState));
      }
      if (path === 'AllRSS') {
        const lastAddRss = current[current.length - 1];
        addNewRSSFeed(lastAddRss);
        addNewRSSPosts(lastAddRss, watchedState);
      }
      if (path === 'form.alert') {
        const body = document.querySelector('body');
        const modal = document.querySelector('.modal');
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
        const modalFooterHref = document.querySelector('.modal-footer > a');
        if (!body.classList.contains('modal-open')) {
          body.classList.add('modal-open');
          body.style.overflow = 'hidden';
          body.style.paddingRight = '15px';
          modal.classList.add('show');
          modal.style.display = 'block';
          modal.setAttribute('aria-modal', 'true');
          modalTitle.textContent = 'заголовок статьи';
          modalBody.textContent = 'текст статьи';
          modalFooterHref.href = 'https://lorem-rss.hexlet.app/feed?unit=day';
        } else {
          body.classList.remove('modal-open');
          body.style = '';
          modal.classList.remove('show');
          modal.style.display = 'none';
          modal.removeAttribute('aria-modal');
        }
      }
      break;
    case 'error':
      if (inputUrl.classList.contains('text-success')) {
        inputUrl.classList.remove('text-success');
      }
      feedback.classList.add('text-danger');
      inputUrl.classList.add('is-invalid');
      feedback.textContent = watchedState.i18n.t(watchedState.form.errors);
      break;
    default:
      throw new Error(`Unknown process state: ${watchedState.processState}`);
  }
};

export default initView;
