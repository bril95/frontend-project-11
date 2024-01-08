import parsing from "./parsing.js";

const compareElem = (prev, curr) => {
  const allNewPosts = [];
  const allTitles = prev.flat().map((obj) => obj.itemTitle);
  // console.log(allTitles)
  const promises = curr.map((elem) => {
    const prom = new Promise((resolve) => {
      if (!allTitles.includes(elem.itemTitle)) {
        allNewPosts.push(elem);
      }
      resolve();
    });
    return prom;
  });
  // console.log(allNewPosts)
  return Promise.all(promises).then(() => allNewPosts);
};

export default (initialState) => {
  const promises = initialState.AllRSS.map((element) => {
    const currentLink = element.link;
    return parsing(currentLink)
      .then((currParsObj) => {
        // console.log(initialState.AllPosts)
        const compare = compareElem(initialState.AllPosts, currParsObj.items)
          .then((allNewPosts) => allNewPosts);
        return compare;
      })
      .catch((error) => {
        console.error(`Error parsing link: ${currentLink}`, error);
        return [];
      });
  });

  return Promise.all(promises).then((allNewPostsArray) => allNewPostsArray.flat());
};
