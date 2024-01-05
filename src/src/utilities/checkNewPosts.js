import parsing from "./parsing.js";

const compareElem = (prev, curr) => {
  const generalArray = [...prev];
  // console.log(generalArray)
  const allCurrId = generalArray.map((elem) => elem.itemTitle);

  const promises = curr.map((elem) => {
    const promise = new Promise((resolve) => {
      if (!allCurrId.includes(elem.itemTitle)) {
        generalArray.push(elem);
      }
      resolve();
    });
    return promise;
  });

  return Promise.all(promises).then(() => generalArray);
};

export default (arrayOfObjects) => {
  const promises = arrayOfObjects.AllRSS.map((element) => {
    // console.log(element.items);
    const currentLink = element.link;
    return parsing(currentLink)
      .then((currParsObj) => {
        const results = compareElem(element.items, currParsObj.items)
          .then((compare) => {
            // console.log(compare)
            element.items = compare;
          });
        return results;
      })
      .catch((error) => {
        console.error(`Error parsing link: ${currentLink}`, error);
      });
  });

  return Promise.all(promises).then(() => arrayOfObjects.AllRSS);
};
