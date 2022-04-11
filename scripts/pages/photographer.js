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

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  displayHeader(photographer);
  const media = await getMedia(id);
  displayMedia(media, photographer.name);
}

init();
