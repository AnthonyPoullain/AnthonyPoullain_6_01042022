const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));
let displayedMedia;

async function getPhotographers() {
  // fetching the photographers data
  const response = await fetch('./data/photographers.json').catch(
    console.error
  );
  const photographers = await response.json().catch(console.error);
  return {
    photographers: [...photographers.photographers],
    media: [...photographers.media],
  };
}

async function getPhotographer() {
  const photographers = await getPhotographers();
  const photographer = photographers.photographers.find(
    (item) => item.id === id
  );
  const media = photographers.media.filter(
    (element) => element.photographerId === id
  );
  // adding totalLikes to photographer data
  photographer.totalLikes = media.reduce(
    (total, currentItem) => total + currentItem.likes,
    0
  );
  // adding photographerName to the media data
  media.forEach((item) => (item.photographerName = photographer.name));
  return { photographer: photographer, media: [...media] };
}

function displayHeader(photographer) {
  const photographerHeader = document.querySelector('.photograph-header');
  // eslint-disable-next-line no-undef
  const photographerModel = photographerFactory(photographer);
  const { photographerDescription, photographerImgContainer } =
    photographerModel.getUserHeaderDOM();
  photographerHeader.insertAdjacentElement(
    'afterbegin',
    photographerDescription
  );
  photographerHeader.insertAdjacentElement(
    'beforeend',
    photographerImgContainer
  );
}

function displayMedia(photographer) {
  // eslint-disable-next-line no-undef
  const mediaModel = mediaFactory(photographer);
  const mediaElement = mediaModel.getUserMediaDOM();
  document
    .querySelector('#main')
    .insertAdjacentElement('beforeend', mediaElement);
  displayedMedia = [...mediaElement.children];
}

function displayInfoBar(photographer) {
  // eslint-disable-next-line no-undef
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoBarDOM();
  document.querySelector('#main').appendChild(infoBarElement);
}

function sortMedia(data, sortingMethod) {
  switch (sortingMethod) {
    case 'popularity':
      data.sort((a, b) => {
        return a.likes - b.likes;
      });
      data.reverse();
      break;
    case 'date':
      data.sort((a, b) => {
        return a.date.localeCompare(b.date);
      });
      data.reverse();
      break;
    case 'title':
      data.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
      break;
  }
  if (!data) console.error('No media to sort');
  const mediaSection = document.querySelector('.media-section');
  displayedMedia = data.map((item) => item.html);
  mediaSection.innerHTML = '';
  data.forEach((el) => mediaSection.appendChild(el.html));
}

function listenForClick() {
  document.querySelectorAll('.media-card__img').forEach((item, index) => {
    ['click', 'keypress'].forEach((evt) =>
      // eslint-disable-next-line no-undef
      item.addEventListener(evt, () => openLightbox(index))
    );
  });
}

async function init() {
  // Get photograph data
  const photographer = await getPhotographer();
  // Display the data
  displayHeader(photographer.photographer);
  displayMedia(photographer.media);
  displayInfoBar(photographer.photographer);
  // Putting each media HTML element to its corresponding photographer.media object for ease of access
  photographer.media.forEach((el, i) => (el.html = displayedMedia[i]));
  // Sorting media elements
  const sortingMenu = document.querySelector('.sorting__menu select');
  sortMedia(photographer.media, sortingMenu.value);
  listenForClick();
  sortingMenu.addEventListener('change', () => {
    sortMedia(photographer.media, sortingMenu.value);
    listenForClick();
  });
}

init();
