const createHeader = (title, i18n) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t(title);
  cardBody.append(h2);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(cardBody);
  card.append(ul);
  return card;
};

const addNewRSSPosts = (rss, watchedState, i18n, elements) => {
  const ul = elements.posts.querySelector('ul');
  rss.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.href = item.itemLink;
    if (watchedState.openedPosts.includes(item.itemId)) {
      a.classList.add('link-secondary');
    } else {
      a.classList.add('fw-bold');
    }
    a.setAttribute('data-id', item.itemId);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = item.itemTitle;
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', item.itemId);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('buttonView');
    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });
};

const openPost = (watchedState, elements) => {
  const id = watchedState.currentElement.itemId;
  const currentLi = document.querySelector(`a[data-id="${id}"]`);
  if (elements.body.classList.contains('modal-open')) {
    currentLi.classList.remove('fw-bold');
    currentLi.classList.add('fw-normal');
    currentLi.classList.add('link-secondary');
    elements.modalWindow.modalTitle.textContent = watchedState.currentElement.itemTitle;
    elements.modalWindow.modalBody.textContent = watchedState.currentElement.itemDescription;
    elements.modalWindow.modalFooterHref.href = watchedState.currentElement.itemLink;
  }
};

const addLink = (watchedState, path, current, i18n, elements) => {
  const ulFeeds = elements.feeds.querySelector('ul');
  if (elements.inputUrl.classList.contains('is-invalid')) {
    elements.inputUrl.classList.remove('is-invalid');
  }
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
  elements.feedback.textContent = i18n.t('addedLink');
  if (elements.posts.childElementCount === 0) {
    elements.posts.append(createHeader('posts', i18n));
    elements.feeds.append(createHeader('feeds', i18n));
  }
  if (path === 'AllRSS') {
    const lastAddRss = current[current.length - 1];
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = lastAddRss.title;
    const p = document.createElement('p');
    p.classList.add('small', 'm-0', 'text-black-50');
    p.textContent = lastAddRss.description;
    li.append(h3, p);
    ulFeeds.append(li);
    addNewRSSPosts(lastAddRss.items, watchedState, i18n, elements);
  }
  elements.button.removeAttribute('disabled');
  elements.form.reset();
  elements.inputUrl.focus();
};

export {
  addNewRSSPosts, addLink, openPost,
};
