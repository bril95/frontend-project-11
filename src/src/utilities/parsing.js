import axios from 'axios';
import _ from 'lodash';

const parsing = (link) => {
  const request = axios({
    method: 'get',
    url: `//allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } throw new Error('Network response was not ok.');
    })
    .then((data) => {
      const xmlString = data.contents;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const title = xmlDoc.querySelector('channel title').textContent;
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
      return objFromLink;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  return request;
};
export default parsing;
