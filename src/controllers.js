import validate from './validate.js';
import findObject from './utilities/findObj.js';
import addId from './utilities/addId.js';
import parsing from './parsing.js';
import getResponse from './getResponse.js';

const timeout = 5000;

const getContent = (link) => getResponse(link)
  .then((data) => parsing(data))
  .catch((error) => {
    if (error.message === 'noValid') {
      throw new Error('noValid');
    } throw new Error('networkError');
  });

const compareElem = (prev, curr) => {
  const allNewPosts = [];
  const allTitles = prev.flat().map((obj) => obj.itemTitle);
  curr.forEach((elem) => {
    if (!allTitles.includes(elem.itemTitle)) {
      allNewPosts.push(elem);
    }
  });
  return allNewPosts;
};

const eventHandlers = (watchedState, elements) => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.processState = 'response';
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
      .catch((error) => {
        watchedState.processState = 'error';
        watchedState.form.error = error.message;
        watchedState.form.valid = false;
      });
  });
  elements.containerPost.addEventListener('click', (e) => {
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
      watchedState.processState = 'waiting';
    }
  });
};

const checkNewPosts = (watchedState) => {
  const promises = watchedState.AllRSS.map((element) => {
    const currentLink = element.link;
    return getResponse(currentLink)
      .then((data) => {
        const parsData = parsing(data);
        const currParsObj = addId(parsData);
        return compareElem(watchedState.AllPosts, currParsObj.items);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  });
  return Promise.all(promises)
    .then((allNewPostsArray) => allNewPostsArray.flat())
    .then((newPosts) => {
      if (newPosts.length !== 0) {
        watchedState.AllPosts.unshift(newPosts);
        watchedState.processState = 'update';
        watchedState.processState = 'waiting';
      }
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setTimeout(() => checkNewPosts(watchedState), timeout);
    });
};

export default (watchedState, elements) => {
  eventHandlers(watchedState, elements);
  checkNewPosts(watchedState);
};
