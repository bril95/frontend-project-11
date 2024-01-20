import axios from 'axios';
import parsing from './parsing.js';

const getContent = (link) => axios({
  method: 'get',
  url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`,
})
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } throw new Error();
  })
  .then((data) => parsing(data))
  .catch((error) => {
    if (error.message === 'noValid') {
      throw new Error('noValid');
    } throw new Error('networkError');
  });

export default getContent;
