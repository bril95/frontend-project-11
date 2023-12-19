const initView = (watchedState) => {
  const inputUrl = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  switch (watchedState.processState) {
    case 'filling':
      break;
    case 'addedLink':
      if (inputUrl.classList.contains('is-invalid')) {
        inputUrl.classList.remove('is-invalid');
        feedback.textContent = '';
      }
      break;
    case 'error':
      inputUrl.classList.add('is-invalid');
      feedback.textContent = watchedState.form.errors;
      break;
    default:
      throw new Error(`Unknown process state: ${watchedState.processState}`);
  }
};

export default initView;
