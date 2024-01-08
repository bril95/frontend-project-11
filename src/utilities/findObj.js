const findObject = (arr, value) => {
  const matchingItem = arr
    .map((items) => items.find((item) => item.itemId === value))
    .find((item) => item !== undefined);

  return matchingItem || null;
};

export default findObject;
