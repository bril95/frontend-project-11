import validate from './validate.js';
import getContent from './getContent.js';
import findObject from './utilities/findObj.js';
import checkNewPosts from './checkNewPosts.js';

const eventHandlers = (watchedState) => {
  document.addEventListener('click', (e) => {
    if (e.target.dataset.id !== undefined) {
      const currentID = e.target.dataset.id;
      watchedState.openedPosts.push(currentID);
      const currentInfo = findObject(watchedState.AllPosts, currentID);
      watchedState.currentElement = currentInfo;
      watchedState.processState = 'openLink';
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.dataset.bsTarget !== undefined) {
      e.preventDefault();
      const currentID = e.target.dataset.id;
      watchedState.openedPosts.push(currentID);
      const currentInfo = findObject(watchedState.AllPosts, currentID);
      watchedState.processState = 'openPost';
      watchedState.currentElement = currentInfo;
      watchedState.form.alert = true;
      const modal = document.getElementById('modal');
      if (modal) {
        modal.focus();
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.dataset.bsDismiss !== undefined) {
      e.preventDefault();
      watchedState.processState = 'closePost';
      watchedState.form.alert = false;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      watchedState.processState = 'closePost';
      watchedState.form.alert = false;
    }
  });
};

const checkAndUpdate = (watchedState) => {
  checkNewPosts(watchedState)
    .then((newPosts) => {
      if (newPosts.length !== 0) {
        watchedState.AllPosts.unshift(newPosts);
        watchedState.processState = 'update';
        watchedState.processState = 'waiting';
      }
    })
    .catch((error) => {
      watchedState.processState = 'error';
      watchedState.form.error = error.message;
      watchedState.form.valid = false;
    })
    .finally(() => {
      setTimeout(() => checkAndUpdate(watchedState), 5000);
    });
};

export default (watchedState) => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const currentUrl = formData.get('url');

    validate(currentUrl, watchedState.links)
      .then((url) => getContent(url))
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
        eventHandlers(watchedState);
      })
      .then(() => form.reset())
      .catch((error) => {
        watchedState.processState = 'error';
        watchedState.form.error = error.message;
        watchedState.form.valid = false;
      });
  });
  checkAndUpdate(watchedState);
};
