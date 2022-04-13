function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

async function displayName() {
  const title = document.querySelector('.modal h2');
  // eslint-disable-next-line no-undef
  const photographer = await getPhotographer(id);
  title.insertAdjacentHTML('beforeend', `</br>${photographer.name}`);
}

displayName();
