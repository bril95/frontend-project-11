import axios from 'axios';
import validate from './validate.js';
import findObject from './utilities/findObj.js';
import addId from './utilities/addId.js';
import parsing from './parsing.js';

const getContent = (link) => axios({
  method: 'get',
  url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`,
})
  .then((response) => response.data)
  .then((data) => parsing(data))
  .catch((error) => {
    if (error.message === 'noValid') {
      throw new Error('noValid');
    } throw new Error('networkError');
  });

const compareElem = (prev, curr) => {
  const allNewPosts = [];
  const allTitles = prev.flat().map((obj) => obj.itemTitle);
  const promises = curr.map((elem) => {
    if (!allTitles.includes(elem.itemTitle)) {
      allNewPosts.push(elem);
    }
    return allNewPosts;
  });
  return Promise.all(promises).then(() => allNewPosts);
};

const checkNewPosts = (watchedState) => {
  const promises = watchedState.AllRSS.map((element) => {
    const currentLink = element.link;
    return axios({
      method: 'get',
      url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(currentLink)}`,
    })
      .then((response) => response.data)
      .then((data) => {
        const parsData = parsing(data);
        return addId(parsData);
      })
      .then((currParsObj) => {
        const compare = compareElem(watchedState.AllPosts, currParsObj.items)
          .then((allNewPosts) => allNewPosts);
        return compare;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  });
  return Promise.all(promises).then((allNewPostsArray) => allNewPostsArray.flat());
};

const eventHandlers = (watchedState) => {
  const containerPost = document.querySelector('.container-xxl');
  containerPost.addEventListener('click', (e) => {
    const currentID = e.target.dataset.id;
    watchedState.openedPosts.push(currentID);
    const currentInfo = findObject(watchedState.AllPosts, currentID);
    if (e.target.dataset.id !== undefined) {
      watchedState.currentElement = currentInfo;
      watchedState.processState = 'openLink';
    }
    if (e.target.dataset.bsTarget !== undefined) {
      e.preventDefault();
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

const rendering = (watchedState) => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const currentUrl = formData.get('url');

    validate(currentUrl, watchedState.links)
      .then((url) => getContent(url))
      .then((parsedData) => addId(parsedData))
      .then((parsedData) => {
        watchedState.links.push(parsedData.link);
        watchedState.processState = 'addedLink';
        watchedState.form.url = currentUrl;
        watchedState.form.valid = true;
        watchedState.AllRSS.push(parsedData);
        watchedState.AllPosts.push(parsedData.items);
        watchedState.AllPosts.flat();
      })
      .then(() => form.reset())
      .catch((error) => {
        watchedState.processState = 'error';
        watchedState.form.error = error.message;
        watchedState.form.valid = false;
      });
  });
};

export default (watchedState) => {
  rendering(watchedState);
  eventHandlers(watchedState);
  checkAndUpdate(watchedState);
};
