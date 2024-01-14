export default (data) => {
  const xmlString = data.contents;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  const titleElement = xmlDoc.querySelector('channel title');
  if (!titleElement) {
    return ('noValid');
  }
  const title = titleElement.textContent;
  const description = xmlDoc.querySelector('description').textContent;
  const link = data.status.url;
  const parsObj = {
    title, description, items: [], link,
  };
  const items = xmlDoc.querySelectorAll('item');
  items.forEach((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').textContent;
    const itemLink = item.querySelector('link').textContent;
    const itemObj = {
      itemTitle, itemDescription, itemLink,
    };
    parsObj.items.push(itemObj);
  });
  return parsObj;
};
