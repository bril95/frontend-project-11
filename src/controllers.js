import validate from './validate.js';
import parsing from './parsing.js';
import findObject from './utilities/findObj.js';
import checkNewPosts from './checkNewPosts.js';

export default (watchedState) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentUrl = formData.get('url');
    validate(currentUrl, watchedState.links)
      .then((url) => parsing(url))
      .then((currentParsenedUrl) => {
        watchedState.links.push(currentParsenedUrl.link);
        watchedState.processState = 'addedLink';
        watchedState.form.url = currentUrl;
        watchedState.form.valid = true;
        watchedState.AllRSS.push(currentParsenedUrl);
        watchedState.AllPosts.push(currentParsenedUrl.items);
        watchedState.AllPosts.flat();
      })
      .then(() => {
        const checkAndUpdate = () => {
          const linksA = document.querySelectorAll('li > a');
          linksA.forEach((link) => {
            link.addEventListener('click', () => {
              const currentID = link.dataset.id;
              watchedState.openedPosts.push(currentID);
              const currentInfo = findObject(watchedState.AllPosts, currentID);
              watchedState.currentElement = currentInfo;
              watchedState.processState = 'openLink';
            });
            const buttons = document.querySelectorAll('.btn-sm');
            buttons.forEach((button) => {
              button.addEventListener('click', (event) => {
                event.preventDefault();
                const currentID = button.dataset.id;
                watchedState.openedPosts.push(currentID);
                const currentInfo = findObject(watchedState.AllPosts, currentID);
                watchedState.processState = 'openPost';
                watchedState.currentElement = currentInfo;
                watchedState.form.alert = true;
                const modal = document.getElementById('modal');
                if (modal) {
                  modal.focus();
                }
              });
            });
            const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
            closeButtons.forEach((button) => {
              button.addEventListener('click', (event) => {
                event.preventDefault();
                watchedState.processState = 'closePost';
                watchedState.form.alert = false;
              });
            });
            document.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                watchedState.processState = 'closePost';
                watchedState.form.alert = false;
              }
            });
          });
          checkNewPosts(watchedState)
            .then((newPosts) => {
              if (newPosts.length !== 0) {
                watchedState.AllPosts.unshift(newPosts);
                watchedState.processState = 'update';
                watchedState.processState = 'waiting';
              }
              setTimeout(checkAndUpdate, 5000);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(checkAndUpdate, 5000);
            });
        };
        checkAndUpdate();
      })
      .then(() => form.reset())
      .catch((errors) => {
        watchedState.processState = 'error';
        watchedState.form.error = errors.message;
        watchedState.form.valid = false;
      });
  });
};
