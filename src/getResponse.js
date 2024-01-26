import axios from 'axios';

export default (link) => axios({
  method: 'get',
  url: `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(new URL(link))}`,
})
  .then((response) => response.data)
  .catch((error) => error);
