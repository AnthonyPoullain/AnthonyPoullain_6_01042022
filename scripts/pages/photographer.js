const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));

function nameToFilePath(name) {
  return name.toLowerCase().split(' ')[0].split(' ').join('-');
}

function displayHeader(photographer) {
  const photographerHeader = document.querySelector('.photograph-header');
  // eslint-disable-next-line no-undef
  const photographerModel = photographerFactory(photographer);
  const { photographerDescription, photographerImgContainer } =
    photographerModel.getUserHeaderDOM();
  const contactButton = document.querySelector('.contact_button');
  photographerHeader.insertBefore(photographerDescription, contactButton);
  photographerHeader.appendChild(photographerImgContainer);
}

function displayMedia(media, name) {
  const mediaSection = document.createElement('section');
  mediaSection.classList.add('media-section');
  document.querySelector('#main').appendChild(mediaSection);
  media.forEach((item) => {
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(item, nameToFilePath(name));
    const mediaElement = mediaModel.getUserMediaDOM();
    mediaSection.appendChild(mediaElement);
  });
}

// données requises :
// nombre total de likes (media)
// prix (photographer)
// doit retourner
function displayInfoBar(photographer, totalLikes) {
  // eslint-disable-next-line no-undef
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoCardDOM(totalLikes);
  document.querySelector('#main').appendChild(infoBarElement);
}

async function getPhotographers() {
  // fetching the photographers data
  const response = await fetch('./data/photographers.json');
  const photographers = await response.json();
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
  if (photographer) console.log(photographer);
  return photographer;
}

async function getMedia(id) {
  // filtering the media data with the choosen photographer's id
  const photographers = await getPhotographers();
  const media = photographers.media.filter(
    (element) => element.photographerId === id
  );
  return media;
}

function getTotalLikes(media) {
  return media.reduce((total, currentItem) => total + currentItem.likes, 0);
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  const media = await getMedia(id);
  displayHeader(photographer);
  displayMedia(media, photographer.name);
  displayInfoBar(photographer, getTotalLikes(media));
}

init();
