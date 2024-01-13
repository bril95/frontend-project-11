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

const addNewRSSPosts = (rss, watchedState, i18n) => {
  const posts = document.querySelector('.posts');
  const ul = posts.querySelector('ul');
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

const viewingPost = (watchedState, path) => {
  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalFooterHref = document.querySelector('.modal-footer > a');
  const id = watchedState.currentElement.itemId;
  const currentLi = document.querySelector(`a[data-id="${id}"]`);
  if (path === 'form.alert') {
    if (!body.classList.contains('modal-open')) {
      const div = document.createElement('div');
      div.classList.add('modal-backdrop', 'fade', 'show');
      body.append(div);
      body.classList.add('modal-open');
      body.style.overflow = 'hidden';
      body.style.paddingRight = '15px';
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
      modal.removeAttribute('aria-hidden');
      modal.setAttribute('role', 'dialog');
      currentLi.classList.remove('fw-bold');
      currentLi.classList.add('fw-normal');
      currentLi.classList.add('link-secondary');
      modalTitle.textContent = watchedState.currentElement.itemTitle;
      modalBody.textContent = watchedState.currentElement.itemDescription;
      modalFooterHref.href = watchedState.currentElement.itemLink;
    } else {
      const div = body.querySelector('.modal-backdrop');
      div.remove();
      body.classList.remove('modal-open');
      body.style = '';
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('aria-modal');
      modal.removeAttribute('role');
    }
  }
};

export {
  createHeader, addNewRSSPosts, viewingPost,
};
