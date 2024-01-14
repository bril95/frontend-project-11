import axios from 'axios';
import _ from 'lodash';
import parsing from './parsing.js';

const getContent = (link) => {
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } throw new Error();
      })
      .then((data) => parsing(data))
      .then((result) => {
        if (result === 'noValid') {
          reject(new Error(result));
        } else {
          result.items.forEach((item) => {
            if (!(_.has(item, 'itemId'))) {
              item.itemId = _.uniqueId();
            }
          });
          resolve(result);
        }
      })
      .catch(() => {
        const networkError = new Error('networkError');
        reject(networkError);
      });
  });
  return promise;
};
export default getContent;
