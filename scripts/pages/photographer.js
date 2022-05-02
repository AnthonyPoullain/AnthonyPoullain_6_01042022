/* global openLightbox */
/* global photographerFactory */
/* global mediaFactory */

const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));
let displayedMedia;

async function getPhotographers() {
  // Fetch photographers data
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
  // Add totalLikes to photographer data
  photographer.totalLikes = media.reduce(
    (total, currentItem) => total + currentItem.likes,
    0
  );
  // Add photographerName to media data
  media.forEach((item) => (item.photographerName = photographer.name));
  return { photographer: photographer, media: [...media] };
}

function displayHeader(photographer) {
  const photographerHeader = document.querySelector('.photograph-header');
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
  const mediaModel = mediaFactory(photographer);
  const mediaElement = mediaModel.getUserMediaDOM();
  document
    .querySelector('#main')
    .insertAdjacentElement('beforeend', mediaElement);
  displayedMedia = [...mediaElement.children];
}

function displayInfoBar(photographer) {
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

function listenForClickOnMedia() {
  document.querySelectorAll('.media-card__img').forEach((item, index) => {
    ['click', 'keydown'].forEach((evt) => {
      item.addEventListener(evt, (evt) => {
        if (evt.type === 'keydown' && evt.code !== 'Enter') return;
        openLightbox(index);
      });
    });
  });
}

async function init() {
  // Get photograph data
  const photographer = await getPhotographer();

  // Display data
  displayHeader(photographer.photographer);
  displayMedia(photographer.media);
  displayInfoBar(photographer.photographer);

  // Put HTML meia element to its corresponding photographer.media object for ease of access
  photographer.media.forEach((el, i) => (el.html = displayedMedia[i]));

  // Sort media elements
  const sortingMenu = document.querySelector('.sorting__menu select');
  sortMedia(photographer.media, sortingMenu.value);
  // Listen for clicks once media loaded and sorted
  listenForClickOnMedia();
  sortingMenu.addEventListener('change', () => {
    sortMedia(photographer.media, sortingMenu.value);
    // Listen again if sorting value changes to update displayedMedia array order
    listenForClickOnMedia();
  });

  // Play video on hover & focus
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    ['mouseover', 'focus'].forEach((evt) => {
      video.addEventListener(evt, () => {
        video.play();
      });
    });
    ['mouseleave', 'focusout'].forEach((evt) => {
      video.addEventListener(evt, () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  });
}

init();
