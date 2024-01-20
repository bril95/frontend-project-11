import axios from 'axios';
import _ from 'lodash';
import parsing from './parsing.js';

const getContent = (link) => axios({
  method: 'get',
  url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`,
})
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } throw new Error('networkError');
  })
  .then((data) => parsing(data))
  .then((result) => {
    result.items.forEach((item) => {
      if (!(_.has(item, 'itemId'))) {
        item.itemId = _.uniqueId();
      }
    });
    return result;
  })
  .catch((error) => Promise.reject(error));

export default getContent;
