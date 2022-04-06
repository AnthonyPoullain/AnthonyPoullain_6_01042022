// Mettre le code JavaScript lié à la page photographer.html
const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));

async function displayData(photographer) {
  const photographerHeader = document.querySelector('.photograph-header');

  // eslint-disable-next-line no-undef
  const photographerModel = photographerFactory(photographer);
  const { photographerDescription, photographerImgContainer } =
    photographerModel.getUserHeaderDOM();
  photographerHeader.appendChild(photographerDescription);
  photographerHeader.appendChild(photographerImgContainer);
}

function getPhotographer() {
  // getting the photographers array from sessionStorage
  const photographers = JSON.parse(
    window.sessionStorage.getItem('photographers')
  );
  const photographer = photographers.find((item) => item.id === id);
  if (photographer) console.log(photographer);
  return photographer;
}

async function init() {
  // Récupère les datas des photographes
  const photographer = getPhotographer();
  displayData(photographer);
}

init();
