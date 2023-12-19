const initView = (watchedState) => {
  const inputUrl = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  // const posts = document.querySelector('.posts');
  // const feeds = document.querySelector('.feeds');

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