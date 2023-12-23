const initView = (watchedState, path, current) => {
  const inputUrl = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  const postsClass = document.querySelector('.posts');
  const feedsClass = document.querySelector('.feeds');

  const createHead = (title) => {
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const h2 = document.createElement('h2');
    h2.classList.add('card-title', 'h4');
    h2.textContent = watchedState.i18n.t(title);
    cardBody.append(h2);
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    card.append(cardBody);
    card.append(ul);
    return card;
  };

  const addNewRSSFeed = (rss) => {
    const ul = feedsClass.querySelector('ul');
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = rss.title;
    const p = document.createElement('p');
    p.classList.add('small', 'm-0', 'text-black-50');
    p.textContent = rss.description;
    li.append(h3, p);
    ul.append(li);
  };

  const addNewRSSPosts = (rss) => {
    const ul = postsClass.querySelector('ul');
    rss.items.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const a = document.createElement('a');
      a.href = item.itemLink;
      a.classList.add('fw-bold');
      a.setAttribute('data-id', '2');
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = item.itemTitle;
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('data-id', '25');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = watchedState.i18n.t('buttonView');
      li.appendChild(a);
      li.appendChild(button);
      ul.appendChild(li);
    });
  };

  switch (watchedState.processState) {
    case 'filling':
      break;
    case 'addedLink':
      if (inputUrl.classList.contains('is-invalid')) {
        inputUrl.classList.remove('is-invalid');
      }
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = watchedState.i18n.t('correctLink');
      if (postsClass.childElementCount === 0) {
        postsClass.append(createHead('posts'));
        feedsClass.append(createHead('feeds'));
      }
      if (path === 'AllRSS') {
        const lastAddRss = current[current.length - 1];
        addNewRSSFeed(lastAddRss);
        addNewRSSPosts(lastAddRss);
      }
      break;
    case 'error':
      if (inputUrl.classList.contains('text-success')) {
        inputUrl.classList.remove('text-success');
      }
      feedback.classList.add('text-danger');
      inputUrl.classList.add('is-invalid');
      feedback.textContent = watchedState.i18n.t(watchedState.form.errors);
      break;
    default:
      throw new Error(`Unknown process state: ${watchedState.processState}`);
  }
};

export default initView;
