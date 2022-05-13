/* global openLightbox */
/* global photographerFactory */
/* global mediaFactory */

const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));
let displayedMedia;

//  Data functions
async function getPhotographers() {
  // Fetch photographers data
  const response = await fetch('data/photographers.json').catch(console.error);
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
  // Add userHasLiked to media data for like functionality
  media.forEach((item) => (item.userHasLiked = false));
  return { photographer: photographer, media: [...media] };
}

//  Display functions
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
  // Put HTML media element to its corresponding photographer.media object for ease of access
  photographer.forEach((el, i) => (el.html = displayedMedia[i]));
}

function displayInfoBar(photographer) {
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoBarDOM();
  document.querySelector('#main').appendChild(infoBarElement);
}

//  Sort function
function sortMedia(data, sortingMethod) {
  switch (sortingMethod) {
    case '0': // by popularity
      data.sort((a, b) => {
        return a.likes - b.likes;
      });
      data.reverse();
      break;
    case '1': // by date
      data.sort((a, b) => {
        return a.date.localeCompare(b.date);
      });
      data.reverse();
      break;
    case '2': // by title
      data.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
      break;
  }
  // display new order
  const mediaSection = document.querySelector('.media-section');
  mediaSection.innerHTML = '';
  data.forEach((el) => mediaSection.appendChild(el.html));
  // update displayedMedia
  displayedMedia = data.map((item) => item.html);
}

//  Listen functions
function listenForClickOnMedia() {
  document.querySelectorAll('.media-card__img').forEach((item, index) => {
    ['click', 'keydown'].forEach((evt) => {
      item.addEventListener(evt, (evt) => {
        if (evt.type === 'keydown' && evt.code !== 'Enter') return;
        // reset index in case sorting modified it
        index = displayedMedia.indexOf(item.parentNode);
        openLightbox(index);
      });
    });
  });
}

function listenForLikes(photographer) {
  const hearts = document.querySelectorAll('.media-card__heart-btn');
  const totalLikes = document.querySelector('.info-bar__likes');
  hearts.forEach((heart, index) => {
    const likes = heart.previousSibling;
    heart.addEventListener('click', () => {
      // reset index in case sorting modified it
      index = displayedMedia.indexOf(heart.parentNode.parentNode);
      // modify data
      if (!photographer.media[index].userHasLiked) {
        photographer.media[index].userHasLiked = true;
        photographer.media[index].likes++;
        photographer.photographer.totalLikes++;
      } else {
        // if already liked, unlike
        photographer.media[index].userHasLiked = false;
        photographer.media[index].likes--;
        photographer.photographer.totalLikes--;
      }
      // refresh DOM values with new DATA
      likes.innerHTML = photographer.media[index].likes;
      totalLikes.innerHTML = photographer.photographer.totalLikes;
    });
  });
}

//  Init
async function init() {
  // Get photograph data
  const photographer = await getPhotographer();

  // Display data
  displayHeader(photographer.photographer);
  displayMedia(photographer.media);
  displayInfoBar(photographer.photographer);

  // Sort media elements
  const sortingMenu = document.querySelector('#combo1');
  sortMedia(photographer.media, sortingMenu.dataset.value);

  // Listen for clicks once media loaded and sorted
  listenForClickOnMedia();
  listenForLikes(photographer);

  sortingMenu.addEventListener('change', () => {
    sortMedia(photographer.media, sortingMenu.dataset.value);
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
