const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));

async function getPhotographers() {
  // fetching the photographers data
  const response = await fetch('./data/photographers.json').catch((e) =>
    console.error(e.message)
  );
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
  const media = photographers.media.filter(
    (element) => element.photographerId === id
  );
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
  const mediaModel = photographerFactory(photographer);
  const mediaElement = mediaModel.getUserMediaDOM();
  document.querySelector('#main').appendChild(mediaElement);
}

function displayInfoBar(photographer) {
  // eslint-disable-next-line no-undef
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoCardDOM();
  document.querySelector('#main').appendChild(infoBarElement);
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  displayHeader(photographer);
  displayMedia(photographer);
  displayInfoBar(photographer);
}

init();
