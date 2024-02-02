export default (data) => {
  const xmlDoc = new DOMParser().parseFromString(data.contents, 'text/xml');
  const parseError = xmlDoc.querySelector('rss');
  if (!parseError) {
    throw new Error('noValid');
  }
  const title = xmlDoc.querySelector('channel title').textContent;
  const description = xmlDoc.querySelector('description').textContent;
  const parsedResult = {
    title, description, items: [],
  };
  const items = xmlDoc.querySelectorAll('item');
  items.forEach((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').textContent;
    const itemLink = item.querySelector('link').textContent;
    const itemDetails = {
      itemTitle, itemDescription, itemLink,
    };
    parsedResult.items.push(itemDetails);
  });
  return parsedResult;
};
