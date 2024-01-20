import _ from "lodash";

export default (data) => {
  data.items.map((item) => {
    if (!(_.has(item, 'itemId'))) {
      item.itemId = _.uniqueId();
    }
    return item;
  });
  return data;
};
