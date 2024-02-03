import axios from 'axios';

export default (link) => axios({
  method: 'get',
  url: `https://allorigins.hexlet.app/get?disableCache=true&url=${new URL(link)}`,
})
  .catch((error) => error);
