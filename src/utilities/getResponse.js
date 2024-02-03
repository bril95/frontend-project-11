import axios from 'axios';

export default (link) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app');
  proxyUrl.searchParams.set('url', link);
  proxyUrl.searchParams.set('disableCache', 'true');
  const url = proxyUrl.toString();

  return axios.get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
