import parsing from "./parsing.js";

const compareElem = (prev, curr) => {
  const generalArray = [...prev];
  const allCurrId = generalArray.map((elem) => elem.itemId);
  curr.forEach((elem) => {
    if (!allCurrId.includes(elem.itemId)) {
      generalArray.push(elem);
    }
  });
  return generalArray;
};

export default (arrayOfObjects) => {
  const promises = arrayOfObjects.AllRSS.map((element) => {
    const currentLink = element.link;
    return parsing(currentLink)
      .then((currParsObj) => {
        element.items = compareElem(element.items, currParsObj.items);
      })
      .catch((error) => {
        console.error(`Error parsing link: ${currentLink}`, error);
      });
  });

  return Promise.all(promises).then(() => arrayOfObjects);
};
