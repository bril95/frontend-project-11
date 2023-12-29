import axios from 'axios';
import _ from 'lodash';

const parsing = (link) => {
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `//allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } throw new Error();
      })
      .then((data) => {
        const xmlString = data.contents;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
        const titleElement = xmlDoc.querySelector('channel title');
        if (!titleElement) {
          const noValidError = new Error('noValid');
          reject(noValidError);
          return;
        }
        const title = titleElement.textContent;
        const description = xmlDoc.querySelector('description').textContent;
        const objFromLink = { title, description, items: [] };
        const items = xmlDoc.querySelectorAll('item');
        items.forEach((item) => {
          const itemId = _.uniqueId();
          const itemTitle = item.querySelector('title').textContent;
          const itemDescription = item.querySelector('description').textContent;
          const itemLink = item.querySelector('link').textContent;
          const itemObj = {
            itemId, itemTitle, itemDescription, itemLink,
          };
          objFromLink.items.push(itemObj);
        });
        resolve(objFromLink);
      })
      .catch(() => {
        const networkError = new Error('networkError');
        reject(networkError);
      });
  });
  return promise;
};
export default parsing;
