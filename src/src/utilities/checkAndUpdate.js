import checkNewPosts from './checkNewPosts.js';

const checkAndUpdate = (watchedState) => {
  checkNewPosts(watchedState)
    .then(() => {
      console.log('checked');
      setTimeout(checkAndUpdate, 5000);
    })
    .catch((error) => {
      console.error(error);
      setTimeout(checkAndUpdate, 5000);
    });
};
export default checkAndUpdate;
